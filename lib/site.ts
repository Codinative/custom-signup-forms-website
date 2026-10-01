/** Single source of truth for site copy + links. */
export const APP_NAME = "Custom Signup Forms";
export const APP_TAGLINE = "Custom signup forms, request approvals & email automation for BigCommerce.";
export const VENDOR = "Codinative";
/** Canonical public origin (no trailing slash) - used for metadata + structured data. */
export const SITE_URL = "https://custom-signup-forms.codinative.com";

/** Official "Certified BigCommerce Partner" badge (owner-supplied SVG, 161×52) and its one-colour
 * white version for dark surfaces (same artwork, blue fill swapped for white). */
export const PARTNER_BADGE = {
  src: "/images/codinative-certified-bigcommerce-partner-badge.svg",
  srcWhite: "/images/codinative-certified-bigcommerce-partner-badge-white.svg",
  width: 161,
  height: 52,
  alt: "Codinative is a Certified BigCommerce Partner",
};

/** Links - update these once the listing + app URLs are final. */
export const LINKS = {
  // BigCommerce marketplace listing (live).
  marketplace: "https://www.bigcommerce.com/apps/custom-signup-forms-by-codinative/",
  // No "Open the app" link: merchants open the app from their BigCommerce control panel.
  vendor: "https://codinative.com/",
  support: "mailto:info@codinative.com?subject=Custom%20Signup%20Forms",
  email: "info@codinative.com",
  // Sister Codinative apps. Sticky Add to Cart has no marketplace listing yet ("Coming soon").
  shippingRules: "https://custom-shipping-rules.codinative.com/",
  shippingRulesListing: "https://www.bigcommerce.com/apps/custom-shipping-rules-by-codinative/",
  stickyCart: "https://sticky-add-to-cart.codinative.com/",
};
