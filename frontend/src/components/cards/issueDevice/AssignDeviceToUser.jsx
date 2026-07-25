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
import { getLoggedInUser } from "../../../utils/getLoggedInUser";
import { socket } from "../../../utils/socket";
import QrCodeCard from "../qrCodeCard/QrCodeCard";
import CancelButton from "../../buttons/CancelButton";
import SendToTablet from "../../buttons/SendToTablet/SendToTablet";

function AssignDeviceToUser({ onCanel, onSubmit, userId, setShowToast }) {
  const [showUsers, setShowUsers] = useState({ isShow: false });
  const [selectedUser, setSelectedUser] = useState({ id: null, fullName: null, userId: null, userType: null, location: null }); //Get user type based on userID
  const [selectedDevice, setSelectedDevice] = useState({ id: null, make: null, model: null, serial_no: null, asset_tag: null });

  const [allDevices, setAllDevices] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const deviceLimit = 50;
  const userLimit = 50;

  const [showQrCode, setShowQrCode] = useState(false);
  const [qrCodeURL, setQrCodeURL] = useState(null);
  const [isSigned, setIsSigned] = useState(false);

  //Handles search clear -> Sent to Search component
  const handleCancelSearch = () => {
    setSearchResults(null);
    //getAllDevices({ page: pagationModel.page, limit: pagationModel.pageSize }, setAllDevices, setTotalPages);
  };

  //Handle Get data
  const handleGetDevices = () => {
    const user = getLoggedInUser();
    getAllDevices({ page: currentPage, limit: deviceLimit, userrole: user?.role }, setAllDevices, setTotalPages);
  };

  //Execute Gett All devices on load or status change
  useEffect(() => {
    handleGetDevices();
  }, [currentPage]);

  useEffect(() => {
    if (!socket.connected) {
      console.log("not connected");
      socket.connect();
    }

    // Debug check: Verify the laptop is physically hearing events
    console.log("Laptop listening for signature_saved event...");

    socket.on("signature_saved", (image) => {
      //setSignature(image.image);

      onSubmit();
      socket.disconnect();
    });

    return () => {
      socket.off("signature_saved");
    };
  }, []);

  return (
    <div className="bg-white">
      {showQrCode && showQrCode ? (
        <div className="flex flex-col items-center bg-white shadow-md rounded-md border ">
          <div className="flex flex-col items-center p-2">
            <QrCodeCard text={qrCodeURL} size={250} />
            <div>
              <CancelButton onClick={onCanel} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 -z-50">
          <span className="font-semibold p-2">Assign Device</span>

          {/** */}
          <DeviceSelectInput allDevices={allDevices} selectedDevice={selectedDevice} setSelectedDevice={setSelectedDevice} />
          {/** */}
          <div className="flex justify-end p-3 gap-8">
            <CancelButton onClick={onCanel} />
            {selectedDevice?.id ? (
              <div className="flex gap-5">
                <SendToTablet
                  btnLable={"Send to Tablet (Wireless)"}
                  userId={userId}
                  deviceId={selectedDevice?.id}
                  formType={"issue-verification"}
                  setShowQrCode={setShowQrCode}
                  setQrCodeURL={setQrCodeURL}
                  onSubmit={onSubmit}
                />
                <OpenSecondScreenButton btnLable={"Send to USB Tablet"} userId={userId} deviceId={selectedDevice?.id} formType={"issue-verification"} setShowToast={setShowToast} />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
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
