# Accelerator X — Autonomous Growth System

> **Purpose of this document:** Capture the vision, strategy, and measurable outcomes
> for building an AI-powered growth engine at Accelerator X. Every capability we build
> must trace back to a specific business outcome. This is the thread.
>
> **Last updated:** 2026-03-21
> **Status:** Vision locked. Phase 1 in execution.

---

## The Problem We're Solving

Right now, Andy is the system.

Every lead is qualified manually. Every piece of content is written manually. Every
client update is sent manually. Every spec is written, every deploy triggered, every
invoice chased — manually. Toby is coming online but the bottleneck is structural,
not headcount. Adding a second human doesn't fix a system that isn't a system.

Meanwhile, Accelerator X exists to help other businesses build AI capability. The
irony of not doing it ourselves isn't lost.

The shift we need: **from Andy doing things, to Andy orchestrating agents that do things.**

---

## The Vision

A small, tight team of AI agents — each with a defined role, a personality, and a
set of tools — that run alongside Andy and Toby in Slack. They draft, research,
enrich, publish, update, and coordinate. They hand off to each other. They escalate
to humans when they need a decision. They document everything.

Andy's job becomes: set direction, make judgment calls, close deals.

The agents' job: everything that can be systematised.

This is not a future state. This is the next 90 days.

---

## Business Outcomes (the "why" behind every build decision)

These are the outcomes that matter. Every piece of infrastructure we build must
connect to at least one of these.

### O1 — Revenue: £100k ARR within 90 days

**Current baseline:** A few small clients. Sub-£20k ARR.
**Target:** £100k ARR by end of June 2026.
**What it requires:**
- Consistent pipeline of qualified meetings (outbound + inbound)
- Conversion of meetings to Discovery Workshops (£4k entry point)
- Conversion of workshops to 8-week cycles (from £12k)
- Retention and expansion of existing clients

**The math:**
- 8 × 8-week cycles at £12k average = £96k
- Or 4 cycles + a handful of workshops = same
- At 40% meeting-to-workshop conversion: need ~20 qualified meetings
- At 15,000 cold emails/day (Instantly model): 50-60 meetings is realistic in 90 days

### O2 — Pipeline: 10+ qualified meetings per week within 60 days

**Current baseline:** Inbound only. Unpredictable. Volume too low.
**Target:** 10 qualified meetings/week by end of May 2026.
**What it requires:**
- Outbound engine running (Instantly + AI personalisation)
- Compelling free offer (AI opportunity map, delivered before the meeting)
- Booking automation (calendar link in the email sequence)
- Lead enrichment so every meeting has pre-read intelligence

### O3 — Content: Weekly presence on LinkedIn and in inboxes

**Current baseline:** Occasional. No cadence. No system.
**Target:** 3 LinkedIn posts/week + 1 newsletter issue/week, every week.
**What it requires:**
- Marketing Luminary agent drafting from article content and AI news
- Andy approving/editing, not writing from scratch
- Typefully for LinkedIn scheduling
- Brevo for newsletter delivery

### O4 — Delivery: Zero client updates fall through the cracks

**Current baseline:** Manual. Dependent on Andy remembering.
**Target:** Every active client gets a weekly status update. Every deliverable has a
logged owner and due date. No surprises.
**What it requires:**
- Ops Legend agent managing Airtable delivery board
- Automated weekly update drafts for Andy to approve + send
- Slack notifications when deliverables go overdue

### O5 — Leverage: Andy's manual ops time reduced by 80%

**Current baseline:** ~60% of Andy's time is on things an agent could do.
**Target:** Andy spends 80% of his time on: client relationships, sales calls, and
strategic decisions. Agents handle everything else.

---

## The Agent Fleet

Three agents. Each connected to Slack. Each with a specific role and tool set.
All accessible by Andy and Toby via @mention.

### AX Marketing Luminary

**Role:** Content, brand, outbound, growth
**Slack bot:** AX Marketing Luminary (`slack-marketing` MCP)
**Owns:**
- LinkedIn post drafts (from articles, news, insights)
- Newsletter drafts (weekly dispatch)
- Outbound email copy (Instantly sequences)
- SEO/OG quality checks on new content
- Typefully queue management

**Tools:** Typefully, Brevo, web search, Instantly (future), filesystem (articles)

**Triggers (agent-initiated):**
- New article committed → drafts 3 LinkedIn post options → posts to `#ax-content-engine`
- Monday 8am → drafts weekly newsletter from recent articles + AI news
- New subscriber → confirms Brevo receipt, flags for personal outreach if ICP match

---

### AX Product Unicorn

**Role:** Website, codebase, specs, roadmap
**Slack bot:** AX Product Unicorn (to be connected)
**Owns:**
- Roadmap spec writing (given a ROADMAP item → produces `docs/specs/[feature].md`)
- Code review summaries (on push to main)
- Build status monitoring
- Session-end protocol automation
- Website QA checks

**Tools:** GitHub, Netlify API, filesystem, Claude Code (as a tool)

**Triggers (agent-initiated):**
- Push to main → summarises changes, flags anything needing doc update
- "End session" → runs full session-end protocol (CLAUDE.md, CHANGELOG, session log, Slack post)
- ROADMAP item flagged "In Flight" → writes spec, posts to `#ai-driven-development`

---

### AX Ops Legend

**Role:** CRM, leads, client delivery, operations
**Slack bot:** AX Ops Legend (`slack-ops` MCP)
**Owns:**
- Lead enrichment (new lead → company research brief posted to `#website-leads`)
- Delivery board hygiene (overdue items → Slack alerts)
- Morning briefing (daily digest to Andy: overdue items, new leads, key metrics)
- Client status update drafts (weekly, per active engagement)
- Airtable record creation and updates

**Tools:** Airtable, Gmail (draft only), GCal, web search/scrape, Slack

**Triggers (agent-initiated):**
- New lead in Airtable → enriches company, scores intent, posts brief to `#website-leads`
- Daily 8am → posts morning briefing to Andy's DM
- Deliverable due date passes → escalates to `#ax-client-deliverables`
- New meeting booked → creates Airtable record, prepares discovery brief

---

## Agent-to-Agent Coordination

The real leverage comes from agents handing off to each other without human
initiation. Two patterns:

**Pattern 1 — Orchestrated handoff**
Andy or Toby triggers a complex task. One agent picks it up, completes its part,
and explicitly hands to the next.

Example:
```
Andy: "@AX publish the new article"
  → Product Unicorn: builds + deploys
  → Marketing Luminary: drafts LinkedIn post, queues in Typefully
  → Ops Legend: updates Airtable content calendar
Andy: one confirmation message. No manual steps.
```

**Pattern 2 — Event-driven pipeline**
An agent completes a task. That completion automatically triggers another agent.
No human in the loop unless a decision is needed.

Example:
```
New lead form submitted (automatic)
  → Ops Legend: enriches company, posts to #website-leads
  → If ICP match: Marketing Luminary notified to add to personalised outbound sequence
  → Andy sees enriched brief, decides whether to reach out personally
```

---

## The Outbound Machine (O1 + O2)

Based on the proven model: give a £500+ offer for free → meeting → close.

**The offer:** A personalised AI Opportunity Map for their business.
One page. Their industry. Their specific bottlenecks. Where AI would actually move
the needle. Delivered before the sales call. Costs us 10 minutes of agent time.

**The machine:**
```
ICP-filtered prospect list (from Apollo/LinkedIn)
    ↓
Ops Legend enriches each company (industry, signals, pain points)
    ↓
Marketing Luminary generates personalised AI Opportunity Map
    ↓
Instantly sends the sequence (15k/day capacity)
    ↓
Reply → booked meeting → Ops Legend creates Airtable record
    ↓
Ops Legend prepares discovery call brief for Andy/Toby
    ↓
Andy closes. Discovery Workshop. 8-week cycle.
```

This isn't cold email. It's personalised intelligence at scale.

---

## Build Phases

### Phase 1 — Prove the concept (weeks 1–2)
*One agent. One workflow. One real outcome.*

**Build:** Marketing Luminary in n8n
- Trigger: new article committed to main
- Action: Claude drafts 3 LinkedIn post options in Andy's voice
- Output: posts to `#ax-content-engine` for approval
- Result: Andy approves, Typefully queues, post goes live

**Why this first:** Lowest infrastructure barrier (n8n already running). Immediate
visible output. Toby can see it happen. Proves the interaction model.

**Success metric:** 3 LinkedIn posts published in week 1 with zero manual drafting.

---

### Phase 2 — Build the fleet (weeks 3–6)
*Three agents connected. Basic agent-to-agent handoff working.*

**Build:**
- Marketing Luminary → full Slack integration (not just n8n trigger)
- Ops Legend → lead enrichment live (new lead → rich brief in Slack)
- Product Unicorn → session-end automation (replaces manual protocol)
- First agent-to-agent: new article → Product Unicorn deploys → Marketing Luminary drafts

**Infrastructure:** Create `accelerator-x-agents` repo. Deploy to Railway.
Git push to deploy. Agents always-on.

**Success metric:** O3 cadence running (3 posts/week, 1 newsletter/week).
Lead enrichment firing on every new lead. Session-end takes < 2 minutes.

---

### Phase 3 — The outbound machine (weeks 6–10)
*Pipeline generation running. Agents generating meetings.*

**Build:**
- Instantly connected and running sequences
- Marketing Luminary generating personalised AI Opportunity Maps
- Ops Legend managing the reply-to-meeting pipeline
- Morning briefing live

**Success metric:** O2 achieved — 10+ qualified meetings/week.

---

### Phase 4 — Scale and compound (months 3+)
*Agents improving. New agents added as new bottlenecks emerge.*

- Multi-agent orchestration for complex client delivery
- Proposal generation agent (from call transcript → proposal draft)
- Client health monitoring agent
- Content performance agent (what's working, what to write next)

---

## Infrastructure

```
Netlify          → accelerator-x.ai (website, static)
Netlify Fns      → form handlers, newsletter subscribe
Railway          → accelerator-x-agents (persistent agent service)
n8n              → workflow automation, Phase 1 agent triggers
Airtable         → CRM, delivery board, data layer
Slack            → human + agent interface
Instantly        → outbound email at scale (Phase 3)
Brevo            → newsletter + transactional email
Typefully        → LinkedIn scheduling + approval queue
```

---

## Guardrails

Agents can do autonomously:
- Draft content (never publish without human approval)
- Enrich leads and research companies
- Create and update Airtable records
- Post to internal Slack channels
- Read and summarise codebase/docs
- Run builds and report results

Agents must ask a human before:
- Sending any external communication (email, LinkedIn)
- Publishing anything publicly (website, social)
- Deleting or modifying existing records
- Spending money or initiating transactions
- Accessing client-confidential information

Agents can never:
- Send emails autonomously to clients or prospects
- Make financial transactions
- Access systems not explicitly provisioned

---

## The North Star

In 90 days: Andy runs a £100k ARR business with two humans and a fleet of agents.
The agents handle the system. The humans handle the relationships and the judgment.

That's not the end state. That's the launchpad.

---

_This document lives at `docs/autonomous-growth-system.md`.
Update it when strategy shifts or new outcomes are added.
It is the strategic parent of `ROADMAP.md` — if something is on the roadmap,
it should trace back to an outcome in this document._
