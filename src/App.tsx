import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Code2, Bot, Zap } from 'lucide-react'
import FloatingIcon from './components/FloatingIcon'
import ProjectModal from './components/ProjectModal'
import TelegramModal from './components/TelegramModal'
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
  const [tgOpen, setTgOpen] = useState(false)

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
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 40%, var(--bg-primary) 100%)' }} />
      </div>

      <div className="vignette" />

      <ThemeToggle />
      <SocialBar onClick={() => setTgOpen(true)} />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="w-full max-w-3xl"
        >
          <h1 className="text-center text-4xl font-bold leading-tight md:text-6xl" style={{ color: 'var(--text-primary)' }}>
            Привет, меня зовут Александр
          </h1>

          <p className="mt-6 text-justify text-base leading-relaxed" style={{ color: 'var(--text-primary)' }}>
            Я разработчик систем автоматизации и ИИ.
            Строю решения, которые собирают, анализируют и используют данные — без лишней сложности, с фокусом на результат.
          </p>

          <p className="mt-4 text-justify text-base leading-relaxed" style={{ color: 'var(--text-primary)' }}>
            На этом сайте представлены две мои самые интересные работы:
          </p>

          <div className="mt-3 text-justify text-base leading-relaxed" style={{ color: 'var(--text-primary)' }}>
            <p><strong>Интеллектуальный Ассистент Инженера</strong> — B2B-платформа для автоматизации технической поддержки промышленного оборудования.</p>
            <p className="mt-2"><strong>Автоматизация Telegram-канала</strong> — бот с ИИ-генерацией контента, который парсит новости, пишет посты и создаёт картинки.</p>
          </div>
        </motion.div>

        {/* Desktop floating icons */}
        <div className="hidden w-full max-w-5xl md:block">
          <div className="relative mt-10">
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

        {/* Mobile project grid */}
        <div className="mt-10 grid w-full max-w-md grid-cols-2 gap-4 md:hidden">
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
      </main>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
      <TelegramModal open={tgOpen} onClose={() => setTgOpen(false)} />
    </>
  )
}