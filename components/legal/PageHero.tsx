import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import styles from "./PageHero.module.css";

export type PageHeroProps = {
  eyebrow: string;
  /** The page's h1. */
  title: string;
  /** Inline content, rendered in a p.lede (the .body size on phone). */
  lede: ReactNode;
};

/** Hero of the kept pages (contact, legal): the left-aligned ReleaseNotes/Apps hero, not designed on its own. */
export function PageHero({ eyebrow, title, lede }: PageHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className={`disp ${styles.title}`}>{title}</h1>
          <p className={`lede ${styles.lede}`}>{lede}</p>
        </div>
      </div>
    </section>
  );
}
