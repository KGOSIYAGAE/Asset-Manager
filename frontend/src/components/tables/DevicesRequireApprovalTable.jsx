import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleTimeStamp, handleTimeStampToText } from "../../utils/dateConverter";
import { getRequiresApprovalDevices } from "../../utils/devicesHelperMethods";
import SearchInput from "../inputs/searchInput/SearchInput";
import { useSearchContext } from "../../hooks/useSearchContext";

function DevicesRequiresApprovalTable({ devices, label }) {
  const navigate = useNavigate();

  const [columnCount, setColumnCount] = useState(8);

  //Handle view more
  const handleViewDevice = (id) => {
    navigate(`/devices/device-details/${id}`);
  };

  useEffect(() => {}, [devices]);

  return (
    <div className="w-full text-sm  rounded-md ">
      <div className="flex items-center justify-between border-b-2 rounded-t-md p-2 sticky top-0 bg-white"></div>
      <table className="w-full bg-white ">
        <thead className=" bg-slate-100 sticky top-0 h-[40px]">
          <th>#</th>
          <th>Asset Tag</th>
          <th>Serial Number</th>
          <th>Make</th>
          <th>Model</th>
          <th>User</th>
          <th>Status</th>
          <th>Date Issued</th>
          <th>Action</th>
        </thead>

        {devices <= 0 ? (
          <tbody>
            <tr>
              <td colSpan={columnCount} style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                <strong>No data available</strong>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody className="">
            {devices
              ? devices.map((device, count) => (
                  <tr className="hover:bg-slate-50" key={device.id}>
                    <td>
                      {(() => {
                        return count + 1;
                      })()}
                    </td>
                    <td>{device.asset_tag}</td>
                    <td>{device.serial_no}</td>
                    <td>{device.make}</td>
                    <td>{device.model}</td>
                    <td>{device.user_id}</td>
                    <td>{device.status}</td>
                    <td>
                      {(() => {
                        return handleTimeStampToText(device.date_issued);
                      })()}
                    </td>

                    <td>
                      <span
                        className="text-blue-500 hover:text-blue-600 underline cursor-pointer"
                        onClick={() => {
                          handleViewDevice(device.id);
                        }}
                      >
                        Approve
                      </span>
                    </td>
                  </tr>
                ))
              : ""}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default DevicesRequiresApprovalTable;
