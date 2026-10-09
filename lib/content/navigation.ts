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

/** Desktop footer link columns (4). */
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
      { label: "Installation guide", href: "/docs/installation/" },
      { label: "User guide", href: "/docs/user-guide/" },
      { label: "Multi-storefront guide", href: "/docs/multi-storefront/" },
      { label: "Headless and API", href: "/docs/headless/" },
      { label: "Plans and billing", href: "/docs/plans-and-billing/" },
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
      { label: "Custom Shipping Rules", href: LINKS.shippingRules },
      { label: "Sticky Add to Cart", href: LINKS.stickyCart },
      { label: "All apps", href: "/apps/" },
    ],
  },
];

/** Footer brand column and bottom bar copy. */
export const footerCopy = {
  blurb: "Custom signup forms and approvals for BigCommerce. One app for every storefront you run.",
  copyright: "© 2026 Codinative. All rights reserved.",
};
