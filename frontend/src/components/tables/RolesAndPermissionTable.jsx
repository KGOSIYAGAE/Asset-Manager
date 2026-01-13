import React, { useEffect, useState } from "react";
import { handleTimeStamp } from "../../utils/dateConverter";
import { useNavigate } from "react-router-dom";
import { getSystemUsers } from "../../utils/helperMethods";

function RolesAndPermissionTable({ users, label }) {
  const navigate = useNavigate();
  const [userAndAdmins, setUsersAndAdmins] = useState(null);

  //Handle view more
  const handleViewDevice = (id) => {
    navigate(`/devices/device-details/${id}`);
  };

  useEffect(() => {
    setUsersAndAdmins(getSystemUsers(users));
  }, [users]);

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
                    <span className="text-blue-500 hover:text-blue-600 underline cursor-pointer" onClick={() => {}}>
                      Update
                    </span>
                  </td>
                </tr>
              ))
            : ""}
        </tbody>
      </table>
    </div>
  );
}

export default RolesAndPermissionTable;
