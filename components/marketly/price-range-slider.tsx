"use client";

import { Label, Slider, cn } from "@heroui/react";

type Props = {
  /** Min/max prices in the current listing (before price filter). */
  minBound: number;
  maxBound: number;
  /** Selected range endpoints (USD). */
  valueMin: number;
  valueMax: number;
  onChange: (min: number, max: number) => void;
  disabled?: boolean;
  className?: string;
};

export function PriceRangeSlider({
  minBound,
  maxBound,
  valueMin,
  valueMax,
  onChange,
  disabled,
  className,
}: Props) {
  const lo = Math.min(valueMin, valueMax);
  const hi = Math.max(valueMin, valueMax);

  if (
    disabled ||
    !Number.isFinite(minBound) ||
    !Number.isFinite(maxBound) ||
    Number.isNaN(minBound) ||
    Number.isNaN(maxBound)
  ) {
    return (
      <p className="text-muted-foreground max-w-xl text-sm">
        Adjust category or search to set a price range.
      </p>
    );
  }

  const rangeWidth = maxBound - minBound;
  if (rangeWidth <= 0) {
    return (
      <p className="text-muted-foreground max-w-xl text-sm">
        All visible products are{" "}
        <span className="font-semibold text-zinc-700">
          ${minBound.toFixed(2)}
        </span>
        .
      </p>
    );
  }

  return (
    <Slider
      aria-label="Price range in USD"
      className={cn("w-full  max-w-xl", className)}
      formatOptions={{ currency: "USD", style: "currency" }}
      maxValue={maxBound}
      minValue={minBound}
      step={1}
      value={[lo, hi]}
      onChange={(next) => {
        const vals =
          typeof next === "number" ? [next, next] : Array.from(next as number[]);
        if (vals.length >= 2) {
          const a = vals[0] ?? lo;
          const b = vals[1] ?? hi;
          onChange(Math.min(a, b), Math.max(a, b));
        }
      }}
    >
      <Label>Price range (USD)</Label>
      <Slider.Output />
      <Slider.Track className="h-2">
        {({ state }) => (
          <>
            <Slider.Fill />
            {state.values.map((_, i) => (
              <Slider.Thumb key={i} index={i} />
            ))}
          </>
        )}
      </Slider.Track>
    </Slider>
  );
}
