import { useContext } from "react";
import { LoanDueContext } from "../context/LoanDueContext";

export const useLoanDueContext = () => {
  const loansDue = useContext(LoanDueContext);

  if (!loansDue) {
    throw new Error("useLoanDueContext must be used inside LoanContextProvider");
  }

  return loansDue;
};
