import { useToast } from "../context/ToastContext";
import { approveDevice, assignDevice } from "../services/api/devices/Device.Api";
import { getLoggedInUser } from "./getLoggedInUser";
import { handleSendApprovalEmail } from "./handleNotificationEmails";
import { generateUpgradeDate, getTodayDate } from "./helperMethods";
import { navigateTo } from "./navigate";
import { postMessage } from "./VerificationPostMessage";

export const handleAssignDeviceToStaff = async (staffData, deviceDetails, issuedBy, showToast) => {
  try {
    if (!staffData?.name) {
      return showToast("Please select user.", "error");
    }

    let userEndDate;

    if (staffData?.end_date) {
      userEndDate = staffData?.end_date;
    }

    const loggedInUser = getLoggedInUser();

    const data = {
      issued_by: loggedInUser.id ? loggedInUser.id : issuedBy,
      status: "Issue Approval required",
      userId: staffData.staff_no,
      userEndDate: userEndDate || null,
      user_type: "Staff",
    };

    const { error, message } = await assignDevice(deviceDetails?.id, data);

    if (error) {
      console.log(message);
      return postMessage(message);
    } else {
      //handleSendApprovalEmail(staffData, deviceDetails, issuedBy, setShowToast, "Issue");
      const response = await handleSendApprovalEmail(staffData, deviceDetails, issuedBy, showToast, "Issue");
      navigateTo("/Success");
      return true;
    }
  } catch (error) {
    return console.log(error);
  }
};
//////////////////////////////////////////////////////

//Handle assign device to staff
export const handleAssignDeviceToStudent = async (studentDetails, deviceDetails, issuedBy, showToast) => {
  try {
    if (!studentDetails?.name) {
      return showToast("Please select user.", "error");
    }

    const loggedInUser = getLoggedInUser();

    const data = {
      issued_by: loggedInUser.id ? loggedInUser.id : issuedBy,
      status: "Issue Approval required",
      userId: studentDetails.student_number,
      user_type: "Student",
    };

    const { error, message } = await assignDevice(deviceDetails?.id, data);

    //handleSendApprovalEmail(studentDetails, deviceDetails, issuedBy, showToast, "Issue");

    if (error) {
      console.log(message);
      return postMessage(message);
    } else {
      const response = await handleSendApprovalEmail(studentDetails, deviceDetails, issuedBy, showToast, "Issue");
      navigateTo("/Success");
      return true;
    }
  } catch (error) {
    return console.log(error);
  }
};
//////////////////////////////////////////////////////

//Handle assign device to user
export const handleIssueApproveDevice = async (deviceUserDetails, onSubmit, showToast) => {
  const loggedInUser = getLoggedInUser();

  const data = {
    approved_by: loggedInUser.id,
    status: "Assigned",
    deviceTransactionId: deviceUserDetails?.device_transaction_id,
  };

  await approveDevice(deviceUserDetails?.id, data, showToast);

  return onSubmit();
};
//////////////////////////////////////////////////////

//Handle loan device
export const handleLoanApproveDevice = async (deviceUserDetails, onSubmit, showToast) => {
  const loggedInUser = getLoggedInUser();

  const data = {
    approved_by: loggedInUser.id,
    status: "Loaned",
    deviceTransactionId: deviceUserDetails?.device_transaction_id,
  };

  await approveDevice(deviceUserDetails?.id, data, showToast);

  return onSubmit();
};
//////////////////////////////////////////////////////
