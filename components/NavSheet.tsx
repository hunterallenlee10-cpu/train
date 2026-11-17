'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { BuilderButton } from '@/components/BuilderButton'

type Props = { links: { href: string; label: string }[]; loginHref: string; email: string }

/** Phone menu: a full-screen sheet with large tap targets. Focus is trapped while open. */
export default function NavSheet({ links, loginHref, email }: Props) {
  const [open, setOpen] = useState(false)
  const burger = useRef<HTMLButtonElement>(null)
  const sheet = useRef<HTMLDivElement>(null)

  const close = useCallback((restore = true) => {
    setOpen(false)
    if (restore) burger.current?.focus()
  }, [])

  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    const prev = root.style.overflow
    root.style.overflow = 'hidden'
    const el = sheet.current
    el?.querySelector<HTMLElement>('a, button')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key !== 'Tab' || !el) return
      const items = Array.from(el.querySelectorAll<HTMLElement>('a, button'))
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    const onWide = () => window.innerWidth >= 768 && close(false)
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onWide)
    return () => {
      root.style.overflow = prev
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onWide)
    }
  }, [open, close])

  return (
    <>
      <button
        ref={burger}
        type="button"
        className="inline-flex size-11 items-center justify-center rounded border-2 border-ink md:hidden"
        aria-expanded={open}
        aria-controls="nav-sheet"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <Menu aria-hidden="true" strokeWidth={2.25} className="size-6" />
      </button>
      {open ? (
        <div
          id="nav-sheet"
          ref={sheet}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col bg-paper md:hidden"
        >
          <div className="wrap flex h-16 items-center justify-between border-b border-line">
            <span className="font-display text-h3 uppercase">Menu</span>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded border-2 border-ink"
              aria-label="Close menu"
              onClick={() => close()}
            >
              <X aria-hidden="true" strokeWidth={2.25} className="size-6" />
            </button>
          </div>
          <ul className="wrap flex flex-1 flex-col pt-4">
            {links.map((l) => (
              <li key={l.href} className="border-b border-line">
                <a href={l.href} onClick={() => close(false)} className="flex min-h-16 items-center font-display text-h2 uppercase">
                  {l.label}
                </a>
              </li>
            ))}
            <li className="border-b border-line">
              <a href={loginHref} className="flex min-h-14 items-center text-lead font-medium">
                Member log-in
              </a>
            </li>
            <li>
              <a href={`mailto:${email}`} className="flex min-h-14 items-center text-lead font-medium">
                Email Evan
              </a>
            </li>
          </ul>
          <div className="wrap pb-8">
            <BuilderButton className="btn btn-primary w-full text-lg" onClick={() => close(false)}>
              Book a Block
            </BuilderButton>
          </div>
        </div>
      ) : null}
    </>
  )
}
