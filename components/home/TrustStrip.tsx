import { Icon } from "@/components/ui/Icon";
import { PlaceholderBox } from "@/components/ui/PlaceholderBox";
import styles from "./TrustStrip.module.css";

/** Strip under the hero. Rating and store count stay placeholders until the owner supplies them. */
export function TrustStrip() {
  return (
    <section className={styles.strip}>
      <div className={styles.inner}>
        <span className={`${styles.item} onlyDesktop`}>
          <Icon name="shieldCheck" size={20} className={styles.icon} /> BigCommerce certified partner
        </span>
        <span className={`${styles.itemPhone} onlyPhone`}>
          <Icon name="shieldCheck" size={16} className={styles.icon} /> Certified BigCommerce partner
        </span>
        <PlaceholderBox className={`${styles.ph} onlyDesktop`}>[Marketplace rating, e.g. 4.9 / 5]</PlaceholderBox>
        <PlaceholderBox className={`${styles.phPhone} onlyPhone`}>[Marketplace rating]</PlaceholderBox>
        <PlaceholderBox className={`${styles.ph} onlyDesktop`}>[Stores using the app]</PlaceholderBox>
        <span className={`${styles.item} onlyDesktop`}>
          <Icon name="clock" size={20} className={styles.icon} /> Live in minutes, no code
        </span>
      </div>
    </section>
  );
}
