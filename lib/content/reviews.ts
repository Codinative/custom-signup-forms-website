/**
 * Homepage Reviews band (CR-1): design/Main.dc.html and MobileHome.dc.html, "What merchants say.".
 *
 * Honesty rule: the Marketplace listing has no reviews yet. REVIEWS and MARKETPLACE_RATING hold
 * real data only. The design's three reviews and its 4.9 rating are SAMPLE content: they render
 * only in local development (`npm run dev`) and preview builds (NEXT_PUBLIC_SAMPLE_REVIEWS=1,
 * `npm run build:preview`), always tagged "Sample", and never feed JSON-LD. A live (production)
 * build with no real reviews renders no section at all.
 */

export type Review = {
  rating: 1 | 2 | 3 | 4 | 5;
  /** The review text without surrounding quote marks (the card adds “ ”). */
  quote: string;
  name: string;
  store: string;
  /** Avatar letters, e.g. "PS". */
  initials: string;
};

export type MarketplaceRating = {
  average: number;
  count: number;
};

export type ReviewsContent = {
  reviews: Review[];
  rating: MarketplaceRating | null;
  /** True only for the design's sample content: every card and the rating carry a "Sample" tag. */
  sample: boolean;
};

// REAL data. Fill these word for word from the BigCommerce Marketplace listing (LINKS.marketplace):
// each review's text, star rating, name and store exactly as published, and the listing's average
// rating and review count. Never paraphrase, shorten or invent. Empty = no reviews yet.
export const REVIEWS: Review[] = [];
export const MARKETPLACE_RATING: MarketplaceRating | null = null;

// SAMPLE content, verbatim from the design. Not real reviews: preview builds only, always tagged.
export const SAMPLE_REVIEWS: Review[] = [
  {
    rating: 5,
    quote:
      "We only sell to trade customers, so every signup needs checking. Applications arrive in one queue with the licence attached, and approving puts them straight into our wholesale price group.",
    name: "Priya S.",
    store: "Wholesale home goods",
    initials: "PS",
  },
  {
    rating: 5,
    quote:
      "The form took an afternoon, not a developer. We added conditional fields for resellers and it matched our theme on the first try.",
    name: "Marcus L.",
    store: "Electronics distributor",
    initials: "ML",
  },
  {
    rating: 4,
    quote:
      "We run three storefronts with different signup rules. Each has its own form and emails now, and I review every request from one place.",
    name: "Elena R.",
    store: "Multi-brand retailer",
    initials: "ER",
  },
];

export const SAMPLE_RATING: MarketplaceRating = { average: 4.9, count: 0 };

// Source: design/Main.dc.html (desktop) and MobileHome.dc.html (phone) Reviews section.
export const REVIEWS_COPY = {
  eyebrow: "Reviews",
  title: "What merchants say.",
  intro: {
    desktop: "Reviews from the BigCommerce App Marketplace, quoted word for word.",
    phone: "From the BigCommerce App Marketplace, word for word.",
  },
  ratingCaption: {
    desktop: "Average on the BigCommerce App Marketplace",
    phone: "Average on the Marketplace",
  },
  link: {
    desktop: "Read all reviews on the BigCommerce Marketplace",
    phone: "Read all reviews on the Marketplace",
  },
  sampleReviewTag: "Sample review",
  sampleRatingTag: "Sample rating",
} as const;

/**
 * Real reviews when there are any; otherwise the tagged samples in preview builds only;
 * otherwise null (the homepage renders no Reviews section).
 */
export function getReviewsContent(): ReviewsContent | null {
  if (REVIEWS.length > 0) {
    return { reviews: REVIEWS, rating: MARKETPLACE_RATING, sample: false };
  }
  if (process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_SAMPLE_REVIEWS === "1") {
    return { reviews: SAMPLE_REVIEWS, rating: SAMPLE_RATING, sample: true };
  }
  return null;
}
