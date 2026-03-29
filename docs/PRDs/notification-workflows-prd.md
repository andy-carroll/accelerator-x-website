# Notification Workflows PRD (Netlify + Airtable → Slack)

_Status: Implemented foundation (v1), extensible for additional event types_
_Last updated: 2026-03-04_

---

## 1) Objective

Create a single, high-signal Slack notification layer for business momentum updates while keeping source systems decoupled.

Current source systems:

- Website deployments (Netlify / GitHub)
- Airtable business-building actions (Accelerator-X Build & Ops)

Destination:

- Slack channel `#ax-business-building` (`C0ACNB3RV1B`)

---

## 2) Why this architecture

We intentionally use **separate workflows per source** instead of one mega-workflow.

Benefits:

- Easier debugging and safer edits (deploy logic cannot break Airtable logic)
- Cleaner ownership boundaries by source
- Faster extension to new notification types (milestones, deliverables, blockers, etc.)
- Consistent Slack message shape across sources

This design is more powerful than native one-off integrations because message logic can be contextual (for example, commit-aware "Why it matters" copy).

---

## 3) Implemented workflows

### A) Deploy notifications (existing)

- **Workflow name:** `Netlify Deploy → Slack (Prod)`
- **Workflow ID:** `3jGhqXBYb0LcXuaP`
- **Purpose:** Post production deploy summaries to Slack
- **Current headline format:** `Accelerator-X website update shipped 🚢`
- **Message includes:** what changed, why it matters, links (live site / deploy / commit)

### B) Airtable business-building notifications (new)

- **Workflow name:** `Airtable Action List → Slack (Business Building)`
- **Workflow ID:** `HnjzoK6kIbAskWi7`
- **Webhook path:** `POST /webhook/airtable-action-to-slack`
- **Purpose:** Post completed business-building actions to Slack

Scoping guardrails:

- Only forwards when `base_id === app6OluErWOw8UZVI` (Accelerator-X Build & Ops)
- Only forwards when status indicates completion (`done/completed/shipped/live/closed/finished`) unless `force_send=true`

If not forwarded, response includes explicit reason (e.g. `base_mismatch:missing`).

---

## 4) Airtable source scope

Business-building notifications are currently scoped to:

- **Base:** `app6OluErWOw8UZVI` (Accelerator-X - Build & Ops)
- **Primary table in use:** `tblBV2oNwwGo7sXry` (Deliverables)

---

## 5) Airtable automation contract (payload)

Expected webhook payload fields:

```json
{
  "base_id": "app6OluErWOw8UZVI",
  "action_type": "deliverable_shipped",
  "title": "Publish article 006 to production",
  "owner": "Toby",
  "status": "Done",
  "why_it_matters": "Reinforces shipping cadence and trust with the market.",
  "record_url": "https://airtable.com/app6OluErWOw8UZVI/..."
}
```

Suggested Deliverables mapping:

- `title` ← `Name`
- `owner` ← `Assignee`
- `status` ← `Status`
- `why_it_matters` ← `Description` (or `Notes`)
- `record_url` ← record URL using record ID token

---

## 6) Slack message format (shared pattern)

Both workflows follow the same message structure:

1. **Headline** (source/event aware)
2. **What changed**
3. **Why it matters**
4. **Context links** (live/deploy/commit for website, record link for Airtable)

This preserves channel readability while allowing source-specific logic.

---

## 7) Future extension path

Planned event types for Airtable notifications:

- `task_completed`
- `deliverable_shipped`
- `milestone_reached`
- `blocker_cleared`

Recommended next improvements:

1. Add a `Slack Notified` checkbox in Airtable to prevent duplicate sends on status toggles.
2. Add severity/priority routing (e.g. critical blockers can go to a second channel or mention role).
3. Add lightweight audit logging (notification ID + source record ID + timestamp).
4. Standardize a shared internal schema for all future notification producers.

---

## 8) Operational notes

- n8n webhook must stay active for production URL calls.
- If webhook returns 404 "not registered," cycle workflow deactivate/activate and retest.
- Keep this doc updated as new sources are added (e.g. billing, product releases, client delivery milestones).
