import { parseDateToTimestamp } from "../utils/date.utils";

/**
 * Normalize scrape + noida data into table-ready rows
 * Optimized for performance (single pass, minimal allocations)
 */
export function normalizeGameChartData(
  scrapeData = [],
  noidaData = [],
  columns,
  gameMap
) {
  const map = Object.create(null);

  // 🔥 Pre-build empty column structure ONCE
  const emptyColumns = {};
  for (const col of columns) emptyColumns[col] = "";

  function getOrCreateRow(date) {
    let row = map[date];
    if (!row) {
      row = {
        date,
        timestamp: parseDateToTimestamp(date),
        ...emptyColumns,
      };
      map[date] = row;
    }
    return row;
  }

  // ✅ Process scraped game data
  for (let i = 0; i < scrapeData.length; i++) {
    const { date, gameId, resultNumber } = scrapeData[i];
    const gameName = gameMap[gameId];
    if (!date || !gameName) continue;

    getOrCreateRow(date)[gameName] = String(resultNumber ?? "");
  }

  // ✅ Process Noida King data
  for (let i = 0; i < noidaData.length; i++) {
    const { date, number } = noidaData[i];
    if (!date) continue;

    getOrCreateRow(date)["NOIDA KING"] = String(number ?? "");
  }

  // ✅ Sort once (oldest → newest)
  return Object.values(map).sort(
    (a, b) => a.timestamp - b.timestamp
  );
}
