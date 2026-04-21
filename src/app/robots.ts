import { MetadataRoute } from "next";
import { getSiteBaseUrl } from "@/config/seo";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const baseUrl = await getSiteBaseUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
