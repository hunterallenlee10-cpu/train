'use client'

import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'

const DoorLifter = lazy(() => import('./DoorLifter'))

/**
 * "Door up". The door panel is server-rendered over photo 01 and is only visible when JS runs
 * (see .door in globals.css). Once the photo has loaded and the frame is on screen, the door rolls
 * up and out of the frame in 1.1s with an ease-out, once. Reduced motion: the door never shows.
 * The motion code is loaded lazily at that moment, so it never delays the photo or the first paint.
 */
export default function GarageDoor({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [door, setDoor] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current?.querySelector<HTMLElement>('[data-door]')
    const frame = ref.current?.closest<HTMLElement>('[data-door-frame]')
    if (!el || !frame) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Hydrated: cancel the CSS failsafe, this component owns the door now.
    el.style.animation = 'none'
    let cancelled = false

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
    Promise.all([imageReady, inView]).then(() => {
      if (!cancelled) setDoor(el)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const done = useCallback(() => {
    ref.current?.querySelector<HTMLElement>('[data-door]')?.style.setProperty('visibility', 'hidden')
  }, [])

  return (
    <div ref={ref} className="contents">
      {children}
      {door ? (
        <Suspense fallback={null}>
          <DoorLifter door={door} onDone={done} />
        </Suspense>
      ) : null}
    </div>
  )
}
