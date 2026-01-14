import React, { useEffect, useMemo, useState } from "react";
import api from "../../api/api";

/* ---------- CONFIG ---------- */
const GAMES = [
  { key: "DESAWAR", time: "(05:00 AM)" },
  { key: "SHRI GANESH", time: "(04:30 PM)" },
  { key: "DELHI BAZAR", time: "(03:00 PM)" },
  { key: "GALI", time: "(11:30 PM)" },
  { key: "GHAZIABAD", time: "(08:30 PM)" },
  { key: "FARIDABAD", time: "(06:00 PM)" },
  { key: "NOIDA KING", time: "(10:30 PM)" },
];

const formatDate = (d) =>
  `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}-${d.getFullYear()}`;

const TODAY = formatDate(new Date());
const YESTERDAY = formatDate(new Date(Date.now() - 86400000));

/* ---------- UI PARTS ---------- */

const ArrowBadge = React.memo(() => (
  <div className="flex items-center justify-center px-1">
    <svg width="42" height="18" viewBox="0 0 42 18">
      <path d="M0 0H35L42 9L35 18H0V0Z" fill="#FDE047" />
      <path d="M1.5 1.5H34.5L40 9L34.5 16.5H1.5V1.5Z" fill="#D00000" />
      <text x="5" y="12.5" fill="#FDE047" fontSize="9" fontWeight="900">
        NEW
      </text>
    </svg>
  </div>
));

const ValueBox = ({ label, value }) => (
  <div className="flex flex-col items-center">
    <span className="text-white text-[11px] font-bold mb-1">{label}</span>
    <div className="bg-white min-w-10 px-1.5 h-6 rounded-full flex justify-center items-center shadow-md">
      <span className="text-[#D00000] font-black text-sm">{value}</span>
    </div>
  </div>
);

const RowItem = React.memo(({ row }) => (
  <div className="py-5 flex flex-col items-center border-b border-black/40">
    <h2 className="text-white font-black uppercase text-[16px]">
      {row.place}
    </h2>
    <h3 className="text-yellow-300 text-[12px] font-bold mb-3">
      {row.time}
    </h3>
    <div className="flex items-end gap-1">
      <ValueBox label="Last" value={row.last} />
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
        today: "-",
        last: "-",
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
        console.log(
          `RESULTS_FRONTEND_TIME: ${(end - start).toFixed(2)} ms`
        );

        if (!json.success) return;

        const todayRow = json.data.find((r) => r.date === TODAY);
        const yesterdayRow = json.data.find((r) => r.date === YESTERDAY);

        const merged = defaultRows.map((row) => ({
          ...row,
          today: todayRow?.[row.place] || "-",
          last: yesterdayRow?.[row.place] || "-",
        }));

        setRows(merged);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Results API failed", err);
        }
      }
    };

    fetchResults();
    return () => controller.abort();
  }, [defaultRows]);

  const mid = Math.ceil(rows.length / 2);
  const left = rows.slice(0, mid);
  const right = rows.slice(mid);

  return (
    <div className="w-full min-h-screen bg-[#002e00] p-4">
      <div className="max-w-4xl mx-auto border-2 border-black bg-[#003d00]">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-black">
          <div>{left.map((r) => <RowItem key={r.place} row={r} />)}</div>
          <div>{right.map((r) => <RowItem key={r.place} row={r} />)}</div>
        </div>
      </div>
    </div>
  );
}
