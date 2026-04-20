import type { Metadata } from "next";
import Link from "next/link";
import { CategoryCatalog } from "@/components/category-catalog";
import { MegaMartHeader } from "@/components/home/megamart-header";
import { SiteFooter } from "@/components/home/site-footer";
import { formatCategoryLabel } from "@/lib/format-category";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const label = formatCategoryLabel(decodeURIComponent(slug));
  return { title: `${label} | MegaMart` };
}

export default async function CategoryPage({ params }: Props) {
  const { slug: raw } = await params;
  const slug = decodeURIComponent(raw);
  const label = formatCategoryLabel(slug);

  return (
    <div className="bg-background text-foreground flex min-h-full flex-col">
      <MegaMartHeader />
      <main className="flex-1 bg-mm-surface/40">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <Link
            href="/"
            className="text-sm font-medium text-mm-primary hover:underline"
          >
            ← Home
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-zinc-900">{label}</h1>
          <p className="mt-1 text-sm text-zinc-600">
            Products from Fake Store in this category.
          </p>
          <div className="mt-8">
            <CategoryCatalog slug={slug} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
