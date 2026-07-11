import React, { useEffect, useState } from "react";
import { handleTimeStamp } from "../../utils/dateConverter";
import { useNavigate } from "react-router-dom";
import { getSystemUsers } from "../../utils/helperMethods";
import { getAdmins } from "../../services/api/admin/Admin.Api";

function RolesAndPermissionTable({ userAndAdmins, label, handleUpdateRole }) {
  const navigate = useNavigate();

  const [columnCount, setColumnCount] = useState(8);

  //Handle view more
  const handleViewDevice = (id) => {
    navigate(`/devices/device-details/${id}`);
  };

  return (
    <div className="w-full text-sm  rounded-sm">
      <table className="w-full bg-white ">
        <thead className=" bg-slate-100 sticky top-0 h-[40px]">
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
            <tr className="border border-slate-200">
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
    </div>
  );
}

export default RolesAndPermissionTable;
