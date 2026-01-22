import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { getHPStatsByModel, getLenovoStatsByModel } from "../../../utils/analyticsMethods";

function ModelStatBarChart({ devices }) {
  const [lenovoStats, setLenovoStats] = useState([]);
  const [hpStats, setHpStats] = useState([]);

  const getStatOnLoad = () => {
    setLenovoStats([...getLenovoStatsByModel(devices)]);
    setHpStats([...getHPStatsByModel(devices)]);
  };

  useEffect(() => {
    getStatOnLoad();
  }, [devices]);

  const values = [...lenovoStats, ...hpStats];
  const xLabels = ["E16 Gen 2", "E16 Gen 3", "Lenovo V15", "HP 255 G8", "HP 255 G9", "HP 455 G8", "HP 455 G9", "HP 455 G10"];

  const otherSetting = {
    xAxis: [{ label: "Laptops" }],
    grid: { horizontal: true, vertical: true },
  };

  return (
    <div>
      <BarChart
        margin={{
          left: 100,
          right: 30,
          top: 40,
          bottom: 50,
        }}
        slotProps={{
          // Custom message for empty chart
          noDataOverlay: { message: "Select some data to display." },
        }}
        width={900}
        height={270}
        series={[{ data: values, color: "#f97316" }]}
        yAxis={[{ data: xLabels, scaleType: "band" }]}
        layout="horizontal"
        {...otherSetting}
      />
    </div>
  );
}

export default ModelStatBarChart;
