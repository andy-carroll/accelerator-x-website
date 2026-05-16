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

**Last session:** 2026-05-16 — Phase 2 Wave A complete; TypeScale, Buttons, Chips, FormInputs primitives live in design system showcase; all breakpoints verified

**Build:** ✅ passing | **Git:** ✅ `rebuild/v2` committed (Wave A done, 3 commits unpushed) | **Deployed:** `main` still live and untouched
**Node:** ✅ v26.0.0 via `/opt/homebrew/bin/node` — use `export PATH="/opt/homebrew/bin:$PATH"` if npm isn't found in shell.

**Phase 2 Wave A status:**
- ✅ `scripts/build-design-system.js` — now calls `resolveComponentTokens` (enables `{{component:X}}` in section partials)
- ✅ `_templates/components/TypeScale.html` — display sizes, kicker, h1–h5, lead, body, caption; dark surface demo
- ✅ `_templates/components/Buttons.html` — all 5 variants, 3 sizes, disabled states, on-dark surface
- ✅ `_templates/components/Chips.html` — default/selected/kicker, filter group, status pills
- ✅ `_templates/components/FormInputs.html` — text/select/textarea, all states, full real-world form example
- ✅ `assets/css/components/Buttons.css` — loading, icon, full-width extensions
- ✅ `assets/css/components/Chips.css` — colour variants, removable
- ✅ `assets/css/components/FormInputs.css` — input groups, custom checkbox/radio
- ✅ `_templates/design-system/primitives.html` — wired to 4 component tokens
- ✅ Verified at mobile (375px), tablet (768px), desktop (1280px)

**Known issues (rebuild track):**
- Figtree loaded via Google Fonts CDN (render-blocking) — self-hosting deferred to later

**Known issues (main/live):**
- LinkedIn Post Inspector "No author found" — JSON-LD correct, likely cache. Low priority.
- Hero imagery still interim stills — production photos not yet swapped in

---

## Next (do in this order)

1. **Phase 2 — Wave B Global Chrome** (Nav, Footer, PageHero, CTABand)
   → Decide Footer/NewsletterCTA deduplication before starting Footer
   → `_templates/components/{Nav,Footer,PageHero,CTABand}.html`
   → `assets/css/components/{Nav,Footer,PageHero,CTABand}.css`
   → Register each in `_templates/design-system/chrome.html`
   → Gate: showcase Wave B at all 3 breakpoints before Wave C

2. **Phase 2 — Waves C + D** (Content blocks, Interactive)
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

1. Decide Footer/NewsletterCTA deduplication strategy before Wave B starts
2. Start Phase 2 Wave B — Global Chrome (Nav, Footer, PageHero, CTABand)
3. Gate: showcase Wave B at all 3 breakpoints before Wave C
