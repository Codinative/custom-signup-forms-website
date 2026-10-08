// Renders the per-page Open Graph images (1200×630) into public/og/<slug>.png.
// Not designed in the handoff: the card reuses the design tokens (hero gradient, 56px grid,
// light logo, Poppins/JetBrains Mono). Titles are the page H1s / docs descriptions.
// Usage: npm run og   (needs network for Google Fonts; commit the PNGs)
import { mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright";

const PAGES = [
  { path: "/", eyebrow: "BigCommerce app", title: "Your signup form and your approval, on every storefront." },
  { path: "/pricing/", eyebrow: "Pricing", title: "Start free. Pay when you need emails, groups or more storefronts." },
  { path: "/multi-storefront/", eyebrow: "Multi-storefront", title: "A different signup form on every storefront." },
  { path: "/docs/", eyebrow: "Documentation", title: "Everything to set up and run your signup flow." },
  { path: "/docs/installation/", eyebrow: "Docs · Installation guide", title: "Requirements, permissions and the steps from install to a live form." },
  { path: "/docs/user-guide/", eyebrow: "Docs · User guide", title: "The builder, approvals, emails, customer groups and settings." },
  { path: "/docs/plans-and-billing/", eyebrow: "Docs · Plans and billing", title: "What each plan includes, trials, changing plans and what happens if a payment fails." },
  { path: "/docs/multi-storefront/", eyebrow: "Docs · Multi-storefront guide", title: "Turn it on, set up a storefront, override settings, switch it on." },
  { path: "/docs/headless/", eyebrow: "Docs · Headless storefronts", title: "Embed the form in Catalyst, Next.js, Nuxt or any web storefront with two lines." },
  { path: "/docs/api/", eyebrow: "Docs · API integration", title: "Native mobile apps, kiosks and your own backend: fetch the form and submit signups over HTTPS." },
  { path: "/docs/email-smtp/", eyebrow: "Docs · Email and SMTP setup", title: "Connect your mail provider and send a test." },
  { path: "/release-notes/", eyebrow: "Release notes", title: "What's new in Custom Signup Forms." },
  { path: "/apps/", eyebrow: "More apps", title: "Apps for BigCommerce, built by one certified partner." },
  { path: "/contact/", eyebrow: "Contact", title: "Get in touch." },
  { path: "/privacy-policy/", eyebrow: "Legal", title: "Privacy Policy" },
  { path: "/terms-of-service/", eyebrow: "Legal", title: "Terms of Service" },
];

const slug = (path) => path.split("/").filter(Boolean).join("-") || "home";
const logo = `data:image/png;base64,${readFileSync("public/images/logo-light.png").toString("base64")}`;
const escape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

const html = ({ eyebrow, title }) => `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600&family=JetBrains+Mono:wght@600&family=Poppins:wght@700&display=block">
<style>
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;overflow:hidden;font-family:Inter,sans-serif;color:#fff;
  background:linear-gradient(180deg,#1e40af 0%,#1e3a8a 58%,#172554 100%);position:relative}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:56px 56px}
.in{position:relative;height:100%;padding:64px 80px;display:flex;flex-direction:column}
img{height:64px;width:auto;display:block;align-self:flex-start}
.eyebrow{margin-top:auto;font-family:"JetBrains Mono",monospace;font-size:20px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#93c5fd}
h1{margin-top:18px;font-family:Poppins,sans-serif;font-weight:700;letter-spacing:-0.02em;line-height:1.08;text-wrap:balance;max-width:1000px}
.foot{margin-top:40px;display:flex;justify-content:space-between;font-size:20px;font-weight:500;color:#bfdbfe;border-top:1px solid rgba(255,255,255,.14);padding-top:24px}
</style></head><body><div class="grid"></div><div class="in">
<img src="${logo}" alt="">
<div class="eyebrow">${escape(eyebrow)}</div>
<h1 style="font-size:${title.length > 70 ? 50 : title.length > 45 ? 58 : 66}px">${escape(title)}</h1>
<div class="foot"><span>customsignupforms.codinative.com</span><span>BigCommerce app by Codinative</span></div>
</div></body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
mkdirSync("public/og", { recursive: true });
for (const entry of PAGES) {
  await page.setContent(html(entry), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const file = join("public/og", `${slug(entry.path)}.png`);
  await page.screenshot({ path: file, type: "png" });
  console.log(`og: ${file}`);
}
await browser.close();
