import { deleteDevice, releaseDevice } from "../services/api/devices/Device.Api";
import { deleteStaff } from "../services/api/staff/Staff.Api";
import { getLoggedInUser } from "./getLoggedInUser";

//Handle delete device
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

//Handle delete staff
export const handleDeleteStaff = async (staff_no, setShowToast) => {
  if (!staff_no) {
    return setShowToast({ isShown: true, type: "error", message: "Staff no not provided" });
  }

  const loggedInUser = getLoggedInUser();

  const data = {
    is_deleted: true,
    deleted_by: loggedInUser.id,
    acc_status: "In Active",
  };

  await deleteStaff(staff_no, data, setShowToast);

  return;
};
