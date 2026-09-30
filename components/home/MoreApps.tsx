import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { APPS } from "@/lib/content/apps";
import styles from "./MoreApps.module.css";

const OTHER_APPS = APPS.filter((app) => !app.current);

/** "More from Codinative": the other apps (desktop description, phone tagline). */
export function MoreApps() {
  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <div className={styles.headText}>
          <Eyebrow>More from Codinative</Eyebrow>
          <h2 className={`disp ${styles.title} onlyDesktop`}>Other apps for your BigCommerce store</h2>
        </div>
        <Link href="/apps/" className={`${styles.all} onlyDesktop`}>
          See all apps <Icon name="arrowRight" size={16} />
        </Link>
      </div>
      <div className={styles.cards}>
        {OTHER_APPS.map((app) => (
          <a key={app.id} href={app.siteUrl} target="_blank" rel="noopener" className={styles.card}>
            <div className={styles.iconBox}>
              <Icon name={app.icon} size={22} strokeWidth={1.9} />
            </div>
            <div className={styles.cardText}>
              <span className={styles.name}>{app.name}</span>
              <span className={`${styles.desc} onlyDesktop`}>{app.description}</span>
              <span className={`${styles.tagline} onlyPhone`}>{app.tagline}</span>
            </div>
            <span className={`${styles.arrow} onlyDesktop`}>
              <Icon name="arrowRight" size={18} />
            </span>
          </a>
        ))}
      </div>
      <Link href="/apps/" className={`${styles.allPhone} onlyPhone`}>
        See all apps →
      </Link>
    </section>
  );
}
