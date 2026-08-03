export function basePath(path: string): string {
  const base = import.meta.env.BASE_URL
  const clean = base.endsWith('/') ? base.slice(0, -1) : base
  const p = path.startsWith('/') ? path : `/${path}`
  return `${clean}${p}`
}