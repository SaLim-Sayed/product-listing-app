"use client";

import { Alert, Button } from "@heroui/react";
import { useEffect } from "react";
import { Container } from "@/features/products/components/Container";

export default function ShopError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Shop Error Boundary:", error);
  }, [error]);

  return (
    <div className="py-12">
      <Container>
        <Alert
          status="danger"
          className="rounded-2xl border-rose-100 bg-rose-50/30"
        >
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title className="text-lg font-bold text-rose-900">
              Catalog unavailable
            </Alert.Title>
            <Alert.Description className="mt-1 text-rose-700/80">
              We had some trouble loading the product list. This could be a
              temporary connection issue.
            </Alert.Description>
            <Button
              variant="danger"
              size="sm"
              className="mt-4 font-semibold"
              onPress={() => reset()}
            >
              Try to reload catalog
            </Button>
          </Alert.Content>
        </Alert>
      </Container>
    </div>
  );
}
