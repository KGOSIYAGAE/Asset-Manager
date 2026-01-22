import React, { useEffect, useState } from "react";
import SubmitButton from "../../buttons/SubmitButton";
import SearchInput from "../../inputs/searchInput/SearchInput";
import ToastMessage from "../../toastMessage/ToastMessage";
import { TiArrowSortedDown } from "react-icons/ti";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { assignDevice, getAllDevices } from "../../../services/api/devices/Device.Api";
import { generateUpgradeDate, getTodayDate, getUserType } from "../../../utils/helperMethods";
import TextInput from "../../inputs/textInput/TextInput";

import UserSelectInput from "../../inputs/selectInputs/userSelectInput/UserSelectInput";
import { useStaffContext } from "../../../hooks/useStaffContext";
import { useStudentsContext } from "../../../hooks/useStudentsContext";
import OpenSecondScreenButton from "../../buttons/OpenSecondScreenButton/OpenSecondScreenButton";
import DeviceSelectInput from "../../inputs/selectInputs/deviceSelectInput/DeviceSelectInput";
import { useDeviceContext } from "../../../hooks/useDevicesContext";

function AssignDeviceToUser({ onCanel, onSubmit, StudentNo, setShowToast }) {
  const [showUsers, setShowUsers] = useState({ isShow: false });
  const [selectedUser, setSelectedUser] = useState({ id: null, fullName: null, userId: null, userType: null, location: null }); //Get user type based on userID
  const [selectedDevice, setSelectedDevice] = useState({ id: null, make: null, model: null, serial_no: null, asset_tag: null });

  const { devicesDispatch } = useDeviceContext();

  useEffect(() => {
    getAllDevices(devicesDispatch);
  }, []);

  return (
    <div className="">
      <div className="flex flex-col gap-2 -z-50">
        <span className="font-semibold p-2">Assign Device</span>

        <DeviceSelectInput userId={StudentNo} selectedDevice={selectedDevice} setSelectedDevice={setSelectedDevice} />

        <div className="flex justify-end p-3 gap-8">
          <button className="flex  rounded-sm p-3" onClick={onCanel}>
            Cancel
          </button>
          {selectedDevice?.id ? (
            <div onClick={() => onCanel()}>
              <OpenSecondScreenButton btnLable={"Continue to Verifaction"} userId={StudentNo} deviceId={selectedDevice?.id} setShowToast={setShowToast} />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default AssignDeviceToUser;

/*Handle assign device
  const handleAssignDevice = () => {
    if (!selectedUser.fullName) {
      return setShowToast({ isShow: true, type: "error", message: "Please select user." });
    }

    const { id } = params;
    if (!id) {
      return setShowToast({ isShown: true, type: "error", message: "Device Id not provided" });
    }

    const data = {
      fullName: selectedUser.fullName,
      status: "Assigned",
      date_issued: getTodayDate(),
      userId: selectedUser.userId,
      upgradeDate: (() => {
        if (selectedUser.userId.toString().length <= 5) {
          return generateUpgradeDate(getTodayDate());
        }
        return null;
      })(),
    };

    //console.log(data);
    assignDevice(id, data, setShowToast);

    return onSubmit();
  };*/
