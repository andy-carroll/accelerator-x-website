const fs = require('fs');
const path = require('path');
const { injectMarked } = require('./lib/marker-injection');
const { writeFileAtomic } = require('./lib/atomic-write');

const TESTIMONIALS_PATH = path.join(__dirname, '../content/data/testimonials.json');
const INDEX_HTML_PATH = path.join(__dirname, '../index.html');
const START_MARKER = '<!-- TESTIMONIALS_COMPONENT_START -->';
const END_MARKER = '<!-- TESTIMONIALS_COMPONENT_END -->';

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildCardHtml(t, indent) {
  const quote = escapeHtml(t.quote || '');
  const name = escapeHtml(t.name || '');
  const title = escapeHtml(t.title || '');
  const company = escapeHtml(t.company || '');

  const attribution = [title, company].filter(Boolean).join(', ');

  return (
    `${indent}<div class="card-hoverable flex flex-col rounded-xl bg-background p-8">\n` +
    `${indent}  <div class="mb-4 flex justify-center">\n` +
    `${indent}    <div class="stars-5" aria-hidden="true">\n` +
    `${indent}      <span aria-hidden="true">★</span>\n` +
    `${indent}      <span aria-hidden="true">★</span>\n` +
    `${indent}      <span aria-hidden="true">★</span>\n` +
    `${indent}      <span aria-hidden="true">★</span>\n` +
    `${indent}      <span aria-hidden="true">★</span>\n` +
    `${indent}    </div>\n` +
    `${indent}    <span class="sr-only">5 out of 5 stars</span>\n` +
    `${indent}  </div>\n` +
    `${indent}  <p class="flex-1 italic leading-relaxed text-body">\n` +
    `${indent}    "${quote}"\n` +
    `${indent}  </p>\n` +
    `${indent}  <div class="mt-6">\n` +
    `${indent}    <p class="font-bold text-navy">${name}</p>\n` +
    `${indent}    <p class="text-sm text-muted">${attribution}</p>\n` +
    `${indent}  </div>\n` +
    `${indent}</div>`
  );
}

function main() {
  if (!fs.existsSync(TESTIMONIALS_PATH)) {
    console.warn(`⚠️ Testimonials file not found: ${TESTIMONIALS_PATH}. Skipping.`);
    return;
  }
  if (!fs.existsSync(INDEX_HTML_PATH)) {
    console.warn(`⚠️ index.html not found: ${INDEX_HTML_PATH}. Skipping.`);
    return;
  }

  const testimonialsRaw = fs.readFileSync(TESTIMONIALS_PATH, 'utf-8');
  let testimonials;
  try {
    testimonials = JSON.parse(testimonialsRaw);
  } catch (err) {
    console.error(`❌ Failed to parse testimonials JSON at ${TESTIMONIALS_PATH}`);
    throw err;
  }

  if (!Array.isArray(testimonials) || testimonials.length === 0) {
    console.warn('⚠️ No testimonials found in JSON. Skipping.');
    return;
  }

  const indexHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf-8');

  const indent = '          ';

  const parts = [];
  parts.push('');
  for (let i = 0; i < testimonials.length; i += 1) {
    const t = testimonials[i] || {};

    if (i === 0) parts.push(`${indent}<!-- Testimonial 1 -->`);
    if (i === 1) parts.push(`${indent}<!-- Testimonial 2 -->`);
    if (i === 2) parts.push(`${indent}<!-- Testimonial 3 -->`);

    parts.push(buildCardHtml(t, indent));
    parts.push('');
  }

  const replacement = `${parts.join('\n')}\n          `;

  const { content: outHtml } = injectMarked(indexHtml, {
    startMarker: START_MARKER,
    endMarker: END_MARKER,
    replacement,
    onMissing: 'throw',
    context: 'index.html',
  });
  writeFileAtomic(INDEX_HTML_PATH, outHtml);

  console.log(`✅ Testimonials injected into index.html (${testimonials.length} items)`);
}

main();
