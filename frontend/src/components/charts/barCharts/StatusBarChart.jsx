import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { getDevicesStatusSummary } from "../../../utils/analyticsMethods";

function StatusBarChart({ devices }) {
  const [lenovo_stats, setLenovo_stats] = useState([]);
  const [hp_stats, setHp_stats] = useState([]);
  const [dell_stats, setDell_stats] = useState([]);

  const getStatOnLoad = () => {
    //call from analyticsMethods - get status
    const { lenovoLaptopStats, hpLaptopStats, dellLaptopStats } = getDevicesStatusSummary(devices);

    setLenovo_stats([lenovoLaptopStats.lost, lenovoLaptopStats.assigned, lenovoLaptopStats.available, lenovoLaptopStats.maintenance]);
    setHp_stats([hpLaptopStats.lost, hpLaptopStats.assigned, hpLaptopStats.available, hpLaptopStats.maintenance]);
    setDell_stats([dellLaptopStats.lost, dellLaptopStats.assigned, dellLaptopStats.available, dellLaptopStats.maintenance]);
  };

  useEffect(() => {
    getStatOnLoad();
  }, [devices]);

  const xLabels = ["Available", "Assigned", "Maintenance", "Lost"];

  return (
    <BarChart
      width={600}
      height={270}
      series={[
        { data: lenovo_stats, label: "lenovo" },
        { data: hp_stats, label: "HP" },
        { data: dell_stats, label: "Dell" },
      ]}
      xAxis={[{ data: xLabels, scaleType: "band" }]}
    />
  );
}

export default StatusBarChart;
