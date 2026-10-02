import type { MetadataRoute } from "next";

export const dynamic = 'force-static'

const BASE_URL = "https://custom-signup-forms.codinative.com";

const paths = [
  "/",
  "/docs",
  "/docs/installation",
  "/docs/user-guide",
  "/contact",
  "/privacy-policy",
  "/terms-of-service",
];

export default function sitemap(): MetadataRoute.Sitemap {
  // `trailingSlash: true` in next.config.ts means every page is served at
  // "/path/" (and its canonical URL is emitted that way), so the sitemap
  // must list the same trailing-slash URLs.
  return paths.map((path) => ({
    url: `${BASE_URL}${path.endsWith("/") ? path : `${path}/`}`,
  }));
}
