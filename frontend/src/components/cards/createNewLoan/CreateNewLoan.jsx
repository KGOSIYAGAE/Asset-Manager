import React, { useEffect, useState } from "react";
import SubmitButton from "../../buttons/SubmitButton";
import SearchInput from "../../inputs/searchInput/SearchInput";
import ToastMessage from "../../toastMessage/ToastMessage";
import { TiArrowSortedDown } from "react-icons/ti";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
//import { assignReleaseUser } from "../../../services/api/devices/Device.Api";
import { getTodayDate } from "../../../utils/helperMethods";
import { assignDevice, createLoanDevice, releaseDevice } from "../../../services/api/devices/Device.Api";
import UserSelectInput from "../../inputs/selectInputs/userSelectInput/UserSelectInput";
import DeviceSelectInput from "../../inputs/selectInputs/deviceSelectInput/DeviceSelectInput";
import DateTimePicker from "../../inputs/dateTimePicker/DateTimePicker";

function CreateNewLoan({ onCanel, onSubmit, staffList, studentList, setShowToast }) {
  const [selectedUser, setSelectedUser] = useState({ id: null, fullName: null, userId: null, userType: null, location: null });
  const [selectedDevice, setSelectedDevice] = useState({ id: null, make: null, model: null, serial_no: null, asset_tag: null });
  const [startDate, setStartDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [userData, setUserData] = useState(null);

  const [formType, setFormType] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  //Handle loan device
  const handleCreateLoan = () => {
    if (!selectedUser.fullName) {
      return setShowToast({ isShow: true, type: "error", message: "Please select user." });
    }

    if (!selectedDevice.id) {
      return setShowToast({ isShow: true, type: "error", message: "Please select device." });
    }

    if (!returnDate) {
      return setShowToast({ isShow: true, type: "error", message: "Please select return date." });
    }

    const today = getTodayDate();

    const data = {
      fullName: selectedUser?.fullName,
      status: "Loaned",
      date_issued: getTodayDate(),
      userId: selectedUser.userId,
      return_date: returnDate,
    };

    createLoanDevice(selectedDevice.id, data, setShowToast);
    return onSubmit();
  };

  useEffect(() => {
    setUserData([...staffList, ...studentList]);
  }, []);
  return (
    <div>
      <span className="font-semibold p-2">Loan Device</span>

      <div className="flex flex-col  -z-50">
        <div className="flex flex-col border border-red-400 p-4 rounded-md">
          <span className="text-sm text-red-400">This operation will loan the device to the user for set time period.</span>
        </div>
        {/** */}
        <UserSelectInput userData={userData} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        {/** */}
        <DeviceSelectInput selectedDevice={selectedDevice} setSelectedDevice={setSelectedDevice} />
        {/** */}
        <div className="grid grid-cols-2 gap-5 mt-5">
          {/** */}
          <div className="col-span-1">
            <DateTimePicker label={"Return Date"} value={returnDate} setOnChange={setReturnDate} />
          </div>
        </div>
        {/** */}
        <div className="flex justify-end p-3 gap-8">
          <button className="flex  rounded-sm p-3" onClick={onCanel}>
            Cancel
          </button>
          <SubmitButton text={"Submit"} onClick={handleCreateLoan} />
        </div>
      </div>
    </div>
  );
}

export default CreateNewLoan;
