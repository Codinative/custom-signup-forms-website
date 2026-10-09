import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { integrationBand } from "@/lib/content/docsIndex";
import styles from "./IntegrationBand.module.css";

/**
 * "Where does your signup happen?" band. Desktop (Docs.dc.html): heading and three cards whose
 * link is the only anchor. Phone (MobileDocs.dc.html): eyebrow and three whole-card links.
 */
export function IntegrationBand() {
  const { eyebrow, title, cards } = integrationBand;
  return (
    <section className={`${styles.band} onDark`}>
      <div className={`${styles.panel} onlyDesktop`}>
        <div className={styles.heading}>
          <Eyebrow tone="light">{eyebrow}</Eyebrow>
          <h2 className={`disp ${styles.title}`}>{title}</h2>
        </div>
        <div className={styles.grid}>
          {cards.map((card) => (
            <div key={card.href} className={styles.card}>
              <span className={styles.icon}>
                <Icon name={card.icon} size={24} strokeWidth={1.8} />
              </span>
              <span className={styles.cardTitle}>{card.title}</span>
              <p className={styles.text}>{card.description}</p>
              <Link href={card.href} className={styles.link}>
                {card.linkLabel}
                <Icon name="arrowRight" size={15} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.phonePanel} onlyPhone`}>
        <Eyebrow tone="light">{eyebrow}</Eyebrow>
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className={styles.phoneCard}>
            <span className={styles.phoneIcon}>
              <Icon name={card.icon} size={22} strokeWidth={1.8} />
            </span>
            <span className={styles.phoneText}>
              <span className={styles.phoneTitle}>{card.title}</span>{" "}
              <span className={styles.phoneLink}>{card.phoneLinkLabel}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
