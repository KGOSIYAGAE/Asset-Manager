import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import { useDeviceContext } from "../../../hooks/useDevicesContext";
import { useEffect } from "react";
import { useState } from "react";
import { getDevicesConditionSummary } from "../../../utils/analyticsMethods";

function PieComponent({ devices }) {
  const [newLaptops, setNewLaptops] = useState(0);
  const [secondHandLaptops, setSecondHandLaptops] = useState(0);
  const [faultyLaptops, setFaultyLaptops] = useState(0);
  const [scrapLaptops, setScrapLaptops] = useState(0);
  const [returnLaptops, setReturnLaptops] = useState(0);

  //call from analyticsMethods - get condition
  const getStatsOnLoad = () => {
    const devicesConditionReport = getDevicesConditionSummary(devices);

    setNewLaptops(devicesConditionReport.newLaptops);
    setSecondHandLaptops(devicesConditionReport.secondHandLaptops);
    setFaultyLaptops(devicesConditionReport.faultyLaptops);
    setScrapLaptops(devicesConditionReport.scrapedLaptops);
    setReturnLaptops(devicesConditionReport.returnLaptops);
  };

  const data = [
    { value: newLaptops, label: "New" },
    { value: secondHandLaptops, label: "Used" },
    { value: returnLaptops, label: "Return" },
    { value: faultyLaptops, label: "Faulty" },
    { value: scrapLaptops, label: "Scrap" },
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
    <div className="h-[200px] flex justify-center items-center ">
      <PieChart
        margin={{ left: 100, right: 100 }}
        series={[{ data, innerRadius: 130 }]}
        {...size}
        slotProps={{
          legend: {
            direction: "row",
            position: { vertical: "bottom" },
            padding: -40,
          },
        }}
      ></PieChart>
    </div>
  );
}

export default PieComponent;
