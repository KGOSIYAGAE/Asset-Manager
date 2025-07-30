import React from "react";

function DevicesDashboard() {
  return (
    <div className="grid grid-cols-5">
      <div className="flex items-center gap-3 border rounded-sm p-2">
        <div className="w-[48px] h-[48px] bg-slate-200 rounded-full"></div>
        <div className="flex flex-col g">
          <span>Total Devices</span>
          <span className="font-bold">10007</span>
        </div>
      </div>
    </div>
  );
}

export default DevicesDashboard;
