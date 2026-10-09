// Route <-> design artboard map used by the visual test scripts.
import { pathToFileURL } from "node:url";
import { join } from "node:path";

export const HANDOFF_DIR =
  process.env.HANDOFF_DIR ??
  "/Users/macbook/Documents/Arham Asjid/apps/Custom Signup Forms/Code/website-redesign-handoff";

export const BASE_URL = process.env.BASE_URL ?? "http://localhost:4173";
export const OUT_DIR = process.env.VISUAL_OUT ?? "test-results/visual";

export const PAGES = {
  home: { route: "/", desktop: "Main", phone: "MobileHome" },
  menu: { route: "/", phone: "MobileMenu", openMenu: true },
  pricing: { route: "/pricing/", desktop: "Pricing", phone: "MobilePricing" },
  "multi-storefront": {
    route: "/multi-storefront/",
    desktop: "MultiStorefront",
    phone: "MobileMultiStorefront",
  },
  docs: { route: "/docs/", desktop: "Docs", phone: "MobileDocs" },
  "docs-api": { route: "/docs/api/", desktop: "ApiDocs", phone: "MobileApiDocs" },
  "release-notes": {
    route: "/release-notes/",
    desktop: "ReleaseNotes",
    phone: "MobileReleaseNotes",
  },
  apps: { route: "/apps/", desktop: "Apps", phone: "MobileApps" },
};

// Pages without their own artboard (kept pages, docs guides): overflow/layout checks only.
export const UNDESIGNED_ROUTES = [
  "/contact/",
  "/privacy-policy/",
  "/terms-of-service/",
  "/docs/installation/",
  "/docs/user-guide/",
  "/docs/multi-storefront/",
  "/docs/plans-and-billing/",
  "/docs/headless/",
  "/docs/email-smtp/",
];

export const ALL_ROUTES = [
  ...new Set([...Object.values(PAGES).map((p) => p.route), ...UNDESIGNED_ROUTES]),
];

export function designUrl(file) {
  return pathToFileURL(join(HANDOFF_DIR, "design", `${file}.dc.html`)).href;
}

export function artboardFor(page, width) {
  return width < 768 ? page.phone : page.desktop;
}

export function parseArgs(argv) {
  const opts = { pages: [], widths: [1440, 390] };
  for (const arg of argv) {
    if (arg.startsWith("--widths=")) opts.widths = arg.slice(9).split(",").map(Number);
    else if (!arg.startsWith("--")) opts.pages.push(arg);
  }
  if (opts.pages.length === 0) opts.pages = Object.keys(PAGES);
  const unknown = opts.pages.filter((p) => !PAGES[p]);
  if (unknown.length) throw new Error(`Unknown page(s): ${unknown.join(", ")}. Known: ${Object.keys(PAGES).join(", ")}`);
  return opts;
}
