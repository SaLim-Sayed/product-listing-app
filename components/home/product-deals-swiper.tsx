"use client";

import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProductDealCard } from "@/components/home/product-deal-card";
import type { Product } from "@/lib/types/product";

type Props = {
  products: Product[];
  loading: boolean;
};

export function ProductDealsSwiper({ products, loading }: Props) {
  if (loading) {
    return (
      <Swiper
        className="deal-swiper -mx-4 px-4 pb-1"
        modules={[FreeMode]}
        slidesPerView="auto"
        spaceBetween={12}
        freeMode={{ enabled: true, momentum: true }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <SwiperSlide key={i} className="!w-[160px] md:!w-[180px]">
            <div className="h-[260px] animate-pulse rounded-lg bg-zinc-200" />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }

  return (
    <Swiper
      className="deal-swiper -mx-4 px-4 pb-1"
      modules={[FreeMode]}
      slidesPerView="auto"
      spaceBetween={12}
      freeMode={{ enabled: true, momentum: true }}
    >
      {products.map((p) => (
        <SwiperSlide key={p.id} className="!w-[160px] md:!w-[180px]">
          <ProductDealCard product={p} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
