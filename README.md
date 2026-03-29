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

### Sync shared agent skills

```bash
npm run skills:sync
```

This repo uses a profile pointer (`.agent-skills-profile.json`) to sync skills from a canonical
skills repo into `~/.claude/skills`.

### Session protocols (safe-by-default)

```bash
npm run session-start
npm run session-start:json
npm run session-end            # plan mode (no writes)
npm run session-end:dry-run    # explicit simulation (no writes)
npm run session-end:write      # write mode with confirmation prompt
npm run session-end:write:yes  # non-interactive write mode
npm run test:session-protocols # protocol utility regression checks
```

Protocol policy/config is stored in `.session-protocol.json` (branch allowlist,
quality gate commands, managed docs, and session-end push policy).

**Operating mode toggle (one edit):** set `operatingMode` in `.session-protocol.json`.

```json
"operatingMode": "solo"
```

- `solo`: low-friction defaults for a single maintainer.
- `team`: stricter guardrails (`strictMode=true`, `build+check` required, tighter staged-path scope).

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

Newsletter signups flow: direct JSON POST → `newsletter-subscribe` function → Brevo API (list #9)
+ Slack `#website-leads` notification. Netlify Forms bypassed — no 100/month limit.

Lead applications flow: Netlify Form → `submission-created` function → Slack `#website-leads`
+ Airtable CRM.

---

## Engineering philosophy

This repo is a working example of how Accelerator X approaches any technical build.

The instinct when adopting AI tooling is to attack the task — give the tool a prompt,
iterate on the output, ship it. That works until it doesn't: the codebase drifts,
the agent makes a confident mistake nobody catches, the system accrues debt faster
than it accrues value.

The alternative is to think first about the system that builds the thing, not the thing
itself. What are the failure modes? Where does quality degrade silently? What would a
new agent — or a new human — need to know to work here without a briefing?

Concretely, that means:

- **Standards enforced by automation, not memory** — `scripts/check.js` runs 8 checks
  on every commit. A violation is caught locally, not in production six months later.
- **Every decision recorded at the point of decision** — `CHANGELOG.md`, `AI-RULES.md`,
  session logs in `.claude/sessions/`. The codebase explains itself; no verbal handoff required.
- **Session hygiene as a first-class concern** — every session starts with a structured
  brief and ends with an atomic close. The cockpit (`CLAUDE.md`) is always current.
  A cold-start agent can be productive in under a minute.
- **Leverage over effort** — a pre-commit hook that catches a broken build takes 10 minutes
  to write and saves hours across every future session. That trade is always worth making.

This is the thought and care we bring to client engagements. The repo is the proof of concept.

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
| `docs/agent-skills-shared-ops.md` | Shared skills sync model across repos |
| `docs/notification-workflows-prd.md` | Netlify + Slack notification architecture |
| `docs/posthog-behavior-insights-prd.md` | Behaviour analytics rollout plan |
| `docs/PRD-hero-media-library.md` | Hero media library system |

<!-- Session 20260322-211525 logged -->

<!-- Session 20260322-234000 logged -->

<!-- Session 20260322-235352 logged -->

<!-- Session 20260329-180314 logged -->

<!-- SESSION_PROTOCOL:START -->
- Session ID: 20260329-200313
- Updated: 2026-03-29T19:03:15.303Z
- Mode: write
<!-- SESSION_PROTOCOL:END -->
