"use client";

import { useId, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import type { FooterColumn } from "@/lib/content/navigation";
import { FooterLink } from "./FooterLink";
import styles from "./FooterAccordion.module.css";

export type FooterAccordionProps = {
  groups: FooterColumn[];
  /** Class for each link, so they match the desktop footer links. */
  linkClassName?: string;
};

/**
 * Phone footer link groups (owner request, 2026-10-09): one group open at a time, easing open and
 * closed like the FAQ. Closed panels stay in the page for search engines but are inert.
 */
export function FooterAccordion({ groups, linkClassName }: FooterAccordionProps) {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className={styles.groups}>
      {groups.map((group, index) => {
        const isOpen = open === index;
        const buttonId = `${baseId}-g${index}`;
        const panelId = `${baseId}-p${index}`;
        return (
          <div key={group.title} className={styles.group}>
            <h2 className={styles.heading}>
              <button
                type="button"
                id={buttonId}
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
              >
                <span className={`mono ${styles.title}`}>{group.title}</span>
                <Icon name="chevronRight" size={18} className={styles.chevron} />
              </button>
            </h2>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={styles.panel}
              data-open={isOpen ? "" : undefined}
              inert={!isOpen}
            >
              <div className={styles.panelInner}>
                <div className={styles.links}>
                  {group.links.map((link) => (
                    <FooterLink key={link.label} link={link} className={linkClassName} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
