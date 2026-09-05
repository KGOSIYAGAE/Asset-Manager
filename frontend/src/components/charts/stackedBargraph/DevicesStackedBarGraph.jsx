import React from "react";
import { getPercentage } from "../../../utils/getValueInPercentage";

// Reuse the same color mapping from the pie chart for consistency
const STATUS_COLORS = {
  Available: { hex: "#16a34a", bg: "bg-green-600" },
  Assigned: { hex: "#ea580c", bg: "bg-orange-600" },
  Loaned: { hex: "#2563eb", bg: "bg-blue-600" },
  Reserved: { hex: "#9333ea", bg: "bg-purple-600" },
  "Reserved for students": { hex: "#c026d3", bg: "bg-fuchsia-600" },
  Maintenance: { hex: "#9333ea", bg: "bg-purple-600" },
  Stolen: { hex: "#dc2626", bg: "bg-red-600" },
  Sold: { hex: "#64748b", bg: "bg-slate-500" },
  Disposed: { hex: "#78716c", bg: "bg-stone-500" },
  Retired: { hex: "#a8a29e", bg: "bg-stone-400" },
  "Written Off": { hex: "#1e293b", bg: "bg-slate-800" },
};

const DEFAULT_COLOR = { hex: "#94a3b8", bg: "bg-slate-400" };

/**
 * Pivots flat rows [{ make, model, status, total }]
 * into [{ key, make, model, total, statuses: [{status, total}] }]
 */

function groupByMakeModel(rows = []) {
  const map = new Map();

  rows.forEach((row) => {
    const key = `${row.make} ${row.model}`;
    const total = Number(row.total);

    if (!map.has(key)) {
      map.set(key, {
        key,
        make: row.make,
        model: row.model,
        total: 0,
        statuses: [],
      });
    }

    const entry = map.get(key);
    entry.total += total;
    entry.statuses.push({ status: row.status, total });
  });

  // Sort largest fleet first
  return Array.from(map.values()).sort((a, b) => b.total - a.total);
}

// Collects the unique statuses present across all rows, for the legend
function getUniqueStatuses(rows = []) {
  const seen = new Set();
  rows.forEach((row) => seen.add(row.status));
  return Array.from(seen);
}

function DevicesStackedBarGraph({ devicesMakeModelStatusCount = [] }) {
  const grouped = groupByMakeModel(devicesMakeModelStatusCount);
  const uniqueStatuses = getUniqueStatuses(devicesMakeModelStatusCount);
  const maxTotal = Math.max(...grouped.map((g) => g.total), 1);

  return (
    <div>
      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-sm">
        {uniqueStatuses.map((status) => {
          const color = STATUS_COLORS[status]?.bg ?? DEFAULT_COLOR.bg;
          return (
            <div key={status} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${color}`}></div>
              <span className="text-slate-600">{status}</span>
            </div>
          );
        })}
      </div>

      {/* Bars */}
      <div className="flex flex-col gap-4">
        {grouped.map((item) => (
          <div key={item.key} className="flex flex-col gap-1">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-slate-700">
                {item.make} {item.model}
              </span>
              <span className="text-slate-500">{item.total}</span>
            </div>

            {/* Bar width scales relative to the largest make/model total */}
            <div className="h-6 w-full bg-slate-100 rounded-md overflow-hidden flex" style={{ width: "100%" }}>
              <div className="flex h-full rounded-md overflow-hidden" style={{ width: `${(item.total / maxTotal) * 100}%` }}>
                {item.statuses.map((s) => {
                  const color = STATUS_COLORS[s.status]?.bg ?? DEFAULT_COLOR.bg;
                  const widthPct = getPercentage(s.total, item.total);
                  return (
                    <div
                      key={s.status}
                      className={`h-full ${color} flex items-center justify-center group relative`}
                      style={{ width: `${widthPct}%` }}
                      title={`${s.status}: ${s.total} (${widthPct}%)`}
                    >
                      {/* Only show label if segment is wide enough to fit text */}
                      {Number(widthPct) > 8 && <span className="text-[10px] text-white font-medium">{s.total}</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DevicesStackedBarGraph;
