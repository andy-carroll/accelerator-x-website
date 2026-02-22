#!/usr/bin/env bash
# =============================================================================
# img-process.sh — Image processing pipeline for accelerator-x-website
# =============================================================================
# Usage:
#   bash scripts/img-process.sh <path/to/source.png> [width1 width2 ...]
#
# Defaults:
#   Widths: 800 400
#   WebP quality: 82
#
# Output (alongside the source file):
#   <basename>-800.png   <basename>-800.webp
#   <basename>-400.png   <basename>-400.webp
#
# Requirements:
#   - sips     (macOS built-in)
#   - cwebp    (brew install webp)
# =============================================================================

set -euo pipefail

WEBP_QUALITY=82
DEFAULT_WIDTHS=(800 400)

usage() {
  echo "Usage: $0 <source.png> [width1 width2 ...]"
  echo "Example: $0 assets/illustrations/my-image.png 800 400"
  exit 1
}

# ── Argument validation ───────────────────────────────────────────────────────

[[ $# -lt 1 ]] && usage

SOURCE="$1"
shift

if [[ ! -f "$SOURCE" ]]; then
  echo "Error: File not found: $SOURCE"
  exit 1
fi

EXT="${SOURCE##*.}"
EXT_LOWER=$(echo "$EXT" | tr '[:upper:]' '[:lower:]')
if [[ "$EXT_LOWER" != "png" && "$EXT_LOWER" != "jpg" && "$EXT_LOWER" != "jpeg" ]]; then
  echo "Error: Unsupported format '$EXT'. Use PNG or JPG source files."
  exit 1
fi

WIDTHS=("${@:-${DEFAULT_WIDTHS[@]}}")

# ── Dependency check ──────────────────────────────────────────────────────────

if ! command -v cwebp &>/dev/null; then
  echo "Error: cwebp not found."
  echo "Install with: brew install webp"
  exit 1
fi

if ! command -v sips &>/dev/null; then
  echo "Error: sips not found (expected on macOS)."
  exit 1
fi

# ── Process ───────────────────────────────────────────────────────────────────

BASENAME="${SOURCE%.*}"
ORIG_KB=$(du -k "$SOURCE" | cut -f1)

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  img-process.sh"
echo "  Source : $SOURCE (${ORIG_KB} KB)"
echo "  Widths : ${WIDTHS[*]}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

for W in "${WIDTHS[@]}"; do
  OUT_PNG="${BASENAME}-${W}.${EXT}"
  OUT_WEBP="${BASENAME}-${W}.webp"

  echo "  ▶  ${W}px"

  # Resize (sips copies the file first then resizes in-place)
  cp "$SOURCE" "$OUT_PNG"
  sips -Z "$W" "$OUT_PNG" >/dev/null 2>&1
  PNG_KB=$(du -k "$OUT_PNG" | cut -f1)
  echo "     PNG  → $OUT_PNG  (${PNG_KB} KB)"

  # Convert to WebP
  cwebp -q "$WEBP_QUALITY" "$OUT_PNG" -o "$OUT_WEBP" >/dev/null 2>&1
  WEBP_KB=$(du -k "$OUT_WEBP" | cut -f1)
  echo "     WebP → $OUT_WEBP  (${WEBP_KB} KB)"

  SAVING=$(( ORIG_KB - WEBP_KB ))
  echo "     Saving: ${SAVING} KB vs original"
  echo ""
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Done. Commit the generated variants, not the source."
echo "  Original source kept as archive: $SOURCE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
