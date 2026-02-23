# Accelerator X Landing Page — Product Specification & Development Plan

*Version 1.0 — February 2026*
*Status: Phase 1 complete ✅ — Phase 2 pending*

---

## Executive summary

This document specifies a single-page landing site for Accelerator X, built in three phases:

- **Phase 1 (MVP):** Static page with core messaging, live today
- **Phase 2 (Conversion):** VSL embed, application form integration, testimonials
- **Phase 3 (Polish):** Animations, refinements, analytics, A/B testing

The goal is to get something live immediately, then iterate.

---

## Technical approach

### Stack
- **Framework:** Static HTML + Tailwind CSS (no build step required)
- **Hosting:** Can be served from anywhere (Netlify, Vercel, or direct to GoHighLevel)
- **Form handling:** GoHighLevel embedded form (Phase 2)
- **Video:** YouTube/Vimeo embed or self-hosted (Phase 2)

### Why static HTML?
- Zero build complexity
- Can be deployed anywhere in minutes
- Easy to hand off or modify
- GoHighLevel compatible
- Fast loading, good SEO

### Design system setup
All colours and fonts defined as CSS variables for easy modification:

```css
:root {
  --color-primary: #11d4d4;      /* Teal */
  --color-accent: #E85A4F;       /* Coral — easily changeable */
  --color-navy: #0f172a;         /* Text */
  --color-background: #ffffff;   /* White */
  --color-muted: #64748b;        /* Slate for secondary text */
  --font-display: 'Space Grotesk', sans-serif;
}
```

---

## Phase 1: MVP (Target: Live today)

### Objective
Get a professional, readable page live on your domain that tells people who you are and what you do. No form, no video—just solid copy and clean design.

### What's included
- Responsive single-page layout
- All copy sections (hero through footer)
- Mobile-first design
- Placeholder for video (static image with "Video coming soon" or similar)
- Placeholder for testimonials (can show structure without real quotes)
- Simple CTA that links to email (mailto:) or Calendly as interim
- Logo/trust bar with placeholder or real logos if available

### What's NOT included (deferred to Phase 2)
- VSL video embed
- GoHighLevel form integration
- Live testimonials (unless you have them ready)
- Analytics tracking
- Animations/micro-interactions

---

## Phase 1 tickets

### P1-01: Project setup
**Description:** Create project structure and base files
**Acceptance criteria:**
- [x] Create project folder structure
- [x] Create `index.html` with HTML5 boilerplate
- [x] Create `styles.css` with CSS variables (design tokens)
- [x] Add Tailwind CSS via CDN
- [x] Add Google Fonts (Space Grotesk)
- [x] Add Material Symbols for icons
- [x] Test renders correctly in browser

**Files to create:**
```
/accelerator-x-site
  index.html
  styles.css
  /assets
    /images
      (placeholder for logos, hero image)
```

**Estimated time:** 15 minutes

---

### P1-02: Design tokens and base styles
**Description:** Define the design system as CSS variables and base Tailwind config
**Acceptance criteria:**
- [x] Define colour palette as CSS variables
- [x] Define typography scale
- [x] Define spacing scale
- [x] Define border radius values
- [x] Set up Tailwind config in `<script>` tag
- [x] Create base body styles (font, background, text colour)
- [x] Test dark text on light background renders correctly

**Code reference:**
```html
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          primary: '#11d4d4',
          accent: '#E85A4F',
          navy: '#0f172a',
        },
        fontFamily: {
          display: ['Space Grotesk', 'sans-serif'],
        },
      },
    },
  }
</script>
```

**Estimated time:** 15 minutes

---

### P1-03: Header/navigation
**Description:** Build sticky header with logo and CTA button
**Acceptance criteria:**
- [x] Sticky header that stays at top on scroll
- [x] Logo/wordmark on left ("Accelerator X")
- [x] Single CTA button on right ("Get in touch" or "Apply")
- [x] Subtle border or shadow to separate from content
- [x] Mobile responsive (logo + button, no hamburger needed for single page)
- [x] CTA links to `#apply` anchor (or mailto: as interim)

**Copy:**
- Logo text: "Accelerator X"
- CTA: "Apply to work with us"

**Estimated time:** 20 minutes

---

### P1-04: Hero section
**Description:** Build hero with headline, subhead, CTA, and video placeholder
**Acceptance criteria:**
- [x] Large headline, prominent
- [x] Subhead in muted colour
- [x] Primary CTA button
- [x] Supporting text below CTA (risk reversal)
- [x] Video placeholder (grey box with play icon, or static image)
- [x] Responsive: stacks on mobile, can be side-by-side on desktop
- [x] Adequate white space

**Copy:**
- Headline: "AI transformation for leaders who are done waiting."
- Subhead: "You know AI matters. You're tired of the hype. You want a partner who'll actually get it done—not an agency that disappears or a consultancy that leaves you with slides."
- CTA: "Apply to work with us"
- Supporting: "We start with a one-day workshop. If it doesn't deliver value, you don't pay."

**Estimated time:** 30 minutes

---

### P1-05: Problem section
**Description:** Build section that names the pain points
**Acceptance criteria:**
- [x] Section headline
- [x] Body copy (2-3 paragraphs)
- [x] Good readability (max-width on text, adequate line height)
- [x] Subtle background differentiation (light grey or white)
- [x] Responsive

**Copy:**
- Headline: "You've tried. It hasn't worked."
- Body: [As per landing page copy document]

**Estimated time:** 20 minutes

---

### P1-06: How we're different section
**Description:** Build section with three differentiators
**Acceptance criteria:**
- [x] Section headline
- [x] Three content blocks (can be cards or simple stacked sections)
- [x] Each block has: sub-headline + paragraph
- [x] Visual distinction between blocks (cards, borders, or spacing)
- [x] Responsive: stack on mobile, can be 3-column on desktop

**Copy:**
- Headline: "We're not an agency. We're not a consultancy. We're your partner."
- Three blocks: [As per landing page copy document]

**Estimated time:** 30 minutes

---

### P1-07: How it works section
**Description:** Build three-step process section
**Acceptance criteria:**
- [x] Section headline
- [x] Three steps clearly delineated (numbered or with icons)
- [x] Each step has: title, description, price indicator
- [x] Visual progression (1 → 2 → 3)
- [x] Responsive: stack on mobile

**Copy:**
- Headline: "A clear path from overwhelmed to operational."
- Steps: Workshop / Cycles / Ongoing [As per landing page copy document]

**Estimated time:** 30 minutes

---

### P1-08: Who this is for section
**Description:** Build qualification/disqualification section
**Acceptance criteria:**
- [x] Two blocks: "This is for you if" and "This is not for you if"
- [x] Bullet points for each
- [x] Visual contrast between the two (green/red icons, or different backgrounds)
- [x] Responsive

**Copy:**
- [As per landing page copy document]

**Estimated time:** 25 minutes

---

### P1-09: Testimonials section (placeholder)
**Description:** Build testimonial section structure with placeholders
**Acceptance criteria:**
- [x] Section headline ("What our clients say" or similar)
- [x] Three testimonial cards
- [x] Each card: quote, name, title, company
- [x] Placeholder text or greyed out "Testimonials coming soon"
- [x] Structure ready to receive real testimonials
- [x] Responsive: stack on mobile, row on desktop

**Copy:**
- Placeholder quotes or real if available

**Estimated time:** 25 minutes

---

### P1-10: About us section
**Description:** Build section introducing Toby and Andy
**Acceptance criteria:**
- [x] Section headline
- [x] Brief intro paragraph
- [x] Two "cards" or blocks for Toby and Andy
- [x] Each block: name, brief bio (2-3 sentences)
- [x] Placeholder for headshots (grey circle or initials)
- [x] Responsive

**Copy:**
- [As per landing page copy document]

**Estimated time:** 25 minutes

---

### P1-11: Logo/trust bar
**Description:** Build client logo display section
**Acceptance criteria:**
- [x] Simple headline ("Trusted by forward-thinking leaders")
- [x] Row of logos (greyscale, subtle)
- [x] 4-6 logo slots
- [x] Placeholder images if real logos not ready
- [x] Responsive: wrap on mobile

**Estimated time:** 15 minutes

---

### P1-12: Final CTA section
**Description:** Build bottom CTA block
**Acceptance criteria:**
- [x] Contrasting background (navy or accent colour)
- [x] Headline
- [x] Supporting text
- [x] CTA button (prominent)
- [x] Anchor id="apply" for navigation

**Copy:**
- Headline: "Ready to stop waiting?"
- Body: [As per landing page copy document]
- CTA: "Apply to work with us"

**Estimated time:** 20 minutes

---

### P1-13: Footer
**Description:** Build minimal footer
**Acceptance criteria:**
- [x] Logo/wordmark
- [x] Social links (LinkedIn at minimum)
- [x] Copyright notice
- [x] Privacy/Terms links (can be placeholder)
- [x] Responsive

**Estimated time:** 15 minutes

---

### P1-14: Responsive testing and fixes
**Description:** Test all breakpoints and fix issues
**Acceptance criteria:**
- [x] Test on mobile (375px)
- [x] Test on tablet (768px)
- [x] Test on desktop (1280px+)
- [x] Fix any layout breaks
- [x] Check typography scales appropriately
- [x] Check spacing is consistent
- [x] Test all links work

**Estimated time:** 30 minutes

---

### P1-15: Interim CTA behaviour
**Description:** Set up temporary CTA behaviour before form is ready
**Acceptance criteria:**
- [x] All CTA buttons link to same action
- [x] Options: mailto: link, Calendly embed, or simple "email us" message
- [x] Decide and implement one approach
- [x] Test on mobile and desktop

**Recommendation:** Use mailto:hello@accelerator-x.com as simplest interim

**Estimated time:** 10 minutes

---

### P1-16: Deployment
**Description:** Deploy to live domain
**Acceptance criteria:**
- [x] Choose hosting (Netlify recommended for simplicity)
- [x] Connect to domain
- [x] Deploy files
- [x] Test live URL works
- [x] Test on mobile device (real device, not just emulator)
- [x] SSL certificate active (https)

**Estimated time:** 20 minutes

---

## Phase 1 total estimated time: ~5-6 hours

---

## Phase 2: Conversion (Target: Within 1 week)

### Objective
Add the conversion elements: working VSL, application form, real testimonials.

---

## Phase 2 tickets

### P2-01: VSL video embed
**Description:** Replace video placeholder with actual VSL
**Acceptance criteria:**
- [ ] Embed YouTube/Vimeo player or self-hosted video
- [ ] Responsive video container (16:9 aspect ratio)
- [ ] Custom play button overlay (optional)
- [ ] Video loads without blocking page
- [ ] Fallback for slow connections

**Dependencies:** VSL video must be recorded and uploaded

**Estimated time:** 30 minutes

---

### P2-02: GoHighLevel form integration
**Description:** Embed and style GoHighLevel application form
**Acceptance criteria:**
- [ ] Create form in GoHighLevel with 7 fields
- [ ] Embed form on page (iframe or JS embed)
- [ ] Style form to match site design (may require GHL custom CSS)
- [ ] Test form submission works
- [ ] Test notification triggers in GHL
- [ ] Test confirmation/thank you message displays

**Form fields:**
1. Your name (text)
2. Your email (email)
3. Company name (text)
4. Your role (text)
5. How many employees? (dropdown)
6. Biggest challenge with AI right now? (textarea)
7. What would success look like in 12 months? (textarea)

**Styling approach:**
- GHL forms can be styled with custom CSS
- Match font family, colours, border radius to site
- Or: build custom HTML form that posts to GHL webhook

**Estimated time:** 1-2 hours (depending on GHL styling complexity)

---

### P2-03: Real testimonials
**Description:** Replace placeholder testimonials with real quotes
**Acceptance criteria:**
- [ ] Collect 3 testimonials from clients
- [ ] Get approval to use names/companies
- [ ] Update copy in testimonial section
- [ ] Add headshots if available
- [ ] Test renders correctly

**Dependencies:** Client approval for testimonials

**Estimated time:** 30 minutes (implementation only)

---

### P2-04: Real client logos
**Description:** Add actual client logos to trust bar
**Acceptance criteria:**
- [ ] Collect logo files (SVG or PNG preferred)
- [ ] Ensure permission to use
- [ ] Resize/optimise for web
- [ ] Replace placeholder images
- [ ] Apply greyscale filter for consistency
- [ ] Test renders correctly

**Estimated time:** 30 minutes

---

### P2-05: Thank you / confirmation state
**Description:** Create post-application confirmation
**Acceptance criteria:**
- [ ] After form submit, user sees confirmation
- [ ] Options: redirect to thank you page, or in-page message
- [ ] Message sets expectations ("We'll review and be in touch within 48 hours")
- [ ] Test full flow works

**Estimated time:** 30 minutes

---

### P2-06: Basic analytics
**Description:** Add tracking to understand visitor behaviour
**Acceptance criteria:**
- [ ] Add Google Analytics 4 or Plausible
- [ ] Track page views
- [ ] Track CTA clicks (events)
- [ ] Track form submissions (events)
- [ ] Test data appears in analytics dashboard

**Estimated time:** 30 minutes

---

## Phase 2 total estimated time: ~4-5 hours

---

## Phase 3: Polish (Target: Within 2-3 weeks)

### Objective
Refine the experience with animations, performance optimisation, and A/B testing capability.

---

## Phase 3 tickets

### P3-01: Scroll animations
**Description:** Add subtle animations as sections come into view
**Acceptance criteria:**
- [ ] Fade-in effect on sections as they enter viewport
- [ ] Stagger effect on card groups
- [ ] Keep animations subtle and fast (200-300ms)
- [ ] Respect prefers-reduced-motion
- [ ] Use CSS animations or lightweight library (AOS or similar)

**Estimated time:** 1 hour

---

### P3-02: Performance optimisation
**Description:** Optimise loading speed
**Acceptance criteria:**
- [x] Compress and optimise all images
- [x] Lazy load images below fold
- [ ] Minimise CSS (remove unused Tailwind classes if using build step)
- [ ] Test with Lighthouse, target 90+ performance score
- [x] Add appropriate caching headers

**Estimated time:** 1 hour

---

### P3-03: SEO fundamentals
**Description:** Add meta tags and SEO basics
**Acceptance criteria:**
- [ ] Title tag (compelling, includes key terms)
- [ ] Meta description
- [ ] Open Graph tags (for social sharing)
- [ ] Canonical URL
- [ ] Favicon
- [ ] Sitemap.xml (optional for single page)

**Estimated time:** 30 minutes

---

### P3-04: A/B testing setup (optional)
**Description:** Enable testing different headlines or CTAs
**Acceptance criteria:**
- [ ] Choose tool (Google Optimize, or simple JS-based)
- [ ] Set up one test (e.g., headline variation)
- [ ] Track conversion by variant
- [ ] Document how to create future tests

**Estimated time:** 1-2 hours

---

### P3-05: Cookie consent (if required)
**Description:** Add cookie notice if using analytics
**Acceptance criteria:**
- [ ] Simple cookie banner
- [ ] Link to privacy policy
- [ ] Store consent preference
- [ ] Only load analytics after consent (if strict compliance needed)

**Estimated time:** 30 minutes

---

## Phase 3 total estimated time: ~4-5 hours

---

## Known challenges and solutions

### Challenge 1: GoHighLevel form styling
**Issue:** GHL embedded forms have default styling that may not match your brand.
**Solutions:**
- Option A: Use GHL's custom CSS feature to override styles
- Option B: Build a custom HTML form that submits to a GHL webhook
- Option C: Use GHL form in a modal/popup where styling matters less
**Recommendation:** Start with Option A. If too limited, move to Option B.

### Challenge 2: VSL not ready yet
**Issue:** You may not have the video recorded.
**Solutions:**
- Phase 1 ships without video (placeholder image)
- Record video as separate workstream
- Add in Phase 2 when ready
**Recommendation:** Don't let video block Phase 1 launch.

### Challenge 3: Testimonials not collected yet
**Issue:** Need client permission and actual quotes.
**Solutions:**
- Launch with placeholder or "Testimonials coming soon"
- Or: use paraphrased/anonymised versions ("A construction firm MD said...")
- Add real ones as they come in
**Recommendation:** Reach out to clients now, add as available.

### Challenge 4: Logo permissions
**Issue:** Need client approval to display logos.
**Solutions:**
- Ask clients directly (usually fine if relationship is good)
- Launch with placeholder grey boxes
- Add as permissions come in
**Recommendation:** Ask today, add as approved.

---

## File structure for Claude Code

```
/accelerator-x-landing
│
├── index.html              # Main page
├── thank-you.html          # Post-application confirmation (Phase 2)
│
├── /assets
│   ├── /images
│   │   ├── hero-placeholder.jpg
│   │   ├── logo-client-1.svg
│   │   ├── logo-client-2.svg
│   │   ├── toby-headshot.jpg
│   │   └── andy-headshot.jpg
│   │
│   └── /icons
│       └── favicon.ico
│
├── styles.css              # Custom styles (if needed beyond Tailwind)
│
└── README.md               # Deployment notes
```

---

## Claude Code prompt

When you're ready to start building, you can feed Claude Code this context:

---

**Prompt for Claude Code:**

I need to build a single-page landing site for Accelerator X, an AI consulting business. 

**Technical requirements:**
- Static HTML + Tailwind CSS (via CDN, no build step)
- Mobile-first, responsive design
- Clean, modern aesthetic (white background, teal primary #11d4d4, coral accent #E85A4F, navy text #0f172a)
- Font: Space Grotesk from Google Fonts
- Icons: Material Symbols

**The page structure (in order):**
1. Sticky header (logo + CTA button)
2. Hero (headline, subhead, CTA, video placeholder)
3. Problem section (headline + body copy)
4. How we're different (headline + 3 differentiator blocks)
5. How it works (headline + 3-step process with pricing)
6. Who this is for / not for (two contrasting lists)
7. Testimonials (3 cards, can be placeholder)
8. About us (intro + Toby bio + Andy bio)
9. Logo/trust bar (4-6 logos)
10. Final CTA block (contrasting background)
11. Footer (logo, social links, copyright)

**Copy document attached:** [Paste the landing page copy markdown]

**Phase 1 scope:**
- Get all sections built with real copy
- Video is placeholder (grey box with play icon)
- CTAs link to mailto: as interim
- Testimonials can be placeholder
- Must be deployable today

Please build this step by step, starting with project setup and design tokens, then working through each section.

**Additional notes:**

**What's already good**
- Design tokens as CSS variables: colours, fonts, spacing defined once and reused everywhere. Change `--color-accent` in one place and it updates site-wide.
- Tailwind via CDN: no build step (low complexity) but you still get utility classes. Easy to tweak spacing/sizing/layout without touching custom CSS.
- Semantic HTML structure: sections are clearly delineated. You can find “the problem section” and edit it without hunting through spaghetti.
- Single file to start: for a page this simple, one HTML file is often easier to maintain than a fragmented component structure. You can `CMD+F` any section.

**What I'd tighten for better maintainability**
The spec currently has copy embedded directly in the HTML. That's fine for v1, but if you expect frequent copy changes without touching markup, separate content from structure.

**Option A: Comments + clear edit points (recommended for Phase 1)**
Keep copy in HTML, but add clear comment blocks so it's obvious exactly what to edit:

```html
<!-- === HERO SECTION === -->
<section id="hero">
  <!-- HERO HEADLINE — edit below -->
  <h1>AI transformation for leaders who are done waiting.</h1>
  <!-- HERO SUBHEAD — edit below -->
  <p>You know AI matters...</p>
</section>
```

**Option B: Content as JSON + templating**
Pull copy into a separate `content.json` file and use a small amount of JavaScript to inject it. Better separation, but more moving parts.

**Recommendation:** Option A for Phase 1. It’s pragmatic: you can find and edit any piece of copy in seconds without adding abstraction. If you find yourself editing constantly, refactor to Option B later.

---

## Summary

| Phase | Scope | Estimated time | Target |
|-------|-------|----------------|--------|
| Phase 1 | MVP — static page, all copy, interim CTA | 5-6 hours | Today |
| Phase 2 | Conversion — VSL, form, testimonials | 4-5 hours | Within 1 week |
| Phase 3 | Polish — animations, performance, SEO | 4-5 hours | Within 2-3 weeks |

**Total to fully polished site:** ~14-16 hours

**To get live today:** ~5-6 hours (Phase 1)

---

*Document created: February 2026*
*Ready for development*