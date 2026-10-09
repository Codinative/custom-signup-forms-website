"use client";

import { useEffect, useState, type ReactNode } from "react";

export type StickyHeaderProps = {
  className: string;
  children: ReactNode;
};

/**
 * The site `<header>`. It stays on screen while scrolling (sticky / fixed in SiteHeader.module.css)
 * and sets `data-scrolled` once the page has scrolled, so CSS can give it a solid background.
 */
export function StickyHeader({ className, children }: StickyHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header className={className} data-scrolled={scrolled ? "" : undefined}>
      {children}
    </header>
  );
}
