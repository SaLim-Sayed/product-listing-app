"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
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
      <p className="text-sm text-zinc-500">Loading {title.toLowerCase()}…</p>
    );
  }

  if (isError) {
    const status = isApiError(error) ? error.status : undefined;
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-900">
        <p className="font-medium">Could not load category</p>
        <p className="mt-2 text-sm">{error.message}</p>
        {status ? (
          <p className="mt-1 font-mono text-xs">HTTP {status}</p>
        ) : null}
        <Button
          variant="danger"
          className="mt-4"
          onPress={() => refetch()}
        >
          Retry
        </Button>
      </div>
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
          <Link
            href={`/products/${p.id}`}
            className="bg-card flex gap-3 rounded-xl border border-zinc-200 p-3 shadow-sm transition hover:border-mm-primary/40 hover:shadow-md"
          >
            <ProductThumb src={p.image} alt={p.title} />
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-sm font-medium text-zinc-900">
                {p.title}
              </p>
              <p className="mt-1 text-sm font-semibold text-mm-primary">
                ${p.price.toFixed(2)}
              </p>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
