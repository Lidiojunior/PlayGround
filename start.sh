#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"

PORT="${PORT:-3000}"
[[ "$PORT" =~ ^[0-9]+$ ]] || { echo "PORT must be a numeric value." >&2; exit 1; }
export PORT

META_DIR="${OPENCODE_WEB_DIR:-/home/runner/work/_temp/omgithub-web}"
DIST_DIR="$PROJECT_DIR/dist"
export DIST_DIR

printf '[start] project=%s port=%s\n' "$PROJECT_DIR" "$PORT"

timed() {
  printf '[timing] '
  /usr/bin/time -p "$@"
}

if [[ ! -d node_modules || ! -f node_modules/.package-lock.json || package.json -nt node_modules/.package-lock.json || package-lock.json -nt node_modules/.package-lock.json ]]; then
  printf '[start] installing dependencies\n'
  timed npm ci --no-audit --no-fund
else
  printf '[start] dependencies up to date\n'
fi

rebuild=0
if [[ ! -f "$DIST_DIR/index.html" ]]; then
  rebuild=1
elif find src index.html vite.config.js package.json package-lock.json -newer "$DIST_DIR/index.html" -print -quit | grep -q .; then
  rebuild=1
fi

if [[ "$rebuild" -eq 1 ]]; then
  printf '[start] building static output\n'
  timed npm run build
else
  printf '[start] static output up to date\n'
fi

[[ -f "$DIST_DIR/index.html" ]] || { echo "Build did not produce $DIST_DIR/index.html" >&2; exit 1; }

timed mkdir -p "$META_DIR"
timed node -e 'const fs = require("node:fs"); const [file, project, directory] = process.argv.slice(1); fs.writeFileSync(file, JSON.stringify({ project, directory }) + "\n")' "$META_DIR/deployment-output.json" "$PROJECT_DIR" "$DIST_DIR"
printf '[start] deployment output: '
cat "$META_DIR/deployment-output.json"

printf '[start] serving %s on 0.0.0.0:%s\n' "$DIST_DIR" "$PORT"
exec /usr/bin/time -p node --input-type=module <<'NODE'
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, resolve } from 'node:path'

const root = resolve(process.env.DIST_DIR || 'dist')
const port = Number(process.env.PORT || 3000)
const types = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.mjs', 'text/javascript; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.webp', 'image/webp'],
  ['.ico', 'image/x-icon'],
  ['.wasm', 'application/wasm'],
  ['.glb', 'model/gltf-binary'],
  ['.txt', 'text/plain; charset=utf-8'],
])

function send(res, status, body, extra = {}) {
  res.writeHead(status, { 'Cache-Control': 'no-cache', ...extra })
  res.end(body)
}

const server = createServer(async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    send(res, 405, 'Method not allowed')
    return
  }
  let pathname
  try {
    pathname = decodeURIComponent(new URL(req.url || '/', 'http://localhost').pathname)
  } catch {
    send(res, 400, 'Bad request')
    return
  }
  let file = resolve(root, '.' + pathname)
  if (file !== root && !file.startsWith(root + '/')) {
    send(res, 404, 'Not found')
    return
  }
  let info = null
  try { info = await stat(file) } catch {}
  if (!info || info.isDirectory()) {
    if (!extname(pathname)) {
      file = join(root, 'index.html')
      try { info = await stat(file) } catch { info = null }
    }
  }
  if (!info || !info.isFile()) {
    send(res, 404, 'Not found')
    return
  }
  try {
    const data = await readFile(file)
    const headers = {
      'Content-Type': types.get(extname(file).toLowerCase()) || 'application/octet-stream',
      'Content-Length': data.length,
      'Cache-Control': 'no-cache',
    }
    res.writeHead(200, headers)
    res.end(req.method === 'HEAD' ? undefined : data)
  } catch (error) {
    console.error('[start] read failed:', error.message)
    send(res, 500, 'Internal server error')
  }
})

server.on('error', (error) => {
  console.error('[start] server error:', error.message)
  process.exit(1)
})
server.listen(port, '0.0.0.0', () => {
  console.log(`[start] static server ready at http://0.0.0.0:${port} (root ${root})`)
})
const shutdown = () => {
  console.log('[start] shutting down')
  server.close(() => process.exit(0))
  setTimeout(() => process.exit(0), 1000).unref()
}
process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)
NODE
