const fs = require('fs');
const path = require('path');

const INDEX_HTML_PATH = path.join(__dirname, '../index.html');
const CONFIG_PATH = path.join(__dirname, '../content/data/hero-media.config.json');
const MANUAL_LIBRARY_PATH = path.join(__dirname, '../content/data/hero-media.library.json');
const GENERATED_LIBRARY_PATH = path.join(__dirname, '../content/data/hero-media.generated.json');
const PLACEHOLDER_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAAAAACw=';

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function readJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback;

  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    console.error(`❌ Failed to parse JSON: ${filePath}`);
    throw error;
  }
}

function buildSrcset(basePath, variants, ext) {
  return variants.map((width) => `${basePath}-${width}.${ext} ${width}w`).join(',\n                                ');
}

function buildSlideHtml(entry, sizes, isFirst) {
  const variants = Array.isArray(entry.variants) ? entry.variants : [];
  if (!entry.basePath || !entry.fallbackExt || !entry.width || !entry.height || variants.length === 0) {
    return '';
  }

  const largestVariant = Math.max(...variants);
  const fallbackSrc = `${entry.basePath}-${largestVariant}.${entry.fallbackExt}`;
  const fallbackSrcset = buildSrcset(entry.basePath, variants, entry.fallbackExt);
  const webpSrcset = buildSrcset(entry.basePath, variants, 'webp');
  const loading = isFirst ? 'eager' : 'lazy';
  const activeClass = isFirst ? ' is-active' : '';
  const sourceAttrs = isFirst
    ? `                        srcset="${escapeHtml(webpSrcset)}"\n                        sizes="${escapeHtml(sizes)}"`
    : `                        data-srcset="${escapeHtml(webpSrcset)}"\n                        data-sizes="${escapeHtml(sizes)}"`;
  const imageAttrs = isFirst
    ? [
        `                        src="${escapeHtml(fallbackSrc)}"`,
        `                        srcset="${escapeHtml(fallbackSrcset)}"`,
        `                        sizes="${escapeHtml(sizes)}"`,
      ].join('\n')
    : [
        `                        src="${PLACEHOLDER_IMAGE}"`,
        `                        data-src="${escapeHtml(fallbackSrc)}"`,
        `                        data-srcset="${escapeHtml(fallbackSrcset)}"`,
        `                        data-sizes="${escapeHtml(sizes)}"`,
      ].join('\n');

  return [
    `                  <figure class="hero-media-slide${activeClass}" data-hero-slide>`,
    '                    <picture>',
    '                      <source',
    '                        type="image/webp"',
    sourceAttrs,
    '                      />',
    '                      <img',
    imageAttrs,
    `                        alt="${escapeHtml(entry.alt || 'Accelerator X hero image')}"`,
    `                        width="${escapeHtml(entry.width)}"`,
    `                        height="${escapeHtml(entry.height)}"`,
    `                        loading="${loading}"`,
    '                        decoding="async"',
    '                        class="hero-media-slide__image"',
    '                      />',
    '                    </picture>',
    '                  </figure>',
  ].join('\n');
}

function buildHeroMarkup(config, library) {
  const activeLibrary = library
    .filter((entry) => entry && entry.active !== false)
    .slice(0, Number.isFinite(Number(config.maxSlides)) ? Number(config.maxSlides) : 5);

  const slidesHtml = activeLibrary
    .map((entry, index) => buildSlideHtml(entry, config.sizes, index === 0))
    .filter(Boolean)
    .join('\n\n');

  return [
    '            <!-- HERO_MEDIA_LIBRARY_START -->',
    '            <div class="hero-media-frame">',
    `              <div class="hero-media-stage hero-media-library" aria-label="Accelerator X hero media" data-hero-library data-hero-interval="${escapeHtml(config.intervalMs || 6500)}">`,
    `                <div class="hero-media-badge">${escapeHtml(config.badge || '')}</div>`,
    '                <div class="hero-media-slides">',
    slidesHtml,
    '                </div>',
    '                <div class="hero-media-note">',
    `                  <span class="hero-media-note__eyebrow">${escapeHtml(config.noteEyebrow || '')}</span>`,
    `                  <p class="hero-media-note__body">${escapeHtml(config.noteBody || '')}</p>`,
    '                </div>',
    '              </div>',
    '            </div>',
    '            <!-- HERO_MEDIA_LIBRARY_END -->',
  ].join('\n');
}

function main() {
  if (!fs.existsSync(INDEX_HTML_PATH)) {
    console.warn(`⚠️ index.html not found: ${INDEX_HTML_PATH}. Skipping.`);
    return;
  }

  const config = readJson(CONFIG_PATH, {});
  const generatedLibrary = readJson(GENERATED_LIBRARY_PATH, []);
  const manualLibrary = readJson(MANUAL_LIBRARY_PATH, []);
  const library = Array.isArray(generatedLibrary) && generatedLibrary.length > 0
    ? generatedLibrary
    : manualLibrary;

  if (!Array.isArray(library) || library.length === 0) {
    console.warn('⚠️ No hero media entries found. Skipping hero media build.');
    return;
  }

  const indexHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf8');
  const startMarker = '            <!-- HERO_MEDIA_LIBRARY_START -->';
  const endMarker = '            <!-- HERO_MEDIA_LIBRARY_END -->';
  const startIdx = indexHtml.indexOf(startMarker);
  const endIdx = indexHtml.indexOf(endMarker);

  if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx) {
    console.warn('⚠️ Could not locate hero media markers in index.html. Skipping.');
    return;
  }

  const before = indexHtml.slice(0, startIdx);
  const after = indexHtml.slice(endIdx + endMarker.length);
  const replacement = buildHeroMarkup(config, library);
  const output = `${before}${replacement}${after}`;

  fs.writeFileSync(INDEX_HTML_PATH, output);
  const renderedCount = library
    .filter((entry) => entry && entry.active !== false)
    .slice(0, Number.isFinite(Number(config.maxSlides)) ? Number(config.maxSlides) : 5)
    .length;
  console.log(`✅ Hero media injected into index.html (${renderedCount} item${renderedCount === 1 ? '' : 's'})`);
}

main();
