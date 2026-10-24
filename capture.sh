#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
cd "$PROJECT_DIR"

: "${CAPTURE_URL:?CAPTURE_URL is required}"
: "${CAPTURE_DIR:?CAPTURE_DIR is required}"

export CAPTURE_READY_SELECTOR="${CAPTURE_READY_SELECTOR:-#collection-grid[data-ready=\"true\"]}"
export CAPTURE_AUTO_START="${CAPTURE_AUTO_START:-false}"

/usr/bin/time -p /usr/bin/mkdir -p "$CAPTURE_DIR"
/usr/bin/time -p /usr/bin/printf '[capture] url: %s\n[capture] output: %s\n' "$CAPTURE_URL" "$CAPTURE_DIR"

/usr/bin/time -p node "${RUNTIME_DIR:-/home/runner/work/_temp/omgithub-runtime}/scripts/default-capture.mjs"

/usr/bin/time -p /usr/bin/test -s "$CAPTURE_DIR/final-desktop.png"
/usr/bin/time -p /usr/bin/test -s "$CAPTURE_DIR/final-mobile.png"
/usr/bin/time -p /usr/bin/printf '[capture] screenshots ready\n'
