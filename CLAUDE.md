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

**Last session:** 2026-06-13 — **Closed the truth audit ([#48](https://github.com/andy-carroll/accelerator-x-website/issues/48))** with founder rulings live from Andy: all three homepage testimonial wordings confirmed clients' own + approved; bios rewritten (Andy: 18 yrs product manager/leader · Toby: two decades across tier-one consultancies/startups/scale-ups; "built and sold businesses" dropped); orgs-only track records approved; placeholder/fabricated proof quotes replaced with a real founder-supplied quote (Charlotte Steedman, CEO, Conductor) on ProofRow + cohort pages; paraphrased Mark Bennett pull-quote on /how-we-work made verbatim; placeholder proof sections removed from the 3 offering pages — real content tracked in [#55](https://github.com/andy-carroll/accelerator-x-website/issues/55) (founder-input, high priority). Zero unverified quotes or claims left on v2. **Also:** nav IA approved (What we do · How we work · About · Insights · Quiz → CTA; About was orphaned) and [#33](https://github.com/andy-carroll/accelerator-x-website/issues/33) rewritten to the swarm-ready standard — aria-current moved behind the per-page variable mechanism now owned by #49 — **then shipped #33**: About added to nav (desktop + drawer) across all v2 pages, verified at 375px + desktop.

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

1. **Manual test of the preview as-is (Andy, 2026-06-13 — start here).** Full human walkthrough of https://rebuild-v2--accelerator-x.netlify.app on desktop + mobile: new nav (About link, drawer at 375px), rewritten bios, Charlotte Steedman quote on ProofRow + cohort pages, removed proof sections, /how-we-work pull-quote. While in the browser: run **GNG-1** (submit ApplyForm, confirm consent fields land in Airtable — GO-LIVE-CHECKLIST §3a) and confirm `quiz.accelerator-x.ai` loads over HTTPS (§2a — unverifiable from build sandbox).

2. **Define "minimum shippable v2"** — first run of the plan-batch ceremony ([#52](https://github.com/andy-carroll/accelerator-x-website/issues/52)): agree the smallest set of pages/blockers that lets `main` cut over honestly (truth audit closed; #26 offering portfolio is the keystone decision), re-triage the milestone against that bar, and write the next 2–3 sessions of tickets to the swarm-ready standard with an independence pass (#33's three failure modes are the checklist: stale bullets, hidden decisions, undesigned dependencies).

3. **Proof content ([#55](https://github.com/andy-carroll/accelerator-x-website/issues/55)) — founder-input, crucial + high priority:** real client quotes for the three offering-page proof sections, CaseTile case-study data, written approvals on file (incl. Charlotte Steedman / Conductor). Build side: #49 per-page variable mechanism (unblocks `aria-current` + FitCheck componentisation).

> **Operating-model thread (Andy, 2026-06-11):** this repo is now the **reference implementation** for a cross-repo operating model — proactive batch planning → swarm-ready tickets → parallel agentic execution, eventually extracted to portable skills. Umbrella: [#50](https://github.com/andy-carroll/accelerator-x-website/issues/50) (children: #51 batch-health check, #52 plan-batch ceremony, #53 CI on `rebuild/*`, #54 swarm pilot). Not in the v2 Cutover milestone — infrastructure, not a ship blocker. The v2 ship remains priority one; protocol decisions here should be designed for export.
