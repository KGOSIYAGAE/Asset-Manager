import React, { useEffect, useState } from "react";
import SiganturePad from "../signaturePad/SiganturePad";
import { getStaffDetails } from "../../../services/api/staff/Staff.Api";
import { getTodayDate } from "../../../utils/helperMethods";
import { getAllDeviceDetails } from "../../../services/api/devices/Device.Api";
import { getStudentDetails } from "../../../services/api/students/Students.Api";

function LoanIssueVirificationCard({ deviceId, userId, returnDate }) {
  const [staffData, setStaffData] = useState();
  const [userData, setUserData] = useState();
  const [deviceDetails, setDeviceDetails] = useState();

  const [showToast, setShowToast] = useState({ isShow: false, type: "", message: null });

  //Get Staff data
  /*const getStaffData = () => {
    if (staff_no) {
      getStaffDetails(staff_no, setStaffData);
    }
  };*/

  const getUserData = () => {
    if (userId.toString().length > 5) {
      getStudentDetails(userId, setUserData);
      console.log("student");
    } else {
      getStaffDetails(userId, setUserData);
      console.log("staff");
    }
  };

  // Get Device Details
  const getDeviceDetails = () => {
    if (!deviceId) {
      return console.log("Selected device id not provided");
    }
    getAllDeviceDetails(deviceId, setDeviceDetails);
  };

  useEffect(() => {
    getUserData();
    getDeviceDetails();
  }, [userId]);

  return (
    <div className="flex flex-col gap-10 ">
      <img src="\SPU-logo-1024x1024.jpg" alt="spu logo" className="page-logo-staff" />
      <div className="flex flex-col gap-8">
        <span className=" font-bold text-2xl">Device Loan Terms & Acknowledgment</span>

        <span className="text-xl">
          I, <b>{`${userData?.name} ${userData?.surname}`}</b>, <b>staff / student number: {userData?.staff_no}</b>, hereby acknowledge that the device I am collecting remains the property of the
          University. I agree to use it responsibly for academic or official purposes only, keep it secure, and report any loss, theft, or damage to ICT immediately. I understand that I may be held
          liable for any loss or damage caused by negligence and must return the device in good condition when requested or until the set return date.{" "}
          <b>By signing below, I accept and agree to these terms and conditions.</b>
        </span>
        <div>
          <span className="text-xl">Date: {getTodayDate()}</span>
        </div>
      </div>
      <SiganturePad lablel={"Staff Signature"} user_id={userId} userDetails={userData} deviceDetails={deviceDetails} returnDate={returnDate} setShowToast={setShowToast} formType={"loan-issue"} />
    </div>
  );
}

export default LoanIssueVirificationCard;
