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
  ensureNextSessionBlock,
  upsertSessionProtocolBlock
};
