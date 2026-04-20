"use client";

import Link from "next/link";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const brands = [
  {
    name: "iPhone",
    tint: "bg-zinc-200/90",
    accent: "text-zinc-900",
    href: "/category/electronics",
  },
  {
    name: "Realme",
    tint: "bg-amber-100/90",
    accent: "text-amber-950",
    href: "/category/electronics",
  },
  {
    name: "Xiaomi",
    tint: "bg-orange-100/90",
    accent: "text-orange-950",
    href: "/category/electronics",
  },
] as const;

export function BrandBanners() {
  return (
    <Swiper
      className="brand-swiper -mx-1"
      modules={[FreeMode]}
      spaceBetween={16}
      slidesPerView={1.08}
      centeredSlides={false}
      freeMode={{ enabled: true, momentum: true }}
      breakpoints={{
        768: {
          slidesPerView: 3,
          spaceBetween: 16,
          freeMode: false,
        },
      }}
    >
      {brands.map((b) => (
        <SwiperSlide key={b.name}>
          <Link
            href={b.href}
            className={`relative flex min-h-[120px] flex-col justify-center overflow-hidden rounded-2xl p-6 shadow-sm ring-1 ring-black/5 transition hover:shadow-md ${b.tint}`}
          >
            <p className={`text-2xl font-bold ${b.accent}`}>{b.name}</p>
            <p className="mt-1 text-sm font-semibold text-mm-primary">
              UP TO 80% OFF
            </p>
            <span
              className={`pointer-events-none absolute -right-4 -bottom-6 text-7xl font-black opacity-10 ${b.accent}`}
              aria-hidden
            >
              {b.name[0]}
            </span>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
