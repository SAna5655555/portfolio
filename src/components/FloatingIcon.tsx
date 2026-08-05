import { Folder, Code2, Bot, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Project } from '../types'

const iconMap: Record<string, typeof Folder> = {
  Folder,
  Code2,
  Bot,
  Zap,
}

interface Props {
  project: Project
  index: number
  positions: { top: string; left: string }
  floatDelay: number
  floatDuration: number
  iconKey: string
  onClick: () => void
}

export default function FloatingIcon({ project, index, positions, floatDelay, floatDuration, iconKey, onClick }: Props) {
  const Icon = iconMap[iconKey] || Folder

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
      transition={{
        opacity: { delay: 0.5 + index * 0.15, duration: 0.5 },
        scale: { delay: 0.5 + index * 0.15, duration: 0.5 },
        y: {
          delay: floatDelay,
          duration: floatDuration,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }}
      whileHover={{ scale: 1.1 }}
      onClick={onClick}
      data-hoverable
      aria-label={`Открыть ${project.title}`}
      className="absolute z-[5] flex cursor-none flex-col items-center gap-3"
      style={{ top: positions.top, left: positions.left }}
    >
      <motion.div
        className="flex h-24 w-24 items-center justify-center rounded-2xl backdrop-blur-md transition-shadow duration-300 md:h-28 md:w-28"
        style={{ background: 'color-mix(in srgb, var(--accent) 10%, transparent)' }}
        whileHover={{
          boxShadow: '0 0 30px var(--glow), 0 0 60px var(--glow)',
        }}
      >
        <Icon size={40} style={{ color: 'var(--accent)' }} />
      </motion.div>
      <span className="max-w-[120px] text-center text-sm font-medium leading-tight" style={{ color: 'var(--text-secondary)' }}>
        {project.shortTitle}
      </span>
    </motion.button>
  )
}