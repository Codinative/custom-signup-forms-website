import { GuidePage } from "@/components/docs/guides/GuidePage";
import { GUIDES } from "@/components/docs/guides/guides";
import { HeadlessGuide } from "@/components/docs/guides/HeadlessGuide";
import { getDoc } from "@/lib/content/docsIndex";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: getDoc("headless").title,
  description: GUIDES.headless.description,
  path: "/docs/headless/",
  type: "article",
});

export default function HeadlessDocsPage() {
  return (
    <GuidePage slug="headless">
      <HeadlessGuide />
    </GuidePage>
  );
}
