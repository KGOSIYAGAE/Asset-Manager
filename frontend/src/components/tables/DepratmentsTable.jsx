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

function DepratmentsTable({ departments, currentPage, setCurrentPage, totalPages, limit, setOpenModal }) {
  const navigate = useNavigate();

  const [columnCount, setColumnCount] = useState(8);

  return (
    <div className="table-view">
      <table className="">
        <thead className=" bg-slate-100 sticky top-0 h-[40px] rounded-md">
          <th>Department ID</th>
          <th>Department Name</th>
          <th>Faculty Name</th>
          <th>Number of Staff</th>
          <th>Status</th>
          <th>Action</th>
        </thead>
        {departments?.length <= 0 ? (
          <tbody>
            <tr className="border border-slate-200">
              <td colSpan={columnCount} style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                <strong>No data available</strong>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody className="">
            {departments
              ? departments.map((department, count) => (
                  <tr className="hover:bg-slate-50" key={department.department_id}>
                    <td>{department.department_id}</td>
                    <td>{department.department_name}</td>
                    <td>{department.faculty_name}</td>
                    <td>{department.staff_count}</td>
                    <td>{department.is_deleted ? <span className="rounded-md bg-red-500 p-1 text-white">In Active</span> : <span className="rounded-md bg-green-500 p-1 text-white">Active</span>}</td>
                    <td>
                      <div className="flex  gap-2 z-0">
                        {hasPermission("edit") && (
                          <div
                            className="w-[30px] flex items-center justify-center text-blue-500 bg-blue-100 p-1 rounded-md border border-blue-500 cursor-pointer"
                            onClick={() => setOpenModal({ isShown: true, type: "update-department", data: department })}
                          >
                            <MdEdit size={20}></MdEdit>
                          </div>
                        )}

                        {department.is_deleted
                          ? ""
                          : hasPermission("delete") && (
                              <div
                                className="w-[30px] flex items-center justify-center text-red-600 bg-red-100 p-1 rounded-md border border-red-600 cursor-pointer"
                                onClick={() => {
                                  setOpenModal({ isShown: true, type: "delete-department", data: department });
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

export default DepratmentsTable;
