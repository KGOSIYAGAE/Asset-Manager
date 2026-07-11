import { releaseDevice } from "../services/api/devices/Device.Api";
import { getLoggedInUser } from "./getLoggedInUser";

//Handle release device
export const handleRejectDeviceIssueLoan = async (selectedUser, params, onSubmit, setShowToast) => {
  if (!selectedUser.fullName) {
    return setShowToast({ isShow: true, type: "error", message: "Please select user." });
  }

  const { id } = params;
  if (!id) {
    return setShowToast({ isShown: true, type: "error", message: "Device Id not provided" });
  }

  const loggedInUser = getLoggedInUser();

  const data = {
    returned_by: loggedInUser.id,
    status: "Returned",
  };

  await releaseDevice(id, data, setShowToast);
  return onSubmit();
};
