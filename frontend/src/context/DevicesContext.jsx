import { createContext, useReducer } from "react";

export const DevicesContext = createContext();

export const deviceReducer = (state, action) => {
  switch (action.type) {
    case "SET_DEVICES":
      return {
        deviceList: action.payload,
      };
    case "CREATE_DEVICE":
      return {
        deviceList: [state, ...action.payload],
      };

    default:
      return state;
  }
};

export const DevicesContextProvider = ({ children }) => {
  const [devicesState, devicesDispatch] = useReducer(deviceReducer, { deviceList: null });

  return <DevicesContext.Provider value={{ devicesState, devicesDispatch }}>{children}</DevicesContext.Provider>;
};
