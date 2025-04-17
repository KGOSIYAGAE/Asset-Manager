import { useContext } from "react";
import { InvoiceContext } from "../context/InvoicesContext";

export const useInvoiceContext = () => {
  const invoices = useContext(InvoiceContext);

  if (!invoices) {
    throw new Error("useInvoiceContext should be used inside InvoiceContextProvider");
  }

  return invoices;
};
