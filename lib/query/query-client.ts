import { QueryClient } from "@tanstack/react-query";
import { ApiError } from "@/lib/api/errors";

/** Defaults tuned for product UI: reduce accidental refetch storms; tune per-query where needed. */
export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        gcTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => {
          if (error instanceof ApiError && error.status != null) {
            if (
              error.status >= 400 &&
              error.status < 500 &&
              error.status !== 408
            ) {
              return false;
            }
          }
          return failureCount < 2;
        },
      },
      mutations: {
        retry: false,
      },
    },
  });
}
