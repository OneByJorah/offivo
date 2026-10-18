---
name: screenshot-capture
description: Capture real, safe screenshots of a running project with Playwright for the README. Use when a repo needs screenshots or a demo GIF.
---

# screenshot-capture

## Rules

- Screenshots must be real: taken from the running app, never mockups.
- Demo data only. Run with `DEMO_MODE=true` and seeded fake data. Never real hostnames, IPs, usernames, emails, school, or client names.
- The capture script scans page text for private IPs, tailnet IPs, emails, and forbidden words, and refuses to save on a match. Add project-specific patterns with `SCRUB_PATTERNS`.

## Steps

1. Start the stack: `docker compose up -d --build`. Wait for `/healthz`.
2. Edit the `PAGES` list in `scripts/screenshots.mjs`: one entry per meaningful screen (dashboard, main workflow, settings).
3. `npm install --no-save playwright && npx playwright install chromium`
4. `node scripts/screenshots.mjs` (set `RECORD=1` for a short `demo.gif`, needs ffmpeg).
5. Open the images and look at each one. Check for real data, empty states, and error messages.
6. Optimize PNGs: `optipng -o2 docs/screenshots/*.png`.
7. Stop the stack: `docker compose down -v`.

## Output

`docs/screenshots/<name>.png` at 1440x900 @2x, dark color scheme, matching the J1 design language. Reference them in the README with alt text.
