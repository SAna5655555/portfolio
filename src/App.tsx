import { useState, useMemo } from 'react'
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

      {/* Full-screen background photo */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <img
          src={basePath('/central.jpg')}
          alt=""
          className="h-full w-full object-cover"
          style={{ filter: 'brightness(0.6) saturate(0.8)' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 60%, var(--bg-primary))' }} />
      </div>

      <div className="vignette" />

      <ThemeToggle />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4">
        {/* Desktop floating icons */}
        <div className="hidden md:block">
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

        {/* Mobile grid */}
        <div className="mt-8 grid grid-cols-2 gap-4 md:hidden">
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

      <SocialBar />
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  )
}