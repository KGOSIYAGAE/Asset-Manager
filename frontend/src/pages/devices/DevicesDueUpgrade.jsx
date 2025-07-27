import React, { useEffect } from "react";
import { hasPermission } from "../../utils/getLoggedInUser";
import AddButton from "../../components/buttons/AddButton";
import ExportExcelButton from "../../components/buttons/ExportExcelButton";
import DueUpgradeLaptopsTable from "../../components/tables/DueUpgradeLaptopsTable";
import { useLoanDueContext } from "../../hooks/useLoanDueContext";
import { getAllDeviceLoanDue, getAllDevices } from "../../services/api/devices/Device.Api";
import { useDeviceContext } from "../../hooks/useDevicesContext";

function DevicesDueUpgrade({ path }) {
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
      <div className=" bg-white flex flex-col col-span-4 row-span-1 rounded-md shadow-lg border">
        <DueUpgradeLaptopsTable devices={devicesState?.deviceList} label={"User Devices Due Upgrade"} />
      </div>
      {/* */}
    </div>
  );
}

export default DevicesDueUpgrade;
