/** Convert DD-MM-YYYY → timestamp for sorting */
export function parseDateToTimestamp(date) {
  if (!date) return 0;
  const [dd, mm, yyyy] = date.split("-").map(Number);
  return new Date(yyyy, mm - 1, dd).getTime();
}

/** Convert ISO date → readable IST time */
export function formatISTTime(isoString) {
  if (!isoString) return "-";
  return new Date(isoString).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
