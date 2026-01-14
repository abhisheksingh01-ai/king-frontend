/**
 * Convert DD-MM-YYYY → timestamp
 * Used for fast sorting
 */
export function parseDateToTimestamp(date) {
  const [dd, mm, yyyy] = date.split("-").map(Number);
  return new Date(yyyy, mm - 1, dd).getTime();
}
