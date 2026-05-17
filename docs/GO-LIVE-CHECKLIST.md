# Go-Live Checklist — accelerator-x.ai v2

> **Purpose:** Forensic audit before switching `main` to the v2 rebuild.
> Work through every section. Nothing ships with an open `[ ]` in a Blocking row.
>
> **Maintained continuously** — any agent or session that introduces a placeholder, dummy value,
> unverified copy, or unresolved decision MUST add an entry here before closing.
> See `.claude/rules/session.md §Step 0` and `CLAUDE.md` for the enforcement rule.
>
> **Status:** `[ ]` Not done · `[-]` In progress · `[x]` Done · `[~]` Deferred/accepted risk
> **Blocking** = must be resolved before cutover.

---

## 0 · Prerequisite: Airtable fields

These must exist in the Airtable prospects table before ANY form submission goes live.

| Field | Type | Blocking? | Status |
|---|---|---|---|
| `Consent Given` | Checkbox | **Yes** | `[ ]` |
| `Consent Timestamp` | Single line text | **Yes** | `[ ]` |

---

## 1 · Content accuracy

### 1a — Founder bios (homepage + /about)

Both cards live in `_templates/homepage-about.html`. Every line must be verified by the named founder before launch.

**Toby Henry** — *all items below were inferred by an AI agent; Toby must approve each line*
- `[ ]` Job title: "Co-founder · Strategy & Consulting" — correct?
- `[ ]` Bio paragraph — accurate?
- `[ ]` Track record: "Capgemini · Senior Consulting Manager" — correct title/company?
- `[ ]` Track record: "NHS & public sector transformation" — accurate framing?
- `[ ]` Track record: "WPP · Data & technology strategy" — correct?
- `[ ]` Track record: "Two business builds + exits" — factually correct?
- `[ ]` LinkedIn URL: `https://www.linkedin.com/in/tobyhenry/` — correct handle?

**Andy Carroll** — *from FounderCard.html component; verify*
- `[ ]` Job title: "Co-founder · Product & AI" — correct?
- `[ ]` Bio paragraph — accurate?
- `[ ]` Track record: "Capital One · Head of AI Product" — correct title?
- `[ ]` Track record: "Pegasus Group · Product Lead" — correct?
- `[ ]` Track record: "Two startup exits" — accurate?
- `[ ]` Track record: "B.Eng Computer Science" — correct qualification?
- `[ ]` LinkedIn URL: `https://linkedin.com/in/andycarroll` — correct handle?

### 1b — LogoStrip ("Operators who built at")

Component: `_templates/components/LogoStrip.html`
Currently lists: Capgemini, WPP, Capital One, NHS, Pegasus Group

> Framed as founder pedigree (where we built), NOT a client logo strip.
> Premium Car Parks removed — it is a client, not a previous employer.

- `[ ]` Capgemini — confirm Toby worked here in a named capacity
- `[ ]` WPP — confirm which entity; accurate attribution?
- `[ ]` Capital One — confirm Andy's role (Head of AI Product per FounderCard)
- `[ ]` NHS — confirm which programme/organisation and that the framing is accurate
- `[ ]` Pegasus Group — confirm Andy's role here
- `[ ]` Agree final list with both founders before launch

### 1c — Client testimonials

**File:** `_templates/homepage-testimonials.html`

> All three current quotes are **placeholder/mockup copy** and must be replaced with real,
> approved client quotes before launch.

- `[ ]` **BLOCKING** Replace all three testimonial quotes with real client quotes
- `[ ]` Alastair Constance, CEO Mercury Global — get real quote and written approval to use
- `[ ]` Mark Bennett, CEO W R Bennett Group — real quote + approval (attribution updated: "Premium Car Parks" removed, now reads "CEO, W R Bennett Group" only — confirm this is correct)
- `[ ]` David Carry, Founder CEO Track Record Coaching — real quote + approval
  - Name confirmed: "David Carry" (not Carey)
- `[ ]` All job titles and company names confirmed with each client

### 1d — ProofRow quote

Component: `_templates/components/ProofRow.html`

> Quote ("More done in two weeks of Phase 0…") is currently **placeholder copy**.
> Case studies link is commented out until `/case-studies/` page is live — restore it then.

- `[ ]` **BLOCKING** Replace with a real, approved client quote before launch
- `[ ]` Confirm attribution format (anonymised "CEO, £60M healthcare group" or named)
- `[ ]` Restore `<a href="/case-studies/" ...>Read the case studies</a>` when `/case-studies/` is published

### 1e — Pricing and commercial copy

- `[ ]` JSON-LD in `index.html`: prices £4,000 (workshop) + £12,000 (8-week cycle) — current?
- `[ ]` Hero risk-note copy: now reads "Phase 0 from £5,000 · 2 weeks" — confirm pricing with founders before go-live
- `[ ]` Hero chip: "Now taking on new clients · Q3 2026" — confirm this is accurate at launch date
- `[ ]` Process timeline: "Phase 1 from £20,000" — confirm pricing with founders before go-live
- `[ ]` ApplyForm SLA: "Average response time: 2 business days" — accurate?
- `[ ]` CTABand: "Real reply within a week" — accurate SLA?
- `[ ]` Confirm no `priceRange` in JSON-LD remains the right decision (noted in CLAUDE.md)

### 1f — CTA destination / contact page decision

> **Resolved (2026-05-17):** `/contact/` page exists. CTABand routes to `/contact/`.

- `[x]` **Decision:** `/contact/` page created — CTABand `href` updated to `/contact/`
- `[x]` Sitemap updated — `/contact/` included at priority 0.8
- `[ ]` Add `/contact/` to nav (currently missing — nav was built before this page existed)

### 1h — Inner page content requiring founder review

Placeholder and unverified copy introduced in Phase 3 page assembly (2026-05-17).

**`/about/` — Origin story**
- `[ ]` **BLOCKING** Origin story (3 paragraphs) is AI-written placeholder — Andy/Toby to replace with accurate narrative before launch
- `[ ]` "Two operators. One partnership." heading — intentional?

**`/how-we-work/` — Section copy**
- `[ ]` Principles section (4 items: "Founder-led, always" / "All three, or none" / "We want you to outgrow us" / "Week one earns its keep") — confirm exact wording with founders
- `[ ]` Approach cards (4 cards: "Diagnose first" / "Embedded, not remote" / "Ship, don't strategise" / "Transfer capability") — confirm exact wording
- `[ ]` Engagement phases — Phase 0/1/2…n/Advisory descriptions — confirm details (esp. pricing/duration if any)
- `[ ]` Contrast table ("We never…" / "We always…") — confirm every item is accurate and intentional
- `[ ]` **Mark Bennett pull-quote** — quote attributed to Mark Bennett (CEO, W R Bennett Group) on `/how-we-work/` — confirm: (a) this is a real quote, not placeholder; (b) Mark has approved its use on the site; (c) attribution is correct

**`/contact/` — Contact details**
- `[ ]` Confirm `toby@accelerator-x.ai` is the correct public email for Toby
- `[ ]` Confirm `andy@accelerator-x.ai` is the correct public email for Andy
- `[ ]` LinkedIn URLs in contact cards match §1a above

**`/what-we-do/` — Offering detail links**
- `[ ]` `OfferingTable` and `DecisionTree` components link to offering detail pages (e.g. `/what-we-do/leadership-activation/`) that do not yet exist — all will 404 until detail pages are built or links are removed/redirected

### 1g — General copy review

- `[ ]` Hero headline and subhead — still the right positioning?
- `[ ]` Problem section copy — accurate framing?
- `[ ]` Three differentiator cards — still accurate and intentional?
- `[ ]` Process section copy — 3-step description — accurate?
- `[ ]` FitCheck "Right fit if / Probably not for you if" lists — accurate and intentional?
- `[ ]` Inline code comments across all templates and components — does reading each file give a future agent full clarity without hunting in separate docs? (see AI-RULES.md §2)

---

## 2 · Links

### 2a — Navigation

- `[ ]` All nav links resolve to built pages or valid anchors
- `[x]` "What we do" → `/what-we-do/` built ✅
- `[x]` "How we work" → `/how-we-work/` built ✅
- `[ ]` "Insights" → `/insights/` working?
- `[ ]` "Quiz" → `quiz.accelerator-x.ai` live?
- `[ ]` Logo → `/` correct?
- `[ ]` Nav CTA "Apply to work with us" → should resolve to `/contact/` (page now exists — confirm nav href is updated)
- `[ ]` `/contact/` — add to nav if not already present (nav was built before /contact/ existed — §1f)
- `[ ]` Mobile nav — all links work at 375px

### 2b — Footer links

- `[ ]` All footer nav links resolve to built pages
- `[ ]` LinkedIn company page URL correct
- `[ ]` Privacy policy → `/privacy.html` exists and is current
- `[ ]` Newsletter form in footer submits correctly

### 2c — CTAs throughout

- `[ ]` Hero "Apply to work with us" → `#apply` resolves on same page
- `[ ]` CTABand "Apply to work with us" → `/#apply` resolves from any inner page
- `[ ]` ProofRow case studies link commented out — restore when `/case-studies/` is live
- `[ ]` Andy's writing link → `/insights/` correct destination

### 2d — Legal / consent

- `[ ]` ApplyForm consent link → `/privacy.html` exists and is accurate
- `[ ]` Privacy policy mentions Airtable as data processor

---

## 3 · Forms end-to-end

Test each form with a real submission on the Netlify preview URL (not localhost).

### 3a — ApplyForm (`#apply-form`)

Target: `/.netlify/functions/lead-capture`

- `[ ]` Submits without JS errors
- `[ ]` Success state displays correctly
- `[ ]` Honeypot invisible; not submitted
- `[ ]` All required fields block submission if empty
- `[ ]` Consent checkbox required — cannot submit without it
- `[ ]` **Airtable:** record created with all fields including `Consent Given` + `Consent Timestamp`
- `[ ]` **Brevo:** contact added to list #9
- `[ ]` **Slack:** `#website-leads` notification fires
- `[ ]` **Email:** Brevo welcome automation triggers for new contact

### 3b — Newsletter subscribe (footer + inline)

Target: `/.netlify/functions/newsletter-subscribe`

- `[ ]` Submits without errors
- `[ ]` Success state displays
- `[ ]` **Brevo:** contact added to list #9
- `[ ]` **Email:** welcome automation triggers

---

## 4 · Email flows

- `[ ]` Welcome email subject line, content, sender name are correct
- `[ ]` Sender is `newsletter@mail.accelerator-x.ai` / Accelerator X (not Accelerator Solutions)
- `[ ]` Unsubscribe link works
- `[ ]` All Brevo automations on list #9 reviewed — confirm each is intentional

---

## 5 · Analytics & instrumentation (PostHog)

> Gold standard: every meaningful user action is tracked. No guessing after launch.

### 5a — Setup

- `[ ]` PostHog JS snippet loaded on all pages (via `assets/js/analytics.js`)
- `[ ]` Correct PostHog project key (production, not dev/test)
- `[ ]` Cookie consent / GDPR approach agreed and implemented if required
- `[ ]` Session replay enabled (or explicitly disabled with reason)
- `[ ]` No PII captured in event properties

### 5b — Page views

- `[ ]` Pageview fires on every page load
- `[ ]` Page title and URL captured correctly
- `[ ]` UTM parameters captured on landing

### 5c — Conversion events (critical path)

- `[ ]` `apply_form_start` — fires when user first interacts with ApplyForm
- `[ ]` `apply_form_submit` — fires on successful form submission (not just button click)
- `[ ]` `apply_form_error` — fires on validation failure with error type
- `[ ]` `newsletter_subscribe` — fires on newsletter form success
- `[ ]` `cta_click` — fires on any primary CTA button with `{label, location}` properties

### 5d — Engagement events

- `[ ]` `section_viewed` — fires when each major page section enters viewport (hero, proof, apply, etc.)
- `[ ]` `quiz_cta_click` — fires when user clicks through to `quiz.accelerator-x.ai`
- `[ ]` `nav_open` — fires on mobile hamburger open
- `[ ]` `outbound_link` — fires on any external link click with `{url, label}`

### 5e — Funnels and dashboards

- `[ ]` Conversion funnel built in PostHog: landing → apply form start → submission
- `[ ]` Core dashboard created: pageviews, conversion rate, top traffic sources
- `[ ]` Slack or email alert configured for first real lead submission

---

## 6 · SEO & AEO (gold standard)

> AEO (Answer Engine Optimisation): structured so AI systems (ChatGPT, Perplexity, Claude)
> can accurately answer questions about Accelerator X from this site.

### 6a — Technical SEO

- `[ ]` `<title>` correct and ≤60 chars on every page
- `[ ]` `meta description` accurate, unique, and ≤160 chars on every page
- `[ ]` `<h1>` — exactly one per page, contains primary keyword
- `[ ]` Heading hierarchy logical (h1 → h2 → h3, no skips)
- `[ ]` `canonical` URL set correctly on every page
- `[ ]` `robots.txt` — not blocking crawlers; correct disallow rules
- `[ ]` `sitemap.xml` generated, accurate, and submitted to Google Search Console
- `[ ]` `llms.txt` — content accurate and up to date (for AI crawlers)
- `[ ]` No broken internal links (run a crawl tool on Netlify preview)
- `[ ]` Page speed: Lighthouse ≥95 mobile / ≥98 desktop (target from ROADMAP)
- `[ ]` Core Web Vitals: LCP, CLS, INP all green

### 6b — On-page SEO

- `[ ]` Primary keyword in h1, first paragraph, and meta description on homepage
- `[ ]` Every image has a descriptive, keyword-relevant `alt` attribute (no generic "image" values)
- `[ ]` Internal linking: key pages link to each other where contextually relevant
- `[ ]` Anchor text for internal links is descriptive (not "click here")
- `[ ]` No keyword stuffing — copy reads naturally

### 6c — Structured data (JSON-LD)

- `[ ]` Organization schema: name, URL, logo, description, founders, sameAs (LinkedIn) — all accurate
- `[ ]` WebSite schema: correct
- `[ ]` ProfessionalService schema: serviceType, areaServed, pricing — all accurate and current
- `[ ]` WebPage schema on homepage — correct
- `[ ]` FAQPage schema added to FAQ sections (when live) — AI systems extract Q&A pairs directly
- `[ ]` BreadcrumbList schema on inner pages
- `[ ]` Person schema for each founder (if /about page warrants it)
- `[ ]` Validate all schemas at schema.org validator and Google Rich Results Test

### 6d — Open Graph / social

- `[ ]` `og:image` exists at the declared path — correct size (1200×630px)
- `[ ]` `og:image:alt` present and descriptive
- `[ ]` All OG tags accurate on every page
- `[ ]` Twitter card tags correct
- `[ ]` LinkedIn Post Inspector: no "No author found" errors (may need cache clear)

### 6e — AEO specific

- `[ ]` `llms.txt` at root — comprehensive, structured, accurate
- `[ ]` Key facts (who we are, what we do, pricing range, process) appear as clear prose in the body of the page — not only in metadata
- `[ ]` FAQ content uses natural question phrasing that matches how people ask AI assistants
- `[ ]` Company name, founders' names, and service names consistent across all pages and structured data
- `[ ]` `<!-- FOR AI SYSTEMS -->` comment in homepage HTML is accurate (currently in index.html `<head>`)

---

## 7 · Technical / build

- `[ ]` `npm run build` passes — zero errors or warnings
- `[ ]` `npm run check` — all 8 checks green
- `[ ]` No unsubstituted `{{tokens}}` in built HTML
- `[ ]` No `console.error` on page load (check browser dev tools)
- `[ ]` All images load — no 404s in network tab
- `[ ]` Hero image slideshow cycles correctly
- `[ ]` Nav sticky + blur effect works on scroll
- `[ ]` Mobile hamburger nav opens and closes
- `[ ]` No horizontal scroll at 375px
- `[ ]` Reduced-motion media query respected (animations disabled)
- `[ ]` **Dead v1 CSS removed from `assets/css/styles.css`** — ~200 lines of orphaned rules left over from v1 inline sections: `.hero-shell`, `.hero-copy-block`, `.hero-media`, `.diff-card`, `.process-card`, `.problem-headline`, `.testimonials-section`, `.testimonial-card`, `.testimonial-stars`, `.testimonial-quote`, `.testimonial-name`, `.testimonial-role`, and related modifier/state selectors. Deferred until v2 go-live to avoid touching the live branch; remove in the same PR as cutover.

---

## 8 · Responsive / visual QA

- `[ ]` 375px mobile: hero, nav, FitCheck, FounderCards, ApplyForm, all sections
- `[ ]` 768px tablet: two-column layouts correct
- `[ ]` 1280px desktop: full layout correct
- `[ ]` Dark sections legible (ProofRow, Testimonials, ApplySection, CTABand)
- `[ ]` Founder portrait images load and crop correctly at all sizes
- `[ ]` Form inputs usable on mobile (no zoom-on-focus issues)

---

## 9 · Pages still to build before cutover

| Page | Blocking cutover? | Status |
|---|---|---|
| `/what-we-do/` | **Yes** — nav link | `[x]` Built ✅ |
| `/how-we-work/` | **Yes** — nav link | `[x]` Built ✅ |
| `/about/` | **Yes** — nav link | `[x]` Built ✅ (origin story placeholder — see §1h) |
| `/contact/` | **Yes** — CTABand destination | `[x]` Built ✅ |
| `/privacy.html` | **Yes** — consent link | `[ ]` (may exist in v1) |
| `/case-studies/` | No — ProofRow link commented out | `[ ]` |

---

## 10 · Pre-cutover deployment

- `[ ]` Netlify preview deploy built from `rebuild/v2` — full walkthrough on preview URL
- `[ ]` All Netlify env vars set in production: Airtable API key, Brevo API key, Slack webhook
- `[ ]` `rebuild/v2` branch pushed to remote
- `[ ]` Old `main` tagged `v1-archive` before cutover
- `[ ]` Cutover plan agreed: swap Netlify production branch OR merge `rebuild/v2` → `main`
- `[ ]` Post-cutover: verify all forms fire (Netlify functions deploy with branch)
- `[ ]` Post-cutover: PostHog events flowing correctly

---

## 11 · Owner sign-off

Before cutover, both founders sign off:

- `[ ]` Andy — all Andy bio content accurate
- `[ ]` Toby — all Toby bio content accurate
- `[ ]` Both — real testimonials reviewed and approved for public use
- `[ ]` Both — pricing copy intentional
- `[ ]` Both — full site walkthrough on mobile and desktop
- `[ ]` Both — happy for site to be indexed and crawled on launch
