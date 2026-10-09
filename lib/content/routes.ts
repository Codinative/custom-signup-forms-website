/** Every public route (trailing slash, matching canonicals). Feeds app/sitemap.ts. */
export type SiteRoute = {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
};

export const ROUTES: SiteRoute[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/pricing/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/multi-storefront/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/docs/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/docs/installation/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/docs/user-guide/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/docs/plans-and-billing/", priority: 0.6, changeFrequency: "monthly" },
  { path: "/docs/multi-storefront/", priority: 0.6, changeFrequency: "monthly" },
  { path: "/docs/headless/", priority: 0.6, changeFrequency: "monthly" },
  { path: "/docs/api/", priority: 0.6, changeFrequency: "monthly" },
  { path: "/docs/email-smtp/", priority: 0.6, changeFrequency: "monthly" },
  { path: "/release-notes/", priority: 0.6, changeFrequency: "weekly" },
  { path: "/apps/", priority: 0.5, changeFrequency: "monthly" },
  { path: "/contact/", priority: 0.5, changeFrequency: "yearly" },
  { path: "/privacy-policy/", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms-of-service/", priority: 0.3, changeFrequency: "yearly" },
];
