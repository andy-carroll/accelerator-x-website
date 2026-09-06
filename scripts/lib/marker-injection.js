// Shared HTML-comment-marker injection for build scripts (#79). Before this,
// build-testimonials.js and build-hero-media.js each hand-rolled their own
// indexOf/slice splicing with subtly different fallback behaviour: one threw on
// missing markers, the other warned-and-skipped. Consolidated here so every
// build script gets the same, deliberately-chosen behaviour for that part —
// but NOT for surrounding whitespace, which is a per-caller formatting choice,
// not something this utility can safely infer (an early version of this tried
// to auto-detect the END marker's indentation from the current file content and
// reproduce it; that broke on testimonials, whose source partial has zero
// indentation before the markers while the desired *output* has 10 spaces — the
// indentation is a caller-owned formatting decision, not a property of the
// current file state).
//
// build-testimonials.js (the second original consumer) was removed by #130 in
// favour of token injection from scripts/lib/testimonials.js — the two-source
// marker flow is exactly what let v1 markup clobber the v2 partial every build.
// build-hero-media.js remains the live consumer.
//
// Markers are always preserved in the output. `replacement` is spliced in
// directly between them — start marker included in `before`, end marker
// included in `after` — so callers must include whatever leading whitespace or
// blank lines they want before the end marker as the tail of `replacement`
// itself, exactly as the pre-consolidation scripts did inline.
//
// Returns { content, injected }. `onMissing: 'throw'` (the default) throws
// instead of returning when the markers aren't found; `onMissing: 'warn'` logs a
// warning and returns the original content unchanged with `injected: false`, so
// a caller can skip any dependent follow-up work exactly as it would have before
// this was hand-rolled per script.
function injectMarked(content, { startMarker, endMarker, replacement, onMissing = 'throw', context }) {
  const startIdx = content.indexOf(startMarker);
  const endIdx = content.indexOf(endMarker);
  const found = startIdx !== -1 && endIdx !== -1 && endIdx > startIdx;

  if (!found) {
    const label = context ? ` in ${context}` : '';
    const message = `Could not locate "${startMarker}" / "${endMarker}" markers${label}.`;
    if (onMissing === 'throw') throw new Error(message);
    console.warn(`⚠️  ${message} Skipping.`);
    return { content, injected: false };
  }

  const before = content.slice(0, startIdx + startMarker.length);
  const after = content.slice(endIdx);

  return { content: `${before}${replacement}${after}`, injected: true };
}

module.exports = { injectMarked };
