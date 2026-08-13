import { sendApprovalEmail } from "../services/api/notification/notification.Api";
import { getLoggedInUser } from "./getLoggedInUser";
import { getCurrentDate } from "./helperMethods";

//Handle Approve loan and issue notification
export const handleSendApprovalEmail = async (userDetails, deviceDetails, issuedBy, setShowToast, issuanceType, returnDate) => {
  const loggedInUser = getLoggedInUser();

  const emailData = {
    device_issuer_userId: loggedInUser.id ? loggedInUser.id : issuedBy,
    device_reciever_userId: userDetails?.staff_no || userDetails?.student_number,
    request_date: getCurrentDate(),
    model_name: `${deviceDetails?.make} ${deviceDetails?.model}`,
    device_serial_no: deviceDetails?.serial_no,
    issuanceType,
    expected_return_date: returnDate,
  };

  await sendApprovalEmail(emailData, setShowToast);

  return;
};
