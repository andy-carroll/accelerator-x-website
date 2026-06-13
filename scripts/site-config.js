'use strict';

// ── Site-wide canonical values ────────────────────────────────────────────────
//
// Single source of truth for URLs, email addresses, and external tool links
// that appear in multiple templates.
//
// Usage in templates: {{site:KEY}}
// Resolution: build-components.js resolveSiteTokens() — called by every build
//   script after resolveComponentTokens(). Throws on unknown key at build time.
//
// Adding a new value:
//   1. Add it here.
//   2. Use {{site:YOUR_KEY}} in templates — never paste the raw value.
//   3. Run `npm run build`.
//
// AI-RULES.md §Philosophy: "We never hardcode site-wide values that are defined
// here — use {{site:KEY}} tokens instead."
// ─────────────────────────────────────────────────────────────────────────────

const SITE_CONFIG = {
  // Founder LinkedIn profiles
  ANDY_LINKEDIN:    'https://www.linkedin.com/in/heyandycarroll/',
  TOBY_LINKEDIN:    'https://www.linkedin.com/in/toby-henry-79498b13/',

  // Company LinkedIn
  COMPANY_LINKEDIN: 'https://www.linkedin.com/company/accelerator-x-uk/',

  // Founder email addresses
  ANDY_EMAIL:       'andy@accelerator-x.ai',
  TOBY_EMAIL:       'toby@accelerator-x.ai',
  HELLO_EMAIL:      'hello@accelerator-x.ai',

  // External tools
  QUIZ_URL:         'https://quiz.accelerator-x.ai',
};

module.exports = { SITE_CONFIG };
