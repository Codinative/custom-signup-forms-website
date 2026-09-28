import { DocsArticleLayout } from "@/components/docs/DocsArticleLayout";
import { InstallationArticle, installationToc } from "@/components/docs/kept/InstallationArticle";
import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/ui/JsonLd";
import { docBreadcrumb, getDoc } from "@/lib/content/docsIndex";
import { breadcrumbLd, buildMetadata, techArticleLd } from "@/lib/seo";

const doc = getDoc("installation");
const description =
  "Requirements, permissions and a step-by-step setup to install Custom Signup Forms and publish a custom signup form on your BigCommerce storefront.";

export const metadata = buildMetadata({ title: doc.title, description, path: doc.href, type: "article" });

export default function InstallationGuidePage() {
  return (
    <>
      <SiteHeader variant="light" active="docs" />
      <DocsArticleLayout
        active="installation"
        breadcrumb={docBreadcrumb("installation")}
        title={doc.title}
        lede="Everything you need to install Custom Signup Forms and publish a branded signup form on your BigCommerce storefront."
        toc={installationToc}
      >
        <InstallationArticle />
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
