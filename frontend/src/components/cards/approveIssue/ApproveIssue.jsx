import { handleApproveDevice } from "../../../utils/HandleAssignDevice";
import SubmitButton from "../../buttons/SubmitButton";

function ApproveIssue({ onCanel, deviceUserDetails, setShowToast, onSubmit }) {
  return (
    <div>
      <div className="flex flex-col gap-2 -z-50">
        <span className="font-semibold p-2">{"Approve Device Issuing"}</span>

        <div className="flex flex-col border-t-2 border-b-2 py-5 gap-3">
          <div className="flex flex-col border border-red-400 p-4 rounded-md">
            <span className="text-sm text-red-400">Are you sure you want to approve the assigning of the following device?</span>
          </div>
          <span className="text-sm font-semibold">{`${deviceUserDetails?.serial_no} to ${deviceUserDetails?.full_name}`}</span>
        </div>

        <div className="flex justify-end p-3 gap-8">
          <button className="flex  rounded-sm p-3" onClick={onCanel}>
            Cancel
          </button>
          <SubmitButton
            text={"Approve"}
            onClick={() => {
              handleApproveDevice(deviceUserDetails, setShowToast);
              onCanel();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ApproveIssue;
