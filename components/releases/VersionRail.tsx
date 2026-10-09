import { Eyebrow } from "@/components/ui/Eyebrow";
import { RELEASE_COPY, releaseAnchor, type Release } from "@/lib/content/releases";
import { ReleaseDate } from "./ReleaseDate";
import styles from "./VersionRail.module.css";

export type VersionRailProps = {
  /** Newest first; the first row is the latest release. */
  releases: Release[];
  /** Placement from the page (breakpoint visibility). */
  className?: string;
};

/**
 * Desktop "Versions" rail (the design's <aside>). A <nav> is the landmark, as in the docs sidebar;
 * each row jumps to its release article.
 */
export function VersionRail({ releases, className }: VersionRailProps) {
  return (
    <nav aria-label="Versions" className={[styles.rail, className].filter(Boolean).join(" ")}>
      <Eyebrow tone="muted" className={styles.label}>
        Versions
      </Eyebrow>
      <ul className={styles.list}>
        {releases.map((release, index) => {
          const latest = index === 0;
          return (
            <li key={release.version}>
              <a
                href={`#${releaseAnchor(release.version)}`}
                className={latest ? `${styles.link} ${styles.active}` : styles.link}
              >
                <span className="mono">{`v${release.version}`}</span>
                {latest ? (
                  <span className={styles.date}>{RELEASE_COPY.latest}</span>
                ) : (
                  <ReleaseDate date={release.date} className={styles.date} />
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
