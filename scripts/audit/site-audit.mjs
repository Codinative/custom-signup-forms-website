// SEO + accessibility + link audit of the served static export.
// Reads the route list from out/sitemap.xml, loads each page and checks metadata,
// headings, landmarks, alt text, JSON-LD and that every internal link resolves.
// Usage: node scripts/audit/site-audit.mjs   (needs `npm run serve` running)
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:4173";
const ORIGIN = "https://custom-signup-forms.codinative.com";
const sitemap = readFileSync("out/sitemap.xml", "utf8");
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(ORIGIN, "") || "/");

function inspect() {
  const meta = (sel) => document.querySelector(sel)?.getAttribute("content") ?? null;
  const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => Number(h.tagName[1]));
  const skips = headings.filter((lvl, i) => i > 0 && lvl - headings[i - 1] > 1).length;
  const jsonLd = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => {
    try {
      const j = JSON.parse(s.textContent);
      return j["@type"] ?? (j["@graph"] ? "graph" : "unknown");
    } catch {
      return "INVALID";
    }
  });
  const unnamed = [...document.querySelectorAll("button, a[href], [role=button], input, select, textarea")].filter(
    (el) => !(el.getAttribute("aria-label") || el.textContent.trim() || el.getAttribute("title") || el.labels?.length || el.getAttribute("aria-labelledby"))
  ).length;
  const ids = [...document.querySelectorAll("[id]")].map((e) => e.id);
  return {
    lang: document.documentElement.lang,
    title: document.title,
    description: meta('meta[name="description"]'),
    canonical: document.querySelector('link[rel="canonical"]')?.href ?? null,
    ogTitle: meta('meta[property="og:title"]'),
    ogImage: meta('meta[property="og:image"]'),
    ogUrl: meta('meta[property="og:url"]'),
    twitter: meta('meta[name="twitter:card"]'),
    h1: [...document.querySelectorAll("h1")].map((h) => h.textContent.trim()),
    headingSkips: skips,
    landmarks: ["header", "nav", "main", "footer"].filter((t) => document.querySelector(t)),
    imgNoAlt: [...document.querySelectorAll("img")].filter((i) => !i.hasAttribute("alt")).map((i) => i.src.split("/").pop()),
    unnamedControls: unnamed,
    duplicateIds: ids.filter((id, i) => ids.indexOf(id) !== i),
    jsonLd,
    internalLinks: [...new Set([...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")).filter((h) => h.startsWith("/") && !h.startsWith("//")))],
  };
}

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const out = ["# Site audit", "", `Routes from sitemap: ${routes.length}`, ""];
  const allLinks = new Set();
  const titles = new Map();
  for (const route of routes) {
    await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
    const r = await page.evaluate(inspect);
    r.internalLinks.forEach((l) => allLinks.add(l.split("#")[0] || "/"));
    titles.set(r.title, [...(titles.get(r.title) ?? []), route]);
    const problems = [];
    if (r.lang !== "en") problems.push(`lang="${r.lang}"`);
    if (!r.title || r.title.length > 65) problems.push(`title length ${r.title?.length ?? 0}`);
    if (!r.description || r.description.length < 70 || r.description.length > 160) problems.push(`description length ${r.description?.length ?? 0}`);
    if (!r.canonical?.startsWith(ORIGIN)) problems.push(`canonical ${r.canonical}`);
    if (!r.ogTitle || !r.ogImage || !r.ogUrl) problems.push("missing og:title/og:image/og:url");
    if (!r.twitter) problems.push("missing twitter:card");
    if (r.h1.length !== 1) problems.push(`${r.h1.length} h1`);
    if (r.headingSkips) problems.push(`${r.headingSkips} heading level skip(s)`);
    if (r.landmarks.length < 4) problems.push(`landmarks: ${r.landmarks.join(",")}`);
    if (r.imgNoAlt.length) problems.push(`img without alt: ${r.imgNoAlt.join(", ")}`);
    if (r.unnamedControls) problems.push(`${r.unnamedControls} control(s) without accessible name`);
    if (r.duplicateIds.length) problems.push(`duplicate ids: ${r.duplicateIds.join(", ")}`);
    if (r.jsonLd.includes("INVALID")) problems.push("invalid JSON-LD");
    out.push(`## ${route}`, `- title: ${r.title}`, `- h1: ${r.h1.join(" | ")}`, `- JSON-LD: ${r.jsonLd.join(", ") || "none"}`);
    out.push(problems.length ? problems.map((p) => `- ❌ ${p}`).join("\n") : "- ✅ no issues", "");
  }
  const broken = [];
  for (const link of allLinks) {
    const res = await fetch(`${BASE}${link}`, { redirect: "follow" });
    if (!res.ok) broken.push(`${link} → ${res.status}`);
  }
  const dupTitles = [...titles].filter(([, r]) => r.length > 1).map(([t, r]) => `${t}: ${r.join(", ")}`);
  out.push("## Internal links", broken.length ? broken.map((b) => `- ❌ ${b}`).join("\n") : `- ✅ ${allLinks.size} unique internal links resolve`, "");
  out.push("## Duplicate titles", dupTitles.length ? dupTitles.map((d) => `- ❌ ${d}`).join("\n") : "- ✅ none", "");
  await browser.close();
  mkdirSync("test-results", { recursive: true });
  writeFileSync("test-results/SITE-AUDIT.md", out.join("\n"));
  console.log(`Audited ${routes.length} routes, ${broken.length} broken internal link(s). Report: test-results/SITE-AUDIT.md`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
