# Accelerator X Website

Public marketing site for Accelerator X — live at **https://accelerator-x.ai**

---

## What this is

A static HTML site with a lightweight Node.js build pipeline. No frameworks. No client-side
rendering. Every page is pre-built HTML served directly from the repo root via Netlify.

### Phase history

- **Phase 1 (MVP):** Static landing page + design system — shipped Feb 2026
- **Phase 2 (Launch):** Content Hub, hero media library, PostHog analytics, Brevo email
  capture, Netlify Functions, SEO/JSON-LD — shipped Mar 2026
- **Phase 3 (Growth):** Lighthouse optimisation, Brevo automation sequences, autonomous
  AI agent fleet, events page, workshop sales path — _in progress_

---

## Tech stack

| Layer | What |
|---|---|
| Landing page | Static HTML + Tailwind CSS (CDN) + `styles.css` design tokens |
| Content Hub | Markdown → static HTML via `scripts/build-hub.js` |
| Testimonials | JSON → HTML via `scripts/build-testimonials.js` |
| Hero media | Config-driven cycling via `scripts/build-hero-media.js` |
| Email capture | Netlify Forms → `netlify/functions/submission-created.js` → Brevo list #9 |
| Analytics | PostHog (`assets/js/analytics.js`) — landing page + all Hub pages |
| Deploy notifications | Netlify → n8n → Slack `#ax-operations` |
| Hosting | Netlify — auto-deploys from `main`; pre-built artefacts committed |

**Why no framework:** Zero framework = instantaneous loads, perfect Lighthouse baseline,
no build complexity on Netlify, and full HTML control for SEO/AEO. Deliberate choice —
see decision record below.

---

## Repo layout

```
index.html                  Landing page
styles.css                  Design tokens + custom styles
assets/                     Images, icons, JS (analytics.js)
_templates/                 HTML templates (index.html, article.html)
content/
  articles/                 Raw Markdown source for Content Hub
  data/                     JSON config (testimonials, hero, authors)
  hero-source/              Raw workshop photos (not committed — .gitignore)
insights/                   Generated static HTML for Content Hub
netlify/functions/          Netlify serverless functions
scripts/                    Build scripts
docs/                       Specs, PRDs, design system, go-live checklist
```

---

## Local development

### Install dependencies (first time)

```bash
npm install
```

### Build everything

```bash
npm run build
```

Generates: article HTML, hub index, sitemap.xml, testimonials, hero markup.

### Serve locally

```bash
npm run dev
# → http://localhost:5000
```

### Process new hero images

```bash
npm run process:hero-images
# Then:
npm run build
```

---

## Content publishing

1. Create/edit a `.md` file in `content/articles/`
2. Ensure frontmatter has required fields (see below)
3. Run `npm run build`
4. Commit and push

### Required frontmatter

```yaml
---
title: "Article Title"
date: "YYYY-MM-DD"
author: "Andy Carroll"          # must match key in content/data/authors.json
category: "AI Strategy"         # AI Strategy | The Implementation Gap | Capability Building
type: "Dispatch"                 # Dispatch | Video | Podcast | Webinar | Case Study
excerpt: "≥100 chars for OG"    # build warns if shorter
slug: "article-slug"
bluf: "Bottom Line Up Front — 1-2 sentences"
lead_magnet_cta: "Optional CTA"
next_article_url: "/insights/articles/next-slug.html"
next_article_title: "Next Article Title"
---
```

---

## Deployment

- **Platform:** Netlify
- **Trigger:** push to `main` → auto-deploy (~30s)
- **Build command on Netlify:** none — pre-built artefacts are committed
- **Publish directory:** `.` (repo root)
- **Custom domain:** `accelerator-x.ai`

Canonical URLs for `/insights` pages are built from:
- `SITE_URL` env var (local override)
- `URL` (Netlify production) or `DEPLOY_PRIME_URL` (deploy previews)
- Fallback: `https://accelerator-x.ai`

---

## Analytics (PostHog)

Configured in `assets/js/analytics.js` — included on all pages via templates.

- API host: `https://eu.i.posthog.com`
- Behaviour analytics operating model: `docs/posthog-behavior-insights-prd.md`

---

## Email capture (Brevo)

Newsletter signups flow: Netlify Form → `submission-created` function → Brevo API (list #9)
+ Slack `#website-leads` notification.

Lead applications flow: Netlify Form → `submission-created` function → Slack `#website-leads`
+ Airtable CRM.

---

## AI instruction architecture

### Decision

Single-source, tool-agnostic instruction system:

- **Canonical rules:** `AI-RULES.md` ← always wins
- **Thin adapters:** `AGENTS.md` (Codex/OpenAI agents), `CLAUDE.md` (Claude Code)

### Operating rule

Update `AI-RULES.md` first when workflow or policy changes. Adapters stay minimal
and referential. If an adapter conflicts with `AI-RULES.md`, `AI-RULES.md` wins.

---

## Source-of-truth documents

| Document | Purpose |
|---|---|
| `ROADMAP.md` | Strategic priorities — Now / Next / Later |
| `docs/go-live-checklist.md` | Colour-coded launch checklist (live site) |
| `CHANGELOG.md` | Version history — updated on every meaningful change |
| `AI-RULES.md` | Agent operating rules + Definition of Done |
| `docs/landing-page-spec.md` | Landing page phased delivery spec |
| `docs/content-hub-plan.md` | Content Hub architecture |
| `docs/design-system.md` | Typography, colour tokens, image standards |
| `docs/notification-workflows-prd.md` | Netlify + Slack notification architecture |
| `docs/posthog-behavior-insights-prd.md` | Behaviour analytics rollout plan |
| `docs/PRD-hero-media-library.md` | Hero media library system |
