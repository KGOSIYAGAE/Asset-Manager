import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { getDevicesStatusSummary } from "../../../utils/analyticsMethods";

function StatusBarChart({ devices }) {
  const [availableLaptops, setAvailableLaptops] = useState(0);
  const [assignedLaptops, setAssignedLaptops] = useState(0);
  const [MaintenanceLaptops, setMaintenanceLaptops] = useState(0);
  const [lostLaptops, setLostLaptops] = useState(0);

  const getStatOnLoad = () => {
    //call from analyticsMethods - get status
    const deviceStatusReport = getDevicesStatusSummary(devices);

    setLostLaptops(deviceStatusReport.markedLost);
    setMaintenanceLaptops(deviceStatusReport.onMaintenance);
    setAssignedLaptops(deviceStatusReport.assignedUsers);
    setAvailableLaptops(deviceStatusReport.availableInStock);
  };

  useEffect(() => {
    getStatOnLoad();
  }, [devices]);

  const uData = [availableLaptops, assignedLaptops, MaintenanceLaptops, lostLaptops];
  const xLabels = ["Available", "Assigned", "Maintenance", "Lost"];

  return <BarChart width={600} height={270} series={[{ data: uData, id: "lenovo" }]} xAxis={[{ data: xLabels, scaleType: "band" }]} />;
}

export default StatusBarChart;
