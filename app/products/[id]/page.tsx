import type { Metadata } from "next";
import { ProductDetail } from "@/components/product-detail";
import { MegaMartHeader } from "@/components/home/megamart-header";
import { SiteFooter } from "@/components/home/site-footer";
import { fetchProductById } from "@/lib/api/products";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const product = await fetchProductById(id);
    return {
      title: `${product.title} | MegaMart`,
      description: product.description.slice(0, 160),
    };
  } catch {
    return { title: "Product | MegaMart" };
  }
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="bg-background text-foreground flex min-h-full flex-col">
      <MegaMartHeader />
      <main className="flex-1 bg-mm-surface/40">
        <div className="mx-auto max-w-4xl px-4 py-8 md:py-12">
          <ProductDetail id={id} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
