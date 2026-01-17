import { useEffect, useState } from "react";
import api from "../api/api";
import { normalizeGameChartData } from "../services/gameChart.service";

const COLUMNS = [
  "DESAWAR",
  "SHRI GANESH",
  "DELHI BAZAR",
  "GALI",
  "GHAZIABAD",
  "FARIDABAD",
  "NOIDA KING",
];

export function useGameChartData() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchGameChart() {
      try {
        const res = await fetch(api.NewScrapeData.gameChart, {
          signal: controller.signal,
        });
        const json = await res.json();

        if (!json.success) throw new Error("Game chart API failed");

        const normalized = normalizeGameChartData(json.data, COLUMNS);
        setRows(normalized);
        setLoading(false);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to load game chart");
          setLoading(false);
        }
      }
    }

    fetchGameChart();
    return () => controller.abort();
  }, []);

  return { rows, loading, error, columns: COLUMNS };
}
