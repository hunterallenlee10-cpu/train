'use client'

import { useEffect, useRef, useState } from 'react'
import { BuilderButton } from '@/components/BuilderButton'

/**
 * Phones only. [Email Evan] [Book a Block], hidden while the hero buttons are on screen.
 * It never covers whatever has keyboard focus: focused elements are scrolled clear of it.
 */
export default function StickyBar({ email }: { email: string }) {
  const [show, setShow] = useState(false)
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hero = document.getElementById('hero-actions')
    const final = document.getElementById('final-title')
    const visible = new Map<Element, boolean>()
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) visible.set(e.target, e.isIntersecting || (e.target === hero && e.boundingClientRect.top > 0))
      setShow(![...visible.values()].some(Boolean))
    })
    if (hero) io.observe(hero)
    if (final) io.observe(final)

    const onFocus = (e: FocusEvent) => {
      const el = e.target as HTMLElement
      const b = bar.current
      if (!b || !el?.getBoundingClientRect || b.contains(el) || getComputedStyle(b).display === 'none') return
      if (b.dataset.show !== 'true') return
      const r = el.getBoundingClientRect()
      const limit = window.innerHeight - b.offsetHeight - 12
      if (r.bottom > limit) window.scrollBy({ top: r.bottom - limit, behavior: 'instant' as ScrollBehavior })
    }
    document.addEventListener('focusin', onFocus)
    return () => {
      io.disconnect()
      document.removeEventListener('focusin', onFocus)
    }
  }, [])

  return (
    <div
      ref={bar}
      data-show={show}
      inert={!show}
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-30 border-t-2 border-ink bg-paper px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 transition-transform duration-200 md:hidden ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="grid grid-cols-[auto_1fr] gap-3">
        <a className="btn btn-ghost" href={`mailto:${email}`}>
          Email Evan
        </a>
        <BuilderButton className="btn btn-primary">Book a Block</BuilderButton>
      </div>
    </div>
  )
}
