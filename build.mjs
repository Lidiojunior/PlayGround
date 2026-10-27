import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const source = join(root, "src");
const output = join(root, "dist");

if (!existsSync(join(source, "index.html"))) {
  throw new Error("src/index.html is missing");
}

rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });
cpSync(source, output, { recursive: true });
writeFileSync(
  join(output, "build.json"),
  JSON.stringify({ builtAt: new Date().toISOString(), source: resolve(source) }, null, 2) + "\n"
);
console.log(`Built static site: ${output}`);
