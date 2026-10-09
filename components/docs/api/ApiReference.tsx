import { ProseSection } from "@/components/docs/Prose";
import styles from "./ApiReference.module.css";

/**
 * Error rows, corrected to the app (app/api/public/form-config/route.ts,
 * app/api/public/signup-requests/route.ts, lib/dbs/firebase.ts): 403 is never returned.
 */
const ERRORS: { code: string; text: string }[] = [
  {
    code: "400",
    text: "The store identifier is missing or malformed, the request body or email is invalid, a file is too large (10 MB) or not an allowed type, or the storefront signature does not match.",
  },
  { code: "404", text: "Unknown store. For GET, also when the form is switched off on that storefront." },
  {
    code: "409",
    text: "An approved request already exists for that email on this storefront, a request is already pending, or the duplicate check could not complete.",
  },
  {
    code: "429",
    text: "The store has reached its monthly signup limit (Free plan), or the applicant is in the cooling-off period after a rejection.",
  },
];

/** "File uploads" (desktop only, as designed). */
export function ApiFileUploads() {
  return (
    <ProseSection
      id="file-uploads"
      className={`${styles.fileUploads} onlyDesktop`}
      title="File uploads"
      intro="For forms with a file field (Standard and above), send multipart/form-data instead of JSON: a pub part, a data part holding the answers as a JSON string, and one part per file named file__ followed by the field label."
    />
  );
}

/** "Errors": status rows; the phone design drops the intro line. */
export function ApiErrors() {
  return (
    <ProseSection id="errors" className={styles.errors}>
      <div className={styles.headingBlock}>
        <h2 className={`disp ${styles.h2}`}>Errors</h2>
        <p className="body onlyDesktop">
          Every error returns JSON with error: true and a message you can show the applicant.
        </p>
      </div>
      <dl className={styles.rows}>
        {ERRORS.map((error) => (
          <div key={error.code} className={styles.row}>
            <dt className={`mono ${styles.code}`}>{error.code}</dt>
            <dd className={styles.text}>{error.text}</dd>
          </div>
        ))}
      </dl>
    </ProseSection>
  );
}

/**
 * "Limits and retries": listed in the design's "On this page" but not drawn. Desktop only, like
 * "File uploads". Facts from lib/plans.ts (Free: 100 requests a month, keyed by UTC month; paid: no
 * cap), lib/entitlements.ts and createSignupRequest (idempotency key matched per storefront).
 */
export function ApiLimits() {
  return (
    <ProseSection
      id="limits-and-retries"
      className="onlyDesktop"
      title="Limits and retries"
      intro={
        <>
          On the Free plan a store accepts 100 signups per calendar month (UTC); after that, submissions return 429
          until the next month starts. Paid plans have no monthly limit. Retrying with the same{" "}
          <code>idempotency_key</code> in the JSON body, or the <code>Idempotency-Key</code> header, on the same
          storefront returns 200 with the same request id instead of creating a duplicate.
        </>
      }
    />
  );
}
