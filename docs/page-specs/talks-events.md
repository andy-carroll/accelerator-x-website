# Page Spec: Talks & Events

**URL:** `/talks-events/`
**Template:** `_templates/talks-events.html`
**Output:** `talks-events/index.html`
**Wireframe source:** None — informational listing page; Build Plan §04 reference only
**Status:** Ready to build — launches in empty state (no events to list yet)

---

## Build registration

Add to `scripts/build-inner-pages.js` PAGES array:

```javascript
{ template: '_templates/talks-events.html', output: 'talks-events/index.html' },
```

---

## SEO block

```html
<title>Talks & Events | Accelerator X</title>
<meta name="description" content="Where to find Accelerator X in the world — workshops, talks, and leadership events. Interested in having us speak? Get in touch.">
<link rel="canonical" href="https://accelerator-x.ai/talks-events/">
<meta property="og:title" content="Talks & Events | Accelerator X">
<meta property="og:description" content="Where to find Accelerator X in the world — workshops, talks, and leadership events. Interested in having us speak? Get in touch.">
<meta property="og:url" content="https://accelerator-x.ai/talks-events/">
<meta property="og:type" content="website">
```

JSON-LD type: `Event` schema not needed at launch (no events yet). Add when real events are listed.

---

## CSS to load (in addition to global styles)

```html
<link rel="stylesheet" href="/assets/css/components/PageHero.css">
<link rel="stylesheet" href="/assets/css/components/CTABand.css">
<link rel="stylesheet" href="/assets/css/components/NewsletterCTA.css">
<link rel="stylesheet" href="/assets/css/components/EventCard.css">
<link rel="stylesheet" href="/assets/css/components/InnerPages.css">
```

---

## Sections (in order)

### 1. Nav
```
{{component:Nav}}
```

---

### 2. PageHero
```
{{component:PageHero}}
```

- Breadcrumb: `Talks & Events`
- Kicker: `WHERE TO FIND US`
- H1: `Speaking, events, and workshops.`
- Subhead: `We run events for senior leaders navigating AI. Below is where you can find us.`

---

### 3. Upcoming Events (empty state)
Custom section — no `{{component:EventCard}}` tokens at build time (no real events yet).

```html
<section class="ax-inner-section">
  <div class="ax-inner-section__container">
    <h2>Upcoming events</h2>
    <div class="ax-empty-state">
      <p>We're scheduling the next round of events. Sign up below to be notified when dates are confirmed.</p>
    </div>
  </div>
</section>
```

When real events are confirmed, replace the empty state div with `{{component:EventCard}}` instances.

> **GO-LIVE FLAG:** Replace empty state with real EventCard instances when dates are confirmed.

---

### 4. Speaking inquiry
Custom section — not a component token.

```html
<section class="ax-inner-section ax-inner-section--alt">
  <div class="ax-inner-section__container ax-inner-section__container--narrow">
    <h2>Interested in having us speak?</h2>
    <p>We speak at leadership offsites, industry conferences, and board-level AI briefings. If you have an event in mind, tell us about it.</p>
    <a href="/contact/" class="btn btn--primary">Get in touch →</a>
  </div>
</section>
```

CTA routes to `/contact/` — not an external booking link.

---

### 5. NewsletterCTA
```
{{component:NewsletterCTA}}
```

---

### 6. Footer
```
{{component:Footer}}
```

---

## Note on EventCard component

`EventCard` (`_templates/components/EventCard.html`) already exists in the component library with `data-variant="standard"` and `data-variant="featured"` variants. When real events are added:

- Each event = one `{{component:EventCard}}` token with inline data overrides, OR
- Events are stored in a JSON config and rendered at build time (same pattern as testimonials / hero media)

The simpler approach for first events: inline EventCard HTML directly in the template (no JSON config needed until there are 3+ events).

---

## Go-live checklist additions

- [ ] Replace empty state with real EventCard instances when first event is confirmed
- [ ] Add `Event` JSON-LD schema when real events are listed
