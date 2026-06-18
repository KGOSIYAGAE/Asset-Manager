import { approveDevice, assignDevice } from "../services/api/devices/Device.Api";
import { getLoggedInUser } from "./getLoggedInUser";
import { generateUpgradeDate, getTodayDate } from "./helperMethods";
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

export const handleAssignDeviceToStaff = async (staffData, deviceDetails, setShowToast) => {
  if (!staffData?.name) {
    return setShowToast({ isShow: true, type: "error", message: "Please select user." });
  }

  const loggedInUser = getLoggedInUser();

  const data = {
    issued_by: loggedInUser.id,
    status: "Issue Approval required",
    userId: staffData.staff_no,
  };

  const { message } = await assignDevice(deviceDetails?.id, data, setShowToast);

  return postMessage(message);
};
//////////////////////////////////////////////////////

//Handle assign device to staff
export const handleAssignDeviceToStudent = async (studentDetails, deviceDetails, setShowToast) => {
  if (!studentDetails?.name) {
    return setShowToast({ isShow: true, type: "error", message: "Please select user." });
  }

  const loggedInUser = getLoggedInUser();

  const data = {
    issued_by: loggedInUser.id,
    status: "Issue Approval required",
    userId: studentDetails.student_number,
  };

  const { message } = await assignDevice(deviceDetails?.id, data, setShowToast);

  return postMessage(message);
};
//////////////////////////////////////////////////////

//Handle assign device to user
export const handleIssueApproveDevice = async (deviceUserDetails, onSubmit, setShowToast) => {
  const loggedInUser = getLoggedInUser();

  const data = {
    approved_by: loggedInUser.id,
    status: "Assigned",
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
  };

  await approveDevice(deviceUserDetails?.id, data, setShowToast);

  return onSubmit();
};
//////////////////////////////////////////////////////
