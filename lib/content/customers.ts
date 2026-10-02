/**
 * Stores that use Custom Signup Forms, for the logo band under the hero.
 * Owner-supplied logos only, shown with each store's permission; never invent one (the band is hidden
 * while the list is empty). Files are the stores' own logos from their BigCommerce CDN (white and gold,
 * made for dark headers), trimmed of transparent edges.
 */
export type CustomerLogo = {
  /** Store name, used as the logo's alt text. */
  name: string;
  /** `/images/customer-<store>.png` (transparent) or an SVG. */
  src: string;
  /** Intrinsic size of the file. */
  width: number;
  height: number;
  /** Rendered height in px on desktop (phones use 85%), set per logo so its smallest text stays readable. */
  displayHeight: number;
};

export const CUSTOMER_LOGOS: CustomerLogo[] = [
  { name: "Samsung Interior Film UK", src: "/images/customer-samsung-interior-film-uk.png", width: 574, height: 255, displayHeight: 84 },
  { name: "Teckwrap UAE", src: "/images/customer-teckwrap-uae.png", width: 2118, height: 405, displayHeight: 52 },
];

export const CUSTOMERS_COPY = {
  label: "Used by BigCommerce stores like",
} as const;
