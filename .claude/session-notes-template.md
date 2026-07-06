<!--
  AGENT INSTRUCTIONS
  ──────────────────
  1. Copy this file to .claude/session-notes.md before running npm run session-end:write
  2. Fill in every section honestly. session-end:write will block if ## Summary or ## Review
     is missing or still a placeholder.
  3. Check .claude/sessions/ for the last 2-3 session logs BEFORE filling in "Carry-forward check".
     Do NOT assume prior priorities were completed unless you verified that work happened this session.
  4. The ## Summary line becomes the CLAUDE.md "Last session:" entry — make it specific and useful.
     Bad:  "Quality gates passed"
     Good: "Built leadership-cohort funnel page; 13 go-live blockers logged in §12"
-->

## Summary
_One sentence: what was actually shipped, fixed, or decided this session. Be specific._

## Review
<!--
  Independent fresh-eyes review of this session's CUMULATIVE diff — run /code-review or a
  fresh-context subagent that did NOT write the code. A self-review does not count.
  Fix blocking findings before closing (then re-run the quality gates); raise non-blocking
  findings as GitHub issues or list them under Deferred. Record the outcome, e.g.:
    Clean — /code-review found no blocking findings (2 nits fixed inline).
    2 blocking fixed (XSS in forms.js, dead link in nav); 1 follow-up raised as #NN.
    Skipped — docs-only session, no reviewable code diff.
-->
_Run the independent review, then record its outcome here._

## Carry-forward check
<!--
  Review .claude/sessions/ for the last 2-3 logs. For each priority listed there, mark its status:
    - ✅ Completed this session
    - 🔄 Partially done — note what remains
    - ⏭️  Carried forward — not touched this session
  Do not leave this blank. Do not assume completed without evidence.
-->
- 

## Decisions
<!-- What was decided this session that future sessions need to know? Architecture, content, tooling. -->
- 

## Deferred
<!-- What was planned or started but not finished? Include the reason for deferral. -->
- 

## State changes
<!--
  What changed in the codebase, docs, or external systems that a cold-start agent needs to know?
  e.g. new pages built, components added, Airtable fields created, env vars set, external accounts changed.
-->
- 
