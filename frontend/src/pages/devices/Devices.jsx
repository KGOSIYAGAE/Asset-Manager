import React, { useEffect, useState } from "react";
import SearchInput from "../../components/inputs/searchInput/SearchInput";
import AddButton from "../../components/buttons/AddButton";
import RefreshButton from "../../components/buttons/RefreshButton";
import DataTable from "../../components/dataGrid/DataTable";
import { devicesTableHeaders } from "../../utils/TableHeaders";

import { useDeviceContext } from "../../hooks/useDevicesContext";
import axiosInstance from "../../utils/axiosInstance";
import { useSearchContext } from "../../hooks/useSearchContext";
import { useNavigate } from "react-router-dom";
import { deleteDevice, getAllDevices } from "../../services/api/devices/Device.Api";
import ToastMessage from "../../components/toastMessage/ToastMessage";
import Modal from "react-modal";
import DeleteConfirmation from "../../components/cards/deleteConfirmation/DeleteConfirmation";
import IssueDevice from "../../components/cards/issueDevice/IssueDevice";
import ImportFile from "../../components/cards/importFile/ImportFile";

function Devices({ path }) {
  const { devicesState, devicesDispatch } = useDeviceContext();
  const { searchState, searchDispatch } = useSearchContext();
  const [showToast, setShowToast] = useState({ isShown: false, type: null, message: null });
  const [openModal, setOpenModal] = useState({ isShown: false, type: null, data: null });
  const [openImportModal, setOpenImportModal] = useState({ isShown: false, type: null, data: null });

  const navigate = useNavigate();

  //Handle dele
  const handleDelete = (cellValues) => {
    setOpenModal({ isShown: true, type: "delete", selectedDevice: cellValues.row.id, laptopSerialNo: cellValues.row.serial_no });
    //deleteDevice(cellValues.row.id, setShowToast);
  };
  //Hanlde Edit
  const handleEdit = (cellValues) => {
    navigate(`/devices/edit-device/${cellValues.row.id}`);
  };
  //Handle Add
  const handleAdd = () => {
    navigate("/devices/add-device");
  };

  //Hanlde Edit
  const handleViewDetails = (cellValues) => {
    navigate(`/devices/device-details/${cellValues.row.id}`);
  };

  const openIssueModal = () => {
    setOpenModal({ isShown: true, type: "issue", data: null });
  };

  //Import modal
  const ImportModal = () => {
    setOpenImportModal({ isShown: true, type: "issue", data: null });
  };

  useEffect(() => {
    searchDispatch({ type: "SET_SEARCH_NULL" });
    getAllDevices(devicesDispatch);
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
            <RefreshButton onClick={ImportModal} />
          </div>
        </div>
        <DataTable
          rows={searchState.searchResults ? searchState.searchResults : devicesState.deviceList}
          colHeaders={devicesTableHeaders}
          handleEdit={handleEdit}
          handleViewDetails={handleViewDetails}
          handleDelete={handleDelete}
        />
      </div>
      <Modal
        isOpen={openModal.isShown || openImportModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: { backgroundColor: "rgb(0,0,0,0.2)" },
        }}
        contentLabel=""
        className="w-[80%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5"
      >
        {openModal.isShown ? (
          <DeleteConfirmation
            text={"Are you sure you want to delete this device?"}
            heading={"Delete Device"}
            laptopSerialNo={openModal.laptopSerialNo}
            onDelete={() => {
              deleteDevice(openModal.selectedDevice, setShowToast);
              setOpenModal({ isShown: false });
            }}
            onCanel={() => {
              setOpenModal({ isShown: false });
            }}
          />
        ) : (
          ""
        )}
        {openImportModal.isShown ? (
          <ImportFile
            onClose={() => {
              setOpenImportModal({ isShown: false });
            }}
          />
        ) : (
          ""
        )}
      </Modal>
      <ToastMessage isShown={showToast.isShown} type={showToast.type} message={showToast.message} onClose={() => setShowToast({ isShown: false })} />
    </div>
  );
}

export default Devices;
