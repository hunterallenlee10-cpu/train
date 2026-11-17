'use client'

import { useEffect } from 'react'
import { useAnimate } from 'motion/react-mini'

/**
 * Rolls the garage door up and out of the frame once: 1.1s, ease-out.
 * motion's small React entry runs the transform on the compositor (WAAPI), so the main thread stays free.
 * Loaded lazily by GarageDoor only when the photo has loaded and the frame is on screen.
 */
export default function DoorLifter({ door, onDone }: { door: HTMLElement; onDone: () => void }) {
  const [, animate] = useAnimate()

  useEffect(() => {
    let live = true
    const controls = animate(
      door,
      { transform: ['translateY(0%)', 'translateY(-101%)'] },
      { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
    )
    controls.then(() => live && onDone())
    return () => {
      live = false
    }
  }, [animate, door, onDone])

  return null
}
