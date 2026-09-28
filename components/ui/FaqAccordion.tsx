"use client";

import { useId, useState, type ReactNode } from "react";
import { Icon } from "./Icon";
import styles from "./FaqAccordion.module.css";

export type FaqItem = {
  q: string;
  /** Rendered inside a `<p class="body">`: pass text or inline content only. */
  a: ReactNode;
};

export type FaqAccordionProps = {
  items: FaqItem[];
  /** home: Main.dc.html FAQ (17px, 20px icon, bordered list) · compact: MobilePricing.dc.html (15px, 18px icon) */
  variant: "home" | "compact";
  /** Index of the item open on load (home: 0). Several items can be open at once. */
  defaultOpen?: number;
  className?: string;
};

/** WAI-ARIA accordion: h3 > button[aria-expanded][aria-controls] + region per answer. */
export function FaqAccordion({ items, variant, defaultOpen, className }: FaqAccordionProps) {
  const baseId = useId();
  const [open, setOpen] = useState<ReadonlySet<number>>(
    () => new Set(defaultOpen === undefined ? [] : [defaultOpen]),
  );

  const toggle = (index: number) =>
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  const home = variant === "home";

  return (
    <div className={[styles[variant], className].filter(Boolean).join(" ")}>
      {items.map((item, index) => {
        const isOpen = open.has(index);
        const buttonId = `${baseId}-q${index}`;
        const panelId = `${baseId}-a${index}`;
        const icon = <Icon name={isOpen ? "minus" : "plus"} size={home ? 20 : 18} className={styles.icon} />;
        return (
          <div key={item.q} className={styles.item}>
            <h3 className={styles.heading}>
              <button
                type="button"
                id={buttonId}
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
              >
                <span className={styles.question}>{item.q}</span>
                {home ? icon : <span className={styles.iconWrap}>{icon}</span>}
              </button>
            </h3>
            <p
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`body ${styles.answer}`}
              hidden={!isOpen}
            >
              {item.a}
            </p>
          </div>
        );
      })}
    </div>
  );
}
