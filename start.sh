#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"

PORT="${PORT:-3000}"
export PORT

WEB_DIR="${OPENCODE_WEB_DIR:-/home/runner/work/_temp/omgithub-web}"
BUILD_DIR="$PROJECT_DIR/dist"

/usr/bin/time -p mkdir -p "$WEB_DIR"
/usr/bin/time -p /usr/bin/printf '{"project":"%s","directory":"%s"}\n' "$PROJECT_DIR" "$BUILD_DIR" > "$WEB_DIR/deployment-output.json"

if [[ -f package.json ]]; then
  if [[ ! -d node_modules ]]; then
    /usr/bin/time -p npm install --no-audit --no-fund
  else
    echo 'Dependencies already installed.'
  fi
fi

needs_build=true
if [[ -f "$BUILD_DIR/index.html" ]] && ! /usr/bin/time -p find src -newer "$BUILD_DIR/index.html" -print -quit | grep -q .; then
  needs_build=false
fi

if [[ "$needs_build" == true ]]; then
  /usr/bin/time -p node scripts/build.mjs
else
  echo 'Static build is up to date.'
fi

echo "Starting Cante! on port $PORT."
/usr/bin/time -p node scripts/serve.mjs "$BUILD_DIR"
