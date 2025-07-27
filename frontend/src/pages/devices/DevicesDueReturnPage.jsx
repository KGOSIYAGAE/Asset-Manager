import React, { useEffect } from "react";
import DueReturnLaptopsTable from "../../components/tables/DueReturnLaptopsTable";

function DevicesDueReturnPage({ path }) {
  return (
    <div className="h-svh flex flex-col p-3 gap-3 bg-zinc-50  ">
      <span className="text-sm ">
        Devices/ <b> {path}</b>
      </span>

      {/* */}
      <div className=" bg-white flex flex-col col-span-4 row-span-1 rounded-md shadow-lg border">
        <DueReturnLaptopsTable label={"User Devices Due Return"} />
      </div>
      {/* */}
    </div>
  );
}

export default DevicesDueReturnPage;
