import { useEffect, useState } from "react";
import api from "../api/api";
import { normalizeGameChartData } from "../services/gameChart.service";

export function useGameChartData(columns, gameMap) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    let scrapeDataCache = [];
    let noidaDataCache = [];

    async function fetchScrapeData() {
      try {
        const res = await fetch(api.NewScrapeData.getScrape, {
          signal: controller.signal,
        });
        const json = await res.json();

        scrapeDataCache = json?.data || [];

        // 🔥 merge using BOTH datasets
        setRows(
          normalizeGameChartData(
            scrapeDataCache,
            noidaDataCache,
            columns,
            gameMap
          )
        );

        setLoading(false);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Scrape API failed");
          setLoading(false);
        }
      }
    }

    async function fetchNoidaData() {
      try {
        const res = await fetch(api.DateNumber.getAll, {
          signal: controller.signal,
        });
        const json = await res.json();

        noidaDataCache = json?.data || [];

        setRows(
          normalizeGameChartData(
            scrapeDataCache,
            noidaDataCache,
            columns,
            gameMap
          )
        );
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Noida API failed");
        }
      }
    }

    fetchScrapeData();
    fetchNoidaData();

    return () => controller.abort();
  }, []);

  return { rows, loading, error };
}
