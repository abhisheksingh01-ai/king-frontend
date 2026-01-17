import React, { useEffect, useMemo, useState } from "react";
import api from "../../api/api";

/* ---------- CONFIG ---------- */
const GAMES = [
  { key: "DESAWAR", time: "(06:00 AM)" },
  { key: "SHRI GANESH", time: "(03:00 PM)" },
  { key: "DELHI BAZAR", time: "(02:45 PM)" },
  { key: "GALI", time: "(12:00 PM)" },
  { key: "GHAZIABAD", time: "(10:25 PM)" },
  { key: "FARIDABAD", time: "(06:50 PM)" },
  { key: "NOIDA KING", time: "(06:30 PM)" },
];

const formatDate = (d) =>
  `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}-${d.getFullYear()}`;

const TODAY = formatDate(new Date());
const YESTERDAY = formatDate(new Date(Date.now() - 86400000));

/* ---------- CSS ANIMATION & STYLES ---------- */
const styles = `
  /* Define the glossy red gradient for the arrow */
  .glossy-gradient-stop-1 { stop-color: #ff4d4d; }
  .glossy-gradient-stop-2 { stop-color: #b30000; }

  /* Animation: Point right and Pulse */
  @keyframes pointAndPulse {
    0% {
      transform: translateX(0) scale(1);
      filter: drop-shadow(0 2px 2px rgba(0,0,0,0.3));
    }
    50% {
      /* Moves right and gets slightly larger */
      transform: translateX(4px) scale(1.05);
      filter: drop-shadow(0 4px 6px rgba(0,0,0,0.5));
    }
    100% {
      transform: translateX(0) scale(1);
      filter: drop-shadow(0 2px 2px rgba(0,0,0,0.3));
    }
  }

  .animated-badge {
    animation: pointAndPulse 1.5s ease-in-out infinite;
    /* Ensure the SVG renders sharply */
    shape-rendering: geometricPrecision; 
  }
`;

/* ---------- UI PARTS ---------- */

const ArrowBadge = React.memo(() => (
  // "mt-[1px]" forces the whole element 1px down as requested
  <div className="flex items-center justify-center px-2 shrink-0 relative z-10 mt-px">
    <style>{styles}</style>
    
    <svg
      width="40"
      height="18"
      viewBox="0 0 42 18"
      className="animated-badge"
    >
      <defs>
        {/* Gradient Definition for 3D look */}
        <linearGradient id="badgeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" className="glossy-gradient-stop-1" />
          <stop offset="100%" className="glossy-gradient-stop-2" />
        </linearGradient>
        {/* Text Shadow Filter */}
        <filter id="textShadow">
          <feDropShadow dx="0" dy="1" stdDeviation="0.5" floodColor="rgba(0,0,0,0.5)" />
        </filter>
      </defs>

      {/* Outer Border (Gold) */}
      <path d="M0 0H35L42 9L35 18H0V0Z" fill="#FDE047" />
      
      {/* Inner Main Arrow (Gradient Red) */}
      <path 
        d="M1.5 1.5H34.5L40 9L34.5 16.5H1.5V1.5Z" 
        fill="url(#badgeGradient)" 
        stroke="#7f1d1d" 
        strokeWidth="0.5" 
      />

      {/* Text "NEW" with shadow */}
      <text
        x="19"
        y="13"
        fill="#FFFFFF"
        fontSize="10"
        fontWeight="900"
        textAnchor="middle"
        filter="url(#textShadow)"
        style={{ letterSpacing: '0.5px' }}
      >
        NEW
      </text>
    </svg>
  </div>
));

const ValueBox = ({ label, value }) => (
  <div className="flex flex-col items-center">
    <span className="text-white text-[10px] uppercase tracking-wider font-bold mb-1 opacity-90">
      {label}
    </span>
    {/* Circle Container */}
    <div className="bg-white min-w-12 h-8 px-2 rounded-full flex justify-center items-center shadow-lg border border-gray-200">
      <span className="text-black font-black text-lg leading-none">
        {value}
      </span>
    </div>
  </div>
);

const RowItem = React.memo(({ row }) => (
  <div className="py-4 flex flex-col items-center border-b border-black/30 last:border-b-0 md:border-b md:nth-last-child-2:border-b-0">
    <h2 className="text-white font-black uppercase text-xl tracking-wide text-center">
      {row.place}
    </h2>
    <h3 className="text-yellow-300 text-xs font-bold mb-4 bg-black/20 px-2 py-0.5 rounded">
      {row.time}
    </h3>
    
    <div className="flex items-center justify-center gap-2 w-full">
      <ValueBox label="Last" value={row.last} />
      {/* The Badge is inside here */}
      <ArrowBadge />
      <ValueBox label="Today" value={row.today} />
    </div>
  </div>
));

/* ---------- MAIN ---------- */

export default function ResultsTable() {
  const defaultRows = useMemo(
    () =>
      GAMES.map((g) => ({
        place: g.key,
        time: g.time,
        today: "",
        last: "",
      })),
    []
  );

  const [rows, setRows] = useState(defaultRows);

  useEffect(() => {
    const controller = new AbortController();

    const fetchResults = async () => {
      try {
        const start = performance.now();
        const res = await fetch(api.NewScrapeData.gameChart, {
          signal: controller.signal,
        });
        const json = await res.json();
        const end = performance.now();
        console.log(`RESULTS_TIME: ${(end - start).toFixed(2)} ms`);

        if (!json.success) return;

        const todayRow = json.data.find((r) => r.date === TODAY);
        const yesterdayRow = json.data.find((r) => r.date === YESTERDAY);

        const merged = defaultRows.map((row) => {
          const getVal = (sourceObj) => {
            const val = sourceObj?.games?.[row.place]?.result;
            return val && String(val).trim() !== "" ? val : "";
          };

          return {
            ...row,
            today: getVal(todayRow),
            last: getVal(yesterdayRow),
          };
        });

        setRows(merged);
      } catch (err) {
        if (err.name !== "AbortError") console.error("API Error", err);
      }
    };

    fetchResults();
    return () => controller.abort();
  }, [defaultRows]);

  return (
    <div className="w-full min-h-screen bg-[#002e00] p-3 md:p-6 font-sans overflow-x-hidden">
      <div className="max-w-5xl mx-auto border-2 border-[#1a4d1a] bg-[#003d00] shadow-2xl rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-black/40">
          {rows.map((r) => (
            <RowItem key={r.place} row={r} />
          ))}
        </div>
      </div>
    </div>
  );
}