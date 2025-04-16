import axiosInstance from "../../../utils/axiosInstance";

//Get All devices
export const getAllDevices = async (devicesDispatch) => {
  try {
    const response = await axiosInstance.get("/api/devices/");

    if (response.data.deviceList) {
      devicesDispatch({ type: "SET_DEVICES", payload: response.data.deviceList });
    }
  } catch (error) {
    if (error.response.data.errorStatus === 401 && error.response.data.error) {
      return console.log("Authorization required, please login");
    } else if (error.response && error.response.data.error) {
      return console.log(error.response.data);
    } else {
      return console.log("An unexpected error occured, please try again");
    }
  }
};

//Hanlde get device
export const getDevice = async (id, setFormData) => {
  try {
    const response = await axiosInstance.get("/api/devices/" + id);

    console.log(response);

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

//add device api
export const addDevice = async (deviceData, setShowToast) => {
  try {
    const response = await axiosInstance.post("/devices/add-device/", deviceData);
    if (response.data) {
      return setShowToast({ isShown: true, type: "add", message: response.data.message });
    }
  } catch (error) {
    if (error.response.data && error.response.data.error) {
      return setShowToast({ isShown: true, type: "error", message: error.response.data.message });
    } else {
      return setShowToast({ isShown: true, type: "error", message: "An unexpected error occured, please try again" });
    }
  }
};

//bulk add devices api
export const bulkAddDevice = async (devicesData, setShowToast, onClose) => {
  try {
    const response = await axiosInstance.post("/devices/add-devices/", devicesData);
    if (response.data) {
      //console.log(response.data);
      onClose();
      return setShowToast({ isShown: true, type: "add", message: response.data.message });
    }
  } catch (error) {
    if (error.response.data && error.response.data.error) {
      onClose();
      return setShowToast({ isShown: true, type: "error", message: error.response.data.message });
    } else {
      console.log("An unexpected error occured, please try again");
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

    const response = await axiosInstance.put("/devices/edit-device/" + id, deviceDetails);

    if (response.data) {
      return setShowToast({ isShown: true, type: "add", message: response.data.message });
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
export const assignReleaseUser = async (id, data, setShowToast) => {
  try {
    const response = await axiosInstance.put("/devices/assign-device/" + id, data);

    if (response.data && !response.data.error) {
      setShowToast({ isShow: true, type: "add", message: response.data.message });
      return;
    }
  } catch (error) {
    if (error.response.data && error.response.data.error) {
      setShowToast({ isShow: true, type: "delete", message: error.response.data.message });
    } else {
      setShowToast({ isShow: true, type: "delete", message: "An unexpected error occured, please try again." });
    }
  }
};

//delete device
export const deleteDevice = async (id, setShowToast) => {
  try {
    if (!id) {
      return setShowToast({ isShown: true, type: "error", message: "Device id not provided." });
    }

    const response = await axiosInstance.delete("/devices/delete-device/" + id);

    if (response.data) {
      return setShowToast({ isShown: true, type: "add", message: response.data.message });
    }
  } catch (error) {
    if (error.response.data && error.response.data.error) {
      return setShowToast({ isShown: true, type: "error", message: response.data.message });
    } else {
      return setShowToast({ isShown: true, type: "error", message: "An unexpected router occured, please try again." });
    }
  }
};
