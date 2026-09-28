import { DocsGroups } from "@/components/docs/home/DocsGroups";
import { DocsHero } from "@/components/docs/home/DocsHero";
import { IntegrationBand } from "@/components/docs/home/IntegrationBand";
import { StillStuck } from "@/components/docs/home/StillStuck";
import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Documentation",
  description:
    "Custom Signup Forms documentation: guides for store owners, and integration docs for developers building headless storefronts and apps.",
  path: "/docs/",
});

export default function DocsPage() {
  return (
    <>
      <SiteHeader variant="light" active="docs" />
      <main id="main">
        <DocsHero />
        <IntegrationBand />
        <DocsGroups>
          <StillStuck />
        </DocsGroups>
      </main>
      <Footer />
    </>
  );
}
