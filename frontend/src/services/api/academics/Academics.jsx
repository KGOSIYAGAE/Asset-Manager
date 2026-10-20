import axiosInstance from "../../../utils/axiosInstance";

export const getFaculties = async (data, setFaculties, setTotalPages) => {
  try {
    const response = await axiosInstance.get(`/organization/faculties/?page=${data.page}&limit=${data.limit}`, { showSpinner: true });

    if (response.data && response.data.faculties) {
      setTotalPages(response.data.totalPages);
      return setFaculties(response.data.faculties);
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data.message);
    } else {
      return console.log("An unexpected error occured, please try again.");
    }
  }
};

export const getFacultiesList = async (setFaculties) => {
  try {
    const response = await axiosInstance.get(`/organization/faculties/`, { showSpinner: true });

    if (response.data && response.data.faculties) {
      return setFaculties(response.data.faculties);
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data.message);
    } else {
      return console.log("An unexpected error occured, please try again.");
    }
  }
};

//add faculty
export const createFaculty = async (data, setShowToast) => {
  try {
    const response = await axiosInstance.post("/organization/faculties/create-faculty/", data, { showSpinner: true });
    if (response.data) {
      return setShowToast({ isShow: true, type: "success", message: response.data.message });
    }
  } catch (error) {
    if (error.response.data && error.response.data.message) {
      return setShowToast({ isShow: true, type: "error", message: error.response.data.message });
    } else {
      console.log(error.response);
      return setShowToast({ isShow: true, type: "error", message: "An unexpected error occured, please try again" });
    }
  }
};

//update faculty
export const updateFaculty = async (faculty_id, data, setShowToast) => {
  try {
    if (!faculty_id) {
      return setShowToast({ isShow: true, type: "error", message: "Faculty id must be provided" });
    }

    const response = await axiosInstance.put("/organization/faculties/update-faculty/" + faculty_id, data, { showSpinner: true });

    if (response.data) {
      return setShowToast({ isShow: true, type: "success", message: response.data.message });
    }
  } catch (error) {
    if (error.response.data && error.response.data.error) {
      return setShowToast({ isShow: true, type: "error", message: error.response.data.message });
    } else {
      return setShowToast({ isShow: true, type: "error", message: "An unexpected error occured, please try again." });
    }
  }
};

//delete faculty
export const deleteFaculty = async (faculty_id, setShowToast) => {
  try {
    if (!faculty_id) {
      return setShowToast({ isShow: true, type: "error", message: "Faculty id must be provided" });
    }

    const response = await axiosInstance.put("/organization/faculties/delete-faculty/" + faculty_id, { showSpinner: true });

    if (response.data) {
      return setShowToast({ isShow: true, type: "success", message: response.data.message });
    }
  } catch (error) {
    if (error.response.data && error.response.data.error) {
      return setShowToast({ isShow: true, type: "error", message: error.response.data.message });
    } else {
      return setShowToast({ isShow: true, type: "error", message: "An unexpected error occured, please try again." });
    }
  }
};

export const getCourses = async (data, setCourses, setTotalPages) => {
  try {
    const response = await axiosInstance.get(`/academics/courses/?page=${data.page}&limit=${data.limit}`, { showSpinner: true });

    if (response.data && response.data.courses) {
      setTotalPages(response.data.totalPages);
      return setCourses(response.data.courses);
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data.message);
    } else {
      return console.log("An unexpected error occured, please try again.");
    }
  }
};

export const getCoursesList = async (setCourses) => {
  try {
    const response = await axiosInstance.get("/academics/courses/", { showSpinner: true });

    if (response.data && response.data.courses) {
      return setCourses(response.data.courses);
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data.message);
    } else {
      return console.log("An unexpected error occured, please try again.");
    }
  }
};

export const getCoursesOfFaculty = async (faculty_id, setCourses) => {
  try {
    const response = await axiosInstance.get("/academics/faculty-courses/" + faculty_id, { showSpinner: true });

    if (response.data && response.data.courses) {
      return setCourses(response.data.courses);
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data.message);
    } else {
      return console.log("An unexpected error occured, please try again.");
    }
  }
};

//add Courses
export const createCourses = async (data, setShowToast) => {
  try {
    const response = await axiosInstance.post("/organization/Courses/create-Courses/", data, { showSpinner: true });
    if (response.data) {
      return setShowToast({ isShow: true, type: "success", message: response.data.message });
    }
  } catch (error) {
    if (error.response.data && error.response.data.message) {
      return setShowToast({ isShow: true, type: "error", message: error.response.data.message });
    } else {
      console.log(error.response);
      return setShowToast({ isShow: true, type: "error", message: "An unexpected error occured, please try again" });
    }
  }
};

//update Courses
export const updateCourses = async (courses_id, data, setShowToast) => {
  try {
    if (!Courses_id) {
      return setShowToast({ isShow: true, type: "error", message: "Courses id must be provided" });
    }

    const response = await axiosInstance.put("/organization/Courses/update-Courses/" + Courses_id, data, { showSpinner: true });

    if (response.data) {
      return setShowToast({ isShow: true, type: "success", message: response.data.message });
    }
  } catch (error) {
    if (error.response.data && error.response.data.error) {
      return setShowToast({ isShow: true, type: "error", message: error.response.data.message });
    } else {
      return setShowToast({ isShow: true, type: "error", message: "An unexpected error occured, please try again." });
    }
  }
};
//delete faculty
export const deleteCourses = async (courses_id, setShowToast) => {
  try {
    if (!Courses_id) {
      return setShowToast({ isShow: true, type: "error", message: "Courses id must be provided" });
    }

    const response = await axiosInstance.put("/organization/Courses/delete-Courses/" + Courses_id, { showSpinner: true });

    if (response.data) {
      return setShowToast({ isShow: true, type: "success", message: response.data.message });
    }
  } catch (error) {
    if (error.response.data && error.response.data.error) {
      return setShowToast({ isShow: true, type: "error", message: error.response.data.message });
    } else {
      return setShowToast({ isShow: true, type: "error", message: "An unexpected error occured, please try again." });
    }
  }
};
