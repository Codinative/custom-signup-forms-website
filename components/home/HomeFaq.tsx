import { Eyebrow } from "@/components/ui/Eyebrow";
import { FaqAccordion, type FaqItem } from "@/components/ui/FaqAccordion";
import { PlaceholderBox } from "@/components/ui/PlaceholderBox";
import { homeFaqs } from "@/lib/content/faqs";
import { LINKS } from "@/lib/site";
import styles from "./HomeFaq.module.css";

/** Homepage FAQ (desktop artboard only; hidden below 768). Unanswered items show a placeholder. */
export function HomeFaq() {
  const items: FaqItem[] = homeFaqs.map((faq) => ({
    q: faq.q,
    a: faq.a ?? (
      <PlaceholderBox as="span" className={styles.placeholder}>
        [Answer to be supplied]
      </PlaceholderBox>
    ),
  }));
  return (
    <section className={`${styles.section} onlyDesktop`}>
      <div className={styles.intro}>
        <Eyebrow>FAQ</Eyebrow>
        <h2 className={`disp ${styles.title}`}>Questions, answered.</h2>
        <p className="body">
          Anything else? Email <a href={`mailto:${LINKS.email}`}>{LINKS.email}</a> - we reply within one business day.
        </p>
      </div>
      <FaqAccordion items={items} variant="home" defaultOpen={0} />
    </section>
  );
}
