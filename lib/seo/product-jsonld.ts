import { productDetailPath } from "@/lib/nav/product-path";
import type { Product } from "@/lib/types/product";
import { safeImageSrc } from "@/lib/image-url";

/** Schema.org `Product` graph for rich results (price, rating, availability). */
export function buildProductJsonLd(
  product: Product,
  siteBaseUrl: string,
): Record<string, unknown> {
  const base = siteBaseUrl.replace(/\/+$/, "");
  const path = productDetailPath(product.id);
  const canonicalUrl = base ? `${base}${path}` : undefined;
  const imageUrl = safeImageSrc(product.image);

  const offers: Record<string, unknown> = {
    "@type": "Offer",
    priceCurrency: "USD",
    price: product.price,
    availability: "https://schema.org/InStock",
    itemCondition: "https://schema.org/NewCondition",
    seller: {
      "@type": "Organization",
      name: "Marketly",
    },
  };

  if (canonicalUrl) {
    offers.url = canonicalUrl;
  }

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description.trim(),
    image: [imageUrl],
    sku: String(product.id),
    category: product.category,
    ...(canonicalUrl
      ? {
          "@id": `${canonicalUrl}#product`,
          url: canonicalUrl,
        }
      : {}),
    offers,
  };

  if (product.rating.count > 0) {
    jsonLd.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: product.rating.rate,
      ratingCount: product.rating.count,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return jsonLd;
}
