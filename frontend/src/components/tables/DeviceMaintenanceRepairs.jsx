import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleTimeStamp, handleTimeStampToText } from "../../utils/dateConverter";
import { getRequiresApprovalDevices } from "../../utils/devicesHelperMethods";
import SearchInput from "../inputs/searchInput/SearchInput";
import { useSearchContext } from "../../hooks/useSearchContext";
import { MdDeleteForever, MdEdit, MdFileOpen, MdGavel } from "react-icons/md";
import TablePagation from "../cards/tablePagation/TablePagation";
import { BsEyeFill, BsGearFill } from "react-icons/bs";
import { CiViewList } from "react-icons/ci";

function DeviceMaintenanceRepairs({ repairs, currentPage, setCurrentPage, totalPages, limit, viewForm }) {
  const navigate = useNavigate();

  const [columnCount, setColumnCount] = useState(8);

  //Handle view more
  const handleViewDevice = (id) => {
    navigate(`/repairs/repair-details/${id}`);
  };

  return (
    <div className="table-view">
      <table className="">
        <thead className=" bg-slate-100 sticky top-0 h-[40px] rounded-md">
          <th>
            <span>Maintenance ID</span>
          </th>
          <th>
            <span>Device</span>
          </th>
          <th>
            <span>Serial Number</span>
          </th>
          <th>
            <span>Type</span>
          </th>
          <th>
            <span>Date Logged</span>
          </th>
          <th>
            <span>Status</span>
          </th>
          <th>
            <span>Technician</span>
          </th>

          <th>
            <span>Action</span>
          </th>
        </thead>

        {repairs <= 0 ? (
          <tbody>
            <tr className="">
              <td colSpan={columnCount} style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                <strong>No data available</strong>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody className="">
            {repairs
              ? repairs.map((repairs, count) => (
                  <tr className="hover:bg-slate-50 border h-1 " key={repairs.id}>
                    <td>{repairs.repair_code}</td>
                    <td>{`${repairs.make} ${repairs.model}`}</td>
                    <td>{repairs.serial_no}</td>
                    <td>{repairs.category}</td>
                    <td>
                      {(() => {
                        return new Date(repairs.date_created).toLocaleString();
                      })()}
                    </td>
                    <td>
                      <div className="flex justify-between  p-2 item-hover">
                        {repairs?.status_name === "Closed" || repairs?.status_name === "Collected" ? (
                          <span className="text-sm bg-green-600 border shadow-sm p-1 rounded-md text-white">{repairs?.status_name}</span>
                        ) : repairs?.status_name === "In Progress" || repairs?.status_name === "Awaiting Parts" || repairs?.status_name === "Testing" || repairs?.status_name === "Under Assesment" ? (
                          <span className="text-sm bg-orange-600 border shadow-sm p-1 rounded-md text-white">{repairs?.status_name}</span>
                        ) : repairs?.status_name === "Ready For Collection" ? (
                          <span className="text-sm bg-blue-600 border shadow-sm p-1 rounded-md text-white">{repairs?.status_name}</span>
                        ) : (
                          <span className="text-sm bg-red-600 border shadow-sm p-1 rounded-md text-white">{repairs?.status_name}</span>
                        )}
                      </div>
                    </td>
                    <td>{repairs.technican_name}</td>

                    <td>
                      <div className="flex items-center justify-center gap-3">
                        <div
                          className="w-[30px] flex items-center justify-center text-orange-600 hover:text-gray bg-orange-100 p-1 rounded-md border border-orange-500 cursor-pointer"
                          onClick={() => {
                            handleViewDevice(repairs?.id);
                          }}
                        >
                          <CiViewList size={20} />
                        </div>
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

export default DeviceMaintenanceRepairs;
