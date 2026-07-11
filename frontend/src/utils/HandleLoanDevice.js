import { approveDevice, assignDevice, createLoanDevice } from "../services/api/devices/Device.Api";
import { getLoggedInUser } from "./getLoggedInUser";
import { generateUpgradeDate, getTodayDate } from "./helperMethods";
import { postMessageDeviceLoan } from "./VerificationPostMessage";

export const handleLoanDevice = async (selectedUser, selectedDevice, returnDate, setShowToast) => {
  /*if (!selectedUser?.staff_no || !selectedUser?.student_number) {
    return setShowToast({ isShow: true, type: "error", message: "Please select user." });
  }*/

  let userId;

  if (selectedUser?.staff_no) {
    userId = selectedUser?.staff_no;
  } else if (selectedUser?.student_number) {
    userId = selectedUser?.student_number;
  } else {
    userId = null;
  }

  if (!selectedDevice?.id) {
    return setShowToast({ isShow: true, type: "error", message: "Please select device." });
  }

  if (!returnDate) {
    return setShowToast({ isShow: true, type: "error", message: "Please select return date." });
  }

  const loggedInUser = getLoggedInUser();

  const data = {
    issued_by: loggedInUser.id,
    status: "Loan Approval required",
    userId: userId,
    expected_return_date: returnDate,
  };

  const { message } = await createLoanDevice(selectedDevice.id, data, setShowToast);

  return postMessageDeviceLoan(message);
};
//////////////////////////////////////////////////////
