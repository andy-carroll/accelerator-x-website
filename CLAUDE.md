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

**Active track:** `rebuild/v2` — full visual + structural rebuild from design handoff (`docs/design_handoff_website_rebuild/`)

**Last session:** 2026-05-16 — session protocol wrap completed; quality gates passing; handoff ready

**Build:** ✅ passing | **Git:** ✅ `rebuild/v2` committed (unpushed) | **Deployed:** `main` still live and untouched
**Node:** ✅ v26.0.0 via `/opt/homebrew/bin/node` — use `export PATH="/opt/homebrew/bin:$PATH"` if npm isn't found in shell.

**Phase 2 Wave B + architecture fixes status:**
- ✅ `{{component:Nav}}` and `{{component:Footer}}` resolve in homepage, article, and insights-index builds
- ✅ `build-homepage.js` + `build-hub.js` call `resolveComponentTokens` — component tokens work in all page builds
- ✅ `build-footer.js` scoped to `cohort.html` only (v1 static page not yet on v2)
- ✅ `id="main-content"` on `<main>` in all three page templates — skip link has a target
- ✅ v2 CSS (`tokens.css`, `Buttons.css`, `Nav.css`, `Footer.css`) linked in all page templates
- ✅ Footer tablet layout fixed — newsletter col spans full width at 640px–1023px
- ✅ All Wave B components (Nav, Footer, NewsletterCTA, PageHero, CTABand) in design system
- ⚠️ `aria-current="page"` on nav active links — deferred (needs per-page variable mechanism)

**Known issues (rebuild track):**
- Figtree loaded via Google Fonts CDN (render-blocking) — self-hosting deferred to later
- `cohort.html` still uses v1 nav + `build-footer.js` marker pattern — will be replaced when cohort page is rebuilt in v2

**Known issues (main/live):**
- LinkedIn Post Inspector "No author found" — JSON-LD correct, likely cache. Low priority.
- Hero imagery still interim stills — production photos not yet swapped in

---

## Next (do in this order)

1. **Phase 2 — Wave C Content Blocks**
   → LogoStrip, ProofRow, PlanLayers, OfferingTable, OfferingCard, DeliverablesGrid
   → FitCheck, FAQList, CaseTile, ArticleTile, EventCard, FounderCard, DecisionTree
   → Register each in `_templates/design-system/` content-blocks section
   → Gate: all blocks verified at 3 breakpoints before Wave D

2. **Phase 2 — Wave D Interactive**
   → Follow component sequencing in plan

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

1. Phase 2 Wave C — Content Blocks (LogoStrip first, then follow sequencing in plan)
2. Gate: verify all Wave C blocks at mobile/tablet/desktop before Wave D
