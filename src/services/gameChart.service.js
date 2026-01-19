/**
 * Service to handle Game Chart Data
 * 🔥 OPTIMIZATION: 
 * The backend now sends data pre-sorted and pre-grouped.
 * We skip heavy client-side processing to unblock the UI thread.
 */

export function normalizeGameChartData(rawData = []) {
  // If backend sends null/undefined, return empty array
  if (!Array.isArray(rawData)) return [];

  // Pass-through: Trust the backend's sort order (Timestamp based)
  // This removes the O(N) loop and string parsing overhead.
  return rawData;
}