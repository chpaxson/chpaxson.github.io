export interface AMCMetadata {
  contest: string      // e.g. "2005 AMC12A"
  problemNumber: number
  answer: number       // 1-based index of the correct answer choice
}

export type SolutionSegment =
  | { type: 'markdown'; content: string }
  | { type: 'interactive'; html: string }

export interface AMCProblem {
  id: string
  metadata: AMCMetadata
  problem: string   // raw markdown/LaTeX content
  answers: string[] // answer choice content strings (LaTeX/text)
  solutionSegments: SolutionSegment[]
}

/**
 * Parse a raw AMC problem .md file into a structured AMCProblem.
 *
 * Expected format:
 *   <!-- metadata -->
 *   2005 AMC12A
 *   Problem 22
 *   answer = 2
 *
 *   # Problem
 *   ...problem text...
 *
 *   answers = $8$, $10$, $12$, $14$, $16$
 *
 *   # Solution
 *   ...solution text...
 */
export function parseAMCProblem(id: string, raw: string): AMCProblem {
  // Normalize line endings so regex anchors work regardless of CRLF/LF
  raw = raw.replace(/\r\n/g, '\n').replace(/\r/g, '\n')

  // ── Metadata block ──────────────────────────────────────────────────────
  const metaMatch = raw.match(/<!--\s*metadata\s*-->([\s\S]*?)(?=\n#|\n\n#|$)/)
  const metaBlock = metaMatch?.[1] ?? ''

  const contestMatch = metaBlock.match(/^\s*(\d{4}\s+AMC\S*)/m)
  const problemMatch = metaBlock.match(/Problem\s+(\d+)/i)
  const answerIndexMatch = metaBlock.match(/answer\s*=\s*(\d+)/)

  const metadata: AMCMetadata = {
    contest: contestMatch?.[1]?.trim() ?? '',
    problemNumber: problemMatch?.[1] ? parseInt(problemMatch[1]) : 0,
    answer: answerIndexMatch?.[1] ? parseInt(answerIndexMatch[1]) : 0,
  }

  // ── Problem section ──────────────────────────────────────────────────────
  // Grab everything between "# Problem" and the next heading
  const problemSectionMatch = raw.match(/^#\s*Problem\s*\n([\s\S]*?)(?=^#\s|\Z)/m)
  let problemRaw = problemSectionMatch?.[1] ?? ''

  // Strip out the answers line and any HTML comment lines from the problem body
  const answersLineMatch = problemRaw.match(/^answers\s*=\s*(.+)$/m)
  const answers: string[] = []
  if (answersLineMatch?.[1]) {
    answers.push(...splitAnswers(answersLineMatch[1].trim()))
    problemRaw = problemRaw
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/^answers\s*=\s*.+$/m, '')
      .trim()
  }

  // ── Solution section ──────────────────────────────────────────────────────
  const solutionMatch = raw.match(/^#\s*Solution\s*\n([\s\S]*)$/m)
  const solution = solutionMatch?.[1]?.trim() ?? ''

  return { id, metadata, problem: problemRaw.trim(), answers, solutionSegments: parseSolutionSegments(solution) }
}

/** Split a raw solution string into markdown and interactive-html segments. */
function parseSolutionSegments(solution: string): SolutionSegment[] {
  const segments: SolutionSegment[] = []
  const blockRegex = /^```interactive-html\n([\s\S]*?)^```/gm
  let lastIndex = 0
  let match: RegExpExecArray | null
  while ((match = blockRegex.exec(solution)) !== null) {
    if (match.index > lastIndex) {
      const md = solution.slice(lastIndex, match.index).trim()
      if (md) segments.push({ type: 'markdown', content: md })
    }
    segments.push({ type: 'interactive', html: match[1]?.trim() ?? '' })
    lastIndex = blockRegex.lastIndex
  }
  const tail = solution.slice(lastIndex).trim()
  if (tail) segments.push({ type: 'markdown', content: tail })
  return segments
}

/** Split a comma-separated answers string, respecting $...$ boundaries. */
function splitAnswers(raw: string): string[] {
  const results: string[] = []
  let current = ''
  let inMath = false
  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i]
    if (ch === '$') {
      inMath = !inMath
      current += ch
    } else if (ch === ',' && !inMath) {
      results.push(current.trim())
      current = ''
    } else {
      current += ch
    }
  }
  if (current.trim()) results.push(current.trim())
  return results
}

export interface AMCProblemMeta {
  id: string
  metadata: AMCMetadata
}

/** Return lightweight metadata for all AMC problems (no solution parsing). */
export async function loadAllAMCProblemsMeta(): Promise<AMCProblemMeta[]> {
  const modules = import.meta.glob<string>('@/amc_problems/**/*.md', {
    query: '?raw',
    import: 'default',
  })
  const metas: AMCProblemMeta[] = []
  for (const path in modules) {
    const loader = modules[path]
    if (!loader) continue
    const raw = await loader()
    const id = path.replace(/^.*\/amc_problems\//, '').replace(/\.md$/, '').replace(/\//g, '_')
    const problem = parseAMCProblem(id, raw)
    metas.push({ id, metadata: problem.metadata })
  }
  return metas
}

/** Determine the AMC category (AMC8, AMC10, AMC12) from a contest string. */
export function amcCategory(contest: string): 'AMC8' | 'AMC10' | 'AMC12' | 'Other' {
  if (/AMC\s*8/i.test(contest)) return 'AMC8'
  if (/AMC\s*10/i.test(contest)) return 'AMC10'
  if (/AMC\s*12/i.test(contest)) return 'AMC12'
  return 'Other'
}

/** Sort comparator for AMC problems: by category order, then year, then problem number. */
export function amcSortKey(meta: AMCProblemMeta): [number, string, number, number] {
  const catOrder: Record<string, number> = { AMC8: 0, AMC10: 1, AMC12: 2, Other: 3 }
  const cat = amcCategory(meta.metadata.contest)
  const yearMatch = meta.metadata.contest.match(/(\d{4})/)
  const year = yearMatch?.[1] ? parseInt(yearMatch[1]) : 0
  return [catOrder[cat] ?? 3, meta.metadata.contest, year, meta.metadata.problemNumber]
}

/** Dynamically load all AMC problem markdown files under src/amc_problems/**\/*.md */
export async function loadAllAMCProblems(): Promise<AMCProblem[]> {
  const modules = import.meta.glob<string>('@/amc_problems/**/*.md', {
    query: '?raw',
    import: 'default',
  })
  const problems: AMCProblem[] = []
  for (const path in modules) {
    const loader = modules[path]
    if (!loader) continue
    const raw = await loader()
    const id = path.replace(/^.*\/amc_problems\//, '').replace(/\.md$/, '').replace(/\//g, '_')
    problems.push(parseAMCProblem(id, raw))
  }
  return problems
}

export async function loadAMCProblem(id: string): Promise<AMCProblem | null> {
  // id is like "AMC12_AMC12A_2005_P22" — map back to a path segment search
  const modules = import.meta.glob<string>('@/amc_problems/**/*.md', {
    query: '?raw',
    import: 'default',
  })
  for (const path in modules) {
    const fileId = path
      .replace(/^.*\/amc_problems\//, '')
      .replace(/\.md$/, '')
      .replace(/\//g, '_')
    if (fileId === id) {
      const loader = modules[path]
      if (!loader) continue
      const raw = await loader()
      return parseAMCProblem(id, raw)
    }
  }
  return null
}
