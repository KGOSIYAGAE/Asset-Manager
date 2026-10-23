import axiosInstance from "../../../utils/axiosInstance";

export const getEmailAzureGraphSettings = async (setMsGraphSettings) => {
  try {
    const response = await axiosInstance.get(`/azure-graph/config`, { showSpinner: true });

    if (response.data && response.data.config) {
      return setMsGraphSettings(response.data.config);
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      console.log(error.response.data.message);
    }
    console.log("An unexpected error occured, please try again.");
  }
};

//add new EmailAzureGraphSettings
export const createAzureGraphSettings = async (data, setShowToast) => {
  try {
    const response = await axiosInstance.post("/azure-graph/create-config", data, { showSpinner: true });
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

//update EmailAzureGraphSettings
export const updateAzureGraphSettings = async (config_id, data, setShowToast) => {
  try {
    if (!config_id) {
      return setShowToast({ isShow: true, type: "error", message: "Config id must be provided" });
    }

    const response = await axiosInstance.put("/azure-graph/update-config/" + config_id, data, { showSpinner: true });

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
