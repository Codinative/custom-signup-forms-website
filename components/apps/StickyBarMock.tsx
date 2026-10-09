import { Icon } from "@/components/ui/Icon";
import { STICKY_BAR_PREVIEW } from "@/lib/content/apps";
import styles from "./StickyBarMock.module.css";

/** Sticky Add to Cart card visual: product skeleton + sticky bar. Decorative; a hidden sentence describes it. */
export function StickyBarMock() {
  const { product, meta, button } = STICKY_BAR_PREVIEW;
  return (
    <>
      <p className="srOnly">
        Sticky bar preview. {product}, {meta}, {button} button.
      </p>
      <div className={styles.mock} aria-hidden="true">
        <div className={styles.product}>
          <div className={styles.thumb} />
          <div className={styles.lines}>
            <span className={styles.line} />
            <span className={styles.line} />
            <span className={styles.line} />
          </div>
        </div>
        <div className={styles.bar}>
          <div className={styles.barText}>
            <span className={styles.barName}>{product}</span>
            <span className={styles.barMeta}>{meta}</span>
          </div>
          <span className={styles.barButton}>
            <Icon name="cart" size={15} />
            {button}
          </span>
        </div>
      </div>
    </>
  );
}
