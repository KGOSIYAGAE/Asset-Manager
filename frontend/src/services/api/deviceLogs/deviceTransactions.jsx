import axiosInstance from "../../../utils/axiosInstance";

//Hanlde get User's Device History
export const getUserDeviceHistory = async (data, setDevicesTransactionHistory) => {
  try {
    const response = await axiosInstance.get("/device-transactions/user-transactions", { params: data, showSpinner: true });

    if (response.data) {
      return setDevicesTransactionHistory(response.data.transactionHistory);
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data.message);
    } else {
      console.log(error);
      return console.log("An unexpected error occured, please try again");
    }
  }
};
