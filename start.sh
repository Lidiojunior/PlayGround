#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="${PROJECT_DIR:-$(cd "$(dirname "$0")" && pwd)}"
cd "$PROJECT_DIR"

PORT="${PORT:-3000}"
export PORT
WEB_DIR="${OPENCODE_WEB_DIR:-${RUNNER_TEMP:-/tmp}/omgithub-web}"
BUILD_DIR="$PROJECT_DIR/dist"

/usr/bin/time -p mkdir -p "$WEB_DIR"
/usr/bin/time -p rm -rf "$BUILD_DIR"
/usr/bin/time -p mkdir -p "$BUILD_DIR"
/usr/bin/time -p cp -R "$PROJECT_DIR/public/." "$BUILD_DIR/"
/usr/bin/time -p mkdir -p "$BUILD_DIR/clientes"
/usr/bin/time -p cp "$PROJECT_DIR/public/clientes.html" "$BUILD_DIR/clientes/index.html"
/usr/bin/time -p test -f "$BUILD_DIR/index.html"
/usr/bin/time -p printf '{"project":"%s","directory":"%s"}' "$PROJECT_DIR" "$BUILD_DIR" > "$WEB_DIR/deployment-output.json"
/usr/bin/time -p cat "$WEB_DIR/deployment-output.json"
printf '\n'

exec /usr/bin/time -p node "$PROJECT_DIR/server.js"
