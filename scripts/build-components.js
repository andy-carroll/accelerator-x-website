'use strict';

const fs = require('fs');
const path = require('path');
const { SITE_CONFIG } = require('./site-config');

const ROOT = path.resolve(__dirname, '..');
const COMPONENTS_DIR = path.join(ROOT, '_templates/components');
const OFFERINGS_PATH = path.join(ROOT, 'content/data/offerings.json');

let _registry = null;
let _offeringsIndex = null;

function buildRegistry() {
  if (!fs.existsSync(COMPONENTS_DIR)) {
    return {};
  }

  const registry = {};
  const files = fs.readdirSync(COMPONENTS_DIR).filter(f => f.endsWith('.html'));

  for (const file of files) {
    const name = path.basename(file, '.html');
    registry[name] = path.join(COMPONENTS_DIR, file);
  }

  return registry;
}

function getRegistry() {
  if (!_registry) {
    _registry = buildRegistry();
  }
  return _registry;
}

function getRegisteredComponents() {
  return Object.keys(getRegistry());
}

function renderComponent(name) {
  const registry = getRegistry();

  if (!registry[name]) {
    const available = Object.keys(registry).join(', ') || '(none yet)';
    throw new Error(
      `Component '${name}' not found in _templates/components/. Available: ${available}`
    );
  }

  return fs.readFileSync(registry[name], 'utf8');
}

function resolveComponentTokens(html) {
  const registry = getRegistry();
  const TOKEN_PATTERN = /\{\{component:([A-Za-z0-9_-]+)\}\}/g;
  const HAS_TOKEN = /\{\{component:[A-Za-z0-9_-]+\}\}/; // non-global: safe to reuse as a loop condition
  const MAX_DEPTH = 6; // components may nest (e.g. Footer includes NewsletterSignup); cap guards against cycles

  let resolved = html;
  let depth = 0;
  while (HAS_TOKEN.test(resolved)) {
    if (depth >= MAX_DEPTH) {
      throw new Error(
        `Component nesting exceeded ${MAX_DEPTH} levels — likely a cycle (a component including itself, directly or transitively).`
      );
    }

    const missingComponents = [];
    resolved = resolved.replace(TOKEN_PATTERN, (match, name) => {
      if (!registry[name]) {
        missingComponents.push(name);
        return match;
      }
      return fs.readFileSync(registry[name], 'utf8');
    });

    if (missingComponents.length > 0) {
      const available = Object.keys(registry).join(', ') || '(none yet)';
      throw new Error(
        `Unknown component tokens: ${missingComponents.join(', ')}. Available: ${available}`
      );
    }

    depth++;
  }

  return resolved;
}

function resolveSiteTokens(html) {
  return html.replace(/\{\{site:([A-Z0-9_]+)\}\}/g, (match, key) => {
    if (!(key in SITE_CONFIG)) {
      throw new Error(`Unknown site token: {{site:${key}}}. Available: ${Object.keys(SITE_CONFIG).join(', ')}`);
    }
    return SITE_CONFIG[key];
  });
}

// ── Offering tokens ───────────────────────────────────────────────────────────
// {{offering:<key>.<dot.path>}} resolves to a scalar value in content/data/offerings.json.
// The offerings array is indexed by `key`. Numbers under a key ending in `_gbp`
// render as £-prefixed, locale-grouped integers (10000 → "£10,000"). All other
// scalars pass through verbatim. offerings.json is the single source of truth for
// names/prices/durations — Check #10 forbids hardcoding these in templates.
// Fail-fast on unknown key / unknown path / non-scalar path, matching resolveSiteTokens.

function getOfferingsIndex() {
  if (!_offeringsIndex) {
    const data = JSON.parse(fs.readFileSync(OFFERINGS_PATH, 'utf8'));
    _offeringsIndex = {};
    for (const offering of data.offerings || []) {
      _offeringsIndex[offering.key] = offering;
    }
  }
  return _offeringsIndex;
}

function formatGbp(value) {
  return '£' + Number(value).toLocaleString('en-GB');
}

function resolveOfferingTokens(html) {
  const index = getOfferingsIndex();

  return html.replace(/\{\{offering:([a-z0-9-]+)\.([A-Za-z0-9_.]+)\}\}/g, (match, key, dotPath) => {
    const offering = index[key];
    if (!offering) {
      throw new Error(
        `Unknown offering token: {{offering:${key}.${dotPath}}}. Available keys: ${Object.keys(index).join(', ')}`
      );
    }

    const segments = dotPath.split('.');
    let value = offering;
    for (const segment of segments) {
      if (value == null || typeof value !== 'object') {
        throw new Error(`Offering token {{offering:${key}.${dotPath}}} — path stops at a non-object before '${segment}'.`);
      }
      value = value[segment];
    }

    if (value === undefined) {
      throw new Error(`Offering token {{offering:${key}.${dotPath}}} — no value at that path in offerings.json.`);
    }
    if (value !== null && typeof value === 'object') {
      throw new Error(`Offering token {{offering:${key}.${dotPath}}} resolves to a ${Array.isArray(value) ? 'array' : 'object'}, not a scalar. Tokens must point at a single value.`);
    }

    const lastSegment = segments[segments.length - 1];
    if (/_gbp$/.test(lastSegment) && value !== null) {
      return formatGbp(value);
    }
    return String(value);
  });
}

// ── Article tokens ────────────────────────────────────────────────────────────
// Bare {{name}} tokens used by build-hub.js for per-article values (title, author,
// content, etc.). Matches only colon-free identifiers, so {{component:X}} /
// {{site:KEY}} / {{offering:key.path}} tokens in the same template pass through
// untouched for their own resolvers. Unlike those resolvers, an *unknown* bare
// token is left as-is (it may belong to a resolver that runs later in the chain);
// but any token in `required` that resolves to empty/undefined throws — this
// closes the silent-empty-string gap build-hub.js's old safeReplace() had, where
// a typo'd or missing frontmatter field shipped an invisible blank instead of
// failing the build.
function resolveArticleTokens(html, tokens, { required = [], context } = {}) {
  const TOKEN_PATTERN = /\{\{([A-Za-z_][A-Za-z0-9_]*)\}\}/g;
  const missingRequired = [];

  const resolved = html.replace(TOKEN_PATTERN, (match, key) => {
    if (!(key in tokens)) {
      return match;
    }
    const value = tokens[key];
    if (required.includes(key) && (value === undefined || value === null || value === '')) {
      missingRequired.push(key);
    }
    return value === undefined || value === null ? '' : String(value);
  });

  if (missingRequired.length > 0) {
    throw new Error(
      `${context || 'Article'} is missing required token value(s): ${missingRequired.join(', ')}`
    );
  }

  return resolved;
}

function validateComponentTokens(html, context) {
  const TOKEN_PATTERN = /\{\{component:([A-Za-z0-9_-]+)\}\}/g;
  const registry = getRegistry();
  const missing = [];
  let match;

  while ((match = TOKEN_PATTERN.exec(html)) !== null) {
    if (!registry[match[1]]) {
      missing.push(match[1]);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `${context || 'Template'} references unknown components: ${missing.join(', ')}`
    );
  }
}

module.exports = {
  getRegisteredComponents,
  renderComponent,
  resolveComponentTokens,
  resolveSiteTokens,
  resolveOfferingTokens,
  resolveArticleTokens,
  validateComponentTokens,
};
