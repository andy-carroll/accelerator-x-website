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

**Active track:** `rebuild/v2` — full visual + structural rebuild from design handoff
- Build plan: `docs/design_handoff_website_rebuild/README.md`
- Component specs: `docs/design_handoff_website_rebuild/design-system/DESIGN.md`
- Wireframes: `docs/design_handoff_website_rebuild/wireframes/`

**Last session:** 2026-05-17 — Wave D complete: ApplyForm built (3-section form, pure-CSS chip radios, consent checkbox with GDPR timestamp written to Airtable); `forms.js` + `lead-capture.js` updated for consent; Wave D gate passed (all 4 components verified at mobile/tablet/desktop); Phase 2 component library complete — Phase 3 Page Assembly is next

**Build:** ✅ passing | **Git:** ✅ `rebuild/v2` committed (unpushed) | **Deployed:** `main` still live and untouched
**Node:** ✅ v26.0.0 via `/opt/homebrew/bin/node` — use `export PATH="/opt/homebrew/bin:$PATH"` if npm isn't found in shell.

**Phase 2 Wave C status (complete):**
- ✅ All 13 content block components built and registered in design system
- ✅ All 13 CSS files linked in `_templates/design-system.html` and `_templates/homepage.html`
- ✅ 5 post-build quality fixes applied (see CHANGELOG)
- ✅ `assets/js/faq-init.js` extracted from component; linked in `_templates/homepage.html`
- ✅ `--surface-*-subtle` tint tokens added to `tokens.css`; `color-mix()` removed from all components
- ✅ `scripts/check.js` now recursively scans `_templates/` subdirectories
- ✅ `npm run build` + `npm run check` both passing
- ⚠️ `aria-current="page"` on nav active links — deferred (needs per-page variable mechanism)
- ⚠️ PostHog `data-posthog-*` attrs on DecisionTree CTA — live but unread until Phase 5 instrumentation

**Phase 2 Wave D status (complete ✅):**
- ✅ Wave C gate check passed (all 13 blocks verified at mobile/tablet/desktop)
- ✅ `QuizCTA` — dark navy promo block; 2-col ≥768px; pink CTA → `quiz.accelerator-x.ai`
- ✅ `ScarcityCard` — `--cohort` (pink) + `--open` (cyan) variants; 2-col ≥640px
- ✅ `CohortList` — table-style cohort instance list; 4-col ≥640px; `[hidden]` collapses when empty
- ✅ Post-build quality pass: `.ax-kicker--accent` added to tokens; `noreferrer` on external links; `role="region"` on ScarcityCard; dead `--open` CSS removed
- ✅ `ApplyForm` — 3-section form; pure-CSS chip radios; consent checkbox + GDPR timestamp → Airtable; hooks into `forms.js [data-lead-form]`; no new JS
- ✅ Wave D gate passed: all 4 components verified at mobile/tablet/desktop

**Known issues (rebuild track):**
- Figtree loaded via Google Fonts CDN (render-blocking) — self-hosting deferred to later
- `cohort.html` still uses v1 nav + `build-footer.js` marker pattern — will be replaced when cohort page is rebuilt in v2

**Known issues (main/live):**
- LinkedIn Post Inspector "No author found" — JSON-LD correct, likely cache. Low priority.
- Hero imagery still interim stills — production photos not yet swapped in

---

## Next (do in this order)

1. **Phase 3 — Page Assembly** ← start here
   → Wire Wave B + Wave C + Wave D components into full page templates
   → Start with homepage (`_templates/homepage.html`) — most component CSS already linked
   → Read `docs/design_handoff_website_rebuild/wireframes/` for page layout specs before assembling
   → **Before going live:** add `Consent Given` (checkbox) + `Consent Timestamp` (single line text) to Airtable prospects table — ApplyForm writes these fields on every submission

2. **Phase 4 — Content pipeline**
   → Migrate articles to Markdown frontmatter model

3. **Phase 5 — Analytics**
   → PostHog event instrumentation

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

**During session (continuous):**

- Update CHANGELOG immediately on component complete
- Update CLAUDE.md Wave status + "Last session" on gate/wave complete
- Update ROADMAP on any NOW-sprint milestone

**End (quick card) — agent initiates at any gate/wave/phase completion, no user prompt needed:**

1. **Pre-close audit first** — review all files touched this session; fix bugs, ARIA issues, dead code, missing docs; update CLAUDE.md + CHANGELOG + ROADMAP; write `.claude/session-notes.md`. Full checklist: `.claude/rules/session.md §Step 0`.
2. Run `npm run session-end:write:yes`
3. Confirm session log written to `.claude/sessions/`
4. Push only when policy and flags explicitly allow it

## Next Session Priorities

1. **Phase 3 — Page Assembly** — start with homepage. Read wireframes first (`docs/design_handoff_website_rebuild/wireframes/`), then assemble components into `_templates/homepage.html`.
2. **Airtable action (user)** — add `Consent Given` + `Consent Timestamp` fields to prospects table before ApplyForm goes live.
3. Phase 4 — Content pipeline (after homepage assembly)
