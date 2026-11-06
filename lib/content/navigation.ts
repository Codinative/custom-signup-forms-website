import { LINKS } from "@/lib/site";

/** Header link keys; pages pass one as `active` to SiteHeader. */
export type NavKey = "features" | "multi-storefront" | "pricing" | "docs" | "release-notes";

/** Internal hrefs keep the trailing slash; http(s) hrefs open in a new tab. */
export type NavLink = { label: string; href: string };

export type HeaderLink = NavLink & { key: NavKey };

export type FooterColumn = { title: string; links: NavLink[] };

/** Desktop header nav (5). */
export const headerLinks: HeaderLink[] = [
  { key: "features", label: "Features", href: "/#features" },
  { key: "multi-storefront", label: "Multi-storefront", href: "/multi-storefront/" },
  { key: "pricing", label: "Pricing", href: "/pricing/" },
  { key: "docs", label: "Docs", href: "/docs/" },
  { key: "release-notes", label: "Release notes", href: "/release-notes/" },
];

/** Desktop header button (no "Open the app": the app opens from the BigCommerce control panel). */
export const headerCtas: { install: NavLink } = {
  install: { label: "Install free", href: LINKS.marketplace },
};

/** Phone menu sheet rows (7). */
export const menuLinks: NavLink[] = [
  { label: "Features", href: "/#features" },
  { label: "Multi-storefront", href: "/multi-storefront/" },
  { label: "Pricing", href: "/pricing/" },
  { label: "Docs", href: "/docs/" },
  { label: "Release notes", href: "/release-notes/" },
  { label: "More apps", href: "/apps/" },
  { label: "Contact", href: "/contact/" },
];

/** Phone menu sheet button. */
export const menuCtas: { install: NavLink } = {
  install: { label: "Install free on BigCommerce", href: LINKS.marketplace },
};

/** Footer link columns (4). */
export const footerColumns: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Multi-storefront", href: "/multi-storefront/" },
      { label: "Pricing", href: "/pricing/" },
      { label: "Release notes", href: "/release-notes/" },
    ],
  },
  {
    title: "Docs",
    links: [
      { label: "Installation Guide", href: "/docs/installation/" },
      { label: "User Guide", href: "/docs/user-guide/" },
      { label: "Multi-storefront Guide", href: "/docs/multi-storefront/" },
      { label: "Headless and API", href: "/docs/headless/" },
      { label: "Plans and Billing", href: "/docs/plans-and-billing/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact", href: "/contact/" },
      { label: "Codinative", href: LINKS.vendor },
      { label: "Privacy policy", href: "/privacy-policy/" },
      { label: "Terms of service", href: "/terms-of-service/" },
    ],
  },
  {
    title: "More Codinative apps",
    links: [
      // Listing, not the site: both sister-app sites returned Vercel 402 DEPLOYMENT_DISABLED on 2026-11-06, and Sticky Add to Cart has no listing yet.
      { label: "Custom Shipping Rules", href: LINKS.shippingRulesListing },
      { label: "All apps", href: "/apps/" },
    ],
  },
];

/** Footer "Also from Codinative" row: sibling products, factual descriptions only. */
export const footerAlsoFrom = {
  title: "Also from Codinative",
  products: [
    {
      name: "Softbox by Codinative",
      href: LINKS.softbox,
      logo: LINKS.softboxLogo,
      description:
        "AI product photography for BigCommerce and Shopify stores: fits a merchant's own product photos onto a reusable generated model and publishes them back to their product listings.",
    },
    {
      name: "Snapback",
      href: LINKS.snapback,
      logo: LINKS.snapbackLogo,
      description:
        "Backups and point-in-time restore for BigCommerce: records your catalogue as you work and puts any piece of it back, from one product to the entire store, exactly as it was at any moment in the last year.",
    },
  ],
};

/** Footer brand column, contact row and small print copy. */
export const footerCopy = {
  blurb: "Custom signup forms and approvals for BigCommerce. One app for every storefront you run.",
  contactQuestion: "Stuck on a form?",
  contactAnswer: "Talk to us.",
  contactCta: "Contact us",
  disclaimer:
    "Custom Signup Forms is built by Codinative. What each plan includes is listed in full on the Pricing page. Other names and marks are the property of their owners.",
  copyright: "© 2026 Codinative. All rights reserved.",
};
