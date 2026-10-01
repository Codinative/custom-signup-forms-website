import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { headerCtas, headerLinks, type NavKey } from "@/lib/content/navigation";
import { APP_NAME } from "@/lib/site";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { StickyHeader } from "./StickyHeader";
import styles from "./SiteHeader.module.css";

export type { NavKey };

export type SiteHeaderProps = {
  /**
   * dark: transparent and fixed over the page's dark hero, which reserves var(--header-h) at its
   * top; turns navy once the page scrolls. light: sticky white bar with a bottom border.
   */
  variant: "dark" | "light";
  /** Header link shown as the current page (aria-current="page"). */
  active?: NavKey;
};

export function SiteHeader({ variant, active }: SiteHeaderProps) {
  const dark = variant === "dark";
  return (
    <StickyHeader className={[styles.header, dark ? `${styles.dark} onDark` : styles.light].join(" ")}>
      <div className={styles.inner}>
        <Link href="/" aria-label={`${APP_NAME} home`} className={styles.logoLink}>
          <Logo tone={dark ? "light" : "dark"} height={60} className={styles.logo} eager />
        </Link>
        <nav aria-label="Main" className={styles.nav}>
          {headerLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={styles.link}
              aria-current={link.key === active ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className={styles.ctas}>
          <Button href={headerCtas.install.href} variant={dark ? "white" : "primary"} className={styles.cta}>
            {headerCtas.install.label}
          </Button>
        </div>
        <MobileMenu variant={variant} />
      </div>
    </StickyHeader>
  );
}
