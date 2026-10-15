// Frame-exact capture of the home page ride: one screenshot per ride frame.
// Usage: node record_frames.mjs <outDir> [frameCount]
import { chromium } from "playwright";
import fs from "node:fs";

const outDir = process.argv[2] || "./frames";
const N = Number(process.argv[3] || 272);
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.addInitScript(() => performance.setResourceTimingBufferSize(4000));
await page.goto("http://localhost:3020/?nointro=1&rec=1", { waitUntil: "networkidle" });
try {
  await page.waitForFunction(
    (n) => performance.getEntriesByType("resource").filter((r) => /\/train\/t_/.test(r.name)).length >= n - 4,
    N,
    { timeout: 150000 }
  );
} catch {
  console.log("frame wait timed out, continuing");
}
await page.waitForTimeout(1500);
const geo = await page.evaluate(() => {
  const s = document.querySelector("canvas").closest("section");
  return { top: s.offsetTop, h: s.offsetHeight, vh: innerHeight };
});
const start = geo.top, end = geo.top + geo.h - geo.vh;
console.log("range", start, end);

// lead-in: 24 shots easing from the hero into the ride
for (let k = 0; k < 24; k++) {
  const e = k / 23, ease = e < 0.5 ? 2 * e * e : 1 - Math.pow(-2 * e + 2, 2) / 2;
  await page.evaluate((y) => window.scrollTo(0, y), Math.max(0, start - 520) + 520 * ease);
  await page.waitForTimeout(70);
  await page.screenshot({ path: `${outDir}/lead_${String(k).padStart(3, "0")}.jpg`, type: "jpeg", quality: 90 });
}
await page.evaluate(() => window.dispatchEvent(new Event("wheel")));
for (let i = 0; i < N; i++) {
  const y = start + ((end - start) * i) / (N - 1);
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await page.waitForTimeout(70);
  await page.screenshot({ path: `${outDir}/f_${String(i).padStart(4, "0")}.jpg`, type: "jpeg", quality: 90 });
  if (i % 50 === 0) console.log("frame", i, await page.evaluate(() => document.querySelector(".led-text")?.textContent));
}
await browser.close();
console.log("done");
