import type { MetadataRoute } from 'next'
import { IS_LIVE, SITE_URL } from '@/lib/site'

// AI crawlers kept out of the demo by name. Search engines may enter so they can read the noindex tag and header.
const AI_CRAWLERS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'CCBot',
  'Google-Extended',
  'PerplexityBot',
  'Perplexity-User',
  'Bytespider',
  'Applebot-Extended',
  'meta-externalagent',
  'Amazonbot',
  'cohere-ai',
]

export default function robots(): MetadataRoute.Robots {
  if (IS_LIVE) {
    return { rules: [{ userAgent: '*', allow: '/' }], sitemap: `${SITE_URL}/sitemap.xml` }
  }
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: AI_CRAWLERS, disallow: '/' },
    ],
  }
}
