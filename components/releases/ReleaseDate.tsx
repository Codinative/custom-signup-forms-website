import { PlaceholderBox } from "@/components/ui/PlaceholderBox";
import { RELEASE_COPY, formatReleaseDate } from "@/lib/content/releases";
import styles from "./ReleaseDate.module.css";

export type ReleaseDateProps = {
  /** ISO yyyy-mm-dd, or null while the date is still open. */
  date: string | null;
  /** Font size and colour of the surrounding date text. */
  className?: string;
};

/** A release date as <time>, or the dashed "[Release date]" placeholder (spec rule; the design shows plain text). */
export function ReleaseDate({ date, className }: ReleaseDateProps) {
  if (date === null) {
    return (
      <span className={className}>
        <PlaceholderBox as="span" className={styles.placeholder}>
          {RELEASE_COPY.datePlaceholder}
        </PlaceholderBox>
      </span>
    );
  }
  return (
    <time dateTime={date} className={className}>
      {formatReleaseDate(date)}
    </time>
  );
}
