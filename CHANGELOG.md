# Changelog

All notable changes to this project are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)

---

## [Unreleased]

_Active track: `rebuild/v2` — full visual + structural rebuild. `main` is live and untouched._
_Phase 3 Page Assembly complete — all 4 inner pages assembled; homepage v2 conversion done_

### Changed

- **Session-protocol reconciliation decided — layered keep; #82 closed** (2026-07-06): the retire-vs-keep question on `scripts/session-start.js`/`session-end.js` vs the portable `ax-skill-ops` skills is settled as **keep, re-scoped**, amending the retire-the-scripts recommendation previously on record. The skills carry the cross-repo protocol *practice* (orient → verify → independent review → handoff → land → stakeholder summary); the native scripts + `.session-protocol.json` stay as this repo's **deterministic enforcement layer** — branch policy, quality-command gate, staged-path allowlist, summary/review evidence gates and stale-priorities block are hard exits a Node script can guarantee and an LLM-followed skill cannot. This is #50's own guardrail ("repos hold parameters, skills hold practice") made concrete. Dual-running ends not by deletion but by layering: the handoff note is now **generated only by `npm run session-end:write:yes`** — a skill-driven close must invoke the npm scripts, never hand-write a note into `.claude/sessions/` (declared in the CLAUDE.md config block, a YAML comment the skills read, and the new layering preamble in `.claude/rules/session.md`). This also removes a real dual-running failure mode: a skill-authored note in the skills' own format would have been invisible to the native brief, whose extractor expects the log format. The export follow-up — first-class `brief_command`/`handoff_writer` keys in the portable skills' `session_protocol` contract, replacing this repo's YAML-comment wiring — is tracked as [ax-agent-hub#551](https://github.com/andy-carroll/ax-agent-hub/issues/551), gated on this repo's pattern surviving 1–2 more real closes.

### Added

- **Independent fresh-eyes review gate, natively enforced** (2026-07-06, #82): the native close previously relied on agent self-review only; the config block declared `/code-review` but nothing enforced it. The review itself is an agent-level act a script can't perform, so the gate enforces the **evidence**: `session-end:write` now blocks unless `.claude/session-notes.md` records the review outcome under a new `## Review` section (template-comment-only or placeholder content is rejected; an honest `Skipped — <reason>` is accepted for sessions with no reviewable diff). Notes parsing moved from `session-end.js` into `session-protocol-utils.js` as pure content functions (`extractNotesSection`, `extractSessionSummary`, `extractReviewResult`) with three new test groups in `test-session-protocols.js` — which immediately earned their keep by catching a `$`-anchor-in-multiline-regex bug in the first implementation of the section extractor. The session log header now carries a `Fresh-eyes review:` line; the procedure (independent reviewer — `/code-review` or a fresh-context subagent, cumulative diff since last close, blocking findings fixed before close) is documented as `.claude/rules/session.md` §Step 1 and CLAUDE.md close step 2. **Dogfooded at this session's own close:** an independent subagent review of the introducing diff returned approve-with-nits (0 blocking, 4 minor, 4 nits); the minors were fixed in-session — plan/dry-run now surface the evidence gates as warnings instead of silently passing what write mode would then reject, the evidence checks run fail-fast *before* the expensive quality commands and the write-confirmation prompt, a leftover placeholder line above a genuinely recorded outcome no longer rejects the section, unterminated template comments are stripped (a truncated template can't satisfy the gate), headings with regex metacharacters can't throw, the empty-notes-file hint regression was fixed, and an `abortWrite()` helper deduplicates the two new gate blocks. Remaining follow-ups (helper adoption in the two older gate blocks + pinning the extractor edge cases the reviewer probed) raised as #83.

### Fixed

- **Session-protocol continuity: past session notes were silently truncated to the Summary paragraph; portable skills couldn't find the handoff at all** (2026-07-06, #82): two-part fix on Andy's "fix it properly" call. (1) *Heading collision:* `session-end.js` embedded `.claude/session-notes.md` verbatim under the log's `## Decisions / Findings` h2 — but the notes template uses its own h2s (`## Summary`, `## Decisions`, `## Deferred`, `## State changes`), so `session-start.js`'s section extraction stopped at the first embedded h2 and every "Recent session context" brief only ever showed the Summary paragraph, dropping the Decisions/Deferred/State-changes detail (verified: capture went from ~600 to 4,726 chars on the 2026-07-04 log). Fixed both ends — `session-end.js` now demotes embedded h2s to h3s on write, and `session-start.js` captures the full section up to the log's fixed `## Next Session Priorities` marker so old-format logs surface fully too. (2) *Portable-skill bridge:* added the `## Session protocol — repo config` YAML block to CLAUDE.md per the `ax-skill-ops` contract, mapped to this repo's reality (`.claude/sessions` handoff dir — the skills' default `docs/sessions` doesn't exist here; native filename format; real verify command; `/code-review` as the independent review gate the native protocol lacks; `#ax-business-building` for stakeholder summaries; feature-branch/never-merge-to-main push policy; `docs/tech-architecture/` as the structural-docs target that would have caught the scorecard near-miss). Both protocol routes now find the same notes and enforce the same gates; full reconciliation (retire-vs-keep native scripts, port the review gate) remains tracked in #82.

- **session-start.js: "Next Session Priorities" silently fell back to a placeholder** — found while verifying "will the next session-start pick up today's handoff?": the parser only extracted `## Next Session Priorities` content when formatted as a numbered list; CLAUDE.md's section has long since settled into free-form status prose (confirmed pre-existing via git history), so the regex returned nothing and session-start showed "Define priorities in CLAUDE.md" instead of anything real. Falls back to paragraph-block splitting when no numbered items are found, and promotes a `**Start here` paragraph to the front when present. Verified live via `npm run session-start`.

### Added

- **Opened #82 — reconcile this repo's native session protocol scripts with the `ax-skill-ops` portable skills.** Investigating the above fix surfaced that this repo's bespoke `.session-protocol.json` + `scripts/session-start.js`/`session-end.js` system predates and now duplicates, with an incompatible schema, the portable `ax-skill-ops:session-start`/`session-end` skills — which are missing at least one real capability (an independent fresh-eyes review gate before merge; this repo's own protocol is agent self-review) and lack at least one this repo needed (the `structural_docs` config key that would have forced the architecture-review scorecard below to be written, instead of depending on being asked). Filed as a child of the operating-model umbrella (#50) rather than patched further — session-protocol tooling shouldn't be in flux mid-cutover, and #50's own guardrail says local repo patches aren't the right channel for this class of fix.

- **Preserved the 2026-07-04 architecture-review scorecard as a doc, not just a chat answer** (`docs/tech-architecture/architecture-review-2026-07-04.md`): the six-dimension before/after scorecard (7.0 → ~8.0–8.2/10) and the prioritised "what's left to reach 8.5–9" list only existed in conversation — a real gap surfaced when asked "is anything worth preserving before archiving this session?". Session-close protocols (both this repo's native one and the generic portable version) have a designed slot for structural decisions but no forcing function that recognises "a review/scorecard with standalone value" as belonging there — noted as a meta-finding in the doc itself for whenever the protocol is next revised.

### Fixed

- **netlify.toml: the three-tier cache fix used unsupported glob syntax and matched nothing** (2026-07-04, #78): live-verified against the preview after deploy — HTML, JS, fonts, and images were all returning the *same* Cache-Control value, which shouldn't happen if the three per-extension rules (css/js, images, fonts) were each matching correctly. Root cause: `/**/*.@(css|js)`-style extglob alternation isn't supported by Netlify's header path matcher, so none of the three rules ever matched; a plain-glob rule (`/*.html`) on the same deploy, tested for comparison, matched correctly and returned its own distinct configured value, confirming the syntax (not a deploy/propagation issue) was the fault. Removed all three custom rules — Netlify's own default for static assets already does exactly the safe thing with no configuration needed (CDN-cached 1 year, auto-invalidated every deploy; browser tier always `max-age=0, must-revalidate`), which is what was actually being served the whole time and is more correct than the hand-rolled version (deploy-aware, not just a static max-age). The original bug (hardcoded `immutable` with no fingerprinting) is still fixed — the harmful override is gone — this just corrects *how* it's fixed. Left a comment in `netlify.toml` recording the extglob gotcha for future header rules.

### Added

- **B9 — PostHog conversion instrumentation** (2026-06-27, #74): the site loaded PostHog on
  every page but fired no custom events — launching blind on conversions. Added the MVP funnel +
  conversion events in `assets/js/forms.js` via a guarded `track()` helper (fire-and-forget;
  tolerates PostHog's deferred init since the snippet queues `capture()` calls): **`apply_form_start`**
  (first focus in the apply form), **`apply_form_submit`** (on successful submission), and
  **`newsletter_subscribe`** (on successful signup). Properties carry **non-identifying context only**
  (`timeline`, `interest`, `location`) — no name/email/company. Verified all three fire in-browser
  on the preview with no console errors and no PII. Gives the landing (`$pageview`) → `apply_form_start`
  → `apply_form_submit` funnel. Then added **`cta_click`** as a delegated listener on the shared
  `.btn` CTA class (+ any `[data-cta]`), capturing `{label, location}` with no template edits —
  verified firing in-browser. And set PostHog to **cookieless** (`persistence: "memory"`, Andy's
  call 2026-06-27) so no consent banner is required; trade-off is no cross-page/-session user
  stitching (aggregate counts + same-page funnels unaffected). All B9 MVP events now live + verified;
  no console errors, no PII. **Ingestion confirmed in the production PostHog project** via HogQL
  (test `cta_click` + `apply_form_start` events landed). B9 instrumentation complete.

- **Agent access to Netlify, PostHog + Vercel, documented** (2026-06-27): wired the deploy/analytics
  systems so the agent can drive the v2 cutover autonomously, following the official Netlify
  ["Set up Claude Code for Netlify"](https://docs.netlify.com/build/build-with-ai/agent-setup-guides/set-up-claude-code-for-netlify/)
  guide. Netlify remote MCP server (`netlify-mcp.netlify.app/mcp`, promoted to **user scope** so it
  travels to all repos), Netlify CLI (`26.1.0`, logged in + linked to `Andy-Main`/`accelerator-x`),
  and Netlify agent skills (`.claude/skills/netlify-*`). PostHog MCP added via the wizard + `/mcp`
  auth (EU region; key stays out of the repo). Vercel MCP connector (account-level) verified;
  Vercel CLI (`54.14.5`) installed. New `docs/tech-architecture/integrations-and-access.md`
  documents every connection, the account-level vs per-repo scope model, the one-time human-auth
  checklist, and links to each official source doc. No secrets in repo (per
  `.claude/rules/standards.md`); the only in-code key remains the public PostHog browser key in
  `analytics.js`.

### Added

- **Bundle component CSS into one file — 24 render-blocking stylesheets → 4** (2026-07-04, #78): the homepage loaded 24 separate stylesheets (tailwind + tokens + up to 22 component files); inner/offering pages loaded 11–19. Added `scripts/build-css-bundle.js`: concatenates `tailwind.generated.css` + `tokens.css` + all 33 `components/*.css` files (alphabetical, except `HomeSections.css`/`InnerPages.css` appended last to preserve each page's existing page-level cascade position) into a single committed `assets/css/bundle.generated.css`, hoisting + deduping the one `@import` shared by the two base files (mid-file `@import` is silently ignored by browsers, so this was a correctness requirement, not an optimisation). Swapped the per-page tailwind+tokens+components link block for one `<link>` to the bundle across all 16 templates that load component CSS (`_templates/homepage.html`, `about.html`, `article.html`, `contact.html`, `design-system.html`, `faq.html`, `how-we-work.html`, `index.html`, `talks-events.html`, `what-we-do.html`, all 5 `offerings/*.html`, `programmes/leadership-cohort.html`) — `styles.css` (v1, #44) stays a separate untouched link. **Verification (the risk that mattered):** before touching any template, sampled a full-property `getComputedStyle` fingerprint on 8 representative elements per page — nav, footer, the layered dark-context footer/newsletter heading, first accent button, hero root, the one duplicated cross-file selector (`.ax-faq-list--alt`), a FitCheck mask-icon data-URI, and `body` (proving the hoisted Figtree `@import`) — across all 7 distinct page types at both 375px and 1280px (14 samples). After the swap + rebuild, re-sampled: **zero differences on any of the 14 samples.** Confirmed via network log that pages now load exactly one CSS request (was up to 24) with no failed requests; screenshots + zero console errors on homepage/company-enablement/contact. Build is idempotent (`npm run build` twice → all "Unchanged"). Depended on the harmful `immutable`-without-fingerprinting Cache-Control override being gone (removed in the same wave, see the netlify.toml fix-of-a-fix entry above) — an unfingerprinted bundle pinned `immutable` would have frozen the old 24-file CSS in every returning visitor's cache for a year; Netlify's own default (`max-age=0, must-revalidate`, deploy-aware CDN caching) is what actually protects the bundle now.

### Fixed

- **Mobile nav drawer: focus never returned to the hamburger on Escape-close** (2026-07-04, #78, WCAG 2.4.3): pressing Escape closed the drawer but left keyboard/screen-reader focus stranded — the previous handler called `closeMenu()` unconditionally on every Escape press anywhere on the page. Now guards on `aria-expanded === 'true'` (so an unrelated Escape press elsewhere doesn't steal focus) and calls `toggle.focus()` after closing. Verified in-browser: opening the drawer and pressing Escape returns focus to the hamburger; pressing Escape while the drawer is already closed leaves an unrelated focused element untouched.

### Added

- **build-hub.js: fail-fast article tokens (kill the silent-empty-string gap)** (2026-07-04, #78): article pages were built via a hand-rolled `safeReplace()` that injected an empty string for any undefined frontmatter value — unlike every other token resolver in the build (`resolveSiteTokens`/`resolveOfferingTokens`/`resolveComponentTokens`), which throw on an unknown/missing value. A typo'd or missing required frontmatter field (title, author, published, excerpt, content, slug, site_url) would ship an invisible blank instead of failing the build. Added `resolveArticleTokens()` to `scripts/build-components.js` (matches only colon-free `{{name}}` tokens, so `{{component:X}}`/`{{site:KEY}}`/`{{offering:key.path}}` in the same template pass through for their own resolvers) and swapped it in for the per-token `safeReplace` calls in `build-hub.js`. Also added an author-mismatch warning (frontmatter names an author not found in `authors.json` → console warning listing available authors, was previously silent). Verified byte-identical build output (same SHA-256 across all 6 built articles before/after) and confirmed the throw path fires correctly in isolation.

- **Unit tests for the money-path functions + CI wiring** (2026-07-04, #78): the two functions handling the GNG-1 consent-capture and newsletter paths had zero automated coverage — every input-validation and fails-soft branch was protected only by manual E2E walks. Added `tests/functions/lead-capture.test.js` (7 cases: honeypot, wrong form-name, missing fields, oversized payload, malformed JSON, valid submission with exact GNG-1 Airtable field assertions + Slack-escaping verification, Airtable-failure alert) and `tests/functions/newsletter-subscribe.test.js` (9 cases, including the exact 2026-06-27 incident shape: missing/dead Brevo key → distinct Slack alert fires + `brevo` status surfaces in the response, while user-facing `success:true` stays fails-soft). Uses Node's built-in `node:test` (zero new dependencies; stubs `global.fetch` per test, resets env + require-cache between permutations). New `npm test` script (explicit file paths, not a glob — globs behave differently between zsh and the `sh` used by GitHub Actions, verified). Wired into `.github/workflows/standards.yml`'s `check` job so a regression in either function now fails CI, not just a future manual walk. 16/16 passing.

### Changed

- **Harden lead-capture + newsletter-subscribe functions (money path)** (2026-07-04, #78): payload-size guard (413 above 10KB) and an explicit malformed-JSON guard (400, was a generic 500) on both functions. `lead-capture.js`: user input is now escaped before interpolation into Slack mrkdwn (name/email/company/website/role/interest/source/message — Slack's `&`/`<`/`>` escaping rule) with field length caps; and a **GNG-1 failure alert** — when the Airtable consent write fails, a second distinct Slack message fires ("CONSENT WRITE FAILED... GNG-1 path degraded") so a broken consent-capture path is never silently masked by the existing fails-soft 200. `newsletter-subscribe.js`: tracks `brevoStatus` (created/failed/skipped) and fires a distinct Slack alert on failure/skip, plus returns `brevo: <status>` in the response — this is the exact shape of alert that would have caught the 2026-06-27 deactivated-Brevo-key incident (silent signup loss) the moment it happened, instead of on next manual check. User-facing contract unchanged (`{success:true}` still returned; forms.js only reads `data.success`). Verified: syntax check, build+check green, and live guard-clause smoke test via `netlify dev` — oversized payload → 413, malformed JSON → 400, invalid email → 400, honeypot → 200 skip, on both functions.

- **netlify.toml: fix stale-asset cache footgun; add CSP + HSTS; remove dead quiz redirect** (2026-07-04, #78): a repo-architecture review scored the site 7.0/10 and flagged security/performance gaps. Fixed the highest-value one first: CSS/JS were cached `max-age=31536000, immutable` with **no filename fingerprinting** — any deploy could leave returning visitors on stale styles/scripts for up to a year. Split the cache rule three ways: CSS/JS → `max-age=0, must-revalidate` (cheap 304s via Netlify ETags), images → `max-age=86400, stale-while-revalidate=604800`, fonts (content-stable binaries) keep `immutable`. Added `Content-Security-Policy` (script-src hash-authorises the single site-wide inline `onload` handler used for the Google-Fonts async-load trick — byte-identical across all 34 pages, verified; PostHog origins allowed for script+connect; `data:` allowed in img-src for CSS mask-icon data-URIs) and `Strict-Transport-Security` (conservative: no `includeSubDomains`/`preload` yet). Removed the two `/quiz/aireadiness` redirect blocks that shipped with a literal `YOUR_VERCEL_DEPLOYMENT_URL` placeholder — the root cause of the 502 flagged in the B8/#73 crawl; resolved in go-live checklist §7. Verified via `netlify dev`: headers emit correctly, zero console errors/CSP violations on homepage/company-enablement/contact, PostHog inits, Figtree + Material Symbols load, ApplyForm intact (15 inputs).

- **CLAUDE.md: correct the stale "critical path is founder content" narrative** (2026-07-03): the cockpit still named #26 (offering portfolio) as the undecided keystone and claimed "9 of 14 blocking issues are founder-input" — but #26 and the entire raft of content sub-issues (#18–#28, #61, #65, #66) are all **closed**. Rewrote the cutover + Next sections to reflect reality: the founder-content path is largely cleared; what remains is Andy/Toby's holistic **"Ready for production" sign-off walk of B1–B6** (content half only — engineering can pre-clear the functional half), then the **B10 flip**. Gates B7/B8/B9 all closed. Also dropped the contradictory `blocking` label on #30 (cohort funnel is a deferred `post-launch` separate surface per the Deferred list) — no open milestone issue now carries `blocking`, so the critical path is clear of blockers. The contract between sessions now matches the tracker.

- **B2–B6: functional-half QA sweep PASSED across all 11 inner pages** (2026-07-03): swept the What We Do hub + Company Enablement, the coaching hub + 3 offering pages, How We Work, About, Contact, FAQ, and Talks & Events on the served build at desktop + 375px. Every page: exactly one `<h1>`, zero unresolved tokens, valid JSON-LD, no empty links, all 15 unique internal links resolve 200, no 375px horizontal overflow, no console errors (shared forms/accordion/nav JS clean), no failed asset requests. Two items investigated and cleared as non-defects: the Company Enablement mobile cycle-chain is an intentional `overflow-x:auto` scroller (logged a polish note for a scroll affordance), and the lazy footer logo (`AcceleratorX-white.svg`) resolves 200 and loads on request (headless scroll timing artifact). Consolidated sweep on #77; per-ticket functional-PASS notes on #67–#71. With B1 (#76) that clears the **functional half of all six batch tickets** — only the founder content/honesty sign-off remains before the flip. Two minor follow-ups (cycle-chain affordance; quiz-HTTPS real-browser check) added to the go-live checklist. Verification only — no code change.

- **B1 homepage: functional-half QA walk PASSED** (2026-07-03, #76): walked `/` on the served build (repo root = Netlify artefact) at desktop + 375px. All functional snags clear — 12 internal links resolve (200), `#apply` anchor exists, no console errors, no image 404s (lazy below-fold images load on scroll), no 375px horizontal overflow, mobile nav drawer opens/closes with correct ARIA + resolving links, hero slideshow cycles, reduced-motion rules present, one `<h1>`, no unresolved tokens, JSON-LD valid with the 5 canon offers (no prices, no fabricated offers). Content/honesty half left for founder sign-off. Recorded on #76; also exercises B6/#71 nav+footer. No code change — verification only.

- **Board hygiene: close verified gates B7 + B8; give their residuals a durable home** (2026-07-03): B7 (#72, forms E2E + GNG-1 consent) and B8 (#73, core meta + no-404 crawl) were both verified PASS last session (2026-06-27) but never formally closed, so the board misreported them as open. Closed both with comments recording the pass and carrying residuals forward; confirmed no dangling sub-deps (#37 welcome automation already closed). Moved the two B8 minor residuals out of the now-closed issue comment into `docs/GO-LIVE-CHECKLIST.md` so nothing lives only in a closed thread: `insights/index.html` missing `og:image`/`twitter:card` (§6d) and the dead `/quiz/aireadiness` 502 redirect (§7). Docs/tracking only — no site output change.

- **Leadership Team AI Activation: reprice to £14k base (up to 8) + Door 2 hub anchor** (2026-06-24, B2/B3): Andy repriced Activation from base £15k/≤6 to **base £14,000 up to 8 people** (+£2,000/head for 9–12, max 12) — making **£1,750/person at 8** the lowest per-person entry across Door 2. Updated `offerings.json` (`price_from_gbp` 15000→14000, new `price_per_person_from_gbp: 1750`, model + note) and all three activation-page spots (hero card-pricing, FAQ answer, FAQPage JSON-LD) — replacing the stale "up to 6 / above 6 / ~£19,000 for 8" wording. Re-anchored the What We Do hub TwoDoors Door 2 card from "from £3,500/place" (cohort) to **"from £1,750/person in a team programme"** (token-driven), since the team is now the genuinely cheapest per-person way in. Reconciled the prose Offer Canon (`docs/business-context/offer-canon.md`) — §4.2, §5 price table, §7 FAQ + a dated decision-log entry — so it doesn't drift from `offerings.json`. All price strings token-derived; Check #10 green. **Open:** the public headline price (canon §5, currently "from £3,500") may want revisiting now that £1,750/person exists — flagged in the canon, left for Andy.

### Fixed

- **FAQ accordion: the +/× icon never changed on open/close (global)** (2026-06-20, B3): the open-state rule was `.ax-faq-item[open] .ax-faq-item__icon`, but the `open` attribute lands on the child `<details>`, not the `.ax-faq-item` `<li>` — so it never matched and the `+` stayed put. Corrected the selector to `.ax-faq-item details[open] …`; the `+` now rotates 45° into a `×` with the existing transition + colour shift. One shared component (`FAQList.css` + native `<details>`), so this fixes every FAQ on the site — offering pages, `/faq/` hub, homepage.
- **Door 2 offerings.json: clear false "Built page is STALE" notes** (2026-06-20, B3): the `price_note` for `senior-leader-acceleration` and `leadership-activation` still warned their built pages were stale (12wk/£12k/90-min; £18k flat, 5-10 people) "update in Phase 5" — but the templates + built pages were already reconciled to canon (6wk/£10k/75-min; base £15k ≤6 +£2k/head, max 12). Cleared the dead/misleading notes so they can't send a future agent chasing a non-existent fix. Metadata only — no rendered output changes (build confirms pages unchanged). B3 walkthrough otherwise clean across all 4 pages: links resolve, no console errors, no 375px overflow, prices match canon, guarantee on every page.
- **Company Enablement Phase Arc: unreadable detail text on the cyan card** (2026-06-20, B2): the `.ax-phase-arc__detail` row ("Align + activate + roadmap") inherited the base `opacity: 0.85`, which on the bright cyan panel (`#088ABF`, ~3.9:1 with full white) dropped it below legible. Added a cyan-panel override giving it full white at `opacity: 1` — parity with the eyebrow, which already had that override. CSS-only (`assets/css/components/CompanyEnablement.css`); `ax-phase-arc` is used only on this page, and no inline opacity styles exist in any template.

### Changed

- **About page: structural re-architecture (who → why → how → proof → go)** (2026-06-20, B4/#69): the page stated its one thesis (AI is a human problem; we're the opposite of a deck-and-leave consultancy) four times — hero sub, founders sub, the full origin story, then a 6-point "What we believe" manifesto where only 2 of 6 said anything new. Read as redundant and preachy. Fixes: (1) trimmed the hero sub to identity-only, dropping the thesis pre-statement; (2) left the origin story (founder-approved) as the single home for the thesis; (3) replaced the 6 convictions with **3 falsifiable commitments** under "What you can hold us to" (kept the non-redundant ones, dropped the two pure thesis-restates + the subcontracting line that already lives in the founders section); (4) added a **proof slot** (real, approved Charlotte Steedman `ProofRow`, upgradeable when #55 lands) before the closing CTA. Hero sub + commitment wording are first-pass, for live polish. Founder bios still thin — tracked in #24. Build + checks green; no 375px overflow; no console errors.
- **Cohort hero: add the "no value, no payment" guarantee for parity** (2026-06-20, B3): the guarantee appeared only in the cohort FAQ, while the 1:1 and Team Activation pages carry it in the hero card. Added the same `ax-offering-hero__card-guarantee` line (identical wording) to the cohort hero, after the CTA.
- **Company Enablement: weave in the regulated-industries differentiator** (2026-06-20, B2/#66): the regulated-industries narrative (a founder-flagged live differentiator — responsible AI enablement in regulated environments) was absent from all of Door 1. Added it as a "Right fit if you…" bullet on the Company Enablement FitCheck (`_templates/offerings/company-enablement.html`) — names sectors (legal, PE, manufacturing), no client names, on-voice ("adopted deliberately and accountably, not recklessly"). Wording is Andy's to tweak live. B2 Door 1 walkthrough otherwise clean (no token leaks, all links resolve, no console errors, no 375px page overflow, prices token-driven, no dead offers).
- **Instruction-file consolidation: retire `AI-RULES.md`; single-source onto `CLAUDE.md` + `.claude/rules/`** (2026-06-20): an audit found `AI-RULES.md` (357 lines) was frozen in a v1, solo-on-`main`, plan-gated era and contradicted the current v2/batch/ship-over-polish model on every conflict — while claiming canonical authority. Moved the only load-bearing content (the enforced **"We never"** list + **no-inline-scripts** rule + CI completion gates + escalation triggers) into new **`.claude/rules/standards.md`**, repointed **`scripts/check.js` Check 6** to parse it, **deleted `AI-RULES.md`**, and reduced **`AGENTS.md`** to a thin pointer to `CLAUDE.md`. Dropped the bloat that was written for other tools (the §1.5 mandatory-planning apparatus, §6 restatement, §8 output recipe) and corrected drifted facts on the way (colour rule → `assets/css/tokens.css`; completion gate → "the working branch", never "main"). Updated all live cross-refs (`README.md`, `ROADMAP.md`, `docs/GO-LIVE-CHECKLIST.md`, both CI workflows, pre-commit hook) and removed `AI-RULES.md` from `.session-protocol.json` managed files.
- **Single-source the branch/deploy fact** (2026-06-20): added `git.workingBranch`/`git.productionBranch` + a `deployment` block to `.session-protocol.json` as the one factual source; de-branched durable rule prose in `.claude/rules/session.md` ("push the working branch", not literal `rebuild/v2`). The literal branch/URL now lives only in CLAUDE.md's transient Current-State line — at cutover, edit config + one line and no rule goes stale.
- **Fix the unpushed-warning false alarm at source** (2026-06-20): `scripts/session-start.js` now treats commits ahead of the production branch as **expected** when on the working branch (full-cutover branch) — shown as a neutral ℹ️ note, not a ⚠️ "working tree not clean" warning. Retired the band-aid memory that existed only to tell the agent to ignore the false alarm.
- **Homepage founder bios: harmonise length + Toby CEO credibility** (2026-06-17, B1): the two bios were visibly lopsided (Toby ~36 words / 3 lines vs Andy ~62 / 6). Lengthened Toby's with his strongest credibility fact — **CEO of an established business he acquired and is taking through its own AI transformation in real time** (ties straight to the AX "we're AI-native ourselves" pitch — Canon §6.5). Trimmed Andy's ("tech and people"). Now 52 vs 60 words; track-record pin keeps them bottom-aligned. **Decisions:** Toby is **CEO, not founder — he acquired the business** (corrected). **Deliberately did NOT name the business (Accelerator Solutions)** on the site — the "Accelerator Solutions"/"Accelerator X" name collision risks confusing visitors for no upside; the credibility is in the substance, not the name (Andy + agent steer). Surfaces Toby's CEO title — supersedes the 2026-06-13 "orgs-only, no titles" ruling.

- **FitCheck icons: glyphs → masked SVGs; grey ✕ → soft slate minus** (2026-06-17, B1): the check/cross were text glyphs centred with flexbox — they never sat true-centre (Andy: grey ✕ "ugly" + off-centre in its circle; green ✓ slightly high too). Rebuilt as **masked SVG icons** driven by per-column custom props (`--fc-icon/--fc-color/--fc-bg`) in `FitCheck.css`: a green check and, for "probably not", a **soft slate minus in a tinted circle** (gentler than a cross, less "dead grey" than before). Both the heading badge and every list marker now use the same circle-badge + centred-icon pattern. Mask = shape only; colour via token, so no hardcoded hex (Check #7 green). Fixes **all instances at once** — homepage component + the 4 offering pages' inline FitCheck (B2/B3 surfaces). Heading glyph spans emptied across all 5 templates. Componentising the duplicated offering-page markup remains #49 (post-launch).

- **Homepage Phase 1 card: capture the full cycle** (2026-06-16, B1): the body undersold an 8-week cycle as "ship your first AI capability". Rewritten to surface all three Canon streams — People (train your people), Process (embed it in how you work), Product (ship a working capability) — plus ROI measurement and a "real capability, not a pilot" close, within the same card space (Andy; direction chosen via clarifying question).

- **Founder pedigree: "Alpha" → "Alpha FMC" + Andy bio v2** (2026-06-16, B1): corrected Toby's track-record org to its full name **Alpha FMC** in all three places it appears (`homepage-about.html`, `LogoStrip.html` → shows on `/about/`, `programmes/leadership-cohort.html`). Reworked Andy's bio again per his steer: the core is **understanding customer & business problems deeply, then architecting compelling solutions — part technology, part people** — across the full cross-functional suite (engineering, compliance, sales, go-to-market), plus hands-on AI strategy + full-stack execution.

- **Homepage founder cards: bio + alignment + dedupe** (2026-06-16, B1): four fixes from Andy's review of the "Who we are" cards (`homepage-about.html`, `FounderCard.css`, `homepage-trust.html`, `homepage.html`). (1) **Andy's bio elevated** — was thin ("product manager and leader… builds the systems we recommend"); rewritten to accentuate product leadership, cross-functional fluency, and deep hands-on AI strategy + full-stack systems execution ("setting the hands-on strategy, then building the full-stack systems that deliver it… makes things work in production, not just on a slide"). (2) **Removed the stray insights ↗ link** from Andy's card — it pointed at `/insights/`, was absent from Toby's, and read as an odd orphan; both cards now carry LinkedIn only. (3) **Track-record pinned to card bottom** (`margin-top:auto`) so both founders' Track Record blocks align at the same vertical height regardless of bio length (verified: identical top offset). (4) **Removed the LogoStrip "Operators who built at" panel** from the homepage (+ its now-unused stylesheet link) — it duplicated the per-card track-record lists. LogoStrip remains on `/about/` where it leads the page and the cards carry no track record. Build + all 10 checks green.

- **Homepage: accentuate the no-risk guarantee** (2026-06-16, B1): on the Phase 0 process card the "if it isn't valuable, you don't pay" line was buried at the end of the body copy. Split it into its own `.ax-process__guarantee` element (`homepage.html` + `HomeSections.css`), **pinned to the bottom of the card** (`margin-top:auto`) with a cyan-light top hairline and a bold "Risk-free." lead in `--action-primary`. Noticeable and on-brand without a garish song-and-dance (Andy). All tokens — no hardcoded hex (Check #7 green).
  - **Icon: ✓ → shield-check** (Andy: a tick reads like a bullet). Replaced the filled-circle tick badge with an inline **shield-check SVG** (the standard "guarantee/protection" mark) in cyan via `currentColor`, `.ax-process__guarantee-icon`. Plain shield / rosette-seal / umbrella are easy swaps if preferred.

- **Homepage teaser: remove the floating "Explore" button** (2026-06-16, B1): removed the floating "Explore what we do →" button below the three-way-in grid (Andy: "this button is odd" — competed with the tiles) in `WhatWeDoTeaser.html`. The `/what-we-do/` hub remains reachable via the nav. (Initially also stripped the per-tile CTA labels, but **restored them** — without the CTA the cards lost their click affordance; the tiles keep "Company enablement →" / "Leadership AI coaching →" / "Talks & events →" routing directly to each subsection.)

- **"People · Process · Product" → "Tools · Skills · Systems" (TSS)** (2026-06-16): Andy flagged the old framing as product-management-insider language, not accessible for the audience. Reframed to **Tools · Skills · Systems** in the two places it appeared: homepage "Why us" card 2 (`homepage.html`) and How We Work approach card 02 (`how-we-work.html`). Kept the load-bearing lines ("We do all three", "Most firms do one", "the seams are where the value lives", "until it runs in production, not until it impresses in a deck"). The FAQ "all three formats" (coaching) and an incidental article "processes/productivity" line are unrelated — left untouched. Build + checks green.

- **Homepage section reorder + FitCheck copy rewrite** (2026-06-16): two copy/IA fixes surfaced in Andy's live review. (1) **Section reorder** — `WhatWeDoTeaser` (Three ways in) moved _before_ the Phase 0→Advisory timeline so routing precedes the detail of a single path; timeline kicker reframed to "For your business · how it works" and closing note replaced stale "there's a second way in" with a link through to `/what-we-do/company-enablement/`. (2) **FitCheck rewrite** — right side leads with the "you know AI needs to happen but don't have a clear path" person; left side removes the snarky "sign-off from six people" and the inaccurate "regulated environment" disqualifier (AX works heavily in regulated industries — tracked in [#66](https://github.com/andy-carroll/accelerator-x-website/issues/66)) and replaces them with three honest structural/values mismatches including a new headcount-vs-enablement item. Build + all 10 checks green.

- **Home/What-We-Do IA split + Two Doors rebuild + Talks panel** (2026-06-15, [#64](https://github.com/andy-carroll/accelerator-x-website/issues/64)): the identical `TwoDoors` ran on both home and `/what-we-do/`, making What We Do a dead-end. Split into **homepage = teaser/router, What We Do = decision page**, on a new **shared clickable-card pattern**:
  - **New `OfferCard.css`** — one `.ax-offer-card` (full-`<a>`, eyebrow/name/desc/facts/meta, button CTA, hover-lift + shadow, focus ring) with cyan/pink/amber accent modifiers. The hub migrated onto it (`ax-depth-card` → `ax-offer-card`; card rules removed from `LeadershipCoaching.css`) so all "choose an offering" cards share one pattern — no drift.
  - **TwoDoors rebuilt** (What-We-Do only) → two accented offer-cards linking to their hubs (Door 1 cyan → `/what-we-do/company-enablement/`; Door 2 pink → `/what-we-do/leadership-ai-coaching/`). Deleted Door 2's three sub-links (now on the hub), the "Both doors work with leaders" distinction callout (its point now lives in the door copy — Canon §7.5), the Talks tertiary callout, and the component's intro (the page hero already carries "Two doors in / Pick your starting point" — was a duplicate heading).
  - **Talks & Events** de-comingled into its own amber-accented **panel** on What We Do (`.ax-talks-panel`, InnerPages.css), three formats via `{{offering:talks-events.formats.*}}` tokens, → `/talks-events/`.
  - **New `WhatWeDoTeaser`** on the homepage (replaces TwoDoors there): three accented offer-cards (Move your whole business · Build capability in you & your leaders · Talks & events) deep-linking to their destinations, plus one **"Explore what we do →"** → `/what-we-do/`. Homepage teases breadth + routes; doesn't make people decide.
  - **#64 wiring done:** both doors link through to their hubs; hub reachable from `/what-we-do/`; homepage routes to the decision page. Personality via the accent system (cyan/pink/amber). Build + all 10 checks green.

- **About origin story rewritten — founder-approved v1** (2026-06-14, [#24](https://github.com/andy-carroll/accelerator-x-website/issues/24)): the placeholder origin story was "largely off" (Andy) — it claimed two decades of "watching organisations fail to make AI work," but AI wasn't on the board agenda then. Replaced with corrected copy aligned to offer-canon §6.5: the real binding conviction (**in any major tech shift the hard part is the humans, not the technology** — AI being the biggest such shift, too often mis-handed to IT/risk "as if it were a tooling problem"); kept the true/powerful bits (consultancy-deck pattern; "the deck became the deliverable… the real work is everything between the big moments, with the people"); and **dropped the dangerous non-scaling absolutism** ("we work with a small number of clients… only works if we're fully in it") in favour of the Canon's founder-led-**and-specialist-complemented** framing. Hero sub corrected to match. No longer a BLOCKING placeholder (GO-LIVE §1h). Tighten later with concrete named builds (#24). The broader site-wide "it's just us / no associates" softening is tracked in [#65](https://github.com/andy-carroll/accelerator-x-website/issues/65).

- **Inner-page design harmonisation — Phase 1 (About page proof)** (2026-06-14): brought the About page up to the homepage's visual standard, establishing a reusable pattern for the other inner pages. Three linked fixes: (1) **CTABand redesigned** (`components/CTABand.html` + `CTABand.css`) — stripped from kicker + heading + 3-part subcopy + left/right split down to a **single centred primary button + one tiny subtitle**, with an `sr-only` `<h2>` preserving the `aria-labelledby` target; retoned from navy to **champagne** (`--bg-paper`). Shared component, so what-we-do / how-we-work / faq inherit the cleaner band too. (2) **LogoStrip relocated** on About (`about.html`) from the disconnected page tail up to **directly under the hero** as a navy credibility band, via a page-level `.ax-logo-strip-feature` wrapper (new navy variant in `LogoStrip.css`) — Home's light trust-bar instance untouched. (3) **About tonal rhythm** (`InnerPages.css`) — `ax-origin-story` set to champagne so the page now alternates `off-white → navy → off-white → champagne → off-white → champagne → navy`, killing the all-light-top / triple-navy-slab-foot imbalance. No new palette — champagne was already a token. Also **removed the "Track record" org lists from both founder bio cards** on About (`about.html`) — redundant now the same pedigree leads the page in the LogoStrip band (Andy). The shared FounderCard component, homepage, and cohort page are untouched. Build + all 10 checks green. Rollout to the other inner pages pending Andy's sign-off on the Netlify preview. moved DNS from Hostinger zone to Netlify DNS (`dns1-4.p03.nsone.net`) following a ~2-day HTTPS outage caused by Hostinger nameservers silently reverting to parking. Full zone transferred (MX, Brevo DKIM, quiz CNAME, all TXT records verified before activation). Netlify now owns the zone end-to-end; this class of outage cannot recur. Hostinger is registration-only. Reference: `docs/tech-architecture/dns-hosting.md`.

- **Site-config token system** (2026-06-13): introduced `scripts/site-config.js` as the single source of truth for site-wide URLs and email addresses. All founder LinkedIn profiles (`{{site:ANDY_LINKEDIN}}`, `{{site:TOBY_LINKEDIN}}`), company LinkedIn (`{{site:COMPANY_LINKEDIN}}`), founder emails (`{{site:ANDY_EMAIL}}`, `{{site:TOBY_EMAIL}}`, `{{site:HELLO_EMAIL}}`), and quiz URL (`{{site:QUIZ_URL}}`) are now tokens resolved at build time via `build-components.js resolveSiteTokens()`. Corrected both founder LinkedIn slugs in the same pass (old: `andycarroll` / `tobyhenry/`, correct: `heyandycarroll` / `toby-henry-79498b13/`). Automated enforcement added as check #9 in `scripts/check.js` — hardcoded LinkedIn or quiz URLs in templates now fail `npm run check`. Rule documented in AI-RULES.md §Philosophy "We never".

- **Nav overhaul shipped** (2026-06-13, [#33](https://github.com/andy-carroll/accelerator-x-website/issues/33)): added **About** → `/about/` to `components/Nav.html` (desktop bar + mobile drawer, between How we work and Insights) per the approved IA — `/about/` is no longer orphaned. Rebuilt all consumers (12 pages + 5 insights articles); funnel page's deliberate minimal nav untouched. Verified at 375px (drawer opens, all 5 links + CTA, navigation works, drawer closes) and desktop. `aria-current` remains with #49's per-page variable mechanism.

- **Nav IA decided + #33 made swarm-ready** (2026-06-13, [#33](https://github.com/andy-carroll/accelerator-x-website/issues/33)): founder-approved nav IA — What we do · How we work · **About** · Insights · Quiz → CTA "Apply to work with us" (Contact via CTA, no separate link; fixes `/about/` being orphaned from nav + footer). Ticket rewritten against verified code state (stale "CTA → /contact/" bullet was already done), with explicit out-of-scope (funnel minimal nav, `cohort.html` v1) and acceptance criteria. `aria-current` moved behind the per-page component-variable mechanism now formally owned by [#49](https://github.com/andy-carroll/accelerator-x-website/issues/49). No site changes — ticket/spec work only.

- **Truth audit closed out — founder rulings applied** (2026-06-13, [#48](https://github.com/andy-carroll/accelerator-x-website/issues/48) → follow-up [#55](https://github.com/andy-carroll/accelerator-x-website/issues/55)): all remaining founder-input gates resolved live with Andy and applied across templates + built pages:
  - **Testimonials confirmed** — Andy confirmed all three homepage quote wordings (Alastair Constance, Mark Bennett, David Carry) are the clients' own, fully approved words. No copy change needed.
  - **Founder bios rewritten** (`homepage-about.html`, `about.html`, `programmes/leadership-cohort.html`, `components/FounderCard.html`) — Andy: "Eighteen years as a product manager and leader…"; Toby: "Two decades across tier-one management consultancies, startups and scale-ups — building businesses…"; unverified "built and sold businesses" claim dropped. Orgs-only track records confirmed fine to ship — all #48 GO-LIVE flags removed.
  - **ProofRow quote replaced** (`components/ProofRow.html`, renders on homepage) — placeholder "More done in two weeks…" with fabricated "CEO, £60M healthcare group" attribution replaced by a real founder-supplied quote: Charlotte Steedman, CEO, Conductor. Same quote replaces the unverified "It moved my Monday morning…" (CMO, B2B SaaS) on `offerings/leadership-cohort.html`, and the design-system gallery demo.
  - **`how-we-work.html` pull-quote** — page carried a *paraphrased variant* of Mark Bennett's approved quote (real person, invented words); replaced with a verbatim excerpt of the approved homepage wording.
  - **Placeholder proof sections removed** from `offerings/company-enablement.html`, `offerings/senior-leader-acceleration.html`, `offerings/leadership-activation.html` — per founder ruling, removed rather than shipped with placeholder quotes; real content tracked as high-priority follow-up in [#55](https://github.com/andy-carroll/accelerator-x-website/issues/55) (also covers CaseTile data + written quote approvals).

- **CI on `rebuild/*` branches** (2026-06-11, [#53](https://github.com/andy-carroll/accelerator-x-website/issues/53)): both workflows (`standards.yml`, `doc-freshness.yml`) now trigger on pushes to `rebuild/**` as well as `main` — previously the working branch had zero CI and quality rested entirely on the local session-end build gate. Also fixed `doc-freshness.yml` to diff the **whole push range** (`github.event.before`→`HEAD`, falling back to `HEAD~1` for new branches/force pushes) instead of only the last commit, so multi-commit pushes — the norm on `rebuild/v2` — are judged as a unit: a CHANGELOG entry in any commit of the push satisfies the check. Prerequisite for swarm execution (#54); part of the operating-model thread (#50).

- **FitCheck CSS hygiene** (2026-06-10, [#49](https://github.com/andy-carroll/accelerator-x-website/issues/49)): consolidated the `.ax-fit-check--alt` modifier — it was duplicated in `CompanyEnablement.css` + `LeadershipCohort.css` and only reached the offering pages via cross-page CSS loading. Moved into the component's own `FitCheck.css` (borders only; base already sets the surface); visual output unchanged. The deeper fix — componentising the inline FitCheck markup across the 4 offering pages (and unblocking `aria-current` per #33) — is tracked in #49.
- **Truth audit — removed fabricated content** (2026-06-08, [#48](https://github.com/andy-carroll/accelerator-x-website/issues/48)): swept v2 for invented clients, suppliers, pedigree, and stats. Founder-verified the real picture and corrected:
  - **Founder pedigree** — replaced fabricated employers across `LogoStrip.html`, `homepage-about.html`, `about.html`, `components/FounderCard.html`, `programmes/leadership-cohort.html`. Real orgs only (Andy: BCG Digital Ventures, Allica Bank, Equals Money Group · Toby: Alpha, Capco, 10x Banking); invented titles, "two exits", and "B.Eng" claims removed; tenure/bio claims flagged for founder sign-off. (Was: Capgemini/WPP/Capital One/NHS/Pegasus — all invented.)
  - **`how-we-work.html`** — corrected Mark Bennett's attribution from the fabricated "CFO, Wittenrein Hering & former IPO board" to his real "CEO, W R Bennett Group" (the quote is his real, approved homepage quote).
  - **£16k legal-dispute story** — anonymised in `components/PricingBlock.html` and `programmes/leadership-cohort.html` per founder decision (real story, not attributed to the client by name).
  - **Fabricated "£45M retail group" case** — neutralised in `components/CaseTile.html` (60% / £420k / 11× metrics + non-existent case-study link) and `offerings/company-enablement.html` proof block; both now carry BLOCKING placeholders pending a real, approved case study.
  - **Kept (founder-confirmed real):** homepage testimonials — Mark Bennett / W R Bennett Group, Alastair Constance / Mercury Global, David Carry / Track Record Coaching.

### Changed

- **How We Work page de-cluttered** (2026-06-14, [#62](https://github.com/andy-carroll/accelerator-x-website/issues/62)): the page said the same ~4 promises up to four times (Four Principles grid + Four Moves grid + a "We never / We always" contrast grid), re-stating what the homepage already covers. Collapsed the **principles + moves into one ethos section of 4 cards** (`ax-approach`), each fusing a principle with its method — Founders in the room · We ship, we don't strategise · We build your capability then leave · Week one earns its keep (all from already-approved copy, deduplicated, no new claims). **Deleted the principles list, the second card grid, and the contrast grid** (+ their now-dead CSS — `ax-principles`/`ax-contrast` were how-we-work-only). Kept the engagement journey (the one concrete, unique block), pull-quote, CTA. Applied the same tonal rhythm as About: `off-white → champagne → off-white → navy → champagne → navy`. Page goes from 5 heavy blocks (8 tiles + 12 contrast lines) to 4 cards + journey + quote. Build + all 10 checks green.

### Added

- **Leadership AI Coaching hub (Door 2 landing page)** (2026-06-14, [#64](https://github.com/andy-carroll/accelerator-x-website/issues/64)): Door 1 (Company Enablement) had a landing page; Door 2 was three coaching offerings with no home above them — a wayfinding + SEO/AEO gap, and the reason "which door is clickable" was unclear in TwoDoors. New hub at **`/what-we-do/leadership-ai-coaching/`** (`_templates/offerings/leadership-ai-coaching.html` + `LeadershipCoaching.css`): hero with the canon "one lane, three depths" positioning → three **clearly clickable** depth cards (full `<a>`, arrow affordance, hover lift) linking down to the existing offering pages (1:1 / leadership team / open cohort) → shared-DOTS-engine + guarantee band → CTA. All names/prices/durations are `{{offering:*}}` tokens (no drift). SEO: keyword-targeted title/description ("Leadership AI Coaching & Training"), Service + ItemList JSON-LD (hub-and-spoke). The 3 offering URLs are unchanged (hub links to them). Build + all 10 checks green. **Then revised (v2) after a two-persona ICP review** (logged on #64): rewrote the hero to plain English (killed the cryptic "DOTS engine" jargon both personas flagged on sight; "AI systems" not "AI assistants" per Andy); added a navy **"Not a course. Not a workshop."** differentiation block (built around you · takes work off your plate · founder-led · built to move fast — positioning against generic courses/workshops, the load-bearing gap both ICPs identified); demoted DOTS to a plain-English method line; added a per-card outcome line + lifted the guarantee up beside the cards + "references on request"; **strengthened card affordance** (solid-button CTA, resting shadow, accent-border hover — Andy: didn't read as clickable); and **replaced the generic "Apply to work with us" close with a selection CTA** ("Not sure which fits? → Talk to a founder", since Apply is a commitment verb wrong for a chooser page). Rhythm now `off-white → navy → white → champagne → navy`. **Remaining (#64):** wire TwoDoors Door 2 → hub + its affordance, #63 How We Work signpost → hub, deeper AEO + company-enablement hub parity.

### Fixed

- **Removed the "Not sure which door is yours?" quiz prompt from TwoDoors** (2026-06-14, [#61](https://github.com/andy-carroll/accelerator-x-website/issues/61)): the door-picker linked to the AI-readiness quiz — a non-sequitur (the quiz assesses business readiness, not which offering door). Removed the whole `.ax-two-doors__quiz` block + its now-dead CSS from the shared `TwoDoors` component (renders on `/` + `/what-we-do/`), so it's gone from both. Also eliminated one of the two false "Free · No email required" claims (the contact-page instance remains, tracked in #61). Future direction (Andy): re-point the quiz so it leads into how we can help — separate work.

- **Primary CTA hover was pink-on-pink** (2026-06-14, [#60](https://github.com/andy-carroll/accelerator-x-website/issues/60)): the base `a:hover { color: var(--action-accent) }` repainted anchor-button text pink, so the `.btn--accent` CTA ("Apply to work with us", an `<a>`) lost its white text against the darker-pink hover background — while the newsletter `<button>` was unaffected, giving inconsistent hover behaviour. Scoped the rule to `a:not(.btn):hover` in `tokens.css` and regenerated `tailwind.generated.css` (`npm run build:css` — the minified bundle ships its own copy of the base layer, so token-only edits don't land until it's rebuilt). All anchor-button variants now keep their text colour on hover; accent CTA matches the newsletter button. Verified on preview.

### Added

- **Newsletter signup consolidated to one component** (2026-06-14): replaced four divergent "weekly dispatch" implementations (the `NewsletterCTA` component, the bespoke footer form, and raw-Tailwind forms on the insights hub + articles) with a single **`NewsletterSignup`** component (`_templates/components/NewsletterSignup.html` + `NewsletterSignup.css`). One look, one `btn--accent` button, **field + button now the same height** (both `--btn-lg-height` 48px — fixes the long-standing misalignment). **No `id` attributes** (wrapping label + status nodes found relative to each form) so it can appear twice on a page without duplicate IDs. **`forms.js` rewritten** to bind every `.js-newsletter-form` instance (the old handler only wired `#newsletter-form`, so the footer + CTA signups never actually submitted — now fixed). **`resolveComponentTokens()` now resolves nested component tokens** (depth-capped) so the Footer can include the component. **Placement:** a band at the **top of the footer, above the link columns** on every page (footer grid simplified — brand + nav; legal pinned bottom); plus an in-page band in the **top third** of content pages (insights hub after the hero, articles after the BLUF) — never adjacent to the footer. Marketing pages = 1 signup (footer); content pages = 2 (in-page + footer). **Removed the fabricated "Join 5,000+ Founders…" claim** (zero subscribers); copy is now audience-framed ("The weekly dispatch for founders, directors and CTOs building real AI capability — the hard-won lessons, not the hype"). Deleted `NewsletterCTA.html`/`.css`. Build + all 10 checks green; verified field/button alignment (48/48px), dark-context footer rendering, and no duplicate IDs on content pages. (Funnel page `programmes/` keeps its own minimal footer by design — out of scope.)

- **Guarantee clarified to a "no value, no payment" principle + adversarial review fixes** (2026-06-14, [#57](https://github.com/andy-carroll/accelerator-x-website/issues/57)): a 13-agent adversarial review sweep of the Phase 5 surfaces surfaced 8 verified findings (0 blocker, 2 major, 6 minor) — all fixed.
  - **Guarantee (founder clarification, Andy):** reframed to the strong **"no value, no payment"** principle, stated up front with no caveats/legal-speak. It applies across **all coaching, training and activation/enablement** (NOT one-off Talks & Events). Phase 0: after session 1, you decide. Coaching (all 3 formats): two full sessions + **keep the resources**, cancel before the third for a full refund. Updated the source of truth (`offer-canon.md` §5 + `offerings.json` guarantee), removed the "within 48h / in line with expectations" hedging from the `/faq/` answer (+ JSON-LD), added the (previously missing) guarantee to the Company Enablement sidebar, and added "keep the resources" to all three coaching pages (sidebar + FAQ + JSON-LD).
  - **Truth/Canon:** softened "Deliver measurable ROI" → "Measure it against the ROI targets you set" (homepage + how-we-work) to honour the Canon's outcomes-as-target rule.
  - **Accessibility:** removed `role="separator"` from a content `<div>` on company-enablement (was dropping an `<h2>` from the outline); fixed the cohort proof region to use `aria-label` instead of labelling by a `<p>`; replaced filename hero `alt` text (`AX-workshop-01`…) with honest generic scene descriptions in `hero-media.generated.json`.
  - **CSS/responsive:** styled three previously-unstyled classes (`__card-guarantee`, `__card-pricing`, `__note`) in `CompanyEnablement.css`; gave `.ax-phase-arc` a single-column mobile default (was a cramped two-up at 375px). Build + all 10 checks green.

- **FAQ engine complete — `/faq/` hub + FAQPage JSON-LD on every offer surface** (2026-06-14, [#57](https://github.com/andy-carroll/accelerator-x-website/issues/57), Phase 5 T6): new `_templates/faq.html` → `/faq/` (added to `build-inner-pages.js`), authored from Canon §7 cross-cutting objections in three groups — positioning/"is this real?", pricing, trust/commercial/legal (14 Q&As). Prices in answers are `{{offering:…}}` tokens; the two **⚠️ proof-gated** answers (named clients / founder builds) publish in the honest **"references available on request"** framing — no clients/outcomes/specific builds asserted (per Andy's call; upgrade when #55 lands). Page carries WebPage + **FAQPage JSON-LD**. Added **FAQPage JSON-LD** to `leadership-cohort` + `company-enablement` (their on-page FAQs were already real); removed their stale "AI-written placeholder" GO-LIVE flags. Fixed two Canon-fidelity drifts found in passing: the cohort money-back answer now states the real guarantee (full money-back through first two sessions), and company-enablement's post-cycle answer reads "taper to a light monthly advisory" (not "our advisory arrangement", which echoed the retired Fractional Advisory). Linked `/faq/` in the footer Explore group. **Phase 5 (#57) now fully built.**

- **Talks & Events re-elevated, inquiry-led** (2026-06-14, [#57](https://github.com/andy-carroll/accelerator-x-website/issues/57), Phase 5 T5): rewrote `_templates/talks-events.html` to the Canon §4.3 model — hero "Move a room. In an afternoon.", the three confirmed formats (AI Keynote 45–90 min/up to 2,000 · Leadership Offsite half-full day/10–40, hands off into Phase 0 · AI Hackathon 4–8 hrs/40–200), **priced on application, inquiry-led**. **Removed the retired events-calendar empty state** ("Upcoming events… scheduling the next round") that contradicted the no-calendar decision, and the inline `style=` on the inquiry CTA. New `.ax-format-grid`/`.ax-format-card` styles added to `InnerPages.css` (amber top-border, mirrors the TwoDoors card pattern). Meta + WebPage JSON-LD updated. The Two Doors tertiary callout links here, now first-class.

- **Check #10 — offerings drift-guard** (2026-06-14, [#57](https://github.com/andy-carroll/accelerator-x-website/issues/57), Phase 5 T7): new `checkNoOfferingDrift()` in `scripts/check.js` (registered after Check #9), modelled on the site-URL guard. Enforces, on the canonical offer surfaces (`offerings/*`, homepage + partials, `what-we-do`, `how-we-work`, `TwoDoors`): (a) **no hardcoded £-prices** — must be `{{offering:…_gbp}}` tokens (exempts JSON-LD answer text, HTML comments incl. multi-line, and a single per-page `data-pricing-note` element for per-head models/worked examples); (b) **no references to retired/killed offerings** — `/fractional-advisory/`, `/8-week-cycle/`, "8-Week Transformation Cycle" anywhere in `_templates`; (c) **slug/template coherence** — every `status:"live"` offering with a `/what-we-do/` slug has a built template. Deliberately does **not** scan the funnel page (`programmes/` — its own conversion page with bespoke early-bird pricing), the competitor-comparison `AlternativesGrid`, or proof components flagged separately (#55). Regression-tested: a stale price + a Fractional Advisory link both fail the build; clean tree passes.

- **Four offering pages reconciled to the Canon (tokenised)** (2026-06-14, [#57](https://github.com/andy-carroll/accelerator-x-website/issues/57), Phase 5 T4): every price/name/duration on the four offering detail pages now renders from `offerings.json` via `{{offering:…}}` tokens — no literals. **1:1 Exec AI Fast Track Coaching** (was "Senior Leader Acceleration"): full rewrite to 6 weeks / from £10,000 / weekly 75-min + continuous async, "take it off your plate" positioning, audit→build→embed plan, six real FAQs (incl. the "£10k vs £3,500 cohort" objection) + FAQPage JSON-LD. **Leadership Team AI Activation** (was "Leadership Activation"): base £15,000 + £2,000/head above 6, max 12 (was £18k flat / 5–10); group size → up to 12; six real FAQs (incl. the per-head cost + the Door-1-vs-exec-team distinction) + FAQPage JSON-LD. **Open Cohort AI Bootcamp for Business Leaders** (was "Leadership Cohort"): name tokenised, £3,500/place tokenised (FAQs already real). **Company Enablement**: name + Phase 0/1+ prices (£5k/£20k) tokenised, resolved the price GO-LIVE flag. Added a `price_per_head_gbp` field to `offerings.json` for the activation model; pricing-detail prose marked `data-pricing-note` for the upcoming Check #10. Guarantee + "+VAT" surfaced on coaching pages. Build + check green; zero unresolved tokens; no stale prices/names in built output.

- **Two Doors spine restored + contradicting offers killed** (2026-06-14, [#57](https://github.com/andy-carroll/accelerator-x-website/issues/57), Phase 5 T2/T3): new `_templates/components/TwoDoors.html` + `assets/css/components/TwoDoors.css` — the offer spine recovered from the locked design (Canon §3). Two entry-point cards (Door 1 → Company Enablement, Phase 0 → Phase 1+; Door 2 → Leadership AI Coaching, three formats), the load-bearing Door-1-vs-exec-team distinction sentence (Canon §7.5 #4), a "menu, not either/or — start here" frame, a tertiary Talks & Events callout, and the quiz helper. All names/prices/durations render from `offerings.json` via `{{offering:…}}` tokens. Placed on the homepage (after the process walkthrough) and at the top of `/what-we-do/`. **Killed:** the `OfferingTable` + `OfferingCard` + `DecisionTree` components (HTML + CSS deleted; gallery/design-system references migrated to TwoDoors), which carried the fabricated **"8-Week Transformation Cycle"**, stale prices, and the dead **Fractional AI Advisory** / `/8-week-cycle/` / `/fractional-advisory/` links. **Fixed fabricated structured data:** the homepage `OfferCatalog` JSON-LD asserted a non-existent "One-Day Discovery Workshop" (£4k) and "8-Week Transformation Cycle" (£12k, "Delivers 10x value") — rewritten to the five real offerings (names/one-liners from tokens), with **no prices** per the locked "No priceRange in JSON-LD" decision. `/what-we-do/` hero + meta + WebPage JSON-LD reframed from "Four ways" to "Two doors in". Verified in preview (desktop + 375px): `npm run build` + `npm run check` green; zero unresolved tokens; no fabricated offerings in built output.

- **Offering token engine — site derives names/prices from `offerings.json`** (2026-06-14, [#57](https://github.com/andy-carroll/accelerator-x-website/issues/57), Phase 5 T1): added `resolveOfferingTokens()` to `scripts/build-components.js`, a third build-time token type alongside `{{component:…}}` and `{{site:…}}`. Grammar: `{{offering:<key>.<dot.path>}}` resolves to a scalar in `content/data/offerings.json` (offerings indexed by `key`); any `*_gbp` key renders as £-prefixed locale-grouped currency (`10000` → `£10,000`); unknown key / unknown path / non-scalar path all fail the build (matching `resolveSiteTokens` strictness). Wired into `build-inner-pages.js` and `build-homepage.js` in the order component → offering → site, so component partials can themselves carry offering tokens. No template uses it yet (clean no-op); it's the keystone for T2–T4 (Two Doors + offering-page derivation) and the planned Check #10 drift-guard. Plan: `~/.claude/plans/all-of-those-unpushed-vast-lovelace.md`.

- **Offer Canon — single source of truth for offerings** (2026-06-14, [#57](https://github.com/andy-carroll/accelerator-x-website/issues/57)): created `docs/business-context/offer-canon.md` (canonical offer doc) + `content/data/offerings.json` (machine-readable companion the site will derive from). Resolves the root cause behind #26 — the offer was defined in three contradictory places. Anchored on the recovered **design intent** ("Two Doors in" model from `home-b-v2.jsx`): Door 1 → Company Enablement (Phase 0 → Phase 1+), Door 2 → Leadership AI Coaching (one lane, three formats: 1:1/small-group · exec-team · open cohort), + Talks & Events revived as first-class; Fractional AI Advisory dropped from v2 routing. Both legacy offer docs (`ax-offering-architecture.md`, `ax-canonical-offer-strategy.md`) marked ARCHIVED → superseded. **Multi-persona adversarial pass** (4 ideal-customer viewpoints) generated a 22-question FAQ/objection bank (Canon §7) + a required-revisions list (§7.5) with 4 HIGH gating findings: proof gap (#1 ship-blocker), unsourced 10x ROI claim, visibly unsettled pricing, and Door-1-vs-exec-team confusion. Phase 5 (deriving the site from `offerings.json` + authoring FAQ + FAQPage JSON-LD) tracked separately under #57. Plan: `~/.claude/plans/1-yes-2-keep-smooth-axolotl.md`.

- **Offer Canon v0.4 — founder decisions locked + key narrative added** (2026-06-14, [#57](https://github.com/andy-carroll/accelerator-x-website/issues/57)): worked through all founder decisions live and refined the Canon to a sign-off-ready state. Coaching renamed (Ronseal titles + subtitles): **1:1 Exec AI Fast Track Coaching** (6wk/75-min/from £10k), **Leadership Team AI Activation** (base £15k ≤6 + £2k/head, max 12), **Open Cohort AI Bootcamp for Business Leaders** (£3,500/place). Pricing locked (Phase 0 £5k, cycle £20k, all +VAT, headline "from £3,500 +VAT"); half-day workshop retired; Fractional Advisory dropped from v2; Talks & Events = price-on-application. Added: a standalone **"How to think about ROI" (§5.5)** outcomes-first block (10x+ as a reasoning model anchored in the client's numbers — never a measured-result claim); a **"Making yes easy / no 12-month commitment"** principle; the corrected **Phase 0 flow** (3 workshops: Exec DOTS → Team Activation → Team-level DOTS → playback, with the boulder→stones ownership-transfer narrative); a **differentiation block + FAQs** (vs AI automation agencies / consultancies — the rare technologist+consultant+teacher+coach span); and the **full money-back guarantee**. Built coaching/exec pages now stale on names/prices — reconciled in Phase 5. **v0.5** adds the founder-led + specialist-network **delivery model** (answers capacity/continuity without a bait-and-switch) and a **draft founders/origin section** (§6.5, "AI-native ourselves" credibility framing) for the About page; remaining About specifics (named AI builds) + measured client proof deliberately deferred to prioritise shipping v2.

- **Airtable consent fields** (2026-06-08, [#32](https://github.com/andy-carroll/accelerator-x-website/issues/32)): added `Consent Given` (checkbox) and `Consent Timestamp` (single line text) to the Prospects table (`tblQzgVPzXL4cEQBp`, base `appZwa2e4VZk4ULDA`). The lead-capture function ([`netlify/functions/lead-capture.js:193`](netlify/functions/lead-capture.js)) already writes both on every submission; they were silently dropping until the fields existed. Verified all ten fields the function writes now map to existing Prospects fields (incl. `Source` choice "Accelerator-X Website"). Unblocks GO-LIVE-CHECKLIST §0. Airtable-schema change only — no code/preview deploy.
- **Delivery system — "v2 Cutover" GitHub milestone** (2026-06-07): triaged `docs/GO-LIVE-CHECKLIST.md` (211 line-items / 18 blocking rows) into [milestone #1](https://github.com/andy-carroll/accelerator-x-website/milestone/1) with 30 work-unit issues. Labels: `founder-input` (14) vs `build` (16) work-streams, `blocking` (14) for critical path, plus `area:*` filters. Each issue links back to its checklist section; checklist header now points to the milestone as the live tracker.
- **`/programmes/leadership-cohort/` VSL funnel page** (`rebuild/v2`): conversion-engineered landing page distinct from the `/what-we-do/leadership-cohort/` informational offering page; live paid cohorts running (Cohort 1 started 15 May 2026); 10-section page with conversion rationale comment on every section
  - **`_templates/programmes/leadership-cohort.html`** — full VSL funnel template: minimal nav (logo-only, no escape routes), hero (outcome-first H1, qualifier sub), ScarcityCard (4 seats at early rate, inline cohort variant), ProofRow quote variant with 3 outcome-stats (Mark / W R Bennett Group / £16k week-1 return vs £2,950 cost), AlternativesGrid component, Programme Arc (3 phase cards + included list + time commitment), Founders section (both cards inline — portrait images confirmed in `/assets/images/`), PricingBlock component, FAQList (6 questions, inline), CTABand component, stripped footer. Single CTA destination: `/contact/`. Zero "book a call" language. PLACEHOLDER comments on H1, Mark's quote, and FAQ answers per GO-LIVE-CHECKLIST §12.
  - **`_templates/components/AlternativesGrid.html`** — new component: competitive comparison, dual layout (mobile stacked cards / desktop table, CSS-toggled — no JS). Four alternatives: YouTube/DIY, Udemy/LinkedIn Learning, University exec ed, Claude Bootcamp. Six criteria rows. AX column highlighted with navy header (`var(--ax-navy)`) and cyan-tint cells (`var(--surface-primary-subtle)`). Tick marks `var(--ax-green)`, cross marks `var(--fg-4)`. `aria-labelledby="alternatives-heading"`.
  - **`_templates/components/PricingBlock.html`** — new component: two pricing cards (£2,950 early / £3,500 standard), ROI math block (3 hrs × £150/hr × 8 wks = £3,600), Mark's proof story, money-back guarantee. CTA → `/contact/`. `aria-labelledby="pricing-heading"`.
  - **`assets/css/components/AlternativesGrid.css`** — new component CSS: dual-layout toggle (cards/table via CSS breakpoint), AX column styling, tick/cross marks, row hover
  - **`assets/css/components/PricingBlock.css`** — new component CSS: 2-col pricing card grid (1-col mobile → 2-col ≥640px), early-rate card (pink `var(--action-accent)` border + shadow), standard card (opacity 0.75), ROI block (`var(--bg-paper-deep)` + cyan left-border), guarantee text
  - **`assets/css/components/ProgrammeFunnel.css`** — new page-level CSS for funnel pages only: `.ax-funnel-scarcity` wrapper, `.ax-programme-arc` section (warm `var(--bg-paper)`, 3-phase card grid), `.ax-phase-card` (num, weeks, name, unlock), `.ax-funnel-footer` (stripped footer — logo + legal links, `var(--bg-darker)`)
  - **`scripts/build-inner-pages.js`** — funnel page entry added to PAGES array under `// Funnel pages` comment; builds to `programmes/leadership-cohort/index.html`
  - **`sitemap.xml`** — `/programmes/leadership-cohort/` URL added (priority 0.9, changefreq weekly)
  - **`docs/GO-LIVE-CHECKLIST.md`** — §12 added: 13 blocking items for funnel page go-live (Mark's quote approval, 4-seats ownership, H1 confirmation, FAQ review, portrait image confirmation, etc.)

- **Phase 3 — Offering detail pages (Company Enablement)** (`rebuild/v2`): first offering detail sub-page built
  - **`_templates/offerings/company-enablement.html`** — full page template; unique 2-phase layout with Phase Arc (hero 3-col arc: cyan Phase 0 panel / arrow / Phase 1+ panel), Phase 0 in-depth section (3 plan steps + 4 deliverables), Bridge block (centered dashed box), Phase 1+ section (3 stream cards + cycle chain), FitCheck, 6-question FAQ, 2-col proof section (quote + placeholder case study), dark final CTA; all CTAs → `/contact/`; complete `<head>` with Service JSON-LD, all CSS links
  - **`assets/css/components/CompanyEnablement.css`** — new 12-section CSS file for layout elements unique to this page: `.ax-offering-hero` (2-col hero grid, sticky sidebar), `.ax-phase-arc` (3-col arc with `--cyan` panel variant), `.ax-ce-steps` / `.ax-ce-deliverables` (inline plan/deliverable grids), `.ax-bridge` (dashed border centered box), `.ax-ce-streams` (3-col capability streams), `.ax-cycle-chain` (horizontal scrollable with `--advisory` amber variant), `.ax-ce-proof` (2-col proof), `.ax-ce-cta` (dark CTA section), `.ax-accent` utility; fully token-based
  - **`scripts/build-inner-pages.js`** — Company Enablement entry registered in PAGES array; page now builds to `what-we-do/company-enablement/index.html`
  - **6 page specs** written to `docs/page-specs/`: `leadership-cohort.md`, `leadership-activation.md`, `senior-leader-acceleration.md`, `fractional-advisory.md` (shell — blocked on founder content), `company-enablement.md`, `talks-events.md`

- **Talks & Events page** (`rebuild/v2`): `/talks-events/` built and registered
  - **`_templates/talks-events.html`** — informational listing page: PageHero (kicker "WHERE TO FIND US", H1 "Speaking, events, and workshops."), Upcoming Events section (empty-state copy + `role="status"`, flagged for replacement when first event confirmed), Speaking Inquiry section (`--alt` bg, CTA → `/contact/`), NewsletterCTA, Footer; WebPage JSON-LD; Event JSON-LD deferred until real events listed
  - **`assets/css/components/EventCard.css`** — added `.ax-empty-state` block (border-top, padding, muted paragraph) for use when no events are scheduled
  - **`scripts/build-inner-pages.js`** — Talks & Events entry registered; builds to `talks-events/index.html`
  - **`docs/GO-LIVE-CHECKLIST.md`** — two go-live items added: replace empty state with EventCards when first event confirmed; add Event JSON-LD when events listed

- **Leadership Activation + Senior Leader Acceleration offering pages** (`rebuild/v2`): both pages built and registered
  - **`_templates/offerings/leadership-activation.html`** — full page: 2-col hero (sidebar card: In-house cyan badge, 6-row spec table, £18k fixed-team pricing, CTA → `/contact/`), 3-col who-is-this-for peer cards, PlanLayers 3-col variant (Prep / Sessions / Embed), DeliverablesGrid 4-up, FitCheck, dark proof quote (placeholder flagged for founder review), 6-question FAQ (questions from spec; answers placeholder flagged), dark final CTA; Service JSON-LD; go-live flags in HTML comments
  - **`_templates/offerings/senior-leader-acceleration.html`** — full page: 2-col hero (sidebar card: 1:1 cyan badge, 6-row spec table including Coach: Toby or Andy, £12k, go-live flag on coach naming), 3-col who-is-this-for peer cards, PlanLayers 3-col variant (Orient / Build / Handoff), DeliverablesGrid 4-up, FitCheck, dark proof quote (anonymised treatment, placeholder flagged), 6-question FAQ (placeholder answers flagged), dark final CTA; Service JSON-LD
  - **`scripts/build-inner-pages.js`** — both pages registered; builds to `what-we-do/leadership-activation/index.html` and `what-we-do/senior-leader-acceleration/index.html`
  - **`docs/GO-LIVE-CHECKLIST.md`** — blocking items added for both pages: proof quotes, FAQ answers, coach naming confirmation

- **Leadership Cohort offering page** (`rebuild/v2`): `/what-we-do/leadership-cohort/` built and registered
  - **`_templates/offerings/leadership-cohort.html`** — full page template: 2-col hero (sidebar investment card: Cohort 04 badge, spec table with cyan places-left highlight, CTA → `/contact/`), 3-col "who is this for" peer cards, PlanLayers 3-col variant (3 phases: Prep / Sessions / Embed), DeliverablesGrid 4-up (personal AI model, shipped artefact, peer network, DOTS), FitCheck, dark ProofRow quote, 6-question FAQ with AI-written placeholder answers (all flagged for founder review), dark final CTA with `chip--on-dark`; Service JSON-LD; all go-live flags in HTML comments
  - **`assets/css/components/LeadershipCohort.css`** — new CSS: `.ax-lc-who` + `.ax-lc-peer-card` (3-col peer cards with cyan eyebrows), `.ax-lc-steps` (3-col grid override for PlanLayers, rule hidden), `.ax-lc-spec-highlight` (cyan places-left value), `.ax-fit-check--alt` / `.ax-faq-list--alt` (background overrides), `.ax-lc-proof` (centered dark quote block), `.ax-lc-cta` (dark closing CTA section)
  - **`assets/css/components/Chips.css`** — added `.chip--on-dark` variant (rgba white bg, white text, subtle border) for chips on dark backgrounds
  - **`assets/css/components/DeliverablesGrid.css`** — added `.ax-deliverables-grid--alt` modifier (bg-2 background with border top/bottom)
  - **`scripts/build-inner-pages.js`** — Leadership Cohort registered in PAGES array; builds to `what-we-do/leadership-cohort/index.html`
  - **`docs/GO-LIVE-CHECKLIST.md`** — 4 blocking items added for leadership-cohort: start date, places left, proof quote, FAQ answers

- **`/what-we-do/` review** (`rebuild/v2`): full page audit at desktop + mobile
  - **`assets/css/components/OfferingTable.css`** — bug fix: `.ax-offering-table__row` was missing `display: contents`; row divs were blocking the CSS grid, cells never became direct grid children; one-line fix restores correct 6-column table layout at desktop
  - **`docs/GO-LIVE-CHECKLIST.md`** — added blocking OfferingTable content misalignment section: old offering names (8-Week Transformation Cycle not canonical), Leadership Activation name collision, broken `/what-we-do/8-week-cycle/` link, offering count copy

- **Phase 4 — Content pipeline** (`rebuild/v2`): migrated articles to the Build Plan §10 data model:
  - **6 article frontmatter files** — `date` renamed to `published`; `format` field added (`article` / `video` / `podcast`); `category` and `type` fields removed; Build Plan canonical tag (`Strategy` / `Capability` / `Tooling`) added as primary (first) tag in each article's `tags` array
  - **`scripts/build-hub.js`** — added `computeReadTime()` (word count ÷ 200, min 1 min); added `resolveFilterTag()` (maps primary tag to hub filter bucket); added `renderArticleTile()` (generates `ax-article-tile` component HTML with `data-format`, `data-tag`, byline, read time); removed `categoryMap` and old ad-hoc `article-card` tile markup; sort and sitemap lastmod now use `published` field; `safeReplace` now injects `published`, `format`, `read_time`, and derives `category` from first tag for article-page display
  - **`_templates/article.html`** — `{{date}}` token replaced with `{{published}}` in OG `article:published_time` meta and JSON-LD `datePublished`
  - **`_templates/index.html`** — hub pathway filter tiles updated to Build Plan taxonomy: Strategy (For Leaders) / Capability (For Teams) / Tooling (Tech & AI); filter IDs updated from `strategy` / `implementation` / `capability` to `strategy` / `capability` / `tooling`
  - **`assets/js/hub-filter.js`** — updated to target `.ax-article-tile` (was `.article-card`) and `data-tag` attribute (was `data-category`)

### Changed

- **SDLC session loop codified** (2026-06-07): `.claude/rules/session.md` now opens with "THE SESSION LOOP (SDLC)" — every session runs scope → measurable outcome → build → test → deploy → monitor, with a non-negotiable close-gate (work must be **tracked** + **shipped**, or **explicitly carried**). Added a tracking+shipping check to Step 0 and two enforcement bullets.
- **CLAUDE.md revamped** (2026-06-07): slimmed back under one page — cut historical Phase 2 Wave C/D status detail (now in CHANGELOG + session logs), replaced the stale Phase 3/4/5 "Next" block with the milestone-driven cutover, added a dedicated "The cutover" section, folded in the SDLC loop reference.
- **`rebuild/v2` pushed + branch preview confirmed live** (2026-06-07): preview at https://rebuild-v2--accelerator-x.netlify.app verified serving the full v2 component system, distinct from production v1. `GO-LIVE-CHECKLIST.md §10` updated.

### Fixed

- **`ApplyForm` dark-surface bug** (`assets/css/components/ApplyForm.css`): all form text was invisible on the dark navy homepage section — field labels, section headings, section number badges, consent text, SLA text, and submit button all used light-bg tokens (`--fg-1`, `--fg-3` etc.) that rendered navy-on-navy. Fixed by adding a `.ax-apply-section`-scoped dark-surface override block; submit button overridden to `--action-accent` (pink) on dark. Light-bg `/contact/` page unaffected and verified.
- **`ApplyForm` footer divider** (`assets/css/components/ApplyForm.css`): horizontal rule was flush against the chip radio group with no gap. `.ax-apply-form__footer` had `padding-top` (space after the border) but nothing before it; added `margin-top: var(--space-8)`.

- **`content/articles/001-the-implementation-gap.md`** — `next_article_url` was `"#"` (dead link); corrected to `/insights/articles/the-5-stage-build-sequence.html`
- **`scripts/build-hub.js`** — `TAG_FILTER_MAP` missing `'Cases'` and `'Opinion'` entries despite both being declared as canonical primary tags in Build Plan §10 comment; `Cases` now routes to `capability`, `Opinion` to `strategy`; comment updated to clarify routing intent; `allowedChangedPathPatterns` in `.session-protocol.json` updated to include `content/articles/*.md` and `content/data/*.json`
- **`assets/js/hub-filter.js`** — live `ReferenceError` fixed: `categoryId` renamed to `tagId` throughout `filterContent()` after parameter rename in previous edit left lines 33 and 39 referencing an undefined variable; stale comment updated to reflect `data-tag` / `.ax-article-tile`
- **`scripts/build-hub.js`** — `TAG_FILTER_MAP` was missing `'Capability': 'capability'`; three articles with `Capability` as primary tag were silently falling through to the default; now correctly resolves to the `capability` filter bucket; `AVG_READING_SPEED_WPM` extracted as named constant; taxonomy source-of-truth comment added above `TAG_FILTER_MAP`
- **`scripts/session-end.js`** — added `detectStalePriorities()`: cross-references `## Next Session Priorities` against completed items (lines containing `✅`) in `## Next (do in this order)`. Write mode blocks with `EXIT.QUALITY_GATE_FAILURE` if a completed task label is still listed as a priority; plan/dry-run modes emit a warning. Prevents the session-end from closing cleanly when priorities have drifted from the actual project state.

### Added

- **Phase 3 — Inner page assembly (complete)** (`rebuild/v2`): all four marketing pages assembled from v2 component library:
  - `/what-we-do/` — PageHero + `{{component:OfferingTable}}` + `{{component:DecisionTree}}` + `{{component:CTABand}}`; full JSON-LD `WebPage` schema; CSS links for OfferingTable, OfferingCard, DecisionTree
  - `/how-we-work/` — PageHero + principles grid (4 items) + approach cards (4 cards) + engagement phases (Phase 0/1/2…n/Advisory) + contrast table (never/always) + pull-quote (`<blockquote>` with Mark Bennett attribution) + `{{component:CTABand}}`
  - `/about/` — PageHero ("Two operators. One partnership.") + founders hero (real portrait images, full track records for Toby + Andy) + origin story (placeholder — see GO-LIVE-CHECKLIST) + beliefs (6 numbered operating principles) + `{{component:LogoStrip}}` + `{{component:CTABand}}`
  - `/contact/` — PageHero + `{{component:ApplyForm}}` + direct contact cards (Toby + Andy, toby@/andy@ emails, LinkedIn) + quiz prompt (→ `quiz.accelerator-x.ai`) + `{{component:Footer}}`; `ContactPage` JSON-LD schema; no CTABand (form is the CTA)
- **`scripts/build-inner-pages.js`** — new build script; processes all 4 inner page templates via `resolveComponentTokens`; creates output directories idempotently; integrated into `npm run build` chain
- **`assets/css/components/InnerPages.css`** — new shared CSS (~430 lines) for all inner page sections: `.ax-inner-section`, `.ax-principles`, `.ax-approach`, `.ax-engagement`, `.ax-contrast`, `.ax-pull-quote`, `.ax-founders-hero`, `.ax-origin-story`, `.ax-beliefs`, `.ax-contact-layout`, `.ax-contact-direct`, `.ax-contact-card`, `.ax-quiz-prompt`; fully token-based; mobile-first (640/768/1024 breakpoints)
- **`package.json`** — added `"build:inner-pages": "node scripts/build-inner-pages.js"` script; added to end of `build` chain
- **`scripts/build-hub.js`** — added 4 inner pages to `staticPages` array in `generateSitemap()`; sitemap now has 12 URLs (was 8)

### Fixed

- **`CTABand.html`** — CTA destination updated from `/#apply` to `/contact/`; now that `/contact/` is built, the pending decision (documented in §1f of GO-LIVE-CHECKLIST) is resolved
- **`contact.html`** — wrapped `{{component:ApplyForm}}` in `<div class="ax-contact-layout">` rather than `<section>`; `ApplyForm` already renders its own `<section aria-labelledby="apply-form-heading">`, so wrapping in another labelled section would create redundant landmark nesting

### Documentation

- **`docs/GO-LIVE-CHECKLIST.md` §7** — added dead v1 CSS cleanup item: ~200 lines of orphaned rules (`.hero-shell`, `.diff-card`, `.process-card`, `.problem-headline`, `.testimonials-*`, etc.) to remove from `assets/css/styles.css` in the go-live cutover PR

### Added

- **`HomeSections.css`** — new component CSS covering all 5 homepage inline sections (post-build quality pass: fixed `.ax-hero__sub` margin conflict, `1.75rem` → `var(--space-6)`, raw `720px` → `var(--container-tight)` ×2, redundant margin shorthand on `.ax-process__heading`, redundant `margin-bottom` on `.ax-why-us__card-icon`)
- **`main.js`** — stripped 5 dead v1 section-specific reveal functions and their IntersectionObservers (`.problem-headline`, `.different-headline`, `.testimonials-headline`, `.process-card`, `.apply-shell`); generic `.reveal` observer remains; all v2 section headings, cards, and phase tiles now carry `reveal`/`reveal-delay-*` classes for staggered scroll animation

- **`HomeSections.css`** — new component CSS covering all 5 homepage inline sections (Hero, Problem, WhyUs, Process, Testimonials) using v2 design tokens; BEM naming (`ax-hero`, `ax-problem`, `ax-why-us`, `ax-process`, `ax-testimonials`); fully responsive (mobile-first, tablet 640px+, desktop 1024px+)
- **Phase 3 — Homepage inline section rebuild** (`rebuild/v2`): replaced all 5 v1 Tailwind/styles.css inline sections with v2 token-based BEM markup:
  - Hero: v2 copy ("Stop buying tools. Start building capability."), `chip--kicker` availability badge, `ax-hero__heading` display type, existing hero media library preserved
  - Problem: warm paper background panel (`bg-paper-deep`), 2-col layout at 1024px+, `ax-kicker--accent` kicker
  - Why Us (was "Different"): dark navy, 3 cards with numbered monospace icons (01/02/03), updated copy (founder-led / all three / outgrow us)
  - Process: 4-phase timeline (Phase 0 · Phase 1 · Phase 2…n · Advisory), off-white background, highlight treatment on Phase 0
  - Testimonials: dark navy, `ax-testimonial-card` BEM cards with gold star ratings; real client quotes kept, cards converted from Tailwind to v2 tokens
- **Go-live governance** — `docs/GO-LIVE-CHECKLIST.md` created: forensic pre-launch audit covering content accuracy, links, forms, email flows, PostHog analytics (gold standard), SEO/AEO (gold standard), technical QA, responsive QA, pages to build, and owner sign-off. Maintained continuously — session protocol enforces adding new items whenever a placeholder or unresolved decision is introduced.
- **Session protocol** — pre-close audit in `.claude/rules/session.md` now includes mandatory go-live checklist sweep step
- **CLAUDE.md + AI-RULES.md** — checklist referenced in session quick cards and project context; stale `docs/go-live-checklist.md` path corrected to `docs/GO-LIVE-CHECKLIST.md`

### Fixed

- **`LogoStrip.html`** — removed "Premium Car Parks" (a client, not a founder's previous employer); header comment clarifies this is a pedigree strip not a client logo strip
- **`ProofRow.html`** — placeholder quote flagged with a `GO-LIVE-CHECKLIST.md §1d` pointer; case studies link commented out (restore when `/case-studies/` is live)
- **`CTABand.html`** — CTA destination updated from `/contact/` (page does not exist) to `/#apply`; decision pending on whether a `/contact/` page will be created — documented in both inline comment and checklist §1f

- **Phase 3 — Homepage partial assembly** (`rebuild/v2`):
  - `homepage-who.html` — replaced v1 "Who this is for" section with `{{component:FitCheck}}`
  - `homepage-trust.html` — replaced v1 logo grid with `{{component:ProofRow}}` + `{{component:LogoStrip}}`
  - `homepage-about.html` — replaced v1 bio cards with v2 founders section; both Toby and Andy have real portrait images, bios, track records using `ax-founder-card` BEM markup
  - `homepage-apply.html` — replaced v1 lead form with dark `ax-apply-section` wrapper + `{{component:ApplyForm}}`
  - `FounderCard.css` — added `ax-founders-section` wrapper CSS (responsive 2-col grid, `bg-paper-deep` background, container + gutter tokens)
  - `ApplyForm.css` — added `ax-apply-section` wrapper CSS (dark `bg-dark` background, centred header with `ax-apply-section__heading` and `__sub`)

- **Phase 2 Wave D — Interactive (complete)** (`rebuild/v2`):
  - `QuizCTA` — dark navy promo block; kicker + heading + benefit + pink CTA → `quiz.accelerator-x.ai`; 2-col ≥768px, single-col + full-width button below; registered in design system Interactive section
  - `ScarcityCard` — programme availability signal; `--cohort` variant (pink border, deadline + places) and `--open` variant (cyan border, lead-time framing); 2-col ≥640px, stacked + full-width button below
  - `CohortList` — active programme instance table; header row with open count; each row: date/duration + location + audience/places + Apply CTA; 4-col grid ≥640px, 2-col + full-span CTA below; `[hidden]` on `<section>` collapses entirely when no cohorts are live; registered in design system Interactive section
  - `ApplyForm` — 3-section application form ("Who you are" / "The business" / "The work"); pure-CSS radio chip groups for timeline selection (`input:checked + .chip`); consent checkbox with timestamped GDPR-compliant acceptance; SLA promise line; hooks into `[data-lead-form]` handler in `forms.js`; no new JS; registered in design system Interactive section
- **`assets/js/forms.js`** — `consent_given` (boolean) and `consent_timestamp` (ISO 8601 string) added to lead-capture payload; captured at submit time
- **`netlify/functions/lead-capture.js`** — `Consent Given` (checkbox) and `Consent Timestamp` (text) written to Airtable on every lead-capture submission; requires matching fields in Airtable prospects table before going live
- **`tokens.css`** — `.ax-kicker--accent` modifier added (`color: var(--action-accent)`); allows pink kicker without inline style override

### Fixed

- **`QuizCTA.html`** — replaced `style="color:var(--ax-pink)"` inline override with `.ax-kicker--accent` class; added `noreferrer` to `rel` on external link (was `noopener` only — Referer header was leaking)
- **`ScarcityCard.html`** — `role="status"` (live region) replaced with `role="region" aria-label="Programme availability"` on both variants; removed inline `margin-top` from open variant example
- **`ScarcityCard.css`** — removed dead `.ax-scarcity-card--open` rule which restated the base `border-left-color` and did nothing

- **Phase 2 Wave C — Content Blocks** (`rebuild/v2`) — all 13 content block components built:
  - `LogoStrip` — flex row of client/partner names with separator and eyebrow label
  - `ProofRow` — quote variant (big pull-quote + pink mark) and case-tile variant (2-col outcome grid)
  - `PlanLayers` — numbered vertical list with `::before` connecting rule and z-indexed bubbles
  - `OfferingTable` — desktop 6-col grid with ARIA table semantics; hidden below 1024px
  - `OfferingCard` — kicker + badge + meta grid standalone card for mobile/tablet
  - `DeliverablesGrid` — 4-up → 2-up → 1-up responsive grid of deliverable items
  - `FitCheck` — 2-col yes/no layout on bg-2 with coloured `::before` markers
  - `FAQList` — `<details>/<summary>` accordion; desktop opens all on load via `faq-init.js`
  - `CaseTile` — card with cover image (hover scale), sector chip, metrics grid; feature variant
  - `ArticleTile` — format-aware (`data-format`), play overlay for non-article; feature horizontal
  - `EventCard` — standard (light) and featured (navy, fully inverted) variants
  - `FounderCard` — identity header with portrait, socials, bio, track record list
  - `DecisionTree` — 2-col layout (intro + rows), 3-col row grid (`1fr auto 1fr`); quiz CTA
  - All 13 registered in `_templates/design-system/content.html`
  - All 13 CSS files linked in `_templates/design-system.html`, `_templates/homepage.html`
- **`assets/js/faq-init.js`** — extracted from FAQList component; safe to include on any page (no-ops if no `.ax-faq-item` elements present)
- **`assets/css/tokens.css`** — 6 new `--surface-*-subtle` tint tokens (`primary`, `accent`, `amber`, `green`, `muted`, `navy`); replace component-level `color-mix()` calls for broader browser compatibility
- **`scripts/check.js`** — `filesIn()` made recursive; quality gate now scans `_templates/components/` and `_templates/design-system/` subdirectories (previously only top-level `_templates/`)

### Fixed

- **`ProofRow.css`** — removed invalid `aria-hidden: true;` CSS property (was a no-op; `aria-hidden` is an HTML attribute, not a CSS property)
- **`FAQList.html`** — removed hardcoded `aria-expanded="false"` on `<summary>`; native `<details>` manages open/closed state and the attribute was factually wrong when JS opened items on desktop
- **`OfferingTable.html`** — added `role="rowgroup"` wrappers (`ax-offering-table__thead` / `ax-offering-table__tbody`) with `display: contents` so screen readers correctly identify the header vs. body row groups
- **All 6 Wave C CSS files** — replaced 10 `color-mix()` calls with new `--surface-*-subtle` design tokens for consistency with existing codebase and full browser compatibility

- **Architecture fixes (pre-Wave C)** (`rebuild/v2`):
  - `Footer.css` — newsletter column now spans full width (`grid-column: 1 / -1`) at 640px–1023px; fixes orphaned 3rd-column at tablet breakpoint
  - `build-homepage.js`, `build-hub.js` — both now call `resolveComponentTokens` after template assembly; `{{component:X}}` tokens work in all page builds
  - `_templates/homepage.html`, `_templates/article.html`, `_templates/index.html` — old v1 inline nav replaced with `{{component:Nav}}`; old v1/marker footer replaced with `{{component:Footer}}`; `id="main-content"` added to `<main>` in all three (skip link now has a target)
  - v2 CSS (`tokens.css`, `Buttons.css`, `Nav.css`, `Footer.css`) linked in all three page templates
  - `build-footer.js` — scoped down to `cohort.html` only; `index.html`, `insights/index.html`, and article pages now get their footer via `resolveComponentTokens` instead of the old marker-injection pattern
- **Phase 2 Wave B — Global Chrome** (`rebuild/v2`) — five fully-rendered Chrome components live in the design system showcase:
  - `_templates/components/Nav.html` + `assets/css/components/Nav.css` — sticky backdrop-blur header, skip link, desktop links, hamburger toggle wired to existing `nav.js` pattern
  - `_templates/components/Footer.html` + `assets/css/components/Footer.css` — dark 3-col grid footer (brand / nav / newsletter), 3-col at ≥1024px
  - `_templates/components/NewsletterCTA.html` + `assets/css/components/NewsletterCTA.css` — standalone full-width newsletter section, 2-col at ≥768px
  - `_templates/components/PageHero.html` + `assets/css/components/PageHero.css` — breadcrumb + kicker + h1 + subline; used on inner pages
  - `_templates/components/CTABand.html` + `assets/css/components/CTABand.css` — dark closing CTA, single accent button → `/contact/`
- **Phase 2 Wave A — Primitives** (`rebuild/v2`) — four fully-rendered primitive components live in the design system showcase at `design-system/index.html`:
  - `_templates/components/TypeScale.html` — display sizes (ax-display--xl, ax-display), kicker, h1–h5, lead, body, caption; dark-surface demo
  - `_templates/components/Buttons.html` — all 5 variants (primary, accent, outline, ghost, link), 3 sizes, disabled states, on-dark surface
  - `_templates/components/Chips.html` — default/selected/kicker variants, filter group, status pills (success/warning/error)
  - `_templates/components/FormInputs.html` — text/select/textarea with all states (default, value, error, disabled); full real-world form example
- **`assets/css/components/Buttons.css`** — loading spinner state, icon/square variant, full-width modifier
- **`assets/css/components/Chips.css`** — colour-tinted variants (cyan, pink, amber, purple), removable chip pattern
- **`assets/css/components/FormInputs.css`** — input groups (prefix/suffix addons), custom checkbox/radio styling
- **`scripts/build-design-system.js`** — now calls `resolveComponentTokens` after section injection, enabling `{{component:X}}` composition tokens in all design-system section partials
- **Phase 1 gate verified** — `npm run build` and `npm run check` both pass with Node v26.0.0; legacy pages unchanged

- **`_templates/homepage.html`** — dedicated canonical homepage source template. This is now the authored source for homepage structure, while `index.html` is treated as a generated artifact during the build.
- **`_templates/homepage-about.html`** — dedicated homepage about fragment. Owns the founder/about section markup separately from the main homepage template.
- **`_templates/homepage-apply.html`** — dedicated homepage apply fragment. Owns the final CTA and lead-capture section markup separately from the main homepage template.
- **`_templates/homepage-who.html`** — dedicated homepage who fragment. Owns the qualification/fit section markup separately from the main homepage template.
- **`_templates/homepage-testimonials.html`** — dedicated homepage testimonial fragment. Owns the testimonial card markup and explicit testimonial component markers, separate from the main homepage template.
- **`_templates/homepage-trust.html`** — dedicated homepage trust fragment. Owns the trust/logo bar markup separately from the main homepage template.
- **`scripts/build-homepage.js`** — new homepage assembly step. Copies `_templates/homepage.html` to `index.html` before footer, testimonial, and hero-media mutation steps run.
- **`cohort.html`** — AI Implementation Cohort landing page. 8-week programme for senior leaders building practical AI capability with peer learning and expert guidance. Reuses proven patterns from `index.html` (hero with VSL placeholder, problem/solution structure, qualification section, cohort details, application form with metadata routing). Pricing: £2,000 + VAT per person. Starting week of 20th April 2026. 10 spaces available (12 total, 2 secured). Form includes capability gap question for qualification. Integrated with existing form infrastructure (`assets/js/forms.js`, `netlify/functions/lead-capture.js`) with `interest=cohort` and `source=cohort_page` metadata.
- **Mandatory Planning Workflow (AI-RULES.md §1.5)** — enforces plan → review → approve → implement → verify workflow for all non-trivial changes. Includes granularity requirement: break large initiatives into single atomic tasks. Violations result in immediate stop-work and rollback. Added to Agent behaviour contract (§6) and Definition of Done (§7).

### Removed

- **Homepage pathways section** — removed the unintended “Choose the right way to work with us” section from the live homepage because it was not approved for production and inaccurately described the current offer structure.
- **Campaign banner from `index.html`** — removed unapproved full-width promotional banner (lines 365-375) that was added without explicit approval in previous session.
- **`workshops.html`** — deleted entire file. Leadership Activation page will be created separately following proper planning workflow.
- **Workshops links from navigation** — removed "Workshops" from desktop and mobile navigation on both homepage and cohort page to prevent 404 errors.
- **Footer links to `/workshops.html` and `/cohort.html`** — removed from the live footer because `workshops.html` 404s and `cohort.html` is not fit for public traffic in its current state.
- **Inconsistent navigation IDs** — standardized all mobile navigation to use `mobile-nav-home` ID across homepage, cohort page, and Insights templates. Removed hardcoded Workshops links from `_templates/index.html` and `_templates/article.html`.
- **Missing nav.js script** — added `/assets/js/nav.js` to cohort page to enable mobile hamburger menu functionality.
- **Misaligned pink underline** — removed apply-underline SVG from "Apply for the next cohort" heading on cohort page due to alignment issues.
- **Programs links from navigation** — removed "Programs" link from desktop and mobile navigation on homepage and all Insights templates to make cohort page undiscoverable until complete.
- **Shared footer from `privacy.html` and `terms.html`** — removed the marketing footer from the legal pages so they remain lightweight standalone documents rather than conversion surfaces.
- **`.session-protocol.json`** — repo-level protocol profile for session lifecycle automation.
  Defines branch allowlist, quality-gate commands, managed documentation files, session log path,
  and session-end write/push policy for portable cross-repo adoption.
- **`scripts/session-protocol-utils.js`** — shared protocol helper module for branch matching,
  `CLAUDE.md` next-session block ensuring, and idempotent managed-doc session block upserts.
- **`scripts/test-session-protocols.js`** — protocol regression harness validating wildcard
  branch policy matching plus idempotent session block and priorities-block behavior.
- **`scripts/skills-sync.js`** — new shared-skills sync utility for multi-repo workflows.
  Pulls a canonical skills repo to local cache and installs skill folders into
  `~/.claude/skills` via symlink or copy mode. Tracks managed skills by namespace in
  `.managed-skills.json` for safe cleanup on updates.
- **`.agent-skills-profile.json`** — repo-level pointer config for canonical skills source,
  branch/tag, install path, sync mode, namespace, and optional naming prefix.
- **`docs/agent-skills-shared-ops.md`** — operational guide for managing one canonical skills
  repo across many project repos while keeping local CLI sessions consistent.
- **`llms.txt`** — AI-readable context file (llmstxt.org standard). Gives LLMs and AI crawlers
  structured context about Accelerator X: what we do, key pages, contact, and a pointer to the
  codebase. Complements `robots.txt` for AI systems that read structured site metadata.
- **AI agent Easter eggs** — repo made public; added orientation for AI systems reading the codebase:
  comment block in `index.html` for crawlers indexing the page source, comment in `robots.txt`
  pointing to `/llms.txt`, expanded `AGENTS.md` from a redirect stub to a substantive orientation
  document covering the engineering philosophy and onboarding steps.
- **Homepage testimonial marker hardening** — `scripts/build-testimonials.js` now injects homepage testimonials using explicit `TESTIMONIALS_COMPONENT_START` / `TESTIMONIALS_COMPONENT_END` markers only. Removed the brittle dependency on the first testimonial comment and section-tail string matching.

### Changed

- **`_templates/homepage.html`** — about section markup was extracted from the main homepage source into a dedicated fragment include token (`{{homepageAbout}}`).
- **`_templates/homepage.html`** — apply section markup was extracted from the main homepage source into a dedicated fragment include token (`{{homepageApply}}`).
- **`_templates/homepage.html`** — who section markup was extracted from the main homepage source into a dedicated fragment include token (`{{homepageWho}}`).
- **`_templates/homepage.html`** — testimonial card markup was extracted from the main homepage source into a dedicated fragment include token (`{{homepageTestimonials}}`), while keeping the testimonial section shell in place.
- **`_templates/homepage.html`** — trust section markup was extracted from the main homepage source into a dedicated fragment include token (`{{homepageTrust}}`).
- **`scripts/build-homepage.js`** — homepage assembly now resolves the `{{homepageAbout}}` token from `_templates/homepage-about.html` before writing `index.html`.
- **`scripts/build-homepage.js`** — homepage assembly now resolves the `{{homepageApply}}` token from `_templates/homepage-apply.html` before writing `index.html`.
- **`scripts/build-homepage.js`** — homepage assembly now resolves the `{{homepageWho}}` token from `_templates/homepage-who.html` before writing `index.html`.
- **`scripts/build-homepage.js`** — homepage assembly now resolves the `{{homepageTestimonials}}` token from `_templates/homepage-testimonials.html` before writing `index.html`.
- **`scripts/build-homepage.js`** — homepage assembly now also resolves the `{{homepageTrust}}` token from `_templates/homepage-trust.html` before writing `index.html`.
- **`package.json` build pipeline** — added `build:homepage` and made homepage assembly run before existing homepage mutators. This establishes a clear source-of-truth model without yet changing footer/testimonial/hero ownership.
- **`README.md`** — repo layout and build docs now clarify that `index.html` is a generated homepage artifact sourced from `_templates/homepage.html`.
- **`ROADMAP.md`** — homepage tech-debt item updated to reflect that the build architecture slice is in flight, while section/partial extraction remains pending.
- **`scripts/session-start.js`** — hardened with strict flag parsing, profile validation,
  branch-policy enforcement, stale cockpit checks, and structured severity-based output
  (`human` default, `--json` machine mode).
- **`scripts/session-end.js`** — hardened to safe-by-default execution: plan mode by default,
  explicit `--confirm-write` gating, optional `--dry-run`, prompt/`--yes` confirmation,
  scoped staging, quality-gate enforcement, policy-controlled push behavior, and idempotent
  single-block managed-doc updates (replaces append-style session markers).
- **`package.json`** — added explicit protocol command variants:
  `session-start:json`, `session-end:dry-run`, `session-end:write`, `session-end:write:yes`,
  and `test:session-protocols`.
- **Protocol docs** — updated `.claude/rules/session.md`, `CLAUDE.md`, and `README.md`
  to document safe-by-default session-end modes and profile-driven policy controls.
- **`package.json`** — added `skills:sync` and `skills:sync:force` scripts for standardised
  local skill sync from canonical source.
- **`README.md`** — added shared skills sync usage and linked the operations doc in
  source-of-truth references.
- **`AGENTS.md`** — expanded from a thin redirect to a full agent orientation document: quick
  orientation, engineering philosophy summary, and pre-work checklist (build, check, roadmap).
- **`README.md`** — fixed stale email capture description: newsletter flow now correctly documented
  as direct POST → `newsletter-subscribe` function (Netlify Forms bypassed since March 2026).
- **`package.json` build pipeline** — footer sync now runs after Insights generation so shared footer ownership applies to generated pages as well as static ones.
- **`scripts/build-footer.js`** — footer target collection now covers homepage, cohort, Insights index, and Insights articles, while explicitly excluding legal pages. Insights pages use a non-form footer variant to avoid duplicate newsletter IDs.
- **`scripts/test-site.js`** — regression coverage now enforces footer presence on homepage, cohort, Insights index, and Insights articles, while treating legal pages as standalone content pages.

### Fixed

- **Footer consistency across generated pages** — the shared footer now lands reliably on generated Insights pages because footer sync runs after the content hub build completes.
- **Google-source promo card** — temporarily disabled in both Insights templates by commenting out the current implementation pending a better design.

### Changed

- **`package.json`** — added `prepare` script: `git config core.hooksPath .githooks`.
  Runs after every `npm install` to activate committed hooks. No manual setup required.
- **`.env.example`** — canonical documentation of all five required environment variables
  with one-line explanations, where to obtain each value, and which function uses it.
  Closes the gap that contributed to the hardcoded `SLACK_WEBHOOK_URL` incident.
- **Check 7 in `scripts/check.js`** — CSS design token drift detection. Scans `styles.css`
  line by line, tracking `:root` block boundaries. Flags any hex colour used outside the
  token definitions. Found and fixed three pre-existing violations on first run.
- **Check 8 in `scripts/check.js`** — built HTML validation. Checks `insights/articles/*.html`
  for `<img>` tags missing `alt` attributes (a11y + SEO) and duplicate `id=` values per file.
- **`npm audit --audit-level=high`** in `.github/workflows/standards.yml` — dependency
  security scanning on every push. Fails CI on high or critical vulnerabilities.
- **Branch protection guide** in `AI-RULES.md §5` — documents the exact GitHub settings
  to enable (required status checks, up-to-date branches) for when PRs are adopted.

### Changed

- **`package.json`** — added `prepare` script: `git config core.hooksPath .githooks`.
  Runs after every `npm install` to activate committed hooks. No manual setup required.
- **`styles.css`** — fixed 3 hardcoded hex colours found by check 7: gradient in hero card
  (`#ffffff`, `#f8fafc` → `var(--color-background/surface)`), hero media background
  (`#e2e8f0` → `var(--color-border)`), testimonial stars (`#f5c542` → `var(--color-star)`).
  Added `--color-star: #f5c542` to `:root` design tokens.
- **`AI-RULES.md §Philosophy "We never"`** — two new classified rules: hardcoded hex colours
  outside design tokens (`check.js#7`), and built HTML with missing alt/duplicate IDs (`check.js#8`).

### Added

- **`scripts/check.js`** — codebase standards enforcement script (`npm run check`).
  Five checks derived from AI-RULES.md §Philosophy: no inline scripts in templates,
  no hardcoded secrets in functions, no unsubstituted build tokens in articles,
  no dead `<script src>` references, CHANGELOG [Unreleased] has content.
  Each check documents which rule it enforces and the real incident that prompted it.
- **`.git/hooks/pre-commit`** — local gate: runs `npm run check` before every commit.
  Blocks commits that violate codebase standards. Zero-dependency shell script.
- **`.github/workflows/standards.yml`** — CI gate: runs `npm run build` + `npm run check`
  on every push to `main`. Parallel jobs — either failure marks the push as failing.
- **Check 6 in `scripts/check.js`** — every "We never" rule in `AI-RULES.md` must be
  classified with `<!-- check: ... -->` or `<!-- not-automatable: reason -->`. Adding a
  rule without classifying it blocks the commit. A rule without enforcement is a wish.
- **`assets/js/hub-filter.js`** — extracted from inline script in `_templates/index.html`.
  Hub pathway tile filter and feed heading logic. `npm run check` caught this violation
  immediately on first run, demonstrating the gate working as intended.

### Changed

- **`_templates/index.html`** — inline `<script>` block replaced with
  `<script defer src="/assets/js/hub-filter.js">`. Codebase now has zero inline scripts.
- **`AI-RULES.md §2`** — Philosophy section added. Core principle: move fast by not
  making messes. Standards enforced by automation. Comments co-located, proportional,
  and pointing. Full "We never" list with six hard rules.

### Security

- **Slack webhook URL moved to env var** — removed hardcoded URL from `netlify/functions/submission-created.js`
  and `netlify/functions/newsletter-subscribe.js`; both now read `process.env.SLACK_WEBHOOK_URL`.
  Env var must be set in Netlify dashboard.

### Removed

- **Ghost `handleNewsletterSignup()`** — deleted from `submission-created.js`; newsletter signups are
  handled exclusively by `newsletter-subscribe.js` via direct JSON POST. Removes dead code and
  eliminates the stale Netlify Forms → Brevo path.
- **`newsletter-thanks.html`** — dead redirect page; no form points to it since switching to
  direct-function posting.

### Changed

- **`_templates/article.html`** — inline `<script>` block replaced with `<script defer src="/assets/js/article-init.js">`.
  Block reveal logic (BLUF box, nurture-trap, momentum footer) now lives in the external file.
  Token values moved to `data-bluf`, `data-cta`, `data-next` attributes on the container divs.
- **Contract comments** — both Netlify functions now have clear header comments documenting
  triggers, responsibilities, env var requirements, and the `{ success: true }` contract.

### Added

- **`assets/js/article-init.js`** — new file; reads `data-*` attributes on article page containers
  and removes `hidden` class where build-time token substitution produced a non-empty value.
- **JSDoc** on 7 public functions in `scripts/build-hub.js`: `loadTemplate`, `resolveSiteUrl`,
  `loadAuthors`, `resolveAuthorProfile`, `renderSharePanel`, `generateSitemap`, `build`.
- **ROADMAP tech debt section** — 4 deferred items added: styles.css split, index.html partials,
  hub-filter.js extraction, Netlify function tests.

### Added

- **Brevo email infrastructure** — `mail.accelerator-x.ai` subdomain authenticated (SPF/DKIM);
  sender identity `newsletter@mail.accelerator-x.ai` / Accelerator-X Team configured
- **Welcome email automation** — Brevo list #9 trigger: contact added → send welcome email.
  Subject: "You're in — here's what to expect from Accelerator X". Single opt-in.
- **`netlify/functions/newsletter-subscribe.js`** — new standalone function; accepts direct
  JSON POST from newsletter forms; adds contact to Brevo list #9; notifies Slack `#website-leads`.
  Source field distinguishes origin: `landing_newsletter` / `insights_article` / `insights_hub`.
- **`BREVO_API_KEY`** — added to Netlify env vars; end-to-end tested ✅

### Changed

- **Newsletter forms bypass Netlify Forms** — `newsletter-signup` (homepage),
  `insights-subscribe` (article pages + hub index) now POST directly to
  `/.netlify/functions/newsletter-subscribe`. Eliminates 100/month Netlify Forms limit.
  Honeypot spam field retained.
- `docs/navigation-architecture-thesis.md` — new strategic thesis: arrival states framework,
  competitive nav analysis (Stripe, Intercom, Notion, Linear), organising schemes, mobile
  patterns, search integration, measurement framework (First-Click Success Rate), PostHog
  navigation tracking snippets, phased evolution path
- `docs/world-class-landing-pages-thesis.md` — expanded with: Arrival States Framework,
  One-Click Clarity Principle, Navigation as Diagnostic Tool, Search Integration Challenge,
  Mobile Navigation Challenge, First-Click Success Rate metric added to success metrics

---

## [1.0.0] — 2026-03-17 · Public launch

Site went live at `https://accelerator-x.ai`.

### Added

- **Article JSON-LD structured data** — `Article` schema on all 6 articles: headline,
  description, image, datePublished, author (with LinkedIn URL), publisher
- **OG meta tags on articles** — `og:url`, `article:author`, `article:published_time`
  added to article template; all articles regenerated
- **LinkedIn author URLs** — stored in `content/data/authors.json` for Andy + Toby
- **Build-time OG excerpt validator** — `build-hub.js` warns if article excerpt < 100 chars
- **`sitemap.xml`** — auto-generated by `npm run build`; all 8 URLs included with `lastmod`
- **`robots.txt`** — permissive, references sitemap
- **Netlify Functions** — `netlify/functions/submission-created.js`: routes form submissions
  to Brevo (list #9) and Slack `#website-leads`
- **Hero pill badges** — configurable via `content/data/hero-media.config.json`
- **Hero Media Library System** — config-driven homepage hero cycling with drop-in
  source folder workflow, responsive variants, performance-safe lazy loading
  (`content/hero-source/` → `npm run process:hero-images` → `npm run build`)
- **Google Search Console** — `accelerator-x.ai` domain property verified (manual, Andy)

### Changed

- Hero pill copy: "Boardroom clarity" + "Hands-on support" (no full stops)
- Homepage JSON-LD price corrected: 8-week cycle → £12,000 (was £25,000)
- LinkedIn company URL corrected in footer + JSON-LD → `linkedin.com/company/accelerator-x-uk/`
- Page `<title>` expanded: "Accelerator X — AI Transformation for Business Leaders"
- Excerpt for `the-implementation-gap` extended to meet 100-char OG minimum
- Email capture switched from GoHighLevel to **Brevo** (list #9)
- Testimonials generated from `content/data/testimonials.json` at build time
- PostHog product analytics wired to production workspace

### Fixed

- `AX-image-04-rounded.png` (5.8 MB) now served as optimised WebP (45.9 KB)
- All `<img>` tags given `width`/`height`/`loading`/`decoding` attributes (CLS prevention)

---

## [0.2.0] — 2026-02-23 · Image pipeline, design system clean-up

### Added

- `scripts/img-process.sh` — resize source PNG to 800w/400w + WebP conversion via `cwebp`
- `scripts/img-audit.sh` — pre-publish audit; exits 1 on oversized images, missing `<img>`
  attributes, or large unresponsive sources
- Optimised responsive variants of `AX-image-04-rounded` (800w/400w · WebP + PNG fallback)
- §7 Image Standards added to `docs/design-system.md`
- Image pipeline guidance added to `AI-RULES.md` (§3 Allowed, §4 Verification, §10 Decision log)

### Changed

- Section 2 hero image converted to `<picture>` element with WebP source, PNG fallback,
  `srcset`, `sizes`, intrinsic dimensions, and `loading="eager"`
- `.legal-card` hardcoded hex values replaced with CSS design tokens (`var(--color-*)`)
- Diff-card grid `style="padding-top: 4rem;"` inline style replaced with Tailwind `pt-16`

### Fixed

- Header logo HTML `width` attribute without `w-auto` class caused full-width stretch

---

## [0.1.0] — 2026-02-22 · Brand pack, typography, section styling

### Added

- Self-hosted Aptos font (brand alignment)
- Brand pack assets applied across site
- Differentiators section with brand illustrations
- Process section with pastel cards and step indicators
- Problem section with two-column layout and illustration
- `docs/design-system.md` — design system reference
- `AI-RULES.md` — AI agent rules and decision log
- `netlify.toml` — cache headers and security headers
- `docs/landing-page-spec.md` — phased product spec (Phases 1–3)

### Changed

- Apply section underline restyled to hand-drawn pattern
- Diff-cards: mobile top margin added to clear illustration overlap

---

_Project started: February 2026_

<!-- Session 20260322-211525 logged -->

<!-- Session 20260322-234000 logged -->

<!-- Session 20260322-235352 logged -->

<!-- Session 20260329-180314 logged -->

<!-- SESSION_PROTOCOL:START -->
- Session ID: 20260706-232943
- Updated: 2026-07-06T22:29:44.936Z
- Mode: write
<!-- SESSION_PROTOCOL:END -->
