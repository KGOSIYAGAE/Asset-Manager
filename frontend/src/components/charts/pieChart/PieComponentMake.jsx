import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import { useDeviceContext } from "../../../hooks/useDevicesContext";
import { useEffect } from "react";
import { useState } from "react";
import { getDevicesStatsByModel } from "../../../utils/analyticsMethods";

function PieComponentMake({ devices }) {
  const [lenovoLapotps, setLenovoLaptops] = useState(0);
  const [hpLaptops, setHpLaptops] = useState(0);

  // Analytics Methods - get Models
  const getStatsOnLoad = () => {
    const devicesByModelReport = getDevicesStatsByModel(devices);

    setLenovoLaptops(devicesByModelReport.lenovoLaptops);
    setHpLaptops(devicesByModelReport.hpLaptops);
  };

  const data = [
    { value: lenovoLapotps, label: "Lenovo" },
    { value: hpLaptops, label: "HP" },
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

export default PieComponentMake;
