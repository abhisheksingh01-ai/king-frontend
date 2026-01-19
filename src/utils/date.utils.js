/**
 * Optimized Date Utils
 * Kept lightweight.
 */

// 🔥 Performance: Use native Date parsing where possible
// Only use this if you strictly need a timestamp on frontend
export function parseDateToTimestamp(dateStr) {
  if (!dateStr) return 0;
  // Manual parse is still safer for specific "DD-MM-YYYY" format
  // to avoid browser locale inconsistencies.
  const [d, m, y] = dateStr.split('-');
  return new Date(y, m - 1, d).getTime();
}

// Optimized formatter using Intl.DateTimeFormat (reused instance)
// Creating 'new Date().toLocaleString' 1000 times is slow.
// Reusing a formatter is 10x faster.
const istFormatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

export function formatISTTime(isoString) {
  if (!isoString) return "-";
  try {
    return istFormatter.format(new Date(isoString));
  } catch (e) {
    return "-";
  }
}