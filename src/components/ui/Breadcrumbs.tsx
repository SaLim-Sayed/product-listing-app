"use client";

import { Breadcrumbs as HeroBreadcrumbs } from "@heroui/react";
import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type Props = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: Props) {
  return (
    <HeroBreadcrumbs className="mb-6">
      {items.map((item, index) => (
        <HeroBreadcrumbs.Item
          key={index}
          href={item.href}
          className="text-zinc-500 hover:text-violet-600 transition-colors data-[current=true]:text-zinc-900 data-[current=true]:font-semibold"
        >
          {item.href ? (
            <Link href={item.href}>{item.label}</Link>
          ) : (
            item.label
          )}
        </HeroBreadcrumbs.Item>
      ))}
    </HeroBreadcrumbs>
  );
}
