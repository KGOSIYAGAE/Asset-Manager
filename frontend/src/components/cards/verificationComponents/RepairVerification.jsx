import React, { useEffect, useState } from "react";
import { BsFillBriefcaseFill, BsLaptop } from "react-icons/bs";
import { FaTriangleExclamation } from "react-icons/fa6";
import SiganturePad from "../signaturePad/SiganturePad";
import { useParams } from "react-router-dom";
import { getAllDeviceDetails } from "../../../services/api/devices/Device.Api";
import UserCaptureSignature from "../signaturePad/UserCaptureSignature";
import RepairDesclaimerSignaturePad from "../signaturePad/repairDesclaimerSignaturePad";

function RepairVerification() {
  const params = useParams();
  const { deviceId, sessionId } = params;
  const [deviceDetails, setDeviceDetails] = useState();
  const [customerConsent, setCustomerConsent] = useState(false);
  const [osReinstallConsent, setOsReinstallConsent] = useState(false);

  const getDeviceDetails = () => {
    if (!deviceId) {
      return console.log("Selected device id not provided");
    }

    getAllDeviceDetails(deviceId, setDeviceDetails);
  };

  const toggleUserConsent = () => {
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
    <div className="w-full flex flex-col gap-5">
      <div>
        <span>
          Disclaimer & Consent for <b>{deviceDetails && deviceDetails[0]?.full_name}</b>
        </span>
      </div>
      {/** */}
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
          {/** */}
          <div className="w-full flex  border-b-2 gap-3">
            <div className="flex flex-col pb-5">
              <p>
                An ICT Support Representative may contact me for further information or request me to bring the laptop to ICT for repairs to begin on the device.
                <br /> Contacted by email or call, I will respond promptly to help avoid delays in service or case clousre.
              </p>
            </div>
          </div>
          {/** */}
          <div className="w-full flex  border-b-2 gap-3">
            <div className="flex flex-col pb-5">
              <p>I understand that sharing photos or configuration details may help expedite my service request.</p>
            </div>
          </div>
          {/** */}
          <div className="w-full flex   gap-3">
            <p>Your availabilty is requested only to support scheduling if an onsite visit is required. It will not be used for frequent contact.</p>
          </div>
          {/** */}
          <div className="w-full flex  border-b-2 gap-3">
            <div className="flex flex-col pb-5">
              <span className="text-red-600 font-semibold">* This consent must be accepted to proceed.</span>
            </div>
          </div>
        </div>
      </div>

      {/** */}
      <div className=" border rounded-md shadow-md ">
        <div className=" flex items-center justify-between bg-red-600 text-white font-semibold rounded-t-md p-3">
          <div className="flex gap-2">
            <BsLaptop size={25} />
            <span>OS Reinstallation Consent (PC Devices)</span>
          </div>
        </div>
        <div className="flex flex-col   p-5 gap-5">
          {/** */}
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
          {/** */}
          <div className="w-full flex  border-b-2 gap-3">
            <div className="flex flex-col pb-5">
              <span className="text-red-600 font-semibold">* Selection is required before proceeding.</span>
            </div>
          </div>
        </div>
      </div>
      {/** */}
      {customerConsent && osReinstallConsent ? <RepairDesclaimerSignaturePad lablel={"Signature"} user_id={deviceDetails && deviceDetails[0]?.current_user_id} /> : ""}
    </div>
  );
}

export default RepairVerification;
