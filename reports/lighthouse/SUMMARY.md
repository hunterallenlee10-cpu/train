# Lighthouse results

Lighthouse 13.6.0, Chromium from Playwright, production builds (`next build` then `next start`) on this machine, 17 November 2026. Image optimizer cache warmed once before each audit, as a deployed CDN would serve it. Raw reports are regenerated with `scripts/lighthouse.sh <label>` and are not committed.

| Run | Performance | Accessibility | Best Practices | SEO | Agentic Browsing | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Live, mobile | 96 | 100 | 100 | 100 | 100 | 2.6 s | 0 | 80 ms |
| Live, mobile, repeat 1 | 94 | 100 | 100 | 100 | 100 | 3.0 s | 0 | 90 ms |
| Live, mobile, repeat 2 | 97 | 100 | 100 | 100 | 100 | 2.4 s | 0 | 70 ms |
| Live, mobile, repeat 3 | 92 | 100 | 100 | 100 | 100 | 3.1 s | 0 | 150 ms |
| Live, mobile, applied throttling (real slow 4G, 4x CPU) | 97 | 100 | 100 | 100 | 100 | 1.8 s | 0 | 140 ms |
| Live, desktop | 100 | 100 | 100 | 100 | 100 | 0.7 s | 0 | 0 ms |
| Demo, mobile | 95 | 100 | 100 | 69 | 100 | 3.0 s | 0 | 60 ms |
| Demo, desktop | 100 | 100 | 100 | 69 | 100 | 0.7 s | 0 | 0 ms |

Demo mode SEO: the only failing check is `is-crawlable` ("Page is blocked from indexing"), on purpose.

Mobile LCP: the hero photo paints at 120 to 190ms unthrottled. The simulated (default) profile puts it at 2.4 to 3.1s because it counts the framework JavaScript (React DOM and the App Router runtime, about 160KB compressed) requested before that paint. With real throttling applied it is 1.8s.

Tap response (event timing, Moto G4 profile, 4x CPU throttle, 10 interactions including the first Block Builder open): worst 152ms.
