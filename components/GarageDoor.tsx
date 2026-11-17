'use client'

import { useEffect, useRef } from 'react'

/**
 * "Door up". The door panel is server-rendered over photo 01 and is only visible when JS runs
 * (see .door in globals.css). Once the photo has loaded and the frame is on screen, the door rolls
 * up and out of the frame in 1.1s with an ease-out, once. Reduced motion: the door never shows.
 * motion is imported lazily so it never delays the photo or the first paint.
 */
export default function GarageDoor({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const door = ref.current?.querySelector<HTMLElement>('[data-door]')
    const frame = ref.current?.closest<HTMLElement>('[data-door-frame]')
    if (!door || !frame) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Hydrated: cancel the CSS failsafe, this component owns the door now.
    door.style.animation = 'none'
    let cancelled = false
    let started = false

    const lift = async () => {
      if (started || cancelled) return
      started = true
      try {
        const { animate } = await import('motion/react')
        if (cancelled) return
        await animate(door, { y: '-101%' }, { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 })
      } catch {
        door.style.transition = 'transform 1.1s cubic-bezier(0.22, 1, 0.36, 1)'
        door.style.transform = 'translateY(-101%)'
      }
      if (!cancelled) door.style.visibility = 'hidden'
    }

    const img = frame.querySelector('img')
    const imageReady = new Promise<void>((resolve) => {
      if (!img || (img.complete && img.naturalWidth > 0)) return resolve()
      img.addEventListener('load', () => resolve(), { once: true })
      img.addEventListener('error', () => resolve(), { once: true })
      window.setTimeout(resolve, 3500)
    })
    const inView = new Promise<void>((resolve) => {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            io.disconnect()
            resolve()
          }
        },
        { threshold: 0.6 },
      )
      io.observe(frame)
    })
    Promise.all([imageReady, inView]).then(lift)

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div ref={ref} className="contents">
      {children}
    </div>
  )
}
