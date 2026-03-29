# designs/

Pencil (`.pen`) design files for the Accelerator X website.

These files are plain JSON, Git-tracked alongside the code they describe.

## Structure

```
designs/
├── _system/
│   └── accelerator-x.lib.pen   ← design tokens + brand library (import this)
├── homepage.pen                 ← homepage sections
├── components.pen               ← shared UI components
└── [page].pen                   ← one file per page/section
```

## Rules

- Always reference variables (`$color-primary`) — never hardcode hex values
- `_system/` is the single source of truth for tokens; mirrors `styles.css`
- Save before switching between Claude Desktop and IDE

Full workflow doc: `docs/pencil-design-workflow.md`
