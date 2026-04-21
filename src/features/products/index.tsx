"use client";

import { MarketlyFooter } from "@/components/ui/footer";
import { Container } from "@/features/products/components/Container";
import { CategoryFilter } from "@/features/products/components/Filters/CategoryFilter";
import { PriceFilter } from "@/features/products/components/Filters/PriceFilter";
import { ProductGrid } from "@/features/products/components/ProductGrid";
import {
  useCategories,
  useCategoryProducts,
  useFilters,
  useProducts,
} from "@/features/products/hooks";
import {
  Alert,
  Button,
  Drawer,
  InputGroup,
  Spinner,
  useOverlayState,
} from "@heroui/react";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiFilterAlt, BiSearch } from "react-icons/bi";

export default function Products() {
  const searchParams = useSearchParams();
  const categorySlug = useMemo(() => {
    const raw = searchParams.get("category");
    if (raw == null || raw.trim() === "") return undefined;
    return raw.trim();
  }, [searchParams]);

  const isCategoryRoute = categorySlug !== undefined;

  const categoriesQuery = useCategories();
  const allQuery = useProducts();
  const categoryQuery = useCategoryProducts(
    isCategoryRoute ? categorySlug : undefined,
  );

  const productsQuery = isCategoryRoute ? categoryQuery : allQuery;
  const { data, isPending, isError, error, refetch } = productsQuery;

  const filters = useFilters({
    products: data,
    categorySlugs: categoriesQuery.data ?? [],
    isCategoryRoute,
  });

  const filterDrawer = useOverlayState();

  const filtersBody = (opts?: { afterCategoryNavigate?: () => void }) => (
    <div className="space-y-8">
      <section aria-labelledby="filter-search-label">
        <p
          id="filter-search-label"
          className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500"
        >
          Search
        </p>
        <InputGroup.Root
          fullWidth
          className="rounded-xl border border-zinc-200 bg-zinc-50/80 shadow-inner"
        >
          <InputGroup.Prefix className="pl-3 text-zinc-400">
            <BiSearch />
          </InputGroup.Prefix>
          <InputGroup.Input
            aria-label="Search products"
            placeholder="Search title or description…"
            value={filters.searchQuery}
            onChange={(e) => filters.setSearchQuery(e.target.value)}
            className="bg-transparent py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400"
          />
        </InputGroup.Root>
      </section>

      <section aria-labelledby="filter-category-label">
        <p
          id="filter-category-label"
          className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500"
        >
          Category
        </p>
        <CategoryFilter
          chips={filters.chips}
          isCategoryRoute={isCategoryRoute}
          categorySlug={categorySlug}
          homeSelectedSlug={filters.homeSelectedSlug}
          onHomeCategorySelect={filters.setHomeSelectedSlug}
          categoriesLoading={categoriesQuery.isPending}
          categoriesError={
            categoriesQuery.isError ? categoriesQuery.error : null
          }
          afterNavigate={opts?.afterCategoryNavigate}
        />
      </section>

      <PriceFilter
        priceBounds={filters.priceBounds}
        priceMin={filters.priceMin}
        priceMax={filters.priceMax}
        onPriceChange={(min, max) => {
          filters.setPriceMin(min);
          filters.setPriceMax(max);
        }}
        onResetPrice={() => {
          filters.setPriceMin(filters.priceBounds.min);
          filters.setPriceMax(filters.priceBounds.max);
        }}
        listingEmpty={filters.searchAndCategoryList.length === 0}
        sliderClassName="max-w-none"
      />
    </div>
  );

  return (
    <div className="bg-marketly-page text-foreground flex min-h-full flex-col">
 
      <Drawer state={filterDrawer}>
        <Drawer.Backdrop isDismissable>
          <Drawer.Content placement="bottom">
            <Drawer.Dialog className="flex max-h-[88dvh] max-w-full flex-col rounded-t-2xl bg-white pb-[env(safe-area-inset-bottom)]">
              <Drawer.Header className="shrink-0 border-b border-zinc-200 px-4 pb-3 pt-4">
                <div className="flex items-center justify-between gap-3">
                  <Drawer.Heading className="text-lg font-bold text-zinc-900">
                    Filters
                  </Drawer.Heading>
                  <Drawer.CloseTrigger className="shrink-0 text-zinc-500" />
                </div>
              </Drawer.Header>
              <Drawer.Body className="min-h-0 flex-1 overflow-y-auto px-4 pt-4">
                {filtersBody({
                  afterCategoryNavigate: () => filterDrawer.close(),
                })}
              </Drawer.Body>
              <Drawer.Footer className="shrink-0 border-t border-zinc-200 px-4 pb-5 pt-3">
                <Button
                  variant="primary"
                  className="w-full font-semibold"
                  onPress={() => filterDrawer.close()}
                >
                  Show results
                </Button>
              </Drawer.Footer>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>

      <div className="flex flex-1 flex-col lg:flex-row lg:items-start">
        <aside
          className="hidden w-full shrink-0 border-zinc-200 bg-white lg:block lg:sticky lg:top-14 lg:z-30 lg:max-h-[calc(100vh-3.5rem)] lg:w-72 lg:overflow-y-auto lg:border-r xl:w-80"
          aria-labelledby="shop-filters-heading"
        >
          <div className="w-full space-y-8 p-4 lg:p-6">
            <h2
              id="shop-filters-heading"
              className="text-sm font-bold uppercase tracking-wide text-zinc-500"
            >
              Filters
            </h2>
            {filtersBody()}
          </div>
        </aside>

        <main className="min-w-0 flex-1 py-6 lg:py-8">
          <Container>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 lg:hidden">
              <p className="text-sm text-zinc-600">
                <span className="font-semibold tabular-nums text-zinc-900">
                  {filters.filtered.length}
                </span>{" "}
                {filters.filtered.length === 1 ? "product" : "products"}
              </p>
              <Button
                variant="primary"
                size="sm"
                className="shrink-0 gap-2 font-semibold"
                onPress={() => filterDrawer.open()}
              >
                Filters
                <BiFilterAlt />
              </Button>
            </div>

            {isPending ? (
              <div className="text-muted-foreground flex justify-center gap-2 py-20 text-sm">
                <Spinner size="md" />
                <span>Loading products…</span>
              </div>
            ) : null}

            {isError ? (
              <Alert status="danger" className="max-w-lg">
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Title>Could not load products</Alert.Title>
                  <Alert.Description>{error.message}</Alert.Description>
                  <Button
                    variant="danger"
                    size="sm"
                    className="mt-3"
                    onPress={() => refetch()}
                  >
                    Retry
                  </Button>
                </Alert.Content>
              </Alert>
            ) : null}

            {!isPending && !isError && filters.filtered.length === 0 ? (
              <p className="text-center text-sm text-zinc-500">
                No products match your filters.
              </p>
            ) : null}

            {!isPending && !isError && filters.filtered.length > 0 ? (
              <ProductGrid products={filters.filtered} />
            ) : null}
          </Container>
        </main>
      </div>

      <MarketlyFooter />
    </div>
  );
}
