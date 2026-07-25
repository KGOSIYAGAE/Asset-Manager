import axiosInstance from "../../../utils/axiosInstance";

export const getSession = async () => {
  try {
    const response = await axiosInstance.post(`/session/create`, { showSpinner: true });

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data);
    } else {
      return console.log("An unexpected error occured, please try again");
    }
  }
};
