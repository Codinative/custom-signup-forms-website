import { AI_ASSISTANTS, AI_COMPARE_COPY } from "@/lib/content/aiCompare";
import { APP_NAME } from "@/lib/site";
import { AiMark } from "./AiMarks";
import styles from "./AiCompare.module.css";

/** Footer closing invitation (owner request, 2026-11-06, same as the Snapback footer): each icon opens an assistant with the comparison prompt filled in. */
export function AiCompare() {
  return (
    <div className={styles.compare}>
      <h2 className={`disp ${styles.title}`}>{AI_COMPARE_COPY.title}</h2>
      <p className={styles.sub}>{AI_COMPARE_COPY.sub}</p>
      <ul className={styles.list}>
        {AI_ASSISTANTS.map(({ id, name, href }) => (
          <li key={id}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={`Ask ${name} about ${APP_NAME}`}
              aria-label={`Ask ${name} to compare ${APP_NAME} with the alternatives`}
              className={styles.link}
            >
              <AiMark id={id} className={styles.mark} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
