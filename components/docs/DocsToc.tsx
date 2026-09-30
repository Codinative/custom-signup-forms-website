"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import type { TocItem } from "@/lib/content/docsIndex";
import styles from "./DocsToc.module.css";

export type DocsTocProps = {
  items: TocItem[];
  /** "rail": desktop right column. "menu": phone "On this page" panel; choosing a link closes its <details>. */
  variant?: "rail" | "menu";
};

/** A section is current once its top passes 30% of the viewport height. */
const LINE = 0.3;

/** "On this page" links; highlights the section in view, starting on the first item. */
export function DocsToc({ items, variant = "rail" }: DocsTocProps) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const navRef = useRef<HTMLElement>(null);

  // Phone "On this page ▾" panel (<details>): Escape closes it and returns focus to the summary;
  // it also closes when focus or a click leaves it.
  useEffect(() => {
    if (variant !== "menu") return;
    const details = navRef.current?.closest("details");
    if (!details) return;
    const summary = details.querySelector("summary");
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !details.open) return;
      details.open = false;
      summary?.focus();
    };
    const onFocusOut = (event: FocusEvent) => {
      if (details.open && !details.contains(event.relatedTarget as Node | null)) details.open = false;
    };
    const onPointerDown = (event: PointerEvent) => {
      if (details.open && !details.contains(event.target as Node)) details.open = false;
    };
    details.addEventListener("keydown", onKeyDown);
    details.addEventListener("focusout", onFocusOut);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      details.removeEventListener("keydown", onKeyDown);
      details.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [variant]);

  useEffect(() => {
    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const update = () => {
      // Sections hidden at this width (e.g. desktop-only on phone) have no boxes; skip them.
      const shown = targets.filter((el) => el.getClientRects().length > 0);
      if (shown.length === 0) return;
      const scrolledToEnd =
        window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      const line = window.innerHeight * LINE;
      let current = shown[0].id;
      if (scrolledToEnd) current = shown[shown.length - 1].id;
      else for (const el of shown) if (el.getBoundingClientRect().top <= line) current = el.id;
      setActiveId(current);
    };

    let frame = 0;
    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.cancelAnimationFrame(frame);
    };
  }, [items]);

  const onNavigate = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    setActiveId(id);
    if (variant === "menu") {
      const details = event.currentTarget.closest("details");
      if (details) details.open = false;
    }
  };

  return (
    <nav ref={navRef} aria-label="On this page">
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
