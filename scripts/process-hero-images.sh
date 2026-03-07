#!/usr/bin/env bash
# =============================================================================
# process-hero-images.sh — Build hero media variants + generated library JSON
# =============================================================================
# Usage:
#   bash scripts/process-hero-images.sh
#
# Source folder:
#   content/hero-source/
#
# Outputs:
#   assets/hero/generated/<slug>-480.<ext>
#   assets/hero/generated/<slug>-768.<ext>
#   assets/hero/generated/<slug>-1200.<ext>
#   assets/hero/generated/<slug>-480.webp
#   assets/hero/generated/<slug>-768.webp
#   assets/hero/generated/<slug>-1200.webp
#   content/data/hero-media.generated.json
#
# Sidecar metadata (optional, per image):
#   content/hero-source/<filename>.json
#   {
#     "alt": "Workshop with leadership team",
#     "active": true
#   }
#
# Requirements:
#   - sips     (macOS built-in)
#   - cwebp    (brew install webp)
# =============================================================================

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SOURCE_DIR="$ROOT_DIR/content/hero-source"
OUTPUT_DIR="$ROOT_DIR/assets/hero/generated"
OUTPUT_JSON="$ROOT_DIR/content/data/hero-media.generated.json"
WIDTHS=(480 768 1200)
WEBP_QUALITY=82
MAX_ACTIVE=5

usage_note() {
  echo "Drop JPG/PNG workshop photos into: content/hero-source/"
  echo "Optional sidecar JSON: content/hero-source/<filename>.json"
}

slugify() {
  printf '%s' "$1" \
    | tr '[:upper:]' '[:lower:]' \
    | sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//'
}

json_escape() {
  python3 -c 'import json,sys; print(json.dumps(sys.argv[1]))' "$1"
}

sidecar_field() {
  local sidecar="$1"
  local field="$2"
  python3 - "$sidecar" "$field" <<'PYEOF'
import json, sys, pathlib
sidecar = pathlib.Path(sys.argv[1])
field = sys.argv[2]
if not sidecar.exists():
    raise SystemExit(0)
with sidecar.open(encoding='utf-8') as f:
    data = json.load(f)
value = data.get(field)
if value is None:
    raise SystemExit(0)
if isinstance(value, bool):
    print('true' if value else 'false')
else:
    print(value)
PYEOF
}

if ! command -v cwebp >/dev/null 2>&1; then
  echo "Error: cwebp not found. Install with: brew install webp"
  exit 1
fi

if ! command -v sips >/dev/null 2>&1; then
  echo "Error: sips not found (expected on macOS)."
  exit 1
fi

mkdir -p "$SOURCE_DIR" "$OUTPUT_DIR"

shopt -s nullglob
FILES=("$SOURCE_DIR"/*.png "$SOURCE_DIR"/*.jpg "$SOURCE_DIR"/*.jpeg "$SOURCE_DIR"/*.JPG "$SOURCE_DIR"/*.JPEG "$SOURCE_DIR"/*.PNG)
shopt -u nullglob

if [[ ${#FILES[@]} -eq 0 ]]; then
  echo "No hero source images found."
  usage_note
  printf '[]\n' > "$OUTPUT_JSON"
  exit 0
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  process-hero-images.sh"
echo "  Source : $SOURCE_DIR"
echo "  Output : $OUTPUT_DIR"
echo "  Widths : ${WIDTHS[*]}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

entries=()
active_count=0

for file in "${FILES[@]}"; do
  filename="$(basename "$file")"
  ext="${filename##*.}"
  ext_lower="$(printf '%s' "$ext" | tr '[:upper:]' '[:lower:]')"
  base_no_ext="${filename%.*}"
  slug="$(slugify "$base_no_ext")"
  sidecar="$SOURCE_DIR/$base_no_ext.json"

  alt="$(sidecar_field "$sidecar" alt || true)"
  active="$(sidecar_field "$sidecar" active || true)"

  if [[ -z "$alt" ]]; then
    alt="$base_no_ext"
  fi

  if [[ -z "$active" ]]; then
    if [[ $active_count -lt $MAX_ACTIVE ]]; then
      active="true"
    else
      active="false"
    fi
  fi

  if [[ "$active" == "true" && $active_count -lt $MAX_ACTIVE ]]; then
    active_count=$((active_count + 1))
  elif [[ "$active" == "true" ]]; then
    active="false"
  fi

  echo "  ▶  $filename"

  for width in "${WIDTHS[@]}"; do
    out_raster="$OUTPUT_DIR/$slug-$width.$ext_lower"
    out_webp="$OUTPUT_DIR/$slug-$width.webp"

    cp "$file" "$out_raster"
    sips -Z "$width" "$out_raster" >/dev/null 2>&1
    cwebp -q "$WEBP_QUALITY" "$out_raster" -o "$out_webp" >/dev/null 2>&1

    raster_kb=$(du -k "$out_raster" | cut -f1)
    webp_kb=$(du -k "$out_webp" | cut -f1)
    echo "     ${width}px → ${slug}-${width}.${ext_lower} (${raster_kb} KB) | ${slug}-${width}.webp (${webp_kb} KB)"
  done

  dims=$(sips -g pixelWidth -g pixelHeight "$file" | awk '/pixelWidth/ {w=$2} /pixelHeight/ {h=$2} END {print w" "h}')
  width_px="$(printf '%s' "$dims" | awk '{print $1}')"
  height_px="$(printf '%s' "$dims" | awk '{print $2}')"

  if [[ -z "$width_px" || -z "$height_px" ]]; then
    width_px=1200
    height_px=900
  fi

  escaped_alt="$(json_escape "$alt")"
  entry=$(cat <<EOF
  {
    "id": "${slug}",
    "alt": ${escaped_alt},
    "basePath": "/assets/hero/generated/${slug}",
    "fallbackExt": "${ext_lower}",
    "width": ${width_px},
    "height": ${height_px},
    "variants": [480, 768, 1200],
    "active": ${active}
  }
EOF
)
  entries+=("$entry")
  echo ""
done

{
  echo '['
  for i in "${!entries[@]}"; do
    printf '%s' "${entries[$i]}"
    if [[ $i -lt $((${#entries[@]} - 1)) ]]; then
      echo ','
    else
      echo ''
    fi
  done
  echo ']'
} > "$OUTPUT_JSON"

echo "Generated: $OUTPUT_JSON"
echo "Done. Commit processed hero assets and generated JSON; keep source photos in content/hero-source/ as private working assets."
