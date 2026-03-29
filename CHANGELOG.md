# Changelog

All notable changes to this project are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)

---

## [Unreleased]

_Next items: hero imagery swap, Lighthouse targets, autonomous agent fleet._

### Added

- **`cohort.html`** — AI Implementation Cohort landing page. 8-week programme for senior leaders building practical AI capability with peer learning and expert guidance. Reuses proven patterns from `index.html` (hero with VSL placeholder, problem/solution structure, qualification section, cohort details, application form with metadata routing). Pricing: £2,000 + VAT per person. Starting week of 20th April 2026. 10 spaces available (12 total, 2 secured). Form includes capability gap question for qualification. Integrated with existing form infrastructure (`assets/js/forms.js`, `netlify/functions/lead-capture.js`) with `interest=cohort` and `source=cohort_page` metadata.
- **Mandatory Planning Workflow (AI-RULES.md §1.5)** — enforces plan → review → approve → implement → verify workflow for all non-trivial changes. Includes granularity requirement: break large initiatives into single atomic tasks. Violations result in immediate stop-work and rollback. Added to Agent behaviour contract (§6) and Definition of Done (§7).

### Removed

- **Campaign banner from `index.html`** — removed unapproved full-width promotional banner (lines 365-375) that was added without explicit approval in previous session.
- **`workshops.html`** — deleted entire file. Leadership Activation page will be created separately following proper planning workflow.
- **Workshops links from navigation** — removed "Workshops" from desktop and mobile navigation on both homepage and cohort page to prevent 404 errors.
- **Inconsistent navigation IDs** — standardized all mobile navigation to use `mobile-nav-home` ID across homepage, cohort page, and Insights templates. Removed hardcoded Workshops links from `_templates/index.html` and `_templates/article.html`.
- **Missing nav.js script** — added `/assets/js/nav.js` to cohort page to enable mobile hamburger menu functionality.
- **`.session-protocol.json`** — repo-level protocol profile for session lifecycle automation.
  Defines branch allowlist, quality-gate commands, managed documentation files, session log path,
  and session-end write/push policy for portable cross-repo adoption.
- **`scripts/session-protocol-utils.js`** — shared protocol helper module for branch matching,
  `CLAUDE.md` next-session block ensuring, and idempotent managed-doc session block upserts.
- **`scripts/test-session-protocols.js`** — protocol regression harness validating wildcard
  branch policy matching plus idempotent session block and priorities-block behavior.
- **`scripts/skills-sync.js`** — new shared-skills sync utility for multi-repo workflows.
  Pulls a canonical skills repo to local cache and installs skill folders into
  `~/.claude/skills` via symlink or copy mode. Tracks managed skills by namespace in
  `.managed-skills.json` for safe cleanup on updates.
- **`.agent-skills-profile.json`** — repo-level pointer config for canonical skills source,
  branch/tag, install path, sync mode, namespace, and optional naming prefix.
- **`docs/agent-skills-shared-ops.md`** — operational guide for managing one canonical skills
  repo across many project repos while keeping local CLI sessions consistent.
- **`llms.txt`** — AI-readable context file (llmstxt.org standard). Gives LLMs and AI crawlers
  structured context about Accelerator X: what we do, key pages, contact, and a pointer to the
  codebase. Complements `robots.txt` for AI systems that read structured site metadata.
- **AI agent Easter eggs** — repo made public; added orientation for AI systems reading the codebase:
  comment block in `index.html` for crawlers indexing the page source, comment in `robots.txt`
  pointing to `/llms.txt`, expanded `AGENTS.md` from a redirect stub to a substantive orientation
  document covering the engineering philosophy and onboarding steps.

### Changed

- **`scripts/session-start.js`** — hardened with strict flag parsing, profile validation,
  branch-policy enforcement, stale cockpit checks, and structured severity-based output
  (`human` default, `--json` machine mode).
- **`scripts/session-end.js`** — hardened to safe-by-default execution: plan mode by default,
  explicit `--confirm-write` gating, optional `--dry-run`, prompt/`--yes` confirmation,
  scoped staging, quality-gate enforcement, policy-controlled push behavior, and idempotent
  single-block managed-doc updates (replaces append-style session markers).
- **`package.json`** — added explicit protocol command variants:
  `session-start:json`, `session-end:dry-run`, `session-end:write`, `session-end:write:yes`,
  and `test:session-protocols`.
- **Protocol docs** — updated `.claude/rules/session.md`, `CLAUDE.md`, and `README.md`
  to document safe-by-default session-end modes and profile-driven policy controls.
- **`package.json`** — added `skills:sync` and `skills:sync:force` scripts for standardised
  local skill sync from canonical source.
- **`README.md`** — added shared skills sync usage and linked the operations doc in
  source-of-truth references.
- **`AGENTS.md`** — expanded from a thin redirect to a full agent orientation document: quick
  orientation, engineering philosophy summary, and pre-work checklist (build, check, roadmap).
- **`README.md`** — fixed stale email capture description: newsletter flow now correctly documented
  as direct POST → `newsletter-subscribe` function (Netlify Forms bypassed since March 2026).

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

<!-- Session 20260322-211525 logged -->

<!-- Session 20260322-234000 logged -->

<!-- Session 20260322-235352 logged -->

<!-- Session 20260329-180314 logged -->

<!-- SESSION_PROTOCOL:START -->
- Session ID: 20260329-202824
- Updated: 2026-03-29T19:28:25.588Z
- Mode: write
<!-- SESSION_PROTOCOL:END -->
