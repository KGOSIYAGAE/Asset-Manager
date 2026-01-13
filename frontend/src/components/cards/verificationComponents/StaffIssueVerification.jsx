import React, { useEffect, useState } from "react";
import SiganturePad from "../signaturePad/SiganturePad";
import { getStaffDetails } from "../../../services/api/staff/Staff.Api";
import { getTodayDate } from "../../../utils/helperMethods";
import { getAllDeviceDetails } from "../../../services/api/devices/Device.Api";

function StaffIssueVerification({ deviceId, staff_no }) {
  const [staffData, setStaffData] = useState();
  const [deviceDetails, setDeviceDetails] = useState();

  const [showToast, setShowToast] = useState({ isShow: false, type: "", message: null });

  //Get Staff data
  const getStaffData = () => {
    if (staff_no) {
      getStaffDetails(staff_no, setStaffData);
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
    getStaffData();
    getDeviceDetails();
  }, [staff_no]);

  return (
    <div className="flex flex-col gap-10 ">
      <img src="\public\SPU-logo-1024x1024.jpg" alt="spu logo" className="page-logo-staff" />
      <div className="flex flex-col gap-8">
        <span className=" font-bold text-2xl">Device Issuance Terms & Acknowledgment</span>

        <span>
          I, <b>{`${staffData?.name} ${staffData?.surname}`}</b>, <b>staff number: {staffData?.staff_no}</b>, hereby acknowledge that the device I am collecting remains the property of the University.
          I agree to use it responsibly for academic or official purposes only, keep it secure, and report any loss, theft, or damage to ICT immediately. I understand that I may be held liable for any
          loss or damage caused by negligence and must return the device in good condition when requested or when my studies or employment end.{" "}
          <b>By signing below, I accept and agree to these terms and conditions.</b>
        </span>
        <div>
          <span>Date: {getTodayDate()}</span>
        </div>
      </div>
      <SiganturePad lablel={"Staff Signature"} user_id={staff_no} userDetails={staffData} deviceDetails={deviceDetails} setShowToast={setShowToast} />
    </div>
  );
}

export default StaffIssueVerification;
