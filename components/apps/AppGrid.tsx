import { APPS } from "@/lib/content/apps";
import { AppCard } from "./AppCard";
import styles from "./AppGrid.module.css";

/** The app cards: 3 columns on desktop, 2 at 768–1279, one column on phone. */
export function AppGrid() {
  return (
    <ul className={styles.grid}>
      {APPS.map((app) => (
        <AppCard key={app.id} app={app} />
      ))}
    </ul>
  );
}
