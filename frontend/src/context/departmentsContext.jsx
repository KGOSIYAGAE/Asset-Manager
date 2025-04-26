import { Children, createContext, useReducer } from "react";
import { departmentsList } from "../utils/departmentList";

export const DepartmentsContext = createContext();

export const departmentReducer = (state, action) => {
  switch (action.type) {
    case "SET_DEPARTMENTS":
      return {
        departmentsList: action.payload,
      };
    case "CREATE_DEPARTMENTS":
      return {
        departmentsList: [state, ...action.payload],
      };

    default:
      return state;
  }
};

export const DepartmentContextProvider = ({ children }) => {
  const [departmentState, departmentDispatch] = useReducer(departmentReducer, { departmetsList: null });

  return <DepartmentsContext.Provider value={{ departmentState, departmentDispatch }}>{children}</DepartmentsContext.Provider>;
};
