import { createRequire } from "node:module";
import { existsSync } from "node:fs";
import { join } from "node:path";

const runtime =
  process.env.OMGITHUB_PLAYWRIGHT_ROOT ||
  join(process.env.HOME || "/home/runner", ".local/share/omgithub-playwright");
const require = createRequire(join(runtime, "package.json"));

const url = process.env.CAPTURE_URL;
const output = process.env.CAPTURE_DIR;
if (!url || !output) {
  console.error("Set CAPTURE_URL and CAPTURE_DIR.");
  process.exit(1);
}

class CaptureError extends Error {
  constructor(message, exitCode) {
    super(message);
    this.exitCode = exitCode;
  }
}

const fail = (message, exitCode) => {
  throw new CaptureError(message, exitCode);
};

const candidates = [
  process.env.CAPTURE_CHROME,
  "/opt/google/chrome/chrome",
  "/usr/local/share/chromium/chrome-linux/chrome",
  join(process.env.HOME || "/home/runner", ".cache/ms-playwright/chromium-1248/chrome-linux64/chrome")
].filter(Boolean);
const executablePath = candidates.find((path) => existsSync(path));

let chromium;
try {
  ({ chromium } = require("playwright"));
} catch (error) {
  fail(`Playwright indisponível: ${error.message}`, 75);
}

const started = Date.now();
let browser;

const timed = async (name, run) => {
  const before = Date.now();
  try {
    return await run();
  } finally {
    console.error(`[timing] ${name}: ${Date.now() - before} ms`);
  }
};

try {
  browser = await timed("browser launch", () =>
    chromium.launch({
      headless: true,
      executablePath,
      args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"]
    })
  ).catch((error) => fail(`Falha ao abrir o navegador: ${error.message}`, 75));

  for (const [name, width, height] of [
    ["desktop", 1440, 900],
    ["mobile", 390, 844]
  ]) {
    const page = await timed(`new page ${name}`, () =>
      browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 })
    ).catch((error) => fail(`Falha ao criar página ${name}: ${error.message}`, 75));

    page.setDefaultTimeout(30000);
    page.on("pageerror", (error) => console.error(`pageerror: ${error.message}`));

    const response = await timed(`navigate ${name}`, () =>
      page.goto(url, { waitUntil: "load", timeout: 45000 })
    ).catch((error) => fail(`Falha de navegação em ${url}: ${error.message}`, 75));

    if (!response) fail(`Sem resposta HTTP em ${url}`, 75);
    if (!response.ok()) {
      const status = response.status();
      const transient = !status || [408, 429, 500, 502, 503, 504].includes(status);
      fail(`HTTP ${status} ao carregar ${url}`, transient ? 75 : 1);
    }

    await timed(`wait body ${name}`, () =>
      page.locator("body").waitFor({ state: "visible" })
    ).catch((error) => fail(`Conteúdo não ficou visível: ${error.message}`, 1));

    await timed(`wait fonts ${name}`, () =>
      page.waitForFunction(() => document.fonts.status === "loaded")
    ).catch(() => fail("Fontes não terminaram de carregar.", 1));

    await timed(`wait text ${name}`, () =>
      page.waitForFunction(() => document.body && document.body.innerText.trim().length > 0, null, {
        timeout: 15000
      })
    ).catch(() => fail("A página não renderizou conteúdo visível.", 1));

    await page.waitForTimeout(500);

    await timed(`screenshot ${name}`, () =>
      page.screenshot({ path: join(output, `final-${name}.png`), timeout: 30000 })
    ).catch((error) => fail(`Falha ao capturar ${name}: ${error.message}`, 75));

    await timed(`close page ${name}`, () => page.close()).catch(() => {});
  }
} catch (error) {
  console.error(error.message || error);
  process.exitCode = error.exitCode || 1;
} finally {
  await browser?.close().catch((error) => {
    console.error(`Falha ao fechar o navegador: ${error.message}`);
    process.exitCode ||= 75;
  });
  console.error(`[timing] total: ${Date.now() - started} ms`);
}
