import { CHECKOUT_PREVIEW } from "@/lib/content/apps";
import styles from "./CheckoutMock.module.css";

/** Custom Shipping Rules card visual: a checkout delivery step. Decorative; a hidden sentence describes it. */
export function CheckoutMock() {
  const summary = CHECKOUT_PREVIEW.options.map((option) => `${option.name}, ${option.price}`).join("; ");
  return (
    <>
      <p className="srOnly">Checkout preview. {summary}.</p>
      <div className={styles.mock} aria-hidden="true">
        <span className={`mono ${styles.label}`}>{CHECKOUT_PREVIEW.label}</span>
        {CHECKOUT_PREVIEW.options.map((option) => (
          <div key={option.name} className={option.selected ? `${styles.option} ${styles.selected}` : styles.option}>
            <div className={styles.main}>
              <span className={styles.radio} />
              <div className={styles.text}>
                <span className={styles.name}>{option.name}</span>
                <span className={styles.detail}>{option.detail}</span>
              </div>
            </div>
            <span className={styles.price}>{option.price}</span>
          </div>
        ))}
      </div>
    </>
  );
}
