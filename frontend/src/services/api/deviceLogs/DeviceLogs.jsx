import axiosInstance from "../../../utils/axiosInstance";

export const getAllDeviceTransactions = async (data, setDeviceLogs) => {
  try {
    const response = await axiosInstance.get("/device-transactions/transactions", { params: data, showSpinner: true });

    //console.log(...response.data.deviceLogList);

    if (!response.data.error) {
      return setDeviceLogs(response.data.transactionList);
      //setShowToast({ isShow: true, type: "success", message: response.data.message });
      //response.data.deviceLogList;
    }
  } catch (error) {
    if (error.response.data.error) {
      console.log(error.response.data.message);
      return setDeviceLogs(null);
    } else {
      return console.log(`An unexpected error occured, please try again.${error.response.error}`);
    }
  }
};
////////////////////////////////////////////////////////

export const getAllLatestDevicesLogs = async (logDispatch) => {
  try {
    const response = await axiosInstance.get("/device-logs/", { showSpinner: true });

    if (!response.data.error) {
      return logDispatch({ type: "SET_LOGS", payload: response.data.deviceLogList });
    }
  } catch (error) {
    if (error.response.data.error) {
      return console.log(error.response.data.message);
    } else {
      return console.log(`An unexpected error occured, please try again.${error.response.error}`);
    }
  }
};
////////////////////////////////////////////////////////
