import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { Tag } from "@/components/ui/Tag";
import { RELEASE_COPY, releaseAnchor, type Release } from "@/lib/content/releases";
import { ChangeRow } from "./ChangeRow";
import { ReleaseDate } from "./ReleaseDate";
import styles from "./ReleaseEntry.module.css";

/** Rendered screenshot width: phone gutter 20px; tablet ≤1023 rail 200 + gap 40; ≤1279 and desktop rail 240 + 64, meta 200 + 48. */
const SHOT_SIZES =
  "(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) calc(94vw - 256px), (max-width: 1279px) calc(94vw - 568px), (max-width: 1439px) calc(100vw - 792px), 648px";

export type ReleaseEntryProps = {
  release: Release;
  /** The newest release: "Latest" tag and the larger title. */
  latest: boolean;
};

/** One release article: meta column (version, date, "Latest") and the title, screenshot and change rows. */
export function ReleaseEntry({ release, latest }: ReleaseEntryProps) {
  const anchor = releaseAnchor(release.version);
  const titleId = `${anchor}-title`;
  const shot = release.screenshot;
  return (
    <article id={anchor} aria-labelledby={titleId} className={styles.entry}>
      <div className={styles.meta}>
        <span className={`mono ${styles.version}`}>{`v${release.version}`}</span>
        <ReleaseDate date={release.date} className={styles.date} />
        {latest ? (
          <Tag tone="latest" className={styles.latestTag}>
            {RELEASE_COPY.latest}
          </Tag>
        ) : null}
      </div>
      <div className={styles.content}>
        <h2 id={titleId} className={`disp ${styles.title}${latest ? ` ${styles.titleLatest}` : ""}`}>
          {release.title}
        </h2>
        {shot ? (
          <BrowserFrame
            src={shot.src}
            width={shot.width}
            height={shot.height}
            alt={shot.alt}
            sizes={SHOT_SIZES}
            url={shot.frameUrl}
            priority={latest}
            className={styles.shot}
          />
        ) : null}
        <div>
          {release.changes.map((change) => (
            <ChangeRow key={change.title} change={change} />
          ))}
        </div>
      </div>
    </article>
  );
}
