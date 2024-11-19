import React from "react";
import SearchInput from "../../components/inputs/searchInput/SearchInput";
import AddButton from "../../components/buttons/AddButton";
import RefreshButton from "../../components/buttons/RefreshButton";
import DataTable from "../../components/dataGrid/DataTable";
import { devicesTableHeaders } from "../../utils/TableHeaders";

function Devices({ path }) {
  return (
    <div className="h-svh flex flex-col p-3 gap-3 bg-zinc-50">
      <span className="text-sm">
        <b> {path}</b>
      </span>
      <div className="flex flex-col bg-white p-3 gap-5 rounded-md shadow-md ">
        <div className="flex justify-between">
          <span className="heading-text">Device List</span>
          <div className="flex gap-2">
            <SearchInput searchData={""} />
            <AddButton name={"Add New Device"} handleAdd={""} />
            <RefreshButton />
          </div>
        </div>
        <DataTable rows={/*searchState.searchResults ? searchState.searchResults : staffState.staffList*/ ""} colHeaders={devicesTableHeaders} handleEdit={""} handleDelete={""} />
      </div>

      {/*<ToastMessage isShown={toastState.isShown} type={toastState.type} message={toastState.message} onClose={handleToastClose} />*/}
    </div>
  );
}

export default Devices;
