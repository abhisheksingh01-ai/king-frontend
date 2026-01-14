import React from "react";
import { useGameChartData } from "../../hooks/useGameChartData";
import "./GameChartTable.css";

const COLUMNS = [
  "DESAWAR",
  "SHRI GANESH",
  "DELHI BAZAR",
  "GALI",
  "GHAZIABAD",
  "FARIDABAD",
  "NOIDA KING",
];

export default function GameChartTable() {
  const { rows, loading, error } = useGameChartData();

  if (loading && rows.length === 0)
    return <div className="simple-loader">Loading data...</div>;

  if (error) return <div className="error-text">{error}</div>;

  return (
    <div className="clean-container">
      <table className="minimal-table">
        <thead>
          <tr>
            <th>Date</th>
            {COLUMNS.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={COLUMNS.length + 1}>No data available</td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.date}>
                <td>{row.date}</td>
                {COLUMNS.map((col) => (
                  <td key={col}>{row[col]}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
