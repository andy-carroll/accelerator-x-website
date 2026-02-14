# AI Rules (Canonical)

This is the single source of truth for AI coding assistants in this repository.

Adapters:

- `AGENTS.md`
- `CLAUDE.md`

If any adapter conflicts with this file, follow `AI-RULES.md`.

## 1) Project context

- Project: Accelerator X public website
- Current scope: Phase 1 static landing page MVP
- Primary spec: `docs/landing-page-spec.md`
- Stack: static HTML + Tailwind CDN + small custom CSS
- Build system: none

## 2) Core goals

- Ship clean, credible, conversion-ready page updates quickly.
- Keep implementation simple and maintainable.
- Avoid framework/tooling complexity unless explicitly requested.

## 3) Allowed / disallowed changes

Allowed by default:

- Edit `index.html`, `styles.css`, `assets/`, and `docs/`.
- Improve clarity, UX, accessibility, and conversion copy/structure.
- Small, focused refactors that reduce risk.

Do not do unless explicitly asked:

- Introduce new framework/build system.
- Add heavy dependencies.
- Change deployment platform strategy.
- Commit secrets or modify environment credentials.

## 4) Local run + verification

Primary local preview:

```bash
python3 -m http.server 8080
```

Then open:

- `http://localhost:8080`

Before proposing completion, verify:

- page loads without console-breaking issues
- links and key sections render correctly
- mobile + desktop layout remain usable

## 5) Git workflow (required)

Canonical branch policy:

- `main` is protected/read-only for direct pushes.
- Work on `agent/<task-name>` or `feat/<task-name>` branches.
- Merge via PR to `main`.

Start work:

```bash
git checkout main
git fetch origin --prune
git pull --ff-only origin main
git checkout -b agent/<task-name>
```

Finish work:

```bash
git add -A
git commit -m "<clear summary>"
git push -u origin agent/<task-name>
```

After merge (sync both VPS and local clones):

```bash
git checkout main
git fetch origin --prune
git pull --ff-only origin main
```

## 6) Agent behavior contract

- Ask clarifying questions if requirements are ambiguous.
- Prefer minimal diffs over broad rewrites.
- Keep file naming/style consistent with existing repo patterns.
- Document assumptions explicitly in output.
- If you notice unexpected unrelated changes, stop and ask before proceeding.

## 7) Output format expectations

When delivering work, include:

1. What changed
2. Why it changed
3. Files touched
4. How it was verified
5. Any follow-up recommendations

## 8) Escalation triggers

Pause and ask human before:

- destructive operations
- production-impacting deployment changes
- irreversible data changes
- security/privacy-sensitive modifications

## 9) Maintenance

Keep this file concise and operational.
If project workflow changes, update this file first, then adapters.
