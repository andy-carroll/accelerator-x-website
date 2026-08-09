'use strict';

// `npm run build` runs build:css (Tailwind CLI) and this script LAST, after every
// HTML-generation step (build-homepage, build-testimonials, build-hero-media,
// build-footer, build-design-system, build-inner-pages, build-hub). Tailwind's
// content scan only sees whatever HTML is on disk at the moment it runs — if CSS
// built BEFORE HTML generation, any class introduced only by generated (not
// source-template) markup would be invisible until the *next* build, silently
// committing CSS that's one generation stale. Investigated 2026-08-05 after a
// report of "non-deterministic" CSS builds — the real cause was this ordering
// (repro'd as a `.grow`/`.transform` utility missing from committed CSS that a
// fresh build restored); the tool itself was deterministic run-to-run.
//
// Concatenates tailwind.generated.css + tokens.css + every component CSS file into a
// single assets/css/bundle.generated.css, so pages load ~4 stylesheets instead of
// 14-24. See #78 for the architecture-review finding this addresses.
//
// Order: tailwind → tokens → components alphabetically, EXCEPT HomeSections.css and
// InnerPages.css are appended last — every page currently loads its page-level sheet
// (HomeSections or InnerPages) after all shared components, so this preserves each
// page's existing cascade position for those two files. Cross-file selector overlap
// was audited (2026-07-04): only 3 top-level collisions exist across all 33 component
// files, all benign (identical rules, disjoint descendants, or intentional layering) —
// see the commit message / CHANGELOG for detail. Any *new* collision introduced later
// would only matter if it changes specificity outcomes; alphabetical order is safe
// today but isn't a guarantee for all future components — recheck if a bundling bug
// is ever reported.
//
// @import must be hoisted to the top of the bundle (mid-file @import is silently
// ignored by browsers) and deduped — tokens.css and tailwind.generated.css both
// @import the same Figtree URL today.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CSS_DIR = path.join(ROOT, 'assets/css');
const COMPONENTS_DIR = path.join(CSS_DIR, 'components');
const OUTPUT_PATH = path.join(CSS_DIR, 'bundle.generated.css');

const LAST_FILES = ['HomeSections.css', 'InnerPages.css'];

const IMPORT_RE = /@import\s+(?:url\([^)]+\)|"[^"]+"|'[^']+')\s*;/g;
const CHARSET_RE = /@charset\s+(?:"[^"]+"|'[^']+')\s*;/g;

function readCss(relPathFromCssDir) {
  return fs.readFileSync(path.join(CSS_DIR, relPathFromCssDir), 'utf8');
}

function extractAtRules(css, re) {
  const matches = css.match(re) || [];
  const stripped = css.replace(re, '');
  return { matches, stripped };
}

function buildBundle() {
  if (!fs.existsSync(COMPONENTS_DIR)) {
    throw new Error(`Components directory not found: ${COMPONENTS_DIR}`);
  }

  const componentFiles = fs.readdirSync(COMPONENTS_DIR)
    .filter((f) => f.endsWith('.css'))
    .sort();

  if (componentFiles.length === 0) {
    throw new Error('No component CSS files found — refusing to build an empty bundle.');
  }

  const orderedComponents = [
    ...componentFiles.filter((f) => !LAST_FILES.includes(f)),
    ...LAST_FILES.filter((f) => componentFiles.includes(f)),
  ];

  const sources = [
    { label: 'tailwind.generated.css', content: readCss('tailwind.generated.css') },
    { label: 'tokens.css', content: readCss('tokens.css') },
    ...orderedComponents.map((f) => ({ label: `components/${f}`, content: readCss(path.join('components', f)) })),
  ];

  const imports = new Set();
  const charsets = new Set();
  const bodies = [];

  for (const { label, content } of sources) {
    const afterCharset = extractAtRules(content, CHARSET_RE);
    afterCharset.matches.forEach((m) => charsets.add(m));

    const afterImport = extractAtRules(afterCharset.stripped, IMPORT_RE);
    afterImport.matches.forEach((m) => imports.add(m));

    // Fail loudly if an @import survives extraction anywhere but the two known files —
    // a mid-file @import silently does nothing in browsers, so a future component
    // adding one needs a human decision, not silent breakage.
    if (label.startsWith('components/') && afterImport.matches.length > 0) {
      throw new Error(
        `Unexpected @import in ${label} — component files should not @import. ` +
        `Bundle would silently drop it. Move the import to tokens.css or handle explicitly.`
      );
    }

    bodies.push(`/* ── source: ${label} ── */\n${afterImport.stripped.trim()}`);
  }

  const header = [...charsets, ...imports].join('\n');
  const bundle = (header ? `${header}\n\n` : '') + bodies.join('\n\n') + '\n';

  return bundle;
}

function main() {
  const bundle = buildBundle();
  const existing = fs.existsSync(OUTPUT_PATH) ? fs.readFileSync(OUTPUT_PATH, 'utf8') : '';

  if (existing === bundle) {
    console.log('ℹ️  CSS bundle unchanged: assets/css/bundle.generated.css');
  } else {
    fs.writeFileSync(OUTPUT_PATH, bundle, 'utf8');
    console.log(`✅ CSS bundle built: assets/css/bundle.generated.css (${(bundle.length / 1024).toFixed(1)} KB)`);
  }
}

main();
