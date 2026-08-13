import { rejectDevice, releaseDevice } from "../services/api/devices/Device.Api";
import { getLoggedInUser } from "./getLoggedInUser";

//Handle release device
export const handleRejectDeviceIssueLoan = async (deviceUserDetails, rejectReason, params, onSubmit, setShowToast) => {
  if (!deviceUserDetails?.full_name) {
    return setShowToast({ isShow: true, type: "error", message: "Please select user." });
  }

  const { id } = params;
  if (!id) {
    return setShowToast({ isShown: true, type: "error", message: "Device Id not provided" });
  }

  if (!rejectReason) {
    return setShowToast({ isShow: true, type: "error", message: "Please provide rejection reason." });
  }

  const loggedInUser = getLoggedInUser();

  const data = {
    rejected_by: loggedInUser.id,
    status: "Rejected",
    rejectReason,
    deviceTransactionId: deviceUserDetails?.device_transaction_id,
  };

  await rejectDevice(id, data, setShowToast);
  return onSubmit();
};
