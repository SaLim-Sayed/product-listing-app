"use client";

import Link from "next/link";
import {
  Alert,
  Button,
  Skeleton,
  buttonVariants,
  cn,
} from "@heroui/react";
import type { CategoryChip } from "@/features/products/types";
import { shopCatalogHref } from "@/lib/nav/shop-path";

type Props = {
  chips: CategoryChip[];
  isCategoryRoute: boolean;
  categorySlug?: string;
  homeSelectedSlug: string | null;
  onHomeCategorySelect: (slug: string | null) => void;
  categoriesLoading: boolean;
  categoriesError: Error | null;
  afterNavigate?: () => void;
};

export function CategoryFilter({
  chips,
  isCategoryRoute,
  categorySlug,
  homeSelectedSlug,
  onHomeCategorySelect,
  categoriesLoading,
  categoriesError,
  afterNavigate,
}: Props) {
  const chipActive = (chip: CategoryChip) => {
    if (isCategoryRoute) {
      if (chip.filterSlug === null) return false;
      return chip.filterSlug === categorySlug;
    }
    if (chip.filterSlug === null) return homeSelectedSlug === null;
    return chip.filterSlug === homeSelectedSlug;
  };

  if (categoriesError) {
    return (
      <Alert status="danger">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Could not load categories</Alert.Title>
          <Alert.Description>{categoriesError.message}</Alert.Description>
        </Alert.Content>
      </Alert>
    );
  }

  if (categoriesLoading) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {chips.map((chip) => {
        const active = chipActive(chip);

        if (isCategoryRoute) {
          const href = shopCatalogHref(chip.filterSlug);
          return (
            <li key={chip.id}>
              <Link
                href={href}
                onClick={() => afterNavigate?.()}
                className={cn(
                  buttonVariants({
                    size: "sm",
                    variant: active ? "primary" : "outline",
                  }),
                  "w-full justify-start rounded-lg shadow-sm",
                  !active &&
                    "border-zinc-200 bg-white font-medium text-zinc-700",
                )}
              >
                {chip.label}
              </Link>
            </li>
          );
        }

        return (
          <li key={chip.id}>
            <Button
              size="sm"
              variant={active ? "primary" : "outline"}
              className={cn(
                "w-full justify-start rounded-lg shadow-sm",
                active
                  ? ""
                  : "border-zinc-200 bg-white font-medium text-zinc-700",
              )}
              onPress={() => {
                onHomeCategorySelect(chip.filterSlug);
                afterNavigate?.();
              }}
            >
              {chip.label}
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
