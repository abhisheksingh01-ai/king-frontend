import { useEffect, useState } from "react";
import api from "../api/api";

export function useGameChartData() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchGameChart() {
      try {
        const start = performance.now();

        const res = await fetch(api.NewScrapeData.gameChart, {
          signal: controller.signal,
        });

        const json = await res.json();

        const end = performance.now();
        console.log(
          `FRONTEND_TOTAL_TIME: ${(end - start).toFixed(2)} ms`
        );

        if (!json.success) {
          throw new Error("Game chart API failed");
        }

        setRows(json.data);
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

  return { rows, loading, error };
}
