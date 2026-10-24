import { createRequire } from 'node:module';
import { mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const EXIT_TRANSIENT = 75;
const url = process.env.CAPTURE_URL;
const output = process.env.CAPTURE_DIR;

if (!url || !output) {
  console.error('Set CAPTURE_URL and CAPTURE_DIR.');
  process.exit(1);
}

mkdirSync(output, { recursive: true });

const runtime = join(process.env.HOME, '.local/share/omgithub-playwright');
const require = createRequire(join(runtime, 'package.json'));
const { chromium } = require('playwright');

const configPath = join(runtime, process.platform === 'darwin' ? 'metal.json' : 'linux.json');
const config = JSON.parse(readFileSync(configPath, 'utf8'));

if (process.platform === 'linux') {
  const display = readFileSync(join(runtime, 'display'), 'utf8').trim();
  process.env.DISPLAY ||= ':' + display;
}

const transient = (error) => Object.assign(error, { exitCode: EXIT_TRANSIENT });
const isTransientStatus = (status) => !status || [408, 429, 500, 502, 503, 504].includes(status);

let browser;
let failed = false;

try {
  browser = await chromium.launch({
    ...config.browser.launchOptions,
    timeout: 30000
  }).catch(transient);

  for (const [name, width, height] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
    const page = await browser.newPage({ viewport: { width, height } }).catch(transient);
    page.setDefaultTimeout(30000);

    let response;
    try {
      response = await page.goto(url, { waitUntil: 'load', timeout: 45000 });
    } catch (error) {
      throw transient(Object.assign(new Error(`Navigation failed for ${name}: ${error.message}`), { cause: error }));
    }

    if (!response?.ok()) {
      const status = response?.status();
      const message = `HTTP ${status ?? 'no response'} loading ${url}`;
      if (isTransientStatus(status)) throw transient(new Error(message));
      throw new Error(message);
    }

    try {
      await page.locator('#titulo').waitFor({ state: 'visible', timeout: 20000 });
      await page.waitForFunction(() => {
        const title = document.querySelector('#titulo');
        return document.body?.dataset.ready === 'true'
          && Boolean(title)
          && /\d{4}\s+\d{4}\s+\d{2}\s+\d{2}/.test(title.textContent.trim());
      }, { timeout: 20000 });
      await page.waitForFunction(() => document.fonts.status === 'loaded', { timeout: 15000 });
    } catch (error) {
      throw new Error(`Rendered title was not ready for ${name}: ${error.message}`);
    }

    await page.waitForTimeout(900);
    await page.screenshot({
      path: join(output, `final-${name}.png`),
      animations: 'disabled',
      timeout: 30000
    }).catch((error) => {
      if (error.name === 'TimeoutError' || !browser.isConnected()) transient(error);
      throw error;
    });

    const title = (await page.locator('#titulo').innerText()).trim();
    if (!/\d{4}\s+\d{4}\s+\d{2}\s+\d{2}/.test(title)) {
      throw new Error(`Generated title is missing from the ${name} render: ${JSON.stringify(title)}`);
    }
    console.log(`Captured ${name} (${width}x${height}): ${title}`);
    await page.close();
  }
} catch (error) {
  failed = true;
  console.error(error?.stack || error);
  process.exitCode = error?.exitCode || 1;
} finally {
  await browser?.close().catch((error) => {
    console.error(error);
    if (!failed) process.exitCode = EXIT_TRANSIENT;
  });
}
