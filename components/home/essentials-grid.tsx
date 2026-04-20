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
};

export function EssentialsGrid({ slugs, products }: Props) {
  const list = (slugs?.length ? slugs : ["electronics", "jewelery"]).slice(
    0,
    6,
  );

  return (
    <Swiper
      className="essentials-swiper -mx-1"
      modules={[FreeMode]}
      spaceBetween={12}
      slidesPerView={2.15}
      freeMode={{ enabled: true, momentum: true }}
      breakpoints={{
        640: { slidesPerView: 3.15, spaceBetween: 12 },
        768: { slidesPerView: 4.15, spaceBetween: 16 },
        1024: {
          slidesPerView: 6,
          spaceBetween: 16,
          freeMode: false,
        },
      }}
    >
      {list.map((slug) => {
        const cover = products?.find((p) => p.category === slug);
        const label = formatCategoryLabel(slug);

        return (
          <SwiperSlide key={slug}>
            <Link
              href={`/category/${encodeURIComponent(slug)}`}
              className="group bg-card flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200 shadow-sm transition hover:border-mm-primary/40 hover:shadow-md"
            >
              <div className="flex aspect-square items-center justify-center bg-mm-surface p-2">
                {cover ? (
                  <Image
                    src={safeImageSrc(cover.image)}
                    alt={label}
                    width={120}
                    height={120}
                    className="max-h-full max-w-full object-contain transition group-hover:scale-105"
                    unoptimized
                  />
                ) : (
                  <div className="text-xs text-zinc-400">{label}</div>
                )}
              </div>
              <div className="p-2 text-center">
                <p className="text-xs font-semibold text-zinc-900">{label}</p>
                <p className="text-[10px] font-bold text-mm-primary">
                  UP TO 50% OFF
                </p>
              </div>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
