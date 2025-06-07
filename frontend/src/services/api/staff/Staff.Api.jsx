import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";

//Handle getData API CALL
export const getStaffData = async (staffDispatch) => {
  try {
    const response = await axiosInstance.get("/staff/");

    if (!response.data.error) {
      staffDispatch({ type: "SET_STAFF", payload: response.data.staffData });
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
export const addStaff = async (userData, setShowToast) => {
  try {
    const response = await axiosInstance.post("/staff/create-staff", userData);

    if (!response.data.error) {
      return setShowToast({ isShown: true, type: "success", message: response.data.message });
    }
  } catch (error) {
    if (error.response.data & error.response.error) {
      return setShowToast({ isShown: true, type: "error", message: error.response.data.message });
    } else {
      return setShowToast({ isShown: true, type: "error", message: "An unexpected error occured, please try again" });
    }
  }
};

//update staff
export const updateStaff = async (id, userData, setShowToast) => {
  try {
    if (!id) {
      return console.log("Staff number must be provided");
    }

    const response = await axiosInstance.put("/staff/update-staff/" + id, userData);

    if (response.data && response.data.message) {
      return setShowToast({ isShown: true, type: "success", message: response.data.message });
    }
  } catch (error) {
    if (error.response.data & error.response.error) {
      return setShowToast({ isShown: true, type: "error", message: error.response.data.message });
    } else {
      return setShowToast({ isShown: true, type: "error", message: "An unexpected error occured, please try again" });
    }
  }
};

//Hanlde deleteStaff API
export const deleteStaff = async (staff_no, setShowToast) => {
  try {
    if (!staff_no) {
      return console.log("Staff number must be provided");
    }
    const response = await axiosInstance.delete("/staff/delete-staff/" + staff_no);

    if (response.data && !response.error) {
      return setShowToast({ isShown: true, type: "success", message: response.data.message });
    }
  } catch (error) {
    if (error.response.data && error.response.error) {
      return setShowToast({ isShown: true, type: "error", message: error.response.data.message });
    } else {
      return setShowToast({ isShown: true, type: "error", message: "An unexpected error occured, please try again" });
    }
  }
};

//Bulk Add Student
export const bulkAddStaff = async (staffData, setShowToast, onClose) => {
  try {
    if (!staffData) {
      return setShowToast({ isShown: true, type: "add", message: "Staff data must be provided" });
    }

    const response = await axiosInstance.post("/staff/bulk-create-staff", staffData);

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

export const getUser = async (id, setFormData) => {
  if (!id) {
    return console.log("Staff number must be provided");
  }

  try {
    const response = await axiosInstance.get("/staff/" + id);

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
    const response = await axiosInstance.get("/staff/staff-details/" + staff_no);

    if (response.data && response.data.staffData) {
      return setStaffData(...response.data.staffData);
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
