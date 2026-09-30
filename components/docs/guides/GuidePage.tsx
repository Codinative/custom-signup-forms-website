import type { ReactNode } from "react";
import { DocsArticleLayout } from "@/components/docs/DocsArticleLayout";
import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/ui/JsonLd";
import { Tag } from "@/components/ui/Tag";
import { docBreadcrumb, getDoc } from "@/lib/content/docsIndex";
import { breadcrumbLd, techArticleLd } from "@/lib/seo";
import { GUIDES, type GuideSlug } from "./guides";

export type GuidePageProps = {
  slug: GuideSlug;
  /** The article sections. */
  children: ReactNode;
};

/** Page shell for a docs guide: light header, the ApiDocs article template, footer, BreadcrumbList + TechArticle. */
export function GuidePage({ slug, children }: GuidePageProps) {
  const doc = getDoc(slug);
  const guide = GUIDES[slug];
  return (
    <>
      <SiteHeader variant="light" active="docs" />
      <DocsArticleLayout
        active={slug}
        breadcrumb={docBreadcrumb(slug)}
        title={doc.title}
        titleTag={guide.plan ? <Tag tone="blue">{guide.plan}</Tag> : undefined}
        lede={guide.lede}
        toc={guide.toc}
      >
        {children}
      </DocsArticleLayout>
      <Footer />
      <JsonLd
        data={breadcrumbLd([
          { name: "Docs", path: "/docs/" },
          { name: doc.title, path: doc.href },
        ])}
      />
      <JsonLd data={techArticleLd({ title: doc.title, description: guide.description, path: doc.href })} />
    </>
  );
}
