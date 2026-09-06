'use strict';

// Single writer for homepage testimonial markup (#130). content/data/testimonials.json
// is the ONLY source of testimonial content; this generator is the ONLY thing that
// turns it into markup, and build-homepage.js is the ONLY script that injects it.
// The v1 flow this replaced kept two competing sources — a hand-maintained v2 partial
// injected by build-homepage.js and a v1-markup generator (build-testimonials.js) that
// ran immediately after and unconditionally clobbered the partial's content between the
// same markers on every build, so the v2 design never reached production. One data
// file, one generator, one injection point; nothing downstream to clobber it.

const fs = require('fs');
const path = require('path');

const TESTIMONIALS_PATH = path.join(__dirname, '../../content/data/testimonials.json');

// Depth of a card inside .ax-testimonials__grid in _templates/homepage.html — the
// generated markup must be valid standalone (tests assert on it), so the indent is
// owned here rather than inferred from whatever file it happens to be injected into.
const INDENT = '            ';

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// v2 testimonial card from the design system (assets/css/components/HomeSections.css),
// matching the .ax-testimonial-card BEM markup the retired partial carried. Scroll-in
// reveal classes stagger per card position, mirroring the reveal/reveal-delay-* pattern
// used across the homepage.
function buildCardHtml(t, index) {
  const quote = escapeHtml(t.quote || '');
  const name = escapeHtml(t.name || '');
  const attribution = escapeHtml([t.title, t.company].filter(Boolean).join(', '));
  const reveal = index > 0 ? `reveal reveal-delay-${index}` : 'reveal';

  return (
    `${INDENT}<!-- Testimonial ${index + 1} -->\n` +
    `${INDENT}<div class="ax-testimonial-card ${reveal}">\n` +
    `${INDENT}  <div class="ax-testimonial-card__stars" aria-hidden="true">\n` +
    `${INDENT}    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>\n` +
    `${INDENT}  </div>\n` +
    `${INDENT}  <span class="sr-only">5 out of 5 stars</span>\n` +
    `${INDENT}  <p class="ax-testimonial-card__quote">\n` +
    `${INDENT}    "${quote}"\n` +
    `${INDENT}  </p>\n` +
    `${INDENT}  <div class="ax-testimonial-card__attribution">\n` +
    `${INDENT}    <p class="ax-testimonial-card__name">${name}</p>\n` +
    `${INDENT}    <p class="ax-testimonial-card__role">${attribution}</p>\n` +
    `${INDENT}  </div>\n` +
    `${INDENT}</div>`
  );
}

function buildTestimonialsHtml(testimonials) {
  if (!Array.isArray(testimonials) || testimonials.length === 0) {
    throw new Error(
      `testimonials must be a non-empty array (got ${testimonials === null ? 'null' : typeof testimonials})`
    );
  }

  // Leading newline pairs with the token sitting alone on its own line in
  // _templates/homepage.html (gives the section a blank line after the grid open,
  // the retired partial's rhythm); the template's own newline + grid-close
  // indentation follow the token line, so the replacement ends at the last card's
  // closing tag with no trailing whitespace. Blank line between cards.
  return `\n${testimonials.map(buildCardHtml).join('\n\n')}`;
}

function loadTestimonials() {
  const raw = fs.readFileSync(TESTIMONIALS_PATH, 'utf8');
  let data;
  try {
    data = JSON.parse(raw);
  } catch (err) {
    throw new Error(`Failed to parse testimonials JSON at ${TESTIMONIALS_PATH}: ${err.message}`);
  }
  return data;
}

module.exports = { buildTestimonialsHtml, loadTestimonials, TESTIMONIALS_PATH };