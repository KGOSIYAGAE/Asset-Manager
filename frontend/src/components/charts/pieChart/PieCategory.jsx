import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { PieChart } from "@mui/x-charts";
import { getDevicesCategorySummary } from "../../../utils/analyticsMethods";

function PieCategory({ devices }) {
  const [laptops, setLaptops] = useState(5);
  const [desktops, setDesktops] = useState(4);
  const [allInOnes, setAllInOnes] = useState(3);
  const [monitors, setMonitors] = useState(2);

  const getStatsOnLoad = () => {
    const devicesCategoryReport = getDevicesCategorySummary(devices);

    setLaptops(devicesCategoryReport.laptops);
    setDesktops(devicesCategoryReport.desktops);
    setAllInOnes(devicesCategoryReport.allInOnes);
    setMonitors(devicesCategoryReport.monitors);
  };

  const data = [
    { value: laptops, label: "Laptop" },
    { value: desktops, label: "Desktop" },
    { value: allInOnes, label: "All In One" },
    { value: monitors, label: "Monitor" },
  ];

  const size = {
    width: 390,
    height: 400,
  };

  const StyledText = styled("text")(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: "middle",
    dominantBaseline: "central",
    fontSize: 20,
  }));

  function PieCenterLabel({ children }) {
    const { width, height, left, top } = useDrawingArea();
    return (
      <StyledText x={left + width / 2} y={top + height / 2}>
        {children}
      </StyledText>
    );
  }

  useEffect(() => {
    getStatsOnLoad();
  }, [devices]);

  return (
    <div className="h-[200px] flex justify-center items-center">
      <PieChart
        margin={{ left: 100, right: 100 }}
        series={[{ data, innerRadius: 130 }]}
        {...size}
        slotProps={{
          legend: {
            direction: "row",
            position: { vertical: "bottom" },
            padding: -10,
          },
        }}
      ></PieChart>
    </div>
  );
}

export default PieCategory;
