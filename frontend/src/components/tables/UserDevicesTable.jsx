import React from "react";
import ExportExcelButton from "../buttons/ExportExcelButton";
import { handleTimeStamp } from "../../utils/dateConverter";
import { hasPermission } from "../../utils/getLoggedInUser";

function UserDevicesTable({ deviceList }) {
  return (
    <div className="col-span-6 h-[345px] bg-white rounded-md shadow-md overflow-x-scroll">
      <div className="flex items-center justify-between border-b-2 rounded-t-md p-2 sticky top-0 bg-white">
        <span className="heading-text ">User devices</span>
        {hasPermission("export") && <ExportExcelButton />}
      </div>
      <div className="w-full text-sm  rounded-sm">
        <table className="w-full bg-white ">
          <thead className=" bg-slate-100 sticky top-0 h-[40px]">
            <th>#</th>
            <th>Asset Tag</th>
            <th>Serial Number</th>
            <th>Make</th>
            <th>Model</th>
            <th>Category</th>
            <th>Date Issued</th>
            <th>Loan End Date</th>
            <th>Action</th>
          </thead>
          <tbody className="">
            {deviceList
              ? deviceList.map((device, count) => (
                  <tr className="hover:bg-slate-50">
                    <td>
                      {(() => {
                        return count + 1;
                      })()}
                    </td>
                    <td>{device.asset_tag}</td>
                    <td>{device.serial_no}</td>
                    <td>{device.make}</td>
                    <td>{device.model}</td>
                    <td>{device.category}</td>
                    <td>
                      {(() => {
                        return handleTimeStamp(device.date_issued);
                      })()}
                    </td>
                    <td>
                      {(() => {
                        return handleTimeStamp(device.loan_end_date);
                      })()}
                    </td>
                    <td>
                      <span className="text-blue-500 underline cursor-pointer">View more</span>
                    </td>
                  </tr>
                ))
              : ""}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserDevicesTable;
