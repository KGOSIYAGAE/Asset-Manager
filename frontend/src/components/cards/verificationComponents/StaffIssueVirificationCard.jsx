import React, { useEffect, useState } from "react";
import SiganturePad from "../signaturePad/SiganturePad";
import { getStaffDetails } from "../../../services/api/staff/Staff.Api";
import { getTodayDate } from "../../../utils/helperMethods";
import { getAllDeviceDetails } from "../../../services/api/devices/Device.Api";

function StaffIssueVirificationCard({ deviceId, staff_no }) {
  const [staffData, setStaffData] = useState();
  const [deviceDetails, setDeviceDetails] = useState([]);

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
    <div className=" flex flex-col gap-8 items-center overflow-auto">
      <img src="\SPU-logo-1024x1024.jpg" alt="spu logo" className="page-logo-staff" />
      {/*<div className="flex flex-col gap-8">
        <span className=" font-bold text-2xl">Device Issuance Terms & Acknowledgment</span>

        <span className="text-xl">
          I, <b>{`${staffData?.name} ${staffData?.surname}`}</b>, <b>staff number: {staffData?.staff_no}</b>, hereby acknowledge that the device I am collecting remains the property of the University.
          I agree to use it responsibly for academic or official purposes only, keep it secure, and report any loss, theft, or damage to ICT immediately. I understand that I may be held liable for any
          loss or damage caused by negligence and must return the device in good condition when requested or when my studies or employment end.{" "}
          <b>By signing below, I accept and agree to these terms and conditions.</b>
        </span>
        <div>
          <span className="text-xl">Date: {getTodayDate()}</span>
        </div>
      </div>*/}
      <div className="flex flex-col gap-3">
        <span className="">
          <b>Instructions:</b> This form must be completed by permanent or fixed-term university staff members upon receiving an institutional device for long-term allocation.
        </span>
        <div className="flex flex-col gap-2">
          <span>1. Staff and Device Information</span>
          <span className="font-bold">
            Staff Full Name: {staffData?.name} {staffData?.surname}
          </span>
          <span className="font-bold">Staff Number: {staffData?.staff_no}</span>
          <span className="font-bold">
            Department/Faculty: {staffData?.faculty_name} - {staffData?.department_name}
          </span>
          <span className="font-bold">
            Device Model & Serial Number: {deviceDetails[0]?.make} {deviceDetails[0]?.model} - {deviceDetails[0]?.serial_no}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span>2. Terms and Conditions</span>
          <span>I hereby acknowledge that the device I am collecting remains the sole property of the University. By taking possession of this asset, I explicitly agree to the following terms:</span>
          <div className=" ml-10">
            <ol className="list-disc">
              <li> Authorised Use: I will use this device responsibly and exclusively for academic, research, or official university business purposes.</li>
              <li> Security and Care: I am responsible for maintaining the physical security of the device. I will safeguard it against theft, unauthorised access, and environmental damage.</li>
              <li>Incident Reporting: In the event of loss, theft, or physical damage, I will report the incident to the ICT Support Desk immediately (within 24 hours).</li>
              <li>
                Liability: I understand that I may be held financially liable for the replacement or repair costs of the device if loss or damage is determined to be caused by negligence or misuse.
              </li>
              <li>Asset Return: I agree to return the device in good working condition upon request by the ICT department, termination of employment, or by the designated return date.</li>
            </ol>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          3. Acknowledgement and Sign-off By signing below, I certify that I have read, understood, and accept all the terms and conditions outlined above.
          <span className="font-bold">Collection Date: {getTodayDate()}</span>
          <SiganturePad lablel={"Staff Signature"} user_id={staff_no} userDetails={staffData} deviceDetails={deviceDetails} setShowToast={setShowToast} formType={"staff-issue"} />
        </div>
      </div>
    </div>
  );
}

export default StaffIssueVirificationCard;

/*
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
      <img src="\src\assets\SPU-logo-1024x1024.jpg" alt="spu logo" className="page-logo-staff" />
      <div className="flex flex-col gap-8">
        <span className=" font-bold text-2xl">Device Issuance Terms & Acknowledgment</span>

        <span className="text-xl">
          I, <b>{`${staffData?.name} ${staffData?.surname}`}</b>, <b>staff number: {staffData?.staff_no}</b>, hereby acknowledge that the device I am collecting remains the property of the University.
          I agree to use it responsibly for academic or official purposes only, keep it secure, and report any loss, theft, or damage to ICT immediately. I understand that I may be held liable for any
          loss or damage caused by negligence and must return the device in good condition when requested or when my studies or employment end.{" "}
          <b>By signing below, I accept and agree to these terms and conditions.</b>
        </span>
        <div>
          <span className="text-xl">Date: {getTodayDate()}</span>
        </div>
      </div>
      <SiganturePad lablel={"Staff Signature"} user_id={staff_no} userDetails={staffData} deviceDetails={deviceDetails} setShowToast={setShowToast} />
    </div>
  );
}

export default StaffIssueVerification;
*/
