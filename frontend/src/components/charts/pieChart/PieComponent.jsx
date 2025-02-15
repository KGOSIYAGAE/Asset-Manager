import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import { useDeviceContext } from "../../../hooks/useDevicesContext";
import { useEffect } from "react";
import { useState } from "react";

function PieComponent({ devices }) {
  const { devicesState, devicesDispatch } = useDeviceContext();

  const [assigned, setAssigned] = useState(0);
  const [available, setAvailable] = useState(0);
  const [faulty, setFaulty] = useState(0);
  const [scrap, setScrap] = useState(0);

  const getStatSammury = () => {
    for (let i = 0; i < devicesState?.deviceList?.length; i++) {
      //console.log(devicesState.deviceList[i]);

      if (devicesState.deviceList[i].device_condition === "New") {
        setAssigned((prevSate) => {
          return prevSate + 1;
        });
      }

      if (devicesState.deviceList[i].device_condition === "Used") {
        setAvailable((prevSate) => {
          return prevSate + 1;
        });
      }

      if (devicesState.deviceList[i].device_condition === "Faulty") {
        setFaulty((prevSate) => {
          return prevSate + 1;
        });
      }

      if (devicesState.deviceList[i].device_condition === "Scrap") {
        setScrap((prevSate) => {
          return prevSate + 1;
        });
      }
    }
  };

  const data = [
    { value: assigned, label: "New" },
    { value: available, label: "Used" },
    { value: faulty, label: "Faulty" },
    { value: scrap, label: "Scrap" },
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

  useEffect(() => {
    getStatSammury();
  }, [assigned, available, faulty, scrap, getStatSammury]);

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
