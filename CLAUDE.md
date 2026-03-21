# CLAUDE.md — Accelerator X Cockpit

> This is the single file an agent reads first. It must stay under one page.
> Full rules: `AI-RULES.md` | Full history: `.claude/sessions/` | Priorities: `ROADMAP.md`

---

## Project

**Site:** https://accelerator-x.ai — live, real visitors
**Stack:** Static HTML + Tailwind CDN + `npm run build` → Netlify (pre-built artefacts committed)
**Email:** Brevo list #9 | **Analytics:** PostHog | **Notifications:** Slack `#website-leads`

---

## Current State

**Last session:** 2026-03-21 — newsletter infra complete; Netlify Forms bypassed; Brevo end-to-end verified

**Build:** ✅ passing | **Git:** ✅ clean | **Deployed:** ✅ auto on push to `main`

**Known issues:**
- LinkedIn Post Inspector "No author found" — JSON-LD correct, likely cache. Low priority.
- Hero imagery still interim stills — production photos not yet swapped in

---

## Next (do in this order)

1. **Hero imagery** — swap interim stills for production photos + update alt text
   → `content/data/hero-media.config.json` + `npm run process:hero-images`

2. **Lighthouse targets** — ≥95 mobile / ≥98 desktop; capture reports to `docs/analytics/`

3. **Autonomous AI agent fleet** — design permission + capability framework
   → `docs/agent-fleet.md` (to be created)

---

## Decisions (never reverse without discussion)

- **Newsletter sending domain:** `mail.accelerator-x.ai` — authenticated; sender `newsletter@mail.accelerator-x.ai`
- **Newsletter forms:** bypass Netlify Forms → `/.netlify/functions/newsletter-subscribe` → Brevo API direct
- **Direct commits to `main`** — no PRs until a second collaborator (human or AI agent) joins
- **Brevo, not GoHighLevel** — email capture switched at launch
- **Pre-built artefacts committed** — no build command on Netlify, serves repo root as-is
- **Single opt-in** — no Brevo double opt-in confirmation email for now
- **No `priceRange` in JSON-LD** — deliberate; many clients won't pay listed rates

---

## Session protocols

Full procedures: `.claude/rules/session.md`

**Start (quick card):**
1. Read this file
2. `git log --oneline -3` + `git status --short`
3. Check Airtable for overdue deliverables
4. Post brief to user — wait for focus confirmation

**End (quick card):**
1. Update this file (State + Next)
2. Update `CHANGELOG.md` + `ROADMAP.md`
3. `npm run build` → commit → push
4. Write log to `.claude/sessions/YYYYMMDD-HHMMSS.md`
5. Post to Slack `#ax-operations` via `slack-ops` MCP
