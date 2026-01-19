import { useEffect, useState, useMemo } from "react";
import api from "../api/api";
import { normalizeGameChartData } from "../services/gameChart.service";

const STATIC_COLUMNS = [
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
    let mounted = true;

    async function fetchGameChart() {
      try {
        // Browser handles caching via Cache-Control header we added in Backend
        const res = await fetch(api.NewScrapeData.gameChart);
        
        if (!res.ok) throw new Error(`API Error: ${res.status}`);
        
        const json = await res.json();

        if (mounted) {
          if (!json.success) throw new Error("Game chart API failed");
          
          // 🔥 Fast: No heavy processing here anymore
          const data = normalizeGameChartData(json.data);
          setRows(data);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          console.error("Chart Fetch Error:", err);
          setError(err.message || "Failed to load game chart");
          setLoading(false);
        }
      }
    }

    fetchGameChart();

    return () => {
      mounted = false;
    };
  }, []);

  // Memoize columns to prevent unnecessary re-renders in consumers
  const columns = useMemo(() => STATIC_COLUMNS, []);

  return { rows, loading, error, columns };
}