import type { Metadata } from "next";
import { MarketlyShopLayout } from "@/components/marketly/marketly-shop-layout";
import { formatCategoryLabel } from "@/lib/format-category";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const label = formatCategoryLabel(decodeURIComponent(slug));
  return { title: `${label} | Marketly` };
}

export default async function CategoryPage({ params }: Props) {
  const { slug: raw } = await params;
  const slug = decodeURIComponent(raw);

  return <MarketlyShopLayout categorySlug={slug} />;
}
