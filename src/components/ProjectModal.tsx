import { useEffect, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import ImageGallery from './ImageGallery'
import { basePath } from '../utils/basePath'
import type { Project } from '../types'

interface Props {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: Props) {
  const [content, setContent] = useState('')

  useEffect(() => {
    if (project) {
      const ts = Date.now()
      fetch(`${basePath(project.contentPath)}?v=${ts}`)
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

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 flex max-h-[85vh] w-full max-w-3xl flex-col rounded-2xl glass shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
          >
            <div className="flex shrink-0 items-center justify-between border-b px-4 py-2.5 sm:px-5 sm:py-3" style={{ borderColor: 'var(--border-color)' }}>
              <span className="truncate text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Проект</span>
              <button
                onClick={onClose}
                aria-label="Закрыть"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors"
                style={{ color: 'var(--text-secondary)' }}
              >
                <X size={16} />
              </button>
            </div>

            <div className="overflow-y-auto overscroll-contain p-4 sm:p-6">
              <ImageGallery images={project.images} title={project.title} />

              <div className="markdown mt-5 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content || '*Загрузка...*'}
                </ReactMarkdown>
              </div>

              {project.stack.length > 0 && (
                <div className="mt-5">
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                    Стек технологий
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full px-3 py-1 text-xs font-medium"
                        style={{
                          background: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                          color: 'var(--accent-light)',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {project.links.length > 0 && (
                <div className="mt-5">
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                    Ссылки
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                        style={{
                          background: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                          color: 'var(--accent-light)',
                        }}
                      >
                        <ExternalLink size={16} />
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {project.result && (
                <div className="mt-5 rounded-xl p-4" style={{ background: 'color-mix(in srgb, var(--accent) 5%, transparent)' }}>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                    Результат
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--accent-light)' }}>{project.result}</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}