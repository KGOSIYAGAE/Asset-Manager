import React, { useEffect, useState } from "react";
import SubmitButton from "../../buttons/SubmitButton";
import SearchInput from "../../inputs/searchInput/SearchInput";
import ToastMessage from "../../toastMessage/ToastMessage";
import { TiArrowSortedDown } from "react-icons/ti";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
//import { assignReleaseUser } from "../../../services/api/devices/Device.Api";
import { getTodayDate } from "../../../utils/helperMethods";
import { assignDevice, createLoanDevice, releaseDevice } from "../../../services/api/devices/Device.Api";
import UserSelectInput from "../../inputs/selectInputs/userSelectInput/UserSelectInput";
import DeviceSelectInput from "../../inputs/selectInputs/deviceSelectInput/DeviceSelectInput";
import DateTimePicker from "../../inputs/dateTimePicker/DateTimePicker";
import { rolesList } from "../../../utils/getLoggedInUser";
import TextInput from "../../inputs/textInput/TextInput";
import { assignUserRole } from "../../../services/api/admin/Admin.Api";

function ManageRoles({ onCanel, onSubmit, userData, setShowToast }) {
  const [selectedUser, setSelectedUser] = useState({ id: null, fullName: null, userId: null, userType: null, location: null });
  const [selectedRole, setSelectedRole] = useState(null);
  const [tempPassword, setTempPassword] = useState(null);
  const [userAccessType, setUserAccessType] = useState(null);

  //Handle loan device
  const handleAssignRole = () => {
    if (!selectedUser.fullName) {
      return setShowToast({ isShow: true, type: "error", message: "Please select user." });
    }

    if (!selectedRole) {
      return setShowToast({ isShow: true, type: "error", message: "Please select role." });
    }

    if (!tempPassword) {
      return setShowToast({ isShow: true, type: "error", message: "Please provide temporary password." });
    }

    const data = {
      staffNo: selectedUser.userId,
      userRole: selectedRole,
      tempPassword: tempPassword,
    };

    assignUserRole(data, setShowToast);
    return onSubmit();
  };

  //show user access
  const showUserAccess = (userRole) => {
    if (userRole) {
      for (let i = 0; i < rolesList.length; i++) {
        if (userRole === rolesList[i].name) {
          return setUserAccessType(rolesList[i].can);
        }
      }
    }
    return null;
  };

  useEffect(() => {
    if (userData) {
      //setSearchResultsData(userData);
    }
  }, []);
  return (
    <div>
      <span className="font-semibold p-2">Assign Role</span>

      <div className="flex flex-col  -z-50">
        {/** */}
        <UserSelectInput userData={userData} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        {/** */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col border rounded-md p-2 overflow-auto">
            <select
              className="outline-none"
              disabled={false}
              value={null}
              onChange={(e) => {
                setSelectedRole(e.target.value);
                showUserAccess(e.target.value);
              }}
            >
              x<option>----- Select Role -----</option>
              {rolesList.map((role) => (
                <option key={role.id}>{role.name}</option>
              ))}
            </select>
          </div>
          <div className="col-span-2">
            <TextInput label={"Temporary Password"} value={tempPassword} isDisabled={false} maxLength={30} setOnChange={setTempPassword} />
          </div>
          <span>The user will have the following access:- {userAccessType && userAccessType}</span>
        </div>
      </div>

      {/** */}
      <div className="flex justify-end p-3 gap-8">
        <button className="flex  rounded-sm p-3" onClick={onCanel}>
          Cancel
        </button>
        <SubmitButton text={"Submit"} onClick={handleAssignRole} />
      </div>
    </div>
  );
}

export default ManageRoles;
