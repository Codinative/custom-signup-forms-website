import type { CodeToken } from "@/components/ui/CodeBlock";

/**
 * Code for the headless guide. Shapes from the app repo: the container is
 * EMBED_CONTAINER_SNIPPET (components/channels/types.ts), the tag is buildEmbedSnippet
 * (lib/bc-channels.ts), the framework samples are app/help/headless-integration/page.tsx.
 * The open values ([app-domain], [store-id], [channel], [signature]) are placeholder tokens.
 */

/** The script URL inside a string: each open value is its own placeholder token. */
function scriptSrc(quote: string): CodeToken[] {
  return [
    { t: `${quote}https://`, k: "str" },
    { t: "[app-domain]", k: "placeholder" },
    { t: "/custom-signup.min.js?pub=", k: "str" },
    { t: "[store-id]", k: "placeholder" },
    { t: "&ch=", k: "str" },
    { t: "[channel]", k: "placeholder" },
    { t: "&sig=", k: "str" },
    { t: "[signature]", k: "placeholder" },
    { t: quote, k: "str" },
  ];
}

const SCRIPT_TAG: CodeToken[] = [
  { t: "<script", k: "tag" },
  { t: " " },
  { t: "src", k: "attr" },
  { t: "=" },
  ...scriptSrc('"'),
  { t: " " },
  { t: "async", k: "attr" },
  { t: "></script>", k: "tag" },
];

export const CONTAINER_LINES: CodeToken[][] = [
  [
    { t: "<div", k: "tag" },
    { t: " " },
    { t: "id", k: "attr" },
    { t: "=" },
    { t: '"custom-signup-container"', k: "str" },
    { t: "></div>", k: "tag" },
  ],
];

export const SCRIPT_LINES: CodeToken[][] = [SCRIPT_TAG];

export const HTML_LINES: CodeToken[][] = [[{ t: "<!-- in <head> -->", k: "comment" }], SCRIPT_TAG];

export const NEXT_LINES: CodeToken[][] = [
  [{ t: "// app/layout.tsx", k: "comment" }],
  [{ t: "import Script from " }, { t: "'next/script'", k: "str" }],
  [],
  [{ t: "export default function RootLayout({ children }) {" }],
  [{ t: "  return (" }],
  [{ t: "    " }, { t: "<html>", k: "tag" }],
  [{ t: "      " }, { t: "<body>", k: "tag" }],
  [{ t: "        {children}" }],
  [
    { t: "        " },
    { t: "<Script", k: "tag" },
    { t: " " },
    { t: "src", k: "attr" },
    { t: "=" },
    ...scriptSrc('"'),
    { t: " " },
    { t: "strategy", k: "attr" },
    { t: "=" },
    { t: '"afterInteractive"', k: "str" },
    { t: " />", k: "tag" },
  ],
  [{ t: "      " }, { t: "</body>", k: "tag" }],
  [{ t: "    " }, { t: "</html>", k: "tag" }],
  [{ t: "  )" }],
  [{ t: "}" }],
];

export const NUXT_LINES: CodeToken[][] = [
  [{ t: "// nuxt.config.ts", k: "comment" }],
  [{ t: "export default defineNuxtConfig({" }],
  [{ t: "  app: {" }],
  [{ t: "    head: {" }],
  [{ t: "      script: [{ src: " }, ...scriptSrc("'"), { t: ", async: true }]," }],
  [{ t: "    }," }],
  [{ t: "  }," }],
  [{ t: "})" }],
];
