# Accelerator-X Website Rebuild — Handoff Package

**For:** Claude Code (or any developer picking up the build)
**From:** Design phase, May 2026
**Target codebase:** Existing HTML/CSS/vanilla-JS site at accelerator-x.ai, with 11ty for blog/article builds. No CMS. No framework switch.

---

## ⚠️ Read this first — design system canonicality

There has been an **evolution during the design phase** that you must respect:

1. **`design-system/` is canonical.** It is the single source of truth for tokens, type, colour, spacing, components, voice. Version 2.0, dated 16 May 2026.
2. **Everything else in this bundle pre-dates the system.** The wireframes and the hi-fi redesign use **legacy exploration tokens** (`--c-bg`, `--c-fg`, `--c-accent`, etc.) from Direction B exploration. **These are not the production tokens.** The design system uses `--ax-*` brand tokens and semantic aliases (`--fg-1`, `--bg-1`, `--action-primary`, etc.).
3. **Your job is to build the production site in the canonical system** — not to faithfully port the legacy `--c-*` tokens. When the wireframes and the design system disagree, the design system wins.

Start with `design-system/DESIGN.md` and `design-system/tokens.css`. Use `design-system/Design System.html` as the visual reference. Only then look at the page-level wireframes and hi-fi mocks for structure and content.

---

## Overview

This is a full rebuild of accelerator-x.ai. Three top-level zones — marketing pages, conversion (offering detail + VSL funnels), and supporting (legal, utility) — comprising 22 page templates. The current site has working content and a blog flow that should be preserved; this rebuild is a visual and structural reset, not a re-platform.

**Key product constraint that affects every page:** there is no calendar booking anywhere on the site. Every CTA — "Apply to work with us" — routes to a single application form on `/contact` (or `/programmes/[slug]/apply` for funnels). We pre-qualify every applicant and reply personally with a booking link only if it's a fit. Do not add "Schedule a call" buttons, Calendly embeds, or "Talk to us (20 min)" alt flows anywhere.

---

## About the Design Files

The HTML files in this bundle are **design references**, not production code. They show intended structure, layout, content, and (in some cases) visual fidelity. They use React + inline Babel for rapid prototyping — your job is to **recreate the designs in the target codebase** using its existing vanilla HTML/CSS/JS + 11ty patterns.

Don't copy `<script type="text/babel">` or React patterns into production — translate them to static HTML + the small amount of vanilla JS the existing site uses. CSS *can* be copied where it matches the design system; just remap legacy `--c-*` tokens to the canonical ones (mapping table below).

---

## Fidelity

Mixed. Read each file's section below for guidance.

| Artefact | Fidelity | What to take from it |
|---|---|---|
| `design-system/Design System.html` | **Hi-fi · canonical** | Exact tokens, type, components |
| `Accelerator X Redesign.html` (+ `assets/`) | Hi-fi — homepage, legacy tokens | Page structure, content, interactions. **Re-skin with canonical tokens.** |
| `Mobile Screens.html` | Hi-fi — mobile mockups (375px) | Responsive layout decisions for Home, Company Enablement, VSL lander |
| `Coaching & Enablement Wireframes.html` | Block-level wireframe, design-system visuals | Structure + content for 4 missing pages |
| `wireframes/` | Early exploration (Direction A/B/C/D sketches) | **Reference only.** Direction B was locked; A, C, D are out. |
| `Build Plan.html` | Spec document | Sitemap, page block outlines, conversion rules, components, analytics, content pipeline |

---

## What to build, in order

The Build Plan (§12) sequences this work. Here's the same sequence with execution notes:

### Phase 1 — Foundations
1. **Set up token CSS.** Drop `design-system/tokens.css` into the codebase. Every component should reference these. Delete legacy `colors_and_type.css` if it still exists.
2. **Set up the type system.** Figtree for display headings, system stack for body. Already loaded by tokens.css via `@import url(...Figtree...)`.
3. **Brand assets.** Copy `design-system/brand-assets/logos/` into the production asset path. Wire the logo + favicon.

### Phase 2 — Component library
Build the 22 components inventoried in Build Plan §08. The single highest-leverage artefact. Specifically:

**Global chrome:** Nav (with mobile drawer), Footer, PageHero, CTABand.
**Content blocks:** OfferingTable, OfferingCard, PlanLayers, DeliverablesGrid, FitCheck, FAQList, CaseTile, ArticleTile/Feature, EventCard, FounderCard, DecisionTree, LogoStrip, ProofRow.
**Interactive:** ApplyForm, QuizCTA, NewsletterCTA, CohortList, ScarcityCard.
**Primitives:** Buttons, Chips, Form inputs, Type scale — already partly defined in `tokens.css` §11.

Every component honours the responsive rules in Build Plan §08 ("Responsive behaviour"). Read that section before building any component — it's the build contract.

**Build the existing homepage first, then derive components from it.** That's the fastest path. The homepage in `Accelerator X Redesign.html` is the most exercised composition of these components.

### Phase 3 — Pages
Compose pages from components, using the Build Plan §04–§07 block outlines and the wireframes for unbuilt pages.

Existing pages with wireframes (Home, /what-we-do, /how-we-work, /how-we-work/dots, /insights, /insights/[slug], /case-studies/[slug], /about, /talks-events) → use `Accelerator X Redesign.html` + `assets/components/` as reference.

New pages needing wireframes (3 coaching offering details, merged Company Enablement) → use `Coaching & Enablement Wireframes.html`.

Funnel pages (`/programmes/[slug]`, `.../apply`, `.../thanks`) → Build Plan §06 has the stub block list. Spec is still TBD; build a working v1 from that block list and we'll iterate.

Mobile layouts → Build Plan §08 "Responsive behaviour" rules, plus the validated screens in `Mobile Screens.html` for Home, Company Enablement, VSL lander.

### Phase 4 — Content pipeline
Migrate existing blog/article content to the Markdown frontmatter model in Build Plan §10. Add `format` field (article / podcast / video) on insights — that's the new abstraction.

### Phase 5 — Analytics
PostHog. See Build Plan §09 for the event taxonomy and instrumentation contract. Don't bolt this on at the end — bake it in as components are built.

---

## Legacy → Canonical token mapping

This is the migration table for re-skinning `Accelerator X Redesign.html` and the wireframes onto the production system:

| Legacy (`--c-*`) | Canonical (semantic) | Or raw |
|---|---|---|
| `--c-bg` | `--bg-1` | `--ax-white` |
| `--c-bg-alt` | `--bg-paper-deep` | `--ax-paper-deep` (warm) |
| `--c-tint` | `--bg-paper-deep` | `--ax-paper-deep` |
| `--c-fg` | `--fg-1` | `--ax-navy` |
| `--c-fg-muted` | `--fg-3` | `--ax-slate-medium` |
| `--c-line` | `--border-1` | `--ax-border` |
| `--c-line-faint` | (no direct map — use `--ax-border` @ 50% opacity) | |
| `--c-accent` | `--action-primary` | `--ax-cyan` |
| `--c-accent-2` | `--action-accent` | `--ax-pink` |
| `--f-display` | `--font-display` | `Figtree` |
| `--f-body` | `--font-body` | system stack |
| `--f-mono` | `--font-mono` | `ui-monospace` |

The wireframe set in `assets/components/*.jsx` references `--c-*` extensively. Don't fight the legacy — port a component at a time, swapping tokens as you go.

**Important typeface note:** the legacy redesign uses `Geist` for both display and body. **The canonical system uses Figtree for display headings, system stack for body.** The visual feel changes — Figtree is more grounded, less editorial. This is intentional per DESIGN.md §1 ("Credibility and precision, not agency polish"). Don't keep Geist.

---

## Conversion principle — applies to every page

Repeating because it's the easiest thing to violate accidentally:

- **One CTA, one path: "Apply to work with us".**
- **No "book a call" buttons. No calendar embeds. No "talk it through (20 min)" alternates.**
- Every interested visitor flows through `/contact` (or `/programmes/[slug]/apply` for funnel pages), which captures the minimum pre-qualification.
- We review every application personally and reply with a booking link only if it's a fit.
- **Phase 0 is not a cohort.** Start date is "agreed on signing"; typical lead time ~3 weeks. Do not show fake cohort dates on the Company Enablement page.
- **Cohort-based programmes (Leadership Cohort, Senior Leader Acceleration) do have fixed dates** — show them and surface scarcity copy on those pages only.

---

## Files in this bundle

```
design_handoff_website_rebuild/
├── README.md                              ← this file
├── Build Plan.html                        ← the spec (sitemap, pages, components, rules)
├── design-system/                         ← ★ canonical ★
│   ├── DESIGN.md                          (principles, voice, conventions)
│   ├── tokens.css                         (CSS custom properties)
│   ├── tokens.json                        (JSON for interop)
│   ├── Design System.html                 (visual reference)
│   └── brand-assets/logos/                (SVG + PNG, full-colour + white)
├── Accelerator X Redesign.html            ← hi-fi homepage (legacy tokens)
├── assets/                                ← component source for the homepage (jsx + css)
├── Mobile Screens.html                    ← 375px validation for Home, Company Enablement, VSL
├── Coaching & Enablement Wireframes.html  ← 4 missing-page wireframes
└── wireframes/                            ← exploration era (Directions A–D) — reference only
```

---

## Open decisions still flagged in the Build Plan

All twelve decisions in Build Plan §11 are now resolved. Worth re-reading §11 anyway — it carries useful context on why the IA is the way it is (especially D02 on funnel nav and D09 on design-system harmonisation).

The one thing **not** resolved in Design but worth knowing: the **VSL/funnel block-by-block spec** (Phase B in the Build Plan) was deferred. The Build Plan has the stub block list for funnel pages — that's enough to scaffold a working v1. Iterate on copy + objection handling with the founders once a real funnel page is live.

---

## Questions you'll have

**Q: The wireframes don't match the design system exactly. Which wins?**
The design system. The wireframes are structural references — what's on each page and in what order. Re-skin them as you build.

**Q: Should I keep using React?**
No. The existing site is vanilla HTML/CSS/JS + 11ty. Don't add a framework. The React in the design files is for prototyping only.

**Q: Where's the spec for `/programmes/[slug]`?**
Build Plan §06 has a stub block list. Full block-by-block spec was deferred to Phase B and not delivered in Design — build a working v1 from the stub list.

**Q: How do I handle the case studies index when there are zero published cases?**
Build Plan §04 page 07 covers the empty/sparse state. Designed grid + a single feature panel ("We're publishing our first case studies. In the meantime — read how we work, or talk to us"). Re-enables to a populated grid when content lands.

**Q: Mobile breakpoints?**
Build Plan §08 "Responsive behaviour": mobile < 640px, tablet 640–1024px, desktop ≥ 1024px. Per-component rules are listed there. The mobile mockups in `Mobile Screens.html` are validation for the three hardest screens.

**Q: Quiz subdomain?**
`quiz.accelerator-x.ai` is already live as a standalone Next.js app. Don't rebuild it. Link out to it from `/what-we-do` (DecisionTree CTA), `/contact`, the footer, and any offering page where readiness is in question. Token alignment is a closing task — see decision D05.
