# Accelerator X — Design System Documentation

*Version 1.0 — February 2026*

---

## 1. How It Works (Architecture Overview)

### Core Philosophy

The Accelerator X design system uses **CSS Custom Properties (variables)** as the single source of truth for all visual styling. This means:

- **One file controls everything**: Edit `styles.css`, changes apply site-wide
- **No build step required**: Works immediately in any browser
- **Easy rebranding**: Change a few color values, entire site updates
- **Separation of concerns**: Layout (Tailwind) vs Visuals (CSS)

### Two-Layer Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  HTML (index.html)                                          │
│  ───────────────                                            │
│  • Semantic HTML5 structure                                 │
│  • Tailwind classes for LAYOUT (flex, grid, px-4, etc.)    │
│  • Custom classes for COLORS (.bg-primary, .text-accent)     │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  CSS (styles.css)                                           │
│  ───────────────                                            │
│  • CSS Custom Properties (variables) ──► SINGLE SOURCE      │
│  • Semantic utility classes (maps variables to elements)    │
│  • Component patterns (.card, .btn)                         │
│  • Accessibility & performance optimizations                │
└─────────────────────────────────────────────────────────────┘
```

### Why This Approach?

| Approach | Pros | Cons |
|----------|------|------|
| **Our System** (CSS variables) | Change one file, instant rebrand; self-documenting; no build step | Requires understanding of CSS variables |
| Tailwind Config Only | Familiar to many devs | Hardcoded in JS; requires rebuild; two sources of truth |
| CSS-in-JS | Dynamic styling | Build complexity; performance overhead |
| Sass/SCSS | Advanced features | Build step required; overkill for this project |

---

## 2. How It's Built (File Structure)

```
/accelerator-x-website
│
├── index.html              # Main page (semantic HTML + Tailwind utilities)
├── styles.css              # Design system (variables + classes) ⭐
│
├── /docs
│   ├── landing-page-spec.md     # Product specification
│   ├── landing-page-copy.md     # Content document
│   └── design-system.md         # This file
│
├── /assets
│   ├── /images
│   │   ├── og-image.jpg         # Social sharing image (1200x630)
│   │   └── logo.png             # Brand logo
│   └── /icons
│       ├── favicon.svg          # Vector favicon
│       ├── favicon.ico          # Legacy favicon
│       └── apple-touch-icon.png # iOS home screen icon
│
└── .gitignore
```

### Key Files Explained

**`styles.css`** — The heart of the system:
- `:root` variables (lines 18-66): All colors, spacing, fonts defined here
- Utility classes (lines 127-148): Bridge between variables and HTML
- Components (lines 163-229): Reusable patterns

**`index.html`** — Content and structure:
- Head section: SEO meta tags, Open Graph, JSON-LD structured data
- Body sections: Semantic HTML with Tailwind layout classes

---

## 3. Best Practices Followed

### A. CSS Architecture (BEM-inspired)

```css
/* Block */
.card { }

/* Element */
.card__title { }  /* We use nested selectors instead */

/* Modifier */
.btn--accent { }  /* We use .btn-accent instead */
```

Our approach is simpler: **semantic class names** that describe purpose, not presentation:

```css
/* ✅ Good: Describes purpose */
.btn-accent { }
.text-muted { }
.bg-surface { }

/* ❌ Avoid: Describes specific values */
.btn-red { }      /* What if we change to blue? */
.text-grey { }    /* Too specific */
```

### B. CSS Custom Properties Pattern

```css
:root {
  /* Define once */
  --color-accent: #E85A4F;
}

/* Use everywhere */
.btn-accent {
  background: var(--color-accent);
}

.text-accent {
  color: var(--color-accent);
}

.border-accent {
  border-color: var(--color-accent);
}
```

**Benefits:**
- Change `--color-accent` in one place → entire site updates
- Consistent color usage enforced by CSS
- Self-documenting: variable names describe purpose

### C. Tailwind + Custom CSS Separation

| Use Tailwind For | Use CSS Classes For |
|------------------|---------------------|
| Layout (flex, grid) | Colors (bg-primary, text-accent) |
| Spacing (px-4, py-8) | Typography (font-display) |
| Sizing (w-full, max-w-6xl) | Components (card, btn, section) |
| Responsive (lg:, md:) | Shadows, radius |

**Example:**
```html
<!-- Layout: Tailwind | Colors: CSS -->
<div class="flex items-center gap-4 px-4 py-8 bg-surface text-navy">
  
  <!-- Tailwind handles the box model -->
  <!-- styles.css handles the colors -->
  
</div>
```

### D. Accessibility Best Practices

1. **Focus indicators**: `:focus-visible` with brand color
2. **Reduced motion**: `prefers-reduced-motion` media query
3. **Semantic HTML**: Proper heading hierarchy (h1 → h2 → h3)
4. **Color contrast**: All text meets WCAG 2.1 AA standards
5. **Smooth scroll**: CSS `scroll-behavior: smooth` (disabled for reduced motion)

### E. Performance Optimizations

1. **Preconnect hints**: DNS lookup done early for fonts
2. **Font display swap**: Text visible immediately (no invisible text)
3. **Single CSS file**: One HTTP request for all styles
4. **No build step**: No bundling time, instant updates

---

## 4. How to Easily Change Things Later

### Scenario 1: Rebrand — Change Primary Color

**Current:** Teal (`#11d4d4`)
**Goal:** Change to Purple

```css
/* styles.css line 20 */
--color-primary: #8b5cf6;  /* Change from #11d4d4 */
```

✅ **Result**: Every button, highlight, accent, and selection color updates instantly.

### Scenario 2: Change Accent Color

```css
/* styles.css line 23 */
--color-accent: #6366f1;  /* Change from #E85A4F */
```

✅ **Result**: All CTAs, important actions, error states update.

### Scenario 3: Change Font

```css
/* styles.css line 39-40 */
--font-display: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
--font-body: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
```

Also update Google Fonts in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Scenario 4: Adjust Spacing Scale

```css
/* styles.css lines 43-53 */
--space-4: 1.25rem;  /* Was 1rem, now 20px */
--space-8: 2.5rem;   /* Was 2rem, now 40px */
```

✅ **Result**: All padding and margins using these values update.

### Scenario 5: Add a New Color

```css
/* styles.css — add to :root */
--color-secondary: #64748b;

/* Add utility classes */
.bg-secondary { background-color: var(--color-secondary); }
.text-secondary { color: var(--color-secondary); }
```

Use in HTML:
```html
<div class="bg-secondary text-white">...</div>
```

### Scenario 6: Create a New Component

```css
/* styles.css — add to Component Patterns section */
.banner {
  background: var(--color-primary);
  color: var(--color-navy);
  padding: var(--space-6);
  border-radius: var(--radius-lg);
  text-align: center;
}
```

Use in HTML:
```html
<div class="banner">
  <p>Special announcement goes here</p>
</div>
```

---

## 5. Common Patterns & Recipes

### Recipe: Add a New Section

```html
<!-- 
  ========================================
  SECTION: [Section Name]
  ========================================
  PURPOSE: [What this section does]
-->
<section id="section-id" class="section">
  <div class="container">
    <h2 class="font-display text-3xl font-bold text-navy">Headline</h2>
    <!-- Content here -->
  </div>
</section>
```

### Recipe: Add a New Card

```html
<div class="card">
  <h3 class="font-display text-xl font-bold text-navy">Title</h3>
  <p class="mt-4 text-muted">Description goes here...</p>
</div>
```

### Recipe: Add a Button

```html
<!-- Primary CTA -->
<a href="#apply" class="btn btn-accent">Apply now</a>

<!-- Secondary action -->
<a href="#learn-more" class="btn btn-primary">Learn more</a>
```

### Recipe: Responsive Two-Column Layout

```html
<div class="grid gap-8 lg:grid-cols-2">
  <div><!-- Left content --></div>
  <div><!-- Right content --></div>
</div>
```

---

## 6. Troubleshooting Guide

### Problem: Colors not updating after changing CSS variables

**Cause**: Browser caching or using Tailwind classes instead of CSS classes

**Check**:
1. Hard refresh browser (Cmd+Shift+R or Ctrl+F5)
2. Verify you're using `.bg-primary` not `bg-primary` (CSS class vs Tailwind)
3. Check for typos in variable names

### Problem: Fonts not loading

**Check**:
1. Google Fonts URL is correct in `index.html`
2. Font weights requested (400, 500, 600, 700) match usage
3. `font-display` class is applied

### Problem: Mobile layout broken

**Check**:
1. Viewport meta tag present: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
2. Responsive prefixes correct: `lg:`, `md:` (not `sm:` accidentally)
3. Container has `max-w-6xl` or similar constraint

### Problem: SEO not showing correctly on social

**Check**:
1. Open Graph image exists at `/assets/images/og-image.jpg`
2. Image dimensions are 1200x630px
3. Canonical URL is correct
4. Use [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) or [Twitter Card Validator](https://cards-dev.twitter.com/validator)

---

## 7. Future Enhancements

### Phase 2: Conversion Optimization
- Add A/B testing CSS hooks (`.variant-a`, `.variant-b`)
- Create form component styles for GoHighLevel integration
- Add animation classes (`.fade-in`, `.slide-up`)

### Phase 3: Advanced SEO
- Add breadcrumb structured data
- Create FAQ schema for "Who this is for" section
- Add review/rating schema when testimonials have scores

### Phase 4: Dark Mode (Optional)
```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #0f172a;
    --color-navy: #f8fafc;
    /* ... */
  }
}
```

---

## Quick Reference Card

| Task | File to Edit | Line/Location |
|------|--------------|---------------|
| Change primary color | styles.css | :root --color-primary |
| Change accent/CTA color | styles.css | :root --color-accent |
| Change font | styles.css | :root --font-display | 
| Change spacing | styles.css | :root --space-* |
| Add component | styles.css | Component Patterns section |
| Update page title | index.html | `<title>` tag |
| Update meta description | index.html | meta description |
| Update social image | index.html | og:image meta tag |
| Add section | index.html | Before closing `</main>` |
| Update copy | index.html | Within section comments |

---

## Summary

**The Golden Rule**: Edit `styles.css` for visual changes, `index.html` for content changes. Never hardcode colors in HTML — always use CSS classes that reference variables.

**For rebranding**: Change 2-3 lines in `styles.css`, entire site updates instantly.

**For maintenance**: Add comments explaining why, not just what. The next developer (or future you) will thank you.

---

*Document created: February 2026*
*Last updated: With Phase 1 MVP completion*
