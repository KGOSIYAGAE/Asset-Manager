import React, { useEffect, useState } from "react";
import { handleTimeStamp, handleTimeStampToText } from "../../utils/dateConverter";
import { useNavigate } from "react-router-dom";
import { getLoanedDevicesHelper } from "../../utils/devicesHelperMethods";
import { BsEyeFill } from "react-icons/bs";
import TablePagation from "../cards/tablePagation/TablePagation";

function DevicesWarrantySummaryTable({ devicesWarrantyStats, currentPage, setCurrentPage, totalPages, limit }) {
  const navigate = useNavigate();
  const [tableHeaders, setTableHeaders] = useState();

  const [columnCount, setColumnCount] = useState(8);
  //Handle view more
  const handleViewDevice = (id) => {
    navigate(`/devices/device-details/${id}`);
  };

  return (
    <div className="table-view-summary">
      <table className="">
        <thead className=" bg-slate-100 sticky top-0 h-[40px] rounded-md">
          <th>
            <span>Make</span>
          </th>
          <th>
            <span>Model</span>
          </th>
          <th>
            <span>Asset Tag</span>
          </th>
          <th>
            <span>Serial Number</span>
          </th>
          <th>
            <span>Warranty Date</span>
          </th>
          <th>
            <span>Warranty Status</span>
          </th>
          <th>
            <span>Days</span>
          </th>
          <th>
            <span>Action</span>
          </th>
        </thead>
        {devicesWarrantyStats <= 0 ? (
          <tbody>
            <tr className="">
              <td colSpan={columnCount} style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                <strong>No data available</strong>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody className="">
            {devicesWarrantyStats
              ? devicesWarrantyStats.map((device, count) => (
                  <tr className="hover:bg-slate-50" key={device.id}>
                    <td>{device.make}</td>
                    <td>{device.model}</td>
                    <td>{device.asset_tag}</td>
                    <td>{device.serial_no}</td>
                    <td>
                      {(() => {
                        return handleTimeStampToText(device.warranty_end_date);
                      })()}
                    </td>
                    <td>
                      {device?.warranty_status === "Expiring Soon" ? (
                        <span className="text-sm bg-green-600 border shadow-sm p-1 rounded-md text-white">{device?.warranty_status}</span>
                      ) : (
                        <span className="text-sm bg-red-600 border shadow-sm p-1 rounded-md text-white">{device?.warranty_status}</span>
                      )}
                    </td>
                    <td>{device.days_diff_label}</td>

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
      {/*<TablePagation currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} limit={limit} />*/}
    </div>
  );
}

export default DevicesWarrantySummaryTable;
