import Image from "next/image";
import type { CSSProperties } from "react";
import { CUSTOMER_LOGOS, CUSTOMERS_COPY } from "@/lib/content/customers";
import styles from "./Customers.module.css";

/**
 * Logo band of stores using the app (owner request, 2026-10-02, after ripeseed.io): a dark band that
 * continues the hero, logos muted until hovered, then in their own colours with a soft glow.
 */
export function Customers() {
  if (CUSTOMER_LOGOS.length === 0) return null;
  return (
    <section className={styles.band} aria-labelledby="customers-label">
      <div className={styles.inner}>
        <p id="customers-label" className={`mono ${styles.label}`}>
          {CUSTOMERS_COPY.label}
        </p>
        <ul className={styles.logos}>
          {CUSTOMER_LOGOS.map((logo) => (
            <li key={logo.name} className={styles.item}>
              <Image
                src={logo.src}
                alt={logo.name}
                width={Math.round((logo.width * logo.displayHeight) / logo.height)}
                height={logo.displayHeight}
                unoptimized
                className={styles.logo}
                style={{ "--logo-h": `${logo.displayHeight}px` } as CSSProperties}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
