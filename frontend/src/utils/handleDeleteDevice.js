import { deleteDevice, releaseDevice } from "../services/api/devices/Device.Api";
import { getLoggedInUser } from "./getLoggedInUser";

//Handle release device
export const handleDeleteDevice = async (id, setShowToast, onSubmit) => {
  if (!id) {
    return setShowToast({ isShown: true, type: "error", message: "Device Id not provided" });
  }

  const loggedInUser = getLoggedInUser();

  const data = {
    is_deleted: true,
    deleted_by: loggedInUser.id,
    status: "Disposed",
  };

  await deleteDevice(id, data, setShowToast);

  return;
};
