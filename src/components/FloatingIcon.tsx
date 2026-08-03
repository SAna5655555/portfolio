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
      aria-label={`Open ${project.title}`}
      className="absolute z-[5] flex cursor-none flex-col items-center gap-2"
      style={{ top: positions.top, left: positions.left }}
    >
      <motion.div
        className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[rgba(108,92,231,0.1)] backdrop-blur-md transition-shadow duration-300"
        whileHover={{
          boxShadow: '0 0 30px rgba(108, 92, 231, 0.4), 0 0 60px rgba(108, 92, 231, 0.2)',
        }}
      >
        <Icon size={28} className="text-[#6c5ce7]" />
      </motion.div>
      <span className="max-w-[100px] truncate text-center text-xs font-medium text-[#a0a0b8]">
        {project.shortTitle}
      </span>
    </motion.button>
  )
}