// Text + style diff: matches every visible text element in the design artboard to the
// built page (by text, in order) and reports missing/extra copy, style and geometry drift.
// Usage: node scripts/visual/dom-diff.mjs [page ...] [--widths=1440,390]
// Output: test-results/visual/<page>/<width>/dom-diff.md (+ DOM-SUMMARY.md)
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { PAGES, OUT_DIR, parseArgs, artboardFor } from "./pages.mjs";
import { launch, openDesign, openBuild } from "./browser.mjs";

const STYLE_KEYS = ["font", "size", "weight", "lh", "ls", "color", "tt", "fstyle"];
const MAX_ROWS = 120;

function collect() {
  const norm = (s) => s.replace(/\s+/g, " ").trim();
  const family = (f) =>
    f.split(",")[0].replace(/["']/g, "").trim().replace(/^__(.+?)_(Fallback_)?[0-9a-f]{4,}$/, "$1");
  const texts = [];
  const images = [];
  for (const el of document.body.querySelectorAll("*")) {
    if (["SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE", "HELMET"].includes(el.tagName)) continue;
    const r = el.getBoundingClientRect();
    if (r.width <= 1 || r.height <= 1) continue;
    if (!el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) continue;
    const box = { x: Math.round(r.left + scrollX), y: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height) };
    if (el.tagName === "IMG") {
      const cs = getComputedStyle(el);
      images.push({ src: (el.currentSrc || el.src).split("/").pop().split("?")[0], alt: el.alt, fit: cs.objectFit, pos: cs.objectPosition, ...box });
      continue;
    }
    let own = "";
    for (const n of el.childNodes) if (n.nodeType === 3) own += n.textContent;
    own = norm(own);
    if (!own) continue;
    const cs = getComputedStyle(el);
    texts.push({
      tag: el.tagName.toLowerCase(),
      text: own,
      key: own.toLowerCase(),
      font: family(cs.fontFamily),
      size: cs.fontSize,
      weight: cs.fontWeight,
      lh: cs.lineHeight,
      ls: cs.letterSpacing,
      color: cs.color,
      tt: cs.textTransform,
      fstyle: cs.fontStyle,
      ...box,
    });
  }
  return { texts, images };
}

function match(design, build) {
  const pool = new Map();
  build.forEach((b, i) => pool.set(b.key, [...(pool.get(b.key) ?? []), i]));
  const used = new Set();
  const pairs = [];
  const missing = [];
  for (const d of design) {
    const idx = (pool.get(d.key) ?? []).find((i) => !used.has(i));
    if (idx === undefined) missing.push(d);
    else {
      used.add(idx);
      pairs.push([d, build[idx]]);
    }
  }
  const extra = build.filter((_, i) => !used.has(i));
  return { pairs, missing, extra };
}

function styleDiffs(pairs) {
  const rows = [];
  for (const [d, b] of pairs) {
    const diffs = STYLE_KEYS.filter((k) => d[k] !== b[k]).map((k) => `${k}: ${d[k]} → ${b[k]}`);
    if (Math.abs(d.w - b.w) > 2) diffs.push(`w: ${d.w} → ${b.w}`);
    if (Math.abs(d.h - b.h) > 2) diffs.push(`h: ${d.h} → ${b.h}`);
    if (Math.abs(d.x - b.x) > 2) diffs.push(`x: ${d.x} → ${b.x}`);
    if (diffs.length) rows.push(`- \`${d.text.slice(0, 60)}\` (${d.tag}@y${d.y}) ${diffs.join("; ")}`);
  }
  return rows;
}

// Vertical drift: report only where a NEW offset appears between consecutive elements.
function driftPoints(pairs) {
  const sorted = [...pairs].sort((a, b) => a[0].y - b[0].y);
  const rows = [];
  let prev = 0;
  for (const [d, b] of sorted) {
    const dy = b.y - d.y;
    if (Math.abs(dy - prev) > 2) rows.push(`- y${d.y} \`${d.text.slice(0, 50)}\`: offset ${prev} → ${dy} (introduced ${dy - prev > 0 ? "+" : ""}${dy - prev}px above this)`);
    prev = dy;
  }
  return rows;
}

function imageDiffs(design, build) {
  const rows = [];
  const n = Math.max(design.length, build.length);
  for (let i = 0; i < n; i++) {
    const d = design[i];
    const b = build[i];
    if (!d || !b) {
      rows.push(`- #${i + 1}: ${d ? `design ${d.src} ${d.w}×${d.h} has no build counterpart` : `extra build image ${b.src} ${b.w}×${b.h}`}`);
      continue;
    }
    const issues = [];
    if (Math.abs(d.w - b.w) > 1 || Math.abs(d.h - b.h) > 1) issues.push(`size ${d.w}×${d.h} → ${b.w}×${b.h}`);
    if (Math.abs(d.x - b.x) > 2) issues.push(`x ${d.x} → ${b.x}`);
    if (d.fit !== b.fit || d.pos !== b.pos) issues.push(`fit/pos ${d.fit} ${d.pos} → ${b.fit} ${b.pos}`);
    if (!b.alt) issues.push("build image has empty alt");
    if (issues.length) rows.push(`- #${i + 1} ${d.src} vs ${b.src}: ${issues.join("; ")}`);
  }
  return rows;
}

const section = (title, rows) =>
  `## ${title} (${rows.length})\n${rows.slice(0, MAX_ROWS).join("\n") || "- none"}${rows.length > MAX_ROWS ? `\n- … ${rows.length - MAX_ROWS} more` : ""}\n`;

async function run() {
  const { pages, widths } = parseArgs(process.argv.slice(2));
  const browser = await launch();
  const summary = ["| page | width | missing copy | extra copy | style diffs | drift points | image diffs |", "|---|---|---|---|---|---|---|"];
  for (const key of pages) {
    const def = PAGES[key];
    for (const width of widths) {
      const artboard = artboardFor(def, width);
      if (!artboard) continue;
      const d = await openDesign(browser, artboard, width);
      const b = await openBuild(browser, def.route, width, { openMenu: def.openMenu });
      const design = await d.evaluate(collect);
      const build = await b.evaluate(collect);
      await d.close();
      await b.close();

      const { pairs, missing, extra } = match(design.texts, build.texts);
      const styles = styleDiffs(pairs);
      const drift = driftPoints(pairs);
      const imgs = imageDiffs(design.images, build.images);
      const md = [
        `# DOM diff: ${key} @${width} (design ${artboard}.dc.html vs build ${def.route})\n`,
        section("Copy in design, missing from build", missing.map((t) => `- \`${t.text}\` (${t.tag}@y${t.y})`)),
        section("Copy in build, not in design", extra.map((t) => `- \`${t.text}\` (${t.tag}@y${t.y})`)),
        section("Style/size differences on matched text", styles),
        section("Vertical drift points", drift),
        section("Image differences (DOM order)", imgs),
      ].join("\n");
      const dir = join(OUT_DIR, key, String(width));
      mkdirSync(dir, { recursive: true });
      writeFileSync(join(dir, "dom-diff.md"), md);
      summary.push(`| ${key} | ${width} | ${missing.length} | ${extra.length} | ${styles.length} | ${drift.length} | ${imgs.length} |`);
      console.log(`${key} @${width}: missing ${missing.length}, extra ${extra.length}, style ${styles.length}, drift ${drift.length}, images ${imgs.length}`);
    }
  }
  await browser.close();
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(join(OUT_DIR, "DOM-SUMMARY.md"), summary.join("\n") + "\n");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
