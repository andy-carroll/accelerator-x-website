'use strict';

// Unit coverage for scripts/lib/marker-injection.js — the shared splicing utility
// build-testimonials.js and build-hero-media.js consolidated onto (#79), replacing
// two hand-rolled indexOf/slice implementations that had diverged on missing-marker
// behaviour (one threw, one warned-and-skipped).

const test = require('node:test');
const assert = require('node:assert/strict');

const { injectMarked } = require('../../scripts/lib/marker-injection');

test('injects replacement between markers, preserving both markers in the output', () => {
  const content = 'before\n<!-- START -->old\n<!-- END -->\nafter';
  const { content: result, injected } = injectMarked(content, {
    startMarker: '<!-- START -->',
    endMarker: '<!-- END -->',
    replacement: 'new',
  });
  assert.equal(injected, true);
  assert.equal(result, 'before\n<!-- START -->new<!-- END -->\nafter');
});

test('replaces only what is between the markers — content outside is untouched', () => {
  const content = 'header <!-- START -->drop this<!-- END --> footer';
  const { content: result } = injectMarked(content, {
    startMarker: '<!-- START -->',
    endMarker: '<!-- END -->',
    replacement: 'kept',
  });
  assert.equal(result, 'header <!-- START -->kept<!-- END --> footer');
});

test('default onMissing throws when a marker is absent, naming both markers', () => {
  const content = 'no markers here';
  assert.throws(
    () => injectMarked(content, { startMarker: '<!-- START -->', endMarker: '<!-- END -->', replacement: 'x' }),
    /<!-- START -->.*<!-- END -->/s
  );
});

test('throws when only the end marker is missing', () => {
  const content = '<!-- START -->only the start';
  assert.throws(() =>
    injectMarked(content, { startMarker: '<!-- START -->', endMarker: '<!-- END -->', replacement: 'x' })
  );
});

test('throws when the end marker appears before the start marker', () => {
  const content = '<!-- END --> ... <!-- START -->';
  assert.throws(() =>
    injectMarked(content, { startMarker: '<!-- START -->', endMarker: '<!-- END -->', replacement: 'x' })
  );
});

test('onMissing "warn" returns the original content unchanged and reports injected:false', () => {
  const content = 'no markers here';
  const { content: result, injected } = injectMarked(content, {
    startMarker: '<!-- START -->',
    endMarker: '<!-- END -->',
    replacement: 'x',
    onMissing: 'warn',
  });
  assert.equal(injected, false);
  assert.equal(result, content);
});

test('context is included in the thrown error message when provided', () => {
  assert.throws(
    () => injectMarked('nothing', {
      startMarker: '<!-- START -->',
      endMarker: '<!-- END -->',
      replacement: 'x',
      context: 'index.html',
    }),
    /index\.html/
  );
});

test('an empty replacement removes everything between the markers', () => {
  const content = '<!-- START -->stuff to remove<!-- END -->';
  const { content: result } = injectMarked(content, {
    startMarker: '<!-- START -->',
    endMarker: '<!-- END -->',
    replacement: '',
  });
  assert.equal(result, '<!-- START --><!-- END -->');
});

test('caller-supplied leading/trailing whitespace in replacement is preserved verbatim (indentation is a caller concern, not inferred by the utility)', () => {
  const content = '            <!-- START -->\n            <!-- END -->';
  const { content: result } = injectMarked(content, {
    startMarker: '<!-- START -->',
    endMarker: '<!-- END -->',
    replacement: '\n              <p>hi</p>\n            ',
  });
  assert.equal(result, '            <!-- START -->\n              <p>hi</p>\n            <!-- END -->');
});
