import { createContext, useReducer } from "react";

export const ToastContext = createContext();

export const toastReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        isShown: action.payload.isShown,
        type: action.payload.type,
        message: action.payload.message,
      };
    case "ERROR":
      return {
        isShown: action.payload.isShown,
        type: action.payload.type,
        message: action.payload.message,
      };
    case "CLOSE":
      return {
        isShown: action.payload.isShown,
        type: action.payload.type,
        message: action.payload.message,
      };

      return state;
  }
};

export const ToastContextProvider = ({ children }) => {
  const [toastState, toastDispatch] = useReducer(toastReducer, { isShown: false, type: "", message: "" });

  return <ToastContext.Provider value={{ toastState, toastDispatch }}>{children}</ToastContext.Provider>;
};
