import type { ReactNode } from "react";
import { docsGroups } from "@/lib/content/docsIndex";
import { DocsCard } from "./DocsCard";
import styles from "./DocsGroups.module.css";

export type DocsGroupsProps = {
  /** Rendered after the groups, inside the same section (the "Still stuck?" box). */
  children?: ReactNode;
};

/** Docs index groups: Get started · Storefronts and integrations · Reference. */
export function DocsGroups({ children }: DocsGroupsProps) {
  return (
    <section className={styles.section}>
      {docsGroups.map((group) => (
        <div key={group.id} className={styles.group}>
          <h2 className={`disp ${styles.title}`}>{group.title}</h2>
          <ul className={styles.grid}>
            {group.entries.map((entry) => (
              <li key={entry.slug} className={styles.item}>
                <DocsCard entry={entry} className={styles.card} />
              </li>
            ))}
          </ul>
        </div>
      ))}
      {children}
    </section>
  );
}
