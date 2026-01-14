import React, { useEffect, useMemo, useState } from "react";
import api from "../../api/api";

/* ---------- CONFIG ---------- */
const GAMES = [
  { key: "DESAWAR" },
  { key: "DELHI BAZAR" },
  { key: "NOIDA KING" },
];

/* ---------- HELPERS ---------- */
const formatDate = (d) =>
  `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;

export default function ResultBoard() {
  const today = useMemo(() => formatDate(new Date()), []);

  /* ---------- MAP GAME NAME → INDEX ---------- */
  const gameIndexByName = useMemo(() => {
    const map = {};
    GAMES.forEach((g, i) => {
      map[g.key.toUpperCase()] = i;
    });
    return map;
  }, []);

  /* ---------- DEFAULT RESULTS (Instant UI) ---------- */
  const defaultResults = useMemo(
    () => GAMES.map((g) => ({ name: g.key, number: "-" })),
    []
  );

  const [results, setResults] = useState(defaultResults);

  /* ---------- FETCH RESULTS ---------- */
  useEffect(() => {
    let isMounted = true;

    const fetchTodayResults = async () => {
      // fresh copy
      const updatedResults = defaultResults.map((r) => ({ ...r }));

      try {
        const response = await fetch(api.NewScrapeData.getScrape);
        if (!response.ok) throw new Error("Network error");

        const resData = await response.json();

        if (resData?.success && resData?.data && isMounted) {
          resData.data.forEach(({ gameName, date, resultNumber }) => {
            if (date === today) {
              const index = gameIndexByName[gameName?.toUpperCase()];
              if (index !== undefined) {
                updatedResults[index].number = resultNumber ?? "-";
              }
            }
          });

          setResults(updatedResults);
        }
      } catch (err) {
        console.error("❌ ResultBoard Error:", err);
        if (isMounted) setResults(defaultResults);
      }
    };

    fetchTodayResults();
    return () => {
      isMounted = false;
    };
  }, [today, defaultResults, gameIndexByName]);

  /* ---------- UI ---------- */
  return (
    <div className="w-full flex justify-center my-10">
      <div className="w-[95%] rounded-3xl border-[3px] border-white p-1 bg-black shadow-2xl">
        <div className="w-full h-1.5 border-t-4 border-dotted border-red-600 rounded-t-3xl" />

        <div className="rounded-3xl border-[3px] border-white p-10 text-center bg-[radial-gradient(circle,#7a0000,#1a0000,black)]">
          <h2 className="text-yellow-300 font-semibold text-xl mb-6 tracking-widest">
            {today} Results
          </h2>

          <div className="space-y-6">
            {results.map((item) => (
              <section key={item.name}>
                <h3 className="text-3xl font-extrabold text-white tracking-wider uppercase">
                  {item.name}
                </h3>
                <p className="text-yellow-300 text-5xl font-bold mt-1">
                  {item.number}
                </p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
