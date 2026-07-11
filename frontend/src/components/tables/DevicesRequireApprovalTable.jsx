import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleTimeStamp, handleTimeStampToText } from "../../utils/dateConverter";
import { getRequiresApprovalDevices } from "../../utils/devicesHelperMethods";
import SearchInput from "../inputs/searchInput/SearchInput";
import { useSearchContext } from "../../hooks/useSearchContext";
import { MdGavel } from "react-icons/md";
import TablePagation from "../cards/tablePagation/TablePagation";

function DevicesRequiresApprovalTable({ devices, currentPage, setCurrentPage, totalPages, limit }) {
  const navigate = useNavigate();

  const [columnCount, setColumnCount] = useState(8);

  //Handle view more
  const handleViewDevice = (id) => {
    navigate(`/devices/device-details/${id}`);
  };

  useEffect(() => {}, [devices]);

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
            <span>Status</span>
          </th>
          <th>
            <span>Date Issued</span>
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
                  <tr className="hover:bg-slate-50 border h-1 " key={device.id}>
                    {/*<td>
                      {(() => {
                        return count + 1;
                      })()}
                    </td>*/}
                    <td>{device.asset_tag}</td>
                    <td>{device.serial_no}</td>
                    <td>{device.make}</td>
                    <td>{device.model}</td>
                    <td>{device.current_user_id}</td>
                    <td>{device.status}</td>
                    <td>
                      {(() => {
                        return handleTimeStampToText(device.issue_date);
                      })()}
                    </td>

                    <td>
                      <span
                        className="flex gap-2 text-blue-600 hover:text-blue-700  cursor-pointer"
                        onClick={() => {
                          handleViewDevice(device.id);
                        }}
                      >
                        <MdGavel size={20} />
                        Approve / Reject
                      </span>
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

export default DevicesRequiresApprovalTable;
