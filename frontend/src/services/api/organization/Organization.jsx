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
export const createFaculty = async (data, showToast) => {
  try {
    const response = await axiosInstance.post("/organization/faculties/create-faculty/", data, { showSpinner: true });
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

//update faculty
export const updateFaculty = async (faculty_id, data, showToast) => {
  try {
    if (!faculty_id) {
      return showToast("Faculty id must be provided", "error");
    }

    const response = await axiosInstance.put("/organization/faculties/update-faculty/" + faculty_id, data, { showSpinner: true });

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

//delete faculty
export const deleteFaculty = async (faculty_id, showToast) => {
  try {
    if (!faculty_id) {
      return showToast("Faculty id must be provided", "error");
    }

    const response = await axiosInstance.put("/organization/faculties/delete-faculty/" + faculty_id, { showSpinner: true });

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

export const getDepartments = async (data, setDepartment, setTotalPages) => {
  try {
    const response = await axiosInstance.get(`/organization/departments/?page=${data.page}&limit=${data.limit}`, { showSpinner: true });

    if (response.data && response.data.departments) {
      setTotalPages(response.data.totalPages);
      return setDepartment(response.data.departments);
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data.message);
    } else {
      return console.log("An unexpected error occured, please try again.");
    }
  }
};

export const getDepartmentsList = async (setDepartment) => {
  try {
    const response = await axiosInstance.get("/organization/departments/", { showSpinner: true });

    if (response.data && response.data.departments) {
      return setDepartment(response.data.departments);
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data.message);
    } else {
      return console.log("An unexpected error occured, please try again.");
    }
  }
};

export const getDepartmentsOfFaculty = async (faculty_id, setDepartment) => {
  try {
    const response = await axiosInstance.get("/organization/departments-faculty/" + faculty_id, { showSpinner: true });

    if (response.data && response.data.departments) {
      return setDepartment(response.data.departments);
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data.message);
    } else {
      return console.log("An unexpected error occured, please try again.");
    }
  }
};

//add department
export const createDepartment = async (data, showToast) => {
  try {
    const response = await axiosInstance.post("/organization/departments/create-department/", data, { showSpinner: true });
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

//update department
export const updateDepartment = async (department_id, data, showToast) => {
  try {
    if (!department_id) {
      return showToast("Department id must be provided", "error");
    }

    const response = await axiosInstance.put("/organization/departments/update-department/" + department_id, data, { showSpinner: true });

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
//delete faculty
export const deleteDepartment = async (department_id, showToast) => {
  try {
    if (!department_id) {
      return showToast("Department id must be provided", "error");
    }

    const response = await axiosInstance.put("/organization/departments/delete-department/" + department_id, { showSpinner: true });

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

export const getPositions = async (data, setPositions, setTotalPages) => {
  try {
    const response = await axiosInstance.get(`/organization/positions/?page=${data.page}&limit=${data.limit}`, { showSpinner: true });

    if (response.data && response.data.positions) {
      setTotalPages(response.data.totalPages);
      return setPositions(response.data.positions);
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data.message);
    } else {
      return console.log("An unexpected error occured, please try again.");
    }
  }
};

export const getPositionsOfDepartment = async (department_id, setPositions) => {
  try {
    const response = await axiosInstance.get("/organization/positions-department/" + department_id, { showSpinner: true });

    if (response.data && response.data.positions) {
      return setPositions(response.data.positions);
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data.message);
    } else {
      return console.log("An unexpected error occured, please try again.");
    }
  }
};

export const getPositionsList = async (setPositions, setTotalPages) => {
  try {
    const response = await axiosInstance.get(`/organization/positions/`, { showSpinner: true });

    if (response.data && response.data.positions) {
      setTotalPages(response.data.totalPages);
      return setPositions(response.data.positions);
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data.message);
    } else {
      return console.log("An unexpected error occured, please try again.");
    }
  }
};

//add position
export const createPosition = async (data, showToast) => {
  try {
    const response = await axiosInstance.post("/organization/positions/create-position/", data, { showSpinner: true });
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

//update position
export const updatePosition = async (position_id, data, showToast) => {
  try {
    if (!position_id) {
      return showToast("Department id must be provided", "error");
    }

    const response = await axiosInstance.put("/organization/positions/update-position/" + position_id, data, { showSpinner: true });

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

//delete position
export const deletePostion = async (position_id, showToast) => {
  try {
    if (!position_id) {
      return showToast("Position id must be provided", "error");
    }

    const response = await axiosInstance.put("/organization/positions/delete-position/" + position_id, { showSpinner: true });

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
