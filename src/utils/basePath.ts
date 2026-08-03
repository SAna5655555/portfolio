export function basePath(path: string): string {
  // In dev mode Vite serves public/ files from root (/)
  // In production (GitHub Pages) they're under /portfolio/
  const base = import.meta.env.DEV ? '' : (import.meta.env.BASE_URL || '')
  const clean = base.endsWith('/') ? base.slice(0, -1) : base
  const p = path.startsWith('/') ? path : `/${path}`
  return `${clean}${p}`
}