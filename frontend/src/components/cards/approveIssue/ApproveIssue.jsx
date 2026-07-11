import { handleIssueApproveDevice, handleLoanApproveDevice } from "../../../utils/HandleAssignDevice";
import { handleSendApprovalEmail } from "../../../utils/handleNotificationEmails";
import SubmitButton from "../../buttons/SubmitButton";

function ApproveIssue({ onCanel, deviceUserDetails, setShowToast, onSubmit }) {
  return (
    <div className="bg-white">
      <div className="flex flex-col gap-2 -z-50">
        <span className="font-semibold p-2">{deviceUserDetails.status === "Issue Approval required" ? "Approve Device Issuing" : "Approve Device Loan"}</span>

        <div className="flex flex-col border-t-2 border-b-2 py-5 gap-3">
          <div className="flex flex-col border border-red-600 p-4 rounded-md">
            <span className="text-sm text-red-600">Are you sure you want to approve the {deviceUserDetails.status === "Issue Approval required" ? `assigning` : `loan`} of the following device?</span>
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
              if (deviceUserDetails.status === "Issue Approval required") {
                handleIssueApproveDevice(deviceUserDetails, onSubmit, setShowToast);

                return onCanel();
              }

              if (deviceUserDetails.status === "Loan Approval required") {
                handleLoanApproveDevice(deviceUserDetails, onSubmit, setShowToast);
                handleSendApprovalEmail(deviceUserDetails, onSubmit, setShowToast, "Loan");
                return onCanel();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ApproveIssue;
