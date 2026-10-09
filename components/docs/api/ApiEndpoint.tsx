import type { ReactNode } from "react";
import { ProseSection } from "@/components/docs/Prose";
import { CodeBlock, CodeHeader, type CodeToken } from "@/components/ui/CodeBlock";
import styles from "./ApiEndpoint.module.css";

export type ApiSample = {
  title: string;
  lang: string;
  lines: CodeToken[][];
  /** false: desktop only (MobileApiDocs.dc.html shows one panel per endpoint). */
  onPhone: boolean;
};

export type ApiEndpointProps = {
  /** "On this page" anchor. */
  id: string;
  method: "GET" | "POST";
  path: string;
  /** Desktop only; the phone design has no endpoint descriptions. */
  description: ReactNode;
  samples: ApiSample[];
  /** split: panels side by side (GET). stack: one under the other (POST). */
  layout: "split" | "stack";
};

/** ApiDocs.dc.html endpoint block: method badge + path, description, code panels. */
export function ApiEndpoint({ id, method, path, description, samples, layout }: ApiEndpointProps) {
  return (
    <ProseSection id={id} className={styles.endpoint}>
      <h2 className={styles.heading}>
        <span className={`mono ${styles.method} ${method === "GET" ? styles.get : styles.post}`}>{method}</span>{" "}
        <span className={`mono ${styles.path}`}>{path}</span>
      </h2>
      <p className="body onlyDesktop">{description}</p>
      <div className={layout === "split" ? styles.split : styles.stack}>
        {samples.map((sample) => (
          <CodeBlock
            key={sample.title}
            header={<CodeHeader title={sample.title} lang={sample.lang} />}
            lines={sample.lines}
            className={sample.onPhone ? undefined : "onlyDesktop"}
          />
        ))}
      </div>
    </ProseSection>
  );
}
