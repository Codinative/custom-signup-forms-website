import type { Release } from "@/lib/content/releases";
import { ReleaseEntry } from "./ReleaseEntry";
import { VersionRail } from "./VersionRail";
import styles from "./ReleasesBody.module.css";

export type ReleasesBodyProps = {
  /** Newest first; the first release is the latest. */
  releases: Release[];
};

/** Versions rail beside the release articles (240px | 1fr); the phone shows the articles only. */
export function ReleasesBody({ releases }: ReleasesBodyProps) {
  return (
    <section className={styles.section}>
      <VersionRail releases={releases} className="onlyDesktop" />
      <div>
        {releases.map((release, index) => (
          <ReleaseEntry key={release.version} release={release} latest={index === 0} />
        ))}
      </div>
    </section>
  );
}
