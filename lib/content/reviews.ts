/**
 * Homepage Reviews band (CR-1): design/Main.dc.html and MobileHome.dc.html, "What merchants say.".
 *
 * Honesty rule: REVIEWS and MARKETPLACE_RATING hold real data only, word for word from the
 * BigCommerce Marketplace listing (2 reviews as of 2026-10-01). The design's three reviews and its
 * 4.9 rating are SAMPLE content: used only when there are no real reviews, in local development
 * and preview builds, always tagged "Sample", and never in JSON-LD.
 */

export type Review = {
  rating: 1 | 2 | 3 | 4 | 5;
  /** The review text without surrounding quote marks (the card adds “ ”). */
  quote: string;
  /** Title as published (Marketplace reviews have one). */
  title?: string;
  /** Date as shown on the listing, e.g. "Sep 30, 2026". */
  date?: string;
  /** Reviewer name, store and avatar letters: only when published (the listing shows none). */
  name?: string;
  store?: string;
  initials?: string;
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

// REAL data, word for word from the BigCommerce Marketplace listing (LINKS.marketplace): each
// review's title, date, text and stars as published, and the listing's "5.00 out of 5 stars with
// 2 reviews". Never paraphrase, shorten or invent (the listing shows no reviewer names).
export const REVIEWS: Review[] = [
  {
    rating: 5,
    title: "Finally, a signup form that fits an approval workflow",
    date: "Sep 30, 2026",
    quote:
      "We use it to review account applications before customers get access. Custom fields, file uploads, one-click approve or reject from the admin dashboard, and branded automated emails for every outcome. Built the whole thing in the visual builder with no code, and it reverts to the default signup in one click. Highly recommended.",
  },
  {
    rating: 5,
    title: "Essential for B2B signup approval",
    date: "Sep 30, 2026",
    quote:
      "Our trade signup now asks about business type, services offered, brands used, monthly roll usage and interest in our Approved Installer Programme, all built in the visual builder. Approvals, rejections and correction requests are handled from one dashboard with automatic emails for each outcome, and the cooldown keeps rejected applicants from applying again.",
  },
];
export const MARKETPLACE_RATING: MarketplaceRating | null = { average: 5, count: 2 };

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
  /** Real rating: the review count is part of the caption, so 5.0 is never shown without it. */
  ratingCaptionCount: {
    desktop: (count: number) => `Average of ${count} reviews on the BigCommerce App Marketplace`,
    phone: (count: number) => `Average of ${count} Marketplace reviews`,
  },
  /** Attribution for a published review that shows no reviewer name. */
  marketplaceReview: "App Marketplace review",
  /** Trust strip under the hero (real rating only): the score sits beside the stars, this caption under them. */
  trustCaption: {
    desktop: (count: number) => `${count} reviews · BigCommerce Marketplace`,
    phone: (count: number) => `${count} Marketplace reviews`,
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
