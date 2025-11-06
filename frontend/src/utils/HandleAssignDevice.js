import { assignDevice } from "../services/api/devices/Device.Api";
import { generateUpgradeDate, getTodayDate } from "./helperMethods";
import { postMessage } from "./VerificationPostMessage";

//Handle assign device
export const handleAssignDevice = async (staffData, deviceDetails, setShowToast) => {
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
