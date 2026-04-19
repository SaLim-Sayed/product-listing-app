import axios from "axios";
import { getPublicApiBaseUrl } from "@/lib/env/public";

export const apiClient = axios.create({
  baseURL: getPublicApiBaseUrl(),
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 30_000,
});
