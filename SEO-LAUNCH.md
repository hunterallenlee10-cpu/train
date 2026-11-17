# SEO launch steps for the train. purchase page

The page is built to score 100 for SEO in live mode. The deployed concept stays in demo mode (noindex, nofollow) until these steps are done.

## 1. Answer the open DRAFT items

The live build fails while any `DRAFT` marker remains in `app/`, `components/`, `lib/` or `public/`. Run `grep -rn DRAFT app components lib` to see them:

- Which days the blocks run (the page and the structured data assume every day, 4:00am to 10:00pm).
- Sales tax: is any added at checkout?
- Does the 3-Pack expire? (Block Math assumes the packs are used within the month.)
- Can one buyer pay for several people at once?
- Gift card amounts.
- The Mariana Tek product link for each pass (see step 2).
- The social platform for @train_142 (assumed Instagram).
- Whether to show a phone number (`phone: null` in `lib/business.ts`; set it to switch on Call and Text later).
- Evan's own answers to "Can I use chalk?" and "Can I slam weights?" (in `lib/faq.ts`).
- The map pin: coordinates come from OpenStreetMap for 108 142nd Street.

## 2. Put the Mariana Tek product links into `checkoutUrl`

In `lib/business.ts`, each pass has a `checkoutUrl`. Today they all point at `https://www.trainocmd.com/buy`. Replace each with the Mariana Tek product link for that pass (Drop-In, 3-Pack, Train Unlimited, Gift card), so "Continue to secure checkout" opens the checkout with the pass already chosen.

## 3. Set the two variables in Vercel and redeploy

In the Vercel project (`train-ocmd-concept`, or the production project), Settings, Environment Variables, Production:

- `NEXT_PUBLIC_SITE_MODE` = `live`
- `NEXT_PUBLIC_SITE_URL` = `https://www.trainocmd.com` (the final address, no trailing slash)

Redeploy. Live mode then serves `index, follow`, drops the `X-Robots-Tag` header, lists the sitemap in `robots.txt`, serves `/sitemap.xml` and `/llms.txt`, and hides the concept footer line.

## 4. Addresses on trainocmd.com

This page replaces `/buy`. His current addresses:

| Address | What happens |
| --- | --- |
| `/home` | Stays as it is. This is the page the Google Business Profile should link to. |
| `/buy` | Replaced by this page. It must keep the `/buy` address, or `/buy` must 301 redirect to the new page's address. Never leave it as a dead link. |
| `/schedule` | Stays as it is (Mariana Tek booking calendar). |
| `/appointments` | Stays as it is. |
| `/merch` | Stays as it is. |
| `/login` | Stays as it is. The page links to it as "Member log-in". |
| `/cart` | Stays as it is (Mariana Tek cart). |
| `/terms-of-service` | Stays as it is. Linked from the footer. |
| `/privacy-policy` | Stays as it is. Linked from the footer. |

If the page goes live at an address other than `/buy`, set `NEXT_PUBLIC_SITE_URL` to match, so the canonical tag, the sitemap and the structured data all point at the real address.

## 5. Search engines

- Google Search Console: add the property, then submit `https://www.trainocmd.com/sitemap.xml` (or the live address of the sitemap).
- Bing Webmaster Tools: import from Search Console or add the site, then submit the same sitemap.
- Run the page through the Rich Results Test and the Schema Markup Validator once live.

## 6. Listings, with the same name and address everywhere

Use exactly: **Train**, 108 142nd St., Unit C, Ocean City, MD 21842, info@trainocmd.com.

- Google Business Profile: website link to the home page (`/home`), booking link to this page.
- Apple Business (Apple Maps).
- Bing Places.
- Yelp.

## 7. Retire the preview address

Once live, remove or password-protect the Vercel preview deployment of the concept so only one public copy of the page exists.

## For Evan

The page is technically complete. Ranking from here depends mostly on your Google profile, reviews, links and listings.
