# Architecture & repo review — 2026-07-04

Two point-in-time assessments: an independent review at session start, and a re-score after the
same-session hardening batch it prompted (#78). Captured here because the reasoning — why each
dimension scored what it did, and what specifically closes the remaining gap — only existed in
chat and would have been lost on archive. See `CHANGELOG.md` (2026-07-04 entries) and closed issue
[#78](https://github.com/andy-carroll/accelerator-x-website/issues/78) for the implementation detail
this review drove.

## Method

Three parallel agent reviews (build pipeline, front-end architecture, infra/security/ops), every
load-bearing claim independently re-verified against the code before scoring — not taken on the
reviewing agents' word. Six dimensions, weighted for what this repo actually is: a
conversion-critical static marketing site maintained by one human + agents, not a VC-scale
platform.

## Scorecard: before (session start) vs after (post-hardening-batch)

| Dimension | Weight | Before | After | What moved it |
|---|---|---|---|---|
| Ops, process & docs | 20% | 9.5 | 9.5 | Unchanged — the incident-driven 10-check standards battery, session protocols, and issue discipline were already the strongest part of the repo. This session's own self-correction (catching and honestly documenting a bug in its own first-pass fix — see the netlify.toml cache-tier entry below) was a live stress-test of that discipline holding up under real conditions, not just in theory. Confirms the score rather than moving it. |
| Architecture / single-source-of-truth | 20% | 8 | 8.5 | `build-hub.js`'s silent-empty-string token gap closed (articles now fail-fast like every other resolver). Marker-injection duplication across `build-testimonials.js`/`build-hero-media.js`/`build-footer.js` and the lack of atomic/staged build writes were identified but explicitly deferred — tracked as [#79](https://github.com/andy-carroll/accelerator-x-website/issues/79), not fixed, so the dimension moved a half-point, not a full one. |
| Code quality (JS/CSS/functions) | 20% | 7.5 | 8 | Nav drawer focus-restore fixed (WCAG 2.4.3). `hub-filter.js`'s Tailwind-utility-classes-as-state-flags coupling and forms.js's lack of field-level error messages were flagged but untouched. |
| Security | 15% | 6 | 8 | The two biggest gaps closed: no CSP → added (with the site-wide inline `onload` handler hash-authorised, PostHog/Google Fonts origins scoped); unvalidated/unescaped function inputs → payload-size guards, explicit JSON-parse guards, Slack mrkdwn escaping with field-length caps on both functions. Plus the standout addition: distinct Slack alerts on GNG-1 (Airtable consent-write) and Brevo write failure — closing the exact silent-failure class that caused the 2026-06-27 incident. Remaining gap: no rate limiting on the two public functions. |
| Performance | 15% | 5.5 | 7 | The two items that actually moved the needle: the cache-header footgun (year-long `immutable` caching with no filename fingerprinting — a real staleness bug) and the 24-stylesheet-per-page load. Both fixed and verified live. Still open, correctly left alone as bigger/riskier: Google Fonts CDN render-blocking (tracked separately), `styles.css` (v1) dead weight still loaded on every page (deferred to the cutover PR, [#44](https://github.com/andy-carroll/accelerator-x-website/issues/44) — confirmed via this session's usage audit that some of it, e.g. the hero-slideshow and scroll-reveal classes, is a genuine live v2 dependency, not just cruft), and the Tailwind keep-or-drop decision. |
| Testing | 10% | 5 | 7 | The money path (lead-capture + newsletter-subscribe) went from zero automated coverage to 16 `node:test` cases wired into CI — including the exact GNG-1 consent-field contract and the 2026-06-27 dead-Brevo-key failure shape. Build scripts and the new CSS bundler still have no automated tests, only manual/live verification. |

**Overall: 7.0 → ~8.0–8.2 / 10.**

## What it would take to reach 8.5–9

In priority order, the items deliberately left alone this session because they're bigger or
riskier than a same-day fix:

1. **`styles.css` (v1) removal** — [#44](https://github.com/andy-carroll/accelerator-x-website/issues/44), deferred to the cutover PR by design (touching the live branch's shared CSS mid-stream is exactly the kind of piecemeal change the cutover model exists to avoid). This session's usage audit (posted to #44) gives whoever picks this up a real map instead of a guess: which classes are genuinely still load-bearing (the scroll-reveal and hero-slideshow classes) vs. safe to delete outright.
2. **Font self-hosting** — Google Fonts CDN is still render-blocking; tracked separately, not part of this batch.
3. **The Tailwind keep-or-drop decision** — components barely use Tailwind utilities in practice (most layout is hand-written component CSS); either commit to it properly or drop the ~24KB parse cost. Needs Andy's call, not an engineering unilateral.
4. **Rate limiting** on `lead-capture` and `newsletter-subscribe` — the last open security gap from the original review.
5. **[#79](https://github.com/andy-carroll/accelerator-x-website/issues/79) / [#80](https://github.com/andy-carroll/accelerator-x-website/issues/80)** — marker-injection consolidation + atomic build writes; CHANGELOG rotation policy. Lower-value, lower-urgency than the above four.

## A meta-finding worth keeping

This document exists because of a gap in the session-close protocol itself: neither this repo's
native session-end script nor the generic portable version has a step that *forces* recognition of
"this session produced an assessment/scorecard with standalone value" as something that must be
written down — it relies on the closing agent's in-the-moment judgment to classify it as a
structural decision. The individual fixes from this session's review did get logged (see the
session log and CHANGELOG); the review's own reasoning almost didn't, because a scorecard reads as
"analysis" rather than "decision" at a glance. Worth flagging if the session-end protocol is ever
revised: add an explicit check — *did this session produce a review, audit, or scorecard with
findings beyond what's already in the diff? If so, it gets a doc, not just a chat answer.*
