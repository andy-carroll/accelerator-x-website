#!/usr/bin/env bash
# =============================================================================
# img-audit.sh — Pre-publish image audit for accelerator-x-website
# =============================================================================
# Usage:
#   bash scripts/img-audit.sh
#
# Checks:
#   1. Any PNG/JPG in assets/ over the size threshold (default: 200 KB)
#   2. Any <img> tags in index.html missing: width, height, loading, decoding
#   3. Any <img> whose src resolves to a file >150 KB with no srcset
#
# Exit code:
#   0  — no issues found
#   1  — one or more issues found
#
# Run this before every publish / PR. Also useful as a session-start scan.
# =============================================================================

set -euo pipefail

# ── Config ────────────────────────────────────────────────────────────────────

SIZE_WARN_KB=200        # warn if raster image file exceeds this
SRCSET_WARN_KB=150      # warn if img src file exceeds this and no srcset present
ASSETS_DIR="assets"
HTML_FILE="index.html"

# ── Colour helpers ────────────────────────────────────────────────────────────

RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
RESET='\033[0m'

warn()  { echo -e "  ${YELLOW}⚠  $*${RESET}"; }
error() { echo -e "  ${RED}✖  $*${RESET}"; }
ok()    { echo -e "  ${GREEN}✔  $*${RESET}"; }

# ── State ─────────────────────────────────────────────────────────────────────

ISSUES=0

# ── 1. File size check ────────────────────────────────────────────────────────

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  img-audit.sh — Accelerator X"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  [1/3] File size check (threshold: ${SIZE_WARN_KB} KB)"
echo ""

SIZE_ISSUES=0
while IFS= read -r -d '' FILE; do
  # Skip -800 / -400 variants (they're the outputs; source files may intentionally be large)
  BASENAME=$(basename "$FILE" | sed 's/\.[^.]*$//')
  if [[ "$BASENAME" =~ -[0-9]+$ ]]; then
    continue
  fi
  SIZE_KB=$(du -k "$FILE" | cut -f1)
  if [[ "$SIZE_KB" -gt "$SIZE_WARN_KB" ]]; then
    error "LARGE FILE: $FILE — ${SIZE_KB} KB (>${SIZE_WARN_KB} KB)"
    error "  Run: bash scripts/img-process.sh $FILE"
    SIZE_ISSUES=$((SIZE_ISSUES + 1))
    ISSUES=$((ISSUES + 1))
  fi
done < <(find "$ASSETS_DIR" -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \) -print0)

[[ "$SIZE_ISSUES" -eq 0 ]] && ok "All raster images are under ${SIZE_WARN_KB} KB"

# ── 2 & 3. HTML attribute checks (Python for reliable HTML parsing) ───────────

echo ""
echo "  [2/3] HTML attribute check (index.html)"
echo ""
echo "  [3/3] Srcset check for large images"
echo ""

python3 - "$ASSETS_DIR" "$HTML_FILE" "$SRCSET_WARN_KB" <<'PYEOF'
import re, sys, os

assets_dir = sys.argv[1]
html_file  = sys.argv[2]
srcset_kb  = int(sys.argv[3])

RED    = '\033[0;31m'
YELLOW = '\033[1;33m'
GREEN  = '\033[0;32m'
RESET  = '\033[0m'

with open(html_file, encoding="utf-8") as f:
    html = f.read()

img_pattern = re.compile(r'<img\b[^>]*>', re.IGNORECASE | re.DOTALL)
issues = []

REQUIRED_ATTRS = ["width", "height", "loading", "decoding"]

for m in img_pattern.finditer(html):
    tag = m.group()
    src_m = re.search(r'\bsrc=["\']([^"\']+)["\']', tag)
    src = src_m.group(1) if src_m else "unknown"

    # Strip leading slash for file existence check
    local_path = src.lstrip("/")

    # Check 2: missing required attributes
    missing = [a for a in REQUIRED_ATTRS if f"{a}=" not in tag]
    if missing:
        issues.append(("attr", src, missing, tag))

    # Check 3: large src file without srcset
    if "srcset=" not in tag and os.path.isfile(local_path):
        size_kb = os.path.getsize(local_path) // 1024
        if size_kb > srcset_kb:
            issues.append(("srcset", src, size_kb, tag))

attr_issues  = [i for i in issues if i[0] == "attr"]
srcset_issues = [i for i in issues if i[0] == "srcset"]

# Report check 2
if attr_issues:
    for _, src, missing, _ in attr_issues:
        print(f"  {RED}✖  MISSING ATTRS: {src}{RESET}")
        print(f"       missing: {', '.join(missing)}")
else:
    print(f"  {GREEN}✔  All <img> tags have required attributes (width, height, loading, decoding){RESET}")

print()

# Report check 3
if srcset_issues:
    for _, src, size_kb, _ in srcset_issues:
        print(f"  {YELLOW}⚠  LARGE WITHOUT SRCSET: {src} — {size_kb} KB{RESET}")
        print(f"       Add srcset/picture or run: bash scripts/img-process.sh {src.lstrip('/')}")
else:
    print(f"  {GREEN}✔  All large images have srcset or <picture>{RESET}")

sys.exit(1 if issues else 0)
PYEOF

PYTHON_EXIT=$?
[[ "$PYTHON_EXIT" -ne 0 ]] && ISSUES=$((ISSUES + 1))

# ── Summary ───────────────────────────────────────────────────────────────────

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [[ "$ISSUES" -eq 0 ]]; then
  echo -e "  ${GREEN}All checks passed — safe to publish.${RESET}"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  exit 0
else
  echo -e "  ${RED}${ISSUES} issue(s) found — fix before publishing.${RESET}"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  exit 1
fi
