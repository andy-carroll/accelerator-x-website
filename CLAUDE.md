# CLAUDE.md

Project instructions are centralized in:

- `AI-RULES.md` (single source of truth)

Claude-specific note:

- Apply `AI-RULES.md` for workflow, coding, and safety rules.
- Always check `ROADMAP.md` to identify what is `[-] In Flight` or `[ ] To Do` before executing.
- Keep this file lightweight; avoid duplicating canonical instructions.

## Recent Session — 2026-03-21

**Completed:**
- Hero pill badges: "Boardroom clarity" + "Hands-on support" (no full stops)
- Google Search Console property live (Andy, manual)
- Article OG excerpt validator added to build-hub.js; implementation-gap excerpt fixed
- `og:url`, `article:author`, `article:published_time` meta tags added to article template
- Article JSON-LD (`Article` schema) added to all 6 articles — author, publisher, dates
- LinkedIn URLs stored in `authors.json` for both founders
- Homepage JSON-LD price corrected (8-week cycle £12k)

**Known issue carried forward:**
- LinkedIn Post Inspector still shows "No author found" despite correct JSON-LD.
  JSON-LD validates in Google Rich Results Test. Likely a LinkedIn cache/quirk.

## Next Session Priorities

1. **Share panel** — replace "LI" text with proper SVG icons, add "Share" heading (`_templates/article.html` + share panel render function in `build-hub.js`)
2. **Hero imagery** — swap interim stills for final production photos; update alt text in `content/data/hero-media.config.json`
3. **Brevo welcome email** — draft and configure single welcome email automation on list #9; also investigate `insights-subscribe` form (4 submissions — confirm if going to Brevo or nowhere)
