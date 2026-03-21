# Changelog

All notable changes to this project are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)

---

## [Unreleased]

_Next items: hero imagery swap, Lighthouse targets, autonomous agent fleet._

### Added

- **`.githooks/pre-commit`** — pre-commit hook committed to source control in `.githooks/`.
  Activated automatically by `npm install` via the new `prepare` script in `package.json`.
  Every environment (fresh clone, new worktree, AI agent) now gets enforcement without
  any manual setup step.
- **`.env.example`** — canonical documentation of all five required environment variables
  with one-line explanations, where to obtain each value, and which function uses it.
  Closes the gap that contributed to the hardcoded `SLACK_WEBHOOK_URL` incident.
- **Check 7 in `scripts/check.js`** — CSS design token drift detection. Scans `styles.css`
  line by line, tracking `:root` block boundaries. Flags any hex colour used outside the
  token definitions. Found and fixed three pre-existing violations on first run.
- **Check 8 in `scripts/check.js`** — built HTML validation. Checks `insights/articles/*.html`
  for `<img>` tags missing `alt` attributes (a11y + SEO) and duplicate `id=` values per file.
- **`npm audit --audit-level=high`** in `.github/workflows/standards.yml` — dependency
  security scanning on every push. Fails CI on high or critical vulnerabilities.
- **Branch protection guide** in `AI-RULES.md §5` — documents the exact GitHub settings
  to enable (required status checks, up-to-date branches) for when PRs are adopted.

### Changed

- **`package.json`** — added `prepare` script: `git config core.hooksPath .githooks`.
  Runs after every `npm install` to activate committed hooks. No manual setup required.
- **`styles.css`** — fixed 3 hardcoded hex colours found by check 7: gradient in hero card
  (`#ffffff`, `#f8fafc` → `var(--color-background/surface)`), hero media background
  (`#e2e8f0` → `var(--color-border)`), testimonial stars (`#f5c542` → `var(--color-star)`).
  Added `--color-star: #f5c542` to `:root` design tokens.
- **`AI-RULES.md §Philosophy "We never"`** — two new classified rules: hardcoded hex colours
  outside design tokens (`check.js#7`), and built HTML with missing alt/duplicate IDs (`check.js#8`).

### Added

- **`scripts/check.js`** — codebase standards enforcement script (`npm run check`).
  Five checks derived from AI-RULES.md §Philosophy: no inline scripts in templates,
  no hardcoded secrets in functions, no unsubstituted build tokens in articles,
  no dead `<script src>` references, CHANGELOG [Unreleased] has content.
  Each check documents which rule it enforces and the real incident that prompted it.
- **`.git/hooks/pre-commit`** — local gate: runs `npm run check` before every commit.
  Blocks commits that violate codebase standards. Zero-dependency shell script.
- **`.github/workflows/standards.yml`** — CI gate: runs `npm run build` + `npm run check`
  on every push to `main`. Parallel jobs — either failure marks the push as failing.
- **Check 6 in `scripts/check.js`** — every "We never" rule in `AI-RULES.md` must be
  classified with `<!-- check: ... -->` or `<!-- not-automatable: reason -->`. Adding a
  rule without classifying it blocks the commit. A rule without enforcement is a wish.
- **`assets/js/hub-filter.js`** — extracted from inline script in `_templates/index.html`.
  Hub pathway tile filter and feed heading logic. `npm run check` caught this violation
  immediately on first run, demonstrating the gate working as intended.

### Changed

- **`_templates/index.html`** — inline `<script>` block replaced with
  `<script defer src="/assets/js/hub-filter.js">`. Codebase now has zero inline scripts.
- **`AI-RULES.md §2`** — Philosophy section added. Core principle: move fast by not
  making messes. Standards enforced by automation. Comments co-located, proportional,
  and pointing. Full "We never" list with six hard rules.

### Security

- **Slack webhook URL moved to env var** — removed hardcoded URL from `netlify/functions/submission-created.js`
  and `netlify/functions/newsletter-subscribe.js`; both now read `process.env.SLACK_WEBHOOK_URL`.
  Env var must be set in Netlify dashboard.

### Removed

- **Ghost `handleNewsletterSignup()`** — deleted from `submission-created.js`; newsletter signups are
  handled exclusively by `newsletter-subscribe.js` via direct JSON POST. Removes dead code and
  eliminates the stale Netlify Forms → Brevo path.
- **`newsletter-thanks.html`** — dead redirect page; no form points to it since switching to
  direct-function posting.

### Changed

- **`_templates/article.html`** — inline `<script>` block replaced with `<script defer src="/assets/js/article-init.js">`.
  Block reveal logic (BLUF box, nurture-trap, momentum footer) now lives in the external file.
  Token values moved to `data-bluf`, `data-cta`, `data-next` attributes on the container divs.
- **Contract comments** — both Netlify functions now have clear header comments documenting
  triggers, responsibilities, env var requirements, and the `{ success: true }` contract.

### Added

- **`assets/js/article-init.js`** — new file; reads `data-*` attributes on article page containers
  and removes `hidden` class where build-time token substitution produced a non-empty value.
- **JSDoc** on 7 public functions in `scripts/build-hub.js`: `loadTemplate`, `resolveSiteUrl`,
  `loadAuthors`, `resolveAuthorProfile`, `renderSharePanel`, `generateSitemap`, `build`.
- **ROADMAP tech debt section** — 4 deferred items added: styles.css split, index.html partials,
  hub-filter.js extraction, Netlify function tests.

### Added

- **Brevo email infrastructure** — `mail.accelerator-x.ai` subdomain authenticated (SPF/DKIM);
  sender identity `newsletter@mail.accelerator-x.ai` / Accelerator-X Team configured
- **Welcome email automation** — Brevo list #9 trigger: contact added → send welcome email.
  Subject: "You're in — here's what to expect from Accelerator X". Single opt-in.
- **`netlify/functions/newsletter-subscribe.js`** — new standalone function; accepts direct
  JSON POST from newsletter forms; adds contact to Brevo list #9; notifies Slack `#website-leads`.
  Source field distinguishes origin: `landing_newsletter` / `insights_article` / `insights_hub`.
- **`BREVO_API_KEY`** — added to Netlify env vars; end-to-end tested ✅

### Changed

- **Newsletter forms bypass Netlify Forms** — `newsletter-signup` (homepage),
  `insights-subscribe` (article pages + hub index) now POST directly to
  `/.netlify/functions/newsletter-subscribe`. Eliminates 100/month Netlify Forms limit.
  Honeypot spam field retained.
- `docs/navigation-architecture-thesis.md` — new strategic thesis: arrival states framework,
  competitive nav analysis (Stripe, Intercom, Notion, Linear), organising schemes, mobile
  patterns, search integration, measurement framework (First-Click Success Rate), PostHog
  navigation tracking snippets, phased evolution path
- `docs/world-class-landing-pages-thesis.md` — expanded with: Arrival States Framework,
  One-Click Clarity Principle, Navigation as Diagnostic Tool, Search Integration Challenge,
  Mobile Navigation Challenge, First-Click Success Rate metric added to success metrics

---

## [1.0.0] — 2026-03-17 · Public launch

Site went live at `https://accelerator-x.ai`.

### Added

- **Article JSON-LD structured data** — `Article` schema on all 6 articles: headline,
  description, image, datePublished, author (with LinkedIn URL), publisher
- **OG meta tags on articles** — `og:url`, `article:author`, `article:published_time`
  added to article template; all articles regenerated
- **LinkedIn author URLs** — stored in `content/data/authors.json` for Andy + Toby
- **Build-time OG excerpt validator** — `build-hub.js` warns if article excerpt < 100 chars
- **`sitemap.xml`** — auto-generated by `npm run build`; all 8 URLs included with `lastmod`
- **`robots.txt`** — permissive, references sitemap
- **Netlify Functions** — `netlify/functions/submission-created.js`: routes form submissions
  to Brevo (list #9) and Slack `#website-leads`
- **Hero pill badges** — configurable via `content/data/hero-media.config.json`
- **Hero Media Library System** — config-driven homepage hero cycling with drop-in
  source folder workflow, responsive variants, performance-safe lazy loading
  (`content/hero-source/` → `npm run process:hero-images` → `npm run build`)
- **Google Search Console** — `accelerator-x.ai` domain property verified (manual, Andy)

### Changed

- Hero pill copy: "Boardroom clarity" + "Hands-on support" (no full stops)
- Homepage JSON-LD price corrected: 8-week cycle → £12,000 (was £25,000)
- LinkedIn company URL corrected in footer + JSON-LD → `linkedin.com/company/accelerator-x-uk/`
- Page `<title>` expanded: "Accelerator X — AI Transformation for Business Leaders"
- Excerpt for `the-implementation-gap` extended to meet 100-char OG minimum
- Email capture switched from GoHighLevel to **Brevo** (list #9)
- Testimonials generated from `content/data/testimonials.json` at build time
- PostHog product analytics wired to production workspace

### Fixed

- `AX-image-04-rounded.png` (5.8 MB) now served as optimised WebP (45.9 KB)
- All `<img>` tags given `width`/`height`/`loading`/`decoding` attributes (CLS prevention)

---

## [0.2.0] — 2026-02-23 · Image pipeline, design system clean-up

### Added

- `scripts/img-process.sh` — resize source PNG to 800w/400w + WebP conversion via `cwebp`
- `scripts/img-audit.sh` — pre-publish audit; exits 1 on oversized images, missing `<img>`
  attributes, or large unresponsive sources
- Optimised responsive variants of `AX-image-04-rounded` (800w/400w · WebP + PNG fallback)
- §7 Image Standards added to `docs/design-system.md`
- Image pipeline guidance added to `AI-RULES.md` (§3 Allowed, §4 Verification, §10 Decision log)

### Changed

- Section 2 hero image converted to `<picture>` element with WebP source, PNG fallback,
  `srcset`, `sizes`, intrinsic dimensions, and `loading="eager"`
- `.legal-card` hardcoded hex values replaced with CSS design tokens (`var(--color-*)`)
- Diff-card grid `style="padding-top: 4rem;"` inline style replaced with Tailwind `pt-16`

### Fixed

- Header logo HTML `width` attribute without `w-auto` class caused full-width stretch

---

## [0.1.0] — 2026-02-22 · Brand pack, typography, section styling

### Added

- Self-hosted Aptos font (brand alignment)
- Brand pack assets applied across site
- Differentiators section with brand illustrations
- Process section with pastel cards and step indicators
- Problem section with two-column layout and illustration
- `docs/design-system.md` — design system reference
- `AI-RULES.md` — AI agent rules and decision log
- `netlify.toml` — cache headers and security headers
- `docs/landing-page-spec.md` — phased product spec (Phases 1–3)

### Changed

- Apply section underline restyled to hand-drawn pattern
- Diff-cards: mobile top margin added to clear illustration overlap

---

_Project started: February 2026_
