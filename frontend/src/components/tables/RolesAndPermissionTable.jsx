import React, { useEffect, useState } from "react";
import { handleTimeStamp } from "../../utils/dateConverter";
import { useNavigate } from "react-router-dom";
import { getSystemUsers } from "../../utils/helperMethods";
import { getAdmins } from "../../services/api/admin/Admin.Api";
import TablePagation from "../cards/tablePagation/TablePagation";

function RolesAndPermissionTable({ userAndAdmins, handleUpdateRole, currentPage, setCurrentPage, totalPages, limit }) {
  const navigate = useNavigate();

  const [columnCount, setColumnCount] = useState(8);

  //Handle view more
  const handleViewDevice = (id) => {
    navigate(`/devices/device-details/${id}`);
  };

  return (
    <div className="table-view">
      <table className="">
        <thead className=" bg-slate-100 sticky top-0 h-[40px] rounded-md">
          <th>#</th>
          <th>Staff No</th>
          <th>First Name</th>
          <th>Last Name</th>

          <th>Email</th>
          <th>Department</th>
          <th>Position</th>
          <th>Access Role</th>
          <th>Action</th>
        </thead>
        {userAndAdmins <= 0 ? (
          <tbody>
            <tr className="">
              <td colSpan={columnCount} style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                <strong>No data available</strong>
                <p>Create a new system user.</p>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody className="">
            {userAndAdmins
              ? userAndAdmins.map((systemUser, count) => (
                  <tr className="hover:bg-slate-50" key={systemUser.id}>
                    <td>
                      {(() => {
                        return count + 1;
                      })()}
                    </td>
                    <td>{systemUser.staff_no}</td>
                    <td>{systemUser.name}</td>
                    <td>{systemUser.surname}</td>

                    <td>{systemUser.email}</td>
                    <td>{systemUser.department_name}</td>
                    <td>{systemUser.position_name}</td>
                    <td>{systemUser.userrole}</td>

                    <td>
                      <span
                        className="text-blue-500 hover:text-blue-600 underline cursor-pointer"
                        onClick={() => {
                          handleUpdateRole(systemUser);
                        }}
                      >
                        Update
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

export default RolesAndPermissionTable;
