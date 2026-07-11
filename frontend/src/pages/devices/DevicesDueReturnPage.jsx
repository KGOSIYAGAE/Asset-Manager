import React, { useEffect, useState } from "react";
import DueReturnLaptopsTable from "../../components/tables/DueReturnLaptopsTable";
import ExportExcelButton from "../../components/buttons/ExportExcelButton";
import { getAllDevicesDueReturn } from "../../services/api/devices/Device.Api";
import { hasPermission } from "../../utils/getLoggedInUser";

function DevicesDueReturnPage({ path }) {
  const [dueReturnDevices, setDueReturnDevices] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 8;

  useEffect(() => {
    //setApprovalDevices(getRequiresApprovalDevices(devicesState?.deviceList));

    getAllDevicesDueReturn({ page: currentPage, limit: limit }, setDueReturnDevices, setTotalPages);
  }, [currentPage]);

  return (
    <div className="h-svh flex flex-col p-3 gap-3 bg-zinc-50  ">
      <div className="flex items-center justify-between rounded-md p-2  bg-white">
        <span className="heading-text ">{"Devices Due Return At Termination"}</span>
        <div className="flex gap-2 ">{hasPermission("export") && <ExportExcelButton />}</div>
      </div>
      {/* */}
      <div className=" bg-white flex flex-col col-span-4 row-span-1 rounded-md shadow-lg border">
        <DueReturnLaptopsTable devices={dueReturnDevices} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} limit={limit} />
      </div>
      {/* */}
    </div>
  );
}

export default DevicesDueReturnPage;
