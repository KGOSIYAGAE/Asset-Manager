import { approveDevice, assignDevice, createLoanDevice } from "../services/api/devices/Device.Api";
import { getLoggedInUser } from "./getLoggedInUser";
import { handleSendApprovalEmail } from "./handleNotificationEmails";
import { generateUpgradeDate, getTodayDate } from "./helperMethods";
import { navigateTo } from "./navigate";
import { postMessageDeviceLoan } from "./VerificationPostMessage";

export const handleLoanDevice = async (selectedUser, selectedDevice, issuedBy, returnDate, showToast) => {
  /*if (!selectedUser?.staff_no || !selectedUser?.student_number) {
    return setShowToast({ isShow: true, type: "error", message: "Please select user." });
  }*/

  const getUserType = (staff_student_no) => {
    let userId = staff_student_no?.toString();

    if (userId?.length > 5) {
      return "Student";
    } else {
      return "Staff";
    }
  };

  try {
    let userId;

    if (selectedUser?.staff_no) {
      userId = selectedUser?.staff_no;
    } else if (selectedUser?.student_number) {
      userId = selectedUser?.student_number;
    } else {
      userId = null;
    }

    if (!selectedDevice?.id) {
      return showToast("Please select device.", "error");
    }

    if (!returnDate) {
      return showToast("Please select return date.", "error");
    }

    const loggedInUser = getLoggedInUser();
    const userType = getUserType(userId);

    const data = {
      issued_by: loggedInUser.id ? loggedInUser.id : issuedBy,
      status: "Loan Approval required",
      userId: userId,
      expected_return_date: returnDate,
      user_type: userType,
    };

    const { error, message } = await createLoanDevice(selectedDevice.id, data);

    if (error) {
      console.log(message);
      return postMessage(message);
    } else {
      const response = await handleSendApprovalEmail(selectedUser, selectedDevice, issuedBy, showToast, "Loan", returnDate);
      navigateTo("/Success");

      return true;
    } /*else {
      return postMessageDeviceLoan(message);
    }*/
  } catch (error) {
    return console.log(error);
  }
};
//////////////////////////////////////////////////////
