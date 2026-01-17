import { parseDateToTimestamp, formatISTTime } from "../utils/date.utils";

/**
 * Normalize backend data into table-ready rows
 * Supports new nested 'games' structure
 */
export function normalizeGameChartData(rawData = [], columns = []) {
  const map = Object.create(null);

  function getOrCreateRow(date) {
    if (!map[date]) {
      map[date] = {
        date,
        games: {},
        // Convert DD-MM-YYYY to a proper timestamp for stable sorting
        timestamp: parseDateToTimestamp(date) || 0,
      };
    }
    return map[date];
  }

  for (const { date, games } of rawData) {
    if (!date || !games) continue;
    const row = getOrCreateRow(date);

    for (const col of columns) {
      const game = games[col];
      if (game) {
        row.games[col] = {
          result: game.result,
          createdAt: game.createdAt,
          timestamp: game.timestamp,
          timeIST: formatISTTime(game.createdAt),
        };
      }
    }
  }

  // FIXED: Sort rows strictly by the row's date timestamp (01-01, 02-01, etc.)
  return Object.values(map).sort((a, b) => a.timestamp - b.timestamp);
}