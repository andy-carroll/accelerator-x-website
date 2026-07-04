# CLAUDE.md — Accelerator X Cockpit

> The single file an agent reads first. Keep it under one page — detail lives in the linked files.
> Standards (enforced): `.claude/rules/standards.md` · Session protocol: `.claude/rules/session.md` · History: `.claude/sessions/`
> **Go-live tracker:** GitHub ["v2 Cutover" milestone](https://github.com/andy-carroll/accelerator-x-website/milestone/1) · line-item detail: `docs/GO-LIVE-CHECKLIST.md`

---

## Project

**Site:** https://accelerator-x.ai — live, real visitors
**Stack:** Static HTML + Tailwind CDN + `npm run build` → Netlify (pre-built artefacts committed)
**Email:** Brevo list #9 | **Analytics:** PostHog | **Notifications:** Slack `#website-leads`
**Node:** v26.0.0 via `/opt/homebrew/bin/node` — run `export PATH="/opt/homebrew/bin:$PATH"` if npm isn't found.
**DNS/hosting reference:** `docs/tech-architecture/dns-hosting.md` — registrar, nameservers, full zone, SSL, email, quiz, incident log.

---

## Current State

**Active track:** `rebuild/v2` — full visual + structural rebuild from design handoff.
- Build plan: `docs/design_handoff_website_rebuild/README.md` · design system: `…/design-system/DESIGN.md` · wireframes: `…/wireframes/`
- Built through Phase 2 Wave D + Phase 3 page assembly (4 inner pages live: `/what-we-do`, `/how-we-work`, `/about`, `/contact`). Component-level detail in `CHANGELOG.md` + `.claude/sessions/`.

**Last session:** 2026-07-04 — Two parts. (1) Closed B7/B8 gates (verified PASS 2026-06-27 but never formally closed); ran a full B1–B6 functional-half QA sweep (all pages, desktop+375px, all pass) and corrected CLAUDE.md's stale "critical path is founder content" narrative — #26 and all content sub-issues are closed, only the founder honesty-gate content walk remains before B10. (2) Ran a three-agent architecture review (scored 7.0/10, rescored ~8.0–8.2 post-fix — full scorecard + what's left to reach 8.5-9 in `docs/tech-architecture/architecture-review-2026-07-04.md`) and executed the P0/P1 fix batch autonomously (#78, closed): CSP+HSTS added; a cache-tier bug fixed **twice** (first attempt used unsupported extglob header syntax that matched nothing — caught via live header verification, corrected to rely on Netlify's own safe default); dead `/quiz/aireadiness` placeholder redirect removed; both money-path functions hardened (payload/JSON guards, Slack-escaping, and — the standout fix — distinct Slack alerts on GNG-1/Brevo write failure, closing the exact silent-failure class that caused the 2026-06-27 incident); 16 `node:test` cases added + wired into CI; article-build tokens made fail-fast; nav focus-restore (WCAG 2.4.3); CSS bundled from 24 stylesheets to 1 (verified via a 14-sample computed-style diff, zero changes). Both functions E2E-tested live against real Airtable/Brevo/Slack; one Brevo test contact left for Andy to remove (flagged in go-live checklist). 8 commits for the hardening batch (11 total this session) pushed to `rebuild/v2`, build+check+tests green throughout.

**Earlier (2026-06-27):** Set up + documented full autonomous agent access to the stack (Netlify CLI+MCP user-scoped, PostHog MCP, Vercel MCP, Airtable MCP, GitHub) → `docs/tech-architecture/integrations-and-access.md`. Cleared B9 (PostHog conversion instrumentation, cookieless, ingestion confirmed in prod).

**Earlier (2026-06-23):** Walked Door 1 (B2/#67) and Door 2 (B3/#68) on the preview, fixing snags; re-architected the About page IA (B4/#69); repriced Leadership Team AI Activation to £14k/≤8 across data, pages, hub card, prose canon.

**Earlier (2026-06-14):** Phase 5 ([#57](https://github.com/andy-carroll/accelerator-x-website/issues/57), closed) — site now derives offer names/prices from the Offer Canon via `{{offering:KEY.field}}` tokens, with a drift-guard (Check #10); Two Doors spine restored; fabricated content removed; `/faq/` hub + FAQPage JSON-LD; newsletter signup consolidated to one component; "no value, no payment" guarantee reconciled. Full detail: `CHANGELOG.md` + `.claude/sessions/`.

**Build:** ✅ passing | **Git:** working branch clean + pushed | **Deployed:** `main` live (v1); v2 preview → https://rebuild-v2--accelerator-x.netlify.app
<!-- Branch/deploy facts (working branch, production branch, preview URL) are single-sourced in `.session-protocol.json`. The literal names above are this session's snapshot only — at cutover, edit the config + this line. -->

**Known issues (rebuild):** Figtree via Google Fonts CDN (render-blocking; self-host later) · `cohort.html` still on v1 nav + `build-footer.js` marker pattern (replace when cohort page rebuilt).
**Known issues (live):** ~~HTTPS down~~ — resolved: was a Sky Broadband Shield false-positive, site healthy globally (see DNS doc incident log) · LinkedIn Post Inspector "No author found" (likely cache, low priority) · hero imagery still interim stills.

---

## The cutover

v2 ships as **one full cutover, not piecemeal** — it is a coherent system (shared nav/footer/tokens). Switch `main` to v2 once blockers clear; tag old `main` as `v1-archive` first.

- **Tracker:** the ["v2 Cutover" milestone](https://github.com/andy-carroll/accelerator-x-website/milestone/1) is the source of truth for work; `docs/GO-LIVE-CHECKLIST.md` holds the forensic line-item detail each issue links back to.
- **Two work-streams:** `founder-input` (Andy/Toby supply or decide) vs `build` (engineering). `blocking` marks the critical path.
- **The founder-content critical path is largely cleared (2026-07-03).** The old keystone (#26 offering portfolio) and the whole raft of content sub-issues (#18–#28, #61, #65, #66) are all **closed** — testimonials, proof, FAQ, pricing, origin story, bios, pedigree resolved. What remains is **not more content gathering** but Andy/Toby's holistic **"Ready for production" sign-off walk of each B-ticket** (B1–B6). The only still-open `blocking`-labelled issue is #30 (cohort funnel), which is itself a **deferred separate surface** (see Deferred list) — its `blocking` label contradicts the plan and should be dropped.

---

## Next (do in this order)

1. **Founder sign-off walk of B1–B6 — content only; functional halves all PASS (2026-07-03).** Engineering has walked every B-ticket page (desktop + 375px): one h1, no token leaks, valid JSON-LD, all internal links 200, no console errors, no image 404s, no 375px overflow, mobile nav works. Per-ticket functional-PASS notes on #76/#67/#68/#69/#70/#71; consolidated sweep on #77. **All that remains before the flip is Andy/Toby's holistic honesty-gate "Ready for production" walk of the content** on each page — the functional half is done.
2. **B10 (#75) — the flip** — once B1–B6 sign off: tag old `main` as `v1-archive`, prod env vars confirmed, swap `main` → v2. Gates B7/B8/B9 are all closed.
3. **Everything else is `post-launch`** — SEO/AEO (#40, #43), proof upgrade (#55), FitCheck componentise (#49), privacy/case-studies (#46), dead CSS (#44), cohort surface (#30, #64). Do not let these block the flip.

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
6. **Offer** (optional, human-in-the-loop) to post a short **exec summary** (Shipped / Why it matters / Next + preview link) to Slack `#ax-business-building` — confirm before posting. Detail: `.claude/rules/session.md §Exec summary to Slack`.

## Next Session Priorities

> **North star (Andy, 2026-06-08): ship a *working, honest* v2 soon — zero clangers.** Fabricated content is the #1 unacceptable clanger.
> **Mandate (Andy, 2026-06-16): get v2 LIVE — even if imperfect. Ship over polish.** Work the [🚀 v2 Launch Board (#77)](https://github.com/andy-carroll/accelerator-x-website/issues/77) — the single ship checklist.

**MVP = honest + functional + reachable.** Three hard blockers: (1) nothing fabricated; (2) money path works (forms submit, lead capture → Airtable, consent GNG-1 lands, newsletter); (3) nothing dead-ends (every button/CTA/link resolves). Plus the flip (privacy live, prod env vars, tag v1, swap branch).

**Status as of 2026-07-04: all engineering gates are closed.** B7/B8/B9 closed. B1–B6 functional halves all verified PASS (per-ticket notes on #76/#67/#68/#69/#70/#71, sweep on #77). A separate architecture-review hardening batch (#78) also shipped and closed — CSP/HSTS, cache-header fix, money-path hardening (new GNG-1/Brevo failure alerts), unit tests, CSS bundling. No open `blocking`-labelled issue remains in the milestone.

**The 10 batch tickets (under "v2 Cutover" milestone, `launch-batch` label):**
- **B1** [#76](https://github.com/andy-carroll/accelerator-x-website/issues/76) Homepage · **B2** [#67](https://github.com/andy-carroll/accelerator-x-website/issues/67) Door 1 · **B3** [#68](https://github.com/andy-carroll/accelerator-x-website/issues/68) Door 2 · **B4** [#69](https://github.com/andy-carroll/accelerator-x-website/issues/69) How We Work + About · **B5** [#70](https://github.com/andy-carroll/accelerator-x-website/issues/70) Contact + FAQ + Talks · **B6** [#71](https://github.com/andy-carroll/accelerator-x-website/issues/71) Global furniture — **all six: functional half PASS, content half awaiting Andy/Toby**
- Gates (all closed): **B7** [#72](https://github.com/andy-carroll/accelerator-x-website/issues/72) · **B8** [#73](https://github.com/andy-carroll/accelerator-x-website/issues/73) · **B9** [#74](https://github.com/andy-carroll/accelerator-x-website/issues/74) · **B10** [#75](https://github.com/andy-carroll/accelerator-x-website/issues/75) — the flip, still open, waiting on B1–B6 content sign-off

**Deferred — ships WITHOUT (`post-launch` label):** named client proof (#55) · deep SEO/AEO (#40, #43) · /case-studies/ (#46) · dead v1 CSS + hub transition (#44) · FitCheck componentise (#49) · Door 2 follow-ups (#64) · cohort funnel (#30, separate surface) · marker-injection consolidation + atomic build writes (#79) · CHANGELOG rotation (#80).

**Start here (next session):** there is no more engineering-side batch work queued — the only remaining step to B10 is **Andy/Toby's content-honesty walk of B1–B6** (not an engineering task). If picking up engineering work anyway, the two deferred hardening follow-ups (#79, #80) or any `post-launch` item are fair game, but none block the flip.

**Admin still open:** confirm Hostinger auto-renewal ON; spot-confirm HTTPS on a non-Sky connection; remove the `hardening-test-delete-me@accelerator-x.ai` test contact from Brevo list #9 (flagged in `docs/GO-LIVE-CHECKLIST.md`).

> **Operating-model thread (Andy, 2026-06-11):** this repo is now the **reference implementation** for a cross-repo operating model — proactive batch planning → swarm-ready tickets → parallel agentic execution, eventually extracted to portable skills. Umbrella: [#50](https://github.com/andy-carroll/accelerator-x-website/issues/50) (children: #51 batch-health check, #52 plan-batch ceremony, #53 CI on `rebuild/*`, #54 swarm pilot). Not in the v2 Cutover milestone — infrastructure, not a ship blocker. The v2 ship remains priority one; protocol decisions here should be designed for export.
