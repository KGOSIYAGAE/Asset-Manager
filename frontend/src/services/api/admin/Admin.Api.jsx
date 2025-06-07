import axiosInstance from "../../../utils/axiosInstance";

//Update student
export const changePassword = async (email, oldPassword, newPassword, setShowToast) => {
  try {
    if (!email) {
      return setShowToast({ isShown: true, type: "error", message: "Student number must be provided" });
    }

    if (!oldPassword) {
      return setShowToast({ isShown: true, type: "error", message: "Old password must be provided" });
    }

    if (!newPassword) {
      return setShowToast({ isShown: true, type: "error", message: "New password must be provided" });
    }

    const data = {
      email,
      oldPassword,
      newPassword,
    };

    const response = await axiosInstance.put("/change-password", data);

    if (!response.data.error) {
      return setShowToast({ isShown: true, type: "success", message: response.data.message });
    }
  } catch (error) {
    if (error.response.data.error) {
      return setShowToast({ isShown: true, type: "error", message: error.response.data.message });
    } else {
      console.log(error.response.data);
      return setShowToast({ isShown: true, type: "error", message: "An unxpected error occured, Please try again." });
    }
  }
};
