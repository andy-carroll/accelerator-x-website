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
- Process new images with `bash scripts/img-process.sh` before committing them.
- Run `bash scripts/img-audit.sh` as a pre-publish check.

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
- run `bash scripts/img-audit.sh` — must exit 0 with no issues

When adding new images:

- run `bash scripts/img-process.sh <source.png> 800 400` to generate optimised variants
- commit the generated `-800`/`-400` PNG and WebP files, not the raw source
- use `<picture>` with WebP `<source>` + PNG `<img>` fallback for illustrations over 150 KB
- see `docs/design-system.md` §7 for full image standards

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

## 10) Decision log

- 2026-02-14: adopted single-source AI instructions (`AI-RULES.md`) with thin adapter files (`AGENTS.md`, `CLAUDE.md`) to avoid rule drift across tools.
- Rationale and context: see `README.md` -> "AI instruction architecture (decision record)".
- 2026-02-22: adopted image optimisation pipeline — `scripts/img-process.sh` (resize + WebP conversion) and `scripts/img-audit.sh` (pre-publish checks). Full standards in `docs/design-system.md` §7.
