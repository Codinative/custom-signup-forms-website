import { DocsArticleLayout } from "@/components/docs/DocsArticleLayout";
import { UserGuideArticle, userGuideToc } from "@/components/docs/kept/UserGuideArticle";
import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/ui/JsonLd";
import { docBreadcrumb, getDoc } from "@/lib/content/docsIndex";
import { breadcrumbLd, buildMetadata, techArticleLd } from "@/lib/seo";

const doc = getDoc("user-guide");
const description =
  "How to build forms, review and approve requests, customise emails and manage settings in Custom Signup Forms day to day.";

export const metadata = buildMetadata({ title: doc.title, description, path: doc.href, type: "article" });

export default function UserGuidePage() {
  return (
    <>
      <SiteHeader variant="light" active="docs" />
      <DocsArticleLayout
        active="user-guide"
        breadcrumb={docBreadcrumb("user-guide")}
        title={doc.title}
        lede="How to build forms, review applications and automate the emails in Custom Signup Forms day to day."
        toc={userGuideToc}
      >
        <UserGuideArticle />
      </DocsArticleLayout>
      <Footer />
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Docs", path: "/docs/" },
            { name: doc.title, path: doc.href },
          ]),
          techArticleLd({ title: doc.title, description, path: doc.href }),
        ]}
      />
    </>
  );
}
