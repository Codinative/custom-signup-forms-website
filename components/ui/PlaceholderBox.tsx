import type { ReactNode } from "react";
import styles from "./PlaceholderBox.module.css";

export type PlaceholderBoxProps = {
  children: ReactNode;
  as?: "span" | "div";
  /** Padding, font size and layout come from the design at each use. */
  className?: string;
};

/** Open fact still waiting on the owner (rating, store count, dates, app domain…). Never replace with invented values. */
export function PlaceholderBox({ children, as: As = "span", className }: PlaceholderBoxProps) {
  return <As className={[styles.ph, className].filter(Boolean).join(" ")}>{children}</As>;
}
