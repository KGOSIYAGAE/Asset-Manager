import React, { useEffect } from "react";
import SearchInput from "../../components/inputs/searchInput/SearchInput";
import AddButton from "../../components/buttons/AddButton";
import RefreshButton from "../../components/buttons/RefreshButton";
import DataTable from "../../components/dataGrid/DataTable";
import { devicesTableHeaders } from "../../utils/TableHeaders";

import { useDeviceContext } from "../../hooks/useDevicesContext";
import axiosInstance from "../../utils/axiosInstance";
import { useSearchContext } from "../../hooks/useSearchContext";
import { useNavigate } from "react-router-dom";

function Devices({ path }) {
  const { devicesState, devicesDispatch } = useDeviceContext();
  const { searchState } = useSearchContext();

  const navigate = useNavigate();

  //Handle dele
  const handleDelete = () => {};
  //Hanlde Edit
  const handleEdit = () => {};
  //Handle Add
  const handleAdd = () => {
    navigate("/devices/add-device");
  };

  //Get All devices
  const getAllDevices = async () => {
    try {
      const response = await axiosInstance.get("/devices/");

      if (response.data.deviceList) {
        devicesDispatch({ type: "SET_DEVICES", payload: response.data.deviceList });
      }
    } catch (error) {
      if (error.response && error.response.data.error) {
        return console.log(error.response.data.message);
      } else {
        return console.log("An unexpected error occured, please try again");
      }
    }
  };

  useEffect(() => {
    getAllDevices();
  }, []);
  return (
    <div className="h-svh flex flex-col p-3 gap-3 bg-zinc-50">
      <span className="text-sm">
        <b> {path}</b>
      </span>
      <div className="flex flex-col bg-white p-3 gap-5 rounded-md shadow-md ">
        <div className="flex justify-between">
          <span className="heading-text">Device List</span>
          <div className="flex gap-2">
            <SearchInput searchData={devicesState.deviceList} dataType={"devices"} />
            <AddButton name={"Add New Device"} handleAdd={handleAdd} />
            <RefreshButton />
          </div>
        </div>
        <DataTable rows={searchState.searchResults ? searchState.searchResults : devicesState.deviceList} colHeaders={devicesTableHeaders} handleEdit={""} handleDelete={""} />
      </div>

      {/*<ToastMessage isShown={toastState.isShown} type={toastState.type} message={toastState.message} onClose={handleToastClose} />*/}
    </div>
  );
}

export default Devices;
