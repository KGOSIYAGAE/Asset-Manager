import { Children, createContext, useReducer } from "react";

export const InvoiceContext = createContext();

export const invoiceReducer = (state, action) => {
  switch (action.type) {
    case "SET_INVOICES":
      return {
        invoiceList: action.payload,
      };
    case "CREATE_INVOICE":
      return {
        invoiceList: [state, ...action.payload],
      };

    default:
      return state;
  }
};

export const InvoiceContextProvider = ({ children }) => {
  const [invoiceState, invoiceDispatch] = useReducer(invoiceReducer, { invoiceList: null });

  return <InvoiceContext.Provider value={{ invoiceState, invoiceDispatch }}>{children}</InvoiceContext.Provider>;
};
