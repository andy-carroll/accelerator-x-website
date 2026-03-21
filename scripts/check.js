#!/usr/bin/env node
'use strict';

// scripts/check.js — codebase standards enforcement
//
// Runs a targeted battery of checks derived from AI-RULES.md §Philosophy.
// Every check here exists because a real violation occurred or was identified
// as a plausible failure mode for this specific codebase.
//
// Usage:  npm run check
// Also:   pre-commit hook (blocks commit on failure)
//         GitHub Actions CI (blocks merge on failure)
//
// Adding a new check: add a function below, call it in main(), add a comment
// explaining which rule it enforces and what real incident prompted it.

const fs   = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// ── Utilities ─────────────────────────────────────────────────────────────────

let violations = 0;
let warnings   = 0;

const fail = (msg) => { console.error(`  ✗  ${msg}`); violations++; };
const warn = (msg) => { console.warn( `  ⚠  ${msg}`); warnings++;   };
const pass = (msg) => { console.log(  `  ✓  ${msg}`);               };

function readFile(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

function filesIn(relDir, ext) {
  const dir = path.join(ROOT, relDir);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => !ext || f.endsWith(ext))
    .map(f => `${relDir}/${f}`);
}

// ── Check 1: No inline <script> blocks in templates ───────────────────────────
// Rule: AI-RULES.md §3 "No inline scripts"
// Incident: inline newsletter handler in _templates/article.html competed with
//   forms.js, silently swallowed events, and took hours to diagnose.

function checkNoInlineScripts() {
  console.log('\n[1] No inline <script> blocks in templates');

  // Matches <script> tags that are NOT external (src=) and NOT structured data (ld+json)
  const INLINE_SCRIPT = /<script(?![^>]*(?:\bsrc=|type=["']application\/ld\+json["']))[^>]*>/gi;

  let clean = true;
  for (const file of filesIn('_templates', '.html')) {
    const content = readFile(file);
    const matches = [...content.matchAll(INLINE_SCRIPT)];
    if (matches.length > 0) {
      fail(`${file} — ${matches.length} inline <script> block(s). Move logic to assets/js/`);
      clean = false;
    }
  }
  if (clean) pass('No inline scripts found in templates');
}

// ── Check 2: No hardcoded secrets in Netlify functions ────────────────────────
// Rule: AI-RULES.md §Philosophy "We never hardcode secrets"
// Incident: SLACK_WEBHOOK_URL hardcoded in submission-created.js and
//   newsletter-subscribe.js — exposed in public GitHub repo for weeks.

function checkNoHardcodedSecrets() {
  console.log('\n[2] No hardcoded secrets in netlify/functions/');

  const PATTERNS = [
    { re: /hooks\.slack\.com\/services\//i,  label: 'Slack webhook URL' },
    { re: /xoxb-\d{10,}-\d{10,}-\w{20,}/,   label: 'Slack bot token'   },
  ];

  let clean = true;
  for (const file of filesIn('netlify/functions', '.js')) {
    const content = readFile(file);
    for (const { re, label } of PATTERNS) {
      if (re.test(content)) {
        fail(`${file} — hardcoded ${label} detected. Use process.env.* instead`);
        clean = false;
      }
    }
  }
  if (clean) pass('No hardcoded secrets found in functions');
}

// ── Check 3: No unsubstituted build tokens in generated article HTML ──────────
// Rule: AI-RULES.md §Philosophy — the build is the contract
// Rationale: if a {{token}} appears in built output, the build silently produced
//   a broken page. This catches missed token substitution before it reaches prod.

function checkNoUnsubstitutedTokens() {
  console.log('\n[3] No unsubstituted {{tokens}} in built article HTML');

  let clean = true;
  for (const file of filesIn('insights/articles', '.html')) {
    const content = readFile(file);
    // Find any {{ not inside a <script type="application/ld+json"> block
    // Simple check: just flag any {{ appearance — tokens should never survive the build
    const lines = content.split('\n');
    const hits  = lines
      .map((line, i) => ({ line, n: i + 1 }))
      .filter(({ line }) => /\{\{/.test(line));

    if (hits.length > 0) {
      hits.forEach(({ line, n }) =>
        fail(`${file}:${n} — unsubstituted token: ${line.trim().slice(0, 80)}`)
      );
      clean = false;
    }
  }
  if (clean) pass('All build tokens substituted in article HTML');
}

// ── Check 4: All <script src="..."> references in templates + index.html exist ─
// Rule: AI-RULES.md §Philosophy — dead references must not exist
// Rationale: a missing JS file 404s silently in production. Catches the case
//   where a script is referenced before it is created, or after it is moved.

function checkScriptReferencesExist() {
  console.log('\n[4] All <script src="..."> references resolve to existing files');

  const SRC_ATTR = /<script[^>]+src=["']([^"']+)["']/gi;

  const filesToScan = [
    ...filesIn('_templates', '.html'),
    'index.html',
  ];

  let clean = true;
  for (const file of filesToScan) {
    const content = readFile(file);
    for (const match of content.matchAll(SRC_ATTR)) {
      const src = match[1];
      // Only check local paths (skip CDN/external URLs)
      if (src.startsWith('http') || src.startsWith('//')) continue;
      // Strip leading slash to resolve from repo root
      const resolved = path.join(ROOT, src.replace(/^\//, ''));
      if (!fs.existsSync(resolved)) {
        fail(`${file} — references missing file: ${src}`);
        clean = false;
      }
    }
  }
  if (clean) pass('All script references resolve to existing files');
}

// ── Check 5: CHANGELOG has content under [Unreleased] ────────────────────────
// Rule: AI-RULES.md §7 Definition of Done — CHANGELOG always updated
// This is a warning (not a failure) — there are legitimate moments when
//   [Unreleased] is empty (e.g. immediately after cutting a release).

function checkChangelogHasContent() {
  console.log('\n[5] CHANGELOG [Unreleased] section has content');

  const content = readFile('CHANGELOG.md');
  const section = content.match(/## \[Unreleased\]([\s\S]*?)(?=\n## \[|\n---\n## \[|$)/);

  if (!section) {
    warn('CHANGELOG.md — could not find [Unreleased] section');
    return;
  }

  const body = section[1].replace(/<!--.*?-->/gs, '').trim();
  // Check for at least one ### heading (Added / Changed / Fixed / etc.)
  const hasEntries = /^###\s/m.test(body);

  if (!hasEntries) {
    warn('CHANGELOG.md [Unreleased] has no entries. Add one before shipping.');
  } else {
    pass('[Unreleased] section has content');
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────

function main() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  Accelerator X — Standards Check');
  console.log('  AI-RULES.md §Philosophy enforcement');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  checkNoInlineScripts();
  checkNoHardcodedSecrets();
  checkNoUnsubstitutedTokens();
  checkScriptReferencesExist();
  checkChangelogHasContent();

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  if (violations > 0) {
    console.error(`\n  ✗  ${violations} violation(s). Fix before committing.\n`);
    process.exit(1);
  } else if (warnings > 0) {
    console.warn(`\n  ✓  Passed with ${warnings} warning(s).\n`);
  } else {
    console.log('\n  ✓  All checks passed.\n');
  }
}

main();
