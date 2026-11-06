import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";

//Handle getData API CALL
export const getStaffData = async (data, setAllStaff, setTotalPages) => {
  try {
    const response = await axiosInstance.get(`/staff/?page=${data.page}&limit=${data.limit}`, { showSpinner: true });

    if (!response.data.error) {
      setTotalPages(response.data.totalPages);
      return setAllStaff(response.data.staffData);
    }
  } catch (error) {
    if (error.response.data && error.response.data.error) {
      return console.log(error.response.data.message);
    } else {
      return console.log("An unexpected error occured, please try again");
    }
  }
};

//Add staff API CALL
export const addStaff = async (userData, showToast) => {
  try {
    const response = await axiosInstance.post("/staff/create-staff", userData, { showSpinner: true });

    if (!response.data.error) {
      return showToast(response.data.message, "success");
    }
  } catch (error) {
    if (error.response.data & error.response.error) {
      return showToast(error.response.data.message, "error");
    } else {
      console.log(error);
      return showToast("An unexpected error occured, please try again", "error");
    }
  }
};

//update staff
export const updateStaff = async (id, userData, showToast) => {
  try {
    if (!id) {
      return showToast("Staff number must be provided", "error");
    }

    const response = await axiosInstance.put("/staff/update-staff/" + id, userData, { showSpinner: true });

    if (response.data && response.data.message) {
      return showToast(response.data.message, "success");
    }
  } catch (error) {
    if (error.response.data & error.response.error) {
      return showToast(error.response.data.message, "error");
    } else {
      console.log(error);
      return showToast("An unexpected error occured, please try again", "error");
    }
  }
};

//Hanlde deleteStaff API
export const deleteStaff = async (staff_no, data, showToast) => {
  try {
    if (!staff_no) {
      return showToast("Staff number must be provided", "error");
    }
    const response = await axiosInstance.put("/staff/delete-staff/" + staff_no, data, { showSpinner: true });

    if (response.data && !response.error) {
      return showToast(response.data.message, "success");
    }
  } catch (error) {
    if (error.response.data & error.response.error) {
      return showToast(error.response.data.message, "error");
    } else {
      console.log(error);
      return showToast("An unexpected error occured, please try again", "error");
    }
  }
};

//Bulk Add Student
export const bulkAddStaff = async (staffData, showToast, onClose) => {
  try {
    if (!staffData) {
      return showToast("Staff data must be provided", "error");
    }

    const response = await axiosInstance.post("/staff/bulk-create-staff", staffData, { showSpinner: true });

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

//Hanlde get staff's stats
export const getStaffStats = async (setStaffStats) => {
  try {
    const response = await axiosInstance.get("/staff/staff-stats", { showSpinner: true });

    if (response.data) {
      return setStaffStats(...response.data.staffDetails);
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data.message);
    } else {
      return console.log("An unexpected error occured, please try again");
    }
  }
};

export const getUser = async (id, setFormData) => {
  if (!id) {
    return console.log("Staff number must be provided");
  }

  try {
    const response = await axiosInstance.get("/staff/" + id, { showSpinner: true });

    if (response.data && response.data.staffData) {
      return setFormData(response.data.staffData[0]);
      //staffDispatch({ type: "SET_SELECTED_STAFF", payload: response.data.staffData });
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data.message);
    } else {
      return console.log("An unexpected error occured, please try again.");
    }
  }
};

export const getStaffDetails = async (staff_no, setStaffData) => {
  if (!staff_no) {
    return console.log("Staff number must be provided");
  }

  try {
    const response = await axiosInstance.get("/staff/staff-details/" + staff_no, { showSpinner: true });

    if (response.data && response.data.staffData) {
      return setStaffData(...response.data.staffData);
      //staffDispatch({ type: "SET_SELECTED_STAFF", payload: response.data.staffData });
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data.message);
    } else {
      return console.log("An unexpected error occured, please try again.", error);
    }
  }
};
