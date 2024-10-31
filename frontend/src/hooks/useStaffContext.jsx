import { useContext } from "react";
import { StaffContext } from "../context/StaffContext";

export const useStaffContext = () => {
  const staffUsers = useContext(StaffContext);

  if (!staffUsers) {
    throw new Error("useStaffContext should be used inside StaffContextProvider");
  }

  return staffUsers;
};
