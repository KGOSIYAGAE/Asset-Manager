import React, { useEffect, useState } from "react";
import SubmitButton from "../../buttons/SubmitButton";
import SearchInput from "../../inputs/searchInput/SearchInput";
import ToastMessage from "../../toastMessage/ToastMessage";
import { TiArrowSortedDown } from "react-icons/ti";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
//import { assignReleaseUser } from "../../../services/api/devices/Device.Api";
import { generateUpgradeDate, getTodayDate } from "../../../utils/helperMethods";
import { assignDevice, releaseDevice } from "../../../services/api/devices/Device.Api";
import { handleReleaseDevice } from "../../../utils/HandleReleaseDevice";

function ReleaseUser({ onCanel, onSubmit, setShowToast }) {
  const [selectedUser, setSelectedUser] = useState({ id: null, fullName: null, userId: null, userType: null, location: null });

  const params = useParams();

  //Handle release device
  /*const handleReleaseDevice = (selectedUser, params, onSubmit, setShowToast) => {
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
  };*/

  useEffect(() => {
    setSelectedUser({
      fullName: "IT Stock manager",
      userId: parseInt("10000"),
    });
  }, []);
  return (
    <div>
      <span className="font-semibold p-2">Release User</span>

      <div className="flex flex-col gap-5 -z-50">
        <div className="flex flex-col border border-red-400 p-4 rounded-md">
          <span className="text-sm text-red-400">This operation will remove the current user.</span>
        </div>
        {/*<div className="flex flex-col border-t-2 border-b-2 py-5 ">
          <div className="text-input col-span-2" onClick={() => {}}>
            <span className="w-fit text-zinc-500 -mt-5 bg-white">New User</span>
            <span>{selectedUser?.fullName ? `${selectedUser.fullName} - ${selectedUser.userId}` : "- Select User -"}</span>
          </div>
        </div>*/}
        <div className="flex justify-end p-3 gap-8">
          <button className="flex  rounded-sm p-3" onClick={onCanel}>
            Cancel
          </button>
          <SubmitButton text={"Release"} onClick={() => handleReleaseDevice(selectedUser, params, onSubmit, setShowToast)} />
        </div>
      </div>
    </div>
  );
}

export default ReleaseUser;

/*
 const [showUsers, setShowUsers] = useState({ isShow: false });
  const [selectedUser, setSelectedUser] = useState({ id: null, fullName: null, userId: null, userType: null, location: null });

  const [searchValue, setSearchValue] = useState();
  const [searchResultsData, setSearchResultsData] = useState([]);

  const [userType, setUserType] = useState();
  const [formType, setFormType] = useState();

  const params = useParams();
  const navigate = useNavigate();

  //Toggle view users
  const toggleUsers = () => {
    if (showUsers.isShow) {
      setShowUsers({ isShow: false });
    } else {
      setShowUsers({ isShow: true });
    }
  };

  {
    /*Filter users
  const handleFilterUsers = (searchQuery, data) => {
    const searchResults = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].name && data[i].name.toLowerCase().includes(searchQuery.toLowerCase())) {
        searchResults.push(data[i]);
      } else if (data[i].surname && data[i].surname.toLowerCase().includes(searchQuery.toLowerCase())) {
        searchResults.push(data[i]);
      }
    }
    setSearchResultsData([...searchResults]);
  };
  }

  //Handle assign device
  const handleReleaseDevice = () => {
    if (!selectedUser.fullName) {
      return setShowToast({ isShow: true, type: "error", message: "Please select user." });
    }
    setSelectedUser({ userType: "Students" });

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
        upgradeDate: null,
        date_issued: null,
      };

      releaseDevice(id, data, setShowToast);
      return onSubmit();
    } else {
      //re-assign user
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

      assignDevice(id, data, setShowToast);
      return onSubmit();
    }
  };

  useEffect(() => {
    if (data) {
      setSearchResultsData(data);
    }
    setSelectedUser({
      fullName: "IT Stock manager",
      userId: parseInt("10000"),
    });
    setFormType("release");
  }, [data]);
*/

/*<span className="text-sm text-red-400">You can select new user below if you wish to reassign.</span>*/

/*<div className={`${showUsers.isShow ? "flex" : "hidden"} flex-col relative  bg-white border border-zinc-300 rounded-md p-2 text-sm`}>
            <input
              type="text"
              name=""
              className="border outline-none p-1"
              placeholder="Search here ...."
              value={searchValue}
              onChange={(e) => {
                handleFilterUsers(e.target.value, data);
                setSearchValue(e.target.value);
              }}
            />
            <div className="flex flex-col h-[300px] border overflow-auto">
              <span
                onClick={() => {
                  setFormType("release");
                  setSelectedUser({
                    fullName: "IT Stock manager",
                    userId: parseInt("10000"),
                  });
                  toggleUsers();
                }}
              >
                None
              </span>
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
          </div>*/
