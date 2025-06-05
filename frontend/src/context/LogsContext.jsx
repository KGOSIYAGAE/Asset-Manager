import { Children, createContext, useReducer } from "react";

export const LogsContext = createContext();

export const logReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOGS":
      return {
        logList: action.payload,
      };
    case "CREATE_LOGS":
      return {
        logList: [state, ...action.payload],
      };
    default:
      return state;
  }
};

export const LogsContextProvider = ({ children }) => {
  const [logState, logDispatch] = useReducer(logReducer, { logList: null });

  return <LogsContext.Provider value={{ logState, logDispatch }}>{children}</LogsContext.Provider>;
};
