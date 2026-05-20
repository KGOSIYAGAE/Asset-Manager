import React, { useEffect, useState } from "react";
import { getAllDevices } from "../../services/api/devices/Device.Api";

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

  const { devicesState, devicesDispatch } = useDeviceContext();
  const { searchState, searchDispatch } = useSearchContext();

  useEffect(() => {
    getAllDevices(devicesDispatch);
  }, []);

  useEffect(() => {
    setApprovalDevices(getRequiresApprovalDevices(devicesState?.deviceList));
  }, [devicesState]);

  return (
    <div className="h-svh flex flex-col p-3 gap-3 bg-zinc-50  ">
      <span className="text-sm ">
        Devices/ <b> {path}</b>
      </span>
      <div className="flex flex-col overflow-scroll  bg-white rounded-md shadow-md ">
        <div className="  bg-white  flex  justify-between sticky top-0  p-5">
          <span className="heading-text ">Devices For Approval</span>
          <SearchInput searchData={approvalDevices} dataType={"devices"} />
        </div>
        {/* */}
        <div className="col-span-6 p-5">
          <DevicesRequiresApprovalTable devices={searchState?.searchResults ? searchState?.searchResults : approvalDevices} label={"Devices For Approval"} />
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
