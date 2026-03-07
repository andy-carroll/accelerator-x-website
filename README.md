# Accelerator X Website

This repo contains the public landing page for Accelerator X.

The goal is to ship a clean, credible Phase 1 MVP fast, then iterate into conversion (GoHighLevel form + VSL) and polish.

## What this is

- **Phase 1 (MVP):** Static landing page (no build step)
- **Phase 2 (Conversion):** GoHighLevel embed form + VSL + real testimonials
- **Phase 3 (Polish):** animations, analytics, A/B testing, SEO refinements

The source-of-truth specs/plans are:

- `ROADMAP.md` (The active priorities to maintain strategic momentum)
- `docs/landing-page-spec.md` (Landing page phased delivery)
- `docs/content-hub-plan.md` (Content Hub Delivery)
- `docs/PRD-hero-media-library.md` (Hero media library system)
- `docs/notification-workflows-prd.md` (Netlify + Airtable notification architecture and delivery logic)
- `docs/posthog-behavior-insights-prd.md` (Behavior analytics rollout plan for movement, linger, and abandonment insights)

## Tech stack (Phase 1 & Content Hub)

**Landing Page:** Static HTML + Tailwind CSS (CDN).
**Testimonials:** Authored as JSON and injected into `index.html` at build time (`content/data/testimonials.json` → `scripts/build-testimonials.js`).
**Content Hub (`/insights`):** Markdown + Custom Node.js Static Generator (`scripts/build-hub.js`).
**Product analytics:** PostHog via shared loader (`assets/js/analytics.js`) included on landing + Insights templates.
**Deploy notifications:** Netlify → n8n workflow (`Netlify Deploy → Slack (Prod)`) → Slack channel, posting commit-aware deploy summaries (what changed + why it matters + links).
**Business-building notifications:** Airtable → n8n workflow (`Airtable Action List → Slack (Business Building)`) → Slack channel, scoped to AX Build & Ops base (`app6OluErWOw8UZVI`).

Notification implementation details and future extension path are documented in `docs/notification-workflows-prd.md`.

Why:

- Fastest path to production (ship today)
- Minimal moving parts (zero-framework static generation)
- Content is perfectly structured for SEO/AEO
- Integrates seamlessly with AI Slack Publisher agents (via GitHub)

### Frameworks (Astro / Next.js / React)

We have intentionally **disqualified** client-side rendering frameworks and heavy SSG frameworks (Next.js) to keep the pipeline ultra-lean and brutally fast. All HTML is served completely statically for instantaneous load times and perfect Lighthouse scores.

## Repo layout

- `index.html` — single-page landing site
- `styles.css` — design tokens + any small custom styles
- `assets/` — images/icons
- `docs/` — specification, copy, notes
- `content/articles/` — Raw Markdown files for the Content Hub
- `_templates/` — HTML templates injected by the generator (`index.html`, `article.html`)
- `insights/` — Generated static HTML output for the Content Hub
- `scripts/` — Custom build scripts (e.g., Markdown to HTML parser)

## Local development

### 1. Install dependencies (First time only)

```bash
npm install
```

### 2. Build the Content Hub

If you have added or edited Markdown files in `content/articles/`, rebuild the static HTML:

```bash
npm run build
```

Canonical URLs for `/insights` pages are generated at build time from a base site URL:

- **Override (local/dev):** `SITE_URL` (e.g. `SITE_URL="https://accelerator-x.netlify.app" npm run build`)
- **Netlify (automatic):** `URL` (production) or `DEPLOY_PRIME_URL` (deploy previews)
- **Fallback:** `https://accelerator-x.ai`

### 3. Serve the site locally

```bash
npm run dev
```

This serves the repository locally (usually at `http://localhost:5000`), allowing you to view both the root `index.html` and the generated `/insights/` pages.

## Analytics (PostHog)

PostHog is configured with the official web snippet in:

- `assets/js/analytics.js`

The loader is included in:

- `index.html` (landing page)
- `_templates/index.html` (Insights hub)
- `_templates/article.html` (Insights articles)

Current project settings:

- API key: configured directly in `assets/js/analytics.js`
- API host: `https://eu.i.posthog.com`
- Defaults: `2026-01-30`

To change projects/environments later, update key + host in `assets/js/analytics.js` once and all pages inherit it.

Behavior analytics operating model (sampling, staged loading, and insight cadence) is documented in `docs/posthog-behavior-insights-prd.md`.

## Hero Media Library

The homepage hero supports a **config-driven image library** that can gently cycle through curated stills. This system is designed for:

- Drop-in workshop/client photos
- Automatic responsive image processing
- Performance-safe lazy loading
- No-JS static fallback

### Workflow

1. **Add source photos** to:
   - `content/hero-source/`

2. **Optional sidecar metadata** (per image):
   - `content/hero-source/my-workshop-shot.json`

   ```json
   {
     "alt": "Running an AI workshop with a client leadership team",
     "active": true
   }
   ```

3. **Process images**:

   ```bash
   npm run process:hero-images
   ```

   Outputs:
   - Responsive variants to `assets/hero/generated/`
   - Generated library metadata to `content/data/hero-media.generated.json`

4. **Build the site**:

   ```bash
   npm run build
   ```

   Homepage hero is rendered automatically from:
   - `content/data/hero-media.config.json`
   - Generated library (or manual fallback)

### Performance

- First hero image loads eagerly
- Secondary slides load lazily on demand
- Reduced motion support
- Max 5 active slides (configurable via `maxSlides`)

### Commands

- `npm run build:hero-media` — render hero markup from config/library
- `npm run process:hero-images` — process source photos into responsive assets
- `npm run build` — includes hero media build by default

## Content Publishing Pipeline

The Content Hub is powered by a static Markdown-to-HTML pipeline. To publish or update content:

1. **Add/Edit Markdown:** Create/modify a `.md` file in `content/articles/`.
2. **Verify Frontmatter:** Ensure the YAML header contains the required fields:

```yaml
    ---
    title: "Article Title"
    date: "YYYY-MM-DD"
    author: "Toby Henry"
    category: "AI Strategy" # AI Strategy, The Implementation Gap, or Capability Building
    type: "Dispatch" # Dispatch, Video, Podcast, Webinar, or Case Study
    excerpt: "Short SEO summary"
    slug: "article-slug"
    bluf: "Bottom Line Up Front - 1-2 sentence summary"
    lead_magnet_cta: "Optional CTA text for the nurture trap"
    next_article_url: "/insights/articles/next-slug.html"
    next_article_title: "Next Article Title"
    ---
    ```

3. **Run Build:** Run `npm run build` to generate the HTML.
4. **Content Types:** The system automatically handles icons and labels for different formats:

- `Dispatch` (Default/Standard)
- `Video` (Play icon)
- `Podcast` (Mic icon)
- `Webinar` (Camera icon)
- `Case Study` (Assignment icon)

5. **Interactive Filtering:** The `/insights` index automatically sorts by date and provides interactive filtering based on the `category` field.

## Deployment

Target domain:

- `accelerator-x.ai`

Recommended Phase 1 deployment:

- **Netlify** (no build command, publish from repo root)

Note: Netlify sets `URL` / `DEPLOY_PRIME_URL` automatically, so canonical URLs will match the active Netlify domain until the custom domain (`accelerator-x.ai`) is attached.

Vercel is also fine:

- import project
- framework preset: “Other”
- output: static

## GoHighLevel (Phase 2)

We will build the “bot under the hood” in GoHighLevel.

On the website side, Phase 2 will:

- create the application form in GoHighLevel
- embed the form into this page (iframe or JS embed)
- style it to match the site (likely custom CSS)

## Session End Automation

The repository now includes a helper script to run the mandatory Session‑End protocol without posting to Slack.

- **Script:** `scripts/session-end.js`
- **NPM shortcut:** `npm run session-end`

Running the command will:
1. Create a session log under `.claude/sessions/`.
2. Ensure `CLAUDE.md` contains an up‑to‑date **Next Session Priorities** block.
3. Commit and push the changes.
4. Run the quality gate (`npm run build`).
5. Append a comment to `ROADMAP.md`, `README.md`, `CHANGELOG.md`, and `AI-RULES.md` noting the session timestamp.
6. Echo reminders to manually update those docs if further edits are required.

> **Note:** The Slack notification step has been intentionally omitted; you can add it back later if needed.


We build section-by-section, banking value and committing regularly.

If you’re working through the plan, the intended commit cadence is:

- scaffold
- tokens/base
- header
- hero
- …and so on

## AI instruction architecture (decision record)

### Decision

Use a single-source, tool-agnostic instruction system:

- Canonical rules: `AI-RULES.md`
- Thin adapters: `AGENTS.md` and `CLAUDE.md`

### Why this decision was made

- We use multiple AI coding tools and want one place to maintain operating rules.
- Duplicating instructions across tool-specific files creates drift and ambiguity.
- Thin adapters keep compatibility while preserving a single source of truth.

### Operating rule

- Update `AI-RULES.md` first when workflow/policy changes.
- Keep `AGENTS.md` and `CLAUDE.md` minimal and referential.
- If an adapter conflicts with `AI-RULES.md`, `AI-RULES.md` wins.

### Related files

- `AI-RULES.md`
- `AGENTS.md`
- `CLAUDE.md`
