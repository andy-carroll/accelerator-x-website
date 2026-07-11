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

**Last session:** 2026-07-11 — **B3 (#68) and B4 (#69) content-honesty walks closed — four of six B-tickets now done (B1–B4); only B5 + B6 remain before B10.** Walked Door 2 (coaching hub + 3 offering pages) and How We Work + About with Andy. Biggest catch was on the cohort page: **"Cohort 04" was an overclaim** (next paid intake is really C3 — C0 was a free pilot, C1 done, C2 mid-flight), so the public sequence number was dropped entirely (also future-proofs against AX's diversifying cohort structures, which Andy confirmed are coming); the hardcoded "12 Aug 2026" became a "Late July / Aug 2026" target window (exact date TBC — a logged go-live task, not a blocker); and "6 of 12 places" was softened to "Limited places" (unmaintained scarcity count, same failure mode as B1's retired hero chip). Proof scan across all four Door 2 pages came back clean — no fabrication; the one live quote (Charlotte Steedman) is real, flagged only for eventual swap to a genuine cohort-participant quote (#55). `senior-leader-acceleration`'s "dedicated founder for six weeks" was **confirmed a keeper** by Andy (the 1:1 product genuinely is personal founder time — a true, durable differentiator, not the false blanket claim retired elsewhere). Em-dash sweep + FAQ JSON-LD/on-page sync done across all six pages (18 Q&A pairs verified matching). B4 surfaced that How We Work still frames the engagement around the company/Phase path only — coaching is nav-reachable but not signposted in-page; extending it is deliberately deferred as a careful post-launch fast-follow ([#86](https://github.com/andy-carroll/accelerator-x-website/issues/86), supersedes closed #63). Independent fresh-eyes review of the cumulative diff: approve-with-nits, 0 blocking, one comma-splice nit fixed inline. **New cohort structures parked** for post-launch (#30). Full detail: `CHANGELOG.md` + `.claude/sessions/`.

**Earlier (2026-07-09):** **B1 (#76) and B2 (#67) founder content-honesty walks closed — the first two of the six B-tickets gating B10.** Andy walked homepage + Door 1/Company Enablement content live in-session: bios, LogoStrip order, testimonials, ProofRow quote, hero copy all confirmed. Three real content decisions came out of it, not just typos — (1) the hero chip's unfalsifiable date-stamped scarcity claim ("Now taking on new clients · Q3 2026") replaced with an honest category label ("AI Enablement for Ambitious Leaders"); (2) "Founder-led, always" / "no associates, ever" retired site-wide as false (Andy: may hire juniors) and unscalable, reframed around **senior ownership and accountability, not headcount** — juniors framed as a genuine speed benefit, not something to hide; (3) the ApplyForm simplified — dropped a free-text "about your business" section (redundant with auto-research) and replaced "what does your business offer" with an optional problem field + a required service-fit chip group tied to the real offerings. The `/about/` "Our story" section was also rewritten for voice (Andy: reads "obviously-AI," too many em-dashes) with the message and length preserved, and both founder bios there strengthened with real track-record orgs the page had been missing. **This session's own close caught its own gap:** an independent fresh-eyes review of the cumulative diff found the senior-ownership reframe had only partially landed — `/faq/`, `leadership-cohort`, `leadership-activation`, and `leadership-ai-coaching` still carried the old blanket claim, live and contradicting the homepage. Fixed all four before closing (one instance, `senior-leader-acceleration`'s "dedicated founder" framing, deliberately left as a narrower, still-true product claim — flagged for Andy). Full detail: `CHANGELOG.md` + `.claude/sessions/`.

**Earlier (2026-07-06, pm):** **#82 closed: protocol reconciliation decided (layered keep) + fresh-eyes review gate shipped.** Verified the continuity fixes in anger first: the fresh brief surfaced full multi-section notes for three past sessions — the truncation fix works, retroactively too. Decided retire-vs-keep as **layered keep**, not the retire-the-scripts recommendation on record: the portable `ax-skill-ops` skills carry the cross-repo protocol *practice*; the native `session-start.js`/`session-end.js` stay as this repo's **deterministic enforcement layer** (branch policy, quality gates, staged-path allowlist, summary + review evidence — hard blocks an LLM-followed skill can't guarantee), per #50's own guardrail "repos hold parameters, skills hold practice". Ported the independent review gate as an **evidence check**: `session-end:write` now blocks unless `.claude/session-notes.md` records the review outcome under `## Review` (notes parsing moved to `session-protocol-utils.js`, 3 new test groups, template updated; a real `$`-in-multiline regex bug caught by the new tests). Handoff writing single-sourced to `session-end:write` — a skill-driven close must invoke the npm scripts, never hand-write a note. Layering documented in `.claude/rules/session.md` preamble + the config block below; #50's stale extraction line reconciled.

**Earlier (2026-07-06, am):** Session-protocol continuity fixed: portable-skill config block added (skills couldn't find this repo's handoff notes at all); the native brief's h2-collision truncation fixed both ends (`session-end.js` demotes embedded headings on write, `session-start.js` captures full sections, old logs included — 600 → 4,726 chars on the 2026-07-04 log); priorities-parsing placeholder bug fixed earlier (`a12fc70`). Preserved the 2026-07-04 architecture scorecard as `docs/tech-architecture/architecture-review-2026-07-04.md`; opened + scoped #82. Detail: `.claude/sessions/` + #82.

**Earlier (2026-07-04):** Two parts. (1) Closed B7/B8 gates (verified PASS 2026-06-27 but never formally closed); ran a full B1–B6 functional-half QA sweep (all pages, desktop+375px, all pass) and corrected CLAUDE.md's stale "critical path is founder content" narrative — #26 and all content sub-issues are closed, only the founder honesty-gate content walk remains before B10. (2) Ran a three-agent architecture review (scored 7.0/10, rescored ~8.0–8.2 post-fix — full scorecard + what's left to reach 8.5-9 in `docs/tech-architecture/architecture-review-2026-07-04.md`) and executed the P0/P1 fix batch autonomously (#78, closed): CSP+HSTS added; a cache-tier bug fixed **twice** (first attempt used unsupported extglob header syntax that matched nothing — caught via live header verification, corrected to rely on Netlify's own safe default); dead `/quiz/aireadiness` placeholder redirect removed; both money-path functions hardened (payload/JSON guards, Slack-escaping, and — the standout fix — distinct Slack alerts on GNG-1/Brevo write failure, closing the exact silent-failure class that caused the 2026-06-27 incident); 16 `node:test` cases added + wired into CI; article-build tokens made fail-fast; nav focus-restore (WCAG 2.4.3); CSS bundled from 24 stylesheets to 1 (verified via a 14-sample computed-style diff, zero changes). Both functions E2E-tested live against real Airtable/Brevo/Slack; one Brevo test contact left for Andy to remove (flagged in go-live checklist). 8 commits for the hardening batch (11 total this session) pushed to `rebuild/v2`, build+check+tests green throughout.

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
2. **Independent fresh-eyes review** — `/code-review` (or a fresh-context subagent, never a self-review) on the session's **cumulative diff**; fix blocking findings now (then re-run gates), raise non-blocking ones as issues; record the outcome for step 4. Detail: `.claude/rules/session.md §Step 1`.
3. **Close-gate** — all work this session is **tracked** (GitHub issue updated/closed) and **shipped** (pushed to preview), or **explicitly carried** into session-notes + Next Session Priorities with a reason.
4. **Write `.claude/session-notes.md`** — from the template; `session-end:write` blocks if `## Summary` **or `## Review`** is missing/placeholder.
5. Run `npm run session-end:dry-run`, then `npm run session-end:write:yes`.
6. Confirm the session log is in `.claude/sessions/`. Push only when policy + flags allow.
7. **Offer** (optional, human-in-the-loop) to post a short **exec summary** (Shipped / Why it matters / Next + preview link) to Slack `#ax-business-building` — confirm before posting. Detail: `.claude/rules/session.md §Exec summary to Slack`.

## Next Session Priorities

> **North star (Andy, 2026-06-08): ship a *working, honest* v2 soon — zero clangers.** Fabricated content is the #1 unacceptable clanger.
> **Mandate (Andy, 2026-06-16): get v2 LIVE — even if imperfect. Ship over polish.** Work the [🚀 v2 Launch Board (#77)](https://github.com/andy-carroll/accelerator-x-website/issues/77) — the single ship checklist.

**MVP = honest + functional + reachable.** Three hard blockers: (1) nothing fabricated; (2) money path works (forms submit, lead capture → Airtable, consent GNG-1 lands, newsletter); (3) nothing dead-ends (every button/CTA/link resolves). Plus the flip (privacy live, prod env vars, tag v1, swap branch).

**Status as of 2026-07-11: engineering gates all closed; content walk 4 of 6 done.** B7/B8/B9 closed. **B1 (#76), B2 (#67), B3 (#68) and B4 (#69) content-honesty walks are now closed.** Only **B5 (#70)** and **B6 (#71)** remain — functional halves verified PASS, content halves await the same live walk-through with Andy. A separate architecture-review hardening batch (#78) also shipped and closed — CSP/HSTS, cache-header fix, money-path hardening (new GNG-1/Brevo failure alerts), unit tests, CSS bundling. No open `blocking`-labelled issue remains in the milestone.

**The 10 batch tickets (under "v2 Cutover" milestone, `launch-batch` label):**
- **B1** [#76](https://github.com/andy-carroll/accelerator-x-website/issues/76) Homepage — **closed 2026-07-09** · **B2** [#67](https://github.com/andy-carroll/accelerator-x-website/issues/67) Door 1 — **closed 2026-07-09** · **B3** [#68](https://github.com/andy-carroll/accelerator-x-website/issues/68) Door 2 — **closed 2026-07-11** · **B4** [#69](https://github.com/andy-carroll/accelerator-x-website/issues/69) How We Work + About — **closed 2026-07-11** · **B5** [#70](https://github.com/andy-carroll/accelerator-x-website/issues/70) Contact + FAQ + Talks · **B6** [#71](https://github.com/andy-carroll/accelerator-x-website/issues/71) Global furniture — **B5 + B6: functional half PASS, content half awaiting Andy/Toby**
- Gates (all closed): **B7** [#72](https://github.com/andy-carroll/accelerator-x-website/issues/72) · **B8** [#73](https://github.com/andy-carroll/accelerator-x-website/issues/73) · **B9** [#74](https://github.com/andy-carroll/accelerator-x-website/issues/74) · **B10** [#75](https://github.com/andy-carroll/accelerator-x-website/issues/75) — the flip, still open, waiting on B5 + B6 content sign-off

**Deferred — ships WITHOUT (`post-launch` label):** named client proof (#55) · deep SEO/AEO (#40, #43) · /case-studies/ (#46) · dead v1 CSS + hub transition (#44) · FitCheck componentise (#49) · Door 2 follow-ups (#64) · cohort funnel (#30, separate surface) · marker-injection consolidation + atomic build writes (#79) · CHANGELOG rotation (#80) · site-wide em-dash sweep (in progress page-by-page as each B-ticket is walked; final full-site pass — incl. title separators — before B10). (#83 session-end gate-block dedupe + #84 lead-capture guard both **closed 2026-07-11** by a parallel session; #83's fix also resolved the notes-file-deleted-on-aborted-write bug this session's earlier close hit.)

**Start here (next session): [B5 — Contact + FAQ + Talks & Events (#70)](https://github.com/andy-carroll/accelerator-x-website/issues/70)** — same content-honesty walk pattern as B1–B4 (public emails/LinkedIn confirmed, quiz-link copy #61, FAQ hub honesty, Talks framing), plus the per-page em-dash sweep + FAQ JSON-LD/on-page sync now established as the standard move. Then **B6 — Global furniture (#71)** (nav, footer, newsletter, privacy/terms) is the last content walk before B10. Carry into B5/B6: the site-wide title-separator em-dashes ("Page — Accelerator X" in `<title>`/`og:title`/`twitter:title`/JSON-LD names) were deliberately left for a **final full-site em-dash pass before B10** — do that pass when B6 is done. #83 remains queued whenever engineering-only work resumes; nothing engineering-side blocks the flip. The only step to the v2 flip (B10) remains **Andy/Toby's content walk of B5 + B6** — not an engineering task.

**Cohort follow-ups (from B3, 2026-07-11):** firm cohort start date still TBC — swap the "Late July / Aug 2026" target window for the real date once Andy locks it (logged in go-live checklist §1, not a blocker). AX's diversifying cohort structures (advanced follow-on etc.) parked for post-launch under #30. How We Work coaching-path coverage is fast-follow [#86](https://github.com/andy-carroll/accelerator-x-website/issues/86) (post-launch, supersedes closed #63).

**Admin still open:** confirm Hostinger auto-renewal ON; spot-confirm HTTPS on a non-Sky connection; remove the `hardening-test-delete-me@accelerator-x.ai` test contact from Brevo list #9 (flagged in `docs/GO-LIVE-CHECKLIST.md`).

> **Operating-model thread (Andy, 2026-06-11):** this repo is now the **reference implementation** for a cross-repo operating model — proactive batch planning → swarm-ready tickets → parallel agentic execution, eventually extracted to portable skills. Umbrella: [#50](https://github.com/andy-carroll/accelerator-x-website/issues/50) (children: #51 batch-health check, #52 plan-batch ceremony, #53 CI on `rebuild/*` ✅, #54 swarm pilot, #82 protocol reconciliation ✅ 2026-07-06). Not in the v2 Cutover milestone — infrastructure, not a ship blocker. The v2 ship remains priority one; protocol decisions here should be designed for export.

---

## Session protocol — repo config

**Layered protocol (decided in [#82](https://github.com/andy-carroll/accelerator-x-website/issues/82), 2026-07-06):** the portable `ax-skill-ops` `/session-start` / `/session-end` skills carry the cross-repo **practice**; the native `npm run session-start` / `session-end` scripts (config: `.session-protocol.json`, procedure: `.claude/rules/session.md`) are this repo's **deterministic enforcement layer** — the skills must invoke them here, not bypass them. Concretely: the brief comes from `npm run session-start`; handoff notes are **generated only by** `npm run session-end:write:yes` (gated, single format) — never hand-written into `.claude/sessions/`. The block below maps the skills' contract onto this repo. Keep it and `.session-protocol.json` in sync when either changes.

```yaml
session_protocol:
  handoff_dir: .claude/sessions            # native scripts write here — NOT the skill default docs/sessions
  handoff_filename: "session-{YYYYMMDD}-{HHMMSS}.md"  # match the native session-end.js format exactly
  # Handoff notes are GENERATED by `npm run session-end:write:yes` (gated, single format) —
  # a skill-driven close invokes that script; it never hand-writes a note into handoff_dir.
  verify_command: "npm run build && npm run check && npm test"
  deploy_check: null                       # Netlify auto-deploys rebuild/v2 on push → https://rebuild-v2--accelerator-x.netlify.app (pushed == deployed); verify headers/pages with curl if needed
  review:
    enabled: true
    command: "/code-review"                # independent fresh-eyes pass; evidence enforced natively — session-end:write blocks without a recorded ## Review outcome in session-notes.md (#82)
  stakeholder_summary:
    enabled: true
    channel: "C0ACNB3RV1B"                 # #ax-business-building — same channel as .claude/rules/session.md §Exec summary
  work_tracking:
    issues: true                           # "v2 Cutover" milestone is the source of truth for work
    labels: [launch-batch, build, founder-input, post-launch, blocking, operating-model, area:content, area:tech, area:seo, area:deploy, area:forms, area:analytics, area:links]
    branch_policy: feature-branch          # one long-lived working branch (.session-protocol.json → git.workingBranch, currently rebuild/v2); no per-change branches
    push_policy: feature-branch            # push the working branch; NEVER merge to main — the cutover (B10) is a deliberate human action
  structural_docs:
    decisions: CHANGELOG.md                # decisions land in CHANGELOG [Unreleased] + the session log's Decisions section
    architecture: docs/tech-architecture/  # reviews, scorecards, integration/DNS docs — anything with standalone value beyond the diff
  extra_orientation:
    - "Layered protocol (decided #82): portable skills carry the practice, native npm scripts are this repo's deterministic gate layer — run `npm run session-start` for the brief and `npm run session-end:*` to close; skills must not bypass them"
    - "Go-live tracker: GitHub 'v2 Cutover' milestone; forensic line-item detail in docs/GO-LIVE-CHECKLIST.md"
    - "Session close checklist: did this session produce a review/audit/scorecard with standalone value? It gets a doc under docs/tech-architecture/, not just a chat answer"
```
