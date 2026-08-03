export interface ProjectLink {
  label: string
  url: string
}

export interface Project {
  id: string
  title: string
  shortTitle: string
  description: string
  cover: string
  images: string[]
  contentPath: string
  stack: string[]
  links: ProjectLink[]
  result: string
}

export interface SocialLink {
  label: string
  url: string
  icon: string
}