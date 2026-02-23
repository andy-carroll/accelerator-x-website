# Changelog

All notable changes to this project are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)

---

## [Unreleased]

---

## [0.2.0] — 2026-02-23 · Image pipeline, design system clean-up

### Added
- `scripts/img-process.sh` — resize source PNG to 800w/400w + WebP conversion via `cwebp`
- `scripts/img-audit.sh` — pre-publish audit; exits 1 on oversized images, missing `<img>` attributes, or large unresponsive sources
- Optimised responsive variants of `AX-image-04-rounded` (800w/400w · WebP + PNG fallback)
- §7 Image Standards added to `docs/design-system.md`
- Image pipeline guidance added to `AI-RULES.md` (§3 Allowed, §4 Verification, §10 Decision log)

### Changed
- Section 2 hero image converted to `<picture>` element with WebP source, PNG fallback, `srcset`, `sizes`, intrinsic dimensions, and `loading="eager"`
- All `<img>` tags across `index.html` given intrinsic `width`/`height`, `loading`, and `decoding` attributes (CLS prevention)
- `.legal-card` hardcoded hex values replaced with CSS design tokens (`var(--color-*)`)
- Diff-card grid `style="padding-top: 4rem;"` inline style replaced with Tailwind `pt-16`

### Fixed
- `AX-image-04-rounded.png` (5.8 MB) failed to load on mobile cellular — now served as 45.9 KB WebP
- Header logo HTML `width` attribute without `w-auto` class caused full-width stretch — fixed

---

## [0.1.0] — 2026-02-22 · Brand pack, typography, section styling

### Added
- Self-hosted Aptos font (brand alignment)
- Brand pack assets applied across site
- Differentiators section with brand illustrations
- Process section with pastel cards and step indicators
- Problem section with two-column layout and illustration
- `docs/design-system.md` — design system reference
- `AI-RULES.md` — AI agent rules and decision log
- `netlify.toml` — cache headers and security headers
- `docs/landing-page-spec.md` — phased product spec (Phases 1–3)

### Changed
- Apply section underline restyled to hand-drawn pattern
- Diff-cards: mobile top margin added to clear illustration overlap

---

*Project started: February 2026*
