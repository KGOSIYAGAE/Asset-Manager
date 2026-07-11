import React, { useEffect, useState } from "react";
import { getAllDeviceForApproval, getAllDevices } from "../../services/api/devices/Device.Api";

import { Modal } from "@mui/material";
import ToastMessage from "../../components/toastMessage/ToastMessage";
import { useDeviceContext } from "../../hooks/useDevicesContext";
import DevicesRequiresApprovalTable from "../../components/tables/DevicesRequireApprovalTable";
import SearchInput from "../../components/inputs/searchInput/SearchInput";
import { useSearchContext } from "../../hooks/useSearchContext";
import { getRequiresApprovalDevices } from "../../utils/devicesHelperMethods";

function DeviceForApproval({ path }) {
  const [openModal, setOpenModal] = useState({ isShown: false, type: null, data: null });
  const [showToast, setShowToast] = useState({ isShow: false, type: "", message: null });
  const [approvalDevices, setApprovalDevices] = useState(null);

  const { searchState, searchDispatch } = useSearchContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 8;

  const [searchResults, setSearchResults] = useState(null);
  /////////////////////Handle Search Results////////////

  const handleGetPage = () => {
    const data = {
      page: currentPage,
      limit: limit,
    };

    getAllDeviceForApproval(data, setApprovalDevices, setTotalPages);
  };

  //Handles search clear -> Sent to Search component
  const handleCancelSearch = () => {
    setSearchResults(null);
    getAllDeviceForApproval({ page: currentPage, limit: limit }, setApprovalDevices, setTotalPages);
  };

  //Execute Gett All devices on load or status change
  useEffect(() => {
    getAllDeviceForApproval({ page: currentPage, limit: limit }, setApprovalDevices, setTotalPages);
  }, [currentPage]);

  /* useEffect(() => {
    //setApprovalDevices(getRequiresApprovalDevices(devicesState?.deviceList));
    getAllDeviceForApproval({ page: currentPage, limit: limit }, setApprovalDevices, setTotalPages);
  }, [currentPage]);*/

  return (
    <div className="h-svh flex flex-col p-3 gap-3 bg-zinc-50  ">
      <span className="text-sm ">
        Devices/ <b> {path}</b>
      </span>
      <div className="flex flex-col  bg-white rounded-md shadow-md ">
        <div className="  bg-white  flex  justify-between sticky top-0  p-5">
          <span className="heading-text ">Devices For Approval</span>
          <SearchInput tableName={"devices"} setSearchResults={setSearchResults} setTotalPages={setTotalPages} onCanelSearch={handleCancelSearch} />
        </div>
        {/* */}
        <div className="flex p-2">
          <DevicesRequiresApprovalTable
            devices={searchResults ? searchResults : approvalDevices}
            label={"Devices For Approval"}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            limit={limit}
          />
        </div>
        {/* */}
      </div>

      <ToastMessage
        isShown={showToast.isShow}
        type={showToast.type}
        message={showToast.message}
        onClose={() => {
          setShowToast({ isShow: false });
        }}
      />
    </div>
  );
}

export default DeviceForApproval;
