import axiosInstance from "../../../utils/axiosInstance";

//Get All devices
export const getAllDevices = async (devicesDispatch) => {
  try {
    const response = await axiosInstance.get("/devices/", { showSpinner: true });

    if (response.data.deviceList) {
      devicesDispatch({ type: "SET_DEVICES", payload: response.data.deviceList });
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
export const getAllDeviceForApproval = async (loanDueDispatch) => {
  try {
    const response = await axiosInstance.get("/devices/requires-approval", { showSpinner: true });

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
export const addDevice = async (deviceData, setShowToast) => {
  try {
    const response = await axiosInstance.post("/devices/add-device/", deviceData, { showSpinner: true });
    if (response.data) {
      return setShowToast({ isShown: true, type: "success", message: response.data.message });
    }
  } catch (error) {
    if (error.response.data && error.response.data.message) {
      return setShowToast({ isShown: true, type: "error", message: error.response.data.message });
    } else {
      console.log(error.response);
      return setShowToast({ isShown: true, type: "error", message: "An unexpected error occured, please try again" });
    }
  }
};

//bulk add devices api
export const bulkAddDevice = async (devicesData, setShowToast, onClose) => {
  console.log(devicesData.devices[0].warranty_end_date);

  try {
    const response = await axiosInstance.post("/devices/bulk-add-devices/", devicesData, { showSpinner: true });

    if (response.data) {
      onClose();
      return setShowToast({ isShown: true, type: "success", message: response.data.message });
    }
  } catch (error) {
    if (error.response.data && error.response.data.error) {
      onClose();
      return setShowToast({ isShown: true, type: "error", message: error.response.data.message });
    } else {
      console.log("An unexpected error occured, please try again", error);
      return setShowToast({ isShown: true, type: "error", message: "An unexpected error occured, please try again" });
    }
  }
};

//Handle update device
export const updateDevice = async (id, deviceDetails, setShowToast) => {
  try {
    if (!id) {
      return setShowToast({ isShown: true, type: "error", message: "Device id must be provided" });
    }

    const response = await axiosInstance.put("/devices/update-device/" + id, deviceDetails, { showSpinner: true });

    if (response.data) {
      return setShowToast({ isShown: true, type: "success", message: response.data.message });
    }
  } catch (error) {
    if (error.response.data && error.response.data.error) {
      return setShowToast({ isShown: true, type: "error", message: error.response.data.message });
    } else {
      return setShowToast({ isShown: true, type: "error", message: "An unexpected error occured, please try again." });
    }
  }
};

//Assign device API call
export const assignDevice = async (id, data, setShowToast) => {
  try {
    const response = await axiosInstance.put("/devices/assign-device/" + id, data, { showSpinner: true });

    if (!response.data.error) {
      return setShowToast({ isShow: true, type: "success", message: response.data.message });
    }
  } catch (error) {
    if (error.response.data && error.response.data.error) {
      return setShowToast({ isShow: true, type: "error", message: error.response.data.message });
    } else {
      return setShowToast({ isShow: true, type: "error", message: "An unexpected error occured, please try again." });
    }
  }
};

//Loan device API call
export const createLoanDevice = async (id, data, setShowToast) => {
  try {
    const response = await axiosInstance.put("/devices/loan-device/" + id, data);

    if (!response.data.error) {
      return setShowToast({ isShow: true, type: "success", message: response.data.message });
    }
  } catch (error) {
    if (error.response.data && error.response.data.error) {
      return setShowToast({ isShow: true, type: "error", message: error.response.data.message });
    } else {
      return setShowToast({ isShow: true, type: "error", message: "An unexpected error occured, please try again." });
    }
  }
};

//Assign device API call
export const releaseDevice = async (id, data, setShowToast) => {
  try {
    const response = await axiosInstance.put("/devices/release-device/" + id, data, { showSpinner: true });

    if (!response.data.error) {
      return setShowToast({ isShow: true, type: "success", message: response.data.message });
    }
  } catch (error) {
    if (error.response.data && error.response.data.error) {
      return setShowToast({ isShow: true, type: "error", message: error.response.data.message });
    } else {
      return setShowToast({ isShow: true, type: "error", message: "An unexpected error occured, please try again." });
    }
  }
};

//delete device
export const deleteDevice = async (id, setShowToast) => {
  try {
    if (!id) {
      return setShowToast({ isShown: true, type: "error", message: "Device id not provided." });
    }

    const response = await axiosInstance.delete("/devices/delete-device/" + id, { showSpinner: true });

    if (response.data) {
      return setShowToast({ isShown: true, type: "success", message: response.data.message });
    }
  } catch (error) {
    if (error.response.data && error.response.data.error) {
      return setShowToast({ isShown: true, type: "error", message: response.data.message });
    } else {
      return setShowToast({ isShown: true, type: "error", message: "An unexpected router occured, please try again." });
    }
  }
};
