import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const project = dirname(dirname(fileURLToPath(import.meta.url)))
const source = join(project, 'src')
const output = join(project, 'dist')
const buildId = Date.now().toString(36)

async function countFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  let total = 0
  for (const entry of entries) {
    if (entry.isDirectory()) total += await countFiles(join(directory, entry.name))
    else total += 1
  }
  return total
}

await rm(output, { recursive: true, force: true })
await mkdir(output, { recursive: true })
await cp(source, output, { recursive: true })

const indexPath = join(output, 'index.html')
const index = await readFile(indexPath, 'utf8')
await writeFile(indexPath, index.replaceAll('%BUILD_ID%', buildId))

await writeFile(join(output, 'build.json'), JSON.stringify({
  build: buildId,
  source: relative(project, source),
  output: relative(project, output)
}))

const files = await countFiles(output)
console.log(`Built ${files} static files into ${relative(project, output)} (build ${buildId}).`)
