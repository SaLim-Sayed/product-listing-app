"use client";

import { MarketlyFooter } from "@/components/ui/footer";
import { Container } from "@/features/products/components/Container";
import { ProductGrid } from "@/features/products/components/ProductGrid";
import { FiltersBody } from "@/features/products/components/Filters/FiltersBody";
import { useProductsListing } from "./useProductsListing";
import { Alert, Button, Drawer } from "@heroui/react";
import { BiFilterAlt } from "react-icons/bi";

export default function Products() {
  const logic = useProductsListing();
  const { filters, filterDrawer, productsQuery } = logic;
  const { isPending, isError, error, refetch } = productsQuery;

  return (
    <div className="app-shell">
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
                <FiltersBody
                  logic={logic}
                  afterCategoryNavigate={() => filterDrawer.close()}
                />
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
            <FiltersBody logic={logic} />
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

            {isError ? (
              <Alert status="danger" className="max-w-lg">
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Title>Could not load products</Alert.Title>
                  <Alert.Description>{error?.message}</Alert.Description>
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
            ) : (
              <ProductGrid products={filters.filtered} isLoading={isPending} />
            )}
          </Container>
        </main>
      </div>

      <MarketlyFooter />
    </div>
  );
}
