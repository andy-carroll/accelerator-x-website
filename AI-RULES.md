# AI Rules (Canonical)

This is the single source of truth for AI coding assistants in this repository.

Adapters:

- `AGENTS.md`
- `CLAUDE.md`

If any adapter conflicts with this file, follow `AI-RULES.md`.

## 1) Project context

- Project: Accelerator X public website — live at `https://accelerator-x.ai`
- Strategic roadmap: `ROADMAP.md` (always check before starting work)
- Active checklist: `docs/go-live-checklist.md` (priority-ordered outstanding items)
- Primary specs: `docs/landing-page-spec.md`, `docs/content-hub-plan.md`
- Stack: static HTML + Tailwind CSS (CDN) + custom CSS (`styles.css`)
- Build system: `npm run build` — wraps `scripts/build-hub.js` (articles + sitemap),
  `scripts/build-hero-media.js` (hero markup), `scripts/build-testimonials.js` (testimonials)
- Deploy: Netlify, auto-deploys from `main`. Pre-built artefacts are committed; Netlify
  serves the repo root as-is (no build command on Netlify).
- Email capture: Brevo (list #9 — Main AX Newsletter). Netlify Forms → `submission-created`
  function → Brevo API + Slack `#website-leads`.

## 2) Philosophy

**We move fast by not making messes.**

Speed comes from clarity, not shortcuts. A hardcoded secret takes 30 seconds to write and
hours to find later. An inline script takes 2 minutes to add and creates a debugging session
months later. The mess is what slows you down — not the care.

### What this means

- Every decision has a rationale, recorded at the point of decision — not in a separate doc,
  not "I'll add it later"
- Standards are enforced by automation, not memory or discipline — if a rule can be violated
  without being caught, it will be
- The codebase explains itself — no tribal knowledge, no verbal walkthroughs required
- Reflection is built in — every session ends with the system in a better, more coherent state
  than it started

### Comments: co-located, proportional, and pointing

Inline comments exist for things that could be misread or where a future reader might ask
"why is it done this way?". The answer goes right there — one clear line of *why*, not *what*.
If a comment needs more than two lines, the code probably needs restructuring, not annotation.

When deeper context exists — a spec, a design decision, a longer rationale — the comment
points to it directly. The reader never hunts. Either the comment is sufficient, or it tells
you exactly where to go.

```js
// Single opt-in — no Brevo confirmation email. Decision: docs/email-strategy.md
// Webhook URL from env — never hardcode. See §Philosophy "We never" below.
```

The gold standard: reading a file is sufficient to understand every decision in it.
No external context required — but if it exists, the pointer is always there.

### We never

Each rule is either automated (enforced by `scripts/check.js` or CI) or explicitly
classified as not-automatable with a stated reason. Adding a rule without classifying it
causes `npm run check` to fail. A rule without enforcement is a wish, not a rule.

- Commit without updating `CHANGELOG.md`
  <!-- check: .github/workflows/doc-freshness.yml -->
- Add inline `<script>` blocks to HTML files or templates
  <!-- check: scripts/check.js#1 -->
- Hardcode secrets, URLs, or credentials that belong in environment variables
  <!-- check: scripts/check.js#2 -->
- Leave dead code, dead files, or dead references — remove them, or comment exactly why they
  must stay <!-- not-automatable: requires human judgment about intent and context -->
- Make a change without first understanding why the thing being changed exists
  <!-- not-automatable: requires human judgment; enforced by agent behaviour contract §6 -->
- Write a comment that describes *what* code does — only *why* it does it that way
  <!-- not-automatable: requires human judgment about comment content -->
- Use hardcoded colour values outside CSS design token definitions in `styles.css`
  <!-- check: scripts/check.js#7 -->
- Ship built HTML with missing `alt` attributes or duplicate `id` values
  <!-- check: scripts/check.js#8 -->

### Core goals

- Ship clean, credible, conversion-ready updates quickly
- Keep implementation simple and maintainable
- Avoid framework or tooling complexity unless explicitly required

## 3) Allowed / disallowed changes

Allowed by default:

- Edit `index.html`, `styles.css`, `assets/`, `docs/`, `_templates/`, `content/`, `scripts/`.
- Improve clarity, UX, accessibility, and conversion copy/structure.
- Small, focused refactors that reduce risk.
- Process new images with `bash scripts/img-process.sh` before committing them.
- Run `bash scripts/img-audit.sh` as a pre-publish check.

Do not do unless explicitly asked:

- Introduce new framework or build system.
- Add heavy dependencies.
- Change deployment platform strategy.
- Commit secrets or modify environment credentials.

### No inline scripts

**Never add `<script>` blocks directly in HTML files or templates.**

All JavaScript belongs in `assets/js/`. The pattern is:

- Form handling → `assets/js/forms.js`
- Analytics → `assets/js/analytics.js`
- New behaviour → create `assets/js/<name>.js`, reference with `<script defer src="...">`

Inline scripts break the separation of concerns, are harder to test and review,
and have caused real bugs (competing event listeners, build scripts overwriting edits).
This rule has no exceptions — if you find yourself adding a `<script>` block to HTML, stop and externalise it.

## 4) Local run + verification

Primary build + preview:

```bash
npm run build   # regenerates all HTML artefacts
npm run dev     # serves site at http://localhost:5000
```

Before proposing completion, verify:

- `npm run build` exits 0 with no errors or warnings
- page loads without console-breaking issues
- links and key sections render correctly
- mobile + desktop layout remain usable
- run `bash scripts/img-audit.sh` — must exit 0 with no issues

When adding new images:

- run `bash scripts/img-process.sh <source.png> 800 400` to generate optimised variants
- commit the generated `-800`/`-400` PNG and WebP files, not the raw source
- use `<picture>` with WebP `<source>` + PNG `<img>` fallback for illustrations over 150 KB
- see `docs/design-system.md` §7 for full image standards

## 5) Git workflow

### Current policy: direct commits to `main`

This is a solo repository. Direct commits to `main` are the current operating model.
There is no PR review step — it adds friction with no benefit when there is one author.

```bash
# Standard commit flow
git add <specific files>
git commit -m "<type>(<scope>): <summary>"
git push origin main
```

Commit types: `feat`, `fix`, `docs`, `refactor`, `chore`, `style`

### When to migrate to feature branches + PRs

Switch to `feat/<name>` / `agent/<name>` branches and PR-based merges when **any** of
the following become true:

- A second human collaborator starts committing to the repo
- Autonomous AI agents are running in parallel worktrees (planned — see ROADMAP.md)
- Risky or irreversible operations (DB migrations, payment flows) require a review gate

Document the switch in §10 Decision log when it happens.

### Branch protection (GitHub)

When the migration to PRs happens, enable branch protection on `main` immediately:

- GitHub → repo Settings → Branches → Add rule → Branch name: `main`
- Require status checks to pass: `Standards / Build passes`,
  `Standards / Standards check passes`, `Doc Freshness / CHANGELOG updated`
- Require branches to be up to date before merging
- Do not allow bypassing the above settings

This is a GitHub UI setting — not enforceable from the repo itself.
Until PRs are adopted, CI runs on push to `main` and the pre-commit hook
provides local enforcement.

## 6) Agent behaviour contract

- Ask clarifying questions if requirements are ambiguous.
- Prefer minimal diffs over broad rewrites.
- Keep file naming/style consistent with existing repo patterns.
- Document assumptions explicitly in output.
- If you notice unexpected unrelated changes, stop and ask before proceeding.
- Always run `npm run build` before declaring work complete.

## 7) Definition of Done

A task is **not complete** until all of the following are true:

1. `npm run build` exits 0 — no errors, no warnings
2. `bash scripts/img-audit.sh` exits 0 (if images were touched)
3. **`CHANGELOG.md` updated** — new entry under `[Unreleased]` describing what changed and why
4. **`ROADMAP.md` updated** — completed items marked `[x]`, new items added if they emerged
5. **`README.md` updated** — if the stack, workflow, or repo layout changed
6. Changes committed with a clear, typed commit message
7. Pushed to `main`

Steps 3–5 are non-negotiable. Skipping them is the primary cause of documentation drift.
If a change is too small to warrant a CHANGELOG entry, it is probably too small to commit
separately — batch it with related work.

## 8) Output format expectations

When delivering work, include:

1. What changed
2. Why it changed
3. Files touched
4. How it was verified (build result, audit result)
5. Any follow-up recommendations

## 9) Escalation triggers

Pause and ask human before:

- destructive operations
- production-impacting deployment changes
- irreversible data changes
- security/privacy-sensitive modifications

## 10) Maintenance

Keep this file concise and operational.
If project workflow changes, update this file first, then adapters (`CLAUDE.md`, `AGENTS.md`).

## 11) Decision log

- 2026-02-14: Adopted single-source AI instructions (`AI-RULES.md`) with thin adapters
  (`AGENTS.md`, `CLAUDE.md`) to avoid rule drift across tools.
- 2026-02-22: Adopted image optimisation pipeline — `scripts/img-process.sh` +
  `scripts/img-audit.sh`. Full standards in `docs/design-system.md` §7.
- 2026-03-21: Direct-to-main git policy formalised. Solo repo — no PR overhead until a
  second collaborator (human or autonomous AI agent) joins. Migrate trigger documented in §5.
- 2026-03-21: Definition of Done added to §7. CHANGELOG + ROADMAP + README updates are now
  mandatory gates, enforced by GitHub Actions CI on every push to `main`.
- 2026-03-21: Philosophy section added to §2. Core principle: move fast by not making messes.
  Standards enforced by automation. Comments co-located, proportional, and pointing — the code
  is the document; external context is reachable but never required.

<!-- Session 20260322-211525 logged -->

<!-- Session 20260322-234000 logged -->

<!-- Session 20260322-235352 logged -->

<!-- Session 20260329-180314 logged -->

<!-- SESSION_PROTOCOL:START -->
- Session ID: 20260329-194908
- Updated: 2026-03-29T18:49:10.040Z
- Mode: write
<!-- SESSION_PROTOCOL:END -->
