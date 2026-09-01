import React, { useEffect, useState } from "react";
import { hasPermission } from "../../utils/getLoggedInUser";
import AddButton from "../../components/buttons/AddButton";
import ExportExcelButton from "../../components/buttons/ExportExcelButton";
import DueUpgradeLaptopsTable from "../../components/tables/DueUpgradeLaptopsTable";
import { useLoanDueContext } from "../../hooks/useLoanDueContext";
import { getAllDeviceLoanDue, getAllDevices } from "../../services/api/devices/Device.Api";
import { useDeviceContext } from "../../hooks/useDevicesContext";

function DevicesDueUpgrade({ path }) {
  const { devicesState, devicesDispatch } = useDeviceContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 8;

  useEffect(() => {
    getAllDevices(devicesDispatch);
  }, []);

  return (
    <div className="h-svh flex flex-col p-3 gap-3 bg-zinc-50  ">
      <span className="text-sm ">
        Devices/ <b> {path}</b>
      </span>

      {/* */}
      <div className=" bg-white flex flex-col col-span-4 row-span-1 rounded-md shadow-lg border">
        <div className="flex items-center justify-between  rounded-t-md p-2 sticky top-0 bg-white">
          <span className="heading-text ">User Devices Due Upgrade</span>
          {hasPermission("approve") && <ExportExcelButton />}
        </div>
        <div className="flex p-2">
          <DueUpgradeLaptopsTable devices={devicesState?.deviceList} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} limit={limit} />
        </div>
      </div>
      {/* */}
    </div>
  );
}

export default DevicesDueUpgrade;
