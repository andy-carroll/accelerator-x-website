# Accelerator X — Offer Canon

> **Status: CANONICAL SOURCE OF TRUTH for what we offer.** Version 0.3 (draft) — 2026-06-14.
> This document supersedes `ax-offering-architecture.md` and `ax-canonical-offer-strategy.md`.
> The website **derives** from this and from its machine-readable companion `content/data/offerings.json`.
> **Do not edit offering names, prices, durations, or descriptions on the website directly** — change them here, then in `offerings.json`, and let the build propagate.
>
> Markers used in this draft:
> **⚠️ DECISION (Andy+Toby)** = an open founder decision, not yet resolved.
> **🔧 RECONCILE** = a value that conflicts across legacy sources and needs locking.
> **🟡 FAQ-SEED** = raised here; the answer is authored in the FAQ/objection bank (Phase 4).

---

## 1. What we do

We **build human capability with AI systems** — capability designed around your business, your people, and your challenges. We are **anti-agency and anti-consultancy** in the traditional sense: we build capability that *stays with the client*, not dependency on us.

Three promises carry the positioning (customer-tested language, from `landing-page-copy.md`):

- **We build capability, not dependency.** The best outcome is that you outgrow us.
- **We deliver results, not recommendations.** We do the work *with* you — we don't hand over a deck and disappear.
- **We stay until the job is done.** One cycle or a year — no lock-in, no dragging it out.

**Tagline candidates** (from the design + copy): *"A clear path from overwhelmed to operational."* · *"Partners who understand you."*

---

## 2. Who it's for (ICP) — and who it isn't

**Primary ICP** (from `ax-canonical-offer-strategy.md`, the dossier, and 50+ exec research in `world-class-landing-pages-thesis.md`):

- Senior decision-makers — **CEO, founder, MD, C-suite, director** — who can say yes without endless procurement.
- Know AI matters and is **time-sensitive**; want **fundamental, lasting change**, not a quick fix.
- **Cognitively overloaded** by AI hype, **strategically cautious** after stalled transformations, **time-starved**, and **sceptical of yet another "expert."**
- Willing to invest properly — time, budget, execution. Value a **direct relationship over a vendor process.**

**Disqualifiers (this is *not* for you if):**

- You want someone to build a chatbot and disappear.
- You're looking for the cheapest option / want to run it through procurement and pick the lowest bid.
- You think AI transformation happens in a few weeks.
- You want free strategy with no intent to execute.

> The ICP is **psychographic** (ready-to-commit mindset), not demographic. Price is a **qualification filter**, not a lever to discount.

---

## 3. The spine: Two Doors in

> **This is the carrier signal of the entire offer.** Recovered verbatim from the locked design (`home-b-v2.jsx`, §05 "Two doors in" — *"Pick your starting point."*). Everything below hangs off it. The built site expanded this into a six-row decision tree that muddied it; the Canon restores the two doors.

The right starting point depends on **what you're trying to move — yourself, your leadership team, or your whole business.**

> **It's a menu, not an either/or (Andy, 2026-06-14).** The Doors are *entry points*, not lanes you're locked into. Clients routinely run **two, three, or four offerings in parallel** — that's often where they find the most value. (Live example: a client running full Company Enablement *and* the in-house exec-team cohort *and* 1:1 founder coaching at the same time.) The job of the website is to give a clear place to **start**, while making obvious that the rest is available and frequently combined. Routing copy should say "start here" — never imply "pick one only."

### 🚪 Door 1 — "For your business" → **Company Enablement**
> *"Three workshops plus an AI strategy playback. Aligns leadership, activates the team, and leaves you with a costed 90-day plan — whether you continue with us or not."*
Everyone starts at **Phase 0** (2 weeks, from £5,000), then **Phase 1+ Transformation Cycles** (8 weeks each, from £20k) as far as you want to go.

### 🚪 Door 2 — "For yourself or your leadership team" → **Leadership AI Coaching**
> *"Workshops, peer accountability, and DOTS applied to your own context. The fastest way to build personal AI capability."*
One lane, **three formats** (see §4.2): **1:1 / very small group · your exec team (closed) · open cross-company cohort.**

### ↘ Tertiary callout — **Talks & Events**
> *"I need someone to lead a big AI moment."* Keynotes, leadership offsites, hackathons. First-class, not buried.

> **⚠️ DECISION (Andy+Toby):** The design also had an *"Already running AI internally? → Fractional AI Advisory (monthly)"* strip. **Ruled this session: dropped from v2** until it's a real, priced offering. Recorded in `offerings.json` as `status: retired-for-v2`.

---

## 4. The offer set

> Each offering below carries its **approved customer-facing language** (from the built detail pages, which the founders confirmed are the closest thing to the real offer). Prices marked 🔧 need reconciling — see §5.

### 4.1 · Door 1 — Company Enablement *(flagship for businesses)*

**Customer line:** *"How a company moves with us."* Two phases. The first aligns and activates in two weeks; the second ships capability, cycle by cycle, until you're self-sufficient. **Everyone starts with Phase 0.**

**Phase 0 — "Two weeks to clarity."** 2 weeks · 3 workshops + 1 playback · **from £5,000** (the floor).
1. **Executive DOTS** — half-day with your leadership team (Dream / Obstacles / Triage / Sequence).
2. **Team activation** — wider function session (10–40 people); leadership decision becomes team adoption.
3. **Strategy playback** — costed 90-day roadmap; Phase 1 scope agreed (or not).
*You walk away with:* a 90-day roadmap, use cases evaluated, aligned leadership, an activated team. *"A roadmap you can defend."*

**Phase 1+ Transformation Cycles — "Eight-week cycles. One capability at a time."** 8 weeks/cycle · **from £20,000/cycle** 🔧 *(dossier cites £20–25k — RECONCILE)*. Three streams every cycle: **People** ("train your operators"), **Process** ("change the rituals"), **Product** ("ship the thing"). Cycles chain: Cycle 01 → 02 → N → Advisory (when self-sufficient).
🟡 FAQ-SEED: *"Can we skip Phase 0?"* · *"Can cycles run in parallel?"* · *"What's the '+' in Phase 1+?"*

### 4.2 · Door 2 — Leadership AI Coaching *(one lane, three formats)*

> **✅ NAMES DECIDED (Andy, 2026-06-14) — "Ronseal" titles + an explanatory subtitle each:**
> • **1:1 Exec AI Fast Track Coaching** — *A bespoke 6-week 1:1 sprint that takes AI work off your plate.*
> • **Leadership Team AI Activation** — *Eight weeks with your leadership team, in-house, to one shared way of working with AI.*
> • **Open Cohort AI Bootcamp for Business Leaders** — *Eight weeks of AI in a room of non-competing peers — one shipped artefact.*
> Same DOTS engine, three depths: on your own / your team (closed) / with peers (open). Slugs/keys unchanged until Phase 5.

**Format A — 1:1 Exec AI Fast Track Coaching** *(name decided 2026-06-14; very-small-group on request. Built page is STALE — was "Senior Leader Acceleration", 12wk/£12k/90-min; update in Phase 5.)*
*Elite, high-touch, fully bespoke.* **6 weeks** · weekly **75-min** private remote sessions + continuous async support (Slack/WhatsApp/Loom) · dedicated founder coach · **from £10,000 per individual** *(locked 2026-06-14; premium, scarce inventory; small-group variant possible)*.
**The promise: we take things off your plate, not add something new to learn.** Begins with a rigorous async **audit** of your day-to-day to find the highest-ROI AI integration points (inbox triage, strategy synthesis, managing direct reports, strategic decision-making & comms). You build **proprietary workflows, custom instructions, and personal AI assistants** tuned to your leadership style and the company's tech stack — **at your pace, not a group's.** Confidential.
🟡 FAQ-SEED: *"Why £8–10k 1:1 when a cohort place is £3k?"* → opportunity cost (a cohort fills 10–12 seats), plus bespoke + your-pace + done-with-you (answered in §7).

**Format B — Leadership Team AI Activation** *(your exec team, closed, single company; name decided 2026-06-14, was "Leadership Activation")*
*"A leadership team that moves together."* 8 weeks · bi-weekly half-days · on-site · up to 12 leaders from one organisation · **base £15,000 (up to 6 people) + £2,000 per person above 6, max 12 → range £15k–£27k** *(model decided 2026-06-14; built page stale at £18k flat / 5–10 people)*.
*"Your team, not a peer cohort. We come to you."* You leave with one shared AI operating model, a team-level artefact, aligned leadership.

**Format C — Open Cohort AI Bootcamp for Business Leaders ⭐ FLAGSHIP** *(name decided 2026-06-14, was "Leadership Cohort")*
*"Eight weeks of AI in a room of your peers."* 8 weeks · ~4 hrs/week · in-person + Zoom hybrid · 12 places, vetted non-competing · **from £3,500 per place** *(confirmed correct by Andy)*.
*"A founder-led cohort for senior leaders who'd rather lead the AI conversation than be led by it."* You leave with a personal AI operating model, a shipped artefact, a peer network, and DOTS turned inward.
🟡 FAQ-SEED: *"I don't have 4 hours a week"* · *"What if a competitor applies?"* · *"Can my whole team join?"* · *"What if I miss a session?"*

> **The relationship to make obvious in copy (Andy's design intent):** same underlying process (DOTS), three depths — on your own (A), your team behind closed doors (B), or alongside peers from other companies (C).

### 4.3 · Talks & Events *(first-class — revived this session)*

**Customer line:** *"Move a room. In an afternoon."* *"High-impact AI events for conferences, leadership offsites, and senior partnerships… not talks — hands-on activation moments."* Three formats (from `events.jsx`):
- **AI Keynote** — 45–90 min, up to 2,000. *"A high-signal, low-fluff main-stage talk… what matters and what to do on Monday."*
- **Leadership Offsite** — half/full day, 10–40 leaders. Live DOTS; leaders leave with a 90-day plan. *(Natural hand-off into Phase 0.)*
- **AI Hackathon** — 4–8 hrs, 40–200. Hands-on Claude hackathon around your real work.
> **✅ DECIDED (Andy, 2026-06-14):** the three formats are confirmed. **No prices — price on application.** Events are too situation-dependent for a number (e.g. £25k for two AI hackathon offsites + travel/accommodation). Present **inquiry-led** — *"tell us the moment you want to create"* — not an events calendar. The Leadership Offsite is also the answer for anyone wanting a one-off workshop.

### 4.4 · Fractional AI Advisory — *retired for v2*
In the design as a tertiary callout (£6k/mo) but **never built** (no page, no confirmed model/price). **Dropped from v2 routing** this session. Kept in `offerings.json` as `status: retired-for-v2` so the decision is documented, not lost. Revisit post-launch.

---

## 5. Pricing — rules & the numbers to lock

**Philosophy** (from `ax-canonical-offer-strategy.md` + dossier): value-first, then price. Quoted prices are **"the floor"** — they flex by business size, delivery complexity, travel/on-site, and scope. **No discount-led positioning.** **ROI — decided 2026-06-14: no published multiple.** We will **not** put "10x / £25k → £250k" on the site. It's unmeasured — it traces to one client saying we saved them ~4 hires (≈ £250k/yr), which is a great *anecdote* but not a measured metric, and baseless multiples cost credibility. Copy frames value as *how we measure it* (baseline → what moved → attribution), not a number. **Near-term priority: rigorously measure one real engagement and publish that.**

**VAT (decided 2026-06-14):** all prices quoted **"+VAT"** (exclusive) — the UK B2B norm; VAT-registered clients reclaim it, so it's immaterial to the buyer. **One site-wide footnote** handles the international case (B2B place-of-supply: non-UK businesses are not charged UK VAT) — e.g. *"Prices exclude VAT. UK VAT added where applicable; international clients billed per place-of-supply rules."* No per-price VAT logic, no VAT-inclusive pricing.

**Risk reversal / guarantee (decided 2026-06-14 — keep prominent; powerful trust signal):**
- **Company Enablement / Phase 0:** a **full, no-questions money-back guarantee** if you don't find the **first session** (the 2.5–3hr senior-leadership-team DOTS workshop) comfortably in line with or exceeding expectations. Tell us on the day or within 48 hours — no hoops; we may just ask why. (That session is a full day of our time with prep, travel and facilitation — the guarantee is genuine, not theatre.)
- **Coaching (all three formats):** **full money-back through your first two sessions** — quit before the third, no questions asked, money back.
- Beyond the guarantee window: **no lock-in** — engagements run a cycle at a time; you decide if there's a next one.

**IP / data (decided 2026-06-14 — keep it light on the site, no NDA detail):** **what you build is yours.** Frameworks/tools we share are yours to use freely across your business and personal life — the only restriction is no reselling or running them as a competing service. 1:1 work is confidential. NDAs/DPAs handled directly with the client's team, not on the website.

**Procurement / discounting (light touch):** we don't compete on discount — price reflects value and tends to move **up**, not down. We can work within a required formal process (done before, incl. a global financial consulting firm); a heavier process usually means more scope, which the price reflects. Don't over-explain this on the site.

**🔧 RECONCILE — legacy sources disagree; founders must lock (#23):**

| Offering | Built page | Strategy/dossier | Canon working value | Status |
|---|---|---|---|---|
| Open cohort (per place) | £3,500 | £8,000 (old table) | **£3,500** | ✅ Andy confirmed |
| 1:1 (6 weeks) | £12k (stale page) | £4k/mo or £10k (design) | **from £10,000 / individual** | ✅ Andy 2026-06-14 |
| Leadership Team AI Activation | £18k (stale) | — | **base £15k (≤6) + £2k/head, max 12 → £15–27k** | ✅ Andy 2026-06-14 |
| Company Enablement Phase 0 | £5,000 | £2k–£9k typical | **from £5,000** | ✅ Andy 2026-06-14 |
| Phase 1+ cycle | £20,000 | £20–25k | **from £20,000/cycle** | ✅ Andy 2026-06-14 |
| Half-day workshop ("from £2k") | — | £2k–£5k (design) | **RETIRED** | ✅ Andy 2026-06-14 — not listed |
| Events | — | ~£10k (dossier) | TBC | ⚠️ confirm |

**✅ DECIDED (Andy, 2026-06-14):** The standalone half-day workshop is **retired** — not a listed offering. Workshops live *inside* Phase 0 and Leadership Team AI Activation; standalone facilitated sessions are the Talks & Events **Leadership Offsite**; genuine one-offs are handled ad hoc on request. **Public headline price = "from £3,500 +VAT"** (the cohort place — the lowest honest entry, and a healthier anchor than £2k).

---

## 6. The method (the spine under every offering)

### DOTS — the connective tissue
*"Four moves — connected — that take a leadership team from overwhelmed and confused to clear and aligned. Fast."* (`dots-method.jsx`). **D**ream · **O**bstacles · **T**riage · **S**equence. *"It's the spine of every engagement we run — workshops, cohorts, Phase 0, transformation cycles, even keynotes."* A dedicated `/how-we-work/dots` page is designed. DOTS should be **front and centre**, not buried.

Why it works (verbatim): *ambition before friction* · *honest filtering* (the wasted year hides in O+T) · *sequence over strategy* (a 90-day plan that survives contact with reality beats a 30-page deck nobody acts on).

### The Capability Curve — the development framework
Five levels a client moves through (`ax-offering-architecture.md`): **1 Context & Communicate** (CRISP prompting) · **2 System & Plan** *(the centrepiece — AI as a genuine thinking partner; where the real value begins)* · **3 Codify** (reusable assets) · **4 Automate & Combine** · **5 Scale** (org-wide, self-sustaining). DOTS lives at the System & Plan level; TSS (Tools × Skills × Systems) is the underlying, non-client-facing logic.

> Both frameworks live here per this session's decision (one doc, no separate method-canon for now).

---

## 7. FAQ / objection bank

> **Generated by the 2026-06-14 multi-persona adversarial pass** (4 ideal-customer viewpoints → synthesis). Draft answers are grounded only in this Canon, in the AX voice (honest, anti-agency, *"great that you asked"*). **⚠️ = answer depends on an open founder decision** (pricing, proof, guarantee mechanics, naming, events) — do not publish until resolved.
> **Principle (Andy):** ~95% of questions are repeats — answer them on the page, *"great that you asked."* FAQs are **first-class across the site**, not buried. Add **FAQPage JSON-LD** so AI assistants extract them.

### Positioning / "is this real?" (homepage + /what-we-do)

- **Is this another agency sales funnel dressed up in nicer language?** — Healthy suspicion, and the only real answer is what we do rather than what we say. We're anti-agency by design: we do the work *with* you, not for you; what we build stays as your capability; and the explicit aim is that you outgrow us. Phase 0's roadmap is yours whether you continue or not — a strange thing to hand over if the goal were to trap you. Hold us to those three.
- **Is this strategy-level work or just AI tool demos?** — Strategy-level. The spine of every engagement is **DOTS** — Dream, Obstacles, Triage, Sequence — that takes a leadership team from overwhelmed to a 90-day plan that survives contact with reality. Tools come in only in service of capability your people keep. Ask to see what an Executive DOTS session actually produces.
- **⚠️ Who have you actually done this with? Can you show me named clients and outcomes, and could I speak to one?** — Great that you asked — first thing we'd want to know too. *[FOUNDER INPUT: real proof exists (Mark Bennett / Alastair Constance / David Carry / Charlotte Steedman) but is not yet woven into the offer narrative — see §7.5 #1.]* We won't invent clients to look bigger than we are; we'd rather show real work on a call and connect you with someone we've worked with. If proof is the thing standing between us, say so and we'll lead with it.
- **⚠️ Who are you two? What have Toby and Andy actually built or run that earns the right to coach my exec team?** — Completely reasonable — never take AI direction from a self-appointed expert. Coaching is deliberately founder-led: your coach is Toby or Andy, not a junior. *[FOUNDER INPUT: needs real pedigree on About page — see §7.5 #1.]* If pedigree is the deciding factor, ask us directly.

### Pricing

- **⚠️ Your prices all say "from." What's the actual number for me — and is it plus VAT?** — "From" shouldn't mean "unknowable." The floors are genuine: cohort from £3,500/place, Phase 0 from £5,000, cycles from £20,000 each. They flex with size, on-site/travel and scope — a 2-week Phase 0 for a 30-person firm and a 2,000-person one aren't the same job. Tell us the shape and we'll give a real figure. *[FOUNDER INPUT: lock VAT treatment + remaining numbers.]*
- **What ROI can I expect, and how do you measure value?** — Honest answer: we don't put an ROI multiple on this page, because we haven't measured one rigorously enough to stand behind — and an unbacked number is exactly what we're allergic to. What we *will* do is agree up front how we measure value in your context — baseline, what changes, how it's attributed — so any number you take to your board is one you can defend. (Measuring and publishing a real, verified outcome is a priority we're actively working on.)
- **⚠️ What's the realistic 12-month all-in cost for a company my size?** — Building blocks are public: Phase 0 from £5,000, then cycles from £20,000 each, chained only as far as you choose. We don't publish a fixed annual figure because the right number of cycles depends on what you're moving — but ask and we'll build a worked 12-month scenario with an upper bound you can take to finance.

### Company Enablement (Door 1)

- **Do I have to pick just one? Can we run more than one at the same time?** — Not at all — and most of our highest-value relationships don't. The Doors are just a clear place to *start*; the rest is a menu. Plenty of clients run several at once — for example full Company Enablement across the business, the in-house cohort for the exec team, and 1:1 coaching for a leader carrying the most — because they reinforce each other. Start where it's clearest, and add what helps.
- **What's the difference between Company Enablement and the closed exec-team coaching? Both work with my leadership team.** — The most common confusion, so thank you for naming it. Company Enablement (Door 1) moves your **whole business** — it starts by aligning leadership but its job is to activate your wider team and ship capability across the org, cycle by cycle. The closed exec-team format (Door 2 B) is narrower and deeper: it builds the AI capability of your **leadership group itself**. Rule of thumb: Door 1 for org-wide change; exec-team format for upskilling your leaders specifically.
- **If I do Phase 0 and stop, what do I walk away owning — and isn't a 90-day roadmap just the deck you say you don't do?** — The contradiction worth pushing on. Phase 0 leaves you a costed 90-day roadmap, use cases evaluated, aligned leadership and an activated team — yours whether you continue or not. The difference from a consultant's deck: it comes out of doing the work *with* your leadership and team in the room (Executive DOTS + team activation), built to execute yourselves. Stopping after Phase 0 is a legitimate outcome, not a failed sale.
- **Can I skip Phase 0?** — Everyone starts with Phase 0, for a reason: it's where we get genuinely aligned and produce the costed roadmap — without it, a cycle is building on guesses. It's also your lowest-risk way in: if the playback isn't defensible, you've learned that for a floor of £5,000, not after committing to cycles.
- **Isn't "we stay until the job is done" + endless chained cycles just the engagement creep you claim to be against?** — Fair tension. The difference is who controls the next cycle: each is scoped to ship a specific capability, and *you* decide if there's a next one — the goal is that you stop needing us. If a cycle ever feels like a treadmill, that's our failure, and no-lock-in means you can act on it.
- **What does my team actually keep doing without you 6 and 12 months later?** — The whole point. We do the work *with* your people: what stays is a shared AI operating model, your people trained as operators, changed rituals, and shipped artefacts they built. Cycles chain only as far as you want, then taper into light advisory once you're self-sufficient.
- **How do you measure success during an engagement, and what reporting do I get for my exec team?** — You need evidence between sessions, not just at the end. Every cycle runs on three streams (People, Process, Product) and ships a concrete capability, so progress shows in what changed, not a status slide. We agree cadence and reporting up front so you can defend the spend.

### Leadership AI Coaching (Door 2)

- **What's the real difference between the three coaching formats — and why pay £18k for the closed team when 5 cohort places cost less?** — Same engine, three depths. All run on DOTS; what changes is the room. Format A: one founder in your corner, 1:1. Format B: your own leadership team, closed, on-site, on your confidential context. Format C: you alongside vetted non-competing peers. The cohort is cheaper per place because you share the room; the closed format buys privacy, a session built entirely around your business, and a team-level artefact. Different jobs, not better-or-worse.
- **Is the open cohort a group from different companies, or somewhere I send my own team?** — A peer room: 12 vetted places, senior leaders from different non-competing companies. If you want your own team in a closed room, that's the exec-team format (B). On more than one person from your company, just ask — we vet for a good mix.
- **I don't have 4 hours a week, and I'll miss sessions. Is this realistic for a busy CEO?** — Glad you raised it rather than bouncing. Cohort is ~4 hrs/week for 8 weeks; 1:1 is a weekly 90 min over a quarter — real commitment, deliberately, because capability doesn't stick from one afternoon. The work is built around your actual job, not bolted on top. On missed sessions, ask how we handle it for your format.
- **⚠️ What does the closed exec-team programme cost for 8 leaders — flat fee or per head?** — Straight answer: floor is from £18,000, and we're finalising flat-fee vs base-plus-per-head. We won't quote a number we might revise. Give us your group size and we'll come back with a firm figure. *[FOUNDER INPUT: lock the model.]*

### Talks & Events

- **What's the lightest-touch way to work with you — a talk or a one-off session?** — A talk or event: a keynote (45–90 min), a leadership offsite, or a hands-on hackathon — designed to move a room in an afternoon (the offsite doubles as a one-off workshop). These are scoped to your situation, so they're **price-on-application** — tell us the moment you want to create and we'll come back with format and cost. For something ongoing, the cohort (from £3,500/place) is the lightest programme.

### Trust / commercial / legal (contact)

- **If it's not working, can I stop? Is there a guarantee?** — Yes, and we mean it. **Phase 0:** if that first leadership-team DOTS session (2.5–3 hrs) isn't comfortably in line with or beyond what you expected, it's a **full, no-questions money-back guarantee** — just tell us on the day or within 48 hours. **Coaching:** full money-back through your **first two sessions** — quit before the third and you owe nothing. Beyond that there's **no lock-in** — engagements run a cycle at a time, your call. We'd rather earn the next cycle than trap you.
- **⚠️ It's just the two of you. What if you're ill or oversubscribed — and how does this scale to a large org?** — Being small and founder-led is deliberate; coaching genuinely is Toby or Andy. For org-wide change, the work scales through *your* people, not ours — each cycle trains your operators so capability compounds inside your business. *[FOUNDER INPUT: confirm capacity/continuity/parallel-delivery story.]*
- **Who owns what we build, and will you sign our NDA/DPA?** — Simple: **what you build is yours.** Any frameworks or tools we share are yours to use freely across your business and personal life — the only line is you can't resell them or run them as a competing service. Your 1:1 work stays confidential. We handle NDAs/DPAs directly with your team.
- **Do you discount, and can you work with our procurement process?** — We don't compete on discount — price reflects the value, and tends to move up, not down. If a formal process is required we can work within it (we've done so before, including with a global financial consulting firm); a heavier process usually means more scope, which the price reflects.

## 7.5 Required revisions (from the 2026-06-14 adversarial pass)

> All four personas converged on these. The four **HIGH** items gate an honest cutover.

**🔴 HIGH**
1. **Proof gap (#1 ship-blocker) — partly addressed 2026-06-14.** The offer asserts results with *zero* proof woven in — every persona called it a dealbreaker. **Asset confirmed:** all early clients (Alastair Constance/Mercury Global, Mark Bennett/W R Bennett Group, David Carry/Track Record Coaching, Charlotte Steedman/Conductor) **+ others are willing to be reference calls for serious prospects** (see [[verified-clients-and-pedigree]]). **Action (Andy prioritising over coming weeks, #22/#55):** capture 2–3 concrete before/after outcomes (e.g. Mark's £16k dispute resolved in a week — named or anonymised), weave them into the offer narrative + offering pages, and surface *"references available on request."* North star forbids fabrication — this is founder-content.
2. ✅ **RESOLVED (Andy, 2026-06-14): remove the ROI multiple.** Not published until measured — it traces to one client's "saved ~4 hires ≈ £250k", which is unmeasured. Copy frames *how* we measure value, not a number. **Near-term priority: measure + publish one real verified outcome.**
3. **Pricing visibly unsettled.** Multiple `from`/flex/🔧/⚠️ signals + internal contradictions (£5k floor vs "£2k–£9k typical"; £2k workshop vs £3,500 cohort entry). The wrong buyer reads negotiation leverage; the right buyer reads "undefendable to finance." **Action:** lock every number before ship; no 🔧/⚠️ reaches the public site; add a worked 12-month example with an upper bound; state VAT once.
4. **Door 1 vs Door 2 Format B confusable.** Both engage leadership, run DOTS, on-site, produce a 90-day plan. **Action:** one load-bearing routing sentence — Door 1 = move the whole business (leadership is the *start*); Format B = build the leadership team's own capability (leaders are the *end*).

**🟡 MEDIUM** — 5. "Results not recommendations" vs Phase 0's roadmap deliverable (reconcile in copy: produced *with* you, owned by you). · 6. Framework overload (DOTS/Curve/CRISP/TSS) trips the "methodology theatre" alarm — lead with DOTS only at first contact, demote the rest behind "how it works." · 7. Disqualifiers are rhetoric, not structural — the cohort-place-vs-closed-team arbitrage is a real cheap-door loophole; explain the value gap, firm up prices. · 8. Generic hero ("We build human capability with AI systems") loses the 7-second scan — lead with the buyer's problem + proof. · 9. ✅ RESOLVED 2026-06-14: exit/guarantee (full money-back — Phase 0 first session / first two coaching sessions), data/IP ("what you build is yours", light touch), and procurement/discount all answered with founder rulings — see §5 + §7.

**🟢 LOW** — 10. ✅ RESOLVED 2026-06-14: Talks & Events = three confirmed formats, price-on-application, inquiry-led (no fake events calendar). · 11. ✅ RESOLVED 2026-06-14: coaching names closed (1:1 Exec AI Fast Track Coaching / Leadership Team AI Activation / Open Cohort AI Bootcamp for Business Leaders) + the shared-DOTS-engine / three-depths framing is now explicit in §3–§4.2.

---

## 8. Governance & change control

This document is the source of truth for the **offer structure and approved language**. `content/data/offerings.json` is the machine-readable derivation the site renders from. To change anything customer-facing about an offering:

1. Edit the Canon (and bump the version + add a decision-log entry below).
2. Update `content/data/offerings.json` to match.
3. Rebuild; the drift check (`check.js`, planned Check #10) fails if any template hardcodes a value that has drifted from `offerings.json`.

**Decision log** (date · decision · rationale · impacted assets):

- **2026-06-13** · Adopt the design-intent "Two Doors" model as canonical; coaching = one lane, three formats; revive Talks & Events; drop Fractional AI Advisory from v2. · Build had diverged from the carefully-designed model; restore it. · Impacts: `/what-we-do/`, home, DecisionTree, OfferingTable, all offering pages, `offerings.json`.
- **2026-06-14** · v0.2: ran the 4-persona adversarial pass; authored the FAQ/objection bank (§7) and the required-revisions list (§7.5). · Surfaced 4 HIGH gating findings (proof, ROI claim, pricing, Door-1-vs-Format-B confusion) + 22 FAQs. · Impacts: §7, §7.5; feeds #27 (FAQ), #22/#55 (proof), #23 (pricing).
- **2026-06-14 (founder rulings, Andy)** · Decisions 1–2 locked: (a) the offer is a **stackable menu**, not either/or — clients run 2–4 in parallel; (b) coaching names = **1:1 Exec AI Fast Track Coaching · Leadership Team AI Activation · Open Cohort AI Bootcamp for Business Leaders** (Ronseal title + subtitle each); (c) 1:1 re-specced — 6 wks, 75-min remote, async, pre-work audit, bespoke systems, **from £10k**; (d) Leadership Team AI Activation = **base £15k (≤6) + £2k/head, max 12**; (e) cohort **£3,500/place**; (f) Phase 0 **from £5k**, Phase 1+ **from £20k/cycle**; (g) all prices **+VAT** (exclusive) + one international footnote. · Impacts §3, §4.2, §5, §7 + `offerings.json`. **Built coaching/exec pages now stale on duration/price — update in Phase 5.** · Still open: half-day workshop (Decision 3), public headline price, proof/ROI (4), guarantee/legal (5), events (6).
- **2026-06-14 (founder rulings, Andy) — Decisions 3–6, v0.3:** (3) standalone half-day workshop **retired** (workshops live inside offerings / the Leadership Offsite); public headline = **"from £3,500 +VAT"**. (4) ROI multiple **removed** (unmeasured anecdote) — measure + publish a real case soon; **all early clients available as reference calls**. (5) **Full money-back guarantee** — Phase 0 first session / first two coaching sessions; IP = "what you build is yours" (light touch, no NDA detail on site); no discounting, can work within formal processes. (6) Talks & Events = three formats, **price-on-application**, inquiry-led. · **All six decisions resolved — Canon ready for a sign-off read.** Remaining open items are near-term proof work (#22/#55) + Phase-5 build (derive site, Door-1-vs-Format-B routing copy, FAQPage JSON-LD).

---

*End of document. v0.1 draft — Phases 2 of the Offer Canon work (#57). Open decisions in §3–§5 to be closed by Andy + Toby; FAQ bank in §7 to be authored in Phase 4.*
