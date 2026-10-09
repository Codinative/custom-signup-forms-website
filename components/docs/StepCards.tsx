import styles from "./StepCards.module.css";

export type StepCard = { title: string; text: string };

export type StepCardsProps = {
  steps: StepCard[];
  /** Design: hidden on phone. Pass false to stack the cards in one column instead (not designed). */
  hideOnPhone?: boolean;
  className?: string;
};

/** ApiDocs.dc.html numbered cards (1 Fetch the form · 2 Render it natively · 3 Submit the answers). */
export function StepCards({ steps, hideOnPhone = true, className }: StepCardsProps) {
  const classes = [styles.steps, hideOnPhone ? styles.hideOnPhone : styles.stackOnPhone, className];
  return (
    <ol className={classes.filter(Boolean).join(" ")}>
      {steps.map((step, i) => (
        <li key={step.title} className={styles.card}>
          <span className={`mono ${styles.num}`}>{i + 1}</span>
          <span className={styles.title}>{step.title}</span>
          <span className={styles.text}>{step.text}</span>
        </li>
      ))}
    </ol>
  );
}
