import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import api from '../../api/api';

const GAMES_CONFIG = [
  { key: 'DESAWAR', label: 'DESAWAR', time: '05:30 AM' },
  { key: 'SHRI GANESH', label: 'SHRI GANESH', time: '04:40 PM' },
  { key: 'DELHI BAZAR', label: 'DELHI BAZAR', time: '03:15 PM' },
  { key: 'GALI', label: 'GALI', time: '11:10 PM' },
  { key: 'GHAZIABAD', label: 'GHAZIABAD', time: '08:50 PM' },
  { key: 'FARIDABAD', label: 'FARIDABAD', time: '06:15 PM' },
  { key: 'NOIDA KING', label: 'NOIDA KING', time: '05:30 PM' }
];

const LiveResultCards = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);

  // Helper: Dates (Matches Server Logic)
  const { todayStr, yesterdayStr } = useMemo(() => {
    const formatDate = (date) => date.toLocaleDateString('en-GB').replace(/\//g, '-');
    const todayObj = new Date();
    // Add 5.5 hours for India time simulation if needed on client, 
    // but usually local browser time is fine.
    const yesterdayObj = new Date(todayObj);
    yesterdayObj.setDate(yesterdayObj.getDate() - 1);
    return { todayStr: formatDate(todayObj), yesterdayStr: formatDate(yesterdayObj) };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        // 🔥 FAST: Calls the Live (2-Day) API
        const response = await axios.get(api.NewScrapeData.gameChartLive);

        if (isMounted && response.data && response.data.success) {
          processDataFast(response.data.data);
        }
      } catch (error) {
        console.error("Live fetch error:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, [todayStr, yesterdayStr]);

  const processDataFast = (data) => {
    if (!data || data.length === 0) return;

    // Direct O(1) Lookup Map
    const dataMap = new Map();
    data.forEach(item => dataMap.set(item.date, item));

    const todayData = dataMap.get(todayStr);
    const yesterdayData = dataMap.get(yesterdayStr);
    const mappedResults = {};
    
    GAMES_CONFIG.forEach(game => {
      mappedResults[game.key] = {
        today: todayData?.games?.[game.key]?.result || "", 
        last: yesterdayData?.games?.[game.key]?.result || "" 
      };
    });

    setResults(mappedResults);
  };

  if (loading) return (
    <div className="w-full max-w-5xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((i) => <div key={i} className="h-48 bg-gray-800/50 rounded-xl animate-pulse border border-gray-700"></div>)}
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {GAMES_CONFIG.map((game) => (
          <div key={game.key} className="relative bg-linear-to-b from-[#004d00] to-[#003300] border-2 border-[#006400] rounded-xl p-4 shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.01]">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')"}}></div>
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider drop-shadow-md text-center">{game.label}</h2>
              <span className="text-yellow-400 font-bold text-xs md:text-sm bg-black/30 px-3 py-1 rounded-full mt-1 mb-4 md:mb-6 border border-white/10">TIME: {game.time}</span>
              <div className="flex items-center justify-center w-full gap-3 md:gap-8">
                {/* YESTERDAY */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-green-100 text-[10px] md:text-xs font-bold uppercase tracking-widest">Yesterday</span>
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-gray-200">
                    <span className="text-2xl md:text-3xl font-extrabold text-gray-800">{results[game.key]?.last || ""}</span>
                  </div>
                </div>
                {/* ARROW */}
                <div className="relative flex flex-col items-center justify-center -mt-2">
                  <div className="bg-linear-to-r from-red-600 to-red-500 text-white text-[9px] font-bold px-2 py-0.5 transform -skew-x-12 shadow-lg border border-red-400 animate-pulse">LIVE</div>
                  <div className="text-red-500 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-8 md:h-8"><path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd" /></svg>
                  </div>
                </div>
                {/* TODAY */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-green-100 text-[10px] md:text-xs font-bold uppercase tracking-widest">Today</span>
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,255,0,0.4)] border-4 border-yellow-300 relative">
                    {!results[game.key]?.today && <span className="absolute w-full h-full rounded-full border-2 border-yellow-500 animate-ping opacity-30"></span>}
                    <span className="text-2xl md:text-3xl font-extrabold text-black">{results[game.key]?.today || ""}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveResultCards;