# Architecture & repo review — 2026-08-21

Second full review of this repo; the first is `architecture-review-2026-07-04.md` (scored 7.0 →
~8.0–8.2 post-hardening). This one was commissioned by Andy as the reference implementation for a
**repeatable, cross-repo review practice** (to be owned by Wren as a skill — see "Meta" at the end),
so it deliberately widens the lens from the baseline's six engineering dimensions to eight,
adding the two that matter most for what this repo actually is: **content honesty** (the repo's
own #1 value) and **backlog/platform governance**.

## Method

Eight parallel agent reviewers (26 agents total), one per dimension, every finding required to
cite file:line evidence or live command output. Every critical/high finding then re-verified by
an independent adversarial agent instructed to refute it: **17 of 18 confirmed, 1 refuted** (the
refutation itself being one of the review's most useful outputs — see "Corrections to the
record"). Live-site claims were verified against production (`curl` on accelerator-x.ai), not
just the repo. Scores are weighted for what this repo is: a conversion-critical static marketing
site maintained by one founder + agents.

## Context since the baseline

Three things happened between 2026-07-04 and today that frame every score:

1. **v2 shipped** (2026-07-14, B10) — the cutover the baseline was preparing for worked, and the
   post-flip smoke test caught a live money-path bug within minutes. The engineering discipline
   the baseline praised held under fire.
2. **The repo moved to the `acc-x` org** (~2026-08-10+) and the working model silently changed
   underneath the docs: `rebuild/v2` no longer exists on the remote, all recent work lands via
   PRs behind 3 required checks, and the local remote/config/docs still describe the old world.
3. **Five weeks of founder attention elsewhere** — date-stamped content aged past honesty,
   review-finding issues (#105–#107) sat unactioned, and the backlog's organising structures
   (milestone, labels) stopped reflecting reality.

## Scorecard

| Dimension | Weight | Score | vs 2026-07-04 baseline |
|---|---|---|---|
| Build pipeline & architecture | 15% | 8.0 | ≈ held (8.5 arch) — determinism verified live (fresh build, zero diff); fail-fast token system intact; one structural hole: CI never diffed committed artefacts against a fresh build (**fixed this session**) |
| Security | 15% | 7.5 | ≈ held (8) — headers/functions hardening intact; #106's two 422-class gaps confirmed real (**fixed this session**); rate limiting still the open gap; audit gate design flaw was live-blocking all PRs (**fixed this session**) |
| Performance | 10% | 6.5 | ↓ (7) — single-bundle CSS holding, but ~148KB of *unused* preloaded Aptos fonts on every page, hero/LCP gated on deferred JS, tokens.css shipped twice (**all fixed this session**); #44 v1 CSS + Tailwind decision unmoved |
| Testing & CI | 10% | 6.5 | ≈ held (7) — money-path suite grew 16→36 cases, all green; but both merge gates had confirmed defects (#105 false-PASS, #107 world-state gating — **both fixed this session**); check.js itself untested |
| SEO/AEO & content integrity | 20% | 6.0 | new dimension — technical layer strong (34/34 sitemap URLs live, JSON-LD parses everywhere, FAQ sync flawless); **content honesty carries the repo's two worst live clangers** (see P1 findings) |
| Accessibility & UX | 5% | 7.0 | new dimension — fundamentals strong (skip links, landmarks, labelled forms, reduced-motion); newsletter forms dead-ended silently on invalid email (**fixed this session**); AA contrast failures on core interactive colours need a design pass |
| Ops, process & self-documentation | 15% | 6.5 | ↓↓ (9.5 — the baseline's strongest dimension) — the discipline held through 2026-08-09, then **the org move invalidated the repo's own operating contract** and nothing recorded it; README materially wrong; ROADMAP pre-cutover; CHANGELOG unrotated |
| Backlog & platform state | 10% | 6.0 | new dimension — issue *writing* quality excellent; issue *governance* decayed (milestone open 5+ weeks post-ship, no priority scheme, newest issues unlabelled, org-move reconciliation untracked) |

**Weighted overall: ~6.8/10** (baseline: ~8.0–8.2). Read the drop correctly: **on the baseline's
own six engineering dimensions the repo roughly held its scores** — code, build, and security
discipline survived a launch and five unattended weeks. The drop comes from (a) the org-move
docs/process drift hitting the previously-strongest dimension, and (b) the widened lens scoring
content honesty and backlog governance for the first time, both of which found real problems.
That is the review working as intended, not the codebase decaying by two points.

## What this review fixed in-session (same-day batch, PR chain)

The baseline set the precedent (#78: review → same-session hardening batch). This review's batch,
landed as a stacked PR chain (merge in order):

1. **CI merge-gate repair** — audit moved off the gate to `dependency-audit.yml` (#107, live
   nanoid advisory cleared), doc-freshness PR diff base fixed (#105), committed==buildable now
   enforced with `git diff --exit-code` in CI, dead `rebuild/**` trigger removed.
2. **Money-path hardening** — both #106 claims fixed with record-preserving fallbacks
   (ISO-validated consent timestamp; 422-retry-with-field-omitted select guard), CORS dead code
   and raw-error leak cleaned, newsletter forms given real validation + inline errors (they
   silently dead-ended on invalid email on all 53 instances).
3. **Performance/a11y quick wins** — unused Aptos preloads removed (~148KB/page), `.reveal`
   noscript fallback (hero was invisible without JS — LCP + a11y), Figtree @import chain
   unblocked, tokens.css de-duplicated in the bundle, LCP hero preload + fetchpriority,
   netlify.toml pretty-URL cache rule fixed, apply-form failure message → `info@`.
4. **Build/check hardening** — design-system page's unresolved `{{site:…}}` tokens fixed at the
   builder, check.js Checks #3/#8 extended from insights/articles to all built HTML (with a
   commented legacy allowlist for the v1 orphans tracked by #87/#91), build-footer.js hardcoded
   URLs routed through site-config, orphaned test-site.js resolved.
5. **Docs truth pass + this document** — README dead links, llms.txt org URL, stale CLAUDE.md
   facts, ROADMAP reconciliation, milestone hygiene.
6. **Operating-model reconciliation** (separate PR, needs Andy's explicit ratification — it
   rewrites a "never reverse without discussion" decision to match what already happened):
   working branch → `main` + short-lived PR branches, `.session-protocol.json` updated,
   session-script branch patterns extended, preview URL corrected.

## P1 findings that need Andy (not agent-fixable)

These are the review's most serious findings. All verified live against production on 2026-08-21.

1. **`/programmes/leadership-cohort/` is live and indexed with every one of its go-live blockers
   unchecked** (CRITICAL). GO-LIVE-CHECKLIST §12 says it may only go live once its blocking items
   are resolved — all are `[ ]`, including Mark's quote approval, the "£16,000 legal dispute"
   figure sign-off, and ownership of the "4 seats remaining" scarcity count. Its £2,950 early
   rate is off-canon (offerings.json says £3,500). **Decide: noindex + drop from sitemap until
   §12 is signed off, or reconcile all claims to canon and check §12 off.**
2. **Orphaned v1 `cohort.html` is live, indexable, and four months stale** (CRITICAL): "Starting
   week of 20th April 2026", "£2,000 + VAT" (£1,500 below canon), "It's already Q2 2026",
   "2 business days". #91 tracks only the reply-time line; the whole page is the liability.
   **Recommended: 301 → `/what-we-do/leadership-cohort/` + delete the file.**
3. **Three contradictory public cohort prices live simultaneously** — £2,000 / £2,950 / £3,500
   (resolved by fixing 1+2; durable fix: cohort pages must derive price via `{{offering:…}}`
   tokens so Check #10 guards them).
4. **The cohort intake window "Late July / Aug 2026" goes false on 2026-09-01** — the exact
   date-stamped-claim failure mode B1 retired from the hero chip. Needs the real C3 date or a
   non-dated phrasing ("Next intake forming — dates on application").
5. **Ratify the operating model** (PR 6 above): one-line confirmation that main+PR flow is now
   the decision, plus approve the Netlify repo relink to `acc-x/…` (production deploy path).
6. **GSC**: still worth ~10 minutes for coverage/query data — but see the correction below; it is
   no longer the emergency the docs describe.

## Corrections to the record

- **The site is no longer "invisible on its own name."** The adversarial verifier re-tested live
  search (2026-08-21): accelerator-x.ai ranks #1 for its exact domain, its quoted brand name, and
  an unquoted category query — beating the acceleratorx.eu/.org namesakes the 2026-07-04 baseline
  said were winning. Indexation evidently followed the 2026-08-05 technical batch. #81, CLAUDE.md
  "Next" item 1, and GO-LIVE-CHECKLIST line 341 all still assert the invisibility and should be
  softened to "verify GSC for coverage/query data" (founder hygiene, not P1-critical).
- **CLAUDE.md stale claims** (fixed in the docs PR): "rebuild/v2 remains the working branch";
  preview URL "still resolves" (it 404s); "Tailwind CDN" (compiled since 2026-07-04); the
  crazy-shirley branch both "deleted" and "needs Andy's call"; sitemap "20→30 URLs" (now 34).

## Prioritised backlog (proposed P1–P4, all 27 open issues)

No priority scheme existed; the 4 newest issues had no labels at all. Proposed bucketing
(P1 = live correctness / broken gates → P4 = someday/parked):

- **P1:** #106 (fixed by this batch — close on merge), #105 (fixed — close on merge), the new
  org-move reconciliation issue, cohort-surfaces honesty issue (new, absorbs #91), #81 (rescoped
  per the correction above).
- **P2:** #107 (fixed — close on merge), #97 (apply-form rework — conversion path), #55 (real
  proof content), #89 (real photography), #86 (How We Work coaching path).
- **P3:** #87, #44, #49, #40, #43, #46, #64 (retitle — headline work shipped), #85, #56
  (re-scope both inside org-move reconciliation), #79, #80.
- **P4:** #30, #50, #51, #52, #54, #58 (close as superseded by #82), #77 (close — the ship it
  tracked completed 2026-07-14).
- **Milestone hygiene:** close "v2 Cutover" (the 9 issues still on it are all explicit
  deferrals); move survivors to a "Post-launch" milestone or rely on P-labels.

## What moves each dimension +1

- **Build (8→9):** committed==buildable now CI-enforced (done); land #79 (marker consolidation +
  atomic writes); extend Check #7 to component CSS and fix what it surfaces.
- **Security (7.5→8.5):** rate limiting on both public functions (the baseline's last gap, still
  open); consent-required-server-side decision (needs Andy).
- **Performance (6.5→7.5):** land this batch; then #44 (v1 CSS removal) + the Tailwind
  keep-or-drop decision (usage now measurably tiny) + self-host fonts.
- **Testing/CI (6.5→7.5):** tests for check.js itself; a package.json build-order regression
  guard; align CI Node version with the actual runtime (currently 20 vs 26 local — verify
  Netlify's function runtime before changing).
- **SEO/content (6→7):** resolve the two cohort surfaces + intake window (needs Andy — half a
  day total); then the #40/#43 editorial remainder (6 statement-H2 articles).
- **Accessibility (7→8):** AA contrast pass on link/CTA/error colours (design decision — needs
  Andy's eye); hero slideshow pause control (WCAG 2.2.2); insights hub filter a11y.
- **Ops/docs (6.5→8.5):** land the docs-truth + operating-model PRs; cut a CHANGELOG release
  (#80); retire or archive GO-LIVE-CHECKLIST as a post-launch register.
- **Backlog (6→8):** apply the P1–P4 scheme; close the milestone; file the reconciliation issue
  (all in this batch except the labels, which need a maintainer's judgment to confirm).

## Meta — this review as the reference implementation

This review exists to become a **portable two-tier practice** (decided with Andy, 2026-08-21):

- **Tier 1 — weekly repo-health pulse:** a cheap drift detector against this document's baseline
  (docs-vs-reality, CI/audit state, committed-vs-fresh build, date-sensitive content, backlog
  hygiene deltas). It self-heals what is autonomous (as PRs) and files issues for the rest. A
  weekly pulse would have caught the cohort window going stale *the day it turned dishonest*, and
  the org-move drift the day the remote changed.
- **Tier 2 — this: a quarterly or event-triggered deep review** (platform migration, launch,
  stack change, or pulse-detected drift that persists two consecutive weeks), scored against the
  previous scorecard, written to `docs/tech-architecture/`, with a same-session fix batch.
- **Parameters live in the repo, practice lives in the skill** (#50's rule): each repo carries a
  `repo_review:` config block (dimension weights for what the repo *is*, baseline doc path, pulse
  cadence, autonomous-fix policy). This site weights content honesty at 20%; other repos won't.
- The skill spec ticket is being filed via the ax-skill-ops pipeline; it should absorb #51
  (session-start batch-health check), which is a subset of the pulse.

The 2026-07-04 review's meta-finding ("a scorecard reads as analysis, not decision, and almost
didn't get written down") is honoured here: this document was written before the fix batch
landed, not reconstructed after.
