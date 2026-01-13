import { parseDateToTimestamp } from "../utils/date.utils";

export function normalizeGameChartData(
  scrapeData = [],
  noidaData = [],
  columns,
  gameMap
) {
  const map = new Map();

  const createRow = (date) => {
    const row = { date, timestamp: parseDateToTimestamp(date) };
    columns.forEach(col => (row[col] = ""));
    return row;
  };

  scrapeData.forEach(({ date, gameId, resultNumber }) => {
    const gameName = gameMap[gameId];
    if (!date || !gameName) return;

    if (!map.has(date)) map.set(date, createRow(date));
    map.get(date)[gameName] = String(resultNumber ?? "");
  });

  noidaData.forEach(({ date, number }) => {
    if (!date) return;

    if (!map.has(date)) map.set(date, createRow(date));
    map.get(date)["NOIDA KING"] = String(number ?? "");
  });

  return Array.from(map.values()).sort(
    (a, b) => a.timestamp - b.timestamp
  );
}
