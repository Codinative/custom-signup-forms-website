// Horizontal-overflow sweep over every route from 320 to 1920 px, plus layout
// screenshots at the in-between widths (768, 1024) for review.
// Usage: node scripts/visual/overflow.mjs [--widths=320,390,...] [--shots=768,1024]
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { ALL_ROUTES, OUT_DIR } from "./pages.mjs";
import { launch, openBuild } from "./browser.mjs";

const args = Object.fromEntries(
  process.argv.slice(2).filter((a) => a.startsWith("--")).map((a) => a.slice(2).split("="))
);
const WIDTHS = (args.widths ?? "320,360,390,414,480,600,768,900,1024,1180,1280,1366,1440,1600,1920").split(",").map(Number);
const SHOTS = (args.shots ?? "768,1024").split(",").map(Number);
const ROUTES = args.routes ? args.routes.split(",") : ALL_ROUTES;

function findOffenders() {
  const vw = document.documentElement.clientWidth;
  const clipped = (el) => {
    for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
      const ox = getComputedStyle(p).overflowX;
      if (ox !== "visible") return true;
    }
    return false;
  };
  const describe = (el) =>
    `${el.tagName.toLowerCase()}${el.id ? `#${el.id}` : ""}${el.className && typeof el.className === "string" ? `.${el.className.trim().split(/\s+/).join(".")}` : ""}`;
  const offenders = [];
  for (const el of document.body.querySelectorAll("*")) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.right <= vw + 0.5 || clipped(el)) continue;
    offenders.push(`${describe(el)} right=${Math.round(r.right)} width=${Math.round(r.width)}`);
  }
  return { scrollWidth: document.documentElement.scrollWidth, vw, offenders: offenders.slice(0, 8) };
}

async function run() {
  const browser = await launch();
  const lines = ["# Overflow sweep", "", "| route | width | scrollWidth | offenders |", "|---|---|---|---|"];
  let failures = 0;
  for (const route of ROUTES) {
    for (const width of WIDTHS) {
      const page = await openBuild(browser, route, width);
      const res = await page.evaluate(findOffenders);
      if (res.scrollWidth > res.vw) {
        failures++;
        lines.push(`| ${route} | ${width} | ${res.scrollWidth} | ${res.offenders.join("<br>")} |`);
        console.log(`OVERFLOW ${route} @${width}: ${res.scrollWidth} > ${res.vw}`);
      }
      if (SHOTS.includes(width)) {
        const dir = join(OUT_DIR, "..", "layout", route.replace(/\//g, "_") || "_");
        mkdirSync(dir, { recursive: true });
        await page.screenshot({ path: join(dir, `${width}.png`), fullPage: true });
      }
      await page.close();
    }
  }
  await browser.close();
  if (!failures) lines.push("| all routes | all widths | – | no horizontal overflow |");
  mkdirSync(join(OUT_DIR, ".."), { recursive: true });
  writeFileSync(join(OUT_DIR, "..", "OVERFLOW.md"), lines.join("\n") + "\n");
  console.log(`${failures} overflow case(s). Layout shots in test-results/layout/`);
  process.exit(failures ? 1 : 0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
