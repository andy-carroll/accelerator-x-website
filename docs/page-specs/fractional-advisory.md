# Page Spec: Fractional AI Advisory

**URL:** `/what-we-do/fractional-advisory/`
**Template:** `_templates/offerings/fractional-advisory.html`
**Output:** `what-we-do/fractional-advisory/index.html`
**Wireframe source:** None — no wireframe exists for this offering
**Status:** ⚠️ BLOCKED — founder content decisions required before this spec can be completed

---

## Why this is blocked

This page has no wireframe in the design handoff. The other 3 coaching pages (Leadership Cohort, Leadership Activation, Senior Leader Acceleration) all have detailed wireframes. Fractional AI Advisory does not.

The page template structure will follow the same coaching template as the other three. But the content — the engagement model, pricing, positioning, and differentiators — must come from the founders before anything can be written or built.

---

## Questions founders must answer

Please answer all of these before the spec can be completed and the page built.

**1. Engagement model**
How does Fractional AI Advisory actually work?
- Monthly retainer with a set number of hours?
- Ad hoc access — call when you need it?
- Something else?

**2. Pricing**
- Is pricing public on the page? If so, what is it?
- Or is it "pricing on application"?

**3. Target buyer**
- Who is this for specifically? How is it different from the Senior Leader Acceleration buyer?
- Is it for someone who has already done a programme and wants to stay connected? Or a different type of buyer entirely?

**4. Core deliverables / outcomes**
What does someone get from this? Name 3–4 concrete outcomes.

**5. Key differentiator**
What is the meaningful difference between this and Senior Leader Acceleration beyond "ongoing vs fixed term"? The page needs a clear, honest answer to "why would I choose this over the 1:1 programme?"

**6. Client quotes**
Any approved quotes available for this offering specifically?

---

## What is known (constraints that apply regardless of content)

- All CTAs → `/contact/` — no direct booking links per site-wide policy
- Positioning label from DecisionTree: "I need senior judgement on tap" → Fractional AI Advisory
- This is an ongoing/retainer model, not a fixed-term programme
- Same coaching page template structure applies (Hero + sidebar card + Who is this for + How it works + Deliverables + FitCheck + Proof + FAQ + Final CTA)
- CSS to load will match Leadership Activation (no ScarcityCard)

---

## Build registration (ready to add once content is confirmed)

```javascript
{ template: '_templates/offerings/fractional-advisory.html', output: 'what-we-do/fractional-advisory/index.html' },
```

---

## Placeholder SEO (to be finalised with real content)

```html
<title>Fractional AI Advisory | Accelerator X</title>
<meta name="description" content="[TBD — write once engagement model and positioning are confirmed]">
<link rel="canonical" href="https://accelerator-x.ai/what-we-do/fractional-advisory/">
```

---

## Shell spec (all content TBD)

### Hero
- Breadcrumb: `What we do / Fractional AI Advisory`
- Chip: `[TBD — model · cadence · format]`
- H1: `[TBD]`
- Body: `[TBD]`
- Sidebar card header: `[TBD]`
- Pricing row: `[TBD]`

### Sections (structure confirmed, content TBD)
1. Nav
2. Hero + sidebar card
3. Who is this for — 3-col cards
4. How it works — PlanLayers or custom section
5. Deliverables — DeliverablesGrid 4-col
6. FitCheck
7. Proof — ProofRow (quote TBD)
8. FAQ — 6 questions (TBD)
9. Final CTA (dark bg)
10. Footer

---

## Go-live checklist additions

- [ ] **BLOCKING** All content decisions answered by founders (see questions above)
- [ ] **BLOCKING** Full spec written and reviewed before build starts
