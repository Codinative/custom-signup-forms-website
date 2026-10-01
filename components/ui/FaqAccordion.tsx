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
  /** Index of the item open on load (home: 0). */
  defaultOpen?: number;
  className?: string;
};

/**
 * WAI-ARIA accordion: h3 > button[aria-expanded][aria-controls] + region per answer.
 * One answer is open at a time and answers ease open and closed (owner request, 2026-10-01).
 * Closed answers stay in the page (for search engines) but are inert, so keyboards and screen
 * readers skip them.
 */
export function FaqAccordion({ items, variant, defaultOpen, className }: FaqAccordionProps) {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(defaultOpen ?? null);

  const home = variant === "home";

  return (
    <div className={[styles[variant], className].filter(Boolean).join(" ")}>
      {items.map((item, index) => {
        const isOpen = open === index;
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
                onClick={() => setOpen(isOpen ? null : index)}
              >
                <span className={styles.question}>{item.q}</span>
                {home ? icon : <span className={styles.iconWrap}>{icon}</span>}
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={styles.panel}
              data-open={isOpen ? "" : undefined}
              inert={!isOpen}
            >
              <div className={styles.panelInner}>
                <p className={`body ${styles.answer}`}>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
