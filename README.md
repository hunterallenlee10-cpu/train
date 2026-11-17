# train. purchase page (concept)

Live demo: https://train-ocmd-concept.vercel.app (demo mode: noindex, nofollow)

A front-end concept of the purchase page for train., a private garage gym in Ocean City, MD. Next.js 16, React 19, Tailwind CSS 4. No backend.

- Spec: `BUILD-SPEC.md`. Plan and checklist: `implementation_kickstart.md`. Launch steps: `SEO-LAUNCH.md`.
- Facts live in `lib/business.ts`, prices maths in `lib/pricing.ts`, Q and A in `lib/faq.ts`.

## Run

```bash
npm install
npm run dev
```

Production: `npm run build` then `npm start`. Checks: `npm run check` (against a running server), `npm run flow`, `npm test`, `npm run lint`.

## Deploy on Vercel

Import the repository as a new project named `train-ocmd-concept`. No settings are needed: with no environment variables it runs in demo mode (noindex, nofollow, concept footer line). Set `NEXT_PUBLIC_SITE_URL` to the deployment address so canonical and structured-data links are absolute. Live mode (`NEXT_PUBLIC_SITE_MODE=live`) is for the real launch only, see `SEO-LAUNCH.md`; its build fails while DRAFT items remain.
