import React, { useEffect, useState } from "react";
import StaffIssueForm from "../../components/staffForms/StaffIssueForm";
import { useParams } from "react-router-dom";
import StudentAOD from "../../components/student AOD/StudentAOD";

function FormPage() {
  const [userType, setUserType] = useState("");
  const params = useParams();

  const { userId, deviceId } = params;

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
    <div className="w-screen h-svh flex itborder border-red-500 col-span-6 bg-white  px-10 overflow-y-scroll" id="print-file">
      {userType && userType !== "Staff" ? (
        <StudentAOD handleOnPrint={() => {}} deviceId={deviceId} student_no={userId} />
      ) : (
        <StaffIssueForm handleOnPrint={() => {}} deviceId={deviceId} staff_no={userId} />
      )}
    </div>
  );
}

export default FormPage;
