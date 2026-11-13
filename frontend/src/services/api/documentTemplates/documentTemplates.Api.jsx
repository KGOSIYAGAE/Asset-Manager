import axiosInstance from "../../../utils/axiosInstance";

export const getDocumentTemplates = async (setDocumentTemplates) => {
  try {
    const response = await axiosInstance.get(`/document-templates/`, { showSpinner: true });

    if (response.data && response.data.documents) {
      return setDocumentTemplates(response.data.documents);
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      console.log(error.response.data.message);
    }
    console.log("An unexpected error occured, please try again.");
  }
};

export const getDocumentTemplate = async (data, setDocumentTemplates) => {
  try {
    const response = await axiosInstance.get("/document-templates/document/", { params: data, showSpinner: true });

    if (response.data && response.data.documents) {
      return setDocumentTemplates(response.data.documents);
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      console.log(error.response.data.message);
    }
    console.log("An unexpected error occured, please try again.");
  }
};

//add new Document Template
export const createDocumentTemplate = async (data, showToast) => {
  try {
    const response = await axiosInstance.post("/document-templates/create-template", data, { showSpinner: true });
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
export const updateDocumentTemplate = async (document_id, data, showToast) => {
  try {
    if (!document_id) {
      return showToast("Dcoument id must be provided", "error");
    }

    const response = await axiosInstance.put("/document-templates/update-template/" + document_id, data, { showSpinner: true });

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
