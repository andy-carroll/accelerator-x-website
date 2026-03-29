# Accelerator X Development Roadmap

_This is a living document. It connects our high-level business strategy with daily execution.
It operates on a "Now, Next, Later" horizon to maintain momentum without administrative drag._

_Last updated: 2026-03-25_

---

## The Strategy (The "Why")

**Objective:** Accelerate Accelerator X from a live marketing site into an active growth engine.
**The Goal:** Attract, qualify, and convert the "Tuesday morning leader" — senior decision-makers
tired of hype and ready for fundamental AI transformation — driving growth across our three-layer
business model (Enablement, Strategic Access, Implementation).
**The Approach:** "Slow is smooth, smooth is fast." Compounding, authority-building content and
transparent, anti-agency positioning.

---

## 🟢 NOW (Active Sprint)

**Status Key:** `[ ]` To Do · `[-]` In Flight · `[x]` Done

### Post-Launch Polish (site is live — real visitors landing now)

- [x] **Share panel** — SVG icons (LinkedIn + X) + "Share" heading — fixed in prior session
- [ ] **Hero imagery** — swap interim stills for final production photos; update alt text in
      `content/data/hero-media.config.json`. Run `npm run process:hero-images && npm run build`.
- [x] **Brevo email infra** — `mail.accelerator-x.ai` subdomain authenticated (SPF/DKIM);
      sender `newsletter@mail.accelerator-x.ai` / Accelerator-X Team — 2026-03-21
- [x] **Brevo welcome email** — automation live on list #9; trigger: contact added to list — 2026-03-21
- [x] **insights-subscribe form** — confirmed: all 4 submissions were Andy's own tests. No real contacts lost.
- [x] **Newsletter forms bypass Netlify Forms** — both forms now POST direct to Brevo via
      `netlify/functions/newsletter-subscribe.js`. 100/month limit no longer applies. — 2026-03-21
- [ ] **Lighthouse targets** — ≥95 mobile / ≥98 desktop. Capture HTML reports to
      `docs/analytics/`. Fix any blocking issues before driving paid traffic.

### Autonomous AI Agent Fleet (strategic priority)

- [x] **Session protocol hardening (Phase 1)** — added profile-driven session lifecycle policy
      (`.session-protocol.json`), safe-by-default session-end modes (plan/dry-run/write),
      explicit write confirmation gates, branch policy checks, scoped staging, and updated
      protocol operator docs (`.claude/rules/session.md`, `CLAUDE.md`, `README.md`).
- [x] **Shared agent skills sync scaffold** — added canonical skills profile pointer
      (`.agent-skills-profile.json`), sync utility (`scripts/skills-sync.js`), npm scripts
      (`skills:sync`, `skills:sync:force`), and operations runbook
      (`docs/agent-skills-shared-ops.md`).
- [ ] **Design agent permission + capability framework** — define what agents can do
      autonomously vs. what requires human approval. Document in `docs/agent-fleet.md`.
- [ ] **Introduce first autonomous agent** — scoped to a specific, safe, repeatable task
      (e.g. content publishing, lead enrichment, or session-end hygiene). Use Claude Agent SDK
      with worktree isolation. Migrate git policy to feature branches at this point (see
      `AI-RULES.md §5`).
- [ ] **Agent capacity planning** — identify the 3–5 highest-leverage tasks where autonomous
      agents would 10x throughput without introducing risk.

---

## 🟡 NEXT (Scoped, not yet started)

- [ ] **Newsletter broadcast template** — design Brevo email template (logo, typography,
      CTA block) for the weekly dispatch
- [ ] **Behavior analytics rollout (PostHog)** — staged session replay + funnel diagnostics
      → `docs/posthog-behavior-insights-prd.md`
- [ ] **Events page** — landing page for the 2–3x/year exclusive leadership away days
- [ ] **Workshop sales path** — refine path-to-purchase for the £4k entry-point workshop
- [ ] **World-class landing page architecture** — execute `docs/world-class-landing-pages-thesis.md`:
      Clarity Engine, diagnostic architecture, journey-based navigation, pricing psychology
      framework for £4k–£200k offerings, evidence-based video strategy.
      Navigation architecture spec now in `docs/navigation-architecture-thesis.md`.
- [ ] **LinkedIn Post Inspector — "No author found"** — investigate further after cache clears.
      JSON-LD is correct and validates in Google Rich Results Test. Low urgency.

---

## 🟤 DEFERRED (Tech Debt)

- [ ] Split `styles.css` (1800+ lines) into logical partials — typography, components, layout, utilities
- [ ] Refactor `index.html` monolith into template partials driven by build scripts
- [x] Extract hub filter script (inline in `_templates/index.html`) → `assets/js/hub-filter.js` — 2026-03-22
- [ ] Add automated tests for Netlify functions (`submission-created`, `newsletter-subscribe`)

---

## 🔵 LATER (Strategic Backlog)

- [ ] Multi-channel content syndication — automated LinkedIn/X asset generation from Hub articles
- [ ] Client "Enablement" Portal (Layer 1 scalable product)
- [ ] Remotion programmatic video ads infrastructure
- [ ] Legal hardening — privacy policy + terms rewritten for `Accelerator X Ltd`
      (company no. `16974247`)
- [ ] Cookie consent banner (required before running paid ads)
- [ ] Accessibility audit (keyboard nav, focus states, screen reader pass)
- [ ] A/B testing infrastructure

---

## 🏆 Done

- [x] Site live at `https://accelerator-x.ai` — 2026-03-17
- [x] Google Search Console property verified — 2026-03-21
- [x] `sitemap.xml` + `robots.txt` generated and deployed
- [x] Page title expanded for SEO
- [x] Article JSON-LD (`Article` schema) on all 6 articles
- [x] `og:url`, `article:author`, `article:published_time` on all articles
- [x] LinkedIn author URLs in `authors.json`
- [x] OG excerpt validator in build pipeline
- [x] Hero pill badges — "Boardroom clarity" + "Hands-on support"
- [x] LinkedIn company URL corrected → `linkedin.com/company/accelerator-x-uk/`
- [x] Homepage JSON-LD price corrected (8-week cycle £12k)
- [x] Netlify Functions — form → Brevo list #9 + Slack `#website-leads`
- [x] PostHog product analytics wired to production
- [x] Hero Media Library System — config-driven cycling, responsive, lazy-load
- [x] Testimonials generated from JSON at build time
- [x] Content Hub (`/insights`) — Markdown → static HTML pipeline
- [x] Design system established (`docs/design-system.md`)
- [x] Image pipeline (`scripts/img-process.sh` + `scripts/img-audit.sh`)
- [x] AI instruction architecture (`AI-RULES.md` + thin adapters)
- [x] Direct-to-main git policy formalised; DoD added to `AI-RULES.md`
- [x] Three-layer automated enforcement: `scripts/check.js` (8 checks) + `.githooks/pre-commit` (committed) + GitHub Actions CI — 2026-03-22
- [x] `.env.example` — all 5 required env vars documented — 2026-03-22
- [x] CSS design token drift check (check 7) + HTML validation check (check 8) — 2026-03-22
- [x] Philosophy section in `AI-RULES.md` — "We move fast by not making messes" + self-classifying "We never" rules — 2026-03-22
- [x] Repo made public — no secrets in codebase; credentials in Netlify env vars — 2026-03-22
- [x] GitHub branch protection on `main` — 3 required status checks (Build, Standards, CHANGELOG) — 2026-03-22
- [x] `llms.txt` + AI agent Easter eggs (index.html, robots.txt, AGENTS.md) — 2026-03-22

<!-- Session 20260322-211525 logged -->

<!-- Session 20260322-234000 logged -->

<!-- Session 20260322-235352 logged -->

<!-- Session 20260329-180314 logged -->

<!-- SESSION_PROTOCOL:START -->
- Session ID: 20260329-200313
- Updated: 2026-03-29T19:03:15.303Z
- Mode: write
<!-- SESSION_PROTOCOL:END -->
