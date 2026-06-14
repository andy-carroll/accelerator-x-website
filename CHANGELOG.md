# Changelog

All notable changes to this project are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)

---

## [Unreleased]

_Active track: `rebuild/v2` — full visual + structural rebuild. `main` is live and untouched._
_Phase 3 Page Assembly complete — all 4 inner pages assembled; homepage v2 conversion done_

### Changed

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

- **Leadership AI Coaching hub (Door 2 landing page)** (2026-06-14, [#64](https://github.com/andy-carroll/accelerator-x-website/issues/64)): Door 1 (Company Enablement) had a landing page; Door 2 was three coaching offerings with no home above them — a wayfinding + SEO/AEO gap, and the reason "which door is clickable" was unclear in TwoDoors. New hub at **`/what-we-do/leadership-ai-coaching/`** (`_templates/offerings/leadership-ai-coaching.html` + `LeadershipCoaching.css`): hero with the canon "one lane, three depths" positioning → three **clearly clickable** depth cards (full `<a>`, arrow affordance, hover lift) linking down to the existing offering pages (1:1 / leadership team / open cohort) → shared-DOTS-engine + guarantee band → CTA. All names/prices/durations are `{{offering:*}}` tokens (no drift). SEO: keyword-targeted title/description ("Leadership AI Coaching & Training"), Service + ItemList JSON-LD (hub-and-spoke). Tonal rhythm `off-white → champagne → navy → champagne → navy`. The 3 offering URLs are unchanged (hub links to them). Build + all 10 checks green. **First pass** — remaining: wire TwoDoors Door 2 → hub + fix its CTA/tile affordance, add the #63 How We Work signpost → hub, and deeper AEO/company-enablement hub parity (#64).

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
- Session ID: 20260614-200010
- Updated: 2026-06-14T19:00:12.289Z
- Mode: write
<!-- SESSION_PROTOCOL:END -->
