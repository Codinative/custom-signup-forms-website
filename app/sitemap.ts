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
  return paths.map((path) => ({
    url: path === "/" ? `${BASE_URL}/` : `${BASE_URL}${path}`,
  }));
}
