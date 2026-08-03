import { Camera, Hash, Globe, Code2, Send } from 'lucide-react'
import { motion } from 'framer-motion'
import { socialLinks } from '../data/socials'

const iconComponents: Record<string, typeof Send> = {
  instagram: Camera,
  twitter: Hash,
  behance: Globe,
  github: Code2,
  send: Send,
}

export default function SocialBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-6"
    >
      {socialLinks.map((link, i) => {
        const Icon = iconComponents[link.icon] || Send
        return (
          <motion.a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + i * 0.08, duration: 0.4 }}
            whileHover={{ scale: 1.15, y: -3 }}
            data-hoverable
            aria-label={link.label}
            className="flex h-10 w-10 items-center justify-center rounded-full glass text-[#a0a0b8] transition-colors hover:text-[#6c5ce7]"
          >
            <Icon size={18} />
          </motion.a>
        )
      })}
    </motion.div>
  )
}