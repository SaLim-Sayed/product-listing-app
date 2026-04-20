"use client";

import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { safeImageSrc } from "@/lib/image-url";
import type { Product } from "@/lib/types/product";

const slides = [
  {
    eyebrow: "Best deal online on smart watches",
    title: "SMART WEARABLE.",
    sub: "UP TO 80% OFF",
    tone: "from-[#0a4d7a] to-[#063251]",
  },
  {
    eyebrow: "Premium electronics",
    title: "BIG TECH SALE",
    sub: "UP TO 60% OFF",
    tone: "from-[#0d5a8c] to-[#084466]",
  },
  {
    eyebrow: "Everyday essentials",
    title: "HOME & MORE",
    sub: "UP TO 50% OFF",
    tone: "from-[#085a8a] to-[#052f4a]",
  },
] as const;

type Props = {
  spotlight?: Pick<Product, "image" | "title"> | null;
};

export function HeroCarousel({ spotlight }: Props) {
  return (
    <Swiper
      className="hero-swiper overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5"
      modules={[Autoplay, Navigation, Pagination]}
      slidesPerView={1}
      loop
      speed={600}
      autoplay={{
        delay: 6000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      pagination={{ clickable: true }}
      navigation
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.title}>
          <div
            className={`relative grid min-h-[220px] gap-6 bg-gradient-to-br p-6 pb-14 text-white md:min-h-[280px] md:grid-cols-2 md:p-10 md:pb-16 ${slide.tone}`}
          >
            <div className="z-10 flex flex-col justify-center">
              <p className="text-xs font-medium uppercase tracking-widest text-white/80 md:text-sm">
                {slide.eyebrow}
              </p>
              <h2 className="mt-2 text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
                {slide.title}
              </h2>
              <p className="mt-3 text-lg font-semibold text-amber-300 md:text-xl">
                {slide.sub}
              </p>
            </div>
            <div className="relative z-10 flex items-center justify-center">
              {spotlight ? (
                <div className="relative mx-auto h-44 w-44 drop-shadow-2xl md:h-52 md:w-52">
                  <Image
                    src={safeImageSrc(spotlight.image)}
                    alt={spotlight.title}
                    fill
                    className="object-contain"
                    sizes="208px"
                    priority
                    unoptimized
                  />
                </div>
              ) : (
                <div className="flex h-40 w-40 items-center justify-center rounded-full bg-white/10 text-sm text-white/70 md:h-52 md:w-52">
                  Catalog
                </div>
              )}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
