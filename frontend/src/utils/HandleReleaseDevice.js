import { releaseDevice } from "../services/api/devices/Device.Api";

//Handle release device
export const handleReleaseDevice = (selectedUser, params, onSubmit, setShowToast) => {
  if (!selectedUser.fullName) {
    return setShowToast({ isShow: true, type: "error", message: "Please select user." });
  }

  const { id } = params;
  if (!id) {
    return setShowToast({ isShown: true, type: "error", message: "Device Id not provided" });
  }

  //Release user
  const data = {
    fullName: selectedUser.fullName,
    status: "Available",
    userId: selectedUser.userId,
    return_date: null,
    upgradeDate: null,
    date_issued: null,
  };

  releaseDevice(id, data, setShowToast);
  return onSubmit();
};
