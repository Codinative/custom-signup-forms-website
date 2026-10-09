import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FRAME_URL, QUEUE_SHOT } from "./content";
import styles from "./OneQueue.module.css";

/** "One queue": screenshot beside the copy. Desktop only (not on the phone artboard). */
export function OneQueue() {
  return (
    <section className={`${styles.section} onlyDesktop`}>
      <BrowserFrame
        {...QUEUE_SHOT}
        url={FRAME_URL}
        sizes="(max-width: 1023px) calc(100vw - 72px), (max-width: 1279px) calc(52.4vw - 80px), (max-width: 1439px) calc(52.4vw - 140px), 614px"
      />
      <div className={styles.copy}>
        <Eyebrow>One queue</Eyebrow>
        <h2 className={`disp ${styles.title}`}>Know where every applicant came from.</h2>
        <p className={`body ${styles.lead}`}>
          Each request carries its storefront. Filter the queue to one storefront, or switch the whole app to it
          from the bar at the top - the dashboard, emails and settings follow.
        </p>
      </div>
    </section>
  );
}
