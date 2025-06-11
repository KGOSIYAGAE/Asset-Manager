import React, { useEffect } from "react";
import { useLoanDueContext } from "../../hooks/useLoanDueContext";
import { getAllDeviceLoanDue } from "../../services/api/devices/Device.Api";
import OverdueLoanTable from "../../components/tables/OverdueLoanTable";

function DevicesOnLoan({ path }) {
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
        <OverdueLoanTable loanDueState={loanDueState?.loanDueList} label={"Devices Loaned"} />
      </div>
      {/* */}
    </div>
  );
}

export default DevicesOnLoan;
