import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Mail } from 'lucide-react'

interface Props {
  open: boolean
  onClose: () => void
}

export default function TelegramModal({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
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
            className="relative z-10 w-full max-w-sm rounded-2xl glass p-6 text-center shadow-2xl"
          >
            <button
              onClick={onClose}
              aria-label="Закрыть"
              className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full transition-colors"
              style={{ color: 'var(--text-secondary)' }}
            >
              <X size={16} />
            </button>

            <div className="flex flex-col items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: 'color-mix(in srgb, var(--accent) 15%, transparent)' }}>
                <Send size={32} style={{ color: 'var(--accent)' }} />
              </div>

              <div className="flex flex-col items-center gap-2">
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Мой Telegram</p>
                <a
                  href="https://t.me/on1x_dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-base font-medium transition-colors"
                  style={{
                    background: 'color-mix(in srgb, var(--accent) 15%, transparent)',
                    color: 'var(--accent)',
                  }}
                >
                  @on1x_dev
                </a>
              </div>

              <div className="flex flex-col items-center gap-2">
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Рабочая почта</p>
                <a
                  href="mailto:on1xaidev@gmail.com"
                  className="inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-base font-medium transition-colors"
                  style={{
                    background: 'color-mix(in srgb, var(--accent) 15%, transparent)',
                    color: 'var(--accent)',
                  }}
                >
                  <Mail size={18} />
                  on1xaidev@gmail.com
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}