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

//add new Document Template
export const createTemplate = async (data, setShowToast) => {
  try {
    const response = await axiosInstance.post("/document-templates/create-template", data, { showSpinner: true });
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
export const updateTemplate = async (document_id, data, setShowToast) => {
  try {
    if (!document_id) {
      return setShowToast({ isShow: true, type: "error", message: "Dcoument id must be provided" });
    }

    const response = await axiosInstance.put("/document-templates/update-template/" + document_id, data, { showSpinner: true });

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
