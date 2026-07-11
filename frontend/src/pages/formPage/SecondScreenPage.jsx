import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import StudentIssueVerification from "../../components/cards/verificationComponents/StudentIssueVerification";
import StaffIssueVirificationCard from "../../components/cards/verificationComponents/StaffIssueVirificationCard";
import SiganturePad from "../../components/cards/signaturePad/SiganturePad";
import UserCaptureSignature from "../../components/cards/signaturePad/UserCaptureSignature";
import LoanIssueVirificationCard from "../../components/cards/verificationComponents/LoanIssueVirificationCard";

//import StudentIssueVerification from "../../components/cards/verificationComponents/StudentIssueVerification";
//import StaffIssueVerification from "../../components/cards/verificationComponents/staffIssueVerification";

/*import StaffIssueVerification from "../components/cards/verificationComponents/staffIssueVerification";
import StudentIssueVerification from "../../components/cards/verificationComponents/StudentIssueVerification";*/

function SecondScreenPage() {
  const [userType, setUserType] = useState();
  const params = useParams();

  const { source, userId, deviceId, returnDate } = params;

  const handleOnPrint = () => {
    let printContents = document.getElementById("print-file").innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  //Get user type based on userID
  const getUserType = (staff_student_no) => {
    let userId = staff_student_no?.toString();

    if (userId?.length > 5) {
      return setUserType("Student");
    } else {
      return setUserType("Staff");
    }
  };

  useEffect(() => {
    getUserType(userId);
  }, []);

  return (
    <div className="w-screen flex  p-5 border overflow-auto" id="print-file">
      {userType && userType === "Staff" && source === "issue-verification" ? (
        <StaffIssueVirificationCard deviceId={deviceId} staff_no={userId} />
      ) : userType === "Student" && source === "issue-verification" ? (
        <StudentIssueVerification deviceId={deviceId} student_no={userId} />
      ) : source === "loan-verification" ? (
        <LoanIssueVirificationCard deviceId={deviceId} userId={userId} returnDate={returnDate} />
      ) : (
        <UserCaptureSignature lablel={"Capture User Signature"} user_id={userId} />
      )}
    </div>
  );
}

export default SecondScreenPage;

/*

<div className="w-screen h-svh flex itborder border-red-500 col-span-6 bg-white  px-10 overflow-y-scroll" id="print-file">
 <StudentAOD handleOnPrint={() => {}} deviceId={deviceId} student_no={userId} />
   <StaffIssueForm handleOnPrint={() => {}} deviceId={deviceId} staff_no={userId} />
*/
