import React, { useEffect, useState } from "react";
import { handleTimeStamp, handleTimeStampToText } from "../../utils/dateConverter";
import { useNavigate } from "react-router-dom";
import { getLoanedDevicesHelper } from "../../utils/devicesHelperMethods";
import { BsEyeFill } from "react-icons/bs";
import TablePagation from "../cards/tablePagation/TablePagation";

function OverdueLoanTable({ devices, currentPage, setCurrentPage, totalPages, limit }) {
  const navigate = useNavigate();

  const [columnCount, setColumnCount] = useState(8);
  //Handle view more
  const handleViewDevice = (id) => {
    navigate(`/devices/device-details/${id}`);
  };

  return (
    <div className="table-view">
      <table className="">
        <thead className=" bg-slate-100 sticky top-16 h-[40px] rounded-md">
          <th>
            <span>Asset Tag</span>
          </th>
          <th>
            <span>Serial Number</span>
          </th>
          <th>
            <span>Make</span>
          </th>
          <th>
            <span>Model</span>
          </th>
          <th>
            <span>User</span>
          </th>
          <th>
            <span>Staff / Student Number</span>
          </th>
          <th>
            <span>Date Issued</span>
          </th>
          <th>
            <span>Expected Return Date</span>
          </th>
          <th>
            <span>Action</span>
          </th>
        </thead>
        {devices <= 0 ? (
          <tbody>
            <tr className="">
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
                    <td>{device.asset_tag}</td>
                    <td>{device.serial_no}</td>
                    <td>{device.make}</td>
                    <td>{device.model}</td>
                    <td>{device.full_name}</td>
                    <td>{device.current_user_id}</td>
                    <td>
                      {(() => {
                        return handleTimeStampToText(device.issue_date);
                      })()}
                    </td>
                    <td>
                      {(() => {
                        return handleTimeStampToText(device.expected_return_date);
                      })()}
                    </td>
                    <td>
                      <div
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-600 cursor-pointer"
                        onClick={() => {
                          handleViewDevice(device.id);
                        }}
                      >
                        <BsEyeFill size={20} />

                        <span>View more</span>
                      </div>
                    </td>
                  </tr>
                ))
              : ""}
          </tbody>
        )}
      </table>
      <TablePagation currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} limit={limit} />
    </div>
  );
}

export default OverdueLoanTable;
