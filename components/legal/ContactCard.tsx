import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Tag";
import { getDoc } from "@/lib/content/docsIndex";
import { LINKS, VENDOR } from "@/lib/site";
import styles from "./ContactCard.module.css";

const host = LINKS.vendor.replace(/^https?:\/\//, "").replace(/\/$/, "");

type ContactRow = { title: string; value: string; icon: IconName; href: string };

const ROWS: ContactRow[] = [
  { title: "Support email", value: LINKS.email, icon: "mail", href: LINKS.support },
  { title: "Main website", value: host, icon: "globe", href: LINKS.vendor },
];

const installation = getDoc("installation");
const userGuide = getDoc("user-guide");

const LINK_BUTTONS: { label: string; href: string; icon: IconName }[] = [
  { label: installation.title, href: installation.href, icon: installation.icon },
  { label: userGuide.title, href: userGuide.href, icon: userGuide.icon },
  { label: `Visit ${host}`, href: LINKS.vendor, icon: "globe" },
];

/**
 * Contact block (not designed): the Apps.dc.html app identity row and partner tag, contact rows as
 * Docs.dc.html cards, then the guide buttons.
 */
export function ContactCard() {
  return (
    <div className={styles.contact}>
      <div className={styles.identity}>
        <div className={styles.org}>
          <span className={styles.tile}>
            <Icon name="building" size={22} strokeWidth={1.9} />
          </span>
          <div className={styles.names}>
            <h2 className={`disp ${styles.name}`}>{VENDOR}</h2>
            <p className={styles.role}>BigCommerce-only development agency</p>
          </div>
        </div>
        <a
          href={LINKS.vendor}
          target="_blank"
          rel="noopener"
          className={styles.badge}
          aria-label={`${VENDOR} - Certified BigCommerce Partner`}
        >
          <Tag tone="navy" icon="shieldCheck" iconSize={15} className={styles.partner}>
            Certified BigCommerce Partner
          </Tag>
        </a>
      </div>

      <ul className={styles.rows}>
        {ROWS.map((row) => {
          const external = row.href.startsWith("http");
          return (
            <li key={row.title}>
              <a
                href={row.href}
                className={styles.card}
                {...(external ? { target: "_blank", rel: "noopener" } : {})}
              >
                <span className={styles.cardIcon}>
                  <Icon name={row.icon} size={21} strokeWidth={1.9} />
                </span>
                <span className={styles.cardBody}>
                  <span className={styles.cardTitle}>{row.title}</span>
                  <span className={styles.cardText}>{row.value}</span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      <div className={styles.links}>
        {LINK_BUTTONS.map((link) => (
          <Button key={link.label} href={link.href} variant="outline" size="sm" icon={link.icon} iconSize={16}>
            {link.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
