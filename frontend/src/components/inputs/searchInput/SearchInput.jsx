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
        if (searchData[i].make && searchData[i].make.toLowerCase().includes(searchQuery.toLowerCase())) {
          searchResults.push(searchData[i]);
        } else if (searchData[i].model && searchData[i].model.toLowerCase().includes(searchQuery.toLowerCase())) {
          searchResults.push(searchData[i]);
        } else if (searchData[i].serial_no && searchData[i].serial_no.toLowerCase().includes(searchQuery.toLowerCase())) {
          searchResults.push(searchData[i]);
        } else if (searchData[i].assetTag && searchData[i].assetTag.toLowerCase().includes(searchQuery.toLowerCase())) {
          searchResults.push(searchData[i]);
        } else if (searchData[i].name && searchData[i].name.toLowerCase().includes(searchQuery.toLowerCase())) {
          searchResults.push(searchData[i]);
        } else if (searchData[i].surname && searchData[i].surname.toLowerCase().includes(searchQuery.toLowerCase())) {
          searchResults.push(searchData[i]);
        } else if (searchData[i].staff_no && searchData[i].staff_no.toLowerCase().includes(searchQuery.toLowerCase())) {
          searchResults.push(searchData[i]);
        } else if (searchData[i].student_no && searchData[i].student_no.toLowerCase().includes(searchQuery.toLowerCase())) {
          searchResults.push(searchData[i]);
        }
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
