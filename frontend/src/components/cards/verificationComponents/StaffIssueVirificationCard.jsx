import React, { useEffect, useState } from "react";
import SiganturePad from "../signaturePad/SiganturePad";
import { getStaffDetails } from "../../../services/api/staff/Staff.Api";
import { getTodayDate } from "../../../utils/helperMethods";
import { getAllDeviceDetails } from "../../../services/api/devices/Device.Api";
import { getDisclaimerTemplate } from "../../../services/api/desclaimerTemplates/desclaimerTemplates.Api";
import { HandleSetDocumentTemplate } from "../../../utils/HandleSetDocumentTemplate";

function StaffIssueVirificationCard({ deviceId, staff_no }) {
  const [staffData, setStaffData] = useState();
  const [deviceDetails, setDeviceDetails] = useState([]);

  const [disclaimerTemplate, setDisclaimerTemplates] = useState();
  const [htmlContent, setHtmlContent] = useState();

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

    const data = { name: "staff-disclaimer" };
    getDisclaimerTemplate(data, setDisclaimerTemplates);
  }, [staff_no]);

  useEffect(() => {
    const data = null;
    HandleSetDocumentTemplate(disclaimerTemplate, staffData, ...deviceDetails, data, setHtmlContent);
  }, [disclaimerTemplate, staffData, deviceDetails]);

  /*useEffect(() => {
    console.log(htmlContent);
  }, [htmlContent]);*/

  return (
    <div className="flex flex-col ">
      <div className="">
        <div
          dangerouslySetInnerHTML={{
            __html: htmlContent && htmlContent,
          }}
        />
      </div>

      <SiganturePad lablel={"Staff Signature"} user_id={staff_no} userDetails={staffData} deviceDetails={deviceDetails} formType={"staff-issue"} />
    </div>
  );
}

export default StaffIssueVirificationCard;

/*
<div className="flex flex-col gap-8 items-center">
      <img src="\SPU-logo-1024x1024.jpg" alt="spu logo" className="page-logo-staff" />
      <div className="h-fit flex flex-col gap-3 ">
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
        <div className=" flex flex-col gap-2 ">
          3. Acknowledgement and Sign-off By signing below, I certify that I have read, understood, and accept all the terms and conditions outlined above.
          <span className="font-bold">Collection Date: {getTodayDate()}</span>
          <SiganturePad lablel={"Staff Signature"} user_id={staff_no} userDetails={staffData} deviceDetails={deviceDetails} formType={"staff-issue"} />
        </div>
      </div>
    </div>
*/
