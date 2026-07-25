import { approveDevice, assignDevice } from "../services/api/devices/Device.Api";
import { getLoggedInUser } from "./getLoggedInUser";
import { handleSendApprovalEmail } from "./handleNotificationEmails";
import { generateUpgradeDate, getTodayDate } from "./helperMethods";
import { navigateTo } from "./navigate";
import { postMessage } from "./VerificationPostMessage";

//Handle assign device to staff
/*export const handleAssignDeviceToStaff = async (staffData, deviceDetails, setShowToast) => {
  if (!staffData?.name) {
    return setShowToast({ isShow: true, type: "error", message: "Please select user." });
  }

  const data = {
    fullName: `${staffData?.name} ${staffData?.surname}`,
    status: "Assigned",
    date_issued: getTodayDate(),
    userId: staffData.staff_no,
    return_date: (() => {
      if (staffData.contract_type === "Permanent") {
        return null;
      }
      return staffData.end_date;
    })(),
    upgradeDate: (() => {
      if (staffData.staff_no.toString().length <= 5 && staffData.contract_type === "Permanent") {
        return generateUpgradeDate(getTodayDate());
      }
      return null;
    })(),
  };

  await assignDevice(deviceDetails?.id, data, setShowToast);

  return postMessage(staffData?.name, staffData?.surname);
};*/

export const handleAssignDeviceToStaff = async (staffData, deviceDetails, issuedBy, setShowToast) => {
  try {
    if (!staffData?.name) {
      return setShowToast({ isShow: true, type: "error", message: "Please select user." });
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
    };

    const { error, message } = await assignDevice(deviceDetails?.id, data, setShowToast);

    if (error) {
      return postMessage(message);
    }

    //handleSendApprovalEmail(staffData, deviceDetails, issuedBy, setShowToast, "Issue");

    if (issuedBy) {
      return navigateTo("/Success");
    } else {
      return postMessage(message);
    }
  } catch (error) {
    return console.log(error);
  }
};
//////////////////////////////////////////////////////

//Handle assign device to staff
export const handleAssignDeviceToStudent = async (studentDetails, deviceDetails, issuedBy, setShowToast) => {
  try {
    if (!studentDetails?.name) {
      return setShowToast({ isShow: true, type: "error", message: "Please select user." });
    }

    const loggedInUser = getLoggedInUser();

    const data = {
      issued_by: loggedInUser.id ? loggedInUser.id : issuedBy,
      status: "Issue Approval required",
      userId: studentDetails.student_number,
    };

    const { error, message } = await assignDevice(deviceDetails?.id, data, setShowToast);

    if (error) {
      return postMessage(message);
    }

    handleSendApprovalEmail(studentDetails, deviceDetails, issuedBy, setShowToast, "Issue");

    if (issuedBy) {
      return navigateTo("/Success");
    } else {
      return postMessage(message);
    }
  } catch (error) {
    return console.log(error);
  }
};
//////////////////////////////////////////////////////

//Handle assign device to user
export const handleIssueApproveDevice = async (deviceUserDetails, onSubmit, setShowToast) => {
  const loggedInUser = getLoggedInUser();

  const data = {
    approved_by: loggedInUser.id,
    status: "Assigned",
    deviceTransactionId: deviceUserDetails?.device_transaction_id,
  };

  await approveDevice(deviceUserDetails?.id, data, setShowToast);

  return onSubmit();
};
//////////////////////////////////////////////////////

//Handle loan device
export const handleLoanApproveDevice = async (deviceUserDetails, onSubmit, setShowToast) => {
  const loggedInUser = getLoggedInUser();

  const data = {
    approved_by: loggedInUser.id,
    status: "Loaned",
    deviceTransactionId: deviceUserDetails?.device_transaction_id,
  };

  await approveDevice(deviceUserDetails?.id, data, setShowToast);

  return onSubmit();
};
//////////////////////////////////////////////////////
