import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Code2, Bot, Zap } from 'lucide-react'
import FloatingIcon from './components/FloatingIcon'
import ProjectModal from './components/ProjectModal'
import ThemeToggle from './components/ThemeToggle'
import SocialBar from './components/SocialBar'
import CustomCursor from './components/CustomCursor'
import { projects } from './data/projects'
import { basePath } from './utils/basePath'
import type { Project } from './types'

const iconKeys = ['Code2', 'Bot', 'Zap']

const positions = [
  { top: '12%', left: '8%' },
  { top: '8%', left: '72%' },
  { top: '52%', left: '6%' },
  { top: '48%', left: '78%' },
  { top: '72%', left: '12%' },
  { top: '68%', left: '70%' },
]

export default function App() {
  const [selected, setSelected] = useState<Project | null>(null)

  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = basePath('/fonts/fonts.css')
    document.head.appendChild(link)
  }, [])

  const floatConfigs = useMemo(
    () =>
      projects.map(() => ({
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
      })),
    []
  )

  return (
    <>
      <CustomCursor />

      <div className="pointer-events-none fixed inset-0 z-0">
        <img
          src={basePath('/central.jpg')}
          alt=""
          className="h-full w-full object-cover"
          style={{ filter: 'brightness(0.5) saturate(0.8)' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, var(--bg-primary))' }} />
      </div>

      <div className="vignette" />

      <ThemeToggle />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16">
        {/* Desktop layout */}
        <div className="hidden w-full max-w-5xl md:block">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="mb-12 text-center"
          >
            <h1 className="text-5xl font-bold leading-tight md:text-6xl" style={{ color: 'var(--text-primary)' }}>
              Привет, меня зовут Александр
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed md:text-lg" style={{ color: 'var(--text-secondary)' }}>
              Я разработчик систем автоматизации и ИИ.
              Строю решения, которые собирают, анализируют и используют данные — без лишней сложности, с фокусом на результат.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              На этом сайте представлены две мои самые интересные работы:
            </p>
            <div className="mx-auto mt-3 max-w-xl text-left text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <p><strong style={{ color: 'var(--accent)' }}>Интеллектуальный Ассистент Инженера</strong> — B2B-платформа для автоматизации технической поддержки промышленного оборудования.</p>
              <p className="mt-2"><strong style={{ color: 'var(--accent)' }}>Автоматизация Telegram-канала</strong> — бот с ИИ-генерацией контента, который парсит новости, пишет посты и создаёт картинки.</p>
            </div>
          </motion.div>

          <div className="relative">
            {projects.map((project, i) => (
              <FloatingIcon
                key={project.id}
                project={project}
                index={i}
                positions={positions[i % positions.length]}
                floatDelay={floatConfigs[i].delay}
                floatDuration={floatConfigs[i].duration}
                iconKey={iconKeys[i % iconKeys.length]}
                onClick={() => setSelected(project)}
              />
            ))}
          </div>
        </div>

        {/* Mobile layout */}
        <div className="flex flex-col items-center md:hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-3xl font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
              Привет, меня зовут Александр
            </h1>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Я разработчик систем автоматизации и ИИ.
              Строю решения, которые собирают, анализируют и используют данные — без лишней сложности, с фокусом на результат.
            </p>
          </motion.div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {projects.map((project, i) => {
              const Icon = i === 0 ? Code2 : i === 1 ? Bot : Zap
              return (
                <motion.button
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelected(project)}
                  data-hoverable
                  className="flex flex-col items-center gap-2 rounded-2xl p-4 backdrop-blur-md"
                  style={{ background: 'color-mix(in srgb, var(--accent) 8%, transparent)' }}
                >
                  <Icon size={28} style={{ color: 'var(--accent)' }} />
                  <span className="text-center text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                    {project.shortTitle}
                  </span>
                </motion.button>
              )
            })}
          </div>
        </div>
      </main>

      <SocialBar />
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  )
}