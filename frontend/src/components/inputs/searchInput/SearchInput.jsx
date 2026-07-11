import React, { useEffect, useState } from "react";
import { IoReloadOutline, IoSearchOutline, IoCloseCircleOutline } from "react-icons/io5";

import { useSearchContext } from "../../../hooks/useSearchContext";
import { getSearchResults } from "../../../services/api/admin/Search.Api";

function SearchInput({ tableName, setSearchResults, setTotalPages, onCanelSearch }) {
  const [searchQuery, setSearchQuery] = useState();
  const [searchInput, setSearchInput] = useState();

  //const { searchDispatch } = useSearchContext();

  //Search function
  /* const handleSearch = (searchQuery, searchData) => {
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
        }*
      }

      return searchDispatch({ type: "SET_SEARCH_RESULTS", payload: searchResults });
    } catch (error) {
      console.log("Error searching");
    }
  };*/

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
    onCanelSearch();
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
    handleSearch(searchQuery, tableName, setSearchResults, setTotalPages);
  }, [searchQuery]);

  return (
    <div className="flex justify-between items-center p-1 gap-2">
      <input
        type="text"
        placeholder="search here..."
        className="w-[250px] outline-none border-2 focus:border-red-600 rounded-md p-1"
        value={searchInput}
        onChange={(e) => {
          if (e.target.value.trim().length === 0) {
            handleClearSearch();
          } else {
            setSearchInput(e.target.value);
          }
        }}
      />
      {searchQuery ? (
        <IoCloseCircleOutline
          className="text-zinc-500 hover:text-red-600 "
          size={25}
          onClick={() => {
            handleClearSearch();
          }}
        />
      ) : (
        <IoSearchOutline
          className="text-zinc-500  hover:text-red-600"
          size={25}
          onClick={() => {
            handleSearch(searchQuery, tableName, setSearchResults, setTotalPages);
          }}
        />
      )}
    </div>
  );
}

export default SearchInput;
