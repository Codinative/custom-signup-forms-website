import { PlaceholderBox } from "@/components/ui/PlaceholderBox";
import { REVIEWS_COPY, type MarketplaceRating } from "@/lib/content/reviews";
import { Stars } from "./Stars";
import styles from "./RatingSummary.module.css";

export type RatingSummaryProps = {
  rating: MarketplaceRating;
  /** Design sample rating: shows the dashed "Sample rating" tag. A real rating renders without it. */
  sample: boolean;
};

/** Average rating card in the Reviews band header. */
export function RatingSummary({ rating, sample }: RatingSummaryProps) {
  return (
    <div className={styles.summary}>
      <span className={`disp ${styles.value}`}>{rating.average.toFixed(1)}</span>
      <div className={styles.meta}>
        <Stars rating={rating.average} variant="summary" />
        <span className={`${styles.caption} onlyDesktop`}>{REVIEWS_COPY.ratingCaption.desktop}</span>
        <span className={`${styles.captionPhone} onlyPhone`}>{REVIEWS_COPY.ratingCaption.phone}</span>
        {sample ? <PlaceholderBox className={styles.tag}>{REVIEWS_COPY.sampleRatingTag}</PlaceholderBox> : null}
      </div>
    </div>
  );
}
