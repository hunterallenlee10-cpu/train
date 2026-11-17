# Lighthouse results

Lighthouse 13.6.0, Chromium from Playwright, production builds (`next build` then `next start`) on this machine, 17 November 2026, final build. Live mode was built locally with NEXT_PUBLIC_SITE_MODE=live and NEXT_PUBLIC_SITE_URL=http://localhost:3000. The image optimizer cache was warmed once before each audit, as a deployed CDN would serve it. Raw reports are regenerated with `scripts/lighthouse.sh <label>` and are not committed.

| Run | Performance | Accessibility | Best Practices | SEO | Agentic Browsing | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Live, mobile | 96 | 100 | 100 | 100 | 100 | 2.5 s | 0 | 140 ms |
| Live, mobile, repeat 1 | 93 | 100 | 100 | 100 | 100 | 3.1 s | 0 | 90 ms |
| Live, mobile, repeat 2 | 95 | 100 | 100 | 100 | 100 | 3.0 s | 0 | 50 ms |
| Live, mobile, applied throttling (real slow 4G, 4x CPU) | 96 | 100 | 100 | 100 | 100 | 1.8 s | 0 | 180 ms |
| Live, desktop | 100 | 100 | 100 | 100 | 100 | 0.7 s | 0 | 0 ms |
| Demo, mobile | 96 | 100 | 100 | 69 | 100 | 2.5 s | 0 | 130 ms |
| Demo, desktop | 100 | 100 | 100 | 69 | 100 | 0.7 s | 0 | 0 ms |

Demo mode SEO is 69 on purpose: the only failing check is `is-crawlable` ("Page is blocked from indexing").

Mobile LCP: the hero photo paints at 129 to 194ms unthrottled. The default simulated profile adds the framework JavaScript (React DOM and the App Router runtime, about 160KB compressed) to the LCP path, which is why it reads 2.5 to 3.1s across runs. With real slow 4G and 4x CPU throttling applied, LCP is 1.8s.

Tap response (event timing, Moto G4 profile, 4x CPU throttle, 10 interactions including the first Block Builder open): worst 152ms.

## Live on Vercel (https://train-ocmd-concept.vercel.app, demo mode, Vercel CDN, no cache warming)

| Run | Performance | Accessibility | Best Practices | SEO | Agentic Browsing | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Mobile | 92 | 100 | 100 | 69 | 100 | 2.2 s | 0 | 320 ms |
| Mobile, repeat 1 | 95 | 100 | 100 | 69 | 100 | 2.2 s | 0 | 240 ms |
| Mobile, repeat 2 | 98 | 100 | 100 | 69 | 100 | 1.8 s | 0 | 150 ms |
| Desktop | 100 | 100 | 100 | 69 | 100 | 0.5 s | 0 | 20 ms |

SEO 69 is the intended noindex in demo mode. `npm run check` 25/25 and `npm run flow` 60/60 against the live URL.
