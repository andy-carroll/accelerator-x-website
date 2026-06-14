> ⚠️ **Offer facts superseded by [`offer-canon.md`](../business-context/offer-canon.md) (2026-06-14).** This offering is **renamed "1:1 Exec AI Fast Track Coaching"** and re-specced to **6 weeks · 75-min weekly · from £10,000** (was 12 weeks / £12,000 here). Name, duration and price below are STALE — to be reconciled in Phase 5 (#57). Structure/section guidance still useful.

# Page Spec: Senior Leader Acceleration

**URL:** `/what-we-do/senior-leader-acceleration/`
**Template:** `_templates/offerings/senior-leader-acceleration.html`
**Output:** `what-we-do/senior-leader-acceleration/index.html`
**Wireframe source:** "Executive Coaching" (1:1 delta) — same template structure as Leadership Cohort, confidentiality emphasis throughout
**Status:** Ready to build — pending founder review of flagged items

---

## Build registration

Add to `scripts/build-inner-pages.js` PAGES array:

```javascript
{ template: '_templates/offerings/senior-leader-acceleration.html', output: 'what-we-do/senior-leader-acceleration/index.html' },
```

---

## SEO block

```html
<title>Senior Leader Acceleration | Accelerator X</title>
<meta name="description" content="A founder in your corner for one quarter. Weekly 1:1s with Andy or Toby. A 90-day AI plan you can defend — and the capability to run it.">
<link rel="canonical" href="https://accelerator-x.ai/what-we-do/senior-leader-acceleration/">
<meta property="og:title" content="Senior Leader Acceleration | Accelerator X">
<meta property="og:description" content="A founder in your corner for one quarter. Weekly 1:1s with Andy or Toby. A 90-day AI plan you can defend — and the capability to run it.">
<meta property="og:url" content="https://accelerator-x.ai/what-we-do/senior-leader-acceleration/">
<meta property="og:type" content="website">
```

JSON-LD type: `Service` — serviceType: "Senior Leader Acceleration", provider: Accelerator X

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
```

Note: No `ScarcityCard.css` — 1:1 engagement, no cohort dates or places.

---

## Sections (in order)

### 1. Nav
```
{{component:Nav}}
```

---

### 2. Hero
Custom 2-column hero layout (same structure as Leadership Cohort — sidebar investment card on right).

**Left column:**
- Breadcrumb: `What we do / Senior Leader Acceleration`
- Chip: `1:1 · 12 weeks · single executive · founder-led`
- H1: `A founder in your corner. For one quarter.`
  - Wrap "For one quarter." in `<span class="ax-accent">` for pink accent
- Body copy: `For C-suite leaders carrying AI alone. Weekly 1:1s with one of the founders, plus async support. By the end you have a 90-day plan you can defend and the capability to run it.`

**Right column — sidebar investment card:**
- Header text: "Talk to a founder"
- Badge: `1:1` — chip `--cyan` variant
- Spec table rows:
  - Duration: 12 weeks
  - Cadence: Weekly · 90 min · plus async
  - Format: Hybrid: Zoom + 2 in-person
  - Coach: Toby or Andy
  - From: £12,000
  - Start date: Agreed on signing
- CTA button (full-width, `.btn--accent .btn--lg`): `Apply to work with us →` → `/contact/`
- Sub-note: `Short pre-qualification form · we reply within a week · only good fits get a booking link.`

> **GO-LIVE FLAG:** Naming the coach (Toby or Andy) directly on the page — confirm both founders are comfortable with this before launch.

---

### 3. Who is this for
Alt background section.

- H2: `For the executive carrying AI alone at the top.`
- 3-column card grid:

| # | Eyebrow (cyan) | H4 | Body |
|---|---|---|---|
| 1 | The engagement | How a 1:1 engagement works. | Chemistry call to confirm fit. Contract. Kick-off session to set 90-day direction. |
| 2 | The access | Weekly 1:1 + async. | 90-minute weekly session plus WhatsApp/email async between calls. Your coach is reachable, not just scheduled. |
| 3 | The confidentiality | Nothing leaves the room. | No case studies. No names. No sharing across clients. What you bring stays between you and your founder-coach. |

---

### 4. The Plan
```
{{component:PlanLayers}}
```
3-column variant.

- Kicker chip: `The plan`
- H2: `Three phases. Twelve weeks. One 90-day plan you own.`

| Phase | Label | Weeks | Bg | H4 | Body |
|---|---|---|---|---|---|
| 1 | 01 · ORIENT | Weeks 1–2 | default | Context and direction. | Deep-dive into where you are, what's blocking you, and what a 90-day win looks like. |
| 2 | 02 · BUILD | Weeks 3–10 | accent | Weekly 1:1s + async support. | DOTS applied to your specific role and organisation. Progress tracked. Direction adjusted as needed. |
| 3 | 03 · HANDOFF | Weeks 11–12 | default | 90-day plan handoff. | A plan you can present, defend, and execute without us. Plus access to the network. |

---

### 5. Deliverables
Alt background.
```
{{component:DeliverablesGrid}}
```
4-column variant.

- H2: `Four outcomes. Personal, not public.`

| # | Title | Body |
|---|---|---|
| 01 | Personal AI operating model | How you specifically use AI in your role — built around your context, not a framework template. |
| 02 | A 90-day plan | Costed, sequenced, defensible. Built to survive contact with your board or CFO. |
| 03 | Capability to run it | You leave able to execute without us. No ongoing dependency. |
| 04 | Access to the network | Introductions to the Accelerator X founder and client network where relevant. |

---

### 6. FitCheck
```
{{component:FitCheck}}
```

- H2: `For leaders who'd rather be challenged than managed.`

**Right fit if you…**
- Are carrying AI responsibility alone at C-suite or founder level.
- Can't be fully candid about your challenges in a group setting.
- Want a thinking partner, not a trainer.
- Can commit to 90 minutes a week for 12 weeks.

**Probably not for you if you…**
- Would benefit more from peer learning and group accountability.
- Are looking for technical AI training rather than strategic capability.
- Need a deliverable for your board rather than personal development.

---

### 7. Proof
```
{{component:ProofRow}}
```

Anonymised treatment per wireframe — no avatar, no company name.

- Pull-quote: `[Anonymised quote from a 1:1 coaching client — to be provided by founders]`
- Attribution: `[Role description, anonymised sector · Month Year]` (e.g. "Founder-CEO, B2B tech · Jan 2026")

> **GO-LIVE FLAG — BLOCKING:** Quote must be real, approved by client, and appropriately anonymised. No company name, no photo.

---

### 8. FAQ
```
{{component:FAQList}}
```

- H2: `The six questions executives ask.`
- Questions (answers to be written by founders):
  1. Can I get Andy specifically? Or Toby?
  2. What about confidentiality — will my case be shared?
  3. How is this different from a business coach?
  4. What if I need to reschedule sessions?
  5. Can we extend beyond 12 weeks?
  6. Is there a discovery call before I commit?

> **GO-LIVE FLAG:** Answers to all 6 FAQs must be written by founders before launch.

---

### 9. Final CTA
Custom dark-background section.

- Chip (`.chip--on-dark`): `Apply`
- H2: `Twelve weeks. One founder. Your corner.` — wrap "Your corner." in `<span class="ax-accent">`
- Body: `If you're carrying AI alone at the top and want a thinking partner who's done it, we'd like to talk.`
- CTA button (`.btn--accent .btn--lg`): `Apply to work with us →` → `/contact/`
- Sub-note: `Short pre-qualification form · no calendars to book · we reply within a week.`

---

### 10. Footer
```
{{component:Footer}}
```

---

## Go-live checklist additions

- [ ] **BLOCKING** ProofRow quote — must be real, client-approved, anonymised (no company name)
- [ ] **BLOCKING** FAQ answers — all 6 written by founders
- [ ] Confirm coach naming ("Toby or Andy") on the sidebar is intentional and both founders are comfortable
