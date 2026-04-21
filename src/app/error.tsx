"use client";

import { Alert, Button } from "@heroui/react";
import { useEffect } from "react";
import { BiRefresh } from "react-icons/bi";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Error Boundary caught:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Alert
          status="danger"
          className="rounded-2xl border-2 border-rose-100 shadow-xl"
        >
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title className="text-xl font-bold text-rose-900">
              Something went wrong
            </Alert.Title>
            <Alert.Description className="mt-2 text-rose-700/80">
              We encountered an unexpected error while rendering this page.
              Our team has been notified.
            </Alert.Description>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                variant="primary"
                onPress={() => reset()}
                className="bg-rose-600 font-semibold text-white shadow-lg hover:bg-rose-700"
              >
                <BiRefresh className="mr-2 size-5" />
                Try again
              </Button>
              <Button
                variant="ghost"
                onPress={() => (window.location.href = "/")}
                className="border-rose-200 text-rose-600 hover:bg-rose-50"
              >
                Go to Homepage
              </Button>
            </div>
            {process.env.NODE_ENV === "development" && (
              <div className="mt-6 rounded-lg bg-rose-50/50 p-3 text-xs font-mono text-rose-800 border border-rose-100">
                {error.message}
              </div>
            )}
          </Alert.Content>
        </Alert>
      </div>
    </div>
  );
}
