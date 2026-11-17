import type { NextConfig } from 'next'

const isLive = process.env.NEXT_PUBLIC_SITE_MODE === 'live'

const nextConfig: NextConfig = {
  poweredByHeader: false,
  agentRules: false,
  devIndicators: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [70, 75],
  },
  async headers() {
    const security = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    ]
    // Demo mode: every response (pages, images, files) carries noindex, nofollow.
    const robots = isLive ? [] : [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }]
    return [{ source: '/:path*', headers: [...security, ...robots] }]
  },
}

export default nextConfig
