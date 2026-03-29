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

Optional machine output:

```bash
npm run session-start:json
```

This outputs a structured brief containing:

- Last session summary (from CLAUDE.md)
- Known issues
- Git state (uncommitted/unpushed)
- Suggested focus (top priority from CLAUDE.md)
- Branch policy status from `.session-protocol.json`

### Step 2 — Wait for confirmation

Do not start work until the user confirms or redirects the focus.
Restate the agreed plan so the transcript captures the decision.

---

## SESSION END

**Trigger:** User says "end session", "wrap up", "close session", or similar.
**Requirement:** Run the script with explicit mode. Safe-by-default is now enforced.

### Choose session-end mode

Plan mode (default, no writes):

```bash
npm run session-end
```

Dry-run mode (no writes, explicit simulation):

```bash
npm run session-end:dry-run
```

Write mode (requires explicit confirmation prompt):

```bash
npm run session-end:write
```

Non-interactive write mode (for controlled automation):

```bash
npm run session-end:write:yes
```

Write mode performs:

1. Enforce branch policy from `.session-protocol.json`
2. Run required quality gate(s)
3. Generate session log in `.claude/sessions/`
4. Ensure CLAUDE.md has "Next Session Priorities" block
5. Update managed docs with idempotent session markers
6. Stage only scoped files, commit if changes exist
7. Push only when policy allows it and explicit flags are present

Session cannot close in write mode if required quality gates fail. Fix first, then rerun.

### Operating mode (pragmatic toggle)

Set `operatingMode` in `.session-protocol.json` to switch behavior without editing scripts:

- `solo` = lower-friction defaults for a single maintainer.
- `team` = stricter defaults (`strictMode=true`, required `build+check`, tighter staged-path policy).

---

## Airtable references

- CRM & Delivery base: `appZwa2e4VZk4ULDA`
- Deliverables table: `tblBV2oNwwGo7sXry`

---

## Enforcement

- Session start brief is mandatory before any work
- Session end requires explicit mode selection; write actions are never implicit
- `CLAUDE.md` is the contract between sessions — if it's wrong, everything downstream is wrong
- A missing or stale session log means the previous session did not close correctly — flag it
