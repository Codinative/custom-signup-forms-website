/**
 * Dark code panel. The default look is the ApiDocs / MobileApiDocs panel: radius 14, `#0f172a`,
 * `<pre>` 12.5/1.7, padding 16, `pre-wrap` + `word-break: break-word` (lines wrap, nothing scrolls,
 * so the `<pre>` is not focusable).
 *
 * Headers are passed in through `header`. Two ready-made layouts render a `<figcaption>`:
 * - `CodeHeader({ title, lang })`: ApiDocs bar, e.g. "Request" + "curl", "200 Response" + "json".
 * - `CodeFileHeader({ filename, tag })`: MultiStorefront snippet, e.g. "signup.tsx" + code Tag
 *   "Embed snippet". The phone artboard has no header: pass `className="onlyDesktop"`.
 *
 * The MultiStorefront snippet brings its own classes (base rules are zero-specificity, so they win):
 * - `className`: radius 18, padding 28px 28px 30px, shadow `0 30px 60px -30px rgba(15,23,42,.5)`;
 *   phone radius 14, padding 18, no shadow.
 * - `preClassName`: padding 0, 13.5/1.75, `word-break: break-all`; phone 12/1.7.
 *
 * Tokens: key `#93c5fd` · str `#86efac` · tag `#f472b6` · attr `#93c5fd` · comment `#94a3b8` ·
 * muted `#64748b` (e.g. the "… colours, fonts, layout …" elision) · placeholder = inline dashed
 * amber PlaceholderBox (`[app-domain]`, `[store-id]`, `[channel]`, `[signature]`). No `k` = plain.
 */
import { Fragment, type ReactNode } from "react";
import { PlaceholderBox } from "./PlaceholderBox";
import { Tag } from "./Tag";
import styles from "./CodeBlock.module.css";

export type CodeTokenKind = "key" | "str" | "tag" | "attr" | "comment" | "muted" | "placeholder";

export type CodeToken = { t: string; k?: CodeTokenKind };

export type CodeBlockProps = {
  header?: ReactNode;
  /** One array of tokens per line; `[]` is a blank line. */
  lines: CodeToken[][];
  className?: string;
  preClassName?: string;
  /** Accessible name for the panel (useful when there is no header, e.g. on phone). */
  label?: string;
};

const TOKEN_CLASS: Record<Exclude<CodeTokenKind, "placeholder">, string> = {
  key: styles.key,
  str: styles.str,
  tag: styles.tag,
  attr: styles.attr,
  comment: styles.comment,
  muted: styles.muted,
};

function renderToken(token: CodeToken, index: number) {
  if (!token.k) return <Fragment key={index}>{token.t}</Fragment>;
  if (token.k === "placeholder") {
    return (
      <PlaceholderBox key={index} as="span" className={styles.placeholder}>
        {token.t}
      </PlaceholderBox>
    );
  }
  return (
    <span key={index} className={TOKEN_CLASS[token.k]}>
      {token.t}
    </span>
  );
}

export function CodeBlock({ header, lines, className, preClassName, label }: CodeBlockProps) {
  return (
    <figure className={[styles.root, className].filter(Boolean).join(" ")} aria-label={label}>
      {header}
      <pre className={["mono", styles.pre, preClassName].filter(Boolean).join(" ")}>
        <code className={styles.code}>
          {lines.map((line, i) => (
            <Fragment key={i}>
              {i > 0 ? "\n" : null}
              {line.map(renderToken)}
            </Fragment>
          ))}
        </code>
      </pre>
    </figure>
  );
}

export type CodeHeaderProps = {
  title: string;
  lang: string;
  className?: string;
};

/** ApiDocs header bar: title `.mono` 12 `#94a3b8`, language `.mono` 11 `#64748b`. */
export function CodeHeader({ title, lang, className }: CodeHeaderProps) {
  return (
    <figcaption className={[styles.header, className].filter(Boolean).join(" ")}>
      <span className={`mono ${styles.title}`}>{title}</span>
      <span className={`mono ${styles.lang}`}>{lang}</span>
    </figcaption>
  );
}

export type CodeFileHeaderProps = {
  filename: string;
  tag: string;
  className?: string;
};

/** MultiStorefront snippet header: filename `.mono` 12 `#64748b` + code Tag, margin-bottom 18. */
export function CodeFileHeader({ filename, tag, className }: CodeFileHeaderProps) {
  return (
    <figcaption className={[styles.fileHeader, className].filter(Boolean).join(" ")}>
      <span className={`mono ${styles.fileName}`}>{filename}</span>
      <Tag tone="code" icon="code">
        {tag}
      </Tag>
    </figcaption>
  );
}
