import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SubmitButton from "../../buttons/SubmitButton";
import TextArea from "../../inputs/textArea/TextArea";
import { handleRejectDeviceIssueLoan } from "../../../utils/HandleRejectDeviceIssueLoan";

function RejectIssueCard({ deviceUserDetails, onCanel, setShowToast, onSubmit }) {
  const [selectedUser, setSelectedUser] = useState({ id: null, fullName: null, userId: null, userType: null, location: null });

  const params = useParams();
  const [rejectReason, setRejectReason] = useState();

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

        <div className="flex flex-col border-t-2 border-b-2 py-5 gap-5">
          <div className="flex flex-col border border-red-600 p-4 rounded-md">
            <span className="text text-red-600">{`Are you sure you want to reject the assigning or loaning of device serial ${deviceUserDetails?.serial_no} to ${deviceUserDetails?.full_name}? Provide a reason below.`}</span>
          </div>
          <TextArea label={"Rejection Reason"} value={rejectReason} maxLength={1000} setOnChange={setRejectReason} />
        </div>

        <div className="flex justify-end p-3 gap-8">
          <button className="flex  rounded-sm p-3" onClick={onCanel}>
            Cancel
          </button>
          <SubmitButton
            text={"Reject"}
            onClick={() => {
              handleRejectDeviceIssueLoan(deviceUserDetails, rejectReason, params, onSubmit, setShowToast);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default RejectIssueCard;
