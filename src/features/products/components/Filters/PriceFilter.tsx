"use client";

import { Button } from "@heroui/react";
import { PriceRangeSlider } from "@/features/products/components/Filters/PriceRangeSlider";

type Bounds = { min: number; max: number };

type Props = {
  priceBounds: Bounds;
  priceMin: number;
  priceMax: number;
  onPriceChange: (min: number, max: number) => void;
  onResetPrice: () => void;
  listingEmpty: boolean;
  sliderClassName?: string;
};

export function PriceFilter({
  priceBounds,
  priceMin,
  priceMax,
  onPriceChange,
  onResetPrice,
  listingEmpty,
  sliderClassName,
}: Props) {
  return (
    <section aria-labelledby="filter-price-label" className="space-y-3">
      <p
        id="filter-price-label"
        className="text-xs font-semibold uppercase tracking-wide text-zinc-500"
      >
        Price
      </p>
      <PriceRangeSlider
        className={sliderClassName}
        minBound={priceBounds.min}
        maxBound={priceBounds.max}
        valueMin={priceMin}
        valueMax={priceMax}
        disabled={listingEmpty}
        onChange={onPriceChange}
      />
      <Button
        variant="outline"
        size="sm"
        className="w-full border-zinc-200"
        isDisabled={listingEmpty}
        onPress={onResetPrice}
      >
        Reset price range
      </Button>
      <p className="text-xs leading-relaxed text-zinc-400">
        Visible listing ${priceBounds.min.toFixed(2)} – $
        {priceBounds.max.toFixed(2)}. Filters apply on this page only.
      </p>
    </section>
  );
}
