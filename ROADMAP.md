# Accelerator X Development Roadmap

_This is a living document. It connects our high-level business strategy with daily execution. It operates on a "Now, Next, Later" horizon to maintain momentum without administrative drag._

---

## The Strategy (The "Why")

**Objective:** To transition Accelerator X from a static digital presence into an active growth engine (Landing Page + Content Hub).
**The Goal:** Attract, qualify, and convert the "Tuesday morning leader"—senior decision-makers tired of hype and ready for fundamental AI transformation—driving growth across our three-layer business model (Enablement, Strategic Access, Implementation).
**The Approach:** "Slow is smooth, smooth is fast." Compounding, authority-building content and transparent, anti-agency positioning.

---

## 🏆 Backlog / Historical Context (What's Done)

_These milestones have been completed and represent our foundational momentum._

- ✅ **Phase 1 Landing Page Built:** Static HTML + CSS MVP is live.
- ✅ **Design System Established:** Core typography, colours, and tokens set up.
- ✅ **Business Context Finalised:** Foundational dossiers and marketing systems documented.

---

## 🟢 NOW (Active Development Sprint)

_What we are actively building right now. These initiatives have active spec documents to execute against._

**Status Key:**

- `[ ]` To Do (Next up)
- `[-]` In Flight (Active right now)
- `[x]` Done

- [-] **Phase 2 Go-Live Readiness (Top Priority):** Execute the end-to-end launch checklist (`docs/go-live-checklist.md`) so the marketing site can ship publicly.
  - [ ] Replace hero imagery with final production stills + alt text tweaks (current library still interim)
  - [ ] Refresh homepage copy (hero + proof statements) ready for launch positioning
  - [ ] Hit Lighthouse targets (≥95 mobile / ≥98 desktop) on latest Netlify preview; capture reports in `docs/analytics/`
  - [ ] Marketing Ops — connect Brevo form, build confirmation email, design newsletter template, and draft starter automation sequence driving to conversation CTA
  - [ ] Document PostHog loader configuration & verification in `docs/posthog-behavior-insights-prd.md`

- [ ] **World-Class Landing Pages Architecture (Pressing Priority):** Execute the comprehensive landing page strategy outlined in `docs/world-class-landing-pages-thesis.md`. This is foundational to scaling our multi-product ecosystem and maintaining anti-agency differentiation.
  - [ ] **URGENT: Get first version of website live** – Deploy current MVP to production domain immediately to establish market presence
  - [ ] Implement "Clarity Engine" framework for sophisticated B2B buyers
  - [ ] Build diagnostic architecture (Recognition → Contextualization → Approach → Invitation)
  - [ ] Develop journey-based navigation for multi-product ecosystem
  - [ ] Create pricing psychology framework for £500-£200,000 offerings
  - [ ] Implement evidence-based video strategy (not entertainment)
  - [ ] Establish clarity metrics measurement system (beyond conversion rate)
  - [ ] Build risk mitigation protocols for positioning drift and complexity creep
  - [ ] Design technical architecture for static-first performance and credibility
  → _Execute against:_ `docs/world-class-landing-pages-thesis.md`

- [x] **Content Hub Architecture (The Authority Engine):** Building the infrastructure to deliver our content philosophy. Setting up the blog/insights structure, category taxonomy (Frameworks, Dispatches, etc.), and ensuring technical SEO fundamentals.
      → _Execute against:_ `docs/content-hub-plan.md`
      → Canonicals are environment-aware via Netlify `URL` / `DEPLOY_PRIME_URL` (or local `SITE_URL` override) to avoid publishing the future custom domain before cutover.
- [-] **Landing Page Phase 2 (Conversion & Polish):** Transitioning the page to drive action. Embedding GoHighLevel forms, integrating real testimonials, adding client logos, and finalizing script/video embeds.
  → _Execute against:_ `docs/landing-page-spec.md` (specifically Phase 2 & 3 tasks)

  Recent progress:

  - [x] Insights nav link + hero image placeholder
  - [x] Testimonials now generated from data (`content/data/testimonials.json`) via build step
  - [x] Newsletter capture form wired to Netlify Forms (automation to GHL still pending)
  - [x] Product analytics switched to PostHog (better free-tier headroom and event-level analysis)
  - [x] PostHog behavior insights PRD documented (movement, linger, abandonment, and performance-safe rollout)
    → _Execute against:_ `docs/posthog-behavior-insights-prd.md`
  - [x] Homepage founder headshots regression check: Toby and Andy profile images are present in source (`index.html` + `assets/illustrations`) and render correctly across breakpoints.
  - [x] **Hero Media Library System:** Config-driven hero image cycling with drop-in source folder workflow. Supports responsive variants, performance-safe lazy loading, and generated metadata. Workflow: `content/hero-source/` → `npm run process:hero-images` → `npm run build`. See PRD `docs/PRD-hero-media-library.md`.

---

## 🟡 NEXT (In Discovery & Design)

_The immediate next priorities. We know we need these to unlock the £10M vision, but we are currently scoping them or waiting on dependencies._

- [ ] **Newsletter Integration & Capture:** Converting Hub traffic into owned audience (Layer 1 Enablement). Finding the right integration point with our GoHighLevel/Airtable stack.
- [ ] **Newsletter Automation (GoHighLevel):** Trigger thank-you email + add-to-list workflow for Netlify-captured signups.
- [ ] **Behavior Analytics Rollout (PostHog):** Implement staged session replay and funnel diagnostics to identify drop-off and friction hotspots.
  → _Execute against:_ `docs/posthog-behavior-insights-prd.md`
- [ ] **Author Profile System (Homepage + Insights):** Create reusable author profiles for Toby, Andy, and future contributors, including headshots, role, bio, and shared metadata that can be rendered on the homepage and article templates.
- [ ] **Insights Author Identity UX:** Add small headshots beside article authors and surface author profile metadata consistently across article pages and future content formats.
- [ ] **Google Preferred Source CTA:** Explore and implement a homepage/content CTA that opens Google source preferences in a new tab with Accelerator X pre-filled as a preferred source, following the Axios interaction pattern.
- [ ] **Events Page / High-Ticket Offering:** Scoping the landing page addition for the 2-3 times per year exclusive leadership "away days."
- [ ] **Workshop Sales Integration:** Refining the path-to-purchase for the £4k-£8k strategic workshop entry point.

---

## 🔵 LATER (Strategic Backlog)

_Good ideas aligned with the strategy, but not actively being planned yet. No spec documents exist for these._

- [ ] Client "Enablement" Portal (Layer 1 scalable product integration)
- [ ] Automated Email Nurture Sequences
- [ ] Multi-channel content syndication (e.g., automated LinkedIn/Twitter asset generation from Hub articles)
- [ ] Remotion Programmatic Video Ads infrastructure
- [ ] Legal/compliance hardening: replace the current boilerplate privacy and terms pages with robust Accelerator X-specific documents tailored to `Accelerator X Ltd` (company number `16974247`), using accelerator solutions material as reference but rewriting for the new business.
