import { Icon } from "@/components/ui/Icon";
import { PartnerBadge } from "@/components/ui/PartnerBadge";
import { PlaceholderBox } from "@/components/ui/PlaceholderBox";
import { MARKETPLACE_RATING, REVIEWS_COPY } from "@/lib/content/reviews";
import { Stars } from "./Stars";
import styles from "./TrustStrip.module.css";

/**
 * Strip under the hero: the official partner badge, the real Marketplace rating (placeholder while
 * there is none), the store count (still a placeholder) and set-up time.
 */
export function TrustStrip() {
  const rating = MARKETPLACE_RATING;
  return (
    <section className={styles.strip}>
      <div className={styles.inner}>
        <PartnerBadge height={64} className="onlyDesktop" />
        <PartnerBadge height={44} className="onlyPhone" />
        {rating ? (
          <>
            <span className={`${styles.item} onlyDesktop`}>
              <Stars rating={rating.average} variant="card" />
              {REVIEWS_COPY.trustRating.desktop(rating.average, rating.count)}
            </span>
            <span className={`${styles.itemPhone} onlyPhone`}>
              <Stars rating={rating.average} variant="card" />
              {REVIEWS_COPY.trustRating.phone(rating.average)}
            </span>
          </>
        ) : (
          <>
            <PlaceholderBox className={`${styles.ph} onlyDesktop`}>[Marketplace rating, e.g. 4.9 / 5]</PlaceholderBox>
            <PlaceholderBox className={`${styles.phPhone} onlyPhone`}>[Marketplace rating]</PlaceholderBox>
          </>
        )}
        <PlaceholderBox className={`${styles.ph} onlyDesktop`}>[Stores using the app]</PlaceholderBox>
        <span className={`${styles.item} onlyDesktop`}>
          <Icon name="clock" size={20} className={styles.icon} /> Live in minutes, no code
        </span>
      </div>
    </section>
  );
}
