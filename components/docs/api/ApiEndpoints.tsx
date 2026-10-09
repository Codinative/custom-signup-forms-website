import { ApiEndpoint } from "./ApiEndpoint";
import { formConfigRequest, formConfigResponse, signupRequest, signupResponse } from "./apiSamples";

/** "Get the form": GET /api/public/form-config. The phone design shows the response only. */
export function ApiGetForm() {
  return (
    <ApiEndpoint
      id="get-the-form"
      method="GET"
      path="/api/public/form-config"
      layout="split"
      description={
        <>
          Returns the active form for a storefront. Field <code>label</code> is the key you submit answers under; for
          choice fields, submit the option <code>value</code>.
        </>
      }
      samples={[
        { title: "Request", lang: "curl", lines: formConfigRequest, onPhone: false },
        { title: "200 Response", lang: "json", lines: formConfigResponse, onPhone: true },
      ]}
    />
  );
}

/** "Submit a signup": POST /api/public/signup-requests. The phone design shows the request only. */
export function ApiSubmitSignup() {
  return (
    <ApiEndpoint
      id="submit-a-signup"
      method="POST"
      path="/api/public/signup-requests"
      layout="stack"
      description={
        <>
          Creates a signup request. Send an <code>idempotency_key</code> with every attempt so a retry after a dropped
          connection never creates a second request.
        </>
      }
      samples={[
        { title: "Request", lang: "curl", lines: signupRequest, onPhone: true },
        { title: "200 Response", lang: "json", lines: signupResponse, onPhone: false },
      ]}
    />
  );
}
