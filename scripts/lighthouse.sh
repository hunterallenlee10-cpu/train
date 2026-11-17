#!/usr/bin/env bash
# Runs Lighthouse 13 (mobile and desktop) against a running production server and prints category scores.
# Usage: scripts/lighthouse.sh <label> [url]
set -euo pipefail
LABEL="${1:-run}"
URL="${2:-http://localhost:3000}"
OUT="reports/lighthouse"
mkdir -p "$OUT"
export CHROME_PATH="${CHROME_PATH:-/opt/pw-browsers/chromium-1243/chrome-linux64/chrome}"
FLAGS="--headless=new --no-sandbox --disable-gpu"
CATS="performance,accessibility,best-practices,seo,agentic-browsing"

# Warm the image optimizer cache once (a deployed CDN serves these from cache). Every srcset variant, AVIF.
curl -s "$URL" | grep -o '/_next/image?[^" ,]*' | sed 's/&amp;/\&/g' | sort -u | while read -r P; do
  curl -s -o /dev/null -H "Accept: image/avif,image/webp,*/*" "$URL$P"
done
echo "Image cache warmed."

for FORM in mobile desktop; do
  EXTRA=""
  if [ "$FORM" = "desktop" ]; then EXTRA="--preset=desktop"; fi
  npx -y lighthouse@13 "$URL" $EXTRA --quiet --chrome-flags="$FLAGS" \
    --output=json --output=html --output-path="$OUT/$LABEL-$FORM" >/dev/null 2>&1 || \
  npx -y lighthouse@13 "$URL" $EXTRA --quiet --chrome-flags="$FLAGS" --only-categories=performance,accessibility,best-practices,seo \
    --output=json --output=html --output-path="$OUT/$LABEL-$FORM"
  node -e '
    const r = require(process.argv[1]);
    const c = Object.values(r.categories).map(x => `${x.title}: ${x.score === null ? "n/a" : Math.round(x.score * 100)}`).join(" | ");
    const a = r.audits;
    const v = (k) => a[k] ? a[k].displayValue : "";
    console.log(`${process.argv[2]} ${process.argv[3]} (Lighthouse ${r.lighthouseVersion}): ${c}`);
    console.log(`   LCP ${v("largest-contentful-paint")}, CLS ${v("cumulative-layout-shift")}, TBT ${v("total-blocking-time")}, FCP ${v("first-contentful-paint")}`);
    const fails = Object.values(a).filter(x => x.score !== null && x.score < 0.9 && ["binary","numeric"].includes(x.scoreDisplayMode)).map(x => x.id);
    if (fails.length) console.log("   below 0.9: " + fails.join(", "));
  ' "$PWD/$OUT/$LABEL-$FORM.report.json" "$LABEL" "$FORM"
done
