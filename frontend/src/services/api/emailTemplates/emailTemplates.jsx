import axiosInstance from "../../../utils/axiosInstance";

export const getEmailTemplates = async (setEmailTemplates) => {
  try {
    const response = await axiosInstance.get(`/email-templates/`, { showSpinner: true });

    if (response.data && response.data.documents) {
      return setEmailTemplates(response.data.documents);
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      console.log(error.response.data.message);
    }
    console.log("An unexpected error occured, please try again.");
  }
};

//add new Document Template
export const createEmailTemplate = async (data, showToast) => {
  try {
    const response = await axiosInstance.post("/email-templates/create-template", data, { showSpinner: true });
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

//update EmailAzureGraphSettings
export const updateEmailTemplate = async (template_id, data, showToast) => {
  try {
    if (!template_id) {
      return showToast("Dcoument id must be provided", "error");
    }

    const response = await axiosInstance.put("/email-templates/update-template/" + template_id, data, { showSpinner: true });

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
