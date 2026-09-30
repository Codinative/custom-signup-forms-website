import type { TocItem } from "@/lib/content/docsIndex";
import { DocsToc } from "./DocsToc";
import styles from "./DocsPhoneBar.module.css";

export type DocsPhoneBarProps = {
  /** Left text, e.g. "Docs / API integration". */
  crumb: string;
  toc: TocItem[];
};

/** MobileApiDocs.dc.html bar under the header. Shown below 1280px, where the TOC rail is hidden; the crumb only below 1024px. */
export function DocsPhoneBar({ crumb, toc }: DocsPhoneBarProps) {
  return (
    <div className={styles.bar}>
      <span className={styles.crumb}>{crumb}</span>
      {toc.length > 0 ? (
        <details className={styles.menu}>
          <summary className={styles.summary}>On this page ▾</summary>
          <div className={styles.panel}>
            <DocsToc items={toc} variant="menu" />
          </div>
        </details>
      ) : null}
    </div>
  );
}
