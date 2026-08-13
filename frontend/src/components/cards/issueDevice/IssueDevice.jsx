import React, { useEffect, useState } from "react";
import SubmitButton from "../../buttons/SubmitButton";
import SearchInput from "../../inputs/searchInput/SearchInput";
import ToastMessage from "../../toastMessage/ToastMessage";
import { TiArrowSortedDown } from "react-icons/ti";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { assignDevice } from "../../../services/api/devices/Device.Api";
import { generateUpgradeDate, getTodayDate, getUserType } from "../../../utils/helperMethods";
import TextInput from "../../inputs/textInput/TextInput";

import UserSelectInput from "../../inputs/selectInputs/userSelectInput/UserSelectInput";
import { useStaffContext } from "../../../hooks/useStaffContext";
import { useStudentsContext } from "../../../hooks/useStudentsContext";
import OpenSecondScreenButton from "../../buttons/OpenSecondScreenButton/OpenSecondScreenButton";
import { getStaffData } from "../../../services/api/staff/Staff.Api";
import { getAllStudents } from "../../../services/api/students/Students.Api";
import SendToTablet from "../../buttons/SendToTablet/SendToTablet";
import QrCodeCard from "../qrCodeCard/QrCodeCard";
import CancelButton from "../../buttons/CancelButton";
import { socket } from "../../../utils/socket";

function IssueDevice({ onCanel, onSubmit, deviceId, setShowToast }) {
  const [selectedUser, setSelectedUser] = useState({ id: null, fullName: null, userId: null, userType: null, location: null }); //Get user type based on userID
  const [userType, setUserType] = useState(null);

  const [allStaff, setAllStaff] = useState(null);
  const [allStudents, setAllStudents] = useState(null);

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
    getStaffData({ page: currentPage, limit: userLimit }, setAllStaff, setTotalPages);
    getAllStudents({ page: currentPage, limit: userLimit }, setAllStudents, setTotalPages);
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
      setIsSigned(true);
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
            <QrCodeCard title={"Scan the QR Code with a tablet to capture user signature"} text={qrCodeURL} size={250} />
            <div>
              <CancelButton onClick={onCanel} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 -z-50">
          <span className="font-semibold p-2">Assign User</span>
          <UserSelectInput studentData={allStudents} staffData={allStaff} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />

          {/**/}

          <div className="flex justify-end p-3 gap-8">
            <CancelButton onClick={onCanel} />

            {selectedUser?.fullName ? (
              <div className="flex gap-5">
                <SendToTablet
                  btnLable={"Send to Tablet (Wireless)"}
                  userId={selectedUser?.userId}
                  deviceId={deviceId}
                  formType={"issue-verification"}
                  setShowQrCode={setShowQrCode}
                  setQrCodeURL={setQrCodeURL}
                  onSubmit={onSubmit}
                />
                <OpenSecondScreenButton
                  btnLable={"Send to USB Tablet"}
                  userId={selectedUser?.userId}
                  deviceId={deviceId}
                  formType={"issue-verification"}
                  setShowToast={setShowToast}
                  onSubmit={onSubmit}
                />
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

export default IssueDevice;

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
