import { ToastContext } from "../context/ToastContext";
import { useContext } from "react";

export const useToastContext = () => {
  const toast = useContext(ToastContext);

  if (!toast) {
    throw new Error("useToastContext shoul be used inside ToastContextProvider");
  }

  return toast;
};
