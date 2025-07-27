import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handleFilter } from "../../../../utils/helperMethods";

function UserSelectInput({ userData, selectedUser, setSelectedUser }) {
  const [showUsers, setShowUsers] = useState({ isShow: false });

  const [searchValue, setSearchValue] = useState("");
  const [searchResultsData, setSearchResultsData] = useState();

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
  return (
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
            setSearchResultsData(handleFilter(e.target.value, userData));
            setSearchValue(e.target.value);
          }}
        />
        <div className="flex flex-col h-[300px] border overflow-auto">
          {searchResultsData?.map((item) => (
            <span
              key={item.id}
              className="hover:bg-zinc-50 p-1"
              onClick={() => {
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
  );
}

export default UserSelectInput;
