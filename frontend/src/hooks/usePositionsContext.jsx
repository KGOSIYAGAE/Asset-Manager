import { useContext } from "react";
import { PositionsContext } from "../context/PositionsContext";

export const usePositionContext = () => {
  const positions = useContext(PositionsContext);

  if (!positions) {
    return new Error("usePostionContext should be used inside PositionContextProvider");
  }

  return positions;
};
