import Link from "next/link";
import { ApiBeforeYouStart } from "@/components/docs/api/ApiBeforeYouStart";
import { ApiGetForm, ApiSubmitSignup } from "@/components/docs/api/ApiEndpoints";
import { ApiOverview } from "@/components/docs/api/ApiOverview";
import { Callout } from "@/components/docs/Callout";
import { ApiErrors, ApiFileUploads, ApiLimits } from "@/components/docs/api/ApiReference";
import { DocsArticleLayout } from "@/components/docs/DocsArticleLayout";
import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/ui/JsonLd";
import { Tag } from "@/components/ui/Tag";
import { apiToc, docBreadcrumb } from "@/lib/content/docsIndex";
import { breadcrumbLd, buildMetadata, techArticleLd } from "@/lib/seo";

const TITLE = "API Integration";
const PATH = "/docs/api/";
const DESCRIPTION =
  "Fetch your signup form and submit signup requests over HTTPS from native apps, kiosks or your own backend: identifiers, endpoints, errors and limits.";

export const metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, type: "article" });

export default function ApiDocsPage() {
  return (
    <>
      <SiteHeader variant="light" active="docs" />
      <DocsArticleLayout
        active="api"
        breadcrumb={docBreadcrumb("api")}
        title={TITLE}
        titleTag={<Tag tone="soon">Coming soon</Tag>}
        lede="For signups that happen outside a web page: native iOS and Android apps, React Native or Flutter, in-store kiosks, or your own backend. You fetch the form, draw it with your own components, and submit the answers. Requests land in the same approval queue, with the same emails and customer-group rules."
        phoneLede="For native apps, kiosks and your own backend: fetch the form, draw it with your own components, submit the answers."
        toc={apiToc}
      >
        <Callout>
          Coming soon. The API isn&apos;t available yet: this page previews how it will work, and details may change
          before launch. To add the signup form to a headless web storefront today, use the{" "}
          <Link href="/docs/headless/">embed snippet</Link>.
        </Callout>
        <ApiOverview />
        <ApiBeforeYouStart />
        <ApiGetForm />
        <ApiSubmitSignup />
        <ApiFileUploads />
        <ApiErrors />
        <ApiLimits />
      </DocsArticleLayout>
      <Footer />
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Docs", path: "/docs/" },
            { name: TITLE, path: PATH },
          ]),
          techArticleLd({ title: TITLE, description: DESCRIPTION, path: PATH }),
        ]}
      />
    </>
  );
}
