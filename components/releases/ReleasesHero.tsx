import { Eyebrow } from "@/components/ui/Eyebrow";
import { Tag } from "@/components/ui/Tag";
import { CHANGE_LABELS, releaseAnchor, type ChangeType, type Release } from "@/lib/content/releases";
import { VersionJump } from "./VersionJump";
import styles from "./ReleasesHero.module.css";

/** Tag legend on the desktop hero (the Security tag is not in it). */
const LEGEND: ChangeType[] = ["new", "improved", "fixed"];

export type ReleasesHeroProps = {
  /** Newest first; feeds the phone "Jump to version" options. */
  releases: Release[];
};

/** Page hero: desktop lede and tag legend; the phone has its own shorter lede and the version jump. */
export function ReleasesHero({ releases }: ReleasesHeroProps) {
  const versions = releases.map((release) => ({
    anchor: releaseAnchor(release.version),
    label: `v${release.version}`,
  }));
  return (
    <section className={styles.hero}>
      <div className={styles.text}>
        <Eyebrow>Release notes</Eyebrow>
        <h1 className={`disp ${styles.title}`}>What&apos;s new in Custom Signup Forms.</h1>
        <p className="lede onlyDesktop">
          Every change that affects your store, in plain words. Updates reach every install automatically - there is
          nothing to reinstall.
        </p>
        <p className="body onlyPhone">Updates reach every install automatically.</p>
        <VersionJump label="Jump to version" options={versions} className="onlyPhone" />
      </div>
      <div className={`${styles.legend} onlyDesktop`} aria-hidden="true">
        {LEGEND.map((type) => (
          <Tag key={type} tone={type} className={styles.legendTag}>
            {CHANGE_LABELS[type]}
          </Tag>
        ))}
      </div>
    </section>
  );
}
