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

## Tech stack (Phase 1 & Content Hub)

**Landing Page:** Static HTML + Tailwind CSS (CDN).
**Testimonials:** Authored as JSON and injected into `index.html` at build time (`content/data/testimonials.json` → `scripts/build-testimonials.js`).
**Content Hub (`/insights`):** Markdown + Custom Node.js Static Generator (`scripts/build-hub.js`).

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

### 3. Serve the site locally

```bash
npm run dev
```

This serves the repository locally (usually at `http://localhost:5000`), allowing you to view both the root `index.html` and the generated `/insights/` pages.

## Content Publishing Pipeline

The Content Hub is powered by a static Markdown-to-HTML pipeline. To publish or update content:

1.  **Add/Edit Markdown:** Create/modify a `.md` file in `content/articles/`.
2.  **Verify Frontmatter:** Ensure the YAML header contains the required fields:
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
3.  **Run Build:** Run `npm run build` to generate the HTML.
4.  **Content Types:** The system automatically handles icons and labels for different formats:
    - `Dispatch` (Default/Standard)
    - `Video` (Play icon)
    - `Podcast` (Mic icon)
    - `Webinar` (Camera icon)
    - `Case Study` (Assignment icon)
5.  **Interactive Filtering:** The `/insights` index automatically sorts by date and provides interactive filtering based on the `category` field.

## Deployment

Target domain:

- `accelerator-x.ai`

Recommended Phase 1 deployment:

- **Netlify** (no build command, publish from repo root)

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

## Working style

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
