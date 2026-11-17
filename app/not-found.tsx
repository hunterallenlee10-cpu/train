import type { Metadata } from 'next'
import Link from 'next/link'
import { Logo } from '@/components/Logo'

export const metadata: Metadata = {
  title: 'Page not found | train.',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <main className="wrap flex min-h-dvh flex-col items-start justify-center py-16">
      <Link href="/" aria-label="train., go to the passes page">
        <Logo sizes="120px" className="h-auto w-[104px]" />
      </Link>
      <p className="eyebrow mt-10 text-muted">404</p>
      <h1 className="mt-3 font-display text-h1 uppercase">This page is not here.</h1>
      <p className="mt-4 max-w-md text-lead">The passes, the prices and the Block Builder are one tap away.</p>
      <Link href="/" className="btn btn-primary mt-8">
        Go to the passes
      </Link>
    </main>
  )
}
