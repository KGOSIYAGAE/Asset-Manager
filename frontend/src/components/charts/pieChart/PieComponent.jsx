import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";

function PieComponent() {
  const data = [
    { value: 5, label: "Assigned" },
    { value: 10, label: "Available" },
    { value: 15, label: "Faulty" },
    { value: 20, label: "Scrap" },
  ];

  const size = {
    width: 400,
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

  return (
    <div className="h-[300px] flex justify-center items-center ">
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
