import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { handleReleaseDevice } from "../../../utils/HandleReleaseDevice";
import SubmitButton from "../../buttons/SubmitButton";

function RejectIssueCard({ onCanel, full_name, laptopSerialNo, setShowToast, onSubmit }) {
  const [selectedUser, setSelectedUser] = useState({ id: null, fullName: null, userId: null, userType: null, location: null });

  const params = useParams();

  useEffect(() => {
    setSelectedUser({
      fullName: "IT Stock manager",
      userId: parseInt("10000"),
    });
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-2 -z-50">
        <span className="font-semibold p-2">{"Reject Device Assigning"}</span>

        <div className="flex flex-col border-t-2 border-b-2 py-5 gap-3">
          <div className="flex flex-col border border-red-400 p-4 rounded-md">
            <span className="text-sm text-red-400">Are you sure you want to reject the assigning of the following device?</span>
          </div>
          <span className="text-sm font-semibold">{`${laptopSerialNo} to ${full_name}`}</span>
        </div>

        <div className="flex justify-end p-3 gap-8">
          <button className="flex  rounded-sm p-3" onClick={onCanel}>
            Cancel
          </button>
          <SubmitButton
            text={"Reject"}
            onClick={() => {
              handleReleaseDevice(selectedUser, params, onSubmit, setShowToast);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default RejectIssueCard;
