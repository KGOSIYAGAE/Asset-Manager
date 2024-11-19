import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { useToastContext } from "../../../hooks/useToastContext";

//Handle getData API CALL
export const getStaffData = async (staffDispatch) => {
  try {
    const response = await axiosInstance.get("/users/staff/");

    if (response.data && response.data.staffData) {
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
export const addStaff = async (userData, toastDispatch) => {
  try {
    const response = await axiosInstance.post("/users/staff/add-staff", userData);

    if (response.data) {
      return toastDispatch({ type: "ADD", payload: { isShown: true, type: "add", message: response.data.message } });
    }
  } catch (error) {
    if (error.response.data && error.response.data.error) {
      // handleShowToast("", error.response.data.message);
      return toastDispatch({ type: "ERROR", payload: { isShown: true, type: "", message: error.response.data.message } });
    } else {
      return toastDispatch({ type: "ERROR", payload: { isShown: true, type: "", message: "An unexpected error occured, please try again" } });
    }
  }
};

//update staff
export const updateStaff = async (staff_no, userData, toastDispatch) => {
  try {
    if (!staff_no) {
      return console.log("Staff number must be provided");
    }

    const response = await axiosInstance.put("/users/staff/update-staff/" + staff_no, userData);

    if (response.data && response.data.message) {
      return toastDispatch({ type: "ADD", payload: { isShown: true, type: "add", message: response.data.message } });
    }
  } catch (error) {
    if (error.response.data & error.response.error) {
      return toastDispatch({ type: "ERROR", payload: { isShown: true, type: "", message: error.response.data.message } });
    } else {
      return setError("An unexpected error occured, please try again");
    }
  }
};

//Hanlde deleteStaff API
export const deleteStaff = async (staff_no, toastDispatch) => {
  try {
    if (!staff_no) {
      return console.log("Staff number must be provided");
    }
    const response = await axiosInstance.delete("/users/staff/delete-staff/" + staff_no);

    if (response.data && !response.error) {
      return toastDispatch({ type: "ADD", payload: { isShown: true, type: "add", message: response.data.message } });
    }
  } catch (error) {
    if (error.response.data & error.response.error) {
      return toastDispatch({ type: "ERROR", payload: { isShown: true, type: "", message: error.response.data.message } });
    } else {
      return setError("An unexpected error occured, please try again");
    }
  }
};

export const getUser = async (staff_no, setFormData) => {
  if (!staff_no) {
    return console.log("Staff number must be provided");
  }

  try {
    const response = await axiosInstance.get("/users/staff/" + staff_no);

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
