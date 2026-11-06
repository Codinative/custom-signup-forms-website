import type { IconName } from "@/components/ui/Icon";
import { LINKS } from "@/lib/site";

/**
 * Codinative apps, in the /apps card order. Copy is verbatim and identical on both /apps
 * artboards. The home "More from Codinative" cards list the apps that are not `current`: desktop
 * shows `description`, phone shows `tagline` (the design uses the same copy as /apps, so there is
 * no separate home description). Names match the footer "More Codinative apps" column.
 * `preview` picks the card's top visual: SIGNUP_SCREENSHOT, SNAPBACK_SCREENSHOT, SOFTBOX_SCREENSHOT, CHECKOUT_PREVIEW or STICKY_BAR_PREVIEW.
 */

export type AppId = "custom-signup-forms" | "custom-shipping-rules" | "sticky-add-to-cart" | "snapback" | "softbox";

export type AppPreview = "screenshot" | "snapbackScreenshot" | "softboxScreenshot" | "checkout" | "stickyBar";

export type AppEntry = {
  id: AppId;
  name: string;
  tagline: string;
  description: string;
  icon: IconName;
  /** The product's own logo (SVG in public/images); shown instead of `icon`. */
  logo?: string;
  features: string[];
  siteUrl: string;
  /** null = not on the BigCommerce marketplace yet; the card shows APP_CARD_COPY.comingSoonLabel. */
  marketplaceUrl: string | null;
  /** No marketplace button or "Coming soon" at all (no listing is known or announced). */
  noMarketplace?: boolean;
  current: boolean;
  preview: AppPreview;
};

export type AppScreenshot = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type CheckoutOption = {
  name: string;
  detail: string;
  price: string;
  selected: boolean;
};

export type CheckoutPreview = {
  label: string;
  options: CheckoutOption[];
};

export type StickyBarPreview = {
  product: string;
  meta: string;
  button: string;
};

// Source: design/Apps.dc.html, MobileApps.dc.html (card tag and buttons).
export const APP_CARD_COPY = {
  currentTag: "You are here",
  siteLabel: "Visit site",
  marketplaceLabel: "Get it on BigCommerce",
  comingSoonLabel: "Coming soon",
} as const;

// Source: design/Apps.dc.html, MobileApps.dc.html; home cards: Main.dc.html, MobileHome.dc.html.
export const APPS: AppEntry[] = [
  {
    id: "custom-signup-forms",
    name: "Custom Signup Forms",
    tagline: "B2B registration and approval",
    description:
      "Custom signup forms, an approval queue, customer groups and branded emails - on every storefront.",
    icon: "file",
    features: ["Visual form builder", "Approve before they can buy", "Multi-storefront on Pro"],
    siteUrl: "/",
    marketplaceUrl: LINKS.marketplace,
    current: true,
    preview: "screenshot",
  },
  {
    id: "custom-shipping-rules",
    name: "Custom Shipping Rules",
    tagline: "Weight-based UPS quotes",
    description:
      "Turns your UPS UAE Domestic contract rates into accurate, weight-based quotes at checkout, priced in AED.",
    icon: "truck",
    features: ["Native BigCommerce shipping provider", "Two UPS delivery tiers", "Markup, fuel surcharge and VAT"],
    siteUrl: LINKS.shippingRules,
    marketplaceUrl: LINKS.shippingRulesListing,
    current: false,
    preview: "checkout",
  },
  {
    id: "sticky-add-to-cart",
    name: "Sticky Add to Cart",
    tagline: "Storefront conversion boost",
    description:
      "A persistent, fully customisable Add to Cart bar on every product page, with variants and quantity built in.",
    icon: "cart",
    features: ["Smart show triggers", "Drag-to-arrange layout", "Built for mobile"],
    siteUrl: LINKS.stickyCart,
    // Not on the BigCommerce marketplace yet: the card shows "Coming soon" instead of the button.
    marketplaceUrl: null,
    current: false,
    preview: "stickyBar",
  },
  {
    // Copy: snapback.codinative.com (feature lines word for word from its home page).
    id: "snapback",
    name: "Snapback",
    tagline: "BigCommerce backup and restore",
    description:
      "Backups and point-in-time restore for BigCommerce: records your catalogue as you work and puts any piece of it back, from one product to the entire store, exactly as it was at any moment in the last year.",
    icon: "shieldCheck",
    logo: LINKS.snapbackLogo,
    features: ["Preview before you revert", "A restore never deletes", "Unlimited restores, every plan"],
    siteUrl: LINKS.snapback,
    marketplaceUrl: null,
    noMarketplace: true,
    current: false,
    preview: "snapbackScreenshot",
  },
  {
    // Copy: owner's wording and softbox-a1e6b.web.app. Use the full name: "softbox" alone is a photographic lighting term.
    id: "softbox",
    name: "Softbox by Codinative",
    tagline: "AI product photography",
    description:
      "AI product photography for BigCommerce and Shopify stores: fits a merchant's own product photos onto a reusable generated model and publishes them back to their product listings.",
    icon: "sparkles",
    logo: LINKS.softboxLogo,
    features: ["The same model on every product", "Fitted from your own product photos", "Published back to your listings"],
    siteUrl: LINKS.softbox,
    marketplaceUrl: null,
    noMarketplace: true,
    current: false,
    preview: "softboxScreenshot",
  },
];

// Source: design v2 AppsV2.dc.html (shot-approve-v2.jpg, 1800×1285) = public/images/approve-v2.png at 2×.
export const SIGNUP_SCREENSHOT: AppScreenshot = {
  src: "/images/approve-v2.png",
  width: 1800,
  height: 1285,
  alt: "Signup request review dialog showing the applicant's submitted fields with Approve, Reject and Request Resubmission buttons",
};

// Source: capture of snapback.codinative.com (2026-11-06).
export const SNAPBACK_SCREENSHOT: AppScreenshot = {
  src: "/images/snapback-site.png",
  width: 800,
  height: 571,
  alt: "Snapback website: the headline Every version of your store, kept, beside the app's Versions screen listing saved versions of a product",
};

// Source: capture of softbox-a1e6b.web.app (2026-11-06), the site that goes live at softbox.codinative.com.
export const SOFTBOX_SCREENSHOT: AppScreenshot = {
  src: "/images/softbox-site.png",
  width: 800,
  height: 571,
  alt: "Softbox website showing a generated model wearing a green T-shirt, with the caption: Then everything you sell, fitted to her, one garment at a time",
};

// Source: design/Apps.dc.html, MobileApps.dc.html (Custom Shipping Rules checkout mock).
export const CHECKOUT_PREVIEW: CheckoutPreview = {
  label: "CHECKOUT · CHOOSE A DELIVERY OPTION",
  options: [
    {
      name: "UPS (Delivery by Close of Business)",
      detail: "Delivered by ~6:00 PM · 2.4 kg",
      price: "AED 80.55",
      selected: true,
    },
    {
      name: "UPS (Delivery by Midday)",
      detail: "Delivered by 12:00 PM · 2.4 kg",
      price: "AED 205.50",
      selected: false,
    },
  ],
};

// Source: design/Apps.dc.html, MobileApps.dc.html (Sticky Add to Cart bar mock; button has the cart icon).
export const STICKY_BAR_PREVIEW: StickyBarPreview = {
  product: "Premium Wireless Headphones",
  meta: "$249.00 · Black",
  button: "Add to Cart",
};
