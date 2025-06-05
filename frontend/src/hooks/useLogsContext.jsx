import { useContext } from "react";
import { LogsContext } from "../context/LogsContext";

export const useLogsContext = () => {
  const logs = useContext(LogsContext);

  if (!logs) {
    throw new Error("useLogContext should be used inside LogContextProvider");
  }

  return logs;
};
