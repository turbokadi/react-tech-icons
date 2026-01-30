import fs from 'node:fs'
import path from 'node:path'

const SRC = '.optimized'
const OUT = 'src/icons'
const IDS_OUT = 'src/registry/manufacturer/ids.ts'

const ALLOWED_SVG_STYLES = new Set([
  'fill',
  'fill-opacity',
  'stroke',
  'stroke-opacity',
  'stroke-width',
  'stroke-linecap',
  'stroke-linejoin',
  'stroke-miterlimit',
  'opacity',
])

function svgAttributesToJsx(svg) {
  return svg.replace(/\s([a-zA-Z_:][a-zA-Z0-9_:.-]*)=/g, (match, name) => {
    if (
      name.startsWith('data-') ||
      name.startsWith('aria-') ||
      name.startsWith('xmlns') ||
      name === 'viewBox'
    ) {
      return match
    }
    if (name === 'xlink:href') {
      return ' href='
    }
    if (name.includes(':')) {
      return match
    }
    if (name.includes('-')) {
      const camel = name.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
      return ` ${camel}=`
    }

    return match
  })
}

function styleAttrToJsx(svg) {
  return svg.replace(/\sstyle="([^"]+)"/gi, (_, css) => {
    const entries = css
      .split(';')
      .map(s => s.trim())
      .filter(Boolean)
      .map(rule => {
        const [rawKey, rawValue] = rule.split(':').map(s => s.trim())
        if (!rawKey || !rawValue) return null
        if (!ALLOWED_SVG_STYLES.has(rawKey)) return null

        const key = rawKey.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
        const value = isNaN(rawValue) ? `'${rawValue}'` : rawValue

        return `${key}: ${value}`
      })
      .filter(Boolean)

    if (!entries.length) return ''

    return ` style={{ ${entries.join(', ')} }}`
  })
}

function extractViewBox(svg) {
  const m = svg.match(/viewBox="([^"]+)"/)
  if (!m) throw new Error('No viewBox found')

  const parts = m[1].split(/\s+/).map(Number)
  if (parts.length !== 4) throw new Error('Invalid viewBox')

  const [, , w, h] = parts
  return {
    viewBox: m[1],
    ratio: w / h,
  }
}

function pascalCase(name) {
  return name.replace(/\.svg$/, '').replace(/(^\w|-\w)/g, m => m.replace('-', '').toUpperCase())
}

function svgToJsx(svg) {
  let out = svg
  out = out.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '')
  out = out.replace(/\sclass="/g, ' className="')
  out = svgAttributesToJsx(out)
  out = styleAttrToJsx(out)
  out = out.replace(
    /<style([^>]*)>([\s\S]*?)<\/style>/gi,
    (_, attrs, css) => `<style${attrs}>{\`${css.trim()}\`}</style>`
  )
  return out
}

const collectedIds = new Set()

function walk(dir) {
  const exports = []

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const srcPath = path.join(dir, entry.name)
    const rel = path.relative(SRC, srcPath)
    const outPath = path.join(OUT, rel)

    if (entry.isDirectory()) {
      fs.mkdirSync(outPath, { recursive: true })
      walk(srcPath)
      exports.push(`export * from "./${entry.name}"`)
      continue
    }

    if (!entry.name.endsWith('.svg')) continue

    const id = pascalCase(entry.name)
    collectedIds.add(id)

    const rawSvg = fs.readFileSync(srcPath, 'utf8')
    const { viewBox, ratio } = extractViewBox(rawSvg)
    const body = svgToJsx(rawSvg)

    const tsx = `
import { IconBase, PublicIconProps, IconMeta } from "../../IconBase"

export const meta: IconMeta = {
  viewBox: "${viewBox}",
  ratio: ${ratio.toFixed(4)},
}

export function ${id}(props: PublicIconProps) {
  return (
    <IconBase meta={meta} {...props}>
      ${body}
    </IconBase>
  )
}
`.trim()

    fs.mkdirSync(path.dirname(outPath), { recursive: true })
    fs.writeFileSync(outPath.replace(/\.svg$/, '.tsx'), tsx + '\n')
    exports.push(`export { ${id} } from "./${id}"`)
  }

  if (exports.length) {
    fs.writeFileSync(path.join(OUT, path.relative(SRC, dir), 'index.ts'), exports.join('\n') + '\n')
  }
}

function generateManufacturerIds() {
  const ids = [...collectedIds].sort()

  const content = `// ⚠️ AUTO-GENERATED — DO NOT EDIT
export type ManufacturerId =
${ids.map(id => `  | '${id}'`).join('\n')}
`

  fs.mkdirSync(path.dirname(IDS_OUT), { recursive: true })
  fs.writeFileSync(IDS_OUT, content + '\n')
}

// reset + run
fs.rmSync(OUT, { recursive: true, force: true })
fs.mkdirSync(OUT, { recursive: true })

walk(SRC)
generateManufacturerIds()
