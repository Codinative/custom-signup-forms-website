// Side-by-side full-page comparison: design artboard (left) vs built page (right).
// Usage: node scripts/visual/compare.mjs [page ...] [--widths=1440,390]
// Needs the export served on BASE_URL (npm run build && npm run serve).
// Output: test-results/visual/<page>/<width>/{design,build,diff}.png, slice-NN[a|b].png, report.json
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import { PAGES, OUT_DIR, parseArgs, artboardFor } from "./pages.mjs";
import { launch, openDesign, openBuild } from "./browser.mjs";

const SLICE_H = 900;
const GAP = 24;
const MENU_H = 844;

function canvas(width, height) {
  const png = new PNG({ width, height });
  for (let i = 0; i < png.data.length; i += 4) {
    png.data[i] = 255; png.data[i + 1] = 0; png.data[i + 2] = 255; png.data[i + 3] = 255;
  }
  return png;
}

function padTo(src, width, height) {
  const dst = canvas(width, height);
  PNG.bitblt(src, dst, 0, 0, Math.min(src.width, width), Math.min(src.height, height), 0, 0);
  return dst;
}

function region(src, x, y, w, h) {
  const dst = canvas(w, h);
  const cw = Math.max(0, Math.min(w, src.width - x));
  const ch = Math.max(0, Math.min(h, src.height - y));
  if (cw > 0 && ch > 0) PNG.bitblt(src, dst, x, y, cw, ch, 0, 0);
  return dst;
}

function sideBySide(left, right) {
  const out = new PNG({ width: left.width + GAP + right.width, height: Math.max(left.height, right.height) });
  out.data.fill(255);
  PNG.bitblt(left, out, 0, 0, left.width, left.height, 0, 0);
  PNG.bitblt(right, out, 0, 0, right.width, right.height, left.width + GAP, 0);
  return out;
}

function mismatch(a, b) {
  const diff = new PNG({ width: a.width, height: a.height });
  const n = pixelmatch(a.data, b.data, diff.data, a.width, a.height, { threshold: 0.1 });
  return { diff, pct: +((n / (a.width * a.height)) * 100).toFixed(2) };
}

async function capture(page, fullPage) {
  return PNG.sync.read(await page.screenshot({ fullPage }));
}

async function run() {
  const { pages, widths } = parseArgs(process.argv.slice(2));
  const browser = await launch();
  const summary = [];
  for (const key of pages) {
    const def = PAGES[key];
    for (const width of widths) {
      const artboard = artboardFor(def, width);
      if (!artboard) continue;
      const dir = join(OUT_DIR, key, String(width));
      mkdirSync(dir, { recursive: true });

      const d = await openDesign(browser, artboard, width);
      const b = await openBuild(browser, def.route, width, { openMenu: def.openMenu });
      if (def.openMenu) {
        await d.setViewportSize({ width, height: MENU_H });
        await b.setViewportSize({ width, height: MENU_H });
      }
      const design = await capture(d, !def.openMenu);
      const build = await capture(b, !def.openMenu);
      await d.close();
      await b.close();

      const W = Math.max(design.width, build.width);
      const H = Math.max(design.height, build.height);
      const dp = padTo(design, W, H);
      const bp = padTo(build, W, H);
      const all = mismatch(dp, bp);
      writeFileSync(join(dir, "design.png"), PNG.sync.write(design));
      writeFileSync(join(dir, "build.png"), PNG.sync.write(build));
      writeFileSync(join(dir, "diff.png"), PNG.sync.write(all.diff));

      const halves = W >= 1000 ? [["a", 0, Math.ceil(W / 2)], ["b", Math.ceil(W / 2), W - Math.ceil(W / 2)]] : [["", 0, W]];
      const slices = [];
      for (let y = 0, n = 1; y < H; y += SLICE_H, n++) {
        const h = Math.min(SLICE_H, H - y);
        for (const [suffix, x, w] of halves) {
          const left = region(dp, x, y, w, h);
          const right = region(bp, x, y, w, h);
          const name = `slice-${String(n).padStart(2, "0")}${suffix}.png`;
          writeFileSync(join(dir, name), PNG.sync.write(sideBySide(left, right)));
          slices.push({ name, y, x, mismatchPct: mismatch(left, right).pct });
        }
      }
      const report = {
        page: key,
        width,
        artboard,
        route: def.route,
        designHeight: design.height,
        buildHeight: build.height,
        heightDelta: build.height - design.height,
        mismatchPct: all.pct,
        worstSlices: [...slices].sort((a, b2) => b2.mismatchPct - a.mismatchPct).slice(0, 6),
        slices,
      };
      writeFileSync(join(dir, "report.json"), JSON.stringify(report, null, 2));
      summary.push(report);
      console.log(
        `${key} @${width}: design ${design.height}px, build ${build.height}px (Δ${report.heightDelta}), mismatch ${all.pct}%`
      );
    }
  }
  await browser.close();
  const lines = summary.map(
    (r) => `| ${r.page} | ${r.width} | ${r.designHeight} | ${r.buildHeight} | ${r.heightDelta} | ${r.mismatchPct}% | ${r.worstSlices.map((s) => `${s.name} ${s.mismatchPct}%`).join(", ")} |`
  );
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(
    join(OUT_DIR, "SUMMARY.md"),
    ["| page | width | design h | build h | Δh | mismatch | worst slices |", "|---|---|---|---|---|---|---|", ...lines].join("\n") + "\n"
  );
  console.log(`\nWrote ${join(OUT_DIR, "SUMMARY.md")} (left = design, right = build, magenta = no content)`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
