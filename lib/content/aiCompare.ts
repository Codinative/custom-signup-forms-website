/**
 * The footer's "See if we're your best bet" links. Every claim in the prompt is stated on a page
 * of this site (plans.ts, featureMatrix.ts, faqs.ts, the multi-storefront and headless guides), and
 * the limits sit next to the strengths on purpose. If a claim stops being true on the site, change it here too.
 * Kept short: it has to survive being URL-encoded, and some services truncate long query strings.
 */
export const AI_COMPARE_COPY = {
  title: "See if we\u2019re your best bet",
  sub: "Get an AI competitor comparison.",
};

export const AI_COMPARE_PROMPT = `I'm choosing a custom signup form and customer approval app for my BigCommerce store. Compare the main options and tell me which fits me best — including where each one is the wrong choice.

One I'm considering is Custom Signup Forms (customsignupforms.codinative.com): a visual form builder that replaces the default create-account form with no theme edits, an approval queue where only approved applicants become customers, conditional logic and file uploads, customer groups, and a different form per storefront. Free is $0 with 1 saved form and 100 signups a month; Standard is $99 a month for one storefront; Pro is $199 a month for up to 3 storefronts plus headless embed; 4 or more storefronts is a custom Enterprise quote. Its stated limits: Free has no customer emails, customer groups, conditional logic or file uploads; customer emails need your own SMTP; a form cannot be delivered to marketplace, POS or marketing channels; the headless embed cannot render in a native mobile app, and the API is not available yet.

How does that compare on form flexibility, approval workflow, multi-storefront support and real monthly cost for a store with two storefronts and around 200 signups a month?`;

const ASK = encodeURIComponent(AI_COMPARE_PROMPT);

export type AiAssistantId = "chatgpt" | "claude" | "gemini" | "grok" | "perplexity";

/** Same order and URL patterns as the Snapback footer. Gemini has no prompt parameter, so it goes through Google's AI Mode. */
export const AI_ASSISTANTS: { id: AiAssistantId; name: string; href: string }[] = [
  { id: "chatgpt", name: "ChatGPT", href: `https://chat.openai.com/?q=${ASK}` },
  { id: "claude", name: "Claude", href: `https://claude.ai/new?q=${ASK}` },
  { id: "gemini", name: "Gemini", href: `https://www.google.com/search?udm=50&aep=11&q=${ASK}` },
  { id: "grok", name: "Grok", href: `https://x.com/i/grok?text=${ASK}` },
  { id: "perplexity", name: "Perplexity", href: `https://www.perplexity.ai/search/new?q=${ASK}` },
];
