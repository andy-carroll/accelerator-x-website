# Pencil Design Workflow
*Accelerator X — Design ↔ Engineering System*

> **One-line summary:** `.pen` files live in the repo alongside the code, AI drives both, Git keeps them in sync.

---

## What Is Pencil?

[Pencil](https://pencil.dev) is a vector design tool that runs **inside your IDE** (Cursor, Windsurf, VS Code) and connects to AI assistants (Claude, etc.) via MCP. It is not a cloud app — there is no Figma-style web interface.

The key difference from every other design tool: **design files are plain JSON (`.pen`), tracked in Git, living in the same repo as the code they describe.**

---

## Why It Matters

Most design↔engineering workflows have a painful gap:

```
Designer (Figma) → Export/handoff → Developer (code)
                        ↑ gap lives here
```

Pencil collapses this gap by making design a first-class citizen of the codebase:

- `.pen` files are diffable, branchable, and reviewable like any other code file
- CSS variables in `styles.css` sync bidirectionally with Pencil variables — one source of truth
- AI (Claude via MCP) can read and write both the design files and the code
- No context switching: design and code are in the same workspace

This is the foundation for an **agentic design + engineering loop** — where AI can hold the full picture and maintain consistency across both layers.

---

## What We're Building With It

**Immediate:** Backfill designs for the Accelerator X website. The site was built without design files. We're creating the `.pen` source of truth retroactively, establishing the variable/token system, and validating the workflow.

**Medium-term:** All new features designed in Pencil first → AI generates or updates code → CSS changes sync back to variables. Design and code never diverge.

**Longer-term:** A documented, repeatable system for design + engineering using AI agents. Applicable to any web product, web app, or digital experience. Commercially valuable and transferable to other businesses.

---

## How It Works

### The File Model

```
accelerator-x-website/
├── designs/
│   ├── _system/
│   │   └── accelerator-x.lib.pen   ← design tokens + brand components (library)
│   ├── homepage.pen                 ← page-level designs
│   ├── components.pen               ← shared UI components
│   └── [future pages].pen
├── styles.css                       ← CSS variables (synced with Pencil variables)
└── index.html
```

**`_system/accelerator-x.lib.pen`** is a Pencil *library file* — a permanent design system containing tokens (colours, spacing, typography), brand components, and shared patterns. All other `.pen` files import from it. It maps directly to the CSS variables in `styles.css`.

**Page `.pen` files** import the library and contain page-level frames. One file per page or logical section.

### The Variable Bridge

Pencil variables ↔ `styles.css` CSS custom properties. Our token set:

| Category | CSS variable | Pencil variable |
|---|---|---|
| Brand teal | `--color-primary: #088abf` | `$color-primary` |
| Brand pink | `--color-accent: #e93f8e` | `$color-accent` |
| Navy text | `--color-navy: #1b2a4a` | `$color-navy` |
| Muted text | `--color-muted: #64748b` | `$color-muted` |
| Surface | `--color-surface: #f8fafc` | `$color-surface` |
| Border | `--color-border: #e2e8f0` | `$color-border` |
| Font | `--font-display: "Aptos"` | `$font-display` |
| Border radius md | `--radius-md: 0.5rem` | `$radius-md` |

When a CSS variable changes, the Pencil variable updates. When a Pencil variable changes, the CSS updates. Neither design nor code leads — they stay in sync.

### The MCP Connection

Claude connects to Pencil via the Model Context Protocol (MCP). This means Claude can:

- Read the current canvas state (`get_editor_state`)
- Create, modify, and delete design nodes (`batch_design`)
- Read and update design variables (`get_variables`, `set_variables`)
- Take screenshots to verify output (`get_screenshot`)
- Open specific `.pen` files (`open_document`)

This is what makes the agentic loop possible — Claude holds context on both the design and the code simultaneously.

---

## Environments + Handoff Protocol

You'll work across two environments. The file on disk is the shared state.

| Environment | Best for |
|---|---|
| **Claude Desktop** (here) | AI-driven generation, bulk creation, token work |
| **Cursor / Windsurf** | Manual refinement, visual tweaking, component exploration |

### The One Rule

> **Whoever is driving saves before handing off.**

- Switching **IDE → Claude Desktop**: `Cmd+S` in IDE, then ask Claude to `open_document`
- Switching **Claude Desktop → IDE**: Claude saves via MCP, then open the file in IDE

**Why this matters:** Pencil has no auto-save. The MCP reads from disk. If you have unsaved changes in the IDE buffer and Claude makes MCP calls, Claude is working from a stale file and may clobber your changes.

---

## Known Limitations

| Issue | Workaround |
|---|---|
| No auto-save | `Cmd+S` frequently; treat it like a terminal command |
| Undo/redo limited | Commit to Git regularly — that's your real undo |
| No real-time multiplayer | Git branches for parallel work |
| Can't see unsaved IDE changes | Save before switching to Claude |
| Library files are permanent | Plan `_system/` carefully before converting to `.lib.pen` |

---

## Workflow: Feature from Idea to Code

```
1. Spec
   └─ Product requirement captured (Notion / Airtable)

2. Design (Pencil)
   └─ Claude generates initial layout in .pen file
   └─ Manual refinement in Cursor/Windsurf
   └─ Variables referenced throughout (never hardcoded values)

3. Review
   └─ Screenshot captured, shared for feedback
   └─ Iterate on .pen file

4. Code generation
   └─ Claude reads final .pen design
   └─ Generates HTML/CSS or component code
   └─ Code lands in codebase

5. Sync
   └─ Any CSS adjustments synced back to Pencil variables
   └─ Design and code remain consistent
```

---

## Getting Started (Setup Checklist)

- [ ] Pencil installed in Cursor or Windsurf (extension)
- [ ] Pencil activated (email-based, one-time)
- [ ] Claude Code CLI installed: `npm install -g @anthropic-ai/claude-code-cli`
- [ ] Claude authenticated: `claude` (opens browser)
- [ ] MCP server confirmed connected in IDE settings
- [ ] `designs/` folder created in repo root
- [ ] Design tokens from `styles.css` loaded into `_system/accelerator-x.lib.pen`

---

## Reference

- Pencil docs: https://docs.pencil.dev
- Our CSS variables: `styles.css` (`:root` block, lines ~75–135)
- Our design system doc: `docs/design-system.md`
- Our existing tokens: `--color-*`, `--font-*`, `--space-*`, `--radius-*`, `--shadow-*`
