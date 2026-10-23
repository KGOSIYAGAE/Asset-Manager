import React, { useEffect, useState } from "react";
import { BsFillBriefcaseFill, BsLaptop } from "react-icons/bs";
import { FaTriangleExclamation } from "react-icons/fa6";
import SiganturePad from "../signaturePad/SiganturePad";
import { useParams } from "react-router-dom";
import { getAllDeviceDetails } from "../../../services/api/devices/Device.Api";
import UserCaptureSignature from "../signaturePad/UserCaptureSignature";
import RepairDesclaimerSignaturePad from "../signaturePad/RepairDesclaimerSignaturePad";
import { getTodayDate } from "../../../utils/helperMethods";

function RepairVerification() {
  const params = useParams();
  const { deviceId, sessionId } = params;
  const [deviceDetails, setDeviceDetails] = useState([]);
  const [customerConsent1, setCustomerConsent1] = useState(false);
  const [customerConsent2, setCustomerConsent2] = useState(false);
  const [customerConsent3, setCustomerConsent3] = useState(false);
  const [customerConsent4, setCustomerConsent4] = useState(false);
  const [customerConsent5, setCustomerConsent5] = useState(false);
  const [customerConsent6, setCustomerConsent6] = useState(false);

  const [osReinstallConsent, setOsReinstallConsent] = useState(false);

  const getDeviceDetails = () => {
    if (!deviceId) {
      return console.log("Selected device id not provided");
    }

    getAllDeviceDetails(deviceId, setDeviceDetails);
  };

  const toggleUserConsent = (customerConsent, setCustomerConsent) => {
    if (customerConsent) {
      setCustomerConsent(false);
    } else {
      setCustomerConsent(true);
    }
  };

  useEffect(() => {
    getDeviceDetails();
  }, []);

  useEffect(() => {
    console.log(deviceDetails);
  }, [deviceDetails]);

  return (
    <div className="flex flex-col items-center gap-2">
      <img src="\SPU-logo-1024x1024.jpg" alt="spu logo" className="page-logo-staff" />
      <span>
        <b>Instructions:</b> This form must be completed and signed by any university customer (staff or student) prior to booking a device with ICT Services for diagnostic assessments, hardware
        repairs, or software troubleshooting.
      </span>
      <div className="flex flex-col gap-2">
        <span>1. Customer Acknowledgement (Required) </span>

        <span>Please review and check the following boxes to authorise service. </span>
        <span>This consent must be fully accepted to proceed with any technical intervention.</span>
        <div className="ml-10">
          <ol className="list-disc">
            <li
              className="flex gap-2"
              onClick={() => {
                toggleUserConsent(customerConsent1, setCustomerConsent1);
              }}
            >
              <input className="mt-[5px]" type="checkbox" name="" id="" checked={customerConsent1 ? true : false} />
              Data Loss Disclaimer: I acknowledge that the ICT department is not responsible under any circumstances for the loss of data, installed applications, software programs, or any
              confidential, personal, or proprietary information stored on the device during the repair process.
            </li>
            <li
              className="flex gap-2"
              onClick={() => {
                toggleUserConsent(customerConsent2, setCustomerConsent2);
              }}
            >
              <input className="mt-[5px]" type="checkbox" name="" id="" checked={customerConsent2 ? true : false} />
              Data Backup Responsibility: I certify that I am solely responsible for backing up all personal files, projects, and critical data prior to submitting this device for service.
            </li>
            <li
              className="flex gap-2"
              onClick={() => {
                toggleUserConsent(customerConsent3, setCustomerConsent3);
              }}
            >
              <input className="mt-[5px]" type="checkbox" name="" id="" checked={customerConsent3 ? true : false} />
              Logistical Communication: I understand that an ICT Support Representative may contact me via email or phone for additional diagnostic information, password verification, or to request
              that I drop off accessories (e.g., power adapters) before repairs can commence.
            </li>
            <li
              className="flex gap-2"
              onClick={() => {
                toggleUserConsent(customerConsent4, setCustomerConsent4);
              }}
            >
              <input className="mt-[5px]" type="checkbox" name="" id="" checked={customerConsent4 ? true : false} />
              Service Continuity: I agree to respond promptly to ICT communications. I understand that delayed responses may result in service extensions, a hold on my ticket, or administrative
              closure of the support case.
            </li>
            <li
              className="flex gap-2"
              onClick={() => {
                toggleUserConsent(customerConsent5, setCustomerConsent5);
              }}
            >
              <input className="mt-[5px]" type="checkbox" name="" id="" checked={customerConsent5 ? true : false} />
              Diagnostic Media: I understand that sharing relevant photos, screenshots, or configuration details about the error may help expedite my technical service request.
            </li>
            <li
              className="flex gap-2"
              onClick={() => {
                toggleUserConsent(customerConsent6, setCustomerConsent6);
              }}
            >
              <input className="mt-[5px]" type="checkbox" name="" id="" checked={customerConsent6 ? true : false} />
              Scheduling Availability: I understand that providing my schedule or availability is requested strictly to facilitate coordination if an onsite technician visit is necessary. ICT will not
              use this information for frequent or unrelated contact.
            </li>
          </ol>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span>2. Operating System (OS) Reinstallation Consent (PC/Mac Devices)</span>
        <span>In many instances, major software corruption, malware infections, or system drive failures require a clean installation of the Operating System to make the machine operational.</span>
        <span>
          <b>Do you consent to the operating system being reinstalled if deemed technically necessary by the technician?</b>
        </span>

        <div className="flex flex-col gap-1">
          <span>(Note: A clean reinstall will wipe all data currently on the primary storage drive.)</span>
          <div
            className="flex gap-2 items-center  "
            onChange={(e) => {
              setOsReinstallConsent(true);
            }}
          >
            <input type="radio" name="consent" id="" />
            <label htmlFor="">YES, I give consent to reinstall the OS if necessary. I have backed up my data.</label>
          </div>
          <div
            className="flex gap-2 items-center "
            onChange={(e) => {
              setOsReinstallConsent(true);
            }}
          >
            <input type="radio" name="consent" id="" />
            <label htmlFor=""> NO,do not reinstall the OS. Contact me if a rebuild is the only viable option.</label>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <span>3. Authorisation Signature</span>
        <span className="font-bold">Customer Full Name: {deviceDetails[0]?.full_name}</span>
        <span className="font-bold">Date: {getTodayDate()}</span>
        <span className="font-bold">Customer Signature: </span>
        {customerConsent1 && customerConsent2 && customerConsent3 && customerConsent4 && customerConsent5 && customerConsent6 && osReinstallConsent ? (
          <RepairDesclaimerSignaturePad lablel={"Customer Signature"} user_id={deviceDetails && deviceDetails[0]?.current_user_id} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default RepairVerification;

{
  /*<div className="w-full flex flex-col gap-5">
      <div>
        <span>
          Disclaimer & Consent for <b>{deviceDetails && deviceDetails[0]?.full_name}</b>
        </span>
      </div>
      {/** *
      <div className=" border rounded-md shadow-md ">
        <div className=" flex items-center justify-between bg-red-600 text-white font-semibold rounded-t-md p-3">
          <div className="flex gap-2">
            <BsFillBriefcaseFill size={25} />
            <span>Consent for All Customers</span>
          </div>
          <span>Required Acknowledgement{}</span>
        </div>
        <div className="flex flex-col items-center justify-center p-5 gap-5">
          <div
            className="w-full flex  border-b-2 gap-3"
            onClick={() => {
              toggleUserConsent();
            }}
          >
            <div>
              <input className="" type="checkbox" name="" id="" checked={customerConsent ? true : false} />
            </div>
            <div className="flex flex-col gap-3 pb-5">
              <p>
                By checking this box, I acknowledge that ICT is not repsonsible for the loss of data, programs,or any confidential, personal, or proprietary information on the device being fixed.
                <br />
              </p>
              <p>I am responsible for backing up my data prior to service.</p>
            </div>
          </div>
          {/** *
          <div className="w-full flex  border-b-2 gap-3">
            <div className="flex flex-col pb-5">
              <p>
                An ICT Support Representative may contact me for further information or request me to bring the laptop to ICT for repairs to begin on the device.
                <br /> Contacted by email or call, I will respond promptly to help avoid delays in service or case clousre.
              </p>
            </div>
          </div>
          {/** *
          <div className="w-full flex  border-b-2 gap-3">
            <div className="flex flex-col pb-5">
              <p>I understand that sharing photos or configuration details may help expedite my service request.</p>
            </div>
          </div>
          {/** *
          <div className="w-full flex   gap-3">
            <p>Your availabilty is requested only to support scheduling if an onsite visit is required. It will not be used for frequent contact.</p>
          </div>
          {/** *
          <div className="w-full flex  border-b-2 gap-3">
            <div className="flex flex-col pb-5">
              <span className="text-red-600 font-semibold">* This consent must be accepted to proceed.</span>
            </div>
          </div>
        </div>
      </div>

      {/** *
      <div className=" border rounded-md shadow-md ">
        <div className=" flex items-center justify-between bg-red-600 text-white font-semibold rounded-t-md p-3">
          <div className="flex gap-2">
            <BsLaptop size={25} />
            <span>OS Reinstallation Consent (PC Devices)</span>
          </div>
        </div>
        <div className="flex flex-col   p-5 gap-5">
          {/** *
          <div className="w-full flex  border-b-2 gap-3">
            <div className="flex flex-col gap-3 pb-5">
              <p>If a repair service is needed, do you consent to the operating system being reinstalled?</p>
            </div>
          </div>

          <form className="flex gap-5">
            <div
              className="flex gap-2 items-center  p-3 "
              onChange={(e) => {
                setOsReinstallConsent(true);
              }}
            >
              <input type="radio" name="consent" id="" />
              <label htmlFor="">Yes</label>
            </div>
            <div className="flex gap-2  items-center p-3" onChange={(e) => setOsReinstallConsent(false)}>
              <input type="radio" name="consent" id="" />
              <label htmlFor="">No</label>
            </div>
          </form>
          {/** *
          <div className="w-full flex  border-b-2 gap-3">
            <div className="flex flex-col pb-5">
              <span className="text-red-600 font-semibold">* Selection is required before proceeding.</span>
            </div>
          </div>
        </div>
      </div>
      {/** *
      {customerConsent && osReinstallConsent ? <RepairDesclaimerSignaturePad lablel={"Signature"} user_id={deviceDetails && deviceDetails[0]?.current_user_id} /> : ""}
    </div>*/
}
