import axiosInstance from "../../../utils/axiosInstance";
import loginAxiosInstance from "../../../utils/loginAxiosInstance";

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

    const response = await loginAxiosInstance.put("/change-password", data, { showSpinner: true });

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

//Assign Role
export const assignUserRole = async (data) => {
  try {
    const response = await loginAxiosInstance.put("/assign-role", data, { showSpinner: true });

    if (!response.data.error) {
      return response.data.message;
    }
  } catch (error) {
    if (error.response.data.error) {
      return error.response.data.message;
    } else {
      console.log(error.response.data);
      return "An unxpected error occured, Please try again.";
    }
  }
};

//Update Role
export const updateUserRole = async (data) => {
  try {
    const response = await loginAxiosInstance.put("/update-role", data, { showSpinner: true });

    if (!response.data.error) {
      return response.data.message;
    }
  } catch (error) {
    if (error.response.data.error) {
      return error.response.data.message;
    } else {
      console.log(error.response.data);
      return "An unxpected error occured, Please try again.";
    }
  }
};

//Get Admins
export const getAdmins = async (setUsersAndAdmins) => {
  try {
    const response = await loginAxiosInstance.get("/", { showSpinner: true });

    if (!response.data.error) {
      return setUsersAndAdmins(response.data.adminList);
    }
  } catch (error) {
    if (error.response.data.error) {
      return error.response.data.message;
    } else {
      console.log(error.response.data);
      return "An unxpected error occured, Please try again.";
    }
  }
};
