import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Tag, type TagTone } from "@/components/ui/Tag";
import type { DocsEntry, DocsTag } from "@/lib/content/docsIndex";
import styles from "./DocsCard.module.css";

/** Updated = #dbeafe/#1e40af, New = #dcfce7/#166534 (Docs.dc.html). */
const TAG_TONE: Record<DocsTag, TagTone> = { Updated: "improved", New: "new", "Coming soon": "soon" };

export type DocsCardProps = {
  entry: DocsEntry;
  /** Placement from the grid. */
  className?: string;
};

/** One docs index card (Docs.dc.html / MobileDocs.dc.html): the whole card is the link, except for a doc that
 * isn't published yet, which is a plain, muted card with its "Coming soon" tag. */
export function DocsCard({ entry, className }: DocsCardProps) {
  const classes = [styles.card, entry.unpublished ? styles.unpublished : undefined, className].filter(Boolean).join(" ");
  const content = (
    <>
      <span className={styles.icon}>
        <Icon name={entry.icon} size={21} strokeWidth={1.9} />
      </span>
      {/* The spaces keep the link's accessible name readable; flex layout ignores them */}
      <span className={styles.body}>
        <span className={styles.titleRow}>
          <span className={styles.title}>{entry.title}</span>
          {entry.tag ? (
            <>
              {" "}
              <Tag tone={TAG_TONE[entry.tag]}>{entry.tag}</Tag>
            </>
          ) : null}
        </span>{" "}
        <span className={styles.text}>{entry.description}</span>
      </span>
    </>
  );
  if (entry.unpublished) return <div className={classes}>{content}</div>;
  return (
    <Link href={entry.href} className={classes}>
      {content}
    </Link>
  );
}
