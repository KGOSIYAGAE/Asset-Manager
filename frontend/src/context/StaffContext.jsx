import { Children, createContext, useReducer } from "react";

export const StaffContext = createContext();

export const staffReducer = (state, action) => {
  switch (action.type) {
    case "SET_STAFF":
      return {
        staffList: action.payload,
      };
    case "SET_SELECTED_STAFF":
      return {
        staffList: action.payload,
      };
    case "CREATE_STAFF":
      return {
        staffList: [action.payload, ...state.staffList],
      };
    default:
      return state;
  }
};

export const StaffContextProvider = ({ children }) => {
  const [staffState, staffDispatch] = useReducer(staffReducer, { staffList: null });

  return <StaffContext.Provider value={{ staffState, staffDispatch }}>{children}</StaffContext.Provider>;
};
