# Page Spec: Leadership Activation

**URL:** `/what-we-do/leadership-activation/`
**Template:** `_templates/offerings/leadership-activation.html`
**Output:** `what-we-do/leadership-activation/index.html`
**Wireframe source:** "Senior Leader Acceleration" (team delta) — same template structure as Leadership Cohort with content swaps
**Status:** Ready to build — pending founder review of flagged items

---

## Build registration

Add to `scripts/build-inner-pages.js` PAGES array:

```javascript
{ template: '_templates/offerings/leadership-activation.html', output: 'what-we-do/leadership-activation/index.html' },
```

---

## SEO block

```html
<title>Leadership Activation | Accelerator X</title>
<meta name="description" content="Bring Accelerator X to your existing leadership team. Eight weeks, on-site, bi-weekly half-days. One shared AI operating model.">
<link rel="canonical" href="https://accelerator-x.ai/what-we-do/leadership-activation/">
<meta property="og:title" content="Leadership Activation | Accelerator X">
<meta property="og:description" content="Bring Accelerator X to your existing leadership team. Eight weeks, on-site, bi-weekly half-days. One shared AI operating model.">
<meta property="og:url" content="https://accelerator-x.ai/what-we-do/leadership-activation/">
<meta property="og:type" content="website">
```

JSON-LD type: `Service` — serviceType: "Leadership Activation", provider: Accelerator X

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

Note: No `ScarcityCard.css` — this offering has no cohort dates or places-left count.

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
- Breadcrumb: `What we do / Leadership Activation`
- Chip: `Group · 8 weeks · single leadership team · in-house`
- H1: `A leadership team that moves together.`
  - Wrap "moves together." in `<span class="ax-accent">` for pink accent
- Body copy: `For an existing leadership team — your team, not a peer cohort. We come to you, bi-weekly, for eight weeks. By the end you share a way of working with AI, not just five separate views of it.`

**Right column — sidebar investment card:**
- Header text: "Bring us to your team"
- Badge: `In-house` — chip `--cyan` variant
- Spec table rows:
  - Duration: 8 weeks
  - Cadence: Bi-weekly · ½ day
  - Format: On-site at your offices
  - Group size: 5–10 people
  - From: £18,000 fixed-team
  - Start date: Agreed on signing
- CTA button (full-width, `.btn--accent .btn--lg`): `Apply to work with us →` → `/contact/`
- Sub-note: `Short pre-qualification form · we reply within a week · only good fits get a booking link.`

Note: No "places left" row — no cohort scarcity. Lead-time copy instead.

---

### 3. Who is this for
Alt background section.

- H2: `Your leadership team, working on your real context.`
- 3-column card grid:

| # | Eyebrow (cyan) | H4 | Body |
|---|---|---|---|
| 1 | The team | Your existing leadership team. | 5–10 leaders from the same organisation. One shared context, one shared outcome. |
| 2 | The seniority bar | Director+ / function owner. | Real decision authority. AI is on your plate as a leadership team responsibility. |
| 3 | The format | Bi-weekly half-days. On-site. | We come to you. Eight weeks, four sessions, no travel overhead for your team. |

---

### 4. The Plan
```
{{component:PlanLayers}}
```
3-column variant.

- Kicker chip: `The plan`
- H2: `Three phases. Eight weeks. One shared operating model.`

| Phase | Label | Weeks | Bg | H4 | Body |
|---|---|---|---|---|---|
| 1 | 01 · PREP | Week 0 | default | Pre-engagement call. | 1:1 with a founder. Context-gathering and scope confirmation before we arrive. |
| 2 | 02 · SESSIONS | Weeks 1–8 | accent | Bi-weekly half-days, on-site. | DOTS applied to your team's real context. Founder-led, not associates. Four sessions over eight weeks. |
| 3 | 03 · EMBED | Weeks 7–8 | default | Shared operating model. | The team leaves with one agreed way of working with AI — not five individual views. |

---

### 5. Deliverables
Alt background.
```
{{component:DeliverablesGrid}}
```
4-column variant.

- H2: `Four outcomes. For the team, not just the individual.`

| # | Title | Body |
|---|---|---|
| 01 | Shared AI operating model | One agreed way of working with AI across your leadership team. |
| 02 | Team-level artefact | Something your team built together — a process, a tool, a decision framework. |
| 03 | Aligned leadership | Everyone in the room speaks the same language on AI opportunity and risk. |
| 04 | DOTS, applied in-house | The same framework we run with corporates, applied to your team's specific context. |

---

### 6. FitCheck
```
{{component:FitCheck}}
```

- H2: `For leadership teams who want alignment, not separate opinions.`

**Right fit if you…**
- Have a leadership team willing to commit 4 half-days over 8 weeks.
- Want your whole team aligned, not just the most interested members.
- Are comfortable being challenged on what's actually slowing you down.
- Own the outcomes of AI adoption at a leadership level.

**Probably not for you if you…**
- Need each leader to go at their own pace.
- Can't guarantee attendance from the core leadership team.
- Are looking for individual coaching rather than team alignment.

---

### 7. Proof
```
{{component:ProofRow}}
```

- Pull-quote: `[Real quote from a leadership team client — to be provided by founders]`
- Attribution: `[Role, Company · Month Year]`

> **GO-LIVE FLAG — BLOCKING:** This quote is placeholder. A real, approved client quote must be supplied before launch.

---

### 8. FAQ
```
{{component:FAQList}}
```

- H2: `The six questions leadership teams ask.`
- Questions (answers to be written by founders):
  1. Can my CEO not attend every session?
  2. What if we're a team of more than 10?
  3. How do you tailor content to our industry?
  4. What's the difference between this and a workshop?
  5. Can we extend beyond 8 weeks?
  6. What do we own at the end?

> **GO-LIVE FLAG:** Answers to all 6 FAQs must be written by founders before launch.

---

### 9. Final CTA
Custom dark-background section.

- Chip (`.chip--on-dark`): `Apply`
- H2: `Eight weeks. One shared direction.` — wrap "One shared direction." in `<span class="ax-accent">`
- Body: `If your leadership team is ready to move on AI together, we'd like to talk. Tell us where you are; we'll come back within a week.`
- CTA button (`.btn--accent .btn--lg`): `Apply to work with us →` → `/contact/`
- Sub-note: `Short pre-qualification form · no calendars to book · we reply within a week.`

---

### 10. Footer
```
{{component:Footer}}
```

---

## Go-live checklist additions

- [ ] **BLOCKING** ProofRow quote — real approved client quote required (currently placeholder)
- [ ] **BLOCKING** FAQ answers — all 6 written by founders
