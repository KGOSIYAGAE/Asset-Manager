import { useContext } from "react";
import { DepartmentsContext } from "../context/departmentsContext";

export const useDepartmentContext = () => {
  const departments = useContext(DepartmentsContext);

  if (!departments) {
    return new Error("useDepartmentConatext should be used inside DepartmentsContextProvider");
  }

  return departments;
};
