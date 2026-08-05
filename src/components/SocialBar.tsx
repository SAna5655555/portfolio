import { Send } from 'lucide-react'
import { motion } from 'framer-motion'

interface Props {
  onClick: () => void
}

export default function SocialBar({ onClick }: Props) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      onClick={onClick}
      data-hoverable
      aria-label="Telegram"
      className="fixed left-6 top-6 z-50 flex h-12 w-12 items-center justify-center rounded-full glass transition-colors"
      style={{ color: 'var(--text-primary)' }}
    >
      <Send size={22} />
    </motion.button>
  )
}