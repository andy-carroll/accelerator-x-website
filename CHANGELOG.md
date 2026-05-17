# Changelog

All notable changes to this project are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)

---

## [Unreleased]

_Active track: `rebuild/v2` — full visual + structural rebuild. `main` is live and untouched._
_Phase 3 Page Assembly complete — all 4 inner pages assembled; homepage v2 conversion done_

### Added

- **Phase 3 — Offering detail pages (Company Enablement)** (`rebuild/v2`): first offering detail sub-page built
  - **`_templates/offerings/company-enablement.html`** — full page template; unique 2-phase layout with Phase Arc (hero 3-col arc: cyan Phase 0 panel / arrow / Phase 1+ panel), Phase 0 in-depth section (3 plan steps + 4 deliverables), Bridge block (centered dashed box), Phase 1+ section (3 stream cards + cycle chain), FitCheck, 6-question FAQ, 2-col proof section (quote + placeholder case study), dark final CTA; all CTAs → `/contact/`; complete `<head>` with Service JSON-LD, all CSS links
  - **`assets/css/components/CompanyEnablement.css`** — new 12-section CSS file for layout elements unique to this page: `.ax-offering-hero` (2-col hero grid, sticky sidebar), `.ax-phase-arc` (3-col arc with `--cyan` panel variant), `.ax-ce-steps` / `.ax-ce-deliverables` (inline plan/deliverable grids), `.ax-bridge` (dashed border centered box), `.ax-ce-streams` (3-col capability streams), `.ax-cycle-chain` (horizontal scrollable with `--advisory` amber variant), `.ax-ce-proof` (2-col proof), `.ax-ce-cta` (dark CTA section), `.ax-accent` utility; fully token-based
  - **`scripts/build-inner-pages.js`** — Company Enablement entry registered in PAGES array; page now builds to `what-we-do/company-enablement/index.html`
  - **6 page specs** written to `docs/page-specs/`: `leadership-cohort.md`, `leadership-activation.md`, `senior-leader-acceleration.md`, `fractional-advisory.md` (shell — blocked on founder content), `company-enablement.md`, `talks-events.md`

- **Phase 4 — Content pipeline** (`rebuild/v2`): migrated articles to the Build Plan §10 data model:
  - **6 article frontmatter files** — `date` renamed to `published`; `format` field added (`article` / `video` / `podcast`); `category` and `type` fields removed; Build Plan canonical tag (`Strategy` / `Capability` / `Tooling`) added as primary (first) tag in each article's `tags` array
  - **`scripts/build-hub.js`** — added `computeReadTime()` (word count ÷ 200, min 1 min); added `resolveFilterTag()` (maps primary tag to hub filter bucket); added `renderArticleTile()` (generates `ax-article-tile` component HTML with `data-format`, `data-tag`, byline, read time); removed `categoryMap` and old ad-hoc `article-card` tile markup; sort and sitemap lastmod now use `published` field; `safeReplace` now injects `published`, `format`, `read_time`, and derives `category` from first tag for article-page display
  - **`_templates/article.html`** — `{{date}}` token replaced with `{{published}}` in OG `article:published_time` meta and JSON-LD `datePublished`
  - **`_templates/index.html`** — hub pathway filter tiles updated to Build Plan taxonomy: Strategy (For Leaders) / Capability (For Teams) / Tooling (Tech & AI); filter IDs updated from `strategy` / `implementation` / `capability` to `strategy` / `capability` / `tooling`
  - **`assets/js/hub-filter.js`** — updated to target `.ax-article-tile` (was `.article-card`) and `data-tag` attribute (was `data-category`)

### Fixed

- **`content/articles/001-the-implementation-gap.md`** — `next_article_url` was `"#"` (dead link); corrected to `/insights/articles/the-5-stage-build-sequence.html`
- **`scripts/build-hub.js`** — `TAG_FILTER_MAP` missing `'Cases'` and `'Opinion'` entries despite both being declared as canonical primary tags in Build Plan §10 comment; `Cases` now routes to `capability`, `Opinion` to `strategy`; comment updated to clarify routing intent; `allowedChangedPathPatterns` in `.session-protocol.json` updated to include `content/articles/*.md` and `content/data/*.json`
- **`assets/js/hub-filter.js`** — live `ReferenceError` fixed: `categoryId` renamed to `tagId` throughout `filterContent()` after parameter rename in previous edit left lines 33 and 39 referencing an undefined variable; stale comment updated to reflect `data-tag` / `.ax-article-tile`
- **`scripts/build-hub.js`** — `TAG_FILTER_MAP` was missing `'Capability': 'capability'`; three articles with `Capability` as primary tag were silently falling through to the default; now correctly resolves to the `capability` filter bucket; `AVG_READING_SPEED_WPM` extracted as named constant; taxonomy source-of-truth comment added above `TAG_FILTER_MAP`
- **`scripts/session-end.js`** — added `detectStalePriorities()`: cross-references `## Next Session Priorities` against completed items (lines containing `✅`) in `## Next (do in this order)`. Write mode blocks with `EXIT.QUALITY_GATE_FAILURE` if a completed task label is still listed as a priority; plan/dry-run modes emit a warning. Prevents the session-end from closing cleanly when priorities have drifted from the actual project state.

### Added

- **Phase 3 — Inner page assembly (complete)** (`rebuild/v2`): all four marketing pages assembled from v2 component library:
  - `/what-we-do/` — PageHero + `{{component:OfferingTable}}` + `{{component:DecisionTree}}` + `{{component:CTABand}}`; full JSON-LD `WebPage` schema; CSS links for OfferingTable, OfferingCard, DecisionTree
  - `/how-we-work/` — PageHero + principles grid (4 items) + approach cards (4 cards) + engagement phases (Phase 0/1/2…n/Advisory) + contrast table (never/always) + pull-quote (`<blockquote>` with Mark Bennett attribution) + `{{component:CTABand}}`
  - `/about/` — PageHero ("Two operators. One partnership.") + founders hero (real portrait images, full track records for Toby + Andy) + origin story (placeholder — see GO-LIVE-CHECKLIST) + beliefs (6 numbered operating principles) + `{{component:LogoStrip}}` + `{{component:CTABand}}`
  - `/contact/` — PageHero + `{{component:ApplyForm}}` + direct contact cards (Toby + Andy, toby@/andy@ emails, LinkedIn) + quiz prompt (→ `quiz.accelerator-x.ai`) + `{{component:Footer}}`; `ContactPage` JSON-LD schema; no CTABand (form is the CTA)
- **`scripts/build-inner-pages.js`** — new build script; processes all 4 inner page templates via `resolveComponentTokens`; creates output directories idempotently; integrated into `npm run build` chain
- **`assets/css/components/InnerPages.css`** — new shared CSS (~430 lines) for all inner page sections: `.ax-inner-section`, `.ax-principles`, `.ax-approach`, `.ax-engagement`, `.ax-contrast`, `.ax-pull-quote`, `.ax-founders-hero`, `.ax-origin-story`, `.ax-beliefs`, `.ax-contact-layout`, `.ax-contact-direct`, `.ax-contact-card`, `.ax-quiz-prompt`; fully token-based; mobile-first (640/768/1024 breakpoints)
- **`package.json`** — added `"build:inner-pages": "node scripts/build-inner-pages.js"` script; added to end of `build` chain
- **`scripts/build-hub.js`** — added 4 inner pages to `staticPages` array in `generateSitemap()`; sitemap now has 12 URLs (was 8)

### Fixed

- **`CTABand.html`** — CTA destination updated from `/#apply` to `/contact/`; now that `/contact/` is built, the pending decision (documented in §1f of GO-LIVE-CHECKLIST) is resolved
- **`contact.html`** — wrapped `{{component:ApplyForm}}` in `<div class="ax-contact-layout">` rather than `<section>`; `ApplyForm` already renders its own `<section aria-labelledby="apply-form-heading">`, so wrapping in another labelled section would create redundant landmark nesting

### Documentation

- **`docs/GO-LIVE-CHECKLIST.md` §7** — added dead v1 CSS cleanup item: ~200 lines of orphaned rules (`.hero-shell`, `.diff-card`, `.process-card`, `.problem-headline`, `.testimonials-*`, etc.) to remove from `assets/css/styles.css` in the go-live cutover PR

### Added

- **`HomeSections.css`** — new component CSS covering all 5 homepage inline sections (post-build quality pass: fixed `.ax-hero__sub` margin conflict, `1.75rem` → `var(--space-6)`, raw `720px` → `var(--container-tight)` ×2, redundant margin shorthand on `.ax-process__heading`, redundant `margin-bottom` on `.ax-why-us__card-icon`)
- **`main.js`** — stripped 5 dead v1 section-specific reveal functions and their IntersectionObservers (`.problem-headline`, `.different-headline`, `.testimonials-headline`, `.process-card`, `.apply-shell`); generic `.reveal` observer remains; all v2 section headings, cards, and phase tiles now carry `reveal`/`reveal-delay-*` classes for staggered scroll animation

- **`HomeSections.css`** — new component CSS covering all 5 homepage inline sections (Hero, Problem, WhyUs, Process, Testimonials) using v2 design tokens; BEM naming (`ax-hero`, `ax-problem`, `ax-why-us`, `ax-process`, `ax-testimonials`); fully responsive (mobile-first, tablet 640px+, desktop 1024px+)
- **Phase 3 — Homepage inline section rebuild** (`rebuild/v2`): replaced all 5 v1 Tailwind/styles.css inline sections with v2 token-based BEM markup:
  - Hero: v2 copy ("Stop buying tools. Start building capability."), `chip--kicker` availability badge, `ax-hero__heading` display type, existing hero media library preserved
  - Problem: warm paper background panel (`bg-paper-deep`), 2-col layout at 1024px+, `ax-kicker--accent` kicker
  - Why Us (was "Different"): dark navy, 3 cards with numbered monospace icons (01/02/03), updated copy (founder-led / all three / outgrow us)
  - Process: 4-phase timeline (Phase 0 · Phase 1 · Phase 2…n · Advisory), off-white background, highlight treatment on Phase 0
  - Testimonials: dark navy, `ax-testimonial-card` BEM cards with gold star ratings; real client quotes kept, cards converted from Tailwind to v2 tokens
- **Go-live governance** — `docs/GO-LIVE-CHECKLIST.md` created: forensic pre-launch audit covering content accuracy, links, forms, email flows, PostHog analytics (gold standard), SEO/AEO (gold standard), technical QA, responsive QA, pages to build, and owner sign-off. Maintained continuously — session protocol enforces adding new items whenever a placeholder or unresolved decision is introduced.
- **Session protocol** — pre-close audit in `.claude/rules/session.md` now includes mandatory go-live checklist sweep step
- **CLAUDE.md + AI-RULES.md** — checklist referenced in session quick cards and project context; stale `docs/go-live-checklist.md` path corrected to `docs/GO-LIVE-CHECKLIST.md`

### Fixed

- **`LogoStrip.html`** — removed "Premium Car Parks" (a client, not a founder's previous employer); header comment clarifies this is a pedigree strip not a client logo strip
- **`ProofRow.html`** — placeholder quote flagged with a `GO-LIVE-CHECKLIST.md §1d` pointer; case studies link commented out (restore when `/case-studies/` is live)
- **`CTABand.html`** — CTA destination updated from `/contact/` (page does not exist) to `/#apply`; decision pending on whether a `/contact/` page will be created — documented in both inline comment and checklist §1f

- **Phase 3 — Homepage partial assembly** (`rebuild/v2`):
  - `homepage-who.html` — replaced v1 "Who this is for" section with `{{component:FitCheck}}`
  - `homepage-trust.html` — replaced v1 logo grid with `{{component:ProofRow}}` + `{{component:LogoStrip}}`
  - `homepage-about.html` — replaced v1 bio cards with v2 founders section; both Toby and Andy have real portrait images, bios, track records using `ax-founder-card` BEM markup
  - `homepage-apply.html` — replaced v1 lead form with dark `ax-apply-section` wrapper + `{{component:ApplyForm}}`
  - `FounderCard.css` — added `ax-founders-section` wrapper CSS (responsive 2-col grid, `bg-paper-deep` background, container + gutter tokens)
  - `ApplyForm.css` — added `ax-apply-section` wrapper CSS (dark `bg-dark` background, centred header with `ax-apply-section__heading` and `__sub`)

- **Phase 2 Wave D — Interactive (complete)** (`rebuild/v2`):
  - `QuizCTA` — dark navy promo block; kicker + heading + benefit + pink CTA → `quiz.accelerator-x.ai`; 2-col ≥768px, single-col + full-width button below; registered in design system Interactive section
  - `ScarcityCard` — programme availability signal; `--cohort` variant (pink border, deadline + places) and `--open` variant (cyan border, lead-time framing); 2-col ≥640px, stacked + full-width button below
  - `CohortList` — active programme instance table; header row with open count; each row: date/duration + location + audience/places + Apply CTA; 4-col grid ≥640px, 2-col + full-span CTA below; `[hidden]` on `<section>` collapses entirely when no cohorts are live; registered in design system Interactive section
  - `ApplyForm` — 3-section application form ("Who you are" / "The business" / "The work"); pure-CSS radio chip groups for timeline selection (`input:checked + .chip`); consent checkbox with timestamped GDPR-compliant acceptance; SLA promise line; hooks into `[data-lead-form]` handler in `forms.js`; no new JS; registered in design system Interactive section
- **`assets/js/forms.js`** — `consent_given` (boolean) and `consent_timestamp` (ISO 8601 string) added to lead-capture payload; captured at submit time
- **`netlify/functions/lead-capture.js`** — `Consent Given` (checkbox) and `Consent Timestamp` (text) written to Airtable on every lead-capture submission; requires matching fields in Airtable prospects table before going live
- **`tokens.css`** — `.ax-kicker--accent` modifier added (`color: var(--action-accent)`); allows pink kicker without inline style override

### Fixed

- **`QuizCTA.html`** — replaced `style="color:var(--ax-pink)"` inline override with `.ax-kicker--accent` class; added `noreferrer` to `rel` on external link (was `noopener` only — Referer header was leaking)
- **`ScarcityCard.html`** — `role="status"` (live region) replaced with `role="region" aria-label="Programme availability"` on both variants; removed inline `margin-top` from open variant example
- **`ScarcityCard.css`** — removed dead `.ax-scarcity-card--open` rule which restated the base `border-left-color` and did nothing

- **Phase 2 Wave C — Content Blocks** (`rebuild/v2`) — all 13 content block components built:
  - `LogoStrip` — flex row of client/partner names with separator and eyebrow label
  - `ProofRow` — quote variant (big pull-quote + pink mark) and case-tile variant (2-col outcome grid)
  - `PlanLayers` — numbered vertical list with `::before` connecting rule and z-indexed bubbles
  - `OfferingTable` — desktop 6-col grid with ARIA table semantics; hidden below 1024px
  - `OfferingCard` — kicker + badge + meta grid standalone card for mobile/tablet
  - `DeliverablesGrid` — 4-up → 2-up → 1-up responsive grid of deliverable items
  - `FitCheck` — 2-col yes/no layout on bg-2 with coloured `::before` markers
  - `FAQList` — `<details>/<summary>` accordion; desktop opens all on load via `faq-init.js`
  - `CaseTile` — card with cover image (hover scale), sector chip, metrics grid; feature variant
  - `ArticleTile` — format-aware (`data-format`), play overlay for non-article; feature horizontal
  - `EventCard` — standard (light) and featured (navy, fully inverted) variants
  - `FounderCard` — identity header with portrait, socials, bio, track record list
  - `DecisionTree` — 2-col layout (intro + rows), 3-col row grid (`1fr auto 1fr`); quiz CTA
  - All 13 registered in `_templates/design-system/content.html`
  - All 13 CSS files linked in `_templates/design-system.html`, `_templates/homepage.html`
- **`assets/js/faq-init.js`** — extracted from FAQList component; safe to include on any page (no-ops if no `.ax-faq-item` elements present)
- **`assets/css/tokens.css`** — 6 new `--surface-*-subtle` tint tokens (`primary`, `accent`, `amber`, `green`, `muted`, `navy`); replace component-level `color-mix()` calls for broader browser compatibility
- **`scripts/check.js`** — `filesIn()` made recursive; quality gate now scans `_templates/components/` and `_templates/design-system/` subdirectories (previously only top-level `_templates/`)

### Fixed

- **`ProofRow.css`** — removed invalid `aria-hidden: true;` CSS property (was a no-op; `aria-hidden` is an HTML attribute, not a CSS property)
- **`FAQList.html`** — removed hardcoded `aria-expanded="false"` on `<summary>`; native `<details>` manages open/closed state and the attribute was factually wrong when JS opened items on desktop
- **`OfferingTable.html`** — added `role="rowgroup"` wrappers (`ax-offering-table__thead` / `ax-offering-table__tbody`) with `display: contents` so screen readers correctly identify the header vs. body row groups
- **All 6 Wave C CSS files** — replaced 10 `color-mix()` calls with new `--surface-*-subtle` design tokens for consistency with existing codebase and full browser compatibility

- **Architecture fixes (pre-Wave C)** (`rebuild/v2`):
  - `Footer.css` — newsletter column now spans full width (`grid-column: 1 / -1`) at 640px–1023px; fixes orphaned 3rd-column at tablet breakpoint
  - `build-homepage.js`, `build-hub.js` — both now call `resolveComponentTokens` after template assembly; `{{component:X}}` tokens work in all page builds
  - `_templates/homepage.html`, `_templates/article.html`, `_templates/index.html` — old v1 inline nav replaced with `{{component:Nav}}`; old v1/marker footer replaced with `{{component:Footer}}`; `id="main-content"` added to `<main>` in all three (skip link now has a target)
  - v2 CSS (`tokens.css`, `Buttons.css`, `Nav.css`, `Footer.css`) linked in all three page templates
  - `build-footer.js` — scoped down to `cohort.html` only; `index.html`, `insights/index.html`, and article pages now get their footer via `resolveComponentTokens` instead of the old marker-injection pattern
- **Phase 2 Wave B — Global Chrome** (`rebuild/v2`) — five fully-rendered Chrome components live in the design system showcase:
  - `_templates/components/Nav.html` + `assets/css/components/Nav.css` — sticky backdrop-blur header, skip link, desktop links, hamburger toggle wired to existing `nav.js` pattern
  - `_templates/components/Footer.html` + `assets/css/components/Footer.css` — dark 3-col grid footer (brand / nav / newsletter), 3-col at ≥1024px
  - `_templates/components/NewsletterCTA.html` + `assets/css/components/NewsletterCTA.css` — standalone full-width newsletter section, 2-col at ≥768px
  - `_templates/components/PageHero.html` + `assets/css/components/PageHero.css` — breadcrumb + kicker + h1 + subline; used on inner pages
  - `_templates/components/CTABand.html` + `assets/css/components/CTABand.css` — dark closing CTA, single accent button → `/contact/`
- **Phase 2 Wave A — Primitives** (`rebuild/v2`) — four fully-rendered primitive components live in the design system showcase at `design-system/index.html`:
  - `_templates/components/TypeScale.html` — display sizes (ax-display--xl, ax-display), kicker, h1–h5, lead, body, caption; dark-surface demo
  - `_templates/components/Buttons.html` — all 5 variants (primary, accent, outline, ghost, link), 3 sizes, disabled states, on-dark surface
  - `_templates/components/Chips.html` — default/selected/kicker variants, filter group, status pills (success/warning/error)
  - `_templates/components/FormInputs.html` — text/select/textarea with all states (default, value, error, disabled); full real-world form example
- **`assets/css/components/Buttons.css`** — loading spinner state, icon/square variant, full-width modifier
- **`assets/css/components/Chips.css`** — colour-tinted variants (cyan, pink, amber, purple), removable chip pattern
- **`assets/css/components/FormInputs.css`** — input groups (prefix/suffix addons), custom checkbox/radio styling
- **`scripts/build-design-system.js`** — now calls `resolveComponentTokens` after section injection, enabling `{{component:X}}` composition tokens in all design-system section partials
- **Phase 1 gate verified** — `npm run build` and `npm run check` both pass with Node v26.0.0; legacy pages unchanged

- **`_templates/homepage.html`** — dedicated canonical homepage source template. This is now the authored source for homepage structure, while `index.html` is treated as a generated artifact during the build.
- **`_templates/homepage-about.html`** — dedicated homepage about fragment. Owns the founder/about section markup separately from the main homepage template.
- **`_templates/homepage-apply.html`** — dedicated homepage apply fragment. Owns the final CTA and lead-capture section markup separately from the main homepage template.
- **`_templates/homepage-who.html`** — dedicated homepage who fragment. Owns the qualification/fit section markup separately from the main homepage template.
- **`_templates/homepage-testimonials.html`** — dedicated homepage testimonial fragment. Owns the testimonial card markup and explicit testimonial component markers, separate from the main homepage template.
- **`_templates/homepage-trust.html`** — dedicated homepage trust fragment. Owns the trust/logo bar markup separately from the main homepage template.
- **`scripts/build-homepage.js`** — new homepage assembly step. Copies `_templates/homepage.html` to `index.html` before footer, testimonial, and hero-media mutation steps run.
- **`cohort.html`** — AI Implementation Cohort landing page. 8-week programme for senior leaders building practical AI capability with peer learning and expert guidance. Reuses proven patterns from `index.html` (hero with VSL placeholder, problem/solution structure, qualification section, cohort details, application form with metadata routing). Pricing: £2,000 + VAT per person. Starting week of 20th April 2026. 10 spaces available (12 total, 2 secured). Form includes capability gap question for qualification. Integrated with existing form infrastructure (`assets/js/forms.js`, `netlify/functions/lead-capture.js`) with `interest=cohort` and `source=cohort_page` metadata.
- **Mandatory Planning Workflow (AI-RULES.md §1.5)** — enforces plan → review → approve → implement → verify workflow for all non-trivial changes. Includes granularity requirement: break large initiatives into single atomic tasks. Violations result in immediate stop-work and rollback. Added to Agent behaviour contract (§6) and Definition of Done (§7).

### Removed

- **Homepage pathways section** — removed the unintended “Choose the right way to work with us” section from the live homepage because it was not approved for production and inaccurately described the current offer structure.
- **Campaign banner from `index.html`** — removed unapproved full-width promotional banner (lines 365-375) that was added without explicit approval in previous session.
- **`workshops.html`** — deleted entire file. Leadership Activation page will be created separately following proper planning workflow.
- **Workshops links from navigation** — removed "Workshops" from desktop and mobile navigation on both homepage and cohort page to prevent 404 errors.
- **Footer links to `/workshops.html` and `/cohort.html`** — removed from the live footer because `workshops.html` 404s and `cohort.html` is not fit for public traffic in its current state.
- **Inconsistent navigation IDs** — standardized all mobile navigation to use `mobile-nav-home` ID across homepage, cohort page, and Insights templates. Removed hardcoded Workshops links from `_templates/index.html` and `_templates/article.html`.
- **Missing nav.js script** — added `/assets/js/nav.js` to cohort page to enable mobile hamburger menu functionality.
- **Misaligned pink underline** — removed apply-underline SVG from "Apply for the next cohort" heading on cohort page due to alignment issues.
- **Programs links from navigation** — removed "Programs" link from desktop and mobile navigation on homepage and all Insights templates to make cohort page undiscoverable until complete.
- **Shared footer from `privacy.html` and `terms.html`** — removed the marketing footer from the legal pages so they remain lightweight standalone documents rather than conversion surfaces.
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
- **Homepage testimonial marker hardening** — `scripts/build-testimonials.js` now injects homepage testimonials using explicit `TESTIMONIALS_COMPONENT_START` / `TESTIMONIALS_COMPONENT_END` markers only. Removed the brittle dependency on the first testimonial comment and section-tail string matching.

### Changed

- **`_templates/homepage.html`** — about section markup was extracted from the main homepage source into a dedicated fragment include token (`{{homepageAbout}}`).
- **`_templates/homepage.html`** — apply section markup was extracted from the main homepage source into a dedicated fragment include token (`{{homepageApply}}`).
- **`_templates/homepage.html`** — who section markup was extracted from the main homepage source into a dedicated fragment include token (`{{homepageWho}}`).
- **`_templates/homepage.html`** — testimonial card markup was extracted from the main homepage source into a dedicated fragment include token (`{{homepageTestimonials}}`), while keeping the testimonial section shell in place.
- **`_templates/homepage.html`** — trust section markup was extracted from the main homepage source into a dedicated fragment include token (`{{homepageTrust}}`).
- **`scripts/build-homepage.js`** — homepage assembly now resolves the `{{homepageAbout}}` token from `_templates/homepage-about.html` before writing `index.html`.
- **`scripts/build-homepage.js`** — homepage assembly now resolves the `{{homepageApply}}` token from `_templates/homepage-apply.html` before writing `index.html`.
- **`scripts/build-homepage.js`** — homepage assembly now resolves the `{{homepageWho}}` token from `_templates/homepage-who.html` before writing `index.html`.
- **`scripts/build-homepage.js`** — homepage assembly now resolves the `{{homepageTestimonials}}` token from `_templates/homepage-testimonials.html` before writing `index.html`.
- **`scripts/build-homepage.js`** — homepage assembly now also resolves the `{{homepageTrust}}` token from `_templates/homepage-trust.html` before writing `index.html`.
- **`package.json` build pipeline** — added `build:homepage` and made homepage assembly run before existing homepage mutators. This establishes a clear source-of-truth model without yet changing footer/testimonial/hero ownership.
- **`README.md`** — repo layout and build docs now clarify that `index.html` is a generated homepage artifact sourced from `_templates/homepage.html`.
- **`ROADMAP.md`** — homepage tech-debt item updated to reflect that the build architecture slice is in flight, while section/partial extraction remains pending.
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
- **`package.json` build pipeline** — footer sync now runs after Insights generation so shared footer ownership applies to generated pages as well as static ones.
- **`scripts/build-footer.js`** — footer target collection now covers homepage, cohort, Insights index, and Insights articles, while explicitly excluding legal pages. Insights pages use a non-form footer variant to avoid duplicate newsletter IDs.
- **`scripts/test-site.js`** — regression coverage now enforces footer presence on homepage, cohort, Insights index, and Insights articles, while treating legal pages as standalone content pages.

### Fixed

- **Footer consistency across generated pages** — the shared footer now lands reliably on generated Insights pages because footer sync runs after the content hub build completes.
- **Google-source promo card** — temporarily disabled in both Insights templates by commenting out the current implementation pending a better design.

### Changed

- **`package.json`** — added `prepare` script: `git config core.hooksPath .githooks`.
  Runs after every `npm install` to activate committed hooks. No manual setup required.
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
- Session ID: 20260517-215358
- Updated: 2026-05-17T20:53:59.993Z
- Mode: write
<!-- SESSION_PROTOCOL:END -->
