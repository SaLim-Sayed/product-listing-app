import type { Metadata } from "next";
import { ProductDetail } from "@/components/product-detail";
import { fetchProductById } from "@/lib/api/products";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const product = await fetchProductById(id);
    return {
      title: product.title,
      description: product.description.slice(0, 160),
    };
  } catch {
    return { title: "Product" };
  }
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-4 py-12 dark:bg-black md:py-16">
      <main className="w-full max-w-4xl">
        <ProductDetail id={id} />
      </main>
    </div>
  );
}
