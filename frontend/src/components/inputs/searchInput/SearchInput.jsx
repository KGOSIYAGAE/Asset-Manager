import React, { useState } from "react";
import { IoReloadOutline, IoSearchOutline, IoCloseCircleOutline } from "react-icons/io5";
import { handleSearch } from "../../../utils/handleSearch";

function SearchInput() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="search-input">
      <input
        type="text"
        placeholder="search here..."
        className="w-72 bg-zinc-100 outline-none"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          handleSearch(e.target.value);
        }}
      />
      {searchValue ? (
        <IoCloseCircleOutline
          className="text-zinc-500 "
          size={20}
          onClick={() => {
            setSearchValue("");
          }}
        />
      ) : (
        <IoSearchOutline
          className="text-zinc-500 "
          size={20}
          onClick={() => {
            handleSearch(searchValue);
          }}
        />
      )}
    </div>
  );
}

export default SearchInput;
