import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Code2, Bot, Zap } from 'lucide-react'
import FloatingIcon from './components/FloatingIcon'
import ProjectModal from './components/ProjectModal'
import ThemeToggle from './components/ThemeToggle'
import SocialBar from './components/SocialBar'
import CustomCursor from './components/CustomCursor'
import { projects } from './data/projects'
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

      {/* Background gradient */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_rgba(108,92,231,0.08)_0%,_transparent_70%)]" />

      {/* Vignette */}
      <div className="vignette" />

      <ThemeToggle />

      <main className="relative z-10 flex min-h-screen items-center justify-center p-4">
        {/* Central photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="relative z-10"
        >
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-[rgba(108,92,231,0.15)] blur-2xl" />
            <img
              src="/central.jpg"
              alt="Portrait"
              className="relative h-48 w-48 rounded-full object-cover ring-2 ring-[rgba(108,92,231,0.3)] sm:h-56 sm:w-56 md:h-64 md:w-64"
              style={{ aspectRatio: '1/1' }}
            />
          </div>
        </motion.div>

        {/* Floating icons - desktop */}
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

        {/* Floating icons - mobile (grid layout) */}
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
                className="flex flex-col items-center gap-2 rounded-2xl bg-[rgba(108,92,231,0.08)] p-4 backdrop-blur-md"
              >
                <Icon size={28} className="text-[#6c5ce7]" />
                <span className="text-center text-xs font-medium text-[#a0a0b8]">
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