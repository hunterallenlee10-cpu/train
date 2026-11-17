train. (Ocean City, MD): Claude Code Build Prompt
Paste everything below the line into Claude Code, in an empty folder.

You are a senior web designer and front-end engineer. Your job is to build an award-level, front-end-only concept of ONE page for a real business: the purchase page for train., a private garage gym in Ocean City, Maryland. Lee Enterprises Unlimited will show it to the owner, Evan Dittler, who asked to see it.
What he has today, at trainocmd.com/buy: the page is an empty shell that waits for a third-party booking widget (Mariana Tek) to load by script. When the script does not load, the visitor sees only the line "Train here. Get it done.", a "Book A Block" button that links back to the same page, and the footer. The page's own HTML holds no pass names and no prices, the cart reads "Cart (0)", and the meta description is empty. Evan told us customers have reported this before and that clearing the cache or switching browsers "usually works". So some people who came to pay are leaving.
The new page fixes that in a way he can see in five seconds: the three passes and their prices are real text on the page from the first instant, with no script needed to see them, and every button moves the visitor forward. He will most likely open the link on his phone, so the first phone screen matters more than anything else. It must look like a hard-training garage brand with a spray-paint logo and a skull mural, not a gym template. If you could swap the logo and pass it off as another gym's page, it is not finished.
Finish the whole build in this session. Ordinary obstacles (a port in use, a missing browser for screenshots, an image that will not convert, a Lighthouse run that fails) are yours to diagnose and work through. Do not end by listing what is left or offering to continue. The only planned stop is missing photos, as described in section 0.
First actions, in this order:
Save this whole prompt into the project as BUILD-SPEC.md. Never edit it afterwards.
Write a short CLAUDE.md: the stack, the commands, the rules that never bend (real facts only, real photos only, one goal, no em dashes), and the line "re-read the matching part of BUILD-SPEC.md at the start of each phase".
Run git init. Commit after every phase.
Write implementation_kickstart.md (section 9).
0. Get the assets first
All images live in Hunter's Google Drive folder "Train - Website Demo Assets": https://drive.google.com/drive/folders/15TJs5MK977_2-cJNN9PfUBd1mhw_ElyB
photos/ (folder ID 1xtfOx03rA2bim5iKNQiLn3HGjDjLgcx1): 7 real photos of the gym and 2 logo files, all taken from the owner's own website. These are the only images allowed on the page.
reference-brand (look and feel only, not site images)/ (folder ID 1ks_GaaxHuvwDs6CjYhjkMmdZcZeco8n8): his wordmark in neon green on black, his skull merch art, and his wordmark on speckled paper. Read them for colour, texture and attitude. Never put them on the page.
If you have a Google Drive connector, download every file in photos/ into public/images/raw/. If you do not, check whether public/images/raw/ already holds them. If it is empty, stop and ask Hunter to drop the photos/ folder there, then continue. Look at every image yourself before you design.
Keep the source files at full size and let next/image serve the right size per screen, with a sizes value on every image and AVIF and WebP turned on. Do not hand-convert to one fixed file. Give every image its width and height.
Photo map (what each file is and where it goes)
Five of the seven photos are 1955px wide or more, so the hero can use a real photo at full width. Never stretch a photo past its native size. 06 is half-width at most on desktop and 07 is for a small card only.
File
Size
What it shows
Use it for
00-logo-logo-train-script-black-transparent
1000x600
The train. spray script wordmark with drips, black on transparent
Nav on the paper background, favicon source, link preview image
00-logo-2-logo-train-script-white-transparent
1000x600
The same wordmark in white on transparent
Footer and the dark pass band
01-GARAGE-DOOR-OPEN-exterior-BEST
2500x1875
The best photo and the trust photo. The gym from the parking lot with the garage door rolled all the way up: blue metal building, black rig and racks, bumper plates, benches, rubber floor, painted parking lines
Hero photo, under the garage door motion. Used again, smaller, in "Find the garage". A black pickup sits at the far left edge: position or crop it out of frame
02-interior-rack-lockers-climbing-rope
2500x1406
Inside, wide: black rack with bumper plates, grey lockers, adjustable bench, climbing rope at right
"How a block works", step 3. Background of the final band
03-echo-bike-dumbbells-kettlebells-skull-mural
2500x3333
Portrait: Rogue Echo bike, dumbbell rack, kettlebells, fan, and the edge of the skull and hibiscus mural
Tall photo beside the Block Math tool on desktop. Crop out the window stickers at the top left
04-rogue-plyo-boxes-dumbbell-rack
2500x1406
Three stacked Rogue wooden plyo boxes with a dumbbell rack behind
"How a block works", step 1
05-skull-beach-mural-wall-darkened
1955x1100
The painted wall mural: skulls, palm trees, beach, hibiscus, with the rig at right. Already darkened by the owner for text
Background of the trainers and whole-space band, with text on top. Do not darken it further
06-rower-ski-erg-sticker-post
1152x1536
Portrait: rower stood on end, a ski erg, a post covered in stickers
Gift card band, contained, half-width at most
07-rig-climbing-rope-rings-small
310x552
Portrait: rig with climbing rope and rings under one bright light
"How a block works", step 2, as a small card. Never enlarge

Never generate, fetch or use stock or AI images. They make a real business look fake, and Evan built this room himself. He will spot a stranger's gym instantly. There is no photo of Evan and no photo of people training. Do not fake either. Where a photo is missing, use type and the paper texture, not a placeholder person.
1. Business facts (use only these, invent nothing)
All of this goes in one file, lib/business.ts. Source for every line: trainocmd.com, read on 17 November 2026, plus Evan's own email.
Name: the wordmark is lowercase with a full stop: train. In body copy write "Train". The Instagram handle and merch use "OCMD".
Owner: Evan Dittler.
What it is: "Private garage gym and personal training space in Ocean City, Maryland." Two-hour blocks. Eight people max per block. No class, no instructor.
Address: 108 142nd St., Unit C, Ocean City, MD 21842. Bayside, in a newly built garage between Coastal Highway and Sinepuxent Ave.
Hours: blocks run 4:00am to 10:00pm. That makes nine 2-hour blocks a day: 4 to 6am, 6 to 8am, 8 to 10am, 10am to 12pm, 12 to 2pm, 2 to 4pm, 4 to 6pm, 6 to 8pm, 8 to 10pm. // DRAFT: confirm these run every day of the week
Main search phrase: "private gym Ocean City MD". Variations: "drop in gym Ocean City MD", "gym day pass Ocean City MD", "garage gym Ocean City Maryland". Name and address must appear exactly as written here.
Phone: none published. Do not add tel: or sms: links and do not invent a number. Keep phone: null in the facts file so Call and Text buttons can be switched on later.
Email: info@trainocmd.com
Links: member log-in https://trainocmd.com/login. Booking calendar https://www.trainocmd.com/schedule. Current checkout https://www.trainocmd.com/buy. Social handle @train_142 (// DRAFT: assumed Instagram, confirm).
Passes (published prices, use exactly):
Drop-In, $25 per person. "A one-time 2 hour block for you to Train."
3-Pack, $69 per person. "For the Weekend Warriors in town."
Train Unlimited Membership, $99 a month. "Unlimited access, one flat monthly price." Cancel any time: "No GTFO fee ever. I mean it."
Guest add-on: members can add a guest to their block for $25.
Gift cards: offered. Amounts are not published. // DRAFT: confirm gift card amounts
Personal trainers and whole-space rentals: rates by email only. Show no price.
Equipment (his list, plus what the photos show): brand new equipment, a climbing rope, sleds, portable turf, air bikes, rowers, bumper plates, and a garage door that opens when the weather is right. Rogue is the only brand visible in the photos.
Booking system: Mariana Tek. The real checkout and live availability stay there. This page is the front door to it.
Parking: spots right out front, then Sinepuxent Ave. "Please leave first spot open on nice days in case you want to workout outside!"
His own lines you can reuse: "Your workout. Your space. No crowds." / "Train here. Get it done." / "Train exactly how you want." / "Snag your spot. Show up. Get it done." / "Be there." / "Get after it." / "We are never crowded, by design." / "For the person who has everything but a good gym."
Owner's note (quote exactly, attributed "Evan Dittler, Owner"): "I've had some of the best workouts of my life in my old garage gym. No waiting for equipment. No explaining myself. No group workout plan to follow. When I moved, I missed it immediately."
Reviews: none found on Google or elsewhere. Do not build a reviews section and do not write sample reviews.
Unknown, so leave off or mark DRAFT: sales tax, whether the 3-Pack expires, whether a drop-in buyer can pay for several people at once, gift card amounts, phone number.
Do not claim: star ratings, review counts, member counts, years in business, awards, "#1" or "best" anything, staffed hours, lockers or showers as amenities, 24-hour access, a free trial, or any price not listed above.
2. The ONE goal
Every visitor action leads to "Book a Block". That button opens the Block Builder (section 5), which ends at the real checkout. Because Train publishes no phone number, the always-visible second path is "Email Evan" (mailto:info@trainocmd.com), plus a quiet "Member log-in" link in the nav for people who already have a pass. No newsletter, no other competing buttons.
3. Design direction: "Spray and Rubber"
His logo is black spray paint, dripping, on speckled off-white paper. His merch is the same script in neon green on black. His floor is black rubber and his wall is a hand-painted skull mural. The page is that world, kept calm: warm paper, heavy ink type, one loud green, and his real room in the photos. It is not a dark neon gym template and not a white corporate fitness chain.
Colour tokens (CSS variables in the Tailwind @theme block, written in OKLCH with the hex beside each):
--color-paper #EEECE6 (page background, about 60% of the page; sampled from his logo paper)
--color-chalk #F8F7F3 (cards on paper), border #D2D0C8
--color-ink #141512 (text, and the dark pass band and footer, about 30%; sampled from his logo black)
--color-rubber #22231F (cards inside the dark band)
--color-spray #39FF35 (the accent, about 10%; sampled from his green artwork). Allowed only as: the fill of the primary button with ink text on it, the selected state in the Block Builder and Block Math, the "best deal" tag, and one sprayed underline in the hero. Hover #2BE027.
--color-muted #55564F (muted text on paper), --color-muted-on-ink #A9AAA2
--color-deep-green #0E6B0C (links and success text on paper), --color-error #B3261E
No pure black, no pure white, no gradients, no glow, never purple.
Contrast, already checked: ink on paper 15.5 to 1. Muted on paper 6.3 to 1. Ink on spray green 13.6 to 1. Spray green on ink 13.6 to 1. Muted on ink 7.8 to 1. Deep green on paper 5.7 to 1. Error on paper 5.5 to 1. Spray green on paper is 1.1 to 1, so green is never text and never a thin line on the paper background. On paper it only appears as a filled shape with ink text on it.
Fonts (2 max, Google Fonts via next/font), both already used on his current site:
Display: Anton (400). Tall, condensed and heavy, like a stencil on a plate. Headlines, prices, block times.
Body: DM Sans (400, 500, 700).
The script wordmark is always the logo image, never a third font.
Type scale: seven named steps (label, body, lead, h3, h2, h1, display), each a clamp() in rem with a ceiling no more than 2.5 times its floor. Body never under 1rem, line height about 1.55. Display line height about 1.0. Text blocks about 66 characters wide. Hero headline: clamp(3rem, 13vw, 7.5rem), and the longest word must fit at 375px.
Material: spray paint on paper. A very light static speckle texture on the paper background (an inline SVG noise or a tiny tiled PNG you make, under 10 KB), and drip shapes (inline SVG) hanging from the bottom edge of the dark pass band, echoing the drips on his logo. Cards are flat with a 1px border and a 6px radius. Nothing else is decorated.
Spacing: 8px grid. Section padding 112px desktop, 72px mobile.
Icons: lucide-react, one stroke width. The Instagram icon is an inline SVG from Simple Icons. No emoji, no shield icons.
Motion (only 2 places): the garage door in the hero and the Block Math tool. Everything else gets hover and press states, plus plain CSS scroll reveals inside a prefers-reduced-motion check and a browser-support check. No loading intro, no cursor effects, no scroll-jacking. The headline and the buttons are visible from the first instant and never fade in.
Layout variety: split hero, a full-width dark band for the passes, a two-column tool, three uneven photo steps, a mural band, an accordion. No section repeats the one before it.
What the best pages in this niche do (learned from studying them, in our words):
Prices sit in the first screen. Pages that hide prices behind a click lose people, so ours shows all three in the hero.
Three options, with the one most people should pick marked. No comparison grid with twenty rows.
The pass page and the booking step are one flow. The visitor never has to work out which page to go to next.
Each pass says who it is for in one line, in the owner's voice.
A low-risk first step is always offered. Here that is the $25 Drop-In and the no-fee cancellation.
The newest ones are built server-rendered with real text prices, large condensed type, real photography of the actual room and almost no stock.
Dated patterns to avoid: a sliding banner, a flashing sale strip, purple and pink gradients, booking widgets that load late and push the page around, a pop-up on arrival.
Where they are all weak, and where this page wins: none of them tells a visitor which pass is cheapest for how often they train, and most still hand off to a widget that can fail. Block Math answers the first. Server-rendered passes answer the second.
Things only this business has (all required):
The garage door rolling up over his real photo 01.
His wordmark as he draws it, with the full stop, and drips under the pass band.
"No GTFO fee ever. I mean it." in his words, on the Unlimited card.
The nine real blocks from 4:00am to 10:00pm, with "8 spots per block".
"Leave the first spot open on nice days" in the parking note.
Evan's own note about his old garage gym, signed.
The skull mural, from photo 05.
4. Page structure (one page: the purchase page)
This demo is a single page at /. It stands in for his /buy page. There is no /contact page and no other route except a real 404.
Nav (sticky, slim, paper): black wordmark left, linking to the top. Anchors: "Passes", "How it works", "Q and A". Right: "Member log-in" (text link to the real log-in page) and the "Book a Block" button. Mobile: wordmark, the button, and a burger that opens a full-screen sheet with large tap targets. A sticky bottom bar on phones only, hidden while the hero buttons are on screen: [Email Evan] [Book a Block]. The bar must never cover whatever has keyboard focus.
1. Hero (make this the best section on the page):
Desktop: split. Left column: text. Right column: photo 01 in a tall frame, positioned so the pickup is out of frame. Mobile: text first, photo under it, cropped to about 4:3.
Signature motion, "Door up": the photo starts covered by a panel drawn as a sectional garage door in --color-chalk with four horizontal seams. On load the door rolls up and out of the frame in about 1.1 seconds with an ease-out, uncovering the photo of his real open garage. It plays once. The frame has fixed dimensions, so nothing shifts. With reduced motion the photo is simply shown. The photo is preloaded with the framework's current setting and is the main image for the speed budget, so the door is an overlay on an image that has already loaded, never a delay to it. Fallback: if the door will not look right, use a plain clip-path wipe from bottom to top over the same photo.
Eyebrow: "PRIVATE GYM PASSES · OCEAN CITY, MD"
Headline (Anton, display size): "Pick a pass." then "Book a block." with one sprayed green stroke drawn behind the word "block" as a filled SVG shape with the ink word on top of it.
The eyebrow and the headline together are the page's single <h1>: the eyebrow as a small span, the headline as the large span.
Sub: "Two hours. Eight people max. No class, no instructor. Train exactly how you want."
Buttons: "Book a Block" (spray green fill, ink text) and "See the passes" (ghost, scrolls to section 2).
Under the buttons, the three prices as real text in one row: "25Drop-In"|"69 3-Pack" | "$99 a month Unlimited". Each is a button that opens the Block Builder with that pass selected.
On a 375px screen the first screen shows, in order: nav, eyebrow, headline, sub, the primary button, the price row. The headline and the primary button must both be visible without scrolling.
2. The passes (full-width ink band, white wordmark small at top left, drips along the bottom edge): heading "Three ways in." Three cards on --color-rubber, server-rendered, prices in Anton:
Drop-In. "$25" then "per person". "A one-time 2 hour block for you to Train." Line: "Good for: one workout, or trying the place." Button: "Book a Drop-In".
3-Pack. "$69" then "per person". "For the Weekend Warriors in town." Line: "That is $23 a block." Button: "Get the 3-Pack".
Train Unlimited. "$99" then "a month". "Unlimited access, one flat monthly price." Line: "No GTFO fee ever. I mean it." A small green tag: "Best if you train 5 or more times a month". Button: "Go Unlimited". This card is the visually marked one.
Under the cards, one quiet row: "Bringing someone? Members can add a guest to any block for $25." and "Giving it to someone? Gift cards" (opens the builder on Gift card).
Each button opens the Block Builder with that pass selected. On mobile the cards stack with Unlimited first.
Small line under the band: "Already have a pass? Log in to book." linking to the member log-in.
3. Block Math (the show-stopper): heading "Which pass is cheapest for you?" Desktop: tool on the left, photo 03 tall on the right with the stickers cropped out. Mobile: tool only, photo below it.
One control: "How many times will you train this month?" A real range slider from 1 to 12, default 4, with plus and minus buttons beside it, arrow-key support and value text ("4 times this month").
Three result rows that update as it moves, each showing the total for the month and the cost per block:
Drop-In: 25 times the number.
3-Pack: the cheapest mix of 3-Packs and single Drop-Ins that covers the number (for 4 that is one 3-Pack plus one Drop-In, $94).
Unlimited: $99 flat.
The cheapest row gets the green fill and the tag "Cheapest for you". Check the maths against these: 1 gives Drop-In $25. 3 gives 3-Pack $69. 4 gives 3-Pack mix $94. 5 gives Unlimited $99 (the mix would be $119). 12 gives Unlimited $99 against $300 in Drop-Ins.
One readout sentence under the rows, for example at 6: "Six blocks on Unlimited is $16.50 a block. Drop-Ins would be $150."
Button under the tool: "Book with this pass". It opens the Block Builder with the cheapest pass selected.
When the section first scrolls into view the slider glides once from 1 to 4 over about a second, then stops. With reduced motion it just sits at 4.
It gives its answer straight away. No form in front of it.
Small print: "Prices from trainocmd.com. Tax, if any, is shown at checkout." // DRAFT: confirm tax
Fallback: if the slider fights you on touch, replace it with a row of twelve number buttons. The result rows stay the same.
4. How a block works (3 steps, his words, uneven photo sizes): heading "Snag your spot. Show up. Get it done."
Step 1, photo 04 wide: "Snag your spot." "Days run from 4:00am until 10:00pm, in 2-hour blocks. Eight spots per block. Reserve your time."
Step 2, photo 07 as a small card beside large type: "Show up." "108 142nd St. Unit C, Ocean City, MD 21842. Be there."
Step 3, photo 02 wide: "Get it done." "Brand new equipment, a climbing rope, sleds, portable turf, air bikes, rowers, and bumper plates for when you need to drop it. The garage door opens when the weather is right."
Under the steps, a strip of the nine blocks as chips ("4 to 6am" through "8 to 10pm"). Tapping a chip opens the Block Builder with that time selected.
5. Find the garage (proof he is real, paper background): photo 01 again at medium size, uncropped this time except for the pickup. Beside it: Evan's note in large type, signed "Evan Dittler, Owner". Then the address as text, "Bayside, between Coastal Highway and Sinepuxent Ave.", the parking note in his words, and a "Get directions to Train" link to Google Maps for the address. This section exists because there are no reviews yet, so the room and the owner are the proof.
6. Trainers and the whole space (photo 05 as the background, text on top): "Train your clients here." "A high quality, private, professional space to meet clients without the noise of a big commercial gym. You can also rent the whole space for a group." Button: "Email Evan about rates" (mailto: with the subject "Trainer or group rates at Train"). No prices.
7. Gift cards (paper, photo 06 contained at half width): heading "For the person who has everything but a good gym." Button: "Get a gift card" (opens the builder on Gift card).
8. Q and A (accordion, his real questions, answers kept in his voice and trimmed only for length): Where are you located? Where do I park? What if I need to cancel my membership? Can I bring a friend to my session? Is there an instructor or a class to follow? Does it get crowded in the summer? Can I use chalk? Can I slam weights? Can I rent the whole space? Add one: "What does it cost?" answered with the three prices and the $25 guest add-on. Every answer comes from section 1. Nothing is added.
9. Final band (photo 02, with a flat ink overlay at 70%): "Train here. Get it done." Buttons: "Book a Block" and "Email Evan".
10. Footer (ink, white wordmark): "Your workout. Your space. No crowds." Address, email, hours line "Blocks from 4:00am to 10:00pm", @train_142, Member log-in, Terms of Service and Privacy Policy (link to his existing pages on trainocmd.com). "© 2026 train." On a separate small line: "Concept preview by Lee Enterprises Unlimited." (demo mode only, see section 7)
5. The Block Builder (the conversion engine)
A modal on desktop and a full-screen sheet on phones. Three tap-only steps, a progress bar with "Step 1 of 3", back and next, Esc to close, focus trapped, body scroll locked. Every step carries a quiet row: "Rather ask first? Email Evan."
Pick your pass: Drop-In $25, 3-Pack $69, Train Unlimited $99 a month, Gift card. Pre-selected when the visitor came from a pass card, the hero price row, Block Math or the gift band. For Drop-In and 3-Pack, a people stepper from 1 to 8 ("per person" pricing, // DRAFT: confirm one buyer can pay for several people). For Unlimited, a "Guests on this block" stepper from 0 to 7 at $25 each.
Pick your block: seven day chips starting today, then the nine block times as large buttons. Pre-selected when the visitor tapped a time chip in section 4. One line: "8 spots per block. Live availability is confirmed at checkout." Do not show spot counts or sold-out states, because this page has no live data and invented availability would be a lie. Gift card skips this step.
Review: the pass, the people or guests, the day and block, and the total as plain arithmetic, with "plus tax if any". One button that names the real action: "Continue to secure checkout".
The honest last step. Each pass has a checkoutUrl in lib/business.ts. For now all of them point at https://www.trainocmd.com/buy (// DRAFT: replace with the Mariana Tek product link for each pass). In demo mode the button opens a final panel that says, in plain words: "This is a concept. On the live page this button opens Train's secure checkout with your pass already chosen." Under it: "Open the current checkout" (a real link to the URL above), "Email this request to Train" (a mailto: with the summary prefilled in the body) and "Copy my request". Show no success tick and no "you are booked" message at any point, because nothing has been booked. In live mode the button goes straight to the pass's checkoutUrl.
6. Tech and file rules
Install the current stable releases, print the installed versions, and read the upgrade notes for those major versions before writing code, because your habits may be older than the tools. At the time of writing that means Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS 4.
Known changes: route params and searchParams are Promises and must be awaited. The middleware file is now proxy. next lint is gone, so lint with ESLint directly. Tailwind 4 keeps its tokens in a CSS @theme block, not a JavaScript config file.
Motion: the motion package, imported from motion/react, loaded lazily and used only by the garage door and Block Math.
Server-rendered by default. Only the nav sheet, the garage door, Block Math, the accordion and the Block Builder are client components, and the Block Builder loads when first opened. The passes section must render with JavaScript switched off. That is the whole point of this page, so test it.
One component file per section in components/sections/, plus components/BlockBuilder/ and components/BlockMath/. No file over 500 lines. The price maths lives in lib/pricing.ts with unit tests for the five check values in section 4.
Fully responsive at 375, 768, 1024 and 1440px, with no horizontal scroll.
Accessibility to WCAG 2.2 AA: semantic landmarks, alt text written from the photo map, visible focus rings (ink on paper, spray green on ink), base text 16px, tap targets 44px, zoom never blocked, the slider is a real input type="range" with value text and buttons beside it, and the builder never asks for the same thing twice.
Speed budgets on a production build with the phone profile: main image within 2.5 seconds, layout shift under 0.1, response to taps within 200 milliseconds.
Link preview: Open Graph and Twitter summary_large_image tags and a generated 1200x630 og-image.png: paper background, the black wordmark, the line "Pick a pass. Book a block." and photo 01. Favicon and Apple touch icon from the black wordmark's "t". The link preview is the first thing Evan sees.
A real 404 page that returns a 404 status.
No backend, no database, no API keys, no analytics beyond @vercel/analytics.
7. SEO: built to score 100 at launch
This is a demo, but its SEO is finished. His current purchase page has the title "Buy" and an empty meta description. Target: Lighthouse SEO 100 in live mode, and 90 or higher on Performance, Accessibility and Best Practices. Lighthouse 13 also reports a fifth category, Agentic Browsing, as information only. Print the Lighthouse version you used.
The launch switch. One environment variable drives everything about indexing:
NEXT_PUBLIC_SITE_MODE: demo (the default) or live. NEXT_PUBLIC_SITE_URL: the base URL for every absolute link.
Demo mode: robots meta noindex, nofollow, plus an X-Robots-Tag: noindex, nofollow header on every response (pages, images, files), set in the framework's headers config. app/robots.ts still lets search engines in so they can read the hidden tag, disallows the AI crawlers by name, and lists no sitemap. No sitemap and no llms.txt are served. The concept footer line shows.
Live mode: robots meta index, follow, no header, app/robots.ts lists the sitemap, app/sitemap.ts lists the page, llms.txt is served as Markdown with a top heading and proper links, the concept line is hidden, and the build fails if any DRAFT item or // TODO: swap marker remains.
The deployed demo stays in demo mode. Live mode is only run locally.
Never show crawlers anything different from what visitors see.
Expect SEO of about 69 in demo mode, with "page is hidden from search" the only failing check. That is on purpose.
Words in the right places
Title: Private Gym Passes and Blocks in Ocean City, MD | train.
Meta description: "Buy a pass and book a 2-hour block at train., a private garage gym in Ocean City, MD. Drop-in, 3-pack or unlimited monthly. Eight people max per block."
Exactly one <h1> on the page, server-rendered, holding "private gym passes" and "Ocean City, MD" (see the hero). The logo is never the h1.
The first paragraph under the hero says what Train is and where. Headings step down in order.
Name and address as text in the footer and in "Find the garage", exactly as in section 1.
A self-referencing canonical built from NEXT_PUBLIC_SITE_URL. <html lang="en">. No hreflang.
Every link says where it goes. No bare "learn more", "click here" or "read more". Icon-only links get an aria-label. Links are real links with an href. Anything that opens the Block Builder is a <button>.
Structured data (JSON-LD, server-rendered, must validate)
ExerciseGym with name, URL, logo, image, email, address, geo for the address, and opening hours of 04:00 to 22:00 (marked DRAFT for days).
An OfferCatalog with the three passes as Offer entries at their real prices in USD.
FAQPage markup is optional. Google retired FAQ rich results in May 2026, so add it only if it validates cleanly and matches the visible Q and A word for word.
No aggregateRating and no review markup.
Validate every block (a schema.org validator if reachable, otherwise parse each block and check required properties by hand) and say which you did.
SEO-LAUNCH.md in the repo root: set the two variables in Vercel and redeploy. This page replaces /buy, so list his current addresses (/home, /buy, /schedule, /appointments, /merch, /login, /cart, /terms-of-service, /privacy-policy) and state which stay as they are and that /buy must keep its address or redirect to the new one. Put the Mariana Tek product links into checkoutUrl. Submit the sitemap in Google Search Console and Bing Webmaster Tools. Name the home page as the page the Google Business Profile should link to. Update Google Business Profile, Apple Business, Bing Places and Yelp with the same name and address. Retire the preview address. One honest line for the owner: the page is technically complete, and ranking from here depends mostly on his Google profile, reviews, links and listings.
8. Copy rules (strict)
No em dashes or double hyphens anywhere. Use periods and commas.
Short, plain, confident. Sound like Evan: a guy who built his own garage gym and says "Be there." Cut every sentence that does not earn its place.
No hype words ("revolutionary", "cutting-edge", "seamless", "elevate", "unparalleled", "state of the art"). No fake stats, no member counts, no "#1" claims, no prices beyond section 1.
Never say "booked", "confirmed" or "paid" anywhere, because this page cannot do those things.
Anything you had to assume gets a // DRAFT comment.
9. Build order (follow it, and tick the boxes)
Create implementation_kickstart.md holding this plan, the design tokens and the checklist in section 10. Commit it. Then build one phase at a time. Add npm run check, a script that tests: one h1 on the page, no broken internal links or anchors, no leftover blanks or placeholder text, no em dashes, alt text and dimensions on every image, the email and address on the page matching lib/business.ts, the pricing unit tests, and no DRAFT items in live mode. Run it at the end of every phase and print the result.
After each phase run the dev server, screenshot at 1440px and 375px with Playwright (install its browser first; if it cannot install, say so and check by reading the rendered HTML and CSS), look at the screenshots yourself, fix the three weakest things, then tick the box.
Phase 1: scaffold, tokens, fonts. Render a palette board (swatches, a button, a card, a paragraph, photo 01), look at it and fix anything muddy or harsh. Then nav, hero with the garage door, footer. Polish the hero on mobile first.
Review 1: a fresh subagent that has not seen the build scores the hero screenshots as an award juror would (design 40, usability 30, creativity 20, content 10) and names the three weakest things. Fix them once.
Phase 2: the passes band, then Block Math with lib/pricing.ts and its tests.
Phase 3: how a block works, find the garage, trainers band, gift cards, Q and A, final band.
Phase 4: the Block Builder, every button wired with the right pre-selects, the honest last step, the mobile sticky bar.
Phase 5: everything in section 7, the link preview image, favicon, 404, SEO-LAUNCH.md.
Phase 6: Lighthouse, mobile and desktop, in both modes, always against a production build (next build then next start). First live mode locally with NEXT_PUBLIC_SITE_MODE=live NEXT_PUBLIC_SITE_URL=http://localhost:3000: SEO must be 100 and the other three 90 or higher. Then demo mode: the only failing SEO check may be the hidden-from-search one. Use npx lighthouse (point CHROME_PATH at Playwright's Chromium if needed). Report real numbers. If Lighthouse cannot run, say so and list what you checked by hand. Never estimate a score.
Review 2: a second fresh subagent scores the full page the same way and audits every number, name, claim and price on the built page against section 1. Fix once.
Phase 7: final review against section 10, commit, and leave it ready for a GitHub push and a Vercel import as its own project named train-ocmd-concept.
10. Final review checklist (go through it before you say you are done)
With JavaScript switched off, the three passes and their prices are still on the page.
The hero alone would sell the job. The garage door plays once and the photo behind it is his real garage. On a 375px screen the headline and "Book a Block" are visible without scrolling.
Block Math gives $25, $69, $94, $99 and $99 for 1, 3, 4, 5 and 12, and works with mouse, touch and keyboard.
Every button on the page goes somewhere new. No button links to the page it is on.
Every "Book a Block" opens the Block Builder with the right pre-selects. The last step never claims a booking.
Every item in "Things only this business has" is on the page.
Zero em dashes, zero "--", zero stock or AI images, zero invented facts, no phone number, no reviews, no spot counts.
2 fonts, the token palette only, motion in only 2 sections, no cursor effects or loading intro.
Mobile at 375px: no overflow, burger works, sticky bar works and never covers focus. A keyboard-only pass and a 200% zoom pass both work.
Demo mode serves noindex, nofollow in the tag and the header, with the concept footer line. Live mode serves index, follow, the sitemap and no concept line.
The link preview image and favicon are his.
Lighthouse SEO is 100 in live mode on mobile and desktop, and the other three are 90 or higher.
One h1 with the service and the town. Title and description as written in section 7. JSON-LD validates and claims nothing untrue.
11. When you finish
Print: the local URL, the installed versions, the Lighthouse version and scores for all categories in both modes on mobile and desktop, the response headers of the home page and of one image in demo mode, the last npm run check output, the structured-data validation result, the title, description and h1, and screenshots at 1440 and 375 of the hero, the passes band, Block Math and each Block Builder step. Then list every DRAFT item for the owner: which days the blocks run, tax, whether the 3-Pack expires, paying for several people at once, gift card amounts, the Mariana Tek link for each pass, the social platform for @train_142, and whether he wants a phone number shown.
