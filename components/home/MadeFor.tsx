import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { AUDIENCES } from "./content";
import styles from "./MadeFor.module.css";

/** "Made for" (desktop artboard only; hidden below 768). */
export function MadeFor() {
  return (
    <section className={`${styles.section} onlyDesktop`}>
      <div className={styles.head}>
        <Eyebrow>Made for</Eyebrow>
        <h2 className={`disp ${styles.title}`}>{'Whenever "just sign up" isn\'t enough.'}</h2>
      </div>
      <div className={styles.grid}>
        {AUDIENCES.map((audience) => (
          <div key={audience.title} className={styles.item}>
            <span className={styles.icon}>
              <Icon name={audience.icon} size={26} strokeWidth={1.75} />
            </span>
            <h3 className={`disp ${styles.itemTitle}`}>{audience.title}</h3>
            <p className="body">{audience.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
