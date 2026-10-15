// Records the real home page riding the Metro section with a smooth programmatic scroll.
// Usage: node record_ride.mjs <outDir> [rideSeconds]
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const outDir = process.argv[2] || "./out";
const rideSeconds = Number(process.argv[3] || 40);
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1600, height: 900 },
  deviceScaleFactor: 1,
  recordVideo: { dir: outDir, size: { width: 1600, height: 900 } },
});
const page = await ctx.newPage();
await page.addInitScript(() => performance.setResourceTimingBufferSize(4000));
await page.goto("http://localhost:3020/?nointro=1&rec=1", { waitUntil: "networkidle" });

// wait until the ride has most frames in memory (resource entries for /train/t_)
try {
  await page.waitForFunction(
    () => performance.getEntriesByType("resource").filter((r) => /\/train\/t_/.test(r.name)).length >= 268,
    null,
    { timeout: 150000 }
  );
} catch { console.log("frame wait timed out, continuing"); }
console.log("frames loaded", await page.evaluate(() => performance.getEntriesByType("resource").filter((r) => /\/train\/t_/.test(r.name)).length));
await page.waitForTimeout(1500);

const geo = await page.evaluate(() => {
  const s = document.querySelector("canvas").closest("section");
  return { top: s.offsetTop, h: s.offsetHeight, vh: innerHeight };
});
const start = geo.top;
const end = geo.top + geo.h - geo.vh;
console.log("ride scroll range", start, end);

// a short lead-in from the hero, then a constant-speed ride, then a hold at the end
await page.evaluate(({ start }) => window.scrollTo(0, Math.max(0, start - 500)), { start });
await page.waitForTimeout(1200);
const t0 = Date.now();
await page.evaluate(
  async ({ start, end, ms }) => {
    const lead = 1800;
    const from = Math.max(0, start - 500);
    await new Promise((res) => {
      const begin = performance.now();
      const ease = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
      function step(now) {
        const t = now - begin;
        let y;
        if (t < lead) y = from + (start - from) * ease(t / lead);
        else y = start + (end - start) * Math.min(1, (t - lead) / ms);
        window.scrollTo(0, y);
        if (t < lead + ms) requestAnimationFrame(step);
        else res();
      }
      requestAnimationFrame(step);
    });
  },
  { start, end, ms: rideSeconds * 1000 }
);
console.log("ride done in", ((Date.now() - t0) / 1000).toFixed(1), "s");
await page.waitForTimeout(2500);
const video = page.video();
await ctx.close();
const p = await video.path();
const dst = path.join(outDir, "ride-raw.webm");
fs.renameSync(p, dst);
await browser.close();
console.log("video", dst);
