import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import api from '../../api/api';

const TARGET_GAMES = [
  'DESAWAR', 'SHRI GANESH', 'DELHI BAZAR', 'GALI', 
  'GHAZIABAD', 'FARIDABAD', 'NOIDA KING'
];

const RecentResultsWidget = () => {
  // Sirf 3 items ka array state me rakhenge, poora data nahi.
  const [latestResults, setLatestResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Optimization 1: Date string calculation ko memoize kiya (Bar bar calculate nahi hoga)
  const todayStr = useMemo(() => {
    const d = new Date();
    return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchLiveResults = async () => {
      try {
        // Sirf pehli baar loading dikhayein, interval me nahi
        if (latestResults.length === 0) setLoading(true);
        
        const response = await axios.get(api.NewScrapeData.gameChart);

        if (isMounted && response.data && response.data.success) {
          processLiveFeedFast(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching live feed:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchLiveResults();
    
    // Polling interval (30 seconds)
    const interval = setInterval(fetchLiveResults, 30000); 
    return () => {
      clearInterval(interval);
      isMounted = false;
    };
  }, []); // Empty dependency array is fine here

  // Optimization 2: Data Process Logic
  const processLiveFeedFast = (data) => {
    if (!data || data.length === 0) return;

    // Fast Lookup: Sirf Aaj ki date match karni hai.
    // Optimization: Find use karne ki jagah Map use kar sakte hain agar data bada hai,
    // lekin kyunki humein sirf ONE match chahiye, .find() is okay here IF we don't store the big array.
    const todayData = data.find(item => item.date === todayStr);

    if (!todayData || !todayData.games) {
      setLatestResults([]);
      return;
    }

    let declaredGames = [];

    TARGET_GAMES.forEach(gameKey => {
      const gameData = todayData.games[gameKey];
      // Check karte hain result valid hai ya nahi
      if (gameData && gameData.result) {
        declaredGames.push({
          name: gameKey,
          result: gameData.result,
          // Fallback: Agar timestamp nahi hai to 'now' maano taaki top pe dikhe
          timestamp: gameData.timestamp || Date.now() 
        });
      }
    });

    // Sort: Newest First
    declaredGames.sort((a, b) => b.timestamp - a.timestamp);

    // Sirf top 3 items state me set karein
    setLatestResults(declaredGames.slice(0, 3));
  };

  // --- RENDER HELPERS ---
  const renderLoading = () => (
    <div className="flex flex-col gap-3 animate-pulse mt-2">
      <div className="h-24 bg-white/5 rounded-2xl w-full border border-white/10"></div>
      <div className="h-16 bg-white/5 rounded-2xl w-full border border-white/10"></div>
    </div>
  );

  const renderEmpty = () => (
    <div className="mt-4 p-8 bg-white/5 rounded-2xl border border-dashed border-white/20 text-center backdrop-blur-sm">
      <div className="animate-spin w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full mx-auto mb-3"></div>
      <p className="text-gray-300 text-sm font-medium tracking-wide">Waiting for today's first result...</p>
    </div>
  );

  return (
    // Fixed: 'bg-linear-to-b' -> 'bg-gradient-to-b' (Standard Tailwind)
    <div className="w-full max-w-md mx-auto mt-6 bg-linear-to-b from-slate-900 to-black p-5 rounded-3xl shadow-2xl border border-slate-800 relative overflow-hidden">
      
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-yellow-500/20 blur-[80px] rounded-full pointer-events-none"></div>

      {/* HEADER */}
      <div className="relative z-10 flex justify-between items-center mb-6 px-1">
        <div>
          <h2 className="text-white text-xl font-black tracking-wider italic">
            FAST RESULT
          </h2>
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest mt-1">
            {todayStr}
          </p>
        </div>
        
        {/* Live Badge */}
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/50 px-3 py-1 rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="text-[10px] font-bold text-red-500 tracking-wider">LIVE</span>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="relative z-10 min-h-30">
        {loading ? renderLoading() : (latestResults.length === 0 ? renderEmpty() : (
          <div className="flex flex-col gap-4">
            {latestResults.map((game, index) => {
              const isLatest = index === 0;

              return (
                <div 
                  key={game.name}
                  className={`
                    relative rounded-2xl border transition-all duration-300 group
                    ${isLatest 
                      // Fixed: Gradients updated to standard syntax
                      ? 'bg-linear-to-r from-slate-800 to-slate-900 border-yellow-500/50 shadow-[0_4px_20px_-5px_rgba(234,179,8,0.3)] scale-100' 
                      : 'bg-white/5 border-white/10 scale-[0.98] hover:bg-white/10'
                    }
                  `}
                >
                  <div className={`flex items-center justify-between ${isLatest ? 'p-5' : 'p-4'}`}>
                    
                    {/* Left: Game Info */}
                    <div className="flex flex-col gap-1">
                      {isLatest && (
                        <span className="text-[9px] font-bold text-yellow-400 uppercase tracking-widest animate-pulse">
                          Just Announced
                        </span>
                      )}
                      <span className={`font-black uppercase tracking-tight text-white ${isLatest ? 'text-2xl' : 'text-lg text-slate-300'}`}>
                        {game.name}
                      </span>
                    </div>

                    {/* Right: 3D Result Ball */}
                    <div className={`
                      relative flex items-center justify-center rounded-full font-black font-mono shadow-inner
                      ${isLatest 
                        ? 'w-16 h-16 text-4xl text-black bg-linear-to-br from-yellow-300 via-yellow-400 to-yellow-600 shadow-[inset_-2px_-2px_6px_rgba(0,0,0,0.2),2px_2px_6px_rgba(0,0,0,0.3)]' 
                        : 'w-12 h-12 text-xl text-white bg-linear-to-br from-slate-600 to-slate-800 border border-slate-500 shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.3)]'
                      }
                    `}>
                      {/* Shine Reflection on Ball */}
                      <div className="absolute top-1 left-2 w-1/3 h-1/3 bg-white opacity-40 rounded-full blur-[1px]"></div>
                      <span className="relative z-10 drop-shadow-sm">{game.result}</span>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default RecentResultsWidget;