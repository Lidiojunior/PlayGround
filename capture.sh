#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
: "${CAPTURE_URL:?Set CAPTURE_URL to the exact page to capture.}"
: "${CAPTURE_DIR:?Set CAPTURE_DIR for capture evidence.}"

/usr/bin/time -p mkdir -p "$CAPTURE_DIR"
/usr/bin/time -p rm -f "$CAPTURE_DIR/final-desktop.png" "$CAPTURE_DIR/final-mobile.png"

set +e
/usr/bin/time -p env CAPTURE_URL="$CAPTURE_URL" CAPTURE_DIR="$CAPTURE_DIR" \
  node "$PROJECT_DIR/scripts/capture.mjs"
status=$?
set -e

if [[ "$status" -ne 0 ]]; then
  exit "$status"
fi

for view in desktop mobile; do
  file="$CAPTURE_DIR/final-$view.png"
  /usr/bin/time -p test -s "$file"
  /usr/bin/time -p file "$file"
  if ! /usr/bin/time -p file "$file" | grep -q 'PNG image data'; then
    printf 'Capture did not produce a valid PNG: %s\n' "$file" >&2
    exit 1
  fi
done

/usr/bin/time -p ls -l "$CAPTURE_DIR/final-desktop.png" "$CAPTURE_DIR/final-mobile.png"
