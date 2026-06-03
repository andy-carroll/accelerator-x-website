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

**Last session:** 2026-06-03 — Hardened session protocol: session-end now enforces real summary before write; session-start surfaces full priorities + recent session context; session-notes template created; CLAUDE.md session-start prominence updated.

**Build:** ✅ passing | **Git:** ✅ `rebuild/v2` clean | **Deployed:** `main` live; `rebuild/v2` branch deploy active on Netlify — push to see latest preview
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

1. **Phase 3 — Page Assembly ✅ Complete**
   → All 4 inner pages live (`/what-we-do`, `/how-we-work`, `/about`, `/contact`)
   → **Before going live:** add `Consent Given` (checkbox) + `Consent Timestamp` (single line text) to Airtable prospects table — ApplyForm writes these fields on every submission
   → **Before going live:** replace about page origin story placeholder (see `GO-LIVE-CHECKLIST.md §1h`)

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

> **Every new session begins with `npm run session-start` — no exceptions.**
> This is the first action in every conversation, before any task work. It reads CLAUDE.md,
> checks git state, surfaces the last few session decisions, and outputs the full priority list.
> A session that skips this step starts blind.

Full procedures: `.claude/rules/session.md`
Session notes template: `.claude/session-notes-template.md`

**Start (quick card):**

1. `npm run session-start` — read the full output before anything else
2. Post brief to user — confirm or redirect focus before starting work
3. Do not begin task work until focus is confirmed

**During session (continuous):**

- Update CHANGELOG immediately on component complete
- Update CLAUDE.md Wave status + "Last session" on gate/wave complete
- Update ROADMAP on any NOW-sprint milestone
- Any placeholder content, dummy data, unverified copy, or open decisions identified → add to `docs/GO-LIVE-CHECKLIST.md` immediately, not at session end

**End (quick card) — agent initiates at any gate/wave/phase completion, no user prompt needed:**

1. **Pre-close audit first** — review all files touched this session; fix bugs, ARIA issues, dead code, missing docs; update CLAUDE.md + CHANGELOG + ROADMAP; sweep `docs/GO-LIVE-CHECKLIST.md` for new items. Full checklist: `.claude/rules/session.md §Step 0`.
2. **Write `.claude/session-notes.md`** — copy from `.claude/session-notes-template.md`; fill in all sections honestly. Check `.claude/sessions/` for recent logs and account for carry-forwards. `session-end:write` will block if `## Summary` is missing or a placeholder.
3. Run `npm run session-end:dry-run` to verify what will happen, then `npm run session-end:write:yes` to commit
4. Confirm session log written to `.claude/sessions/`
5. Push only when policy and flags explicitly allow it

**Go-live checklist:** `docs/GO-LIVE-CHECKLIST.md` — forensic audit before switching to v2. Add to it continuously; never let a placeholder, dummy value, or unresolved decision exist in the codebase without a corresponding entry.

## Next Session Priorities

1. **CLAUDE.md full revamp** — update Current State (13 pages built, all placeholder-heavy), kill stale wave/phase docs, write phased go-live plan (Wave 1: homepage + 4 core pages). Needs: brand voice answer from Andy + Wave 1 scope confirmation. Do this before any other task.
2. **Brand voice + Wave 1 scope** — establish brand voice guidelines (even rough notes); confirm Wave 1 page list; then begin systematic content sweep + UX audit using `/design:ux-audit` and `/design:ux-copy`.
3. **Funnel page go-live unblocking** — 13 items in GO-LIVE-CHECKLIST §12 still fully open. Most urgent: Mark's quote + approval, H1 headline, "4 seats remaining" ownership.
