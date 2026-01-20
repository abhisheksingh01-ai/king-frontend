import React, { useState, useEffect} from 'react';
import axios from 'axios';
import api from '../../api/api'; // Aapki API file

// 1. Game Configuration (Naam aur Time set karein)
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

  // Helper: Date format karein "DD-MM-YYYY" (API match karne ke liye)
  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB').replace(/\//g, '-');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(api.NewScrapeData.gameChart);

        if (response.data && response.data.success) {
          processData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching live results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const processData = (data) => {
    // 1. Aaj aur Kal ki date nikalein
    const todayObj = new Date();
    const yesterdayObj = new Date(todayObj);
    yesterdayObj.setDate(yesterdayObj.getDate() - 1);

    const todayStr = formatDate(todayObj);       // e.g. "20-01-2026"
    const yesterdayStr = formatDate(yesterdayObj); // e.g. "19-01-2026"

    // 2. Data mein se objects dhundhein
    const todayData = data.find(item => item.date === todayStr);
    const yesterdayData = data.find(item => item.date === yesterdayStr);

    // 3. Har game ke liye result map karein
    const mappedResults = {};
    
    GAMES_CONFIG.forEach(game => {
      mappedResults[game.key] = {
        today: todayData?.games?.[game.key]?.result || "", // Result ya Empty
        last: yesterdayData?.games?.[game.key]?.result || "XX" // Result ya "XX"
      };
    });

    setResults(mappedResults);
  };

  if (loading) return <div className="text-white text-center p-10 animate-pulse">Loading Live Results...</div>;

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      {/* Grid Layout: Mobile = 1 Column, Desktop = 2 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {GAMES_CONFIG.map((game) => (
          <div 
            key={game.key}
            className="relative bg-linear-to-b from-[#004d00] to-[#003300] border-2 border-[#006400] rounded-xl p-4 shadow-lg overflow-hidden"
          >
            {/* Background Pattern (Optional for better look) */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

            <div className="relative z-10 flex flex-col items-center">
              
              {/* HEADER: Name & Time */}
              <h2 className="text-2xl font-black text-white uppercase tracking-wider drop-shadow-md">
                {game.label}
              </h2>
              <span className="text-yellow-400 font-bold text-sm bg-black/30 px-3 py-1 rounded-full mt-1 mb-6">
                ({game.time})
              </span>

              {/* RESULTS SECTION */}
              <div className="flex items-center justify-center w-full gap-4 md:gap-8">
                
                {/* LAST Result */}
                <div className="flex flex-col items-center gap-2">
                  <span className="text-green-100 text-xs font-bold uppercase tracking-widest">Last</span>
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.3)] border-4 border-gray-200">
                    <span className="text-3xl font-extrabold text-gray-800">
                      {results[game.key]?.last || "--"}
                    </span>
                  </div>
                </div>

                {/* NEW Arrow Badge */}
                <div className="relative flex flex-col items-center justify-center -mt-2">
                  <div className="bg-linear-to-r from-red-600 to-red-500 text-white text-[10px] font-bold px-3 py-1 transform -skew-x-12 shadow-lg border border-red-400 animate-pulse">
                    NEW
                  </div>
                  {/* Arrow Icon */}
                  <div className="text-red-500 mt-1">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                      <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                {/* TODAY Result */}
                <div className="flex flex-col items-center gap-2">
                  <span className="text-green-100 text-xs font-bold uppercase tracking-widest">Today</span>
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,255,0,0.4)] border-4 border-yellow-300 relative">
                    {/* Blinking Dot if Result is empty (Waiting) */}
                    {!results[game.key]?.today && (
                      <span className="absolute w-full h-full rounded-full border-2 border-yellow-500 animate-ping opacity-20"></span>
                    )}
                    
                    <span className="text-3xl font-extrabold text-black">
                      {results[game.key]?.today || ""}
                    </span>
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