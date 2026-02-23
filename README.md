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

## Tech stack (Phase 1)

**Default choice:** Static HTML + Tailwind CSS (CDN).

Why:

- Fastest path to production (ship today)
- Minimal moving parts (no Node build, no framework lock-in)
- Easy to hand off and edit
- Compatible with embedding GoHighLevel forms (Phase 2)

### Frameworks (Astro / Next.js / React)

We can adopt Astro later if/when it becomes valuable (e.g. blog, content collections, nicer DX, componentisation).

For Phase 1, Next.js/React are **overkill** unless we need:

- routing
- server-side functionality
- heavy interactivity

### Alpine.js / HTMX

We’ll only add these if a concrete requirement appears (e.g. modal behaviour, sticky CTA state, simple interactive FAQ).

## Repo layout

- `index.html` — single-page site
- `styles.css` — design tokens + any small custom styles
- `assets/` — images/icons
- `docs/` — specification, copy, notes

## Local development

This is a static site. The simplest dev loop is:

1. Open `index.html` directly in a browser

Or, run a tiny static server (recommended so relative paths behave consistently):

```bash
python3 -m http.server 8080
```

Then visit:

- http://localhost:8080

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
