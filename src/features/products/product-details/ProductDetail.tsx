"use client";

import { Alert, Button, Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { AddToCartModal } from "@/components/ui/AddToCartModal/AddToCartModal";
import { RelatedProducts } from "@/features/products/components/RelatedProducts";
import { isApiError } from "@/lib/api/errors";
import { safeImageSrc } from "@/lib/image-url";
import { SHOP_PATH } from "@/lib/nav/shop-path";
import { ProductDetailSkeleton } from "./ProductDetailSkeleton";
import { useProductDetailLogic } from "./useProductDetailLogic";

const HERO = 400;

export function ProductDetail({ id }: { id: string }) {
  const {
    data,
    isPending,
    isError,
    error,
    refetch,
    imageFailed,
    showAddModal,
    handleImageError,
    openAddModal,
    closeAddModal,
  } = useProductDetailLogic(id);

  if (isPending) {
    return <ProductDetailSkeleton />;
  }

  if (isError) {
    const status = isApiError(error) ? error.status : undefined;
    const is404 = status === 404;

    return (
      <Alert status="danger">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>
            {is404 ? "Product not found" : "Could not load product"}
          </Alert.Title>
          <Alert.Description>{error?.message}</Alert.Description>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="danger" onPress={() => refetch()}>
              Retry
            </Button>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-200"
            >
              Back to home
            </Link>
          </div>
        </Alert.Content>
      </Alert>
    );
  }

  const p = data!;
  const src = safeImageSrc(p.image);

  return (
    <article className="space-y-8">
      <AddToCartModal
        product={showAddModal ? p : null}
        onClose={closeAddModal}
      />
      <Link
        href={SHOP_PATH}
        className="text-marketly-price inline-flex text-sm font-semibold underline-offset-4 hover:underline"
      >
        ← Back to catalog
      </Link>

      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-start">
        <div className="flex justify-center md:justify-start">
          <Card className="relative flex aspect-square w-full max-w-sm items-center justify-center overflow-hidden rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
            {imageFailed ? (
              <span className="text-muted-foreground text-sm">
                Image unavailable
              </span>
            ) : (
              <Image
                src={src}
                alt={p.title}
                width={HERO}
                height={HERO}
                sizes="(max-width: 768px) 100vw, 400px"
                className="max-h-full max-w-full object-contain"
                priority
                fetchPriority="high"
                unoptimized
                onError={handleImageError}
              />
            )}
          </Card>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            {p.category}
          </p>
          <h1 className="text-2xl font-semibold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50 md:text-3xl">
            {p.title}
          </h1>
          <p className="text-marketly-price text-3xl font-bold tabular-nums">
            ${p.price.toFixed(2)}
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            <span className="font-medium text-amber-600 dark:text-amber-400">
              ★ {p.rating.rate.toFixed(1)}
            </span>
            <span className="mx-1.5 text-zinc-400">·</span>
            {p.rating.count} reviews
          </p>
          <Button
            variant="primary"
            size="lg"
            className="mt-2 w-full max-w-xs font-semibold sm:w-auto"
            onPress={openAddModal}
          >
            Add to cart
          </Button>
          <div className="border-t border-zinc-200 pt-6 dark:border-zinc-800">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Description
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {p.description}
            </p>
          </div>
        </div>
      </div>

      <RelatedProducts categorySlug={p.category} excludeProductId={p.id} />
    </article>
  );
}
