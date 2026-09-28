import type { Metadata } from "next";
import { APP_NAME, LINKS, SITE_URL, VENDOR } from "@/lib/site";

export type PageSeo = {
  /** Page title; the root template appends " - Custom Signup Forms" unless absoluteTitle. */
  title: string;
  /** 70–160 characters. */
  description: string;
  /** Route path with trailing slash, e.g. "/pricing/". */
  path: string;
  /** Open Graph image slug in public/og/ (defaults to the path, e.g. "docs-api"). */
  og?: string;
  absoluteTitle?: boolean;
  type?: "website" | "article";
};

/** "/" → "home", "/docs/api/" → "docs-api". Mirrors scripts/og/generate.mjs. */
export function ogSlug(path: string) {
  return path.split("/").filter(Boolean).join("-") || "home";
}

export function buildMetadata({ title, description, path, og, absoluteTitle, type = "website" }: PageSeo): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} - ${APP_NAME}`;
  const image = { url: `/og/${og ?? ogSlug(path)}.png`, width: 1200, height: 630, alt: fullTitle };
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { type, url: path, title: fullTitle, description, siteName: APP_NAME, locale: "en_US", images: [image] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image.url] },
  };
}

const publisher = { "@type": "Organization", name: VENDOR, url: LINKS.vendor };

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: VENDOR,
  url: LINKS.vendor,
  email: LINKS.email,
  logo: `${SITE_URL}/images/app-icon.png`,
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: APP_NAME,
  url: `${SITE_URL}/`,
  publisher,
};

export type OfferInput = { name: string; price: number; description: string };

/** Offers come from the plans module; no aggregateRating until a real rating exists. */
export function softwareApplicationLd(offers: OfferInput[], description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: APP_NAME,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web (BigCommerce app)",
    url: `${SITE_URL}/`,
    installUrl: LINKS.marketplace,
    description,
    publisher,
    offers: offers.map((o) => ({
      "@type": "Offer",
      name: o.name,
      price: o.price.toFixed(2),
      priceCurrency: "USD",
      description: o.description,
      url: `${SITE_URL}/pricing/`,
    })),
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: `${SITE_URL}${c.path}` })),
  };
}

export function techArticleLd({ title, description, path }: { title: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description,
    url: `${SITE_URL}${path}`,
    image: `${SITE_URL}/og/${ogSlug(path)}.png`,
    author: publisher,
    publisher,
    about: { "@type": "SoftwareApplication", name: APP_NAME },
  };
}
