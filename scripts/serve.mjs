import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import { extname, join, normalize, resolve, sep } from 'node:path'

const root = resolve(process.argv[2] || join(process.cwd(), 'dist'))
const port = Number(process.env.PORT || 3000)

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.kar': 'audio/midi',
  '.mid': 'audio/midi',
  '.midi': 'audio/midi'
}

function sendFile(response, file, method) {
  response.writeHead(200, {
    'Content-Type': types[extname(file).toLowerCase()] || 'application/octet-stream',
    'Cache-Control': 'no-cache',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  })
  if (method === 'HEAD') {
    response.end()
    return
  }
  createReadStream(file).on('error', () => response.end()).pipe(response)
}

const server = createServer(async (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' })
    response.end('Method not allowed')
    return
  }

  let pathname
  try {
    pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname)
  } catch {
    response.writeHead(400)
    response.end('Bad request')
    return
  }

  const requested = normalize(join(root, pathname))
  if (requested !== root && !requested.startsWith(root + sep)) {
    response.writeHead(403)
    response.end('Forbidden')
    return
  }

  let file = requested
  try {
    const info = await stat(file)
    if (info.isDirectory()) file = join(file, 'index.html')
    const finalInfo = await stat(file)
    if (!finalInfo.isFile()) throw new Error('not a file')
  } catch {
    if (!extname(pathname)) {
      file = join(root, 'index.html')
      try {
        const fallback = await stat(file)
        if (!fallback.isFile()) throw new Error('no index')
      } catch {
        response.writeHead(404)
        response.end('Not found')
        return
      }
    } else {
      response.writeHead(404)
      response.end('Not found')
      return
    }
  }

  sendFile(response, file, request.method)
})

server.on('error', error => {
  console.error(`Cante! server error: ${error.message}`)
  process.exit(1)
})

server.listen(port, '0.0.0.0', () => {
  console.log(`Cante! serving ${root} on http://0.0.0.0:${port}`)
})

function shutdown() {
  server.close(() => process.exit(0))
  setTimeout(() => process.exit(0), 1500)
}

process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)
