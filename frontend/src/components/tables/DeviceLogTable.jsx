import React, { useEffect, useState } from "react";
import { handleTimeStamp } from "../../utils/dateConverter";
import { getAllLatestDevicesLogs } from "../../services/api/deviceLogs/DeviceLogs";
import ExportExcelButton from "../buttons/ExportExcelButton";

function DeviceLogTable({ deviceLogs, label }) {
  useEffect(() => {}, []);
  return (
    <div className="col-span-6 h-[345px] bg-white rounded-md shadow-md overflow-x-scroll">
      <div className="flex items-center justify-between border-b-2 rounded-t-md p-2 sticky top-0 bg-white">
        <span className="heading-text ">{label}</span>
        <ExportExcelButton />
      </div>
      <div className="w-full text-sm  rounded-sm">
        <table className="w-full bg-white ">
          <thead className=" bg-slate-100 sticky top-0 h-[40px]">
            <tr>
              <th>#</th>
              <th>Device Id</th>
              <th>Action</th>
              <th>Description</th>
              <th>Created By</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody className="">
            {deviceLogs &&
              deviceLogs.map((log, count) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td>
                    {(() => {
                      return count + 1;
                    })()}
                  </td>
                  <td>{log.item_id}</td>
                  <td>{log.action}</td>
                  <td>{log.description}</td>
                  <td>{log.created_by}</td>
                  <td>{log.created_at}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DeviceLogTable;
