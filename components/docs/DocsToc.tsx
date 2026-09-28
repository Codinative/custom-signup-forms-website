"use client";

import { useEffect, useState, type MouseEvent } from "react";
import type { TocItem } from "@/lib/content/docsIndex";
import styles from "./DocsToc.module.css";

export type DocsTocProps = {
  items: TocItem[];
  /** "rail": desktop right column. "menu": phone "On this page" panel; choosing a link closes its <details>. */
  variant?: "rail" | "menu";
};

/** A section is current once its top passes 30% of the viewport height. */
const LINE = 0.3;
/** Line observer (top 30% of the viewport) plus a whole-viewport observer for fast jumps (Home/End). */
const ROOT_MARGINS = ["0px 0px -70% 0px", "0px"];

/** "On this page" links; highlights the section in view, starting on the first item. */
export function DocsToc({ items, variant = "rail" }: DocsTocProps) {
  const [activeId, setActiveId] = useState(items[0]?.id);

  useEffect(() => {
    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const update = () => {
      const line = window.innerHeight * LINE;
      let current = items[0].id;
      for (const el of targets) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }
      setActiveId(current);
    };

    const observers = ROOT_MARGINS.map((rootMargin) => new IntersectionObserver(update, { rootMargin }));
    observers.forEach((observer) => targets.forEach((el) => observer.observe(el)));
    return () => observers.forEach((observer) => observer.disconnect());
  }, [items]);

  const onNavigate = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    setActiveId(id);
    if (variant === "menu") {
      const details = event.currentTarget.closest("details");
      if (details) details.open = false;
    }
  };

  return (
    <nav aria-label="On this page">
      <ul className={styles.list}>
        {items.map((item) => {
          const current = item.id === activeId;
          return (
            <li key={item.id} className={item.desktopOnly ? "onlyDesktop" : undefined}>
              <a
                href={`#${item.id}`}
                className={current ? `${styles.link} ${styles.active}` : styles.link}
                aria-current={current ? "true" : undefined}
                onClick={onNavigate(item.id)}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
