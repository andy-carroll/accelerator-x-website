# Session Protocols

> **Design principle:** Fast enough to actually happen. Session end must take < 10 minutes.
> The cockpit is `CLAUDE.md`. Everything here is detail behind that file.

---

## THE SESSION LOOP (SDLC)

Every session runs one turn of the same loop. This is the spine the rest of this file hangs off — start, continuous docs, and end are just the mechanics of executing it honestly.

1. **Scope** — pick the work from the tracker (GitHub "v2 Cutover" milestone), not from memory. One or a few issues, not "whatever comes up."
2. **Measurable outcome** — state, before building, what "done" looks like for this session: which issue(s) close, what becomes visible on the preview. If you can't name the outcome, the scope is wrong.
3. **Build** — do the work. Update CHANGELOG/docs inline as it lands (see Continuous Documentation).
4. **Test** — verify against the outcome. Build + check green; for anything user-visible, verify on the **Netlify preview**, not just localhost.
5. **Deploy** — push `rebuild/v2` so the branch preview reflects the work. Every session ends in a deploy (preview at minimum) — no long-lived unshipped work.
6. **Monitor** — confirm the deployed change is live and correct; note anything to watch next session.

**The close-gate (non-negotiable):** a session cannot close unless its work is **tracked** (a GitHub issue exists and is updated/closed) AND **shipped** (pushed to the preview) — or **explicitly carried** (written into session-notes + Next Session Priorities with the reason). "Done but unpushed" and "done but untracked" both mean the session is not finished.

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

## CONTINUOUS DOCUMENTATION (during the session)

**Principle:** Self-documenting at all times. Docs stay live, not batched at close.

- **On component complete:** Update `CHANGELOG.md` [Unreleased] immediately — Added/Fixed entries while context is fresh. Do not defer.
- **On gate passed or wave complete:** Update CLAUDE.md Wave status block and "Last session" line immediately.
- **On ROADMAP-visible milestone:** Update ROADMAP.md NOW sprint status immediately.

These are not session-end steps. They happen inline as work lands.

---

## SESSION END

**Trigger:** Any of the following — agent initiates without waiting for explicit instruction:
- User says "end session", "wrap up", "close session", or similar
- A named gate passes (Wave gate, Phase gate, quality gate)
- A wave or phase completes
- Natural pause after a major deliverable lands

**Agent responsibility:** Do not wait for the user to ask "is everything documented?". When a gate passes or work is done, proactively say so and begin Step 0 immediately.

**Requirement:** Complete the pre-close audit first, then run the script. Safe-by-default is enforced.

### Step 0 — Pre-close audit (mandatory, non-skippable)

Before touching any script or file, work through this checklist silently and act on every finding:

**Code quality**
- Review all files created or modified this session. Be self-critical. Score honestly.
- Flag any bugs, ARIA errors, dead CSS, inline styles, missing `noreferrer`, or other quality issues found — then fix them before closing.
- Flag any refinement opportunities (architectural, naming, token usage) that are quick wins — fix them or log them in session-notes.md if they need a future session.

**Docs** — verify each is current (continuous documentation above should mean these are already done):
- `CLAUDE.md` — "Last session" line accurate and specific? "Next" section pointing at the exact next task with enough detail to cold-start? "Next Session Priorities" ≤3 items, actionable?
- `CHANGELOG.md` — Every component added or modified this session has an entry? Every bug fixed has a Fixed entry?
- `ROADMAP.md` — Does the NOW sprint reflect current state? "Last updated" date correct?

**Go-live checklist sweep** — mandatory on every session close:
- Did this session introduce any placeholder content, dummy data, unverified copy, or TODO links? → Add to `docs/GO-LIVE-CHECKLIST.md`.
- Were any go-live blockers resolved this session? → Mark `[x]` in the checklist.
- Were any new concerns raised (SEO, analytics, form behaviour, legal, ARIA) that need pre-launch verification? → Add them.
- The checklist must always reflect the current true state of the site — nothing unresolved should go unrecorded.

**Tracking + shipping (the close-gate)**
- Every piece of work done this session maps to a GitHub issue under the "v2 Cutover" milestone — updated or closed. Work with no issue: create one, or carry it explicitly.
- `rebuild/v2` is pushed; the branch preview reflects this session's work. If nothing shippable was produced, that is itself the carry — say so in session-notes and why.
- Anything not finished is written into session-notes + "Next Session Priorities" with the reason. Nothing left "done but unpushed" or "done but untracked."

**Session notes**
- Write `.claude/session-notes.md` with: decisions made, things deferred (and why), key findings, anything a cold-start agent would need that isn't in CLAUDE.md.

Only once all findings are addressed and `.claude/session-notes.md` exists: proceed to script.

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
3. Generate session log in `.claude/sessions/` — auto-populated with recent git commits and Next Session Priorities from CLAUDE.md
4. Consume `.claude/session-notes.md` into the log (if present), then delete it
5. Preserve any same-day "Last session" line already written in CLAUDE.md — does not overwrite
6. Ensure CLAUDE.md has "Next Session Priorities" block
7. Update managed docs with idempotent session markers
8. Stage only scoped files, commit if changes exist
9. Push only when policy allows it and explicit flags are present

Session cannot close in write mode if required quality gates fail. Fix first, then rerun.

### Capturing decisions and findings

The session log's **Decisions / Findings** section is the only part that cannot be auto-populated.
Write it before running `session-end:write` by creating `.claude/session-notes.md`:

```markdown
- Decided X because Y
- Deferred Z — needs per-page variable mechanism
- Key finding: the old footer marker pattern conflicts with component tokens
```

The script consumes this file and deletes it. If no file exists, the log will contain a reminder
to fill it in manually. The `CLAUDE.md` "Last session" line is never overwritten if the agent has
already set it for today — set it before running the close script for a meaningful description.

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

- Every session runs the loop: scope → measurable outcome → build → test → deploy → monitor
- A session cannot close unless its work is **tracked** (GitHub issue) and **shipped** (preview push) — or **explicitly carried** with a reason
- Session start brief is mandatory before any work
- Session end requires explicit mode selection; write actions are never implicit
- `CLAUDE.md` is the contract between sessions — if it's wrong, everything downstream is wrong
- A missing or stale session log means the previous session did not close correctly — flag it
- Agent initiates session close at natural completion points — user should never have to ask "is everything documented?"
- Docs (CHANGELOG, ROADMAP, CLAUDE.md) are updated inline as work lands, not batched at close
