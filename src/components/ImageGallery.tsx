import { useState, useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { basePath } from '../utils/basePath'

interface Props {
  images: string[]
  title: string
}

export default function ImageGallery({ images, title }: Props) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const touchStartX = useRef(0)

  const goTo = useCallback((i: number) => {
    setDirection(i > current ? 1 : -1)
    setCurrent(i)
  }, [current])

  const next = () => goTo((current + 1) % images.length)
  const prev = () => goTo((current - 1 + images.length) % images.length)

  if (images.length === 0) return null

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0) next()
      else prev()
    }
  }

  return (
    <>
      <div className="relative w-full overflow-hidden rounded-xl">
        <AnimatePresence custom={direction} mode="wait">
          <motion.img
            key={current}
            src={basePath(images[current])}
            alt={`${title} — скриншот ${current + 1}`}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="h-auto w-full cursor-pointer object-contain"
            loading="lazy"
            onClick={() => setFullscreen(true)}
            draggable="false"
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Предыдущее"
              className="absolute left-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60 active:bg-black/80"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              aria-label="Следующее"
              className="absolute right-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60 active:bg-black/80"
            >
              <ChevronRight size={18} />
            </button>

            <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`К изображению ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? 'w-6 bg-[#6c5ce7]' : 'w-1.5 bg-white/40'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setFullscreen(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button
              onClick={(e) => { e.stopPropagation(); setFullscreen(false) }}
              aria-label="Закрыть"
              className="absolute right-6 top-6 z-[201] flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 active:bg-white/30"
            >
              <X size={24} />
            </button>

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prev() }}
                  aria-label="Предыдущее"
                  className="absolute left-0 top-0 z-[199] h-full w-20 cursor-none opacity-0 sm:w-32"
                />
                <button
                  onClick={(e) => { e.stopPropagation(); next() }}
                  aria-label="Следующее"
                  className="absolute right-0 top-0 z-[199] h-full w-20 cursor-none opacity-0 sm:w-32"
                />
              </>
            )}

            <motion.img
              key={current}
              src={basePath(images[current])}
              alt={`${title} — скриншот ${current + 1}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-h-[90vh] max-w-full rounded-lg object-contain select-none"
              onClick={(e) => e.stopPropagation()}
              draggable="false"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}