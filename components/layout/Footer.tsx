import { PartnerBadge } from "@/components/ui/PartnerBadge";
import { footerColumns, footerCopy } from "@/lib/content/navigation";
import { FooterAccordion } from "./FooterAccordion";
import { FooterLink } from "./FooterLink";
import { Logo } from "./Logo";
import styles from "./Footer.module.css";

/**
 * Site footer: desktop 5-column block (≥768) and phone block (<768) with the same link groups as
 * an accordion (one open at a time, eased like the FAQ) and the partner badge centred (owner request, 2026-10-08/09).
 */
export function Footer() {
  return (
    <footer className={`${styles.footer} onDark`}>
      <div className={`${styles.desktop} onlyDesktop`}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Logo tone="light" height={96} className={styles.logo} />
            <p className={styles.blurb}>{footerCopy.blurb}</p>
          </div>
          {footerColumns.map((column) => (
            <div key={column.title} className={styles.column}>
              <h2 className={`eyebrow ${styles.heading}`}>{column.title}</h2>
              {column.links.map((link) => (
                <FooterLink key={link.label} link={link} className={styles.link} />
              ))}
            </div>
          ))}
        </div>
        <div className={styles.bottom}>
          <span>{footerCopy.copyright}</span>
          <PartnerBadge height={48} tone="white" />
        </div>
      </div>
      <div className={`${styles.phone} onlyPhone`}>
        <Logo tone="light" height={56} className={styles.logo} />
        <FooterAccordion groups={footerColumns} linkClassName={styles.link} />
        <div className={styles.phoneBottom}>
          <PartnerBadge height={44} tone="white" />
          <span className={styles.phoneCopy}>{footerCopy.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
