// Takes real desktop + mobile screenshots of your live projects
// and saves them to public/projects/<slug>/desktop-1..3.jpg and mobile-1..3.jpg
//
// Run from the project folder:
//   npm i -D playwright
//   node scripts/capture-screens.mjs            (all projects)
//   node scripts/capture-screens.mjs tasks      (only one project, by slug)
//
// Uses your installed Google Chrome. If that fails, run once: npx playwright install chromium

import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const PROJECTS = [
  { slug: "tasks", url: "https://tasks.betadigitalmarketing.in/" },
  { slug: "betadigitalmarketing-in", url: "https://betadigitalmarketing.in/" },
  { slug: "ipecsolutions", url: "https://ipecsolutions.com/" },
  { slug: "betadigitalmarketing-com", url: "https://betadigitalmarketing.com/" },
  { slug: "networkerschamp", url: "https://networkerschamp.com/" },
];

const DEVICES = [
  { name: "desktop", viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, isMobile: false },
  {
    name: "mobile",
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  },
];

const SHOTS_PER_DEVICE = 3; // top of page, 1 screen down, 2 screens down
const only = process.argv[2];
const list = only ? PROJECTS.filter((p) => p.slug === only) : PROJECTS;

const browser = await chromium.launch({ channel: "chrome" }).catch(() => chromium.launch());

for (const p of list) {
  const dir = path.join(process.cwd(), "public", "projects", p.slug);
  await mkdir(dir, { recursive: true });

  for (const d of DEVICES) {
    const { name, ...opts } = d;
    const ctx = await browser.newContext(opts);
    const page = await ctx.newPage();
    process.stdout.write(`📸 ${p.slug} (${name}) ... `);
    try {
      await page.goto(p.url, { waitUntil: "networkidle", timeout: 60000 }).catch(() => {});
      // scroll once so lazy images + scroll animations load
      await page.evaluate(async () => {
        const wait = (ms) => new Promise((r) => setTimeout(r, ms));
        for (let y = 0; y < Math.min(document.documentElement.scrollHeight, 5000); y += 400) {
          window.scrollTo({ top: y, behavior: "instant" });
          await wait(150);
        }
        window.scrollTo({ top: 0, behavior: "instant" });
        await wait(500);
      });
      await page.waitForTimeout(1500);

      const vh = opts.viewport.height;
      for (let i = 0; i < SHOTS_PER_DEVICE; i++) {
        await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), Math.round(i * vh * 0.95));
        await page.waitForTimeout(1300);
        await page.screenshot({ path: path.join(dir, `${name}-${i + 1}.jpg`), type: "jpeg", quality: 80 });
      }
      console.log("done ✅");
    } catch (e) {
      console.log("failed ❌", e.message);
    }
    await ctx.close();
  }
}

await browser.close();
console.log("\nSaved to public/projects/");
