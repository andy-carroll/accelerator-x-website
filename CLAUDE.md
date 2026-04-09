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

**Last session:** 2026-04-10 — homepage build architecture slice completed; dedicated homepage source introduced; quality gates passing

**Build:** ✅ passing | **Git:** ⚠️ homepage architecture changes ready to commit | **Deployed:** ✅ auto on push to `main`

**Known issues:**

- Homepage still uses downstream mutator scripts for footer, testimonials, and hero media; source-of-truth is now `_templates/homepage.html`, while `index.html` remains generated output.
- LinkedIn Post Inspector "No author found" — JSON-LD correct, likely cache. Low priority.
- Hero imagery still interim stills — production photos not yet swapped in

---

## Next (do in this order)

1. **Homepage testimonial markers** — replace brittle testimonial injection contract with explicit start/end markers only
   → `scripts/build-testimonials.js` + homepage template / generated output contract

2. **Hero imagery** — swap interim stills for production photos + update alt text
   → `content/data/hero-media.config.json` + `npm run process:hero-images`

3. **Lighthouse targets** — ≥95 mobile / ≥98 desktop; capture reports to `docs/analytics/`

4. **Autonomous AI agent fleet** — design permission + capability framework
   → `docs/agent-fleet.md` (to be created)

---

## Decisions (never reverse without discussion)

- **Newsletter sending domain:** `mail.accelerator-x.ai` — authenticated; sender `newsletter@mail.accelerator-x.ai`
- **Newsletter forms:** bypass Netlify Forms → `/.netlify/functions/newsletter-subscribe` → Brevo API direct
- **Repo is public** — no secrets in codebase; all credentials in Netlify env vars
- **GitHub branch protection** — classic branch protection on `main`; 3 required status checks: Build passes, Standards check passes, CHANGELOG updated
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
2. `npm run session-start` (or `npm run session-start:json` for machine output)
3. Review branch policy + repo state warnings
4. Post brief to user — wait for focus confirmation

**End (quick card):**

1. Choose mode: `npm run session-end` / `npm run session-end:dry-run` / `npm run session-end:write`
2. In write mode, pass prompt (or use `npm run session-end:write:yes` for controlled automation)
3. Let script enforce quality gate + scoped staging + commit policy
4. Confirm session log written to `.claude/sessions/`
5. Push only when policy and flags explicitly allow it

## Next Session Priorities

1. Harden homepage testimonial injection with explicit markers only
2. Re-run build/check and confirm homepage generation remains stable
3. Decide the next smallest extraction target after marker hardening
