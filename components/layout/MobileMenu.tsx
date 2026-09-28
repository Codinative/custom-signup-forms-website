"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { menuCtas, menuLinks } from "@/lib/content/navigation";
import { Logo } from "./Logo";
import styles from "./MobileMenu.module.css";

export type MobileMenuProps = {
  /** Header variant; styles the trigger button. The sheet is always navy. */
  variant: "dark" | "light";
};

const FOCUSABLE = "a[href], button:not([disabled])";

export function MobileMenu({ variant }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const sheetId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  const close = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    const sheet = sheetRef.current;
    if (!open || !sheet) return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const bodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    sheet.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    // Escape closes; Tab and Shift+Tab cycle inside the sheet.
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close(true);
        return;
      }
      if (event.key !== "Tab") return;
      const items = sheet.querySelectorAll<HTMLElement>(FOCUSABLE);
      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;
      if (event.shiftKey && (current === first || !sheet.contains(current))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (current === last || !sheet.contains(current))) {
        event.preventDefault();
        first.focus();
      }
    };
    // The trigger is hidden from 1024px up, so a widened window closes the sheet.
    const onViewport = () => {
      if (desktop.matches) close(false);
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onViewport);
    return () => {
      document.body.style.overflow = bodyOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onViewport);
    };
  }, [open, close]);

  // Any link in the sheet (a page, a same-page hash such as /#features, or an external site) closes it.
  const onSheetClick = (event: MouseEvent<HTMLDivElement>) => {
    if ((event.target as Element).closest("a")) close(false);
  };

  const menuSheet = (
    <div
      ref={sheetRef}
      id={sheetId}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className={`${styles.sheet} onDark`}
      onClick={onSheetClick}
    >
      <div className={styles.sheetHeader}>
        <Logo tone="light" height={44} className={styles.logo} eager />
        <button type="button" className={styles.close} aria-label="Close menu" onClick={() => close(true)}>
          <Icon name="close" size={22} />
        </button>
      </div>
      <nav aria-label="Main" className={styles.nav}>
        {menuLinks.map((link) => (
          <Link key={link.label} href={link.href} className={`disp ${styles.item}`}>
            {link.label}
            <span className={styles.chevron}>
              <Icon name="chevronRight" size={20} />
            </span>
          </Link>
        ))}
      </nav>
      <div className={styles.actions}>
        <Button href={menuCtas.install.href} variant="white" className={styles.cta}>
          {menuCtas.install.label}
        </Button>
        <Button href={menuCtas.app.href} variant="ghost" className={styles.cta}>
          {menuCtas.app.label}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={`${styles.trigger} ${styles[variant]}`}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls={sheetId}
        onClick={() => setOpen(true)}
      >
        <Icon name="menu" size={22} />
      </button>
      {open ? createPortal(menuSheet, document.body) : null}
    </>
  );
}
