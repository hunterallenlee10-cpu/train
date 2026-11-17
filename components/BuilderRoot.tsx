'use client'

import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import type { PassId } from '@/lib/business'

const loadBuilder = () => import('./BlockBuilder/BlockBuilder')
const BlockBuilder = lazy(loadBuilder)

type State = { open: boolean; pass?: PassId; block?: number; key: number }

/**
 * One delegated listener for every server-rendered [data-builder] button.
 * The Block Builder chunk loads when first opened (warmed on hover, touch or focus of a trigger).
 */
export default function BuilderRoot() {
  const [state, setState] = useState<State>({ open: false, key: 0 })
  const opener = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const trigger = (t: EventTarget | null) => (t instanceof Element ? t.closest<HTMLElement>('[data-builder]') : null)
    const onClick = (e: MouseEvent) => {
      const btn = trigger(e.target)
      if (!btn) return
      e.preventDefault()
      opener.current = btn
      const pass = (btn.dataset.pass || undefined) as PassId | undefined
      const block = btn.dataset.block ? Number(btn.dataset.block) : undefined
      setState((s) => ({ open: true, pass, block, key: s.key + 1 }))
    }
    let warmed = false
    const warm = (e: Event) => {
      if (warmed || !trigger(e.target)) return
      warmed = true
      loadBuilder()
    }
    document.addEventListener('click', onClick)
    document.addEventListener('pointerover', warm, { passive: true })
    document.addEventListener('touchstart', warm, { passive: true })
    document.addEventListener('focusin', warm)
    return () => {
      document.removeEventListener('click', onClick)
      document.removeEventListener('pointerover', warm)
      document.removeEventListener('touchstart', warm)
      document.removeEventListener('focusin', warm)
    }
  }, [])

  const close = useCallback(() => {
    setState((s) => ({ ...s, open: false }))
    const el = opener.current
    requestAnimationFrame(() => {
      if (el && el.isConnected) el.focus()
      else document.querySelector<HTMLElement>('header [data-builder]')?.focus()
    })
  }, [])

  if (!state.open) return null
  return (
    <Suspense fallback={null}>
      <BlockBuilder key={state.key} initialPass={state.pass} initialBlock={state.block} onClose={close} />
    </Suspense>
  )
}
