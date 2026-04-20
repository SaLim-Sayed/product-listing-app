"use client";

import { Card } from "@heroui/react";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { BrandBanners } from "@/components/home/brand-banners";
import { CategoryCircles } from "@/components/home/category-circles";
import { EssentialsGrid } from "@/components/home/essentials-grid";
import { MegaMartHeader } from "@/components/home/megamart-header";
import { ProductDealsSwiper } from "@/components/home/product-deals-swiper";
import { SectionHeading } from "@/components/home/section-heading";
import { SiteFooter } from "@/components/home/site-footer";
import { useCategories } from "@/lib/query/hooks/use-categories";
import { useCategoryProducts } from "@/lib/query/hooks/use-category-products";
import { useProducts } from "@/lib/query/hooks/use-products";

export function HomeScreen() {
  const { data: allProducts } = useProducts();
  const { data: categories } = useCategories();
  const { data: electronics, isPending: electronicsPending } =
    useCategoryProducts("electronics");

  const spotlight =
    electronics?.[0] != null
      ? { image: electronics[0].image, title: electronics[0].title }
      : null;

  const phoneDeals = electronics?.slice(0, 8) ?? [];

  return (
    <div className="bg-background text-foreground flex min-h-full flex-col">
      <MegaMartHeader />

      <main className="flex-1 bg-mm-surface/40">
        <div className="mx-auto max-w-6xl space-y-10 px-4 py-6 md:space-y-12 md:py-10">
          <HeroCarousel spotlight={spotlight} />

          <section id="section-smartphones" aria-labelledby="deals-heading">
            <SectionHeading
              id="deals-heading"
              title="Grab the best deal on Smartphones"
              href="/category/electronics"
            />
            <ProductDealsSwiper
              products={phoneDeals}
              loading={electronicsPending}
            />
          </section>

          <section aria-labelledby="categories-heading">
            <SectionHeading
              id="categories-heading"
              title="Shop From Top Categories"
              href="/"
            />
            <Card className="rounded-2xl border border-zinc-200 p-4 shadow-sm md:p-6">
              <CategoryCircles
                slugs={categories}
                products={allProducts}
                activeSlug="electronics"
              />
            </Card>
          </section>

          <section aria-labelledby="brands-heading">
            <SectionHeading
              id="brands-heading"
              title="Top Electronics Brands"
              href="/category/electronics"
            />
            <BrandBanners />
          </section>

          <section aria-labelledby="essentials-heading">
            <SectionHeading
              id="essentials-heading"
              title="Daily Essentials"
              href="/"
            />
            <EssentialsGrid slugs={categories} products={allProducts} />
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
