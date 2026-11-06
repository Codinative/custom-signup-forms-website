import Image from "next/image";
import Link from "next/link";
import { PartnerBadge } from "@/components/ui/PartnerBadge";
import { footerAlsoFrom, footerColumns, footerCopy } from "@/lib/content/navigation";
import { LINKS } from "@/lib/site";
import { AiCompare } from "./AiCompare";
import { FooterLink } from "./FooterLink";
import { Logo } from "./Logo";
import styles from "./Footer.module.css";

/**
 * Site footer (owner request, 2026-11-06: same layout as the Snapback footer): a light card on a dark
 * band holding the brand, link columns, contact row and small print, then the AI comparison and the logo.
 * One layout at every width. The AI comparison waits behind the card and is uncovered as the card scrolls up (owner request). The partner badge and copyright have no Snapback equivalent and are kept from the old footer.
 */
export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.card}>
          <nav className={styles.alsoFrom} aria-label={footerAlsoFrom.title}>
            <p className={styles.heading}>{footerAlsoFrom.title}</p>
            <ul className={styles.alsoFromList}>
              {footerAlsoFrom.products.map((product) => (
                <li key={product.name} className={styles.alsoFromItem}>
                  <Image src={product.logo} alt="" width={32} height={32} unoptimized className={styles.alsoFromLogo} />
                  <div>
                    <a href={product.href} className={styles.alsoFromName} target="_blank" rel="noopener">
                      {product.name}
                    </a>
                    <p className={styles.alsoFromText}>{product.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.top}>
            <div className={styles.brand}>
              <Logo tone="dark" height={72} className={styles.logo} />
              <p className={styles.blurb}>{footerCopy.blurb}</p>
              <PartnerBadge height={56} className={styles.badge} />
            </div>
            <div className={styles.columns}>
              {footerColumns.map((column) => (
                <nav key={column.title} aria-label={column.title}>
                  <p className={styles.heading}>{column.title}</p>
                  <ul className={styles.links}>
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <FooterLink link={link} className={styles.link} />
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>

          <div className={styles.contact}>
            <h2 className={`disp ${styles.contactTitle}`}>
              <span>{footerCopy.contactQuestion}</span>
              <span>{footerCopy.contactAnswer}</span>
            </h2>
            <div className={styles.buttons}>
              <Link href="/contact/" className={styles.primary}>
                {footerCopy.contactCta}
              </Link>
              <a href={`mailto:${LINKS.email}`} className={styles.outline}>
                {LINKS.email}
              </a>
            </div>
          </div>

          <p className={styles.small}>{footerCopy.disclaimer}</p>
          <p className={styles.copyright}>{footerCopy.copyright}</p>
        </div>
      </div>

      {/* Direct child of the footer: sticky can then hold it behind the card until the card scrolls off it */}
      <div className={`${styles.reveal} onDark`}>
        <AiCompare />
      </div>
      <div className={styles.closingMark}>
        <Logo tone="light" height={150} className={styles.closingLogo} />
      </div>
    </footer>
  );
}
