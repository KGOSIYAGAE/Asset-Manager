import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";

function StatusBarChart({ devices }) {
  const [availableLaptops, setAvailableLaptops] = useState(0);
  const [assignedLaptops, setAssignedLaptops] = useState(0);
  const [MaintenanceLaptops, setMaintenanceLaptops] = useState(0);
  const [lostLaptops, setLostLaptops] = useState(0);

  const getStatSummary = () => {
    let avalable = 0;
    let assigned = 0;
    let maintenance = 0;
    let lost = 0;

    for (let i = 0; i < devices?.length; i++) {
      if (devices[i].status === "Available") {
        avalable += 1;
      }

      if (devices[i].status === "Assigned") {
        assigned += 1;
      }

      if (devices[i].status === "Maintenance") {
        maintenance += 1;
      }

      if (devices[i].status === "Lost") {
        lost += 1;
      }
    }

    setLostLaptops(lost);
    setMaintenanceLaptops(maintenance);
    setAssignedLaptops(assigned);
    setAvailableLaptops(avalable);
  };

  useEffect(() => {
    getStatSummary();
  }, [devices]);

  const uData = [availableLaptops, assignedLaptops, MaintenanceLaptops, lostLaptops];
  const xLabels = ["Available", "Assigned", "Maintenance", "Lost"];

  return <BarChart width={600} height={270} series={[{ data: uData, id: "uvId" }]} xAxis={[{ data: xLabels, scaleType: "band" }]} />;
}

export default StatusBarChart;
