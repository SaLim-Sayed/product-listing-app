"use client";

import Image from "next/image";
import Link from "next/link";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { formatCategoryLabel } from "@/lib/format-category";
import { safeImageSrc } from "@/lib/image-url";
import type { Product } from "@/lib/types/product";

type Props = {
  slugs: string[] | undefined;
  products: Product[] | undefined;
  activeSlug?: string;
};

export function CategoryCircles({
  slugs,
  products,
  activeSlug = "electronics",
}: Props) {
  const list = slugs?.length ? slugs : ["electronics", "jewelery"];

  return (
    <Swiper
      className="category-swiper !px-1"
      modules={[FreeMode]}
      slidesPerView="auto"
      spaceBetween={16}
      freeMode={{ enabled: true, momentum: true }}
    >
      {list.map((slug) => {
        const cover = products?.find((p) => p.category === slug);
        const label = formatCategoryLabel(slug);
        const active = slug === activeSlug;

        return (
          <SwiperSlide key={slug} className="!w-auto">
            <Link
              href={`/category/${encodeURIComponent(slug)}`}
              className="flex w-[76px] flex-col items-center gap-2 text-center md:w-auto md:min-w-[88px]"
            >
              <span
                className={`bg-card flex size-16 items-center justify-center overflow-hidden rounded-full border-2 shadow-sm md:size-20 ${
                  active
                    ? "border-mm-primary ring-2 ring-mm-primary/25"
                    : "border-zinc-100 hover:border-mm-primary/50"
                }`}
              >
                {cover ? (
                  <Image
                    src={safeImageSrc(cover.image)}
                    alt=""
                    width={72}
                    height={72}
                    className="object-contain p-1.5"
                    unoptimized
                  />
                ) : (
                  <span className="text-[10px] font-medium text-zinc-400">
                    {label.slice(0, 2)}
                  </span>
                )}
              </span>
              <span className="max-w-[88px] text-[11px] font-medium leading-tight text-zinc-800 md:text-xs">
                {label}
              </span>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
