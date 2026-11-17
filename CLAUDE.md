# train. purchase page concept

Re-read the matching part of BUILD-SPEC.md at the start of each phase.

## Stack
- Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS 4 (tokens in the `@theme` block of `app/globals.css`, no JS config).
- `motion` (import from `motion/react`), lazy, only in the garage door and Block Math.
- `lucide-react` icons, `@vercel/analytics`. No backend, no database, no API keys.
- Fonts: Anton (display) and DM Sans (body) via `next/font/google`. The script wordmark is always the logo image.

## Commands
- `npm run dev`: dev server on :3000
- `npm run build` then `npm start`: production build (the build runs `scripts/prebuild-guard.mjs`, which fails live builds with DRAFT markers left)
- `npm run lint`: ESLint (flat config, `next lint` no longer exists)
- `npm test`: Vitest (pricing maths)
- `npm run check`: page checks against a running server (default http://localhost:3000, override with `CHECK_URL`)
- `npm run og`: regenerate `public/og-image.png` and the icons
- `NEXT_PUBLIC_SITE_MODE=demo|live`, `NEXT_PUBLIC_SITE_URL=https://...` drive indexing

## Rules that never bend
- Real facts only. Every fact lives in `lib/business.ts` and comes from BUILD-SPEC.md section 1. Anything assumed gets a `// DRAFT` comment.
- Real photos only, from `public/images/raw/`. No stock, no AI images, no placeholder people. Reference-brand images are never on the page.
- One goal: Book a Block (opens the Block Builder). Second path: Email Evan. Quiet Member log-in. Nothing else competes.
- No em dashes and no double hyphens in copy. No "booked", "confirmed" or "paid". No phone number, no reviews, no spot counts.
- Spray green is never text on paper. On paper it is only a filled shape with ink text on it.
- No file over 500 lines.
