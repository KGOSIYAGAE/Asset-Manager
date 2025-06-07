import axiosInstance from "../../../utils/axiosInstance";

export const getAllDeviceLogs = async (id, setDeviceLogs) => {
  try {
    const response = await axiosInstance.get("/device-logs/" + id);

    //console.log(...response.data.deviceLogList);

    if (!response.data.error) {
      return setDeviceLogs(response.data.deviceLogList);
      //setShowToast({ isShow: true, type: "success", message: response.data.message });
      //response.data.deviceLogList;
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

export const getAllLatestDevicesLogs = async (logDispatch) => {
  try {
    const response = await axiosInstance.get("/device-logs/");

    if (!response.data.error) {
      return logDispatch({ type: "SET_LOGS", payload: response.data.deviceLogList });
      //setShowToast({ isShow: true, type: "success", message: response.data.message });
      //response.data.deviceLogList;
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
