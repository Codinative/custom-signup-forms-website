import type { MetadataRoute } from "next";
import { ROUTES } from "@/lib/content/routes";
import { SITE_URL } from "@/lib/site";

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency,
    priority,
  }));
}
