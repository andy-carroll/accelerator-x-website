# Page Spec: Company Enablement

**URL:** `/what-we-do/company-enablement/`
**Template:** `_templates/offerings/company-enablement.html`
**Output:** `what-we-do/company-enablement/index.html`
**Wireframe source:** "Company Enablement" — full wireframe with unique layout (not the coaching template)
**Status:** Ready to build — pending founder review of flagged items

---

## Build registration

Add to `scripts/build-inner-pages.js` PAGES array:

```javascript
{ template: '_templates/offerings/company-enablement.html', output: 'what-we-do/company-enablement/index.html' },
```

---

## SEO block

```html
<title>Company Enablement | Accelerator X</title>
<meta name="description" content="Two phases. Phase 0 aligns and activates your leadership team in two weeks. Phase 1+ ships AI capability, cycle by cycle, until you're self-sufficient.">
<link rel="canonical" href="https://accelerator-x.ai/what-we-do/company-enablement/">
<meta property="og:title" content="Company Enablement | Accelerator X">
<meta property="og:description" content="Two phases. Phase 0 aligns and activates your leadership team in two weeks. Phase 1+ ships AI capability, cycle by cycle, until you're self-sufficient.">
<meta property="og:url" content="https://accelerator-x.ai/what-we-do/company-enablement/">
<meta property="og:type" content="website">
```

JSON-LD type: `Service` — serviceType: "Company Enablement", provider: Accelerator X

---

## CSS to load (in addition to global styles)

```html
<link rel="stylesheet" href="/assets/css/components/PageHero.css">
<link rel="stylesheet" href="/assets/css/components/CTABand.css">
<link rel="stylesheet" href="/assets/css/components/FitCheck.css">
<link rel="stylesheet" href="/assets/css/components/FAQList.css">
<link rel="stylesheet" href="/assets/css/components/ProofRow.css">
<link rel="stylesheet" href="/assets/css/components/PlanLayers.css">
<link rel="stylesheet" href="/assets/css/components/DeliverablesGrid.css">
<link rel="stylesheet" href="/assets/css/components/InnerPages.css">
<link rel="stylesheet" href="/assets/css/components/CompanyEnablement.css">
```

Note: `CompanyEnablement.css` is **new and must be created**. It covers three custom layout elements unique to this page: `.ax-phase-arc`, `.ax-bridge`, `.ax-cycle-chain`. See New CSS section at bottom.

---

## Sections (in order)

### 1. Nav
```
{{component:Nav}}
```

---

### 2. Hero
Unique layout — not the standard coaching hero. Includes a Phase Arc element inside the hero.

**Left column:**
- Breadcrumb: `What we do / Company Enablement`
- Chip: `Flagship · Phase 0 → Phase 1+ · everyone starts at Phase 0`
- H1: `How a company moves with us.` (font-size: 64px)
  - Wrap "with us." in `<span class="ax-accent">` for pink accent
- Body copy: `Two phases. The first aligns and activates in two weeks. The second ships capability, cycle by cycle, until you're self-sufficient. Everyone starts with Phase 0.`

**Phase Arc** (`.ax-phase-arc`) — 2-panel row directly below body copy, inside left column:
- Left panel (`.ax-phase-arc__panel--cyan`, cyan fill):
  - Eyebrow: `Phase 0 · start here`
  - H4: `2 weeks · from £5k`
  - Small: `Align + activate + roadmap`
- Arrow: `→`
- Right panel (`.ax-phase-arc__panel`):
  - Eyebrow: `Phase 1+`
  - H4: `8-week cycles · from £20k`
  - Small: `Build & ship capability`

**Right column — sidebar investment card:**
- Header text: "Start with"
- Badge: `Phase 0` — chip `--cyan` variant
- Spec table rows:
  - Duration: 2 weeks
  - From: £5,000
  - Start date: Agreed on signing
  - Lead time: ~3 weeks
  - Format: 3 workshops + 1 playback
- CTA button (full-width, `.btn--accent .btn--lg`): `Apply to work with us →` → `/contact/`
- Sub-note: `No calendars to book. We vet every application and reply personally.`

> **GO-LIVE FLAG:** Prices (£5,000 Phase 0 / £20,000 Phase 1+) require explicit founder confirmation before launch — listed in CLAUDE.md Next Session Priorities.

---

### 3. Phase 0 in depth
Alt background section.

- Chip: `Phase 0 · in depth`
- H2: `Two weeks to clarity.` (font-size: 52px)
  - Wrap "to clarity." in `<span class="ax-accent">`
- Body: `Three workshops, one playback, one costed 90-day plan. Built around our proprietary DOTS framework.`

**3-column Phase 0 plan layers** (use `{{component:PlanLayers}}`):

| # | Label | Small | Body |
|---|---|---|---|
| 01 | Executive DOTS | Half-day · leadership team | Half-day with your leadership team — Dream / Obstacles / Triage / Sequence. |
| 02 | Team activation | Wider function · 10–40 people | Wider function session. The work moves from leadership decision into team adoption. |
| 03 | Strategy playback | Costed 90-day roadmap | We integrate the outputs and present the costed 90-day roadmap. Phase 1 scope agreed (or not). |

**4-column "What you walk away with"** (use `{{component:DeliverablesGrid}}`):

| # | Title | Body |
|---|---|---|
| 01 | 90-day roadmap | Costed, sequenced, owned by your team. |
| 02 | Use cases evaluated | Highest-leverage first build, with success metrics. |
| 03 | Aligned leadership | One story, told the same way across the C-suite. |
| 04 | Activated team | A department that already knows what's coming. |

---

### 4. Bridge
Centered dashed-border box (`.ax-bridge`). Custom element, not a component token.

```html
<div class="ax-bridge">
  <span class="chip">What Phase 0 produces</span>
  <div class="ax-bridge__arrow">↓</div>
  <h3>A roadmap you can defend.</h3>
  <p class="ax-bridge__sub">What we do with it next is Phase 1+.</p>
</div>
```

---

### 5. Phase 1+ in depth
Alt background section.

- Chip: `Phase 1+ · in depth`
- H2: `Eight-week cycles. One capability at a time.` (font-size: 52px)
  - Wrap "One capability at a time." in `<em>` (italic, per wireframe)
- Body: `Once the roadmap is signed off, sequential 8-week cycles deliver against it. Each cycle ships a real capability your team owns.`

**3-column streams** (custom card grid, not a named component):

| # | Eyebrow (cyan) | H4 | Body |
|---|---|---|---|
| Stream 01 · People | Train your operators. | 2–4 internal builders gain hands-on capability across the cycle. |
| Stream 02 · Process | Change the rituals. | New workflows embedded, not appended. The capability sticks because the process changes around it. |
| Stream 03 · Product | Ship the thing. | A production-ready AI capability — owned, instrumented, demonstrably valuable. |

**Cycle chain** (`.ax-cycle-chain`) — horizontal arrow-connected row:

```
[Cycle 01: "Ship first capability"] → [Cycle 02: "Build on 01 · train next operators"] → [Cycle N: "Run as many as the roadmap calls for"] → [Advisory (amber variant): "When you're self-sufficient"]
```

---

### 6. FitCheck
```
{{component:FitCheck}}
```

- H2: `For companies who want to build capability — not just buy a strategy deck.`

**Right fit if you…**
- Have a leadership team willing to spend 4 sessions over 2 weeks.
- Believe AI capability is a building exercise, not a procurement one.
- Want internal operators trained, not external dependency.
- Are comfortable being challenged on what's actually slowing you down.

**Probably not for you if you…**
- Want a slide deck to take to the board, not a working capability.
- Need to outsource AI ownership long-term.
- Aren't able to commit leadership time in the first fortnight.

---

### 7. FAQ
Alt background.
```
{{component:FAQList}}
```

- H2: `Asked at week 2, week 8, and week 16.`
- Questions (answers to be written by founders):
  1. Can we skip Phase 0?
  2. How firm is the £5,000 price?
  3. What's the '+' in Phase 1+?
  4. Can we run cycles in parallel?
  5. Who owns the IP?
  6. What happens after the last cycle?

> **GO-LIVE FLAG:** Answers to all 6 FAQs must be written by founders before launch.

---

### 8. Proof
2-column layout (custom, not a single component).

**Left column:**
- Pull-quote: `"By the end of week two we had a roadmap that survived contact with our CFO. Six weeks later we shipped the first capability. I haven't seen anyone work like this."`
- Attribution: `COO, £45M retail group · Phase 0 + Phase 1, Q1 2026`

**Right column — linked case study panel:**
- Eyebrow: `Linked case study`
- Image: placeholder (no case study published yet)
- H4: `Two phases, four cycles, one new capability per quarter.`
- Small: `12-month outcome view`

> **GO-LIVE FLAG:** Left quote — confirm this is a real, approved client quote before launch.
> **GO-LIVE FLAG:** Right panel case study doesn't exist yet. At build time: either remove the right column, show a placeholder state, or link to `/insights/?tag=cases`. Confirm approach with founders.

---

### 9. Final CTA
Dark background section.

- Chip (`.chip--on-dark`): `Start here`
- H2: `Two weeks. £5,000. Worth it.` (font-size: 56px)
  - Wrap "Worth it." in `<span class="ax-accent">`
- Body: `Phase 0 is the most leveraged fortnight we run. Tell us where you are; we'll come back within a week.`
- CTA button (`.btn--accent .btn--lg`): `Apply to work with us →` → `/contact/`
- Sub-note: `Short pre-qualification form · no calendars to book · we reply within a week.`

---

### 10. Footer
```
{{component:Footer}}
```

---

## New CSS required: `assets/css/components/CompanyEnablement.css`

Three custom layout elements exist only on this page. They must be built using `--ax-*` tokens from `tokens.css`.

### `.ax-phase-arc`
Two-panel horizontal row inside the hero. Left panel has cyan fill.

```css
.ax-phase-arc {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  margin-top: var(--space-5);
}
.ax-phase-arc__panel {
  flex: 1;
  padding: var(--space-4);
  border: 1px solid var(--border-1);
  border-radius: var(--radius-md);
}
.ax-phase-arc__panel--cyan {
  background: var(--ax-cyan);
  color: var(--ax-navy);
}
.ax-phase-arc__arrow {
  font-size: 1.5rem;
  color: var(--fg-3);
  flex-shrink: 0;
}
```

### `.ax-bridge`
Centered dashed-border box between Phase 0 and Phase 1+ sections.

```css
.ax-bridge {
  text-align: center;
  padding: var(--space-8) var(--space-6);
  border: 2px dashed var(--border-1);
  border-radius: var(--radius-md);
  background: var(--bg-paper-deep);
  max-width: 480px;
  margin: 0 auto;
}
.ax-bridge__arrow {
  font-size: 2rem;
  color: var(--fg-3);
  margin: var(--space-3) 0;
}
.ax-bridge__sub {
  color: var(--fg-3);
  font-size: var(--text-sm);
  margin-top: var(--space-2);
}
```

### `.ax-cycle-chain`
Horizontal arrow-connected series of phase cards.

```css
.ax-cycle-chain {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  overflow-x: auto;
  padding: var(--space-4) 0;
}
.ax-cycle-chain__item {
  flex-shrink: 0;
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--border-1);
  border-radius: var(--radius-md);
  background: var(--bg-1);
  font-size: var(--text-sm);
}
.ax-cycle-chain__item--advisory {
  border-color: var(--ax-amber);
  background: color-mix(in srgb, var(--ax-amber) 10%, transparent);
}
.ax-cycle-chain__arrow {
  color: var(--fg-3);
  flex-shrink: 0;
}
```

---

## Go-live checklist additions

- [ ] **BLOCKING** Phase 0 price (£5,000) — founder confirmation required
- [ ] **BLOCKING** Phase 1+ price (£20,000) — founder confirmation required
- [ ] **BLOCKING** Left proof quote — confirm real + approved client quote
- [ ] **BLOCKING** FAQ answers — all 6 written by founders
- [ ] Right panel case study — decide: remove / placeholder / link to filtered insights (confirm with founders)
