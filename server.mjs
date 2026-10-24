import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, resolve, sep } from 'node:path';

const root = resolve(import.meta.dirname, 'dist');
const port = Number(process.env.PORT || 3000);

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.wasm': 'application/wasm'
};

if (!existsSync(join(root, 'index.html'))) {
  console.error(`Missing ${join(root, 'index.html')}. Run build.mjs first.`);
  process.exit(1);
}

function resolveFile(pathname) {
  let path = resolve(root, '.' + decodeURIComponent(pathname));
  if (path !== root && !path.startsWith(root + sep)) return null;
  if (existsSync(path) && statSync(path).isDirectory()) path = join(path, 'index.html');
  if (!existsSync(path) || !statSync(path).isFile()) return null;
  return path;
}

const server = createServer((request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    response.end('Method not allowed');
    return;
  }

  let pathname;
  try {
    pathname = new URL(request.url, 'http://localhost').pathname;
  } catch {
    response.writeHead(400);
    response.end('Bad request');
    return;
  }

  const file = resolveFile(pathname === '/' ? '/index.html' : pathname);
  if (!file) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }

  const headers = {
    'Content-Type': mime[extname(file).toLowerCase()] || 'application/octet-stream',
    'Cache-Control': 'no-cache',
    'X-Content-Type-Options': 'nosniff'
  };
  response.writeHead(200, headers);
  if (request.method === 'HEAD') {
    response.end();
    return;
  }
  createReadStream(file).on('error', () => {
    response.destroy();
  }).pipe(response);
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Serving ${root} at http://0.0.0.0:${port}`);
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.once(signal, () => {
    server.close(() => process.exit(0));
  });
}
