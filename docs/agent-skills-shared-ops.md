# Shared Agent Skills Operations

Use one canonical skills repository across all project repos and sync into a single local install path.

## Purpose

This repo does not duplicate skills per project. It points to a canonical skills source and installs
those skills to `~/.claude/skills` so any repo/session can use the same shared skill set.

## Files in this repo

- `.agent-skills-profile.json` — repo-level pointer to canonical skills repo + install settings
- `scripts/skills-sync.js` — pulls canonical repo and syncs skill folders into local install path
- `package.json` scripts:
  - `npm run skills:sync`
  - `npm run skills:sync:force`

## Profile fields

```json
{
  "canonicalRepo": "https://github.com/your-org/agent-skills.git",
  "ref": "main",
  "skillsPath": "skills",
  "installDir": "~/.claude/skills",
  "syncMode": "symlink",
  "namespace": "shared-core",
  "namePrefix": "core-"
}
```

- `canonicalRepo`: source-of-truth skills repository
- `ref`: branch or tag to sync
- `skillsPath`: folder in canonical repo containing skill directories
- `installDir`: local runtime directory used by your agent tooling
- `syncMode`: `symlink` (recommended) or `copy`
- `namespace`: manifest namespace for managed cleanup
- `namePrefix`: optional prefix to avoid naming collisions

## Standard workflow

1. Set your real canonical repo URL in `.agent-skills-profile.json`.
2. Run `npm run skills:sync`.
3. Start your coding session normally.
4. Re-run sync when canonical skills are updated.

## Force refresh

Use `npm run skills:sync:force` when you need to replace existing local skill folders.

## How this scales across many repos

- Keep one canonical `agent-skills` repo.
- Keep a small profile file in each project repo.
- Every repo runs the same sync command into the same local install path.
- Multiple concurrent sessions in different repos still use one shared skills baseline.
