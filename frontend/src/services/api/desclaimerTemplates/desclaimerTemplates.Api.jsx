import axiosInstance from "../../../utils/axiosInstance";

export const getDisclaimerTemplates = async (setDisclaimerTemplates) => {
  try {
    const response = await axiosInstance.get(`/disclaimer-templates/`, { showSpinner: true });

    if (response.data && response.data.disclaimers) {
      return setDisclaimerTemplates(response.data.disclaimers);
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      console.log(error.response.data.message);
    }

    console.log("An unexpected error occured, please try again.");
  }
};

//update EmailAzureGraphSettings
export const updateDisclaimerTemplate = async (disclaimer_id, data, showToast) => {
  try {
    if (!disclaimer_id) {
      return showToast("Disclaimer id must be provided", "error");
    }

    const response = await axiosInstance.put("/disclaimer-templates/update-template/" + disclaimer_id, data, { showSpinner: true });

    if (response.data) {
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

//add new Document Template
export const createDisclaimerTemplate = async (data, showToast) => {
  try {
    const response = await axiosInstance.post("/disclaimer-templates/create-template", data, { showSpinner: true });
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

export const getDisclaimerTemplate = async (data, setDisclaimerTemplate) => {
  try {
    const response = await axiosInstance.get("/disclaimer-templates/disclaimer/", { params: data, showSpinner: true });

    if (response.data && response.data.disclaimers) {
      return setDisclaimerTemplate(response.data.disclaimers);
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      console.log(error.response.data.message);
    }
    console.log("An unexpected error occured, please try again.");
  }
};
