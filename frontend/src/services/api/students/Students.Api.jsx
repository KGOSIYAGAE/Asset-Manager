import axiosInstance from "../../../utils/axiosInstance";

//get All Students
export const getAllStudents = async (studentDispatch) => {
  try {
    const response = await axiosInstance.get("/students/", { showSpinner: true });

    if (!response.data.error) {
      return studentDispatch({ type: "SET_STUDENTS", payload: response.data.studentsData });
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

//Add Student
export const addStudent = async (studentData, setShowToast) => {
  try {
    if (!studentData) {
      return setShowToast({ isShown: true, type: "add", message: "Student data must be provided" });
    }

    const response = await axiosInstance.post("/students/create-student", studentData, { showSpinner: true });

    if (response.data) {
      return setShowToast({ isShown: true, type: "success", message: response.data.message });
    }
  } catch (error) {
    if (error.response.data && error.response.data.error) {
      return setShowToast({ isShown: true, type: "error", message: error.response.data.message });
    } else {
      return setShowToast({ isShown: true, type: "error", message: "An unexpected error occured, Please try again." });
    }
  }
};

//Bulk Add Student
export const bulkAddStudent = async (studentsData, setShowToast, onClose) => {
  try {
    if (!studentsData) {
      return setShowToast({ isShown: true, type: "add", message: "Student data must be provided" });
    }

    const response = await axiosInstance.post("/students/bulk-create-student", studentsData, { showSpinner: true });

    if (response.data) {
      onClose();
      return setShowToast({ isShown: true, type: "success", message: response.data.message });
    }
  } catch (error) {
    if (error.response.data && error.response.data.error) {
      return setShowToast({ isShown: true, type: "error", message: error.response.data.message });
    } else {
      return setShowToast({ isShown: true, type: "error", message: "An unexpected error occured, Please try again." });
    }
  }
};

//Update student
export const updateStudent = async (student_no, studentData, setShowToast) => {
  try {
    if (!student_no) {
      return setShowToast({ isShown: true, type: "error", message: "Student number must be provided" });
    }

    const response = await axiosInstance.put("/students/update-student/" + student_no, studentData, { showSpinner: true });

    if (!response.data.error) {
      return setShowToast({ isShown: true, type: "success", message: response.data.message });
    }
  } catch (error) {
    if (error.response.data && error.response.error) {
      return setShowToast({ isShown: true, type: "error", message: error.response.message });
    } else {
      return setShowToast({ isShown: true, type: "error", message: "An unxpected error occured, Please try again." });
    }
  }
};

//Delete student
export const deleteStudent = async (student_no, setShowToast) => {
  if (!student_no) {
    return setShowToast({ isShown: true, type: "error", message: "Student number must be provided." });
  }

  try {
    const response = await axiosInstance.delete("/students/delete-student/" + student_no, { showSpinner: true });

    if (!response.error) {
      return setShowToast({ isShown: true, type: "success", message: response.data.message });
    }
  } catch (error) {
    if (error.response.data && error.response.error) {
      return setShowToast({ isShown: true, type: "error", message: error.response.data.message });
    } else {
      console.log(error.response);
      return setShowToast({ isShown: true, type: "error", message: "An unexpected error occured, please try again." });
    }
  }
};
