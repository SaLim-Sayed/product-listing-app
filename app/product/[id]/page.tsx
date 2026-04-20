import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { MarketlyProductShell } from "@/components/marketly/marketly-product-shell";
import { ProductDetail } from "@/components/product-detail";
import { fetchProductById } from "@/lib/api/products";
import { getSiteBaseUrl } from "@/lib/seo/get-site-base-url";
import { buildProductJsonLd } from "@/lib/seo/product-jsonld";

type Props = {
  params: Promise<{ id: string }>;
};

/** App Router SEO: use `generateMetadata` / `metadata` exports (Pages Router used `next/head`). */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const product = await fetchProductById(id);
    const description = product.description.slice(0, 160);
    return {
      title: product.title,
      description,
      openGraph: {
        title: product.title,
        description,
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
    <MarketlyProductShell>
      {jsonLd ? <JsonLd data={jsonLd} /> : null}
      <div className="mx-auto max-w-4xl px-4 py-8 md:py-12">
        <ProductDetail id={id} />
      </div>
    </MarketlyProductShell>
  );
}
