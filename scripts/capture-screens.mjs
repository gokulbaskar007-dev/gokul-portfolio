import { mkdir } from "node:fs/promises";
import path from "node:path";

const PROJECTS = [
  { slug: "tasks", url: "https://tasks.betadigitalmarketing.in/", preserveCardScreenshot: true },
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

async function captureProject(browser, project, device) {
  const { name, ...options } = device;
  const context = await browser.newContext(options);
  try {
    const page = await context.newPage();
    const response = await page.goto(project.url, { waitUntil: "domcontentloaded", timeout: 60000 });
    if (!response?.ok()) {
      throw new Error(response ? `HTTP ${response.status()}` : "No navigation response");
    }

    // Scroll once to trigger lazy images and scroll animations.
    await page.evaluate(async () => {
      const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      for (let y = 0; y < Math.min(document.documentElement.scrollHeight, 5000); y += 400) {
        window.scrollTo({ top: y, behavior: "instant" });
        await wait(150);
      }
      window.scrollTo({ top: 0, behavior: "instant" });
      await wait(500);
    });
    await page.waitForTimeout(1500);

    const directory = path.join(process.cwd(), "public", "projects", project.slug);
    await mkdir(directory, { recursive: true });
    for (let index = 0; index < SHOTS_PER_DEVICE; index++) {
      const offset = Math.round(index * options.viewport.height * 0.95);
      await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), offset);
      await page.waitForTimeout(1300);
      const isCardScreenshot = name === "desktop" && index === 0 && !project.preserveCardScreenshot;
      const filename = isCardScreenshot ? "screen-1.jpg" : `${name}-${index + 1}.jpg`;
      await page.screenshot({ path: path.join(directory, filename), type: "jpeg", quality: 80 });
    }
  } finally {
    await context.close();
  }
}

async function main() {
  if (!list.length) {
    throw new Error(`Unknown project "${only}". Choose ${PROJECTS.map((project) => project.slug).join(", ")}.`);
  }

  const { chromium } = await import("playwright").catch((error) => {
    if (error.code === "ERR_MODULE_NOT_FOUND" && error.message.includes("'playwright'")) {
      throw new Error("Install the optional screenshot tool with npm install --no-save --package-lock=false playwright.");
    }
    throw error;
  });
  const browser = await chromium.launch({ channel: "chrome" }).catch(() => chromium.launch());
  try {
    for (const project of list) {
      for (const device of DEVICES) {
        process.stdout.write(`📸 ${project.slug} (${device.name}) … `);
        try {
          await captureProject(browser, project, device);
          console.log("saved ✅");
        } catch (error) {
          console.error(`failed ❌ ${error.message}`);
          process.exitCode = 1;
        }
      }
    }
  } finally {
    await browser.close();
  }
}

await main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
