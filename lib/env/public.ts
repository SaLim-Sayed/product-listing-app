const DEFAULT_API_BASE_URL = "https://fakestoreapi.com";

/** Browser-safe public env. Overrides default Fake Store origin when set. */
export function getPublicApiBaseUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL;
  return raw.replace(/\/+$/, "");
}
