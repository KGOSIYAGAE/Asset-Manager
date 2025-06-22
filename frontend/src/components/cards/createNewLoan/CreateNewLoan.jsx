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
import { assignDevice, releaseDevice } from "../../../services/api/devices/Device.Api";

function CreateNewLoan({ onCanel, onSubmit, userData, devicesData, setShowToast }) {
  const [showUsers, setShowUsers] = useState({ isShow: false });
  const [showDevices, setShowDevices] = useState({ isShow: false });
  const [selectedUser, setSelectedUser] = useState({ id: null, fullName: null, userId: null, userType: null, location: null });
  const [selectedDevice, setSelectedDevice] = useState({ id: null, make: null, model: null, serial_no: null, asset_tag: null });

  const [searchValue, setSearchValue] = useState("");
  const [searchResultsData, setSearchResultsData] = useState([]);

  const [formType, setFormType] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  //Toggle view users
  const toggleUsers = () => {
    if (showUsers.isShow) {
      setShowUsers({ isShow: false });
    } else {
      setSearchResultsData(userData);
      setShowUsers({ isShow: true });
    }
  };

  //Toggle view devices
  const toggleDevices = () => {
    if (showDevices.isShow) {
      setShowDevices({ isShow: false });
    } else {
      setSearchResultsData(devicesData);
      setShowDevices({ isShow: true });
    }
  };

  //Filter users
  const handleFilterUsers = (searchQuery, userData) => {
    const searchResults = [];
    for (let i = 0; i < userData.length; i++) {
      if (userData[i].name && userData[i].name.toLowerCase().includes(searchQuery.toLowerCase())) {
        searchResults.push(userData[i]);
      } else if (userData[i].surname && userData[i].surname.toLowerCase().includes(searchQuery.toLowerCase())) {
        searchResults.push(userData[i]);
      } else if (userData[i].staff_no?.toString() && userData[i].staff_no?.toString().includes(searchQuery.toLowerCase())) {
        searchResults.push(userData[i]);
      } else if (userData[i].student_number?.toString() && userData[i].student_number?.toString().includes(searchQuery.toLowerCase())) {
        searchResults.push(userData[i]);
      }
    }
    setSearchResultsData([...searchResults]);
  };

  //Handle assign device
  const handleAssignDevice = () => {
    if (!selectedUser.fullName) {
      return setShowToast({ isShow: true, type: "error", message: "Please select user." });
    }
    setSelectedUser({ userType: "Students" });

    const today = getTodayDate();

    const { id } = params;
    if (!id) {
      return setShowToast({ isShown: true, type: "error", message: "Device Id not provided" });
    }

    if (formType === "release") {
      //Release user
      const data = {
        fullName: selectedUser.fullName,
        status: "Available",
        userId: selectedUser.userId,
        return_date: getTodayDate(),
      };

      releaseDevice(id, data, setShowToast);
      return onSubmit();
    } else {
      //re-assign user
      const data = {
        fullName: selectedUser.fullName,
        status: "Assigned",
        userId: selectedUser.userId,
        date_issued: getTodayDate(),
      };

      assignDevice(id, data, setShowToast);
      return onSubmit();
    }
  };

  useEffect(() => {
    if (userData) {
      //setSearchResultsData(userData);
    }
  }, []);
  return (
    <div>
      <span className="font-semibold p-2">Loan Device</span>

      <div className="flex flex-col  -z-50">
        <div className="flex flex-col border border-red-400 p-4 rounded-md">
          <span className="text-sm text-red-400">This operation will loan the device to the user for set time period.</span>
        </div>
        {/** */}
        <div className="flex flex-col border-t-2 py-5 ">
          <div
            className="text-input col-span-2"
            onClick={() => {
              toggleUsers();
            }}
          >
            <span className="w-fit text-zinc-500 -mt-5 bg-white">User</span>
            <span>{selectedUser?.fullName ? `${selectedUser.fullName} - ${selectedUser.userId}` : "- Select User -"}</span>
          </div>
          <div className={`${showUsers.isShow ? "flex" : "hidden"} flex-col relative  bg-white border border-zinc-300 rounded-md p-2 text-sm`}>
            <input
              type="text"
              name=""
              className="border outline-none p-1"
              placeholder="Search here ...."
              value={searchValue}
              onChange={(e) => {
                handleFilterUsers(e.target.value, userData);
                setSearchValue(e.target.value);
              }}
            />
            <div className="flex flex-col h-[300px] border overflow-auto">
              {searchResultsData?.map((item) => (
                <span
                  key={item.id}
                  className="hover:bg-zinc-50 p-1"
                  onClick={() => {
                    setFormType("reassign");
                    setSelectedUser({
                      fullName: `${item.name} ${item.surname}`,
                      userId: item.staff_no || item.student_number,
                    });

                    toggleUsers();
                  }}
                >{`${item.name} ${item.surname} - ${item?.staff_no || item.student_number}`}</span>
              ))}
            </div>
          </div>
        </div>
        {/** */}
        <div className="flex flex-col border-b-2 py-5 ">
          <div
            className="text-input col-span-2"
            onClick={() => {
              toggleDevices();
            }}
          >
            <span className="w-fit text-zinc-500 -mt-5 bg-white">Device</span>
            <span>{selectedDevice?.id ? `${selectedDevice.make} ${selectedDevice.model}  - ${selectedDevice.serial_no} / ${selectedDevice.asset_tag}` : "- Select Device -"}</span>
          </div>
          <div className={`${showDevices.isShow ? "flex" : "hidden"} flex-col relative  bg-white border border-zinc-300 rounded-md p-2 text-sm`}>
            <input
              type="text"
              name=""
              className="border outline-none p-1"
              placeholder="Search here ...."
              value={searchValue}
              onChange={(e) => {
                handleFilterUsers(e.target.value, devicesData);
                setSearchValue(e.target.value);
              }}
            />
            <div className="flex flex-col h-[300px] border overflow-auto">
              {searchResultsData?.map((item) => (
                <span
                  key={item.id}
                  className="hover:bg-zinc-50 p-1"
                  onClick={() => {
                    setSelectedDevice({ id: item.id, make: item.make, model: item.model, serial_no: item.serial_no, asset_tag: item.asset_tag });

                    toggleDevices();
                  }}
                >{`${item.make} ${item.model} - ${item?.serial_no} / ${item?.asset_tag}`}</span>
              ))}
            </div>
          </div>
        </div>
        {/** */}
        <div className="flex justify-end p-3 gap-8">
          <button className="flex  rounded-sm p-3" onClick={onCanel}>
            Cancel
          </button>
          <SubmitButton text={"Submit"} onClick={handleAssignDevice} />
        </div>
      </div>
    </div>
  );
}

export default CreateNewLoan;
