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
**DNS/hosting reference:** `docs/tech-architecture/dns-hosting.md` — registrar, nameservers, full zone, SSL, email, quiz, incident log.

---

## Current State

**Active track:** `rebuild/v2` — full visual + structural rebuild from design handoff.
- Build plan: `docs/design_handoff_website_rebuild/README.md` · design system: `…/design-system/DESIGN.md` · wireframes: `…/wireframes/`
- Built through Phase 2 Wave D + Phase 3 page assembly (4 inner pages live: `/what-we-do`, `/how-we-work`, `/about`, `/contact`). Component-level detail in `CHANGELOG.md` + `.claude/sessions/`.

**Last session:** 2026-06-14 — **Phase 5 (most of it): the site now derives from the Offer Canon, with a drift-guard to keep it that way** ([#57](https://github.com/andy-carroll/accelerator-x-website/issues/57)). Built a third build-time token type **`{{offering:KEY.field}}`** (`scripts/build-components.js`) that injects names/prices/durations from `content/data/offerings.json` (`*_gbp` → £-formatted; fail-fast). **Restored the Two Doors spine** (new `TwoDoors` component on home + `/what-we-do/`, incl. the load-bearing Door-1-vs-exec-team sentence + "start here, not pick one"). **Killed the contradictions:** deleted OfferingTable/OfferingCard/DecisionTree (the fabricated **"8-Week Transformation Cycle"**, stale prices, dead **Fractional Advisory**/`8-week-cycle` links) and **fixed fabricated homepage JSON-LD** (was asserting a non-existent workshop + "delivers 10x value"). **Reconciled all four offering pages** to Canon names/prices (1:1 Exec AI Fast Track Coaching 6wk/£10k; Leadership Team AI Activation base £15k+£2k/head; Open Cohort Bootcamp £3,500; Company Enablement £5k/£20k) — every price/name now a token; coaching pages carry guarantee + VAT; **6 real FAQs each** on the two coaching pages (+ FAQPage JSON-LD). **Re-elevated Talks & Events** (three formats, POA, inquiry-led; removed the retired events-calendar empty state). **Added Check #10** — offerings drift-guard (no hardcoded prices/dead offers on the offer surfaces; regression-tested). Then built the **`/faq/` hub** (14 cross-cutting Q&As from Canon §7; proof-gated answers in the honest "references on request" framing) + **FAQPage JSON-LD on every offer surface** (all 4 offering pages + `/faq/`), linked from the footer. **Phase 5 (#57) fully built — closed.** Then ran a **13-agent adversarial review sweep** of the Phase 5 surfaces (Canon-fidelity / truth / a11y / links / responsive, each finding independently verified) → 8 confirmed findings, **all fixed**. Notably it prompted a **guarantee clarification (Andy): "no value, no payment"** stated up front (no caveats) across all coaching/training/activation/enablement (not Talks) — Phase 0 decide-after-session-1; coaching 2 sessions + keep resources, cancel before the third; reconciled into `offer-canon.md` §5 + `offerings.json` + every guarantee touchpoint. 11 commits total, build + all 10 checks green, pushed to preview. **Deliberately not in Phase 5 (separate tracks):** PostHog (#38), forms E2E (#36), the funnel page price-tokenisation, founder sign-off on locked numbers (§11), and real measured client proof (#55).

**Build:** ✅ passing | **Git:** `rebuild/v2` clean + pushed | **Deployed:** `main` live (v1); v2 preview → https://rebuild-v2--accelerator-x.netlify.app

**Known issues (rebuild):** Figtree via Google Fonts CDN (render-blocking; self-host later) · `cohort.html` still on v1 nav + `build-footer.js` marker pattern (replace when cohort page rebuilt).
**Known issues (live):** ~~HTTPS down~~ — resolved: was a Sky Broadband Shield false-positive, site healthy globally (see DNS doc incident log) · LinkedIn Post Inspector "No author found" (likely cache, low priority) · hero imagery still interim stills.

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

1. **Human walkthrough of the Netlify branch preview (desktop + 375px).** Phase 5 is fully built (#57 closed) and a 13-agent adversarial review sweep ran — all 8 findings fixed, guarantee reframed to "no value, no payment". Remaining gap: no *human* eyes-on the rendered offering pages / `/faq/` / Talks (the local preview can't serve subpaths). Walk https://rebuild-v2--accelerator-x.netlify.app (which resolves directory indexes) on desktop + 375px, focusing on the Two Doors, the offering-card sidebars (new guarantee/pricing lines), the phase-arc on mobile, and `/faq/`.

2. **Proof + measurement (Andy, near-term — the #1 ship-blocker).** Capture 2–3 real, *measured* client outcomes and weave proof into the offer narrative + offering pages; surface "references available on request" (all early clients are willing — #22/#55). Until this lands, the offer asserts results it can't show. *(Note: the two ⚠️ proof-gated FAQ answers now publish in the honest "we won't invent clients / references on request" framing — upgrade them with real named outcomes when this lands.)*

3. **Carried (verify/finish):** manual v2 preview walkthrough on https://rebuild-v2--accelerator-x.netlify.app (desktop + 375px) + **GNG-1** Airtable consent test (§3a); **enable Hostinger auto-renewal** for `accelerator-x.ai` (was OFF — risk); spot-confirm `accelerator-x.ai` + `quiz` over HTTPS on a non-Sky connection.

> **Operating-model thread (Andy, 2026-06-11):** this repo is now the **reference implementation** for a cross-repo operating model — proactive batch planning → swarm-ready tickets → parallel agentic execution, eventually extracted to portable skills. Umbrella: [#50](https://github.com/andy-carroll/accelerator-x-website/issues/50) (children: #51 batch-health check, #52 plan-batch ceremony, #53 CI on `rebuild/*`, #54 swarm pilot). Not in the v2 Cutover milestone — infrastructure, not a ship blocker. The v2 ship remains priority one; protocol decisions here should be designed for export.
