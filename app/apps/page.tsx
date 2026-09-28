import { AppGrid } from "@/components/apps/AppGrid";
import { AppsHero } from "@/components/apps/AppsHero";
import { CustomWorkBand } from "@/components/apps/CustomWorkBand";
import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "More apps",
  description:
    "Codinative builds only for BigCommerce. Each app installs from the marketplace, runs without theme edits, and is supported by the same team.",
  path: "/apps/",
});

export default function AppsPage() {
  return (
    <>
      <SiteHeader variant="light" />
      <main id="main">
        <AppsHero />
        <AppGrid />
        <CustomWorkBand />
      </main>
      <Footer />
    </>
  );
}
