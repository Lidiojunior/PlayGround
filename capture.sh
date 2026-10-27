#!/usr/bin/env bash
# Capture the deployed preview at CAPTURE_URL into CAPTURE_DIR.
set -euo pipefail

SCRIPT_DIR="$(dirname "$0")"
/usr/bin/time -p bash -c 'cd -- "$1" && pwd -P' _ "$SCRIPT_DIR"
cd -- "$SCRIPT_DIR"

/usr/bin/time -p test -n "${CAPTURE_URL:-}"
/usr/bin/time -p test -n "${CAPTURE_DIR:-}"
/usr/bin/time -p mkdir -p "$CAPTURE_DIR"

export CAPTURE_READY_SELECTOR="${CAPTURE_READY_SELECTOR:-[data-ready=\"true\"]}"
export CAPTURE_AUTO_START="${CAPTURE_AUTO_START:-false}"
export CAPTURE_START_SELECTOR="${CAPTURE_START_SELECTOR:-}"

/usr/bin/time -p node "${RUNTIME_DIR:?}/scripts/default-capture.mjs"
