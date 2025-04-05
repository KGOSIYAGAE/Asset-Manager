import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { getDevicesStatusSummary, getLenovoStatsByModel } from "../../../utils/analyticsMethods";

function StatusBarChart({ devices }) {
  const [lenovo_stats, setLenovo_stats] = useState([]);
  const [hp_stats, setHp_stats] = useState([]);
  const [dell_stats, setDell_stats] = useState([]);

  const getStatOnLoad = () => {
    //call from analyticsMethods - get status
    const { lenovoLaptopStats, hpLaptopStats, dellLaptopStats } = getDevicesStatusSummary(devices);

    setLenovo_stats([lenovoLaptopStats.available, lenovoLaptopStats.assigned, lenovoLaptopStats.maintenance, lenovoLaptopStats.lost]);
    setHp_stats([hpLaptopStats.available, hpLaptopStats.assigned, hpLaptopStats.maintenance, hpLaptopStats.lost]);
    setDell_stats([dellLaptopStats.available, dellLaptopStats.assigned, dellLaptopStats.maintenance, dellLaptopStats.lost]);
  };

  useEffect(() => {
    getStatOnLoad();
  }, [devices]);

  const xLabels = ["Available", "Assigned", "Maintenance", "Lost"];

  const otherSetting = {
    yAxis: [{ label: "Laptops" }],
    grid: { horizontal: true },
    sx: {
      [`& .${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translateX(-11px)",
      },
    },
  };
  return (
    <BarChart
      width={600}
      height={270}
      slotProps={{
        // Custom message for empty chart
        noDataOverlay: { message: "Select some data to display." },
      }}
      series={[
        { data: lenovo_stats, label: "lenovo", color: "#f97316" },
        { data: hp_stats, label: "HP", color: "#3b82f6 " },
        { data: dell_stats, label: "Dell" },
      ]}
      xAxis={[{ data: xLabels, scaleType: "band" }]}
      {...otherSetting}
    />
  );
}

export default StatusBarChart;
