import styles from "./Stars.module.css";

/** Filled star from the design (the Icon registry only holds stroke icons). */
const STAR_PATH = "M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.3l-5.8 3.1 1.1-6.5L2.6 9.3l6.5-.9z";

const POSITIONS = [1, 2, 3, 4, 5];

export type StarsProps = {
  /** Out of 5; stars fill to the nearest whole number (4.9 → five). */
  rating: number;
  /** card: 18px stars, gap 3 · summary: 20px stars, gap 4 · both 16px, gap 3 on phone. */
  variant: "card" | "summary";
};

/** Five gold/empty stars, hidden from assistive tech, with the rating as visually hidden text. */
export function Stars({ rating, variant }: StarsProps) {
  const filled = Math.min(5, Math.max(0, Math.round(rating)));
  const size = variant === "summary" ? 20 : 18;
  return (
    <div className={variant === "summary" ? `${styles.stars} ${styles.summary}` : styles.stars}>
      {POSITIONS.map((position) => (
        <svg
          key={position}
          className={position <= filled ? styles.on : styles.off}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d={STAR_PATH} />
        </svg>
      ))}
      <span className="srOnly">{`Rated ${rating} out of 5`}</span>
    </div>
  );
}
