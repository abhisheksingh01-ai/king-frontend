import React from "react";
import { useGameChartData } from "../../hooks/useGameChartData";
import "./GameChartTable.css";

export default function GameChartTable() {
  const { rows, loading, error, columns } = useGameChartData();

  const COLUMNS_FALLBACK = columns || [
    "DESAWAR",
    "SHRI GANESH",
    "DELHI BAZAR",
    "GALI",
    "GHAZIABAD",
    "FARIDABAD",
    "NOIDA KING",
  ];

  if (loading && rows.length === 0)
    return <div className="simple-loader">Loading data...</div>;
  if (error) return <div className="error-text">{error}</div>;

  return (
    <div className="clean-container">
      <div className="table-responsive">
        <table className="minimal-table">
          <thead>
            <tr>
              {/* Header for Date */}
              <th className="sticky-col first-col-header">Date</th>
              {COLUMNS_FALLBACK.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={COLUMNS_FALLBACK.length + 1}>No data available</td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.date}>
                  {/* Sticky Date Column */}
                  <td className="sticky-col">{row.date}</td>

                  {COLUMNS_FALLBACK.map((col) => {
                    const game = row.games[col];
                    
                    // Logic: If result exists, show it. If not, show empty string "".
                    const hasValue = game && game.result && String(game.result).trim() !== "";
                    const displayValue = hasValue ? game.result : ""; 

                    return (
                      <td key={col} className="result-cell">
                        {displayValue}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}