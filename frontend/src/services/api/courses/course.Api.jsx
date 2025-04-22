import axiosInstance from "../../../utils/axiosInstance";

export const getAllCourses = async (courseDispatch) => {
  try {
    const response = await axiosInstance.get("/api/courses/");

    if (response.data.error) {
      return console.log(response.data.message);
    }

    return courseDispatch({ type: "SET_COURSES", payload: response.data.courseList });
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data.message);
    }
    return console.log("An unexpected error occured, please try again.");
  }
};
