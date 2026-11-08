import { releaseDevice } from "../services/api/devices/Device.Api";
import { getLoggedInUser } from "./getLoggedInUser";

//Handle release device
export const handleReleaseDevice = async (selectedUser, params, onSubmit, showToast) => {
  if (!selectedUser.fullName) {
    return showToast("Please select user.", "error");
  }

  const { id } = params;
  if (!id) {
    return showToast("Device Id not provided", "error");
  }

  const loggedInUser = getLoggedInUser();

  const data = {
    returned_by: loggedInUser.id,
    status: "Returned",
  };

  await releaseDevice(id, data, showToast);
  return onSubmit();
};
