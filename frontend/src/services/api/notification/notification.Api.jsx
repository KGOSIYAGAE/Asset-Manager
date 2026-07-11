import axiosInstance from "../../../utils/axiosInstance";

//send Approval Email notification
export const sendApprovalEmail = async (emailData, setShowToast) => {
  try {
    const response = await axiosInstance.post("/notification/approval-email", emailData, { showSpinner: true });
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
