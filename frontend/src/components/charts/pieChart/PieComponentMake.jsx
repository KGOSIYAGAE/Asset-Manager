import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import { useDeviceContext } from "../../../hooks/useDevicesContext";
import { useEffect } from "react";
import { useState } from "react";
import { getDevicesStatsByMake } from "../../../utils/analyticsMethods";

function PieComponentMake({ devices }) {
  const [lenovoLapotps, setLenovoLaptops] = useState(0);
  const [hpLaptops, setHpLaptops] = useState(0);

  // Analytics Methods - get Models
  const getStatsOnLoad = () => {
    const { LENOVO_LAPTOPS, HP_LAPTOPS } = getDevicesStatsByMake(devices);

    setLenovoLaptops(LENOVO_LAPTOPS?.length);
    setHpLaptops(HP_LAPTOPS?.length);
  };

  const data = [
    { value: lenovoLapotps, label: "Lenovo", color: "#f97316" },
    { value: hpLaptops, label: "HP", color: "#3b82f6 " },
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
