import React, { useState } from "react";

import SearchInput from "../../../components/inputs/searchInput/SearchInput";
import AddButton from "../../../components/buttons/AddButton";
import RefreshButton from "../../../components/buttons/RefreshButton";
function Staff({ path }) {
  return (
    <div className="h-svh flex flex-col p-3 gap-3 bg-zinc-50">
      <span className="text-sm">
        <b>Users / Staff /</b> {path}
      </span>
      <div className="bg-white p-3 rounded-md shadow-md">
        <div className="flex justify-between">
          <span className="heading-text">Staff List</span>
          <div className="flex gap-2">
            <SearchInput />
            <AddButton name={"Add New Staff"} />
            <RefreshButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Staff;
