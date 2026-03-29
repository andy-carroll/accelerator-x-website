# PRD: Hero Media Library System

**Version:** 1.0  
**Date:** 2026-03-07  
**Status:** Implemented  

---

## 1. Problem Statement

The homepage hero section was hard-coded with static illustrations and later a founder-led composition. This created:

- **Maintenance friction:** Adding or changing hero images required manual HTML edits
- **Poor asset workflow:** No clear path to drop in real workshop/client photos
- **Performance risk:** No built-in lazy loading or responsive optimisation
- **Scalability limit:** No support for a rotating media library

### User Need

- Drop workshop/client photos into a folder
- Automatically generate optimised responsive variants
- Keep the hero fresh with a curated rotating library
- Maintain high Lighthouse scores and fast mobile load times
- Avoid manual HTML edits for hero image changes

---

## 2. Solution Overview

A **config-driven hero media library** with:

- **Source folder workflow:** `content/hero-source/` for raw photos
- **Automated processing:** Responsive variants + WebP generation
- **Generated metadata:** JSON library for build-time rendering
- **Performance-safe loading:** Eager first slide, lazy secondary slides
- **Configurable behaviour:** Badge text, timing, max slides
- **Build integration:** Hero markup generated automatically

### Key Features

| Feature | Benefit |
|---------|---------|
| Drop-in source folder | Zero-config photo ingestion |
| Automatic responsive variants | Optimal loading on all devices |
| WebP generation | Smaller files, faster loads |
| Lazy secondary slides | Better Lighthouse scores |
| Configurable rotation | Control timing and count |
| No-JS fallback | Works without JavaScript |
| Build-time rendering | No runtime dependencies |

---

## 3. Technical Architecture

### 3.1 File Structure

```
content/
├── hero-source/                 # Raw photos (private)
│   ├── workshop-01.jpg
│   ├── workshop-01.json         # Optional metadata
│   └── client-session-02.png
└── data/
    ├── hero-media.config.json   # Behaviour config
    ├── hero-media.library.json  # Manual fallback library
    └── hero-media.generated.json# Auto-generated metadata

assets/hero/generated/            # Processed variants (public)
├── workshop-01-480.webp
├── workshop-01-768.webp
├── workshop-01-1200.webp
├── workshop-01-480.jpg
├── workshop-01-768.jpg
└── workshop-01-1200.jpg

scripts/
├── process-hero-images.sh       # Image processing workflow
└── build-hero-media.js          # Hero markup generation
```

### 3.2 Data Models

#### Config (`hero-media.config.json`)
```json
{
  "badge": "Boardroom clarity. Hands-on build support.",
  "noteEyebrow": "How we work",
  "noteBody": "Senior operators in the room with your team...",
  "intervalMs": 6500,
  "sizes": "(min-width: 1024px) 42vw, 100vw",
  "maxSlides": 5
}
```

#### Library Entry (`hero-media.generated.json`)
```json
{
  "id": "workshop-01",
  "alt": "Running an AI workshop with a client leadership team",
  "basePath": "/assets/hero/generated/workshop-01",
  "fallbackExt": "jpg",
  "width": 1200,
  "height": 900,
  "variants": [480, 768, 1200],
  "active": true
}
```

### 3.3 Build Pipeline

1. **Source ingestion:** `content/hero-source/*.jpg|png`
2. **Metadata merge:** Optional sidecar JSON files
3. **Image processing:** `sips` + `cwebp` → responsive variants
4. **Library generation:** `hero-media.generated.json`
5. **Hero rendering:** `build-hero-media.js` injects markup into `index.html`

### 3.4 Runtime Behaviour

- **First slide:** Eager loading, full `<picture>` markup
- **Secondary slides:** Placeholder image + `data-*` attributes
- **Rotation:** JS hydrates next slide on demand
- **Reduced motion:** Rotation disabled
- **No JS:** First slide still displays correctly

---

## 4. User Workflow

### 4.1 Basic Usage

```bash
# 1. Add photos
cp ~/Downloads/workshop-01.jpg content/hero-source/
cp ~/Downloads/client-02.jpg content/hero-source/

# 2. Optional: add metadata
cat > content/hero-source/workshop-01.json <<EOF
{
  "alt": "Running an AI workshop with a client leadership team",
  "active": true
}
EOF

# 3. Process images
npm run process:hero-images

# 4. Build site
npm run build
```

### 4.2 Commands

| Command | Purpose |
|---------|---------|
| `npm run process:hero-images` | Process source photos into responsive variants |
| `npm run build:hero-media` | Generate hero markup from config/library |
| `npm run build` | Full build (includes hero media) |

---

## 5. Performance Considerations

### 5.1 Loading Strategy

- **First slide:** `loading="eager"` + immediate `<picture>` markup
- **Secondary slides:** 1x1 transparent GIF + `data-*` attributes
- **Hydration:** JS upgrades to real images only when needed for rotation
- **Reduced motion:** No rotation, first slide only

### 5.2 Image Optimisation

- **Responsive variants:** 480px, 768px, 1200px
- **WebP conversion:** Quality 82, typically 30-60% size reduction
- **Proper sizing:** `width`/`height` attributes prevent CLS
- **Srcset/sizes:** Browser selects optimal variant

### 5.3 Lighthouse Impact

- **Target:** 95+ mobile, 98+ desktop
- **Key factors:** Single eager load, lazy secondary slides, WebP
- **Realistic range:** 95-100 is achievable with 3-5 active slides

---

## 6. Configuration Options

### 6.1 Behaviour Settings (`hero-media.config.json`)

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `badge` | string | — | Badge text overlay |
| `noteEyebrow` | string | — | Note section eyebrow |
| `noteBody` | string | — | Note section body text |
| `intervalMs` | number | 6500 | Rotation interval (ms) |
| `sizes` | string | "(min-width: 1024px) 42vw, 100vw" | `<picture>` sizes attribute |
| `maxSlides` | number | 5 | Maximum active slides |

### 6.2 Image Metadata (sidecar JSON)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `alt` | string | No | Alt text (defaults to filename) |
| `active` | boolean | No | Include in rotation (defaults to true for first N) |

---

## 7. Implementation Status

### 7.1 Completed Features

- ✅ Source folder workflow (`content/hero-source/`)
- ✅ Image processing script (`process-hero-images.sh`)
- ✅ Responsive variant generation (480/768/1200px)
- ✅ WebP conversion
- ✅ Generated metadata JSON
- ✅ Config-driven hero rendering
- ✅ Lazy secondary slide loading
- ✅ Reduced motion support
- ✅ Build integration
- ✅ Regression tests

### 7.2 Technical Debt / Future Enhancements

- **Automatic source cleanup:** Archive processed sources automatically
- **Image validation:** Warn on low-resolution or poorly-compressed sources
- **Drag-and-drop UI:** Web interface for non-technical users
- **Video support:** Extend to video hero assets
- **A/B testing:** Different hero libraries per cohort

---

## 8. Rollout Plan

### 8.1 Migration Path

1. **Manual fallback:** Existing `hero-media.library.json` preserves current hero
2. **Gradual adoption:** Drop in real photos when available
3. **Performance monitoring:** Track Lighthouse scores after rollout
4. **User feedback:** Monitor for visual consistency issues

### 8.2 Success Metrics

- **Performance:** Lighthouse 95+ mobile, 98+ desktop
- **Workflow:** <2 minutes from photo drop to live hero
- **Maintenance:** Zero HTML edits required for hero changes
- **Quality:** All hero images under 200KB, proper alt text

---

## 9. Dependencies

### 9.1 External Tools

- `sips` (macOS built-in) — Image resizing
- `cwebp` (brew install webp) — WebP conversion
- Node.js — Build scripts
- Bash — Processing workflow

### 9.2 Internal Systems

- Build pipeline (`npm run build`)
- Image audit (`scripts/img-audit.sh`)
- Regression tests (`scripts/test-site.js`)

---

## 10. Security & Privacy

- **Source isolation:** Raw photos kept in `content/` (not publicly served)
- **Generated assets only:** Only processed variants in `assets/`
- **No external uploads:** All processing happens locally
- **Metadata safety:** Sidecar JSON validated during processing

---

## 11. Monitoring & Maintenance

### 11.1 Health Checks

- `npm run test:site` — Hero media library regression test
- `bash scripts/img-audit.sh` — Image size/attribute audit
- Visual inspection — Hero renders correctly across breakpoints

### 11.2 Maintenance Tasks

- Periodic source folder cleanup
- Review active slide count vs `maxSlides`
- Update badge/note copy as needed
- Monitor Lighthouse scores after changes

---

## 12. Appendix

### 12.1 File Reference

| File | Purpose |
|------|---------|
| `content/data/hero-media.config.json` | Behaviour configuration |
| `content/data/hero-media.library.json` | Manual fallback library |
| `content/data/hero-media.generated.json` | Auto-generated metadata |
| `scripts/process-hero-images.sh` | Image processing workflow |
| `scripts/build-hero-media.js` | Hero markup generation |
| `assets/js/main.js` | Runtime slide rotation logic |

### 12.2 Example Output

After processing `workshop-01.jpg`:

```bash
$ npm run process-hero-images
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  process-hero-images.sh
  Source : content/hero-source
  Output : assets/hero/generated
  Widths : 480 768 1200
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ▶  workshop-01.jpg
     480px → workshop-01-480.jpg (45 KB) | workshop-01-480.webp (12 KB)
     768px → workshop-01-768.jpg (89 KB) | workshop-01-768.webp (24 KB)
     1200px → workshop-01-1200.jpg (156 KB) | workshop-01-1200.webp (42 KB)

Generated: content/data/hero-media.generated.json
Done. Commit processed hero assets and generated JSON; keep source photos in content/hero-source/ as private working assets.
```

---

**Document owners:** Andy Carroll  
**Reviewers:** Toby Henry  
**Related files:** `README.md`, `CHANGELOG.md`, `ROADMAP.md`
