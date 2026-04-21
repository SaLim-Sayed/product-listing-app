import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { StoreShell } from "@/components/layouts/store-shell";
import { ProductDetail } from "@/features/products/product-details/ProductDetail";
import {
  buildProductJsonLd,
  getSiteBaseUrl,
} from "@/config/seo";
import { fetchProductById } from "@/features/products/services/products.service";
import { safeImageSrc } from "@/lib/image-url";
import { productDetailPath } from "@/lib/nav/product-path";

type Props = {
  params: Promise<{ id: string }>;
};

/** Dynamic `<title>` and meta description per product (equivalent intent to `next/head`). */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const product = await fetchProductById(id);
    const description = product.description.slice(0, 160);
    const imageUrl = safeImageSrc(product.image);
    const base = await getSiteBaseUrl();
    const canonical =
      base.length > 0
        ? `${base.replace(/\/+$/, "")}${productDetailPath(product.id)}`
        : undefined;

    return {
      title: product.title,
      description,
      alternates: canonical ? { canonical } : undefined,
      openGraph: {
        title: product.title,
        description,
        type: "website",
        images: [{ url: imageUrl, alt: product.title }],
      },
      twitter: {
        card: "summary_large_image",
        title: product.title,
        description,
        images: [imageUrl],
      },
    };
  } catch {
    return {
      title: "Product",
      description: "Product details.",
    };
  }
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  let jsonLd: Record<string, unknown> | null = null;
  try {
    const product = await fetchProductById(id);
    const siteBase = await getSiteBaseUrl();
    jsonLd = buildProductJsonLd(product, siteBase);
  } catch {
    jsonLd = null;
  }

  return (
    <StoreShell>
      {jsonLd ? <JsonLd data={jsonLd} /> : null}
      <div className="mx-auto max-w-4xl px-4 py-8 md:py-12">
        <ProductDetail id={id} />
      </div>
    </StoreShell>
  );
}
