import React, { useEffect, useState } from "react";
import { generateUpgradeDate, getMonthName, getTodayDate, getTodayFullDate } from "../../utils/helperMethods";
import { getLoggedInUser, hasPermission } from "../../utils/getLoggedInUser";
import { getStaffDetails, getUser } from "../../services/api/staff/Staff.Api";
import { useNavigate } from "react-router-dom";
import { assignDevice, getAllDeviceDetails } from "../../services/api/devices/Device.Api";
import Modal from "react-modal";
import SiganturePad from "../cards/signaturePad/SiganturePad";
import SubmitButton from "../buttons/SubmitButton";
import { FaRedo } from "react-icons/fa";
import { getIssureApproverSignature, getUserSignature } from "../../services/api/signature/userSignatures";
import { handleTimeStamp, handleTimeStampToText } from "../../utils/dateConverter";
import { getStudentDetails } from "../../services/api/students/Students.Api";
import PrintButton from "../buttons/printButton/PrintButton";
import StudentAOD from "../student AOD/StudentAOD";

function DeviceReturnForm({ handleOnPrint, deviceId, clickedTransactionData, deviceDetails_ }) {
  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [day, setDay] = useState();

  const [userData, setUserData] = useState();
  const [deviceDetails, setDeviceDetails] = useState();
  const [openModal, setOpenModal] = useState({ isShown: false, trimmedDataURL: null, setTrimmedDataURL: null, user_id: null });

  const [ictStaffTrimmedDataURL, setIctStaffTrimmedDataURL] = useState(null);
  const [staffTrimmedDataURL, setStaffTrimmedDataURL] = useState(null);

  const [issuerReturnerApproverSignatures, setIssuerReturnerApproverSignature] = useState(null);

  const navigate = useNavigate();

  //Get Staff data
  const getUserData = () => {
    if (clickedTransactionData?.user_id.toString().length > 5) {
      getStudentDetails(clickedTransactionData?.user_id, setUserData);
      console.log("student");
    } else {
      getStaffDetails(clickedTransactionData?.user_id, setUserData);
      console.log("staff");
    }
  };

  //Get device data based on device id
  const setDetails = (deviceData) => {
    setDeviceDetails(...deviceData);
    getLoggedInUserDetails();
  };

  const getDeviceDetails = () => {
    if (!deviceId) {
      return console.log("Selected device id not provided");
    }
    getAllDeviceDetails(deviceId, setDetails);
  };

  //Handle Get Issuer & Approver Signature
  const handleSetIssuerApproverSignature = async (deviceDetails) => {
    if (!deviceDetails?.serial_no) {
      console.log("Laptop serial number not found");
    }

    const data = {
      device_serial_number: deviceDetails?.serial_no,
      status: clickedTransactionData?.status,
    };

    return setIssuerReturnerApproverSignature(await getIssureApproverSignature(data));
  };

  useEffect(() => {
    const { year, month, day } = getTodayFullDate();
    setYear(year);
    setDay(day);
    setMonth(getMonthName(month));

    getUserData();
    getDeviceDetails();

    //handleOnPrint();
  }, []);

  useEffect(() => {
    handleSetIssuerApproverSignature(deviceDetails_);
  }, []);

  return (
    <div className="printable">
      <div className="flex flex-col items-center justify-between gap-20">
        <div className="w-full flex justify-center ">
          <img src="/SPU-logo-1024x1024.jpg" alt="spu logo" className="page-logo" />
        </div>
        <div className="w-11/12 flex flex-col gap-4 ">
          {/*
        <div className=" flex col-span-2  ">
          <div className="w-1/5 text-sm font-semibold col-span-1 border  border-black p-1">TICKET NO</div>
          <div className="w-1/5 text-sm col-span-1 p-1  border  border-black black-t-border">{""}</div>
        </div>*/}
          <div className="w-full bg-slate-300 flex flex-col justify-center items-center border border-black bg-on-print">
            <span className="text-base font-bold">DEVICE RETURN FORM</span>
            <span className="font-bold">SOL PLAATJE UNIVERSITY</span>
          </div>

          {/**/}
          <div className="bg-slate-300 flex flex-col justify-center items-center border border-black bg-on-print">
            <span className="text-base font-bold">DEVICE INFORMATION</span>
          </div>
          {/**/}
          <div className="grid grid-cols-2 grid-rows-5 border border-black">
            <div className="flex col-span-2 black-b-border ">
              <div className="w-1/2 text-sm font-semibold col-span-1  black-r-border p-2">DEVICE TYPE</div>
              <div className="w-1/2 text-sm col-span-1 p-2">{deviceDetails?.category}</div>
            </div>
            <div className="flex col-span-2 black-b-border ">
              <div className="w-1/2 text-sm font-semibold col-span-1  black-r-border p-2">DEVICE MAKE</div>
              <div className="w-1/2 text-sm col-span-1 p-2">{deviceDetails?.make}</div>
            </div>
            <div className="flex col-span-2 black-b-border ">
              <div className="w-1/2 text-sm font-semibold col-span-1  black-r-border p-2">DEVICE MODEL</div>
              <div className="w-1/2 text-sm col-span-1 p-2">{deviceDetails?.model}</div>
            </div>
            <div className="flex col-span-2 black-b-border ">
              <div className="w-1/2 text-sm font-semibold col-span-1  black-r-border p-2">DEVICE SERIAL NO</div>
              <div className="w-1/2 text-sm col-span-1 p-2">{deviceDetails?.serial_no}</div>
            </div>
            <div className="flex col-span-2 black-b-border ">
              <div className="w-1/2 text-sm font-semibold col-span-1  black-r-border p-2">ASSET TAG</div>
              <div className="w-1/2  text-sm col-span-1 p-2">{deviceDetails?.asset_tag}</div>
            </div>
          </div>
          {/**/}
          {/**/}
          <div className="bg-slate-300 flex flex-col justify-center items-center border border-black bg-on-print">
            <span className="text-base font-bold">USER INFORMATION</span>
          </div>
          {/**/}
          {/**/}
          <div className="w-full grid grid-cols-2 grid-rows-5 border border-black">
            <div className="flex col-span-2 black-b-border ">
              <div className="w-1/2 text-sm font-semibold col-span-1  black-r-border p-2">NAME & SURNAME</div>
              <div className="w-1/2 text-sm col-span-1 p-2">{`${userData?.name} ${userData?.surname}`}</div>
            </div>
            <div className="flex col-span-2 black-b-border ">
              <div className="w-1/2 text-sm font-semibold col-span-1  black-r-border p-2">STAFF / STUDENT NO</div>
              <div className="w-1/2 text-sm col-span-1 p-2">{userData?.staff_no || userData?.student_number}</div>
            </div>
            <div className="flex col-span-2 black-b-border ">
              <div className="w-1/2 text-sm font-semibold col-span-1  black-r-border p-2">DEPARTMENT / FACULTY</div>
              <div className="w-1/2 text-sm col-span-1 p-2">{userData?.department_name || userData?.faculty_name}</div>
            </div>
            <div className="flex col-span-2 black-b-border ">
              <div className="w-1/2 text-sm font-semibold col-span-1  black-r-border p-2">POSITION / COURSE</div>
              <div className="w-1/2 text-sm col-span-1 p-2">{userData?.position_name || userData?.course_name}</div>
            </div>
            <div className="flex col-span-2  ">
              <div className="w-1/2 text-sm font-semibold col-span-1  black-r-border p-2">CONTACT NUMBER</div>
              <div className="w-1/2 text-sm col-span-1 p-2">{userData?.phone_number}</div>
            </div>
            <div className=" flex col-span-2 black-t-border ">
              <div className="w-1/2 text-sm font-semibold col-span-1  black-r-border p-2">DATE OF RETURN</div>
              <div className="w-1/2 text-sm col-span-1 p-2">{handleTimeStampToText(issuerReturnerApproverSignatures?.return_date)}</div>
            </div>
            <div className="h-[75px] flex col-span-2  black-t-border ">
              <div className="w-1/2 text-sm h-[75px] font-semibold col-span-1  black-r-border p-2">STAFF SIGNATURE</div>
              <div className={`w-1/2  col-span-1 flex items-center justify-center  p-2`}>
                <div className="h-[70px] flex justify-between gap-5 ">
                  <div className="flex flex-col items-center ">
                    <img alt="signature" src={userData?.image_base64} className="w-[180px] " />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/**/}
          {/**/}
          <div className="bg-slate-300 flex flex-col justify-center items-center border border-black bg-on-print">
            <span className="text-base font-bold">FOR OFFICE USE</span>
          </div>
          {/**/}

          <div>
            <div className="flex col-span-2 border border-black">
              <div className="w-1/2 flex flex-col text-sm  col-span-1  black-r-border p-2">
                <span className="font-semibold">RETURNED BY:</span>
                <span>{issuerReturnerApproverSignatures?.returnerFullname}</span>
              </div>
              <div className="flex flex-col items-center justify-center ">
                <img alt="signature" src={issuerReturnerApproverSignatures?.returnerSignature} className="w-[180px] " />
              </div>
            </div>
          </div>

          {/**/}
          <div className="flex bottom-0 ">
            <img alt="banner" src="/page_banner.png" className="w-full h-[50px]" />
          </div>
        </div>
      </div>

      {/*clickedTransactionData?.status && clickedTransactionData?.action_type === "Issue" ? (
        <div className="printable">
          <StudentAOD handleOnPrint={handleOnPrint} deviceId={deviceId} student_no={clickedTransactionData?.user_id} deviceDetails_={deviceDetails} />
        </div>
      ) : (
        "Loan Form"
      )*/}

      {hasPermission("print") && (
        <div className="w-full bg-white flex justify-end  p-3  border fixed bottom-0 left-0 gap-3 z-10 noprint">
          <PrintButton
            text={"Print"}
            onClick={() => {
              handleOnPrint();
            }}
          />
        </div>
      )}
    </div>
  );
}

export default DeviceReturnForm;
