import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { getReviewsContent, REVIEWS_COPY } from "@/lib/content/reviews";
import { LINKS } from "@/lib/site";
import { RatingSummary } from "./RatingSummary";
import { ReviewCard } from "./ReviewCard";
import styles from "./Reviews.module.css";

/**
 * Reviews band (Main.dc.html / MobileHome.dc.html). Shows real Marketplace reviews, or the design's
 * tagged samples in preview builds only; with neither it renders nothing (no empty section).
 */
export function Reviews() {
  const content = getReviewsContent();
  if (!content) return null;
  const { reviews, rating, sample } = content;

  return (
    <section className={styles.section} aria-labelledby="reviews-title">
      <div className={`${styles.band} onDark`}>
        <div className={styles.overlay} aria-hidden="true" />
        <div className={styles.inner}>
          <div className={styles.head}>
            <div className={styles.heading}>
              <Eyebrow tone="light">{REVIEWS_COPY.eyebrow}</Eyebrow>
              <h2 id="reviews-title" className={`disp ${styles.title}`}>
                {REVIEWS_COPY.title}
              </h2>
              <p className={`${styles.intro} onlyDesktop`}>{REVIEWS_COPY.intro.desktop}</p>
              <p className={`${styles.introPhone} onlyPhone`}>{REVIEWS_COPY.intro.phone}</p>
            </div>
            {rating ? <RatingSummary rating={rating} sample={sample} /> : null}
          </div>
          <div className={styles.cards}>
            {reviews.map((review) => (
              <ReviewCard key={review.quote} review={review} sample={sample} />
            ))}
          </div>
          <div className={styles.more}>
            <a href={LINKS.marketplace} target="_blank" rel="noopener" className={styles.link}>
              <span className="onlyDesktop">{REVIEWS_COPY.link.desktop}</span>
              <span className="onlyPhone">{REVIEWS_COPY.link.phone}</span>
              <Icon name="arrowRight" size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
