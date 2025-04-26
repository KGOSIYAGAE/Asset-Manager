import axiosInstance from "../../../utils/axiosInstance";

export const getAllDepartments = async (departmentDispatch) => {
  try {
    const response = await axiosInstance.get("/api/departments/");

    if (response.data.error) {
      return console.log(response.data.message);
    }

    console.log(response.data.departmentList);

    return departmentDispatch({ type: "SET_DEPARTMENTS", payload: response.data.departmentList });
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data.message);
    }
    return console.log("An unexpected error occured, please try again.");
  }
};
