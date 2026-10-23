import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { PieChart } from "@mui/x-charts";
import { getDevicesCategorySummary } from "../../../utils/analyticsMethods";
import { getPercentage } from "../../../utils/getValueInPercentage";

// Color mapping for known statuses - add more as needed
const STATUS_COLORS = {
  Laptop: { hex: "#16a34a", bg: "bg-green-600" },
  Monitor: { hex: "#ea580c", bg: "bg-orange-600" },
};

const DEFAULT_COLOR = { hex: "#94a3b8", bg: "bg-slate-400" };

function PieDevicesCategory({ devicesByStatus }) {
  const totalDevices = devicesByStatus?.reduce((sum, d) => sum + Number(d.total), 0);

  // Build conic-gradient stops dynamically
  let cumulative = 0;
  const gradientStops = devicesByStatus?.map((item) => {
    const color = STATUS_COLORS[item.category]?.hex ?? DEFAULT_COLOR.hex;
    const start = cumulative;
    const percentage = totalDevices ? (Number(item.total) / totalDevices) * 100 : 0;
    cumulative += percentage;
    return `${color} ${start}% ${cumulative}%`;
  });

  const conicGradient = gradientStops?.length ? `conic-gradient(${gradientStops.join(", ")})` : "conic-gradient(#e2e8f0 0% 100%)"; // fallback grey ring when no data

  return (
    <div>
      <div className="w-[100%] h-[100%] flex items-center justify-between">
        <div className="w-48 h-48 rounded-full flex items-center justify-center" style={{ background: conicGradient }}>
          <div className="w-32 h-32 flex-col bg-white rounded-full flex items-center justify-center">
            <span className="font-bold">{totalDevices}</span>
            <span className="text-sm">Total</span>
          </div>
        </div>

        <div className="flex flex-col gap-5 justify-evenly text-sm">
          {devicesByStatus.map((item) => {
            const color = STATUS_COLORS[item.category]?.bg ?? DEFAULT_COLOR.bg;
            return (
              <div key={item.status} className="flex items-center justify-between gap-3">
                <div className={`${color} p-2 rounded-full`}></div>
                <span className="text-sm">{item.category}</span>
                <span>{item.total}</span>
                <span className="text-slate-500">{getPercentage(item.total, totalDevices)}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PieDevicesCategory;
