# Session Protocols

> **Design principle:** Fast enough to actually happen. Session end must take < 10 minutes.
> The cockpit is `CLAUDE.md`. Everything here is detail behind that file.

---

## SESSION START

**Trigger:** Automatically on every new conversation. Complete before any task work.

### Step 1 — Run session-start script

```bash
npm run session-start
```

This outputs a structured brief containing:
- Last session summary (from CLAUDE.md)
- Known issues
- Git state (uncommitted/unpushed)
- Suggested focus (top priority from CLAUDE.md)

### Step 2 — Wait for confirmation

Do not start work until the user confirms or redirects the focus.
Restate the agreed plan so the transcript captures the decision.

---

## SESSION END

**Trigger:** User says "end session", "wrap up", "close session", or similar.
**Requirement:** Run the script. It handles all steps atomically.

### Run session-end script

```bash
npm run session-end
```

This performs:
1. Generate session log in `.claude/sessions/`
2. Ensure CLAUDE.md has "Next Session Priorities" block
3. Append session notes to ROADMAP.md, README.md, CHANGELOG.md, AI-RULES.md
4. Run `npm run build` (quality gate)
5. Git add, commit, push

Session cannot close if the build fails. Fix it first.

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
