import type { ReactNode } from "react";
import styles from "./Eyebrow.module.css";

export type EyebrowTone = "blue" | "light" | "muted";

export type EyebrowProps = {
  children: ReactNode;
  /** blue #2563eb (default) · light #93c5fd (footer headings, docs integration band) · muted #64748b (docs sidebar, TOC, versions) */
  tone?: EyebrowTone;
  as?: "p" | "span" | "div";
  /** Spacing from the design (e.g. the docs sidebar's `padding: 0 12px 8px`). */
  className?: string;
};

/** The design's `.eyebrow` label: global utility for the type, module class for the colour. */
export function Eyebrow({ children, tone = "blue", as: As = "span", className }: EyebrowProps) {
  const classes = ["eyebrow", tone === "blue" ? undefined : styles[tone], className].filter(Boolean).join(" ");
  return <As className={classes}>{children}</As>;
}
