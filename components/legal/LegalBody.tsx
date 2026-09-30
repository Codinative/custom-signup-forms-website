import type { ReactNode } from "react";
import styles from "./LegalBody.module.css";

export type LegalBodyProps = {
  /** ProseSections, Callouts or the ContactCard. */
  children: ReactNode;
};

/** One left-aligned column (max-width 760) under PageHero, spaced like the docs article template. */
export function LegalBody({ children }: LegalBodyProps) {
  return (
    <div className={styles.body}>
      <div className={styles.column}>{children}</div>
    </div>
  );
}
