import fs from 'node:fs'
import path from 'node:path'
import { optimize } from 'svgo'
import config from '../svgo.config.js'

const SRC = 'icons'
const TMP = '.optimized'

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const srcPath = path.join(dir, entry.name)
    const outPath = path.join(TMP, path.relative(SRC, srcPath))

    if (entry.isDirectory()) {
      fs.mkdirSync(outPath, { recursive: true })
      walk(srcPath)
    } else if (entry.name.endsWith('.svg')) {
      const svg = fs.readFileSync(srcPath, 'utf8')
      const result = optimize(svg, { path: srcPath, ...config })
      fs.writeFileSync(outPath, result.data)
    }
  }
}

fs.rmSync(TMP, { recursive: true, force: true })
walk(SRC)
