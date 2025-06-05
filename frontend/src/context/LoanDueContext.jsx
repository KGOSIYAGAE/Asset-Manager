import { createContext, useReducer } from "react";

export const LoanDueContext = createContext();

export const loanDueReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOANSDUE":
      return {
        loanDueList: action.payload,
      };
    default:
      return state;
  }
};

export const LoanDueContextProvider = ({ children }) => {
  const [loanDueState, loanDueDispatch] = useReducer(loanDueReducer, { loanDueList: null });

  return <LoanDueContext.Provider value={{ loanDueState, loanDueDispatch }}>{children}</LoanDueContext.Provider>;
};
