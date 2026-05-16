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

**Last session:** 2026-05-16 — Phase 1 (Foundations) in progress on `rebuild/v2`; branch created, canonical design system tokens landed, build pipeline extended, design-system showcase scaffold in place

**Build:** ✅ passing | **Git:** ✅ `rebuild/v2` committed (Phase 1 done) | **Deployed:** `main` still live and untouched
**Node:** ✅ v26.0.0 via `/opt/homebrew/bin/node` — `npm install` already run. Use `export PATH="/opt/homebrew/bin:$PATH"` if npm isn't found in shell.

**Phase 1 status:**
- ✅ Branch `rebuild/v2` created from `main`
- ✅ `.session-protocol.json` updated (branch + path allowlist)
- ✅ `assets/css/tokens.css` — canonical design system v2.0 tokens
- ✅ `assets/brand/logos/` — SVG + PNG logo variants
- ✅ `assets/css/components/` — empty dir for per-component CSS
- ✅ `scripts/tailwind.input.css` — imports tokens.css
- ✅ `tailwind.config.js` — extended content glob + --ax-* theme tokens
- ✅ `scripts/build-design-system.js` — assembles design-system/index.html
- ✅ `scripts/build-components.js` — component registry + renderComponent() API
- ✅ `_templates/design-system.html` + section partials (stub placeholders for Phase 2)
- ✅ `package.json` — build:design-system added; build chain updated
- ⏳ `npm install` + `npm run build` — blocked on node install

**Known issues (rebuild track):**
- Node.js not installed; `brew install node && npm install` needed before first build
- Figtree loaded via Google Fonts CDN (render-blocking) — self-hosting deferred to later

**Known issues (main/live):**
- LinkedIn Post Inspector "No author found" — JSON-LD correct, likely cache. Low priority.
- Hero imagery still interim stills — production photos not yet swapped in

---

## Next (do in this order)

1. **Install node + verify Phase 1 build gate**
   → `brew install node && cd /path/to/repo && npm install && npm run build`
   → Verify `design-system/index.html` renders tokens correctly; legacy pages unchanged

2. **Phase 2 — Wave A Primitives** (TypeScale, Buttons, Chips, Form inputs)
   → `_templates/components/{TypeScale,Buttons,Chips,FormInputs}.html`
   → `assets/css/components/{Buttons,Chips,FormInputs}.css`
   → Register each in `_templates/design-system/primitives.html`
   → Gate: showcase Wave A at all 3 breakpoints before Wave B

3. **Phase 2 — Wave B Global chrome** (Nav, Footer, PageHero, CTABand)
   → Decide Footer/NewsletterCTA deduplication before starting Footer

4. **Phase 2 — Waves C + D** (Content blocks, Interactive)
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

1. `brew install node && npm install && npm run build` — Phase 1 verification gate
2. Start Phase 2 Wave A — Primitives (TypeScale, Buttons, Chips, FormInputs)
3. Decide Footer/NewsletterCTA deduplication strategy before Wave B
