import Image from "next/image";
import { PARTNER_BADGE } from "@/lib/site";
import styles from "./PartnerBadge.module.css";

export type PartnerBadgeProps = {
  /** Rendered height in px; the width follows the 161×52 artwork. */
  height: number;
  /** blue: the official artwork, for light surfaces · white: one-colour version for dark surfaces. */
  tone?: "blue" | "white";
  className?: string;
};

/** Codinative's official "Certified BigCommerce Partner" badge (owner-supplied SVG). */
export function PartnerBadge({ height, tone = "blue", className }: PartnerBadgeProps) {
  const width = Math.round((PARTNER_BADGE.width * height) / PARTNER_BADGE.height);
  const src = tone === "white" ? PARTNER_BADGE.srcWhite : PARTNER_BADGE.src;
  return (
    <span className={[styles.badge, className].filter(Boolean).join(" ")}>
      <Image src={src} alt={PARTNER_BADGE.alt} width={width} height={height} unoptimized />
    </span>
  );
}
