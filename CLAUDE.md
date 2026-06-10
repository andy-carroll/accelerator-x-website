# CLAUDE.md — Accelerator X Cockpit

> The single file an agent reads first. Keep it under one page — detail lives in the linked files.
> Rules: `AI-RULES.md` · Session protocol: `.claude/rules/session.md` · History: `.claude/sessions/`
> **Go-live tracker:** GitHub ["v2 Cutover" milestone](https://github.com/andy-carroll/accelerator-x-website/milestone/1) · line-item detail: `docs/GO-LIVE-CHECKLIST.md`

---

## Project

**Site:** https://accelerator-x.ai — live, real visitors
**Stack:** Static HTML + Tailwind CDN + `npm run build` → Netlify (pre-built artefacts committed)
**Email:** Brevo list #9 | **Analytics:** PostHog | **Notifications:** Slack `#website-leads`
**Node:** v26.0.0 via `/opt/homebrew/bin/node` — run `export PATH="/opt/homebrew/bin:$PATH"` if npm isn't found.

---

## Current State

**Active track:** `rebuild/v2` — full visual + structural rebuild from design handoff.
- Build plan: `docs/design_handoff_website_rebuild/README.md` · design system: `…/design-system/DESIGN.md` · wireframes: `…/wireframes/`
- Built through Phase 2 Wave D + Phase 3 page assembly (4 inner pages live: `/what-we-do`, `/how-we-work`, `/about`, `/contact`). Component-level detail in `CHANGELOG.md` + `.claude/sessions/`.

**Last session:** 2026-06-10 — Closed #32 (Airtable consent fields + GNG-1 test case). Ran the **truth audit ([#48](https://github.com/andy-carroll/accelerator-x-website/issues/48))**: removed fabricated founder pedigree (real orgs now — Andy: BCG Digital Ventures/Allica Bank/Equals Money Group · Toby: Alpha/Capco/10x Banking), corrected Mark Bennett's attribution, anonymised the £16k story, neutralised the invented "£45M retail group" case — all shipped to preview. Kept founder-confirmed testimonials. Also consolidated FitCheck CSS duplication ([#49](https://github.com/andy-carroll/accelerator-x-website/issues/49)). #48 + #49 remain open (founder-input + component-slot mechanism).

**Build:** ✅ passing | **Git:** `rebuild/v2` clean + pushed | **Deployed:** `main` live (v1); v2 preview → https://rebuild-v2--accelerator-x.netlify.app (verified serving v2)

**Known issues (rebuild):** Figtree via Google Fonts CDN (render-blocking; self-host later) · `cohort.html` still on v1 nav + `build-footer.js` marker pattern (replace when cohort page rebuilt).
**Known issues (live):** LinkedIn Post Inspector "No author found" (likely cache, low priority) · hero imagery still interim stills.

---

## The cutover

v2 ships as **one full cutover, not piecemeal** — it is a coherent system (shared nav/footer/tokens). Switch `main` to v2 once blockers clear; tag old `main` as `v1-archive` first.

- **Tracker:** the ["v2 Cutover" milestone](https://github.com/andy-carroll/accelerator-x-website/milestone/1) is the source of truth for work; `docs/GO-LIVE-CHECKLIST.md` holds the forensic line-item detail each issue links back to.
- **Two work-streams:** `founder-input` (Andy/Toby supply or decide) vs `build` (engineering). `blocking` marks the critical path.
- **The critical path is founder content, not engineering** — 9 of 14 blocking issues are `founder-input`. Keystone: **[#26 offering portfolio decision](https://github.com/andy-carroll/accelerator-x-website/issues/26)** — `/what-we-do/` shows two components describing different product line-ups; much detail-page work depends on resolving it first.

---

## Next (do in this order)

1. **Drive founder-input** — get [#26](https://github.com/andy-carroll/accelerator-x-website/issues/26) decided; gather testimonials, proof quotes, FAQ answers, pricing sign-off, origin story. These gate the cutover.
2. **Run build issues in parallel** — Airtable consent fields (#32), nav overhaul (#33), forms E2E on preview (#36), PostHog analytics (#38). No founder dependency.
3. **Sequence + ship slices** — agree slice order; keep the branch preview current every session.

---

## Decisions (never reverse without discussion)

- **`rebuild/v2` ships as a full cutover, not piecemeal** — switch `main` to v2 once milestone blockers clear. No long-lived unshipped branches: every session ends in a deploy (preview at minimum) or an explicitly tracked carry. Work tracked as GitHub Issues under "v2 Cutover".
- **Newsletter sending domain:** `mail.accelerator-x.ai` — authenticated; sender `newsletter@mail.accelerator-x.ai`
- **Newsletter forms:** bypass Netlify Forms → `/.netlify/functions/newsletter-subscribe` → Brevo API direct
- **Repo is public** — no secrets in codebase; all credentials in Netlify env vars
- **GitHub branch protection** — classic protection on `main`; 3 required status checks: Build passes, Standards check passes, CHANGELOG updated
- **Direct commits to `main`** — no PRs until a second collaborator (human or AI agent) joins
- **Brevo, not GoHighLevel** — email capture switched at launch
- **Pre-built artefacts committed** — no build command on Netlify, serves repo root as-is
- **Single opt-in** — no Brevo double opt-in confirmation email for now
- **No `priceRange` in JSON-LD** — deliberate; many clients won't pay listed rates

---

## Session protocols

> **Every session runs one turn of the SDLC loop:** scope → measurable outcome → build → test → deploy → monitor.
> Full procedure: `.claude/rules/session.md`. Template: `.claude/session-notes-template.md`.

**Start:** `npm run session-start` first — no exceptions. Read the full output, post the brief, confirm focus before any task work.

**During (continuous):** update `CHANGELOG.md` on each unit complete; update this file's "Last session" + state on any milestone; add any placeholder/dummy/unverified content to `docs/GO-LIVE-CHECKLIST.md` and a GitHub issue the moment it's introduced — never at close.

**End — agent initiates at any natural completion, no prompt needed:**

1. **Pre-close audit** — review every file touched; fix bugs, ARIA, dead code; update CLAUDE.md + CHANGELOG + ROADMAP; sweep `docs/GO-LIVE-CHECKLIST.md`. Full checklist: `.claude/rules/session.md §Step 0`.
2. **Close-gate** — all work this session is **tracked** (GitHub issue updated/closed) and **shipped** (pushed to preview), or **explicitly carried** into session-notes + Next Session Priorities with a reason.
3. **Write `.claude/session-notes.md`** — from the template; `session-end:write` blocks if `## Summary` is missing/placeholder.
4. Run `npm run session-end:dry-run`, then `npm run session-end:write:yes`.
5. Confirm the session log is in `.claude/sessions/`. Push only when policy + flags allow.

## Next Session Priorities

> **New north star (Andy, 2026-06-08): ship a *working, honest* v2 soon — doesn't need to be perfect, but zero clangers.** The #1 unacceptable clanger is **fabricated content** — invented past clients, suppliers, testimonials, logos, or stats. Truth-audit gates the ship.

1. **Close out the truth audit — founder-input on [#48](https://github.com/andy-carroll/accelerator-x-website/issues/48).** The fabrication *removal* is done + shipped. Now gate items need Andy/Toby: **(BLOCKING)** confirm the three homepage testimonial *quote wordings* are genuinely each client's + approved (an earlier session flagged them as AI-drafted mockup); supply founder **titles** at the real orgs; confirm/adjust bio **tenure** claims ("twenty/seventeen years", "built and sold businesses"); decide the company-enablement proof + CaseTile (real case vs remove). Then a wider sweep of remaining pages for any fabrication not yet caught.
2. **Define "minimum shippable v2"** — agree the smallest set of pages/blockers that lets `main` cut over honestly (perfect not required). Re-triage the milestone against that bar; decide what's must-fix vs defer-after-launch.
3. **Build slice with no founder dependency** — nav overhaul [#33](https://github.com/andy-carroll/accelerator-x-website/issues/33) (add `/contact/`, fix CTA hrefs, aria-current). Pairs naturally with the component-slot mechanism in [#49](https://github.com/andy-carroll/accelerator-x-website/issues/49) — both blocked on the same per-page-variable limitation. Complete end-to-end, ship to preview.
4. **Test GNG-1** when a preview deploy is convenient — submit ApplyForm, confirm consent fields land in Airtable (see GO-LIVE-CHECKLIST §3a).
