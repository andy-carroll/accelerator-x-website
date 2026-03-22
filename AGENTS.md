# AGENTS.md

This repository uses a canonical instruction file. If you're an AI agent working here,
start with `AI-RULES.md` — it tells you exactly how to operate.

## Quick orientation

- **What this is:** Public marketing site for https://accelerator-x.ai
- **Stack:** Static HTML + Tailwind CDN + Node.js build pipeline → Netlify
- **Canonical rules:** `AI-RULES.md` (single source of truth — always wins)
- **Current priorities:** `ROADMAP.md`
- **Change history:** `CHANGELOG.md`

## How we work

The core principle: **we move fast by not making messes.**

Standards are enforced by automation — `scripts/check.js` (8 checks), a committed
pre-commit hook (`.githooks/pre-commit`), and GitHub Actions CI. A violation is caught
at commit time, not in a code review six months later.

Every decision has a rationale recorded at the point of decision. Reading any file
should be sufficient to understand every decision in it. No tribal knowledge required.

## Before you start work

1. Read `AI-RULES.md` — operational rules, Definition of Done, escalation triggers
2. Check `ROADMAP.md` — current sprint priorities
3. Run `npm run build` — confirm the build is clean before touching anything
4. Run `npm run check` — confirm all standards checks pass

## If this file conflicts with `AI-RULES.md`

Follow `AI-RULES.md`. This file is an orientation layer, not a rules layer.
