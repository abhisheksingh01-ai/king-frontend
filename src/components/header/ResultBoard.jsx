import React, { useEffect, useState } from "react";
import api from "../../api/api";

/* ---------- GAME ORDER (example, does not matter for time now) ---------- */
const GAMES = [
  "DESAWAR",
  "SHRI GANESH",
  "DELHI BAZAR",
  "GALI",
  "GHAZIABAD",
  "FARIDABAD",
  "NOIDA KING",
];

/* ---------- HELPERS ---------- */
const formatDate = (d) =>
  `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;

export default function ResultBoard() {
  const today = formatDate(new Date());
  const [results, setResults] = useState([]); 

  const updateResults = async () => {
    try {
      const res = await fetch(api.NewScrapeData.gameChart);
      const resJson = await res.json();

      if (!resJson?.success || !resJson?.data) return;

      const todayRow = resJson.data.find((row) => row.date === today);
      if (!todayRow) return;

      // Collect all game results that are not empty
      const newResults = GAMES.map((game) => {
        const num = todayRow[game];
        return num ? { name: game, number: num } : null;
      }).filter(Boolean); // remove nulls

      if (newResults.length === 0) return;

      // Combine previous results with new ones and remove duplicates
      const combined = [...newResults, ...results].filter(
        (v, i, arr) => arr.findIndex((x) => x.name === v.name) === i
      );

      // Keep only latest 3 results
      setResults(combined.slice(0, 3));
    } catch (err) {
      console.error("❌ ResultBoard Error:", err);
    }
  };

  useEffect(() => {
    updateResults(); // initial fetch
    const interval = setInterval(updateResults, 60 * 1000); // update every minute
    return () => clearInterval(interval);
  }, [today, results]);

  return (
    <div className="w-full flex justify-center my-10">
      <div className="w-[95%] rounded-3xl border-[3px] border-white p-1 bg-black shadow-2xl">
        <div className="w-full h-1.5 border-t-4 border-dotted border-red-600 rounded-t-3xl" />

        <div className="rounded-3xl border-[3px] border-white p-10 text-center bg-[radial-gradient(circle,#7a0000,#1a0000,black)]">
          <h2 className="text-yellow-300 font-semibold text-xl mb-6 tracking-widest">
            Today
          </h2>

          <div className="space-y-6">
            {results.length === 0 ? (
              <p className="text-white font-bold text-2xl">Waiting for results...</p>
            ) : (
              results.map((item, idx) => (
                <section key={item.name}>
                  <h3 className="text-3xl font-extrabold text-white tracking-wider uppercase">
                    {item.name}
                  </h3>
                  <p className="text-yellow-300 text-5xl font-bold mt-1">{item.number}</p>
                </section>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
