import React, { useEffect, useState } from "react";
import SiganturePad from "../signaturePad/SiganturePad";
import { getStaffDetails } from "../../../services/api/staff/Staff.Api";
import { getTodayDate } from "../../../utils/helperMethods";
import { getAllDeviceDetails } from "../../../services/api/devices/Device.Api";
import { getStudentDetails } from "../../../services/api/students/Students.Api";
import { getDisclaimerTemplate } from "../../../services/api/desclaimerTemplates/desclaimerTemplates.Api";
import { HandleSetDocumentTemplate } from "../../../utils/HandleSetDocumentTemplate";

function LoanIssueVirificationCard({ deviceId, userId, returnDate }) {
  const [staffData, setStaffData] = useState();
  const [userData, setUserData] = useState();
  const [deviceDetails, setDeviceDetails] = useState([]);
  const [userType, setUserType] = useState();

  const [disclaimerTemplate, setDisclaimerTemplates] = useState();
  const [htmlContent, setHtmlContent] = useState();

  const getUserData = () => {
    if (userId.toString().length > 5) {
      getStudentDetails(userId, setUserData);

      setUserType("student");
    } else {
      getStaffDetails(userId, setUserData);
      setUserType("staff");
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

    const data = { name: "loan-disclaimer" };
    getDisclaimerTemplate(data, setDisclaimerTemplates);
  }, [userId]);

  useEffect(() => {
    const data = { return_date: returnDate };
    HandleSetDocumentTemplate(disclaimerTemplate, userData, deviceDetails, data, setHtmlContent);
  }, [disclaimerTemplate, userData, deviceDetails]);

  return (
    <div className="flex flex-col ">
      <div
        dangerouslySetInnerHTML={{
          __html: htmlContent && htmlContent,
        }}
      />

      <SiganturePad lablel={"Borrower Signature"} user_id={userId} userDetails={userData} deviceDetails={deviceDetails} returnDate={returnDate} formType={"loan-issue"} />
    </div>
  );
}

export default LoanIssueVirificationCard;

/**
   <div className="flex flex-col gap-10 items-center">
      <img src="\SPU-logo-1024x1024.jpg" alt="spu logo" className="page-logo-staff" />

      <div className="flex flex-col gap-5">
        <span>
          <b>Instructions:</b> This form must be completed by any staff member or registered student receiving a temporary loan device for short-term or situational use.
        </span>
        <div className="flex flex-col gap-2">
          <span>1. Borrower and Device Information</span>
          <span className="font-bold">
            Borrower Full Name: {userData?.name} {userData?.surname}
          </span>
         
          <span className="font-bold">Staff / Student Number: {userData?.staff_no || userData?.student_number}</span>
          <span className="font-bold">Contact Email and Phone: {userData?.phone_number}</span>
          <span className="font-bold">
            Device Model and Serial Number: {deviceDetails[0]?.make} {deviceDetails[0]?.model} - {deviceDetails[0]?.serial_no}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span>2. Terms and Conditions</span>

          <span>
            I hereby acknowledge that the device I am collecting is a temporary loan asset and remains the sole property of the University. By taking possession of this loan asset, I explicitly agree
            to the following terms:
          </span>
          <div className=" ml-10">
            <ol className="list-disc">
              <li>Authorised Use: I will use this device responsibly and exclusively for academic or official university purposes.</li>
              <li>Security and Care: I will always keep the device secure and take all reasonable precautions to prevent damage, loss, or unauthorized access.</li>
              <li>Incident Reporting: Any instance of loss, theft, or operational damage must be reported to the ICT Support Desk immediately.</li>
              <li>Liability: I understand that I may be held financially liable for any loss or damage to the device resulting from negligence, improper care, or breach of university policies.</li>
              <li>
                Strict Return Timeline: I agree to return the device in good physical and functional condition on or before the specified return date. Failure to return the device on time may result
                in academic blocks or disciplinary action.
              </li>
            </ol>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span>3. Loan Period and Sign-off</span>
          <span>By signing below, I accept and agree to follow these terms and conditions for the duration of the loan period.</span>
          <span className="font-bold">Collection Date: {getTodayDate()}</span>
          <span className="font-bold">Mandatory Return Date: {returnDate}</span>
        </div>
        <SiganturePad lablel={"Borrower Signature"} user_id={userId} userDetails={userData} deviceDetails={deviceDetails} returnDate={returnDate} setShowToast={setShowToast} formType={"loan-issue"} />
      </div>
    </div>
 */
