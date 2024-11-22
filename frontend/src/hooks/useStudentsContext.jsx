import { StudentsContext } from "../context/StudentsContext";
import { useContext } from "react";

export const useStudentsContext = () => {
  const studentUsers = useContext(StudentsContext);

  if (!studentUsers) {
    throw new Error("useStudentContext should be used inside StudentsContextProvider");
  }

  return studentUsers;
};
