import React, { useEffect, useState } from "react";
import { getAllDevices } from "../../services/api/devices/Device.Api";
import { useStaffContext } from "../../hooks/useStaffContext";
import ExportExcelButton from "../../components/buttons/ExportExcelButton";
import AddButton from "../../components/buttons/AddButton";
import DevicesRequiresApprovalTable from "../../components/tables/devicesRequiresApprovalTable";
import { Modal } from "@mui/material";
import ToastMessage from "../../components/toastMessage/ToastMessage";
import { useDeviceContext } from "../../hooks/useDevicesContext";

function DeviceForApproval({ path }) {
  const [openModal, setOpenModal] = useState({ isShown: false, type: null, data: null });
  const [showToast, setShowToast] = useState({ isShow: false, type: "", message: null });

  const { devicesState, devicesDispatch } = useDeviceContext();

  useEffect(() => {
    getAllDevices(devicesDispatch);
  }, []);

  return (
    <div className="h-svh flex flex-col p-3 gap-3 bg-zinc-50  ">
      <span className="text-sm ">
        Devices/ <b> {path}</b>
      </span>
      {/* */}
      <div className="col-span-6 h-[345px] bg-white rounded-md shadow-md overflow-x-scroll">
        <DevicesRequiresApprovalTable devices={devicesState?.deviceList} label={"Devices For Approval"} />
      </div>
      {/* */}

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
