type JsonLdProps = {
  data: Record<string, unknown>;
};

/** Server-only: injects `application/ld+json` for Schema.org / SEO. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
