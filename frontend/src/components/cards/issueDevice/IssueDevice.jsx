import React, { useEffect, useState } from "react";
import SubmitButton from "../../buttons/SubmitButton";
import SearchInput from "../../inputs/searchInput/SearchInput";
import ToastMessage from "../../toastMessage/ToastMessage";
import { TiArrowSortedDown } from "react-icons/ti";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { assignDevice } from "../../../services/api/devices/Device.Api";
import { generateUpgradeDate, getTodayDate, getUserType } from "../../../utils/helperMethods";
import TextInput from "../../inputs/textInput/TextInput";
import OpenFormVerification from "../../../pages/openFormVerification/OpenFormVerification";
import UserSelectInput from "../../inputs/selectInputs/userSelectInput/UserSelectInput";
import { useStaffContext } from "../../../hooks/useStaffContext";
import { useStudentsContext } from "../../../hooks/useStudentsContext";

function IssueDevice({ onCanel, onSubmit, deviceId, setShowToast }) {
  const [showUsers, setShowUsers] = useState({ isShow: false });
  const [selectedUser, setSelectedUser] = useState({ id: null, fullName: null, userId: null, userType: null, location: null }); //Get user type based on userID
  const [userType, setUserType] = useState(null);
  const [supportAdmins, setSupportAdmins] = useState(null);
  const [supportTechnicians, setSupportTechnician] = useState(null);

  const [spuOBO, setSpuOBO] = useState(null);
  const [selectedWitnesses, setSelectedWitnesses] = useState(null);

  const { staffState } = useStaffContext();
  const { studentState } = useStudentsContext();

  const toggleWitnessSelection = (id) => {
    if (selectedWitnesses.includes(id)) {
      setSelectedUser(selectedWitnesses.filter);
    }
  };

  const getSupportAdmins = (staffState) => {
    const admins = [];

    for (let i = 0; i < staffState.staffList.length; i++) {
      if (staffState.staffList[i].userrole === "support_admin") {
        admins.push(staffState.staffList[i]);
      }
    }

    return admins;
  };

  const getSupportTechs = (staffState) => {
    const technicians = [];

    for (let i = 0; i < staffState.staffList.length; i++) {
      if (staffState.staffList[i].userrole === "support_technician") {
        technicians.push(staffState.staffList[i]);
      }
    }

    return technicians;
  };

  useEffect(() => {
    getUserType(selectedUser?.userId, setUserType);
    setSupportAdmins(getSupportAdmins(staffState));
    setSupportTechnician(getSupportTechs(staffState));
  }, [selectedUser]);

  return (
    <div className="">
      <div className="flex flex-col gap-2 -z-50">
        <span className="font-semibold p-2">Assign User</span>

        <UserSelectInput userData={[...staffState?.staffList, ...studentState?.studentsList]} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />

        {/***/}
        {userType && userType === "Student" ? (
          <div className="flex flex-col gap-5">
            <div>
              <span className="w-fit text-zinc-500 bg-white">SPU OBO (Choose 1)</span>
              <div className="flex flex-col">
                {supportAdmins &&
                  supportAdmins.map((admin) => (
                    <div className="flex gap-2" key={admin.id}>
                      <input
                        type="radio"
                        name="AccountStatus"
                        id=""
                        disabled={null}
                        value={"Active"}
                        onChange={(e) => {
                          setSpuOBO(admin);
                          console.log(admin);
                        }}
                      />
                      <span className="text-sm text-zinc-600">{`${admin.name} ${admin.surname}`}</span>
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <span className="w-fit text-zinc-500 bg-white">Witnesses (Choose 2)</span>
              <div className="flex flex-col">
                {supportTechnicians &&
                  supportTechnicians.map((witness) => (
                    <div className="flex gap-2" key={witness.id}>
                      <input
                        type="radio"
                        name="AccountStatus"
                        id=""
                        disabled={null}
                        value={"Active"}
                        onChange={(e) => {
                          setSpuOBO(witness);
                          console.log(witness);
                        }}
                      />
                      <span className="text-sm text-zinc-600">{`${witness.name} ${witness.surname}`}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {/**/}

        <div className="flex justify-end p-3 gap-8">
          <button className="flex  rounded-sm p-3" onClick={onCanel}>
            Cancel
          </button>
          {selectedUser?.fullName ? (
            <div onClick={() => onCanel()}>
              <OpenFormVerification userId={selectedUser?.userId} deviceId={deviceId} setShowToast={setShowToast} />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default IssueDevice;

/*Handle assign device
  const handleAssignDevice = () => {
    if (!selectedUser.fullName) {
      return setShowToast({ isShow: true, type: "error", message: "Please select user." });
    }

    const { id } = params;
    if (!id) {
      return setShowToast({ isShown: true, type: "error", message: "Device Id not provided" });
    }

    const data = {
      fullName: selectedUser.fullName,
      status: "Assigned",
      date_issued: getTodayDate(),
      userId: selectedUser.userId,
      upgradeDate: (() => {
        if (selectedUser.userId.toString().length <= 5) {
          return generateUpgradeDate(getTodayDate());
        }
        return null;
      })(),
    };

    //console.log(data);
    assignDevice(id, data, setShowToast);

    return onSubmit();
  };*/
