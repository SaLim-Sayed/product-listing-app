"use client";

import { Text } from "@heroui/react";
import Link from "next/link";

type Props = {
  title: string;
  href?: string;
  viewAllLabel?: string;
  id?: string;
};

export function SectionHeading({
  title,
  href,
  viewAllLabel = "View All",
  id,
}: Props) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <Text
        id={id}
        elementType="h2"
        size="lg"
        className="font-semibold tracking-tight text-zinc-900 md:text-xl"
      >
        {title}
      </Text>
      {href ? (
        <Link
          href={href}
          className="text-mm-primary hover:text-mm-primary-dark shrink-0 text-sm font-semibold"
        >
          {viewAllLabel} ›
        </Link>
      ) : null}
    </div>
  );
}
