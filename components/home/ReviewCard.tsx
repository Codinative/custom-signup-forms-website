import { Icon } from "@/components/ui/Icon";
import { PlaceholderBox } from "@/components/ui/PlaceholderBox";
import { REVIEWS_COPY, type Review } from "@/lib/content/reviews";
import { Stars } from "./Stars";
import styles from "./ReviewCard.module.css";

export type ReviewCardProps = {
  review: Review;
  /** Design sample content: shows the dashed "Sample review" tag. Real reviews render without it. */
  sample: boolean;
};

/**
 * One glass review card on the navy Reviews band. A published Marketplace review shows its title,
 * and is credited to the Marketplace with its date (the listing shows no reviewer names).
 */
export function ReviewCard({ review, sample }: ReviewCardProps) {
  return (
    <figure className={styles.card}>
      <div className={styles.top}>
        <Stars rating={review.rating} variant="card" />
        {sample ? <PlaceholderBox className={styles.tag}>{REVIEWS_COPY.sampleReviewTag}</PlaceholderBox> : null}
      </div>
      {review.title ? <p className={`disp ${styles.title}`}>{review.title}</p> : null}
      <blockquote className={styles.quote}>{`“${review.quote}”`}</blockquote>
      <figcaption className={styles.author}>
        <span className={styles.avatar} aria-hidden="true">
          {review.initials ?? <Icon name="store" size={18} />}
        </span>
        <span className={styles.who}>
          <span className={styles.name}>{review.name ?? REVIEWS_COPY.marketplaceReview}</span>{" "}
          <span className={styles.store}>{review.store ?? review.date}</span>
        </span>
      </figcaption>
    </figure>
  );
}
