#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CAPTURE_SCRIPT="$PROJECT_DIR/scripts/capture.mjs"

: "${CAPTURE_URL:?Set CAPTURE_URL to the preview URL.}"
: "${CAPTURE_DIR:?Set CAPTURE_DIR to an output directory outside the source tree.}"

case "$(realpath -m "$CAPTURE_DIR")/" in
  "$PROJECT_DIR"/*)
    echo "CAPTURE_DIR must be outside the project source tree." >&2
    exit 1
    ;;
esac

/usr/bin/time -p test -f "$CAPTURE_SCRIPT"
/usr/bin/time -p mkdir -p "$CAPTURE_DIR"

echo "Capturing $CAPTURE_URL into $CAPTURE_DIR."
/usr/bin/time -p node "$CAPTURE_SCRIPT"
