const fs = require('fs');
const path = require('path');

const SESSION_BLOCK_START = '<!-- SESSION_PROTOCOL:START -->';
const SESSION_BLOCK_END = '<!-- SESSION_PROTOCOL:END -->';

// Shared working-tree lock (#85): session-start.js increments openCount on start,
// session-end.js decrements on close. openCount > 1 at close time means another
// session's session-start ran without an intervening session-end on this same tree —
// the exact concurrent-checkout scenario #85 was filed against — so session-end must
// not assume every dirty allowlisted file belongs to it.
const SESSION_LOCK_PATH = path.join('.claude', '.session.lock');

function readSessionLock() {
  try {
    if (!fs.existsSync(SESSION_LOCK_PATH)) return null;
    const parsed = JSON.parse(fs.readFileSync(SESSION_LOCK_PATH, 'utf8'));
    return typeof parsed?.openCount === 'number' ? parsed : null;
  } catch {
    return null;
  }
}

// A second session-start call within this window of the last one is treated as the
// same real session re-orienting (e.g. `npm run session-start` followed by the
// `:json` variant, or an agent re-running the mandatory start step after a restart),
// not a genuinely concurrent second session — it refreshes the lock without
// incrementing. Wide enough to cover routine re-orientation, narrow enough that two
// independently-started sessions on the same tree essentially never land inside it
// by coincidence.
const SESSION_LOCK_DEDUP_WINDOW_MS = 5 * 60 * 1000;

// Called by session-start.js. Returns the lock state after acquiring, so the caller
// can warn when openCount > 1.
function acquireSessionLock(startedAt = new Date().toISOString()) {
  const existing = readSessionLock();
  const isRepeatCall = existing
    && (new Date(startedAt).getTime() - new Date(existing.lastStartedAt).getTime()) < SESSION_LOCK_DEDUP_WINDOW_MS;
  const lock = !existing
    ? { openCount: 1, firstStartedAt: startedAt, lastStartedAt: startedAt }
    : isRepeatCall
      ? { ...existing, lastStartedAt: startedAt }
      : { openCount: existing.openCount + 1, firstStartedAt: existing.firstStartedAt, lastStartedAt: startedAt };
  const dir = path.dirname(SESSION_LOCK_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(SESSION_LOCK_PATH, JSON.stringify(lock, null, 2));
  return lock;
}

// Called by session-end.js once its close completes (successfully or not — a session
// that closes always relinquishes its own slot). Deletes the lock file once the count
// reaches zero rather than leaving a stale zero-count file behind.
function releaseSessionLock() {
  const existing = readSessionLock();
  if (!existing) return;
  const nextCount = existing.openCount - 1;
  if (nextCount <= 0) {
    try { fs.unlinkSync(SESSION_LOCK_PATH); } catch { /* already gone */ }
  } else {
    fs.writeFileSync(SESSION_LOCK_PATH, JSON.stringify({ ...existing, openCount: nextCount }, null, 2));
  }
}

function resolveMarkers(options = {}) {
  return {
    startMarker: options.startMarker || SESSION_BLOCK_START,
    endMarker: options.endMarker || SESSION_BLOCK_END
  };
}

function patternToRegExp(pattern) {
  const escaped = pattern
    .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
    .replace(/\*/g, '.*');
  return new RegExp(`^${escaped}$`);
}

function matchesAnyPattern(value, patterns) {
  return patterns.some(pattern => patternToRegExp(pattern).test(value));
}

function isPlainObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value);
}

function mergeObjects(base, override) {
  if (!isPlainObject(base)) return override;
  if (!isPlainObject(override)) return override;

  const next = { ...base };
  for (const [key, value] of Object.entries(override)) {
    if (Array.isArray(value)) {
      next[key] = value.slice();
      continue;
    }

    if (isPlainObject(value) && isPlainObject(base[key])) {
      next[key] = mergeObjects(base[key], value);
      continue;
    }

    if (isPlainObject(value)) {
      next[key] = mergeObjects({}, value);
      continue;
    }

    next[key] = value;
  }

  return next;
}

function resolveProfileOperatingMode(profile) {
  const operatingMode = profile.operatingMode;
  const operatingModes = profile.operatingModes;

  if (!operatingMode || !isPlainObject(operatingModes)) {
    return { profile, activeMode: operatingMode || 'default' };
  }

  const modeOverrides = operatingModes[operatingMode];
  if (!isPlainObject(modeOverrides)) {
    return { error: `Invalid protocol profile: operatingMode '${operatingMode}' has no valid override object.` };
  }

  return {
    profile: mergeObjects(profile, modeOverrides),
    activeMode: operatingMode
  };
}

// ── Session-notes parsing ─────────────────────────────────────────────────────
// .claude/session-notes.md is the agent-authored input session-end consumes. The
// write-gates that read it (summary required, review evidence required) live on
// these pure content parsers so they stay unit-testable (test-session-protocols.js).

function normalizeNewlines(content) {
  // CRLF/CR → LF up front, so a Windows-authored notes file can't leave a trailing \r on
  // the first line — which would otherwise surface as a stray carriage return in the
  // session-log "Fresh-eyes review:" header (`reviewResult.split('\n')[0]`) (#83).
  return content.replace(/\r\n?/g, '\n');
}

function extractNotesSection(content, heading) {
  if (!content) return null;
  const normalized = normalizeNewlines(content);
  const escapedHeading = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const headingMatch = normalized.match(new RegExp(`^##\\s+${escapedHeading}\\s*\\n`, 'im'));
  if (!headingMatch) return null;
  const rest = normalized.slice(headingMatch.index + headingMatch[0].length);
  // Known limitation: an h2-looking line inside a fenced code block terminates the
  // section early — acceptable for a presence gate, same trade-off as loadSessionNotes.
  const nextHeading = rest.search(/\n##\s/);
  const raw = nextHeading === -1 ? rest : rest.slice(0, nextHeading);
  // Template guidance ships as HTML comments inside each section — evidence is what
  // remains once they're stripped (unterminated comments too, so a truncated template
  // can't silently satisfy a gate).
  const body = raw.replace(/<!--[\s\S]*?-->/g, '').replace(/<!--[\s\S]*$/, '').trim();
  return body || null;
}

function extractSessionSummary(content) {
  const match = normalizeNewlines(content || '').match(/^##\s+Summary\s*\n+([^#\n].+)/im);
  if (!match) return null;
  const summary = match[1].trim();
  // Reject unfilled template placeholders
  if (!summary || summary.startsWith('_') || summary.startsWith('-')) return null;
  return summary;
}

function extractReviewResult(content) {
  const body = extractNotesSection(content, 'Review');
  if (!body) return null;
  // Placeholder lines (fully underscore-italicised) don't count as evidence, wherever
  // they sit — agents sometimes append the real outcome below the placeholder instead
  // of replacing it. An honest "Skipped — <reason>" is acceptable evidence; silence is not.
  const result = body
    .split('\n')
    .filter(line => !/^_.*_$/.test(line.trim()))
    .join('\n')
    .trim();
  return result || null;
}

function ensureNextSessionBlock(content) {
  if (/## Next Session Priorities/.test(content)) {
    return { content, changed: false };
  }

  const block = '\n## Next Session Priorities\n\n1. _Priority 1_\n2. _Priority 2_\n3. _Priority 3_\n';
  return { content: `${content}${block}`, changed: true };
}

function buildSessionProtocolBlock(meta, options = {}) {
  const { startMarker, endMarker } = resolveMarkers(options);
  const { sessionId, date, mode } = meta;

  return [
    startMarker,
    `- Session ID: ${sessionId}`,
    `- Updated: ${date}`,
    `- Mode: ${mode}`,
    endMarker
  ].join('\n');
}

function upsertSessionProtocolBlock(content, meta, options = {}) {
  const { startMarker, endMarker } = resolveMarkers(options);
  const block = buildSessionProtocolBlock(meta, options);
  const startIndex = content.indexOf(startMarker);
  const endIndex = content.indexOf(endMarker);

  if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
    const separator = content.endsWith('\n') ? '' : '\n';
    const next = `${content}${separator}\n${block}\n`;
    return { content: next, changed: next !== content };
  }

  const endBoundary = endIndex + endMarker.length;
  const previous = content.slice(0, startIndex).trimEnd();
  const trailing = content.slice(endBoundary).trimStart();
  const next = `${previous}\n\n${block}${trailing ? `\n\n${trailing}` : '\n'}`;
  return { content: next, changed: next !== content };
}

module.exports = {
  SESSION_BLOCK_START,
  SESSION_BLOCK_END,
  SESSION_LOCK_PATH,
  readSessionLock,
  acquireSessionLock,
  releaseSessionLock,
  patternToRegExp,
  matchesAnyPattern,
  resolveProfileOperatingMode,
  extractNotesSection,
  extractSessionSummary,
  extractReviewResult,
  ensureNextSessionBlock,
  upsertSessionProtocolBlock
};
