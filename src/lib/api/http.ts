import type { AxiosRequestConfig } from "axios";
import { apiClient } from "@/lib/api/client";
import { toApiError } from "@/lib/api/errors";

/** Typed GET with centralized error mapping — use this from resource modules instead of raw `apiClient`. */
export async function apiGet<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  try {
    const { data } = await apiClient.get<T>(url, config);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}
