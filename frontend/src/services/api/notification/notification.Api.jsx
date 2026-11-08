import axiosInstance from "../../../utils/axiosInstance";

//send Approval Email notification
export const sendApprovalEmail = async (emailData) => {
  try {
    const response = await axiosInstance.post("/notification/approval-email", emailData, { showSpinner: true });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    if (error.response.data && error.response.data.message) {
      return error.response.data.message;
    } else {
      console.log(error.response);
      return "An unexpected error occured, please try again", "error";
    }
  }
};

//send Form via Email
export const sendFormWithEmail = async (emailData, showToast) => {
  try {
    const response = await axiosInstance.post("/notification/form-email", emailData, { showSpinner: true });
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
