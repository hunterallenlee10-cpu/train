import { business } from '@/lib/business'
import { BuilderButton } from '@/components/BuilderButton'
import { Logo } from '@/components/Logo'
import NavSheet from '@/components/NavSheet'

export const anchors = [
  { href: '#passes', label: 'Passes' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#q-and-a', label: 'Q and A' },
]

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-[2px]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-3 focus:text-chalk"
      >
        Skip to the passes and prices
      </a>
      <nav aria-label="Main" className="wrap flex h-16 items-center gap-6">
        <a href="#top" aria-label="train., back to the top" className="-my-1 flex shrink-0 items-center">
          <Logo sizes="64px" className="h-[50px] w-auto" preload />
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {anchors.map((a) => (
            <li key={a.href}>
              <a
                href={a.href}
                className="inline-flex min-h-11 items-center rounded px-3 font-medium hover:underline hover:decoration-2 hover:underline-offset-4"
              >
                {a.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="ml-auto flex items-center gap-2 md:gap-4">
          <a
            href={business.links.login}
            className="hidden min-h-11 items-center px-2 text-label font-medium text-muted hover:text-ink hover:underline md:inline-flex"
          >
            Member log-in
          </a>
          <BuilderButton className="btn btn-primary min-h-11 px-4 py-2 text-[0.9375rem]">Book a Block</BuilderButton>
          <NavSheet links={anchors} loginHref={business.links.login} email={business.email} />
        </div>
      </nav>
    </header>
  )
}
