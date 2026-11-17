import type { Metadata, Viewport } from 'next'
import { Anton, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { DESCRIPTION, IS_LIVE, SITE_URL, TITLE } from '@/lib/site'
import './globals.css'

const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton', display: 'swap' })
const dmSans = DM_Sans({ weight: ['400', '500', '700'], subsets: ['latin'], variable: '--font-dm-sans', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: 'train.',
  alternates: { canonical: '/' },
  robots: IS_LIVE
    ? { index: true, follow: true }
    : { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'train.',
    title: TITLE,
    description: DESCRIPTION,
    locale: 'en_US',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'train. Pick a pass. Book a block. The open garage gym on 142nd St., Ocean City, MD.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-image.png'],
  },
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  themeColor: '#EEECE6',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available before first paint, so the garage door overlay never shows without JS. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        {children}
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  )
}
