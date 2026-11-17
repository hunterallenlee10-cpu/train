#!/usr/bin/env bash
# Build and start a production server on :3000 in the given mode. Usage: scripts/serve-prod.sh demo|live
# Live mode here is for local audits only, so DRAFT markers are allowed through with a warning.
set -euo pipefail
MODE="${1:-demo}"
pkill -f "next-server" 2>/dev/null || true
pkill -f "next start" 2>/dev/null || true
pkill -f "next dev" 2>/dev/null || true
for i in $(seq 1 20); do
  curl -s -o /dev/null localhost:3000 || break
  sleep 0.5
done
export NEXT_PUBLIC_SITE_MODE="$MODE"
export NEXT_PUBLIC_SITE_URL="${NEXT_PUBLIC_SITE_URL:-http://localhost:3000}"
if [ "$MODE" = "live" ]; then export ALLOW_DRAFTS_FOR_LOCAL_AUDIT=1; fi
npm run build > reports/build-$MODE.log 2>&1 || { tail -30 reports/build-$MODE.log; exit 1; }
nohup npx next start -p 3000 > reports/start-$MODE.log 2>&1 &
for i in $(seq 1 40); do
  if curl -s -o /dev/null localhost:3000; then echo "Production server ($MODE) on http://localhost:3000"; exit 0; fi
  sleep 0.5
done
echo "Server did not start"; tail -20 reports/start-$MODE.log; exit 1
