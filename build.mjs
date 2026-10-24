import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname);
const source = join(root, 'src');
const output = join(root, 'dist');

function newestMtime(directory) {
  let newest = 0;
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    newest = Math.max(newest, entry.isDirectory() ? newestMtime(path) : statSync(path).mtimeMs);
  }
  return newest;
}

const needsBuild = !existsSync(join(output, 'index.html'))
  || !existsSync(join(output, 'styles.css'))
  || !existsSync(join(output, 'app.js'))
  || newestMtime(source) > statSync(output).mtimeMs;

if (!needsBuild) {
  console.log('dist/ is current; skipping rebuild.');
} else {
  rmSync(output, { recursive: true, force: true });
  mkdirSync(output, { recursive: true });
  cpSync(source, output, { recursive: true });
  console.log('Built static site into dist/.');
}

if (!existsSync(join(output, 'index.html'))) {
  throw new Error('Build did not produce dist/index.html');
}
