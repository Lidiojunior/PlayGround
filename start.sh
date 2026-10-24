#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR_ABS="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"
cd "$PROJECT_DIR_ABS"

PORT="${PORT:-3000}"
export PORT
WEB_DIR="${OPENCODE_WEB_DIR:-/home/runner/work/_temp/omgithub-web}"
DIST_DIR="$PROJECT_DIR_ABS/dist"
export PROJECT_DIR_ABS DIST_DIR WEB_DIR

/usr/bin/time -p mkdir -p "$WEB_DIR"

if [[ -f package.json ]]; then
  if [[ -f package-lock.json ]]; then
    /usr/bin/time -p npm ci --no-audit --no-fund
  else
    /usr/bin/time -p npm install --no-audit --no-fund
  fi
else
  echo 'No package.json; static site has no dependencies to install.'
fi

/usr/bin/time -p node build.mjs

/usr/bin/time -p node --input-type=module -e '
import { writeFileSync } from "node:fs";
writeFileSync(
  process.env.WEB_DIR + "/deployment-output.json",
  JSON.stringify({
    project: process.env.PROJECT_DIR_ABS,
    directory: process.env.DIST_DIR
  })
);
'

echo "Starting static server on port $PORT from $DIST_DIR"
exec /usr/bin/time -p node "$PROJECT_DIR_ABS/server.mjs"
