#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
cd "$PROJECT_DIR"

PORT="${PORT:-3000}"
[[ "$PORT" =~ ^[0-9]+$ ]] || {
  /usr/bin/printf 'PORT must be a number, got: %s\n' "$PORT" >&2
  exit 1
}
export PORT

WEB_DIR="${OPENCODE_WEB_DIR:-/home/runner/work/_temp/omgithub-web}"
DIST="$PROJECT_DIR/dist"

/usr/bin/time -p /usr/bin/printf '[start] project: %s\n' "$PROJECT_DIR"
/usr/bin/time -p /usr/bin/printf '[start] port: %s\n' "$PORT"

/usr/bin/time -p /usr/bin/mkdir -p "$WEB_DIR"
/usr/bin/time -p /bin/rm -rf "$DIST"
/usr/bin/time -p /usr/bin/mkdir -p "$DIST"

if [[ -f "$PROJECT_DIR/package.json" ]]; then
  /usr/bin/time -p /usr/bin/printf '[start] installing dependencies\n'
  if [[ -f "$PROJECT_DIR/package-lock.json" ]]; then
    /usr/bin/time -p npm ci --no-audit --no-fund
  else
    /usr/bin/time -p npm install --no-audit --no-fund
  fi
  if node -e 'const p=require("./package.json");process.exit(p.scripts&&p.scripts.build?0:1)'; then
    /usr/bin/time -p npm run build
  fi
fi

if [[ -f "$PROJECT_DIR/site/index.html" ]]; then
  /usr/bin/time -p /usr/bin/printf '[start] building static output\n'
  /usr/bin/time -p /bin/cp -R "$PROJECT_DIR/site/." "$DIST/"
fi

/usr/bin/time -p /usr/bin/test -f "$DIST/index.html"

/usr/bin/time -p node -e '
const fs = require("node:fs");
const path = require("node:path");
const project = fs.realpathSync(process.argv[1]);
const directory = fs.realpathSync(process.argv[2]);
const web = process.argv[3];
if (directory !== project && !directory.startsWith(project + path.sep)) {
  throw new Error("deployment directory must stay inside the project");
}
fs.mkdirSync(web, { recursive: true });
fs.writeFileSync(path.join(web, "deployment-output.json"), JSON.stringify({ project, directory }));
console.log(`[start] deployment output: ${directory}`);
' "$PROJECT_DIR" "$DIST" "$WEB_DIR"

/usr/bin/time -p /usr/bin/printf '[start] serving foreground\n'
exec node "$PROJECT_DIR/scripts/serve.mjs" "$DIST"
