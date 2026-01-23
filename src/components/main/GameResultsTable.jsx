import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import api from '../../api/api';

const COLUMNS = [
  { key: 'DESAWAR', label: 'DESAWAR' },
  { key: 'SHRI GANESH', label: 'SHRI GANESH' },
  { key: 'DELHI BAZAR', label: 'DELHI BAZAR' },
  { key: 'GALI', label: 'GALI' },
  { key: 'GHAZIABAD', label: 'GHAZIABAD' },
  { key: 'FARIDABAD', label: 'FARIDABAD' },
  { key: 'NOIDA KING', label: 'NOIDA KING' }
];

const GameResultsTable = () => {
  const [allMonthsData, setAllMonthsData] = useState([]);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(() => new Date().getMonth());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const todayStr = useMemo(() => {
    const d = new Date();
    return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchResults = async () => {
      try {
        // 🔥 FAST: Calls the Full Chart API
        const response = await axios.get(api.NewScrapeData.gameChartFull);
        
        if (!isMounted) return;

        if (response.data && response.data.success) {
          const rawData = response.data.data;
          
          let dataYear = new Date().getFullYear();
          if (rawData.length > 0) {
             const firstDate = rawData[0].date;
             if(firstDate) dataYear = parseInt(firstDate.split('-')[2], 10);
          }

          // Convert Array to Map for O(1) Access
          const dataMap = new Map();
          rawData.forEach(item => {
            dataMap.set(item.date, item);
          });

          const processed = generateFullYearData(dataMap, dataYear);
          setAllMonthsData(processed);
          
          // Auto-select current month
          setCurrentMonthIndex(new Date().getMonth());
        } else {
          setError("Failed to retrieve data.");
        }
      } catch (err) {
        console.error(err);
        if (isMounted) setError("Something went wrong.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchResults();
    return () => { isMounted = false; };
  }, []);

  const generateFullYearData = (dataMap, year) => {
    const fullYearGroups = [];
    const monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
      const monthRows = [];
      const monthStr = String(monthIndex + 1).padStart(2, '0');
      const title = `${monthNames[monthIndex]} ${year}`;

      for (let day = 1; day <= daysInMonth; day++) {
        const dayStr = String(day).padStart(2, '0');
        const dateStr = `${dayStr}-${monthStr}-${year}`;
        const foundData = dataMap.get(dateStr);
        monthRows.push(foundData || { date: dateStr, games: {} });
      }
      fullYearGroups.push({ id: `${monthIndex}-${year}`, title: title, rows: monthRows });
    }
    return fullYearGroups;
  };

  const handlePrevMonth = () => { if (currentMonthIndex > 0) setCurrentMonthIndex(currentMonthIndex - 1); };
  const handleNextMonth = () => { if (currentMonthIndex < 11) setCurrentMonthIndex(currentMonthIndex + 1); };
  const currentData = allMonthsData[currentMonthIndex];

  if (loading) return (
    <div className="p-8 flex flex-col items-center justify-center space-y-4">
       <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
       <div className="text-blue-600 font-bold animate-pulse">Loading History...</div>
    </div>
  );

  if (error) return <div className="p-4 text-center text-red-600">{error}</div>;
  if (!currentData) return <div className="p-8 text-center text-gray-500">No Data</div>;

  return (
    <div className="w-full flex flex-col gap-3 px-2 md:px-0">
      <div className="bg-white p-3 rounded-xl shadow-md border border-gray-200 sticky top-2 z-40 mx-auto w-full max-w-4xl flex justify-between items-center">
          <button onClick={handlePrevMonth} disabled={currentMonthIndex === 0} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-700 disabled:opacity-30">←</button>
          <h2 className="text-lg md:text-xl font-bold text-slate-800 uppercase">{currentData.title}</h2>
          <button onClick={handleNextMonth} disabled={currentMonthIndex === 11} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 text-white disabled:opacity-30">→</button>
      </div>

      <div className="w-full max-w-4xl mx-auto overflow-hidden border border-gray-300 shadow-xl rounded-xl bg-white flex flex-col h-[75vh] md:h-auto">
        <div className="overflow-auto flex-1 relative scroll-smooth">
          <table className="min-w-full text-center border-collapse">
            <thead className="bg-slate-800 text-white font-bold uppercase text-xs md:text-sm sticky top-0 z-30 shadow-md">
              <tr>
                <th className="p-3 border-r border-slate-600 sticky left-0 z-40 bg-slate-800 min-w-25">Date</th>
                {COLUMNS.map((col) => <th key={col.key} className="p-3 border-r border-slate-600 min-w-20"><span className="md:hidden">{col.label}</span><span className="hidden md:inline">{col.key}</span></th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-xs md:text-sm">
              {currentData.rows.map((row, index) => {
                const isToday = row.date === todayStr;
                const rowBg = isToday ? 'bg-yellow-100' : (index % 2 === 0 ? 'bg-white' : 'bg-slate-50');
                return (
                  <tr key={row.date} className={`${rowBg} hover:bg-blue-50`}>
                    <td className={`p-3 font-bold text-gray-700 border-r border-gray-200 sticky left-0 z-20 ${rowBg}`}>{row.date}</td>
                    {COLUMNS.map((col) => (
                      <td key={`${row.date}-${col.key}`} className="p-3 border-r border-gray-200 font-bold text-gray-900 min-w-15">
                        {row.games?.[col.key]?.result || <span className="text-gray-300"></span>}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GameResultsTable;