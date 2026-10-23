import { useContext } from "react";
import { LoadingContext } from "../context/LoadingContext";

export const useLoadingContext = () => {
  const loader = useContext(LoadingContext);

  if (!loader) {
    throw new Error("useLoadingContext should be used inside LoadingContextProvider");
  }

  return loader;
};
