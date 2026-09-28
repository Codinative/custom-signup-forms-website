import { GuidePage } from "@/components/docs/guides/GuidePage";
import { GUIDES } from "@/components/docs/guides/guides";
import { PlansBillingGuide } from "@/components/docs/guides/PlansBillingGuide";
import { getDoc } from "@/lib/content/docsIndex";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: getDoc("plans-and-billing").title,
  description: GUIDES["plans-and-billing"].description,
  path: "/docs/plans-and-billing/",
  type: "article",
});

export default function PlansAndBillingDocsPage() {
  return (
    <GuidePage slug="plans-and-billing">
      <PlansBillingGuide />
    </GuidePage>
  );
}
