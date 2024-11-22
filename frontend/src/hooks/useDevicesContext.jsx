import { useContext } from "react";
import { DevicesContext } from "../context/DevicesContext";

export const useDeviceContext = () => {
  const devices = useContext(DevicesContext);

  if (!devices) {
    throw new Error("useDeviceContext should be used inside DeviceContextProvider");
  }

  return devices;
};
