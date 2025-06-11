import React, { useEffect } from "react";
import { hasPermission } from "../../utils/getLoggedInUser";
import AddButton from "../../components/buttons/AddButton";
import ExportExcelButton from "../../components/buttons/ExportExcelButton";
import DueUpgradeLaptopsTable from "../../components/tables/DueUpgradeLaptopsTable";
import { useLoanDueContext } from "../../hooks/useLoanDueContext";
import { getAllDeviceLoanDue } from "../../services/api/devices/Device.Api";

function DevicesDueUpgrade({ path }) {
  const { loanDueState, loanDueDispatch } = useLoanDueContext();

  useEffect(() => {
    getAllDeviceLoanDue(loanDueDispatch);

    console.log(loanDueDispatch);
  }, [loanDueDispatch]);

  return (
    <div className="h-svh flex flex-col p-3 gap-3 bg-zinc-50  ">
      <span className="text-sm ">
        Devices/ <b> {path}</b>
      </span>

      {/* */}
      <div className=" bg-white flex flex-col col-span-4 row-span-1 rounded-md shadow-lg border">
        <DueUpgradeLaptopsTable loanDueState={loanDueState?.loanDueList} label={"User Devices Due Upgrade"} />
      </div>
      {/* */}
    </div>
  );
}

export default DevicesDueUpgrade;
