import { StepCards, type StepCard } from "@/components/docs/StepCards";
import styles from "./ApiOverview.module.css";

const STEPS: StepCard[] = [
  { title: "Fetch the form", text: "Read the fields, options and theme for a storefront." },
  { title: "Render it natively", text: "Use your own inputs; honour required fields and option values." },
  { title: "Submit the answers", text: "Post them; the request appears in your queue." },
];

/**
 * "Overview": an anchor at the top of the article (the intro) and the three step cards,
 * which the phone design leaves out.
 */
export function ApiOverview() {
  return (
    <>
      <span id="overview" className={styles.anchor} aria-hidden="true" />
      <StepCards steps={STEPS} />
    </>
  );
}
