// Captures real screenshots of the running demo stack with Playwright.
// Usage (stack already running):  BASE_URL=http://127.0.0.1:8080 node scripts/screenshots.mjs
// Requires: npm install --no-save playwright && npx playwright install chromium
//
// Safety: every page is scanned for private IPs, tailnet IPs, emails, and forbidden words
// BEFORE a screenshot is written. If anything matches, the script exits 1 and saves nothing.
// Extra patterns: SCRUB_PATTERNS="mycompany,internal-host" (comma-separated regexes).

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const BASE = process.env.BASE_URL || "http://127.0.0.1:8080";
const OUT = process.env.OUT_DIR || "docs/screenshots";
const RECORD = process.env.RECORD === "1";

// Edit this list per project: one entry per screen worth showing.
const PAGES = [
  { name: "dashboard", path: "/", waitFor: "#app-ready" },
];

const FORBIDDEN = [
  { label: "private IPv4", re: /\b(?:10\.\d{1,3}|192\.168|172\.(?:1[6-9]|2\d|3[01]))\.\d{1,3}\.\d{1,3}\b/ },
  { label: "tailnet IPv4", re: /\b100\.(?:6[4-9]|[7-9]\d|1[01]\d|12[0-7])\.\d{1,3}\.\d{1,3}\b/ },
  { label: "email address", re: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i },
  { label: "school domain", re: /\bk12\.vi\b/i },
  ...(process.env.SCRUB_PATTERNS || "")
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => ({ label: `custom:${p}`, re: new RegExp(p, "i") })),
];

fs.mkdirSync(OUT, { recursive: true });
const videoDir = path.join("tmp", "videos");
if (RECORD) fs.mkdirSync(videoDir, { recursive: true });

// CHROMIUM_PATH: use an existing Chrome/Chromium instead of Playwright's download (handy on a prepared runner).
// NO_SANDBOX=1: needed when running as root inside some containers.
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
  args: process.env.NO_SANDBOX === "1" ? ["--no-sandbox"] : [],
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
  colorScheme: "dark",
  ...(RECORD ? { recordVideo: { dir: videoDir, size: { width: 1280, height: 720 } } } : {}),
});

let failed = false;
for (const p of PAGES) {
  const page = await context.newPage();
  await page.goto(new URL(p.path, BASE).toString(), { waitUntil: "networkidle" });
  if (p.waitFor) await page.waitForSelector(p.waitFor, { timeout: 15000 });

  const text = (await page.evaluate(() => document.body.innerText)) + "\n" + (await page.title());
  const hits = FORBIDDEN.filter((f) => f.re.test(text)).map((f) => f.label);
  if (hits.length) {
    console.error(`SCRUB FAIL on ${p.name}: found ${hits.join(", ")}. No screenshot written.`);
    failed = true;
    await page.close();
    continue;
  }

  const file = path.join(OUT, `${p.name}.png`);
  await page.screenshot({ path: file, fullPage: true });
  console.log(`saved ${file}`);
  await page.close();
}

await context.close();
await browser.close();

if (RECORD && !failed) {
  const vids = fs.readdirSync(videoDir).filter((f) => f.endsWith(".webm")).sort();
  if (vids.length) {
    const src = path.join(videoDir, vids[vids.length - 1]);
    const dst = path.join(OUT, "demo.gif");
    const r = spawnSync(
      "ffmpeg",
      ["-y", "-i", src, "-vf", "fps=10,scale=960:-1:flags=lanczos,split[a][b];[a]palettegen[p];[b][p]paletteuse", dst],
      { stdio: "inherit" },
    );
    if (r.status === 0) console.log(`saved ${dst}`);
  }
}

process.exit(failed ? 1 : 0);
