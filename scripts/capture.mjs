import { createRequire } from 'node:module'
import { mkdir, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

const url = process.env.CAPTURE_URL
const output = process.env.CAPTURE_DIR
if (!url || !output) {
  console.error('Set CAPTURE_URL and CAPTURE_DIR.')
  process.exit(1)
}

function findRuntime() {
  if (process.env.PLAYWRIGHT_RUNTIME_DIR) return process.env.PLAYWRIGHT_RUNTIME_DIR
  const candidates = [
    join(process.env.HOME || '', '.local/share/omgithub-playwright'),
    '/home/runner/.local/share/omgithub-playwright'
  ]
  return candidates.find(directory => existsSync(join(directory, 'package.json'))) || candidates[0]
}

const runtime = findRuntime()
const require = createRequire(join(runtime, 'package.json'))
const { chromium } = require('playwright')

const freeze = '*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}'
const views = [
  { name: 'desktop', width: 1440, height: 900, minimumBytes: 40000 },
  { name: 'mobile', width: 390, height: 844, minimumBytes: 20000 }
]

const transient = error => Object.assign(error, { exitCode: 75 })
const defect = message => Object.assign(new Error(message), { exitCode: 1 })

async function captureView(browser, view) {
  const started = Date.now()
  const page = await browser.newPage({
    viewport: { width: view.width, height: view.height },
    deviceScaleFactor: 1
  }).catch(transient)

  page.setDefaultTimeout(30000)
  page.on('pageerror', error => console.error(`Page error (${view.name}): ${error.message}`))

  const response = await page.goto(url, { waitUntil: 'load', timeout: 45000 }).catch(transient)
  if (!response || !response.ok()) {
    const status = response?.status()
    if (!status || status === 408 || status === 429 || status >= 500) {
      throw transient(new Error(`HTTP ${status ?? 'unknown'} loading ${url}`))
    }
    throw defect(`HTTP ${status} loading ${url}`)
  }

  await page.locator('#songTitle').waitFor({ state: 'visible', timeout: 30000 })
    .catch(() => { throw defect('The song title did not render.') })
  await page.locator('#songGrid .song-card').first().waitFor({ state: 'visible', timeout: 30000 })
    .catch(() => { throw defect('The song library did not render.') })
  await page.waitForFunction(() => document.fonts.status === 'loaded', null, { timeout: 30000 })
    .catch(() => { throw defect('Fonts did not finish loading.') })

  await page.waitForTimeout(900)
  await page.addStyleTag({ content: freeze })
  await page.evaluate(() => {
    window.scrollTo(0, 0)
    const lyrics = document.querySelector('#lyrics')
    const active = lyrics?.querySelector('.line.is-active')
    if (lyrics && active) {
      lyrics.scrollTop = Math.max(0, active.offsetTop - lyrics.clientHeight / 2 + active.offsetHeight / 2)
    }
  })
  await page.waitForTimeout(250)

  const file = join(output, `final-${view.name}.png`)
  await page.screenshot({ path: file, timeout: 30000 }).catch(error => {
    if (error.name === 'TimeoutError' || !browser.isConnected()) throw transient(error)
    throw error
  })

  const info = await stat(file).catch(() => null)
  if (!info || info.size < view.minimumBytes) throw defect(`The ${view.name} screenshot is too small to be a rendered page.`)

  await page.close().catch(() => {})
  console.log(`Captured ${view.name} in ${Date.now() - started}ms -> ${file} (${info.size} bytes)`)
}

await mkdir(output, { recursive: true })

let browser
try {
  browser = await chromium.launch({
    headless: true,
    channel: 'chromium',
    args: ['--hide-scrollbars', '--force-device-scale-factor=1']
  }).catch(transient)

  for (const view of views) await captureView(browser, view)
} catch (error) {
  console.error(error)
  process.exitCode = error.exitCode || 1
} finally {
  await browser?.close().catch(error => {
    console.error(error)
    process.exitCode ||= 75
  })
}
