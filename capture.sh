#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"

: "${CAPTURE_URL:?Set CAPTURE_URL to the exact preview URL.}"
: "${CAPTURE_DIR:?Set CAPTURE_DIR to an output directory outside the project.}"
export CAPTURE_URL CAPTURE_DIR

printf '[capture] url=%s output=%s\n' "$CAPTURE_URL" "$CAPTURE_DIR"
/usr/bin/time -p mkdir -p "$CAPTURE_DIR"

set +e
/usr/bin/time -p node --input-type=module <<'NODE'
import { createRequire } from 'node:module'
import { mkdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { performance } from 'node:perf_hooks'

const url = process.env.CAPTURE_URL
const output = process.env.CAPTURE_DIR
if (!url || !output) {
  console.error('[capture] CAPTURE_URL and CAPTURE_DIR are required.')
  process.exit(1)
}

const runtime = join(process.env.HOME, '.local/share/omgithub-playwright')
const require = createRequire(join(runtime, 'package.json'))
const { chromium } = require('playwright')
const config = JSON.parse(readFileSync(join(runtime, process.platform === 'darwin' ? 'metal.json' : 'linux.json'), 'utf8'))
if (process.platform === 'linux' && !process.env.DISPLAY) {
  process.env.DISPLAY = ':' + readFileSync(join(runtime, 'display'), 'utf8').trim()
}
mkdirSync(output, { recursive: true })

const views = [
  { name: 'desktop', width: 1440, height: 900, isMobile: false, hasTouch: false },
  { name: 'mobile', width: 844, height: 390, isMobile: true, hasTouch: true },
]
const started = performance.now()
const mark = (label, from) => console.log(`[timing] ${label}: ${Math.round(performance.now() - from)}ms`)
const transient = (message) => Object.assign(new Error(message), { exitCode: 75 })

let browser
try {
  let phase = performance.now()
  try {
    browser = await chromium.launch({ ...config.browser.launchOptions, timeout: 30000 })
  } catch (error) {
    throw transient(`Browser launch failed: ${error.message}`)
  }
  mark('browser launch', phase)

  for (const view of views) {
    const viewStart = performance.now()
    let page
    try {
      page = await browser.newPage({
        viewport: { width: view.width, height: view.height },
        isMobile: view.isMobile,
        hasTouch: view.hasTouch,
        deviceScaleFactor: 1,
      })
    } catch (error) {
      throw transient(`Could not open ${view.name} page: ${error.message}`)
    }
    page.setDefaultTimeout(30000)
    page.on('pageerror', (error) => console.error(`[capture:${view.name}] page error: ${error.message}`))

    phase = performance.now()
    let response
    try {
      response = await page.goto(url, { waitUntil: 'load', timeout: 45000 })
    } catch (error) {
      throw transient(`Navigation failed for ${view.name}: ${error.message}`)
    }
    if (!response || !response.ok()) {
      const status = response?.status() ?? 0
      const code = !response || [408, 429, 500, 502, 503, 504].includes(status) ? 75 : 1
      throw Object.assign(new Error(`HTTP ${status} loading ${view.name} view`), { exitCode: code })
    }
    mark(`${view.name} navigation`, phase)

    phase = performance.now()
    try {
      await page.locator('#app').waitFor({ state: 'visible', timeout: 30000 })
      await page.waitForFunction(() => {
        const loader = document.querySelector('#loader')
        if (!loader) return true
        const style = getComputedStyle(loader)
        return loader.classList.contains('is-hidden') || style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0
      }, null, { timeout: 30000 })
      const canvas = await page.evaluate(() => {
        const element = document.querySelector('#game')
        if (!element) return null
        return {
          width: element.width,
          height: element.height,
          clientWidth: element.clientWidth,
          clientHeight: element.clientHeight,
        }
      })
      if (!canvas || canvas.width <= 0 || canvas.height <= 0 || canvas.clientWidth <= 0 || canvas.clientHeight <= 0) {
        throw new Error('WebGL canvas was not rendered')
      }
      await page.waitForTimeout(1200)
    } catch (error) {
      if (browser?.isConnected?.() === false) {
        throw transient(`Browser disconnected while rendering ${view.name}: ${error.message}`)
      }
      throw Object.assign(new Error(`Rendering check failed for ${view.name}: ${error.message}`), { exitCode: 1 })
    }
    mark(`${view.name} render check`, phase)

    phase = performance.now()
    try {
      await page.screenshot({ path: join(output, `final-${view.name}.png`), timeout: 30000 })
    } catch (error) {
      if (error.name === 'TimeoutError' || browser?.isConnected?.() === false) {
        throw transient(`Screenshot failed for ${view.name}: ${error.message}`)
      }
      throw Object.assign(new Error(`Screenshot write failed for ${view.name}: ${error.message}`), { exitCode: 1 })
    }
    mark(`${view.name} screenshot`, phase)

    await page.close()
    mark(`${view.name} total`, viewStart)
  }
} catch (error) {
  console.error(error?.stack || error)
  process.exitCode = error?.exitCode || 1
} finally {
  await browser?.close().catch((error) => {
    console.error('[capture] browser close failed:', error.message)
    process.exitCode ||= 75
  })
  mark('capture total', started)
}
NODE
status=$?
set -e
exit "$status"
