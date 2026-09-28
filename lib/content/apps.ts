import type { IconName } from "@/components/ui/Icon";
import { LINKS } from "@/lib/site";

/**
 * Codinative apps, in the /apps card order. Copy is verbatim and identical on both /apps
 * artboards. The home "More from Codinative" cards list the apps that are not `current`: desktop
 * shows `description`, phone shows `tagline` (the design uses the same copy as /apps, so there is
 * no separate home description). Names match the footer "More Codinative apps" column.
 * `preview` picks the card's top visual: SIGNUP_SCREENSHOT, CHECKOUT_PREVIEW or STICKY_BAR_PREVIEW.
 */

export type AppId = "custom-signup-forms" | "custom-shipping-rules" | "sticky-add-to-cart";

export type AppPreview = "screenshot" | "checkout" | "stickyBar";

export type AppEntry = {
  id: AppId;
  name: string;
  tagline: string;
  description: string;
  icon: IconName;
  features: string[];
  siteUrl: string;
  marketplaceUrl: string;
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
    // TODO(owner): marketplace URL
    marketplaceUrl: LINKS.shippingRules,
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
    // TODO(owner): marketplace URL
    marketplaceUrl: LINKS.stickyCart,
    current: false,
    preview: "stickyBar",
  },
];

// Source: design/Apps.dc.html (shot-approve.jpg; site original public/images/approve.png).
export const SIGNUP_SCREENSHOT: AppScreenshot = {
  src: "/images/approve.png",
  width: 1440,
  height: 900,
  alt: "Signup request review dialog showing the applicant's submitted fields with Approve, Reject and Request Resubmission buttons",
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
