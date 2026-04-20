import { headers } from "next/headers";

/**
 * Absolute origin for canonical URLs and JSON-LD (`NEXT_PUBLIC_SITE_URL`), or inferred
 * from request headers on Vercel / local dev.
 */
export async function getSiteBaseUrl(): Promise<string> {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");
  if (fromEnv) {
    return fromEnv;
  }

  try {
    const headerList = await headers();
    const host = headerList.get("x-forwarded-host") ?? headerList.get("host");
    if (!host) {
      return "";
    }

    const forwardedProto = headerList.get("x-forwarded-proto");
    const proto =
      forwardedProto ??
      (host.startsWith("localhost") || host.startsWith("127.")
        ? "http"
        : "https");

    return `${proto}://${host}`;
  } catch {
    return "";
  }
}
