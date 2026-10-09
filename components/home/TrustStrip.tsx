import { PartnerBadge } from "@/components/ui/PartnerBadge";
import { PlaceholderBox } from "@/components/ui/PlaceholderBox";
import { MARKETPLACE_RATING, REVIEWS_COPY } from "@/lib/content/reviews";
import { Stars } from "./Stars";
import styles from "./TrustStrip.module.css";

/**
 * Strip under the customer logos (owner request, 2026-10-02: less text): the official partner badge and the
 * real Marketplace rating.
 */
export function TrustStrip() {
  const rating = MARKETPLACE_RATING;
  return (
    <section className={styles.strip}>
      <div className={styles.inner}>
        <div className={styles.proof}>
          <PartnerBadge height={56} className="onlyDesktop" />
          <PartnerBadge height={44} className="onlyPhone" />
          <span className={styles.divider} aria-hidden="true" />
          {rating ? (
            <span className={styles.rating}>
              <span className={styles.score}>
                <Stars rating={rating.average} variant="card" />
                <strong>{rating.average.toFixed(1)}</strong>
              </span>
              <span className={`${styles.caption} onlyDesktop`}>{REVIEWS_COPY.trustCaption.desktop(rating.count)}</span>
              <span className={`${styles.caption} onlyPhone`}>{REVIEWS_COPY.trustCaption.phone(rating.count)}</span>
            </span>
          ) : (
            <PlaceholderBox className={styles.ph}>[Marketplace rating]</PlaceholderBox>
          )}
        </div>
      </div>
    </section>
  );
}
