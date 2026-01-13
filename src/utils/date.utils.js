export function parseDateToTimestamp(dateStr) {
  if (!dateStr) return 0;

  const [d, m, y] = dateStr.split("-").map(Number);
  const time = new Date(y, m - 1, d).getTime();

  return Number.isNaN(time) ? 0 : time;
}
