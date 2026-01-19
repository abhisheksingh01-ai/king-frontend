import React, { useEffect, useState, useMemo } from "react";
import api from "../../api/api"; 

/* ---------- CONFIG ---------- */
const GAMES = [
  "DESAWAR",
  "SHRI GANESH",
  "DELHI BAZAR",
  "GALI",
  "GHAZIABAD",
  "FARIDABAD",
  "NOIDA KING",
];

// Helper: robust date formatting
const formatDate = (d) =>
  `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}-${d.getFullYear()}`;

export default function ResultBoard() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Memoize today's date so it doesn't recalculate on every render
  const todayStr = useMemo(() => formatDate(new Date()), []);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const updateResults = async () => {
      try {
        // 🔥 Optimized: Browser will use Disk Cache (304 Not Modified) 
        // because of the new Backend headers. 0ms latency on poll.
        const res = await fetch(api.NewScrapeData.gameChart, {
          signal: controller.signal
        });
        
        if (!res.ok) throw new Error("Fetch failed");

        const resJson = await res.json();

        if (mounted) {
          if (!resJson?.success || !Array.isArray(resJson.data)) {
            setLoading(false);
            return;
          }

          // 🔥 Optimization: Find ONLY today's row directly.
          // No need to process the whole array.
          const todayRow = resJson.data.find((row) => row.date === todayStr);

          if (!todayRow || !todayRow.games) {
            setResults([]);
          } else {
            // Extract & Sort
            const validGames = [];
            
            for (const gameName of GAMES) {
              const gameData = todayRow.games[gameName];
              
              if (gameData && gameData.result) {
                validGames.push({
                  name: gameName,
                  number: gameData.result,
                  // Use robust timestamp parsing
                  timestamp: new Date(gameData.createdAt).getTime(),
                });
              }
            }

            // Sort descending (Newest first) -> Top 3
            validGames.sort((a, b) => b.timestamp - a.timestamp);
            setResults(validGames.slice(0, 3));
          }
          
          setLoading(false);
        }
      } catch (err) {
        if (mounted && err.name !== "AbortError") {
          console.error("❌ ResultBoard Error:", err);
          setLoading(false);
        }
      }
    };

    // Initial call
    updateResults();

    // Poll every 60s
    const interval = setInterval(updateResults, 60 * 1000);

    return () => {
      mounted = false;
      controller.abort(); // Cancel request if user leaves page
      clearInterval(interval);
    };
  }, [todayStr]);

  return (
    <div className="min-h-screen w-full bg-neutral-950 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* 1. Ambient Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-96 bg-red-900/30 blur-[120px] rounded-full pointer-events-none" />
      
      {/* 2. Main Content Wrapper */}
      <div className="w-full flex justify-center py-12 px-4 relative z-10">
        
        {/* Outer Container: Metallic Gold Border Gradient */}
        <div className="relative w-full max-w-md rounded-3xl p-0.5 bg-gradient-to-b from-yellow-300 via-amber-600 to-black shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          
          {/* Inner Card Background */}
          <div className="w-full h-full rounded-[22px] bg-[#0f0f0f] relative overflow-hidden">
            
            {/* Top Gloss Reflection */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

            {/* Content Area */}
            <div className="relative px-6 py-10 text-center">

              {/* Header */}
              <div className="flex items-center justify-center gap-3 mb-8">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600 shadow-[0_0_10px_#ef4444]"></span>
                </span>
                <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 font-extrabold text-lg tracking-[0.25em] uppercase drop-shadow-sm">
                  Live Results
                </h2>
              </div>

              {/* Results List */}
              <div className="space-y-8 min-h-[200px] flex flex-col justify-center">
                {loading ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-yellow-500/50 text-xs tracking-widest uppercase">Fetching Data...</p>
                  </div>
                ) : results.length === 0 ? (
                  <div className="flex flex-col items-center justify-center opacity-50 py-10">
                    <p className="text-white font-bold text-xl">No Results Yet</p>
                    <p className="text-gray-500 text-xs mt-2 uppercase tracking-wide">Market is closed</p>
                  </div>
                ) : (
                  results.map((item, index) => (
                    <div
                      key={item.name}
                      className={`relative group transition-all duration-500 ${
                        index === 0 ? "scale-100 opacity-100" : "scale-95 opacity-70 hover:opacity-100"
                      }`}
                    >
                      {/* Decorative Line for First Item */}
                      {index === 0 && (
                        <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-red-900/20 to-transparent blur-xl transition-all duration-1000"></div>
                      )}

                      {/* Game Name */}
                      <h3 className="text-xl md:text-2xl font-bold text-gray-200 tracking-wider uppercase mb-3 group-hover:text-white transition-colors">
                        {item.name}
                      </h3>

                      {/* Game Number Box */}
                      <div className={`
                        inline-flex items-center justify-center px-10 py-3 rounded-lg border 
                        backdrop-blur-sm transition-all duration-300
                        ${index === 0 
                          ? "bg-linear-to-b from-yellow-500/10 to-transparent border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.15)]" 
                          : "bg-white/5 border-white/10"
                        }
                      `}>
                        <span className={`
                          text-5xl font-black font-mono tracking-tighter
                          ${index === 0 ? "text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" : "text-gray-400"}
                        `}>
                          {item.number}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}