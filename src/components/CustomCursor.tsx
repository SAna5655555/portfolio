import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const springX = useSpring(mouseX, { stiffness: 300, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 300, damping: 20 })
  const scale = useMotionValue(1)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-hoverable]')) {
        scale.set(2.5)
      } else {
        scale.set(1)
      }
    }

    const handleMouseOut = () => {
      scale.set(1)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
    }
  }, [mouseX, mouseY, scale])

  return (
    <motion.div
      ref={cursorRef}
      className="pointer-events-none fixed z-[9999] hidden md:block"
      style={{
        left: springX,
        top: springY,
        x: '-50%',
        y: '-50%',
        scale,
      }}
    >
      <div className="h-4 w-4 rounded-full bg-[#6c5ce7] opacity-80 mix-blend-difference" />
      <div className="absolute inset-0 h-4 w-4 animate-ping rounded-full bg-[#6c5ce7] opacity-30" />
    </motion.div>
  )
}