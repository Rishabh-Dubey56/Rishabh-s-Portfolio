/* ============================================
   API Client Utility
   ============================================ */

import { API_BASE_URL } from "./constants";
import type { ApiResponse } from "@/types";

/**
 * Typed fetch wrapper for the backend API.
 * Will be used when the Express backend is running.
 */
export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const executeFetch = async (baseUrl: string) => {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      return {
        success: false as const,
        error: errorBody.error || `Request failed with status ${res.status}`,
      };
    }

    const data = await res.json();
    return { success: true as const, data };
  };

  try {
    return await executeFetch(API_BASE_URL);
  } catch (error) {
    // Graceful automatic port fallback if backend shifted to 3002
    if (API_BASE_URL.includes("3001")) {
      try {
        return await executeFetch("http://localhost:3002/api");
      } catch {
        // Fall through to error response
      }
    }

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred",
    };
  }
}
