import { GuideBasics } from "./GuideBasics";
import { GuideBuilder } from "./GuideBuilder";
import { GuideEmails } from "./GuideEmails";
import { GuideRequests } from "./GuideRequests";
import { GuideSettings } from "./GuideSettings";
import { GuideStorefronts } from "./GuideStorefronts";

export { userGuideToc } from "./guideData";

/**
 * User guide body (rewritten 2026-10-01 to cover every feature, with app screenshots); rendered inside
 * DocsArticleLayout. Facts come from the app repo (17c7188); screenshots from the Harbor & Pine demo store.
 */
export function UserGuideArticle() {
  return (
    <>
      <GuideBasics />
      <GuideBuilder />
      <GuideRequests />
      <GuideEmails />
      <GuideStorefronts />
      <GuideSettings />
    </>
  );
}
