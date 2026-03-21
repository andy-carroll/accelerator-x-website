# Accelerator X Development Roadmap

_This is a living document. It connects our high-level business strategy with daily execution.
It operates on a "Now, Next, Later" horizon to maintain momentum without administrative drag._

_Last updated: 2026-03-21_

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

- [ ] **Share panel** — replace "LI" text with proper SVG LinkedIn icon; add "Share" heading.
      Files: `_templates/article.html` + share panel render in `scripts/build-hub.js`
- [ ] **Hero imagery** — swap interim stills for final production photos; update alt text in
      `content/data/hero-media.config.json`. Run `npm run process:hero-images && npm run build`.
- [ ] **Brevo welcome email** — configure single welcome automation on list #9. Draft copy,
      set up in Brevo automation editor. Also confirm `insights-subscribe` form destination
      (4 submissions — Brevo or nowhere?).
- [ ] **Lighthouse targets** — ≥95 mobile / ≥98 desktop. Capture HTML reports to
      `docs/analytics/`. Fix any blocking issues before driving paid traffic.

### Autonomous AI Agent Fleet (strategic priority)

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
      framework for £4k–£200k offerings, evidence-based video strategy
- [ ] **LinkedIn Post Inspector — "No author found"** — investigate further after cache clears.
      JSON-LD is correct and validates in Google Rich Results Test. Low urgency.

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
