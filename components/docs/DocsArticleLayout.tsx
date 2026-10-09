import Link from "next/link";
import type { ReactNode } from "react";
import type { Crumb, DocSlug, TocItem } from "@/lib/content/docsIndex";
import { DocsPhoneBar } from "./DocsPhoneBar";
import { DocsSidebar } from "./DocsSidebar";
import { DocsToc } from "./DocsToc";
import styles from "./DocsArticleLayout.module.css";

export type DocsArticleLayoutProps = {
  active: DocSlug;
  breadcrumb: Crumb[];
  title: string;
  /** Beside the h1 on desktop, above it on phone (e.g. a Tag). */
  titleTag?: ReactNode;
  /** Inline content, rendered in a p.lede. */
  lede: ReactNode;
  /** Shorter phone intro, rendered as p.body below 768px. */
  phoneLede?: ReactNode;
  /** Phone bar text; defaults to "<first crumb> / <title>". */
  phoneCrumb?: string;
  toc: TocItem[];
  children: ReactNode;
};

/**
 * Docs article template (ApiDocs.dc.html / MobileApiDocs.dc.html): docs nav, article, "On this page".
 * Renders the page's <main id="main">; pages put SiteHeader before it and Footer after it.
 */
export function DocsArticleLayout({
  active,
  breadcrumb,
  title,
  titleTag,
  lede,
  phoneLede,
  phoneCrumb,
  toc,
  children,
}: DocsArticleLayoutProps) {
  const crumbText = phoneCrumb ?? [breadcrumb[0]?.label, title].filter(Boolean).join(" / ");
  return (
    <>
      <DocsPhoneBar crumb={crumbText} toc={toc} />
      <div className={styles.grid}>
        <DocsSidebar active={active} className={styles.sidebar} />
        <main id="main" className={styles.main}>
          <div className={styles.head}>
            <nav aria-label="Breadcrumb" className={styles.crumbNav}>
              <ol className={styles.crumbs}>
                {breadcrumb.map((crumb, i) => {
                  const last = i === breadcrumb.length - 1;
                  return (
                    <li key={`${i}-${crumb.label}`} className={styles.crumb}>
                      {i > 0 ? <span aria-hidden="true">/</span> : null}
                      {last ? (
                        <span className={styles.current} aria-current="page">
                          {crumb.label}
                        </span>
                      ) : crumb.href ? (
                        <Link href={crumb.href} className={styles.crumbLink}>
                          {crumb.label}
                        </Link>
                      ) : (
                        <span>{crumb.label}</span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
            <div className={styles.titleRow}>
              <h1 className={`disp ${styles.title}`}>{title}</h1>
              {titleTag ? <div className={styles.titleTag}>{titleTag}</div> : null}
            </div>
            {phoneLede ? (
              <>
                <p className="lede onlyDesktop">{lede}</p>
                <p className="body onlyPhone">{phoneLede}</p>
              </>
            ) : (
              <p className={`lede ${styles.lede}`}>{lede}</p>
            )}
          </div>
          {children}
        </main>
        <div className={styles.toc}>
          {toc.length > 0 ? (
            <>
              <span className={`eyebrow ${styles.tocLabel}`}>On this page</span>
              <DocsToc items={toc} />
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
