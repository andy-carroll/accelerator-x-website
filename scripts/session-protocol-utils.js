const SESSION_BLOCK_START = '<!-- SESSION_PROTOCOL:START -->';
const SESSION_BLOCK_END = '<!-- SESSION_PROTOCOL:END -->';

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
  patternToRegExp,
  matchesAnyPattern,
  resolveProfileOperatingMode,
  extractNotesSection,
  extractSessionSummary,
  extractReviewResult,
  ensureNextSessionBlock,
  upsertSessionProtocolBlock
};
