import React, { useState } from "react";
import { IoReloadOutline, IoSearchOutline, IoCloseCircleOutline } from "react-icons/io5";

import { useSearchContext } from "../../../hooks/useSearchContext";

function SearchInput({ searchData, dataType }) {
  const [searchQuery, setSearchQuery] = useState("");
  const { searchDispatch } = useSearchContext();

  //Search function
  const handleSearch = (searchQuery, searchData) => {
    let searchResults = [];

    if (!searchQuery) {
      return handleClearSearch();
    }

    try {
      for (let i = 0; i < searchData.length; i++) {
        if (searchData[i].name?.toString() && searchData[i].name?.toString().toLowerCase().includes(searchQuery.toLowerCase())) {
          searchResults.push(searchData[i]);
        } else if (searchData[i].surname?.toString() && searchData[i].surname?.toString().toLowerCase().includes(searchQuery.toLowerCase())) {
          searchResults.push(searchData[i]);
        } else if (searchData[i].staff_no?.toString() && searchData[i].staff_no?.toString().includes(searchQuery.toLowerCase())) {
          searchResults.push(searchData[i]);
        } else if (searchData[i].id_number?.toString() && searchData[i].id_number?.toString().includes(searchQuery.toLowerCase())) {
          searchResults.push(searchData[i]);
        } else if (searchData[i].student_number?.toString() && searchData[i].student_number?.toString().toLowerCase().includes(searchQuery.toLowerCase())) {
          searchResults.push(searchData[i]);
        } else if (searchData[i].make?.toString() && searchData[i].make?.toString().toLowerCase().includes(searchQuery.toLowerCase())) {
          searchResults.push(searchData[i]);
        } else if (searchData[i].model?.toString() && searchData[i].model?.toString().toLowerCase().includes(searchQuery.toLowerCase())) {
          searchResults.push(searchData[i]);
        } else if (searchData[i].serial_no?.toString() && searchData[i].serial_no?.toString().toLowerCase().includes(searchQuery.toLowerCase())) {
          searchResults.push(searchData[i]);
        } else if (searchData[i].asset_tag?.toString() && searchData[i].asset_tag?.toString().toLowerCase().includes(searchQuery.toLowerCase())) {
          searchResults.push(searchData[i]);
        } else if (searchData[i].user_id?.toString() && searchData[i].user_id?.toString().toLowerCase().includes(searchQuery.toLowerCase())) {
          searchResults.push(searchData[i]);
        }

        /*else if (searchData[i].userId?.toString() && searchData[i].userId?.toString().toLowerCase().includes(searchQuery.toLowerCase())) {
          searchResults.push(searchData[i]);
        }*/
      }

      return searchDispatch({ type: "SET_SEARCH_RESULTS", payload: searchResults });
    } catch (error) {
      console.log("Error searching");
    }
  };

  //Clear search
  const handleClearSearch = () => {
    searchDispatch({ type: "SET_SEARCH_NULL" });
    setSearchQuery("");
  };

  return (
    <div className="search-input">
      <input
        type="text"
        placeholder="search here..."
        className="w-72 bg-zinc-100 outline-none"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          handleSearch(e.target.value, searchData);
        }}
      />
      {searchQuery ? (
        <IoCloseCircleOutline
          className="text-zinc-500 "
          size={20}
          onClick={() => {
            handleClearSearch();
          }}
        />
      ) : (
        <IoSearchOutline
          className="text-zinc-500 "
          size={20}
          onClick={() => {
            handleSearch(searchQuery, searchData);
          }}
        />
      )}
    </div>
  );
}

export default SearchInput;
