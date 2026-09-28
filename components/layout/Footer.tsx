import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import { footerColumns, footerCopy, phoneFooterLinks, type NavLink } from "@/lib/content/navigation";
import { Logo } from "./Logo";
import styles from "./Footer.module.css";

function FooterLink({ link }: { link: NavLink }) {
  if (/^https?:/.test(link.href)) {
    return (
      <a href={link.href} className={styles.link} target="_blank" rel="noopener">
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} className={styles.link}>
      {link.label}
    </Link>
  );
}

/** Site footer: desktop 5-column block (≥768) and phone 2-column block (<768). */
export function Footer() {
  return (
    <footer className={`${styles.footer} onDark`}>
      <div className={`${styles.desktop} onlyDesktop`}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Logo tone="light" height={48} className={styles.logo} />
            <p className={styles.blurb}>{footerCopy.blurb}</p>
            <Tag tone="glassSubtle" icon="shieldCheck" className={styles.partner}>
              {footerCopy.partner}
            </Tag>
          </div>
          {footerColumns.map((column) => (
            <div key={column.title} className={styles.column}>
              <h2 className={`eyebrow ${styles.heading}`}>{column.title}</h2>
              {column.links.map((link) => (
                <FooterLink key={link.label} link={link} />
              ))}
            </div>
          ))}
        </div>
        <div className={styles.bottom}>
          <span>{footerCopy.copyright}</span>
          <span>{footerCopy.builtFor}</span>
        </div>
      </div>
      <div className={`${styles.phone} onlyPhone`}>
        <Logo tone="light" height={38} className={styles.logo} />
        <div className={styles.phoneLinks}>
          {phoneFooterLinks.map((link) => (
            <FooterLink key={link.label} link={link} />
          ))}
        </div>
        <span className={styles.phoneCopy}>{footerCopy.phoneCopyright}</span>
      </div>
    </footer>
  );
}
