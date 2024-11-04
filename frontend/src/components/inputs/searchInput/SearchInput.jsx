import React, { useState } from "react";
import { IoReloadOutline, IoSearchOutline, IoCloseCircleOutline } from "react-icons/io5";

import { useSearchContext } from "../../../hooks/useSearchContext";

function SearchInput({ searchData }) {
  const [searchQuery, setSearchQuery] = useState("");
  const { searchDispatch } = useSearchContext();

  //Search function
  const handleSearch = (searchQuery, searchData) => {
    let searchResults = [];

    if (!searchQuery) {
      return handleClearSearch();
    }

    for (let i = 0; i < searchData.length; i++) {
      if (searchData[i].name.toLowerCase().includes(searchQuery.toLowerCase())) {
        searchResults.push(searchData[i]);
      } else if (searchData[i].surname.toLowerCase().includes(searchQuery.toLowerCase())) {
        searchResults.push(searchData[i]);
      } else if (searchData[i].staff_no && searchData[i].staff_no.toLowerCase().includes(searchQuery.toLowerCase())) {
        searchResults.push(searchData[i]);
      } else if (searchData[i].student_no && searchData[i].student_no.toLowerCase().includes(searchQuery.toLowerCase())) {
        searchResults.push(searchData[i]);
      }
    }

    return searchDispatch({ type: "SET_SEARCH_RESULTS", payload: searchResults });
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
