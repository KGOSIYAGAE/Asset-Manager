import { assignDevice } from "../services/api/devices/Device.Api";
import { generateUpgradeDate, getTodayDate } from "./helperMethods";
import { postMessage } from "./VerificationPostMessage";

//Handle assign device to staff
export const handleAssignDeviceToStaff = async (staffData, deviceDetails, setShowToast) => {
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
      if (staffData.staff_no.toString().length <= 5) {
        return generateUpgradeDate(getTodayDate());
      }
      return null;
    })(),
  };

  await assignDevice(deviceDetails?.id, data, setShowToast);

  return postMessage(staffData?.name, staffData?.surname);
};
//////////////////////////////////////////////////////

//Handle assign device to staff
export const handleAssignDeviceToStudent = async (studentDetails, deviceDetails, setShowToast) => {
  console.log(studentDetails.student_number);

  if (!studentDetails?.name) {
    return setShowToast({ isShow: true, type: "error", message: "Please select user." });
  }

  const data = {
    fullName: `${studentDetails?.name} ${studentDetails?.surname}`,
    status: "Approval required",
    date_issued: getTodayDate(),
    userId: studentDetails.student_number,
  };

  await assignDevice(deviceDetails?.id, data, setShowToast);

  return postMessage(studentDetails?.name, studentDetails?.surname);
};
//////////////////////////////////////////////////////
