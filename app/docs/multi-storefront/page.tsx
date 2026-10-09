import { GuidePage } from "@/components/docs/guides/GuidePage";
import { GUIDES } from "@/components/docs/guides/guides";
import { MultiStorefrontGuide } from "@/components/docs/guides/MultiStorefrontGuide";
import { getDoc } from "@/lib/content/docsIndex";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: getDoc("multi-storefront").title,
  description: GUIDES["multi-storefront"].description,
  path: "/docs/multi-storefront/",
  type: "article",
});

export default function MultiStorefrontDocsPage() {
  return (
    <GuidePage slug="multi-storefront">
      <MultiStorefrontGuide />
    </GuidePage>
  );
}
