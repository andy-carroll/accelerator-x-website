# Session Protocols

These protocols are **MANDATORY** for every Claude Code session in this repo. They exist to
prevent context loss between sessions and to keep Andy and collaborators fully informed across
CLAUDE.md, Airtable, GitHub, and Slack.

## Primary artefacts

- `CLAUDE.md` → Session summaries + `## Next Session Priorities`
- `.claude/sessions/` → Timestamped session logs
- Airtable CRM & Delivery base (`appZwa2e4VZk4ULDA`) → Deliverables table (`tblBV2oNwwGo7sXry`)
- `npm run build` (wraps `scripts/build-hub.js`) → Quality gate
- `slack-ops` MCP → Posts to `#ax-operations`

## Quick reference cards

Use these snippets when you need the outline. Detailed procedures follow below.

### Session-start quick card

1. Read most recent session log → capture done/pending/priorities
2. Read `CLAUDE.md :: ## Next Session Priorities`
3. Check Airtable for due or overdue deliverables
4. Inspect git status & last 3 commits
5. Publish the session brief and wait for focus confirmation

### Session-end quick card

1. Retrace conversation + artefacts changed
2. Update `CLAUDE.md` (Recent Session + Next Session Priorities)
3. Sync Airtable (statuses + new deliverables)
4. Commit + push work (per instructions below)
5. Run `npm run build` (quality gate) until clean
6. Write structured log in `.claude/sessions/`
7. Notify Slack via `slack-ops` MCP
8. Post the closing summary in chat

---

## SESSION-START PROTOCOL

Trigger: Automatically when the session begins (Claude reads this file at boot via CLAUDE.md).
Complete these steps **before** responding to any task.

### Step 1 — Read last session log

```bash
ls -t .claude/sessions/*.md 2>/dev/null | head -1 | xargs cat 2>/dev/null || echo "No previous session log found"
```

Identify what was completed, what remains, and the top three priorities. If the log is missing
or stale, flag it immediately rather than proceeding silently.

### Step 2 — Read CLAUDE.md "Next Session Priorities"

Read the `## Next Session Priorities` block in CLAUDE.md. If absent, note the gap and flag it
in the opening brief (previous session did not close correctly).

### Step 3 — Check Airtable for due/overdue items

Query CRM & Delivery base (`appZwa2e4VZk4ULDA`), Deliverables table (`tblBV2oNwwGo7sXry`):

- Any deliverables with Status = "Todo" or "In Progress" and Due Date = today or earlier
- Surface these immediately — they are the default starting point if no other priority exists

### Step 4 — Check git state

```bash
git status --short
git log --oneline -3
```

Flag any uncommitted changes or un-merged worktree state from previous sessions.

### Step 5 — Brief the user

Output a crisp session brief to chat (not a wall of text). Template:

```text
## Session Brief — [DATE]

**Last session:** [1-sentence summary]
**Pending from last session:** [up to 3 bullets]
**Due today in Airtable:** [list or "None"]
**Git state:** [clean / uncommitted changes / unpushed commits]

**Suggested focus:** [single priority for this session]
```

Do **not** start work until the user confirms the focus. If they choose something else,
restate the agreed plan so the transcript captures the decision.

---

## SESSION-END PROTOCOL

Trigger: When the user says "end session", "wrap up", "close session", etc. The protocol is
**atomic** — complete every step before declaring the session closed.

### Step 1 — Retrace the session

Review the full conversation and local diff. Capture every:

- Decision made
- File created or modified
- Airtable record created or updated
- Unresolved question or blocker

Cross-check against `git status` so nothing is missed.

### Step 2 — Update CLAUDE.md

Two blocks must be refreshed **before** leaving the repo:

**a) Recent Session block** — Replace with today's summary:

- Completed items (include file paths + record IDs where relevant)
- Key findings (technical decisions, gotchas, architecture notes)
- Active focus (what should happen next)

**b) Next Session Priorities block** — exactly three items:

```text
## Next Session Priorities

1. [Most urgent — specific action]
2. [Second priority]
3. [Third priority]
```

### Step 3 — Update Airtable

For every deliverable touched:

- Mark completed work as "Delivered"
- Create new deliverables that emerged during the session
- Update status on in-progress items

Reference Airtable record IDs in the session log for traceability.

### Step 4 — Commit and push

```bash
git add -A
git commit -m "docs(session): [date] session wrap — [one-line summary]"
# Merge/push workflow
cd /Users/andyc/CascadeProjects/accelerator-x-website
git checkout main
git merge claude/vigorous-black --no-ff -m "merge: [date] session"
git push origin main
```

If this repo is on a different branch strategy (e.g., PR-based), document the deviation in the
session log and CLAUDE.md so the next agent inherits the right workflow.

### Step 5 — Run quality gates

```bash
npm run build
```

Session cannot close if the build fails. Fix the issue, re-run, and record the results in the
session log.

### Step 6 — Write session log

Create `.claude/sessions/session-YYYYMMDD-HHMMSS.md` containing:

- Date + estimated duration
- Accomplishments (specific bullets)
- Key decisions and findings
- Deliverables touched (file paths + Airtable record IDs)
- Git commits produced
- Quality gate results
- Next Session Priorities (same three as CLAUDE.md)

Link to GitHub PRs or Slack threads when relevant.

### Step 7 — Post to Slack

Post to `#ax-operations` via `slack-ops` MCP:

```text
🔴 *Session closed — [DATE]*

*Completed this session:*
• [item 1]
• [item 2]
• [item 3]

*Next session:*
• [priority 1]
• [priority 2]
• [priority 3]

_Session log: .claude/sessions/session-[TIMESTAMP].md_
```

### Step 8 — Final output to chat

Close the loop with the user:

```text
## Session Complete — [DATE]

**Done this session:**
[bullet list]

**Next session priorities:**
1. [priority 1]
2. [priority 2]
3. [priority 3]

Session log saved to: .claude/sessions/session-[TIMESTAMP].md
Slack notification posted to #ax-operations.

Any questions before we close?
```

## Enforcement

- Session-start brief must be output before any work begins
- Session-end protocol is atomic — all eight steps required
- `## Next Session Priorities` in CLAUDE.md is the contract between sessions
- Flag any previous session that failed to close properly (missing log/priorities) before
  starting new work
- Structure is agent-ready so Slack automations can reuse it without modification
