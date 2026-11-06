import axiosInstance from "../../../utils/axiosInstance";

//get All Students
export const getAllStudents = async (data, setAllStaff, setTotalPages) => {
  try {
    const response = await axiosInstance.get(`/students/?page=${data.page}&limit=${data.limit}`, { showSpinner: true });

    if (!response.data.error) {
      setTotalPages(response.data.totalPages);
      return setAllStaff(response.data.studentsData);
    }
  } catch (error) {
    if (error.response && error.response.error) {
      return console.log(error.response.data.message);
    } else {
      return console.log("An unexpected error occured, please try again");
    }
  }
};

//get Student
export const getStudent = async (student_number, setFormData) => {
  try {
    const response = await axiosInstance.get("/students/" + student_number, { showSpinner: true });
    if (response.data.studentData && !response.data.error) {
      return setFormData(...response.data.studentData);
    }
  } catch (error) {
    if (error.response.data && error.response.data.error) {
      return console.log(error.response.data.message);
    } else {
      return console.log("An unexpected error occured, please try again");
    }
  }
};

//get Student
export const getStudentDetails = async (student_number, studentData) => {
  try {
    const response = await axiosInstance.get("/students/" + student_number, { showSpinner: true });

    if (response.data && !response.data.error) {
      return studentData(...response.data.studentData);
    }
  } catch (error) {
    if (error.response.data && error.response.data.error) {
      return console.log(error.response.data.message);
    } else {
      return console.log("An unexpected error occured, please try again");
    }
  }
};

//Hanlde get device's stats
export const getStudentsStats = async (setStudentsStats) => {
  try {
    const response = await axiosInstance.get("/students/students-stats", { showSpinner: true });

    if (response.data) {
      return setStudentsStats(...response.data.studentsDetails);
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data.message);
    } else {
      return console.log("An unexpected error occured, please try again");
    }
  }
};

//Add Student
export const addStudent = async (studentData, showToast) => {
  try {
    if (!studentData) {
      return showToast("Student data must be provided", "error");
    }

    const response = await axiosInstance.post("/students/create-student", studentData, { showSpinner: true });

    if (response.data) {
      return showToast(response.data.message, "success");
    }
  } catch (error) {
    if (error.response.data && error.response.data.error) {
      return showToast(error.response.data.message, "error");
    } else {
      return showToast("An unexpected error occured, Please try again.", "error");
    }
  }
};

//Bulk Add Student
export const bulkAddStudent = async (studentsData, showToast, onClose) => {
  try {
    if (!studentsData) {
      return showToast("Student data must be provided", "error");
    }

    const response = await axiosInstance.post("/students/bulk-create-student", studentsData, { showSpinner: true });

    if (response.data) {
      onClose();
      return showToast(response.data.message, "success");
    }
  } catch (error) {
    if (error.response.data && error.response.data.error) {
      return showToast(error.response.data.message, "error");
    } else {
      return showToast("An unexpected error occured, Please try again.", "error");
    }
  }
};

//Update student
export const updateStudent = async (student_no, studentData, showToast) => {
  try {
    if (!student_no) {
      return showToast("Student number must be provided", "error");
    }

    const response = await axiosInstance.put("/students/update-student/" + student_no, studentData, { showSpinner: true });

    if (!response.data.error) {
      return showToast(response.data.message, "success");
    }
  } catch (error) {
    if (error.response.data && error.response.error) {
      return showToast(error.response.message, "error");
    } else {
      return showToast("An unxpected error occured, Please try again.", "error");
    }
  }
};

//Delete student
export const deleteStudent = async (student_no, data, showToast) => {
  if (!student_no) {
    return showToast("Student number must be provided", "error");
  }

  try {
    const response = await axiosInstance.put("/students/delete-student/" + student_no, data, { showSpinner: true });

    if (!response.error) {
      return showToast(response.data.message, "success");
    }
  } catch (error) {
    if (error.response.data && error.response.error) {
      return showToast(error.response.message, "error");
    } else {
      return showToast("An unxpected error occured, Please try again.", "error");
    }
  }
};
