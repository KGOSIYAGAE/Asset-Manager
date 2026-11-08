import { rejectDevice, releaseDevice } from "../services/api/devices/Device.Api";
import { getLoggedInUser } from "./getLoggedInUser";

//Handle release device
export const handleRejectDeviceIssueLoan = async (deviceUserDetails, rejectReason, params, onSubmit, showToast) => {
  if (!deviceUserDetails?.full_name) {
    return showToast("Please select user.", "error");
  }

  const { id } = params;
  if (!id) {
    return showToast("Device Id not provided", "error");
  }

  if (!rejectReason) {
    return showToast("Please provide rejection reason.", "error");
  }

  const loggedInUser = getLoggedInUser();

  const data = {
    rejected_by: loggedInUser.id,
    status: "Rejected",
    rejectReason,
    deviceTransactionId: deviceUserDetails?.device_transaction_id,
  };

  await rejectDevice(id, data, showToast);

  //Rejection is Sent from the backend 🤐
  return onSubmit();
};
