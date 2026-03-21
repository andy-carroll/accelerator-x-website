# Session Protocols

> **Design principle:** Fast enough to actually happen. Session end must take < 10 minutes.
> The cockpit is `CLAUDE.md`. Everything here is detail behind that file.

---

## SESSION START

**Trigger:** Automatically on every new conversation. Complete before any task work.

### Step 1 — Read the cockpit

Read `CLAUDE.md`. It gives you project context, current state, known issues, and next priorities.
If it's missing or clearly stale (last session date is > 7 days ago), flag it before proceeding.

### Step 2 — Confirm git state

```bash
git log --oneline -3
git status --short
```

Flag any uncommitted changes or un-pushed commits from previous sessions.

### Step 3 — Check Airtable for overdue items

Query CRM & Delivery base (`appZwa2e4VZk4ULDA`), Deliverables table (`tblBV2oNwwGo7sXry`):
any items with Status = "Todo" / "In Progress" and Due Date ≤ today.

### Step 4 — Post session brief

Output this to chat before doing anything else:

```
## Session Brief — [DATE]

**Last session:** [1-line from CLAUDE.md]
**Known issues:** [from CLAUDE.md]
**Git state:** [clean / uncommitted changes / unpushed commits]
**Airtable:** [overdue items or "None"]

**Suggested focus:** [item 1 from CLAUDE.md Next]
```

### Step 5 — Wait for confirmation

Do not start work until the user confirms or redirects the focus.
Restate the agreed plan so the transcript captures the decision.

---

## SESSION END

**Trigger:** User says "end session", "wrap up", "close session", or similar.
**Requirement:** All 5 steps. Do not declare session closed until every step is done.

### Step 1 — Update CLAUDE.md (the cockpit)

Update two blocks:

**Current State:**
- Last session: today's date + 1-line summary of what was done
- Known issues: update to reflect resolved/new issues
- Build + git status

**Next:** Update the 3 priorities to reflect what remains. Be specific — include file paths.

### Step 2 — Update CHANGELOG.md + ROADMAP.md

- `CHANGELOG.md`: add entry under `[Unreleased]` for everything done this session
- `ROADMAP.md`: mark completed items `[x]`, move to Done section, add any new items that emerged

### Step 3 — Quality gate + commit + push

```bash
npm run build                          # must exit 0
git add -A
git commit -m "docs(session): [date] session wrap — [one-line summary]"
git push origin main
```

Session cannot close if the build fails. Fix it first.

### Step 4 — Write session log

Create `.claude/sessions/session-YYYYMMDD-HHMMSS.md`:

```markdown
# Session — YYYY-MM-DD

**Duration:** ~X hours
**Focus:** [one line]

## Done
- [specific bullet with file paths]

## Decisions
- [decision + rationale]

## Known issues / blockers
- [anything unresolved]

## Files touched
- `path/to/file` — what changed

## Build + deploy
- `npm run build`: ✅ / ❌
- Pushed to main: ✅ / ❌

## Next session priorities
1. [priority 1]
2. [priority 2]
3. [priority 3]
```

### Step 5 — Post to Slack + close

Post to `#ax-operations` via `slack-ops` MCP:

```
🔴 *Session closed — [DATE]*

*Done:*
• [item 1]
• [item 2]

*Next:*
• [priority 1]
• [priority 2]
• [priority 3]

_Log: .claude/sessions/session-[TIMESTAMP].md_
```

Then post the closing summary to chat.

---

## Airtable references

- CRM & Delivery base: `appZwa2e4VZk4ULDA`
- Deliverables table: `tblBV2oNwwGo7sXry`

---

## Enforcement

- Session start brief is mandatory before any work
- Session end is atomic — all 5 steps required
- `CLAUDE.md` is the contract between sessions — if it's wrong, everything downstream is wrong
- A missing or stale session log means the previous session did not close correctly — flag it
