import type { Plugin } from 'vite'
import { spawnSync } from 'child_process'
import { writeFileSync, readFileSync, existsSync, unlinkSync, mkdirSync } from 'fs'
import { createHash } from 'crypto'
import { tmpdir } from 'os'
import { join, resolve } from 'path'

/**
 * Compile a Typst source string to SVG using the local `typst` CLI.
 * Returns the SVG string, or null if compilation fails or CLI is unavailable.
 */
function compileTypstToSvg(typstCode: string): string | null {
  const uid = `${Date.now()}_${Math.random().toString(36).slice(2)}`
  const tmpIn = join(tmpdir(), `typst_in_${uid}.typ`)
  const tmpOut = join(tmpdir(), `typst_out_${uid}.svg`)

  try {
    writeFileSync(tmpIn, typstCode, 'utf8')

    // Command mirrors: typst compile <input> --format svg <output>
    const result = spawnSync('typst', ['compile', tmpIn, '--format', 'svg', tmpOut], {
      encoding: 'utf8',
      timeout: 15_000,
      env: { ...process.env },
    })

    if (result.stderr) {
      console.warn('[typst-blocks] typst stderr:', result.stderr)
    }

    if (result.error) {
      if ((result.error as NodeJS.ErrnoException).code === 'ENOENT') {
        console.warn('\n[typst-blocks] ⚠  Typst CLI not found on PATH.')
        console.warn('               Install it from https://typst.app or via your package manager.\n')
      } else {
        console.warn('[typst-blocks] spawn error:', result.error.message)
      }
      return null
    }

    if (result.status !== 0) {
      console.warn('[typst-blocks] Typst compilation failed:\n' + result.stderr)
      return null
    }

    if (!existsSync(tmpOut)) {
      console.log('[typst-blocks] output file not found:', tmpOut)
      return null
    }
    return readFileSync(tmpOut, 'utf8')
  } catch (e) {
    console.warn('[typst-blocks] Unexpected error:', e)
    return null
  } finally {
    try { unlinkSync(tmpIn)  } catch { /* ignore */ }
    try { unlinkSync(tmpOut) } catch { /* ignore */ }
  }
}

/**
 * Default preamble injected before user Typst code when the user has not
 * already added a `#set page(...)` directive.
 */
const DEFAULT_PREAMBLE = `#set page(width: auto, height: auto, margin: 0.5cm, fill: none)\n`

/**
 * Replace every ` ```typst … ``` ` fenced block in a markdown string with a
 * plain markdown image tag pointing to the compiled SVG served from /assets/typst/.
 * Falls back to a ` ```typst-error … ``` ` block if compilation fails.
 */
function processTypstBlocks(content: string, publicDir: string): string {
  const outDir = resolve(publicDir, 'assets', 'typst')
  mkdirSync(outDir, { recursive: true })

  return content.replace(/^```typst[^\n]*\n([\s\S]*?)^```/gm, (original, rawCode: string) => {
    const userCode = rawCode.trimEnd()
    const preamble = /^\s*#set\s+page\s*\(/.test(userCode) ? '' : DEFAULT_PREAMBLE
    const fullCode = preamble + userCode

    // Use a content hash as the filename so identical diagrams reuse the same file
    const hash = createHash('md5').update(fullCode).digest('hex').slice(0, 12)
    const svgFile = resolve(outDir, `${hash}.svg`)

    // Skip recompilation if the output already exists (content-addressed cache)
    let svg: string | null = null
    if (existsSync(svgFile)) {
      svg = readFileSync(svgFile, 'utf8')
    } else {
      svg = compileTypstToSvg(fullCode)
      if (svg !== null) {
        writeFileSync(svgFile, svg, 'utf8')
      }
    }

    if (svg === null) {
      return `\`\`\`typst-error\n${rawCode}\`\`\``
    }

    // Always emit centered figure HTML — marked passes raw HTML blocks through unchanged
    const imgUrl = `/assets/typst/${hash}.svg`
    return `<figure class="amc-typst-figure" style="display:flex;justify-content:center;margin:1rem 0;"><img src="${imgUrl}" alt="typst diagram" style="max-width:100%;height:auto;" /></figure>\n`
  })
}

/** Return true if this module ID is an AMC problem markdown file (with or without ?raw). */
function isAMCMd(id: string): boolean {
  return /[/\\]amc_problems[/\\][^/\\]+\.md/.test(id.split('?')[0] ?? '')
}

export default function typstBlocksPlugin(): Plugin {
  let publicDir = 'public'

  return {
    name: 'vite-plugin-typst-blocks',

    configResolved(config) {
      publicDir = config.publicDir
    },

    // Run after Vite's built-in raw loader has already turned the .md file into
    //   export default "...escaped markdown..."
    // We extract that string, compile any ```typst blocks, and re-export it.
    transform(code, id) {
      if (!isAMCMd(id)) return
      if (!code.trimStart().startsWith('export default ')) return

      let content: string
      try {
        content = JSON.parse(code.trimStart().slice('export default '.length))
      } catch {
        return
      }

      // Normalize CRLF → LF so fenced block detection works on Windows
      content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n')

      if (!content.includes('```typst')) return

      const processed = processTypstBlocks(content, publicDir)
      return { code: `export default ${JSON.stringify(processed)}`, map: null, moduleSideEffects: false }
    },

    // In dev mode, invalidate the module and trigger a full reload on save.
    handleHotUpdate({ file, server }) {
      if (!/[/\\]amc_problems[/\\][^/\\]+\.md$/.test(file)) return
      for (const mod of server.moduleGraph.getModulesByFile(file) ?? []) {
        server.moduleGraph.invalidateModule(mod)
      }
      server.ws.send({ type: 'full-reload' })
      return []
    },
  }
}
