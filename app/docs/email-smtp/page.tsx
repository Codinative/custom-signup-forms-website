import { GuidePage } from "@/components/docs/guides/GuidePage";
import { EmailSmtpGuide } from "@/components/docs/guides/EmailSmtpGuide";
import { GUIDES } from "@/components/docs/guides/guides";
import { getDoc } from "@/lib/content/docsIndex";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: getDoc("email-smtp").title,
  description: GUIDES["email-smtp"].description,
  path: "/docs/email-smtp/",
  type: "article",
});

export default function EmailSmtpDocsPage() {
  return (
    <GuidePage slug="email-smtp">
      <EmailSmtpGuide />
    </GuidePage>
  );
}
