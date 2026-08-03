const mdModules = import.meta.glob<{ default: string }>('/src/content/**/*.md', {
  query: '?raw',
  eager: true,
})

const contentMap: Record<string, string> = {}

for (const [path, mod] of Object.entries(mdModules)) {
  const parts = path.split('/')
  const projectId = parts[parts.length - 2]
  contentMap[projectId] = mod.default
}

export function getProjectContent(projectId: string): string {
  return contentMap[projectId] || ''
}