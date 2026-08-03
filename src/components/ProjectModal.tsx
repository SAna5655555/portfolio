import { useEffect, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Code2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import ImageGallery from './ImageGallery'
import type { Project } from '../types'

interface Props {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: Props) {
  const [content, setContent] = useState('')

  useEffect(() => {
    if (project) {
      fetch(project.contentPath)
        .then((res) => res.text())
        .then(setContent)
        .catch(() => setContent(''))
    } else {
      setContent('')
    }
  }, [project])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (project) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [project, handleKeyDown])

  const linkIcon = (label: string) => {
    if (label.toLowerCase().includes('github')) return <Code2 size={16} />
    return <ExternalLink size={16} />
  }

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl glass shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
              <span className="text-sm font-medium text-[#a0a0b8]">{project.title}</span>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="flex h-7 w-7 items-center justify-center rounded-full text-[#a0a0b8] transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-5 sm:p-6">
              <ImageGallery images={project.images} title={project.title} />

              <h2 className="mt-5 text-2xl font-bold">{project.title}</h2>

              <div className="markdown mt-4 text-sm leading-relaxed text-[#a0a0b8]">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content || '*Загрузка...*'}
                </ReactMarkdown>
              </div>

              {project.stack.length > 0 && (
                <div className="mt-5">
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#a0a0b8]">
                    Стек технологий
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-[rgba(108,92,231,0.1)] px-3 py-1 text-xs font-medium text-[#a29bfe]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {project.links.length > 0 && (
                <div className="mt-5">
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#a0a0b8]">
                    Ссылки
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-[rgba(108,92,231,0.1)] px-4 py-2 text-sm font-medium text-[#a29bfe] transition-colors hover:bg-[rgba(108,92,231,0.2)]"
                      >
                        {linkIcon(link.label)}
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {project.result && (
                <div className="mt-5 rounded-xl bg-[rgba(108,92,231,0.05)] p-4">
                  <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-[#a0a0b8]">
                    Результат
                  </h3>
                  <p className="text-sm leading-relaxed text-[#a29bfe]">{project.result}</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}