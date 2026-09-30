import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import prose from "./Prose.module.css";
import styles from "./Callout.module.css";

export type CalloutProps = {
  /** warning: the amber ApiDocs callout. note: the derived neutral note (Prose .note). */
  tone?: "warning" | "note";
  className?: string;
  /** Inline content; it is rendered inside a <p>. */
  children: ReactNode;
};

export function Callout({ tone = "warning", className, children }: CalloutProps) {
  if (tone === "note") {
    return <p className={[prose.note, className].filter(Boolean).join(" ")}>{children}</p>;
  }
  return (
    <div className={[styles.warning, className].filter(Boolean).join(" ")}>
      <span className={styles.icon}>
        <Icon name="alertTriangle" size={18} />
      </span>
      <p className={styles.text}>{children}</p>
    </div>
  );
}
