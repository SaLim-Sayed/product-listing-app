"use client";

import { Alert, Button } from "@heroui/react";
import Link from "next/link";
import { useEffect } from "react";
import { Container } from "@/features/products/components/Container";

export default function ProductDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Product Detail Error Boundary:", error);
  }, [error]);

  return (
    <div className="py-12">
      <Container>
        <div className="mx-auto max-w-2xl">
          <Alert
            status="danger"
            className="rounded-2xl border-rose-100 bg-rose-50/30"
          >
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title className="text-lg font-bold text-rose-900">
                Product details failed to load
              </Alert.Title>
              <Alert.Description className="mt-1 text-rose-700/80">
                We couldn&apos;t retrieve the details for this item. It might be
                temporarily unavailable.
              </Alert.Description>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  variant="danger"
                  size="sm"
                  className="font-semibold"
                  onPress={() => reset()}
                >
                  Retry loading
                </Button>
                <Link href="/shop">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-white font-semibold text-zinc-900"
                  >
                    Back to Shop
                  </Button>
                </Link>
              </div>
            </Alert.Content>
          </Alert>
        </div>
      </Container>
    </div>
  );
}
