import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handleFilter } from "../../../../utils/helperMethods";
import { getSearchResults } from "../../../../services/api/admin/Search.Api";

function UserSelectInput({ studentData, staffData, selectedUser, setSelectedUser }) {
  const [showUsers, setShowUsers] = useState({ isShow: false });

  const [searchQuery, setSearchQuery] = useState();
  const [searchInput, setSearchInput] = useState();
  const [userData, setUserData] = useState(null);
  const tableName = "staff-students";
  const [totalPages, setTotalPages] = useState(1);

  const params = useParams();
  const navigate = useNavigate();

  const handleSearch = (searchQuery, tableName, setSearchResults, setTotalPages) => {
    const data = {
      tableName,
      searchQuery,
    };
    getSearchResults(data, setSearchResults, setTotalPages);
  };

  //Clears Search Box and fetch all data
  const handleClearSearch = () => {
    setSearchInput();
    setUserData([...staffData, ...studentData]);
  };

  //Search Debounce UseEffect
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      if (searchInput) {
        setSearchQuery(searchInput);
      }
    }, 500);

    return () => clearTimeout(delayTimer);
  }, [searchInput]);

  //Search API axecution UseEffect
  useEffect(() => {
    handleSearch(searchQuery, tableName, setUserData, setTotalPages);
  }, [searchQuery]);

  //Toggle view users
  const toggleUsers = () => {
    if (showUsers.isShow) {
      setShowUsers({ isShow: false });
    } else {
      setUserData([...staffData, ...studentData]);
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
        <span>{selectedUser?.fullName ? `${selectedUser?.fullName} - ${selectedUser?.userId}` : "- Select User -"}</span>
      </div>
      <div className={`${showUsers.isShow ? "flex" : "hidden"} flex-col relative  bg-white border border-zinc-300 rounded-md p-2 text-sm`}>
        <input
          type="text"
          name=""
          className="border outline-none p-1"
          placeholder="Search here ...."
          value={searchInput}
          onChange={(e) => {
            //setUserData(handleFilter(e.target.value, userData));
            if (e.target.value.trim().length === 0) {
              handleClearSearch();
            } else {
              setSearchInput(e.target.value);
            }
          }}
        />
        <div className="flex flex-col h-[300px] border overflow-auto">
          {userData?.map((item) => (
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
