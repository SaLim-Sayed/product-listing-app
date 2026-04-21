import type { MetadataRoute } from "next";
import {
  fetchProducts,
  fetchCategorySlugs,
} from "@/features/products/services/products.service";
import { getSiteBaseUrl } from "@/config/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = await getSiteBaseUrl();
  
  let products: any[] = [];
  let categories: string[] = [];

  try {
    const [p, c] = await Promise.all([
      fetchProducts(),
      fetchCategorySlugs()
    ]);
    products = p;
    categories = c;
  } catch (error) {
    console.error("Sitemap: Dynamic fetch failed, generating static-only sitemap.", error);
  }

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const categoryEntries: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/shop?category=${encodeURIComponent(category)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...productEntries,
    ...categoryEntries,
  ];
}
