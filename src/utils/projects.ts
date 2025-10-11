export interface ProjectMetadata {
  title: string
  description: string
  thumbnail: string
  date?: string
  tags?: string[]
}

export interface Project {
  id: string
  metadata: ProjectMetadata
  content: string
}

// This function will be used to dynamically import all markdown files from the projects folder
export async function loadProjects(): Promise<Project[]> {
  const projectModules = import.meta.glob<string>('@/projects/*.md', {
    query: '?raw',
    import: 'default',
  })

  const projects: Project[] = []

  for (const path in projectModules) {
    const loader = projectModules[path]
    if (!loader) continue
    
    const content = await loader()
    const id = path.split('/').pop()?.replace('.md', '') || ''
    
    // Parse frontmatter from markdown
    const { metadata, body } = parseFrontmatter(content)
    
    projects.push({
      id,
      metadata: metadata as ProjectMetadata,
      content: body,
    })
  }

  return projects
}

export async function loadProject(id: string): Promise<Project | null> {
  try {
    const content = await import(`@/projects/${id}.md?raw`)
    const { metadata, body } = parseFrontmatter(content.default)
    
    return {
      id,
      metadata: metadata as ProjectMetadata,
      content: body,
    }
  } catch (error) {
    console.error(`Failed to load project ${id}:`, error)
    return null
  }
}

// Simple frontmatter parser
function parseFrontmatter(content: string): { metadata: Record<string, any>; body: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)

  if (!match) {
    return { metadata: {}, body: content }
  }

  const [, frontmatterText, body] = match
  const metadata: Record<string, any> = {}

  // Parse YAML-like frontmatter
  if (frontmatterText) {
    frontmatterText.split('\n').forEach((line) => {
      const colonIndex = line.indexOf(':')
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim()
        let value: any = line.substring(colonIndex + 1).trim()
        
        // Remove quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1)
        }
        
        // Handle arrays
        if (value.startsWith('[') && value.endsWith(']')) {
          value = value.slice(1, -1).split(',').map((v: string) => v.trim().replace(/['"]/g, ''))
        }
        
        metadata[key] = value
      }
    })
  }

  return { metadata, body: body || '' }
}
