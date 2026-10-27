#!/usr/bin/env bash
# Build the static site and serve it in the foreground on PORT (default 3000).
set -euo pipefail

SCRIPT_DIR="$(dirname "$0")"
/usr/bin/time -p bash -c 'cd -- "$1" && pwd -P' _ "$SCRIPT_DIR"
cd -- "$SCRIPT_DIR"
PROJECT_DIR="$(pwd -P)"
PORT="${PORT:-3000}"
export PORT
WEB_DIR="${OPENCODE_WEB_DIR:-/home/runner/work/_temp/omgithub-web}"
DIST_DIR="$PROJECT_DIR/dist"

/usr/bin/time -p mkdir -p "$WEB_DIR"

if [[ -f "$PROJECT_DIR/package.json" ]]; then
  if [[ -f "$PROJECT_DIR/package-lock.json" ]]; then
    /usr/bin/time -p npm ci --no-audit --no-fund
  else
    /usr/bin/time -p npm install --no-audit --no-fund
  fi
fi

/usr/bin/time -p node "$PROJECT_DIR/build.mjs"

/usr/bin/time -p /usr/bin/printf '{"project":"%s","directory":"%s"}\n' "$PROJECT_DIR" "$DIST_DIR" \
  > "$WEB_DIR/deployment-output.json"

/usr/bin/time -p test -f "$DIST_DIR/index.html"

echo "Serving $DIST_DIR on port $PORT"
exec /usr/bin/time -p node "$PROJECT_DIR/server.mjs"
