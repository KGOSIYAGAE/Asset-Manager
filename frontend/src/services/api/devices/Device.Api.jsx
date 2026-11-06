import { useToast } from "../../../context/ToastContext";
import axiosInstance from "../../../utils/axiosInstance";

//Get All devices
export const getAllDevices = async (data, setAllDevices, setTotalPages) => {
  try {
    const response = await axiosInstance.get(`/devices/?page=${data.page}&limit=${data.limit}`, { params: data, showSpinner: true });

    if (response.data.deviceList) {
      setTotalPages(response.data.totalPages);
      return setAllDevices(response.data.deviceList);
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data);
    } else {
      return console.log("An unexpected error occured, please try again");
    }
  }
};

//Get All device due for return
export const getAllDeviceLoanDue = async (loanDueDispatch) => {
  try {
    const response = await axiosInstance.get("/devices/due-upgrade", { showSpinner: true });

    if (response.data.deviceList) {
      return loanDueDispatch({ type: "SET_LOANSDUE", payload: response.data.deviceList });
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data);
    } else {
      return console.log("An unexpected error occured, please try again");
    }
  }
};

//Get All device requires approval
export const getAllDeviceForApproval = async (data, setApprovalDevices, setTotalPages) => {
  try {
    const response = await axiosInstance.get(`/devices/requires-approval?page=${data.page}&limit=${data.limit}`, { showSpinner: true });

    if (response.data.deviceList) {
      setTotalPages(response.data.totalPages);
      return setApprovalDevices(response.data.deviceList);
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data);
    } else {
      return console.log("An unexpected error occured, please try again");
    }
  }
};

//Get All loaned device
export const getAllLoanedDevices = async (data, setLoanedDevices, setTotalPages) => {
  try {
    const response = await axiosInstance.get(`/devices/loaned-devices?page=${data.page}&limit=${data.limit}`, { showSpinner: true });

    if (response.data.deviceList) {
      setTotalPages(response.data.totalPages);
      return setLoanedDevices(response.data.deviceList);
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data);
    } else {
      return console.log("An unexpected error occured, please try again");
    }
  }
};

//Get all device due return at user termination
export const getAllDevicesDueReturn = async (data, setDueReturnDevices, setTotalPages) => {
  try {
    const response = await axiosInstance.get(`/devices/devices-due-return?page=${data.page}&limit=${data.limit}`, { showSpinner: true });

    if (response.data.deviceList) {
      setTotalPages(response.data.totalPages);

      return setDueReturnDevices(response.data.deviceList);
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data);
    } else {
      return console.log("An unexpected error occured, please try again");
    }
  }
};

//Hanlde get device
export const getDevice = async (id, setFormData) => {
  try {
    const response = await axiosInstance.get("/devices/" + id, { showSpinner: true });

    if (response.data) {
      return setFormData(response.data.deviceDetails);
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data.message);
    } else {
      return console.log("An unexpected error occured, please try again");
    }
  }
};

//Hanlde get device's stats
export const getDevicesStats = async (setDeviceStats) => {
  try {
    const response = await axiosInstance.get("/devices/devices-stats", { showSpinner: true });

    if (response.data) {
      return setDeviceStats(response.data.stats);
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data.message);
    } else {
      return console.log("An unexpected error occured, please try again");
    }
  }
};

//Hanlde get device
export const getAllDeviceDetails = async (id, setFormData) => {
  try {
    const response = await axiosInstance.get("/devices/device-details/" + id, { showSpinner: true });

    if (response.data) {
      return setFormData(response.data.deviceDetails);
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data.message);
    } else {
      return console.log("An unexpected error occured, please try again");
    }
  }
};

//Hanlde get user device
export const getAllUserDevices = async (user_id, devicesDispatch) => {
  try {
    const response = await axiosInstance.get("/devices/user-devices/" + user_id, { showSpinner: true });

    if (response.data) {
      return devicesDispatch({ type: "SET_DEVICES", payload: response.data.deviceList });
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data.message);
    } else {
      return console.log("An unexpected error occured, please try again");
    }
  }
};

//add device api
export const addDevice = async (deviceData, showToast) => {
  try {
    const response = await axiosInstance.post("/devices/add-device/", deviceData, { showSpinner: true });
    if (response.data) {
      return showToast(response.data.message, "success");
    }
  } catch (error) {
    if (error.response.data && error.response.data.message) {
      return showToast(error.response.data.message, "error");
    } else {
      console.log(error.response);
      return showToast("An unexpected error occured, please try again", "error");
    }
  }
};

//bulk add devices api
export const bulkAddDevice = async (devicesData, showToast, onClose) => {
  try {
    const response = await axiosInstance.post("/devices/bulk-add-devices/", devicesData, { showSpinner: true });

    if (response.data) {
      onClose();
      return showToast(response.data.message, "success");
    }
  } catch (error) {
    if (error.response.data && error.response.data.error) {
      onClose();
      return showToast(error.response.data.message, "error");
    } else {
      return showToast("An unexpected error occured, please try again", "error");
    }
  }
};

//Handle update device
export const updateDevice = async (id, deviceDetails, showToast) => {
  try {
    if (!id) {
      return showToast("Device id must be provided", "error");
    }

    const response = await axiosInstance.put("/devices/update-device/" + id, deviceDetails, { showSpinner: true });

    if (response.data) {
      return showToast(response.data.message, "success");
    }
  } catch (error) {
    if (error.response.data && error.response.data.message) {
      return showToast(error.response.data.message, "error");
    } else {
      console.log(error.response);
      return showToast("An unexpected error occured, please try again", "error");
    }
  }
};

//Assign device API call
export const assignDevice = async (id, data) => {
  try {
    const response = await axiosInstance.put("/devices/assign-device/" + id, data, { showSpinner: true });

    if (!response.data.error) {
      return { error: response.data.error, message: response.data.message };
    }
  } catch (error) {
    if (error.response.data && error.response.data.error) {
      return { error: error.response.data.error, message: error.response.data.message };
    } else {
      return { error: error.response.data.error, message: "An unexpected error occured, please try again." };
    }
  }
};

//Assign device API call
export const approveDevice = async (id, data, showToast) => {
  try {
    const response = await axiosInstance.put("/devices/approve-device/" + id, data, { showSpinner: true });

    if (!response.data.error) {
      return { isShow: true, type: "success", message: response.data.message };
    }
  } catch (error) {
    if (error.response.data && error.response.data.error) {
      return showToast(error.response.data.message, "error");
    } else {
      return showToast("An unexpected error occured, please try again.", "error");
    }
  }
};

//Loan device API call
export const createLoanDevice = async (id, data) => {
  try {
    const response = await axiosInstance.put("/devices/loan-device/" + id, data);

    if (!response.data.error) {
      console.log(response.data.message);

      return { error: response.data.error, message: response.data.message };
    }
  } catch (error) {
    if (error.response.data && error.response.data.error) {
      return { error: true, message: error.response.data.message };
    } else {
      return { error: true, message: "An unexpected error occured, please try again." };
    }
  }
};

//Assign device API call
export const releaseDevice = async (id, data, showToast) => {
  try {
    const response = await axiosInstance.put("/devices/release-device/" + id, data, { showSpinner: true });

    if (!response.data.error) {
      return showToast(response.data.message, "success");
    }
  } catch (error) {
    if (error.response.data && error.response.data.error) {
      return showToast(error.response.data.message, "error");
    } else {
      return showToast("An unexpected error occured, please try again.", "error");
    }
  }
};

//Assign device API call
export const rejectDevice = async (id, data, showToast) => {
  try {
    const response = await axiosInstance.put("/devices/reject-device/" + id, data, { showSpinner: true });

    if (!response.data.error) {
      return showToast(response.data.message, "success");
    }
  } catch (error) {
    if (error.response.data && error.response.data.error) {
      return showToast(error.response.data.message, "error");
    } else {
      return showToast("An unexpected error occured, please try again.", "error");
    }
  }
};

//delete device
export const deleteDevice = async (id, data, showToast) => {
  try {
    if (!id) {
      return showToast("Device id not provided.", "error");
    }

    const response = await axiosInstance.put("/devices/delete-device/" + id, data, { showSpinner: true });

    if (response.data) {
      return showToast(response.data.message, "success");
    }
  } catch (error) {
    if (error.response.data && error.response.data.error) {
      return showToast(error.response.data.message, "error");
    } else {
      return showToast("An unexpected router occured, please try again.", "error");
    }
  }
};
