import type { ReactNode } from "react";
import styles from "./Prose.module.css";

export type ProseSectionProps = {
  /** Anchor for the "On this page" links. */
  id?: string;
  /** The section's h2. */
  title?: ReactNode;
  /** First paragraph, rendered as p.body under the h2. */
  intro?: ReactNode;
  className?: string;
  /** Bare p, h3, ul and ol children get the prose styles; Callout, DefinitionRows etc. style themselves. */
  children?: ReactNode;
};

/** One article section (ApiDocs.dc.html): h2 + intro in a heading block (gap 8), then the content (gap 16). */
export function ProseSection({ id, title, intro, className, children }: ProseSectionProps) {
  return (
    <section id={id} className={[styles.section, className].filter(Boolean).join(" ")}>
      {title || intro ? (
        <div className={styles.headingBlock}>
          {title ? <h2 className={`disp ${styles.h2}`}>{title}</h2> : null}
          {intro ? <p className="body">{intro}</p> : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}
