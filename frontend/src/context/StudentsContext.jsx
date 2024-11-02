import { createContext, useReducer } from "react";

export const StudentsContext = createContext();

export const studentsReducer = (state, action) => {
  switch (action.type) {
    case "SET_STUDENTS":
      return {
        studentsList: action.payload,
      };
    case "CREATE_STUDENT":
      return {
        studentsList: [action.payload, ...state.studentsList],
      };
    default:
      return state;
  }
};

export const StudentsContextProvider = ({ children }) => {
  const [studentState, studentDispatch] = useReducer(studentsReducer, { studentsList: null });

  return <StudentsContext.Provider value={{ studentState, studentDispatch }}>{children}</StudentsContext.Provider>;
};
