import type { CodeToken } from "@/components/ui/CodeBlock";

/**
 * Code samples for /docs/api/ (ApiDocs.dc.html). Whitespace is significant: the panels are <pre>.
 * The open values [app-domain] [store-id] [channel] [signature] are separate placeholder tokens.
 */
const txt = (t: string): CodeToken => ({ t });
const key = (t: string): CodeToken => ({ t, k: "key" });
const str = (t: string): CodeToken => ({ t, k: "str" });
const ph = (t: string): CodeToken => ({ t, k: "placeholder" });

export const formConfigRequest: CodeToken[][] = [
  [
    txt('curl "https://'),
    ph("[app-domain]"),
    txt("/api/public/form-config?pub="),
    ph("[store-id]"),
    txt("&ch="),
    ph("[channel]"),
    txt('"'),
  ],
];

export const formConfigResponse: CodeToken[][] = [
  [txt("{")],
  [txt("  "), key('"error"'), txt(": false,")],
  [txt("  "), key('"data"'), txt(": {")],
  [txt("    "), key('"fields"'), txt(": [")],
  [
    txt("      { "),
    key('"id"'),
    txt(": 1, "),
    key('"type"'),
    txt(": "),
    str('"text"'),
    txt(", "),
    key('"label"'),
    txt(": "),
    str('"Company name"'),
    txt(", "),
    key('"required"'),
    txt(": true },"),
  ],
  [
    txt("      { "),
    key('"id"'),
    txt(": 2, "),
    key('"type"'),
    txt(": "),
    str('"select"'),
    txt(", "),
    key('"label"'),
    txt(": "),
    str('"Account type"'),
    txt(","),
  ],
  [
    txt("        "),
    key('"options"'),
    txt(": [{ "),
    key('"label"'),
    txt(": "),
    str('"Wholesale"'),
    txt(", "),
    key('"value"'),
    txt(": "),
    str('"wholesale"'),
    txt(" }] }"),
  ],
  [txt("    ],")],
  [txt("    "), key('"theme"'), txt(": { "), { t: "… colours, fonts, layout …", k: "muted" }, txt(" },")],
  [txt("    "), key('"watermark"'), txt(": false")],
  [txt("  }")],
  [txt("}")],
];

export const signupRequest: CodeToken[][] = [
  [txt("curl -X POST \\")],
  [
    txt('  "https://'),
    ph("[app-domain]"),
    txt("/api/public/signup-requests?pub="),
    ph("[store-id]"),
    txt("&ch="),
    ph("[channel]"),
    txt("&sig="),
    ph("[signature]"),
    txt('" \\'),
  ],
  [txt('  -H "Content-Type: application/json" \\')],
  [txt("  -d '{")],
  [txt("    "), key('"email"'), txt(": "), str('"aisha@brightretail.example"'), txt(",")],
  [txt("    "), key('"idempotency_key"'), txt(": "), str('"7f3c…"'), txt(",")],
  [txt("    "), key('"data"'), txt(": {")],
  [txt("      "), key('"First Name"'), txt(": "), str('"Aisha"'), txt(",")],
  [txt("      "), key('"Company name"'), txt(": "), str('"Bright Retail"'), txt(",")],
  [txt("      "), key('"Account type"'), txt(": "), str('"wholesale"')],
  [txt("    }")],
  [txt("  }'")],
];

/** Corrected to the app: a JSON submission returns the request id only (signup-requests/route.ts). */
export const signupResponse: CodeToken[][] = [
  [txt("{ "), key('"error"'), txt(": false, "), key('"data"'), txt(": { "), key('"id"'), txt(": "), str('"…"'), txt(" } }")],
];
