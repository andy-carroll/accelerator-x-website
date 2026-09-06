'use strict';

// Unit coverage for scripts/lib/testimonials.js (#130) — the single writer that
// turns content/data/testimonials.json into the v2 .ax-testimonial-card markup.
// The bug this guards against is the one it replaced: v1 .card-hoverable/.stars-5
// markup silently clobbering the v2 component on every build.

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { buildTestimonialsHtml, loadTestimonials, TESTIMONIALS_PATH } =
  require('../../scripts/lib/testimonials');

const FIXTURE = [
  { quote: 'Great work', name: 'A Person', title: 'CEO', company: 'Acme Ltd' },
  { quote: 'Also great', name: 'B Person', title: 'Founder', company: 'Beta Ltd' },
  { quote: 'Still great', name: 'C Person', title: '', company: 'Gamma Ltd' },
];

test('renders v2 .ax-testimonial-card markup, never the v1 classes', () => {
  const html = buildTestimonialsHtml(FIXTURE);
  assert.match(html, /class="ax-testimonial-card/);
  assert.match(html, /ax-testimonial-card__quote/);
  assert.match(html, /ax-testimonial-card__attribution/);
  assert.match(html, /ax-testimonial-card__name/);
  assert.match(html, /ax-testimonial-card__role/);
  assert.doesNotMatch(html, /card-hoverable|stars-5/);
});

test('staggers scroll-in reveal classes by card position', () => {
  const html = buildTestimonialsHtml(FIXTURE);
  assert.match(html, /ax-testimonial-card reveal">/);
  assert.match(html, /ax-testimonial-card reveal reveal-delay-1">/);
  assert.match(html, /ax-testimonial-card reveal reveal-delay-2">/);
});

test('numbers the per-card comments in order', () => {
  const html = buildTestimonialsHtml(FIXTURE);
  assert.match(html, /<!-- Testimonial 1 -->/);
  assert.match(html, /<!-- Testimonial 2 -->/);
  assert.match(html, /<!-- Testimonial 3 -->/);
});

test('escapes HTML in quote, name and attribution', () => {
  const html = buildTestimonialsHtml([
    { quote: 'a<b & "c"', name: 'D <em>Name</em>', title: 'C&O', company: 'X"Y' },
  ]);
  assert.match(html, /&lt;b &amp; &quot;c&quot;/);
  assert.match(html, /&lt;em&gt;Name&lt;\/em&gt;/);
  assert.match(html, /C&amp;O, X&quot;Y/);
});

test('omits the role line separator when title and company are both empty', () => {
  const html = buildTestimonialsHtml([{ quote: 'q', name: 'N', title: '', company: '' }]);
  // [title, company].filter(Boolean).join(', ') — no stray ", " when both are blank.
  assert.match(html, /ax-testimonial-card__role"><\/p>/);
});

test('marks the star row decorative and announces the rating to screen readers', () => {
  const html = buildTestimonialsHtml(FIXTURE);
  assert.match(html, /ax-testimonial-card__stars" aria-hidden="true"/);
  assert.match(html, /<span class="sr-only">5 out of 5 stars<\/span>/);
});

test('throws on an empty or non-array input rather than silently clearing the section', () => {
  assert.throws(() => buildTestimonialsHtml([]), /non-empty array/);
  assert.throws(() => buildTestimonialsHtml(null), /non-empty array/);
  assert.throws(() => buildTestimonialsHtml({}), /non-empty array/);
});

test('loadTestimonials returns the committed data and it renders three real testimonials', () => {
  const data = loadTestimonials();
  assert.equal(data.length, 3);
  assert.deepEqual(data.map((t) => t.name), [
    'Alastair Constance',
    'Mark Bennett',
    'David Carry',
  ]);
  const html = buildTestimonialsHtml(data);
  // The nbsp between W and R (\u00a0 in the JSON source) must survive —
  // the v2 partial used W&nbsp;R to keep the name from wrapping. Matched via an
  // explicit escape so the test does not rely on an invisible literal character.
  assert.match(html, /W\u00a0R Bennett Group/);
  assert.equal(fs.existsSync(TESTIMONIALS_PATH), true);
});

test('committed index.html contains the generated v2 markup, not v1', () => {
  // The built artefact is committed (pre-built site), so CI can assert the
  // clobber never returns: index.html must match what the generator produces
  // from the committed JSON.
  const repoRoot = path.resolve(__dirname, '../..');
  const indexHtml = fs.readFileSync(path.join(repoRoot, 'index.html'), 'utf8');
  const expected = buildTestimonialsHtml(loadTestimonials());
  assert.ok(indexHtml.includes(expected), 'index.html is missing the JSON-generated testimonials markup');
  assert.doesNotMatch(indexHtml, /stars-5|TESTIMONIALS_COMPONENT_START/);
});