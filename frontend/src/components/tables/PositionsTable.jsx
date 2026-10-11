import React, { useEffect, useState } from "react";
import ExportExcelButton from "../buttons/ExportExcelButton";
import { handleTimeStamp, handleTimeStampToText } from "../../utils/dateConverter";
import { getAllDeviceLoanDue } from "../../services/api/devices/Device.Api";
import { useDeviceContext } from "../../hooks/useDevicesContext";
import { useNavigate } from "react-router-dom";
import { getDueUpgradeDevicesHelper } from "../../utils/devicesHelperMethods";
import TablePagation from "../cards/tablePagation/TablePagation";
import { CiViewList } from "react-icons/ci";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { hasPermission } from "../../utils/getLoggedInUser";

function PositionsTable({ positions, currentPage, setCurrentPage, totalPages, limit, setOpenModal }) {
  const navigate = useNavigate();

  const [columnCount, setColumnCount] = useState(8);

  return (
    <div className="table-view">
      <table className="">
        <thead className=" bg-slate-100 sticky top-0 h-[40px] rounded-md">
          <th>Position Id</th>
          <th>Position Name</th>
          <th>Postion Type</th>
          <th>Department Name</th>
          <th>Number of Staff</th>
          <th>Status</th>
          <th>Action</th>
        </thead>
        {positions?.length <= 0 ? (
          <tbody>
            <tr className="border border-slate-200">
              <td colSpan={columnCount} style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                <strong>No data available</strong>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody className="">
            {positions
              ? positions.map((position, count) => (
                  <tr className="hover:bg-slate-50" key={position.position_id}>
                    <td>{position.position_id}</td>
                    <td>{position.post_name}</td>
                    <td>{position.post_type}</td>
                    <td>{position.department_name}</td>
                    <td>{position.staff_count}</td>
                    <td>{position.is_deleted ? <span className="rounded-md bg-red-500 p-1 text-white">In Active</span> : <span className="rounded-md bg-green-500 p-1 text-white">Active</span>}</td>
                    <td>
                      <div className="flex  gap-2 z-0">
                        {hasPermission("edit") && (
                          <div
                            className="w-[30px] flex items-center justify-center text-blue-500 bg-blue-100 p-1 rounded-md border border-blue-500 cursor-pointer"
                            onClick={() => setOpenModal({ isShown: true, type: "update-position", data: position })}
                          >
                            <MdEdit size={20}></MdEdit>
                          </div>
                        )}

                        {position.is_deleted
                          ? ""
                          : hasPermission("delete") && (
                              <div
                                className="w-[30px] flex items-center justify-center text-red-600 bg-red-100 p-1 rounded-md border border-red-600 cursor-pointer"
                                onClick={() => {
                                  setOpenModal({ isShown: true, type: "delete-position", data: position });
                                }}
                              >
                                <MdDeleteForever size={20}></MdDeleteForever>
                              </div>
                            )}
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

export default PositionsTable;
