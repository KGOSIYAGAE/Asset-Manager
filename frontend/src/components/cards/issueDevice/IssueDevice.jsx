import React, { useEffect, useState } from "react";
import SubmitButton from "../../buttons/SubmitButton";
import SearchInput from "../../inputs/searchInput/SearchInput";
import ToastMessage from "../../toastMessage/ToastMessage";
import { TiArrowSortedDown } from "react-icons/ti";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { assignDevice } from "../../../services/api/devices/Device.Api";
import { generateUpgradeDate, getTodayDate } from "../../../utils/helperMethods";
import TextInput from "../../inputs/textInput/TextInput";
import OpenFormVerification from "../../../pages/openFormVerification/OpenFormVerification";

function IssueDevice({ onCanel, onSubmit, userData, deviceId, setShowToast }) {
  const [showUsers, setShowUsers] = useState({ isShow: false });
  const [selectedUser, setSelectedUser] = useState({ id: null, fullName: null, userId: null, userType: null, location: null });

  const [searchValue, setSearchValue] = useState("");
  const [searchResultsData, setSearchResultsData] = useState([]);

  const [userType, setUserType] = useState("");
  const [formType, setFormType] = useState("");

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

  //Filter users
  const handleFilterUsers = (searchQuery, data) => {
    const searchResults = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].name?.toString() && data[i].name?.toString().toLowerCase().includes(searchQuery.toLowerCase())) {
        searchResults.push(data[i]);
      } else if (data[i].surname?.toString() && data[i].surname?.toString().toLowerCase().includes(searchQuery.toLowerCase())) {
        searchResults.push(data[i]);
      } else if (data[i].staff_no?.toString() && data[i].staff_no?.toString().toLowerCase().includes(searchQuery.toLowerCase())) {
        searchResults.push(data[i]);
      } else if (data[i].student_number?.toString() && data[i].student_number?.toString().toLowerCase().includes(searchQuery.toLowerCase())) {
        searchResults.push(data[i]);
      }
    }
    setSearchResultsData([...searchResults]);
  };

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

  useEffect(() => {
    if (userData) {
      setSearchResultsData(userData);
    }
  }, [userData]);
  return (
    <div className="">
      <div className="flex flex-col gap-2 -z-50">
        <span className="font-semibold p-2">Assign User</span>

        <div className="flex flex-col border-t-2 border-b-2 py-5 ">
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
            <div className="flex flex-col h-[350px] border overflow-auto">
              {searchResultsData?.map((item) => (
                <span
                  key={item.id}
                  className="hover:bg-blue-100 p-1"
                  onClick={() => {
                    setSelectedUser({
                      fullName: `${item.name} ${item.surname}`,
                      userId: item.staff_no || item.student_number,
                      userType: (item.staff_no ? "Staff" : "") || (item.student_number ? "Student" : ""),
                    });

                    toggleUsers();
                  }}
                >{`${item.name} ${item.surname} - ${item?.staff_no || item.student_number}`}</span>
              ))}
            </div>
          </div>
        </div>
        <div>{/*<TextInput label={"Ticket Number"} value={null} isDisabled={false} maxLength={12} setOnChange={null} />*/}</div>

        <div className="flex justify-end p-3 gap-8">
          <button className="flex  rounded-sm p-3" onClick={onCanel}>
            Cancel
          </button>
          {selectedUser?.fullName ? (
            <div onClick={() => onCanel()}>
              <OpenFormVerification userId={selectedUser?.userId} deviceId={deviceId} setShowToast={setShowToast} />
            </div>
          ) : (
            ""
          )}

          {/*<SubmitButton text={"Submit"} onClick={handleAssignDevice} />*/}
        </div>
      </div>
    </div>
  );
}

export default IssueDevice;
