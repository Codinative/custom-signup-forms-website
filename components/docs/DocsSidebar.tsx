import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import { docsSidebar, type DocSlug } from "@/lib/content/docsIndex";
import styles from "./DocsSidebar.module.css";

export type DocsSidebarProps = {
  active: DocSlug;
  /** Placement from the layout (grid column, sticky, breakpoint visibility). */
  className?: string;
};

/**
 * Left nav of the docs article template (ApiDocs.dc.html). The wrapper is a div rather than the design's
 * <aside> so the page has no duplicate unnamed complementary landmarks; the <nav> is the landmark.
 */
export function DocsSidebar({ active, className }: DocsSidebarProps) {
  return (
    <div className={className}>
      <nav aria-label="Docs" className={styles.nav}>
        <span className={`eyebrow ${styles.label}`}>Docs</span>
        <ul className={styles.list}>
          {docsSidebar.map((entry) => {
            const current = entry.slug === active;
            return (
              <li key={entry.slug}>
                <Link
                  href={entry.href}
                  className={current ? `${styles.link} ${styles.active}` : styles.link}
                  aria-current={current ? "page" : undefined}
                >
                  {entry.sidebarLabel ?? entry.title}
                  {entry.tag === "Coming soon" ? (
                    <>
                      {" "}
                      <Tag tone="soon" className={styles.soon}>Soon</Tag>
                    </>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
