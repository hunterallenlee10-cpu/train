import type { MetadataRoute } from 'next'
import { abs } from '@/lib/site'

// Served in live mode only. In demo mode proxy.ts answers /sitemap.xml with a 404.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: abs('/'), lastModified: new Date('2026-11-17'), changeFrequency: 'monthly', priority: 1 }]
}
