import type { FaqItem } from "./FaqAccordion";
import styles from "./FaqStatic.module.css";

export type FaqStaticProps = {
  items: FaqItem[];
  className?: string;
};

/** Pricing.dc.html "Billing questions": every answer visible, no icons, top border per item. */
export function FaqStatic({ items, className }: FaqStaticProps) {
  return (
    <div className={className}>
      {items.map((item) => (
        <div key={item.q} className={styles.item}>
          <h3 className={styles.question}>{item.q}</h3>
          <p className="body">{item.a}</p>
        </div>
      ))}
    </div>
  );
}
