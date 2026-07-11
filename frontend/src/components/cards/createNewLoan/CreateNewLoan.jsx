import React, { useEffect, useState } from "react";
import SubmitButton from "../../buttons/SubmitButton";
import SearchInput from "../../inputs/searchInput/SearchInput";
import ToastMessage from "../../toastMessage/ToastMessage";
import { TiArrowSortedDown } from "react-icons/ti";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
//import { assignReleaseUser } from "../../../services/api/devices/Device.Api";
import { getCurrentDate, getTodayDate } from "../../../utils/helperMethods";
import { assignDevice, createLoanDevice, getAllDevices, releaseDevice } from "../../../services/api/devices/Device.Api";
import UserSelectInput from "../../inputs/selectInputs/userSelectInput/UserSelectInput";
import DeviceSelectInput from "../../inputs/selectInputs/deviceSelectInput/DeviceSelectInput";
import DateTimePicker from "../../inputs/dateTimePicker/DateTimePicker";
import { handleLoanDevice } from "../../../utils/HandleLoanDevice";
import OpenSecondScreenButton from "../../buttons/OpenSecondScreenButton/OpenSecondScreenButton";
import { useDeviceContext } from "../../../hooks/useDevicesContext";
import { getStaffData } from "../../../services/api/staff/Staff.Api";
import { getAllStudents } from "../../../services/api/students/Students.Api";

function CreateNewLoan({ onCanel, onSubmit, setShowToast }) {
  const [selectedUser, setSelectedUser] = useState({ id: null, fullName: null, userId: null, userType: null, location: null });
  const [selectedDevice, setSelectedDevice] = useState({ id: null, make: null, model: null, serial_no: null, asset_tag: null, device_category: null, device_status: null });

  const [startDate, setStartDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);

  const [allDevices, setAllDevices] = useState(null);
  const [allStaff, setAllStaff] = useState(null);
  const [allStudents, setAllStudents] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const deviceLimit = 50;
  const userLimit = 50;

  //Handles search clear -> Sent to Search component
  const handleCancelSearch = () => {
    setSearchResults(null);
    //getAllDevices({ page: pagationModel.page, limit: pagationModel.pageSize }, setAllDevices, setTotalPages);
  };

  //Handle Get data
  const handleGetDevices = () => {
    getStaffData({ page: currentPage, limit: userLimit }, setAllStaff, setTotalPages);
    getAllStudents({ page: currentPage, limit: userLimit }, setAllStudents, setTotalPages);
    getAllDevices({ page: currentPage, limit: deviceLimit }, setAllDevices, setTotalPages);
  };

  //Execute Gett All devices on load or status change
  useEffect(() => {
    handleGetDevices();
  }, [currentPage]);

  /* useEffect(() => {
    if (selectedDevice.device_status !== "Available") {
      setShowToast({ isShow: true, type: "error", message: "Device status issue" });
      setSelectedDevice({ id: null, make: null, model: null, serial_no: null, asset_tag: null, device_category: null, device_status: null });
    }
  }, [selectedDevice?.device_status]);*/

  return (
    <div className="bg-white">
      <span className="font-semibold p-2">Loan Device</span>

      <div className="flex flex-col  -z-50">
        <div className="flex flex-col border border-red-400 p-4 rounded-md">
          <span className="text-sm text-red-400">This operation will loan the device to the user for set time period.</span>
        </div>
        {/** */}
        <UserSelectInput studentData={allStudents} staffData={allStaff} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        {/** */}
        <DeviceSelectInput allDevices={allDevices} selectedDevice={selectedDevice} setSelectedDevice={setSelectedDevice} />
        {/** */}
        <div className="grid grid-cols-2 gap-5 mt-5">
          {/** */}
          <div className="col-span-1">
            <DateTimePicker label={"Return Date"} value={returnDate} minimumDate={getCurrentDate()} setOnChange={setReturnDate} />
          </div>
        </div>
        {/** */}
        <div className="flex justify-end p-3 gap-8">
          <button className="flex  rounded-sm p-3" onClick={onCanel}>
            Cancel
          </button>
          {/*<SubmitButton
            text={"Submit"}
            onClick={() => {
              handleLoanDevice(selectedUser, selectedDevice, returnDate, onSubmit, setShowToast);
            }}
          />*/}
          {selectedUser?.fullName && selectedDevice?.id && returnDate ? (
            <div onClick={() => onCanel()}>
              <OpenSecondScreenButton
                btnLable={"Continue to Verifaction"}
                userId={selectedUser?.userId}
                deviceId={selectedDevice?.id}
                formType={"loan-verification"}
                returnDate={returnDate}
                setShowToast={setShowToast}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateNewLoan;
