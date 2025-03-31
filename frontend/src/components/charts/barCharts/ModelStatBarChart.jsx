import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { getHPStatsByModel, getLenovoStatsByModel } from "../../../utils/analyticsMethods";

function ModelStatBarChart({ devices }) {
  const [lenovo_E16, setLenovo_E16] = useState(0);
  const [lenovo_V15, setLenovo_V15] = useState(0);
  const [hp_255G9, setHp_255G9] = useState(0);

  const getStatOnLoad = () => {
    const { lenovo_E16, lenovo_V15 } = getLenovoStatsByModel(devices);
    const { HP_255_G9 } = getHPStatsByModel(devices);

    setLenovo_E16(lenovo_E16);
    setLenovo_V15(lenovo_V15);
    setHp_255G9(HP_255_G9);
  };

  useEffect(() => {
    getStatOnLoad();
  }, [devices]);

  const values = [lenovo_E16, lenovo_V15, 0, hp_255G9, 0, 0];
  const xLabels = ["ThinkPad E16", "Lenovo V15", "HP 255 G8", "HP 255 G9", "HP 455 G9", "HP 455 G10"];

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
        width={1000}
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
