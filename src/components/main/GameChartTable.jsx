import React, { useMemo } from "react";
import { useGameChartData } from "../../hooks/useGameChartData";
import "./GameChartTable.css";

// 🔥 OPTIMIZATION: Extract Row to Component
// This helps React's diffing engine handle large lists better.
const TableRow = React.memo(({ row, columns }) => {
  return (
    <tr>
      {/* Sticky Date Column */}
      <td className="sticky-col">{row.date}</td>

      {columns.map((col) => {
        // Safe access: row.games might be sparse, so we check existence
        // We access directly; no need for temp variables or formatting logic
        const cellData = row.games[col];
        const displayValue = (cellData && cellData.result) ? cellData.result : "";

        return (
          <td key={col} className="result-cell">
            {displayValue}
          </td>
        );
      })}
    </tr>
  );
});

const GameChartTable = () => {
  const { rows, loading, error, columns } = useGameChartData();

  // Memoize fallback to avoid array recreation
  const activeColumns = useMemo(() => columns || [], [columns]);

  if (loading) return <div className="simple-loader">Loading data...</div>;
  if (error) return <div className="error-text">{error}</div>;

  return (
    <div className="clean-container">
      <div className="table-responsive">
        <table className="minimal-table">
          <thead>
            <tr>
              <th className="sticky-col first-col-header">Date</th>
              {activeColumns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={activeColumns.length + 1} style={{ textAlign: "center", padding: "20px" }}>
                  No data available
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <TableRow 
                  key={row.date} // Date is unique, perfect key
                  row={row} 
                  columns={activeColumns} 
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// 🔥 Prevent full table re-render if parent changes unrelated state
export default React.memo(GameChartTable);