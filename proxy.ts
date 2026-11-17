import { NextResponse, type NextRequest } from 'next/server'

// Demo mode serves no sitemap. (llms.txt answers 404 itself in demo mode.)
export function proxy(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_SITE_MODE !== 'live' && request.nextUrl.pathname === '/sitemap.xml') {
    return new NextResponse('Not found', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'X-Robots-Tag': 'noindex, nofollow' },
    })
  }
  return NextResponse.next()
}

export const config = { matcher: ['/sitemap.xml'] }
