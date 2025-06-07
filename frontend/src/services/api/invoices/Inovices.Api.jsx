import axiosInstance from "../../../utils/axiosInstance";

export const getAllInvoices = async (invoiceDispatch) => {
  try {
    const response = await axiosInstance.get("/invoices/");

    if (response.data.invoicesList) {
      invoiceDispatch({ type: "SET_INVOICES", payload: response.data.invoicesList });
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      console.log(error.response.data.message);
    }
    console.log("An unexpected error occured, please try again.");
  }
};
