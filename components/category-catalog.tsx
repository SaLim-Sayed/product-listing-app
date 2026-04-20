"use client";

import { Alert, Button, Card, Spinner } from "@heroui/react";
import Link from "next/link";
import { productDetailPath } from "@/lib/nav/product-path";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { isApiError } from "@/lib/api/errors";
import { ProductThumb } from "@/components/product-thumb";
import { formatCategoryLabel } from "@/lib/format-category";
import { useCategoryProducts } from "@/lib/query/hooks/use-category-products";

type Props = {
  slug: string;
};

export function CategoryCatalog({ slug }: Props) {
  const { data, isPending, isError, error, refetch } =
    useCategoryProducts(slug);

  const title = formatCategoryLabel(slug);

  if (isPending) {
    return (
      <div className="text-muted-foreground flex items-center gap-2 text-sm">
        <Spinner size="sm" />
        <span>Loading {title.toLowerCase()}…</span>
      </div>
    );
  }

  if (isError) {
    const status = isApiError(error) ? error.status : undefined;
    return (
      <Alert status="danger">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Could not load category</Alert.Title>
          <Alert.Description>
            {error.message}
            {status ? (
              <span className="mt-1 block font-mono text-xs">HTTP {status}</span>
            ) : null}
          </Alert.Description>
          <Button
            variant="danger"
            className="mt-4"
            onPress={() => refetch()}
          >
            Retry
          </Button>
        </Alert.Content>
      </Alert>
    );
  }

  return (
    <Swiper
      className="category-catalog-swiper -mx-1"
      modules={[FreeMode]}
      spaceBetween={12}
      slidesPerView={1.06}
      freeMode={{ enabled: true, momentum: true }}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 12,
          freeMode: false,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 16,
          freeMode: false,
        },
      }}
    >
      {data.map((p) => (
        <SwiperSlide key={p.id}>
          <Link href={productDetailPath(p.id)} className="block">
            <Card className="flex gap-3 rounded-xl border border-zinc-200 p-3 shadow-sm transition hover:border-mm-primary/40 hover:shadow-md">
              <ProductThumb src={p.image} alt={p.title} />
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-sm font-medium text-zinc-900">
                  {p.title}
                </p>
                <p className="text-mm-primary mt-1 text-sm font-semibold">
                  ${p.price.toFixed(2)}
                </p>
              </div>
            </Card>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
