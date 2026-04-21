import type { AxiosRequestConfig } from "axios";
import { apiClient } from "@/lib/api/client";
import { toApiError } from "@/lib/api/errors";

export async function apiGet<T>(
  url: string,
  config?: AxiosRequestConfig,
  retries = 3,
): Promise<T> {
  try {
    const { data } = await apiClient.get<T>(url, config);
    return data;
  } catch (error: any) {
    const isNetworkError =
      error.code === "ECONNRESET" ||
      error.code === "ETIMEDOUT" ||
      !error.response;

    if (isNetworkError && retries > 0) {
      console.warn(`API: Retrying ${url} (${retries} left) due to ${error.code || "network error"}`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return apiGet<T>(url, config, retries - 1);
    }

    throw toApiError(error);
  }
}
