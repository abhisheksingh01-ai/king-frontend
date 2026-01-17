import React, { useEffect, useState } from "react";
import api from "../../api/api";

/* ---------- GAME ORDER ---------- */
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
  `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}-${d.getFullYear()}`;

export default function ResultBoard() {
  const today = formatDate(new Date());
  const [results, setResults] = useState([]);

  const updateResults = async () => {
    try {
      const res = await fetch(api.NewScrapeData.gameChart);
      const resJson = await res.json();

      if (!resJson?.success || !resJson?.data) return;

      const todayRow = resJson.data.find((row) => row.date === today);
      if (!todayRow || !todayRow.games) return;

      // Collect all games that have a result, with timestamp
      const allGames = GAMES.map((game) => {
        const gameData = todayRow.games[game];
        if (!gameData) return null;
        return {
          name: game,
          number: gameData.result,
          timestamp: new Date(gameData.createdAt).getTime(),
        };
      }).filter(Boolean);

      if (allGames.length === 0) return;

      // Sort descending by timestamp (latest first) and pick top 3
      const latestThree = allGames
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 3);

      setResults(latestThree);
    } catch (err) {
      console.error("❌ ResultBoard Error:", err);
    }
  };

  useEffect(() => {
    updateResults(); // initial fetch
    const interval = setInterval(updateResults, 60 * 1000); // update every minute
    return () => clearInterval(interval);
  }, [today]);

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
              <p className="text-white font-bold text-2xl">
                Waiting for results...
              </p>
            ) : (
              results.map((item) => (
                <section key={item.name}>
                  <h3 className="text-3xl font-extrabold text-white tracking-wider uppercase">
                    {item.name}
                  </h3>
                  <p className="text-yellow-300 text-5xl font-bold mt-1">
                    {item.number}
                  </p>
                </section>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
