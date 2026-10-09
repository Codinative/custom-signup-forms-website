import { DocsArticleLayout } from "@/components/docs/DocsArticleLayout";
import { UserGuideArticle, userGuideToc } from "@/components/docs/user-guide/UserGuideArticle";
import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/ui/JsonLd";
import { docBreadcrumb, getDoc } from "@/lib/content/docsIndex";
import { breadcrumbLd, buildMetadata, techArticleLd } from "@/lib/seo";

const doc = getDoc("user-guide");
const description =
  "How to build signup forms, review and approve requests, send customer emails and run a form per storefront in Custom Signup Forms, with screenshots of each screen.";

export const metadata = buildMetadata({ title: doc.title, description, path: doc.href, type: "article" });

export default function UserGuidePage() {
  return (
    <>
      <SiteHeader variant="light" active="docs" />
      <DocsArticleLayout
        active="user-guide"
        breadcrumb={docBreadcrumb("user-guide")}
        title={doc.title}
        lede="Every screen of Custom Signup Forms, step by step: build your form, put it live, review applications, send customer emails and run a different form on each storefront."
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
