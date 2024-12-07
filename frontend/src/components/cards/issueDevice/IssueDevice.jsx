import React, { useEffect, useState } from "react";
import SubmitButton from "../../buttons/SubmitButton";
import SearchInput from "../../inputs/searchInput/SearchInput";
import ToastMessage from "../../toastMessage/ToastMessage";
import { TiArrowSortedDown } from "react-icons/ti";

function IssueDevice({ onCanel, onSubmit, data }) {
  const [showUsers, setShowUsers] = useState({ isShow: false });
  const [selectedUser, setSelectedUser] = useState({ fullName: null, userId: null, userType: null });

  const [searchValue, setSearchValue] = useState("");
  const [searchResultsData, setSearchResultsData] = useState([]);

  const [showToast, setShowToast] = useState({ isShow: false, type: "", message: null });
  const [userType, setUserType] = useState("");

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
      if (data[i].name && data[i].name.toLowerCase().includes(searchQuery.toLowerCase())) {
        searchResults.push(data[i]);
      } else if (data[i].surname && data[i].surname.toLowerCase().includes(searchQuery.toLowerCase())) {
        searchResults.push(data[i]);
      }
    }
    setSearchResultsData([...searchResults]);
  };

  //Handle assign device
  const handleAssignDevice = () => {
    if (!selectedUser.fullName) {
      return setShowToast({ isShow: true, type: "delete", message: "Please select user." });
    }
    setSelectedUser({ userType: "Students" });
    console.log(selectedUser);
    console.log(userType);
  };

  useEffect(() => {
    setSearchResultsData(data);
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-2 -z-50">
        <span className="font-semibold p-2">Assign User</span>
        {/*<div>
          <select name="" id="">
            <option value="">Staff</option>
            <option value="">Student</option>
          </select>
        </div>*/}
        <div className="flex flex-col border-t-2 border-b-2 py-5 ">
          <div
            className="text-input col-span-2"
            onClick={() => {
              toggleUsers();
            }}
          >
            <span className="w-fit text-zinc-500 -mt-5 bg-white">User</span>
            <span>{selectedUser?.fullName ? `${selectedUser.fullName}` : "- Select User -"}</span>
          </div>
          <div className={`${showUsers.isShow ? "flex" : "hidden"} flex-col relative  bg-white border border-zinc-300 rounded-md p-2 text-sm`}>
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
            <div className="flex flex-col h-[100px] border overflow-auto">
              {searchResultsData?.map((item) => (
                <span
                  key={item.id}
                  className="hover:bg-zinc-50 p-1"
                  onClick={() => {
                    setSelectedUser({
                      fullName: `${item.name} ${item.surname}`,
                      userId: item.staff_no || item.student_no,
                      userType: (item.staff_no ? "Staff" : "") || (item.student_no ? "Student" : ""),
                    });

                    toggleUsers();
                  }}
                >{`${item.name} ${item.surname}`}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end p-3 gap-8">
          <button className="flex  rounded-sm p-3" onClick={onCanel}>
            Cancel
          </button>
          <SubmitButton text={"Submit"} onClick={handleAssignDevice} />
        </div>
      </div>
      <ToastMessage
        isShown={showToast.isShow}
        type={showToast.type}
        message={showToast.message}
        onClose={() => {
          setShowToast({ isShow: false });
        }}
      />
    </div>
  );
}

export default IssueDevice;
