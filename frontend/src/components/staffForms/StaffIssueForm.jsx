import React, { useEffect, useState } from "react";
import { generateUpgradeDate, getMonthName, getTodayDate, getTodayFullDate } from "../../utils/helperMethods";
import { getLoggedInUser } from "../../utils/getLoggedInUser";
import { getStaffDetails, getUser } from "../../services/api/staff/Staff.Api";
import { useNavigate } from "react-router-dom";
import { assignDevice, getAllDeviceDetails } from "../../services/api/devices/Device.Api";
import Modal from "react-modal";
import SiganturePad from "../cards/signaturePad/SiganturePad";
import SubmitButton from "../buttons/SubmitButton";
import { FaRedo } from "react-icons/fa";
import { getUserSignature } from "../../services/api/signature/userSignatures";

function StaffIssueForm({ handleOnPrint, deviceId, staff_no }) {
  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [day, setDay] = useState();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loggedInUserDetails, setLoggedInUserDetails] = useState();
  const [staffData, setStaffData] = useState();
  const [deviceDetails, setDeviceDetails] = useState();
  const [openModal, setOpenModal] = useState({ isShown: false, trimmedDataURL: null, setTrimmedDataURL: null, user_id: null });

  const [ictStaffTrimmedDataURL, setIctStaffTrimmedDataURL] = useState(null);
  const [staffTrimmedDataURL, setStaffTrimmedDataURL] = useState(null);

  const [showToast, setShowToast] = useState({ isShow: false, type: "", message: null });

  const navigate = useNavigate();

  //Get Staff data
  const getStaffData = () => {
    if (staff_no) {
      getStaffDetails(staff_no, setStaffData);
    }
  };

  //Get Logged In User details
  const getLoggedInUserDetails = () => {
    if (loggedInUser?.id) {
      getUser(loggedInUser?.id, setLoggedInUserDetails);
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

  //Handle postMessage
  const postMessage = (name, surname) => {
    if (window.opener) {
      window.opener.postMessage({ type: "form_submitted", payload: `Device issued to ${name} ${surname}` }, window.location.origin);
    }

    window.close();
  };

  //Handle assign device
  const handleAssignDevice = async () => {
    if (!staffData?.name) {
      return setShowToast({ isShow: true, type: "error", message: "Please select user." });
    }

    const data = {
      fullName: `${staffData?.name} ${staffData?.surname}`,
      status: "Assigned",
      date_issued: getTodayDate(),
      userId: staffData.staff_no,
      return_date: (() => {
        if (staffData.contract_type === "Permanent") {
          return null;
        }
        return staffData.end_date;
      })(),
      upgradeDate: (() => {
        if (staffData.staff_no.toString().length <= 5) {
          return generateUpgradeDate(getTodayDate());
        }
        return null;
      })(),
    };

    await assignDevice(deviceDetails?.id, data, setShowToast);

    return postMessage(staffData?.name, staffData?.surname);
  };
  //////////////////////////////////////////////////////

  useEffect(() => {
    const { year, month, day } = getTodayFullDate();
    setYear(year);
    setDay(day);
    setMonth(getMonthName(month));
    setLoggedInUser(getLoggedInUser());
    getStaffData();
    getDeviceDetails();

    //handleOnPrint();
  }, [deviceDetails, staff_no]);

  return (
    <div className="printable ">
      <div className="w-full flex justify-center">
        <img src="\public\SPU-logo-1024x1024.jpg" alt="spu logo" className="page-logo" />
      </div>
      <div className="w-full flex flex-col gap-4 ">
        {/*
        <div className=" flex col-span-2  ">
          <div className="w-1/5 text-sm font-semibold col-span-1 border  border-black p-1">TICKET NO</div>
          <div className="w-1/5 text-sm col-span-1 p-1  border  border-black black-t-border">{""}</div>
        </div>*/}
        <div className="w-full bg-slate-300 flex flex-col justify-center items-center border border-black bg-on-print">
          <span className="text-base font-bold">STAFF DEVICE ISSUE FORM</span>
          <span className="font-bold">SOL PLAATJE UNIVERSITY</span>
        </div>

        {/**/}
        <div className="bg-slate-300 flex flex-col justify-center items-center border border-black bg-on-print">
          <span className="text-base font-bold">DEVICE INFORMATION</span>
        </div>
        {/**/}
        <div className="grid grid-cols-2 grid-rows-6 border border-black">
          <div className=" flex col-span-2 black-b-border ">
            <div className="w-1/2 text-sm font-semibold col-span-1  black-r-border p-2">DATE OF ISSUE</div>
            <div className="w-1/2 text-sm col-span-1 p-2">{`${day} / ${month} / ${year}`}</div>
          </div>
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
          <div className="flex col-span-2  ">
            <div className="w-1/2 text-sm font-semibold col-span-1  black-r-border p-2">DEVICE CONDITION</div>
            <div className="w-1/2  text-sm col-span-1 p-2">{deviceDetails?.device_condition}</div>
          </div>
        </div>
        {/**/}
        {/**/}
        <div className="bg-slate-300 flex flex-col justify-center items-center border border-black bg-on-print">
          <span className="text-base font-bold">STAFF INFORMATION</span>
        </div>
        {/**/}
        {/**/}
        <div className="w-full grid grid-cols-2 grid-rows-5 border border-black">
          <div className="flex col-span-2 black-b-border ">
            <div className="w-1/2 text-sm font-semibold col-span-1  black-r-border p-2">NAME & SURNAME</div>
            <div className="w-1/2 text-sm col-span-1 p-2">{`${staffData?.name} ${staffData?.surname}`}</div>
          </div>
          <div className="flex col-span-2 black-b-border ">
            <div className="w-1/2 text-sm font-semibold col-span-1  black-r-border p-2">STAFF NO</div>
            <div className="w-1/2 text-sm col-span-1 p-2">{staffData?.staff_no}</div>
          </div>
          <div className="flex col-span-2 black-b-border ">
            <div className="w-1/2 text-sm font-semibold col-span-1  black-r-border p-2">DEPARTMENT / FACULTY</div>
            <div className="w-1/2 text-sm col-span-1 p-2">{staffData?.department_name}</div>
          </div>
          <div className="flex col-span-2 black-b-border ">
            <div className="w-1/2 text-sm font-semibold col-span-1  black-r-border p-2">POSITION</div>
            <div className="w-1/2 text-sm col-span-1 p-2">{staffData?.title}</div>
          </div>
          <div className="flex col-span-2  ">
            <div className="w-1/2 text-sm font-semibold col-span-1  black-r-border p-2">CONTACT NUMBER</div>
            <div className="w-1/2 text-sm col-span-1 p-2">{staffData?.phone_number}</div>
          </div>
          <div className="h-[75px] flex col-span-2  black-t-border ">
            <div className="w-1/2 text-sm h-[75px] font-semibold col-span-1  black-r-border p-2">STAFF SIGNATURE</div>
            <div className={`w-1/2  col-span-1 flex  ${staffData?.image_base64 || staffTrimmedDataURL ? "justify-start" : "items-center justify-center  p-2"}`}>
              {staffData?.image_base64 || staffTrimmedDataURL ? (
                <div className="h-[70px] flex justify-between gap-5 ">
                  <div className="flex flex-col items-center ">
                    <img alt="signature" src={staffTrimmedDataURL || staffData?.image_base64} className="w-[180px] " />
                    <span className="date-small-text ">{`${day} / ${month} / ${year}`}</span>
                  </div>
                  <button
                    onClick={() => {
                      setOpenModal({ isShown: true, trimmedDataURL: staffTrimmedDataURL, setTrimmedDataURL: setStaffTrimmedDataURL, user_id: staffData?.staff_no });
                    }}
                  >
                    <div className="bg-slate-100 rounded-md 0 p-1 text-gray-500 border border-gray-500 noprint">
                      <FaRedo className={` hover:rotate-180 transition-all duration-300`} size={12} />
                    </div>
                  </button>
                </div>
              ) : (
                <SubmitButton
                  text={"Add signature"}
                  onClick={() => {
                    setOpenModal({ isShown: true, isShown: true, trimmedDataURL: staffTrimmedDataURL, setTrimmedDataURL: setStaffTrimmedDataURL, user_id: staffData?.staff_no });
                  }}
                />
              )}
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
          <div className="flex col-span-2 black-t-border black-l-border black-r-border">
            <div className="w-1/2 text-sm font-semibold col-span-1  black-r-border p-2">ICT STAFF NAME & SURNAME</div>
            <div className="w-1/2  text-sm col-span-1 p-2">{loggedInUser?.fullName}</div>
          </div>
          <div className="h-[75px] flex col-span-2  border border-black  ">
            <div className="w-1/2 text-sm h-[74px] font-semibold col-span-1  black-r-border p-2">STAFF SIGNATURE</div>
            <div className={`w-1/2  col-span-1 flex  ${ictStaffTrimmedDataURL || loggedInUserDetails?.image_base64 ? "justify-start" : "items-center justify-center  p-2"}`}>
              {loggedInUserDetails?.image_base64 || ictStaffTrimmedDataURL ? (
                <div className="h-[75px] flex justify-between gap-5 ">
                  <div className="flex flex-col items-center justify-center ">
                    <img alt="signature" src={ictStaffTrimmedDataURL || loggedInUserDetails?.image_base64} className="w-[180px] " />
                    <span className="date-small-text ">{`${day} / ${month} / ${year}`}</span>
                  </div>
                  <button
                    onClick={() => {
                      setOpenModal({ isShown: true, isShown: true, trimmedDataURL: ictStaffTrimmedDataURL, setTrimmedDataURL: setIctStaffTrimmedDataURL, user_id: loggedInUserDetails?.staff_no });
                    }}
                  >
                    <div className="bg-slate-100 rounded-md 0 p-1 text-gray-500 border border-gray-500 noprint">
                      <FaRedo className={` hover:rotate-180 transition-all duration-300`} size={12} />
                    </div>
                  </button>
                </div>
              ) : (
                <SubmitButton
                  text={"Add signature"}
                  onClick={() => {
                    setOpenModal({ isShown: true, isShown: true, trimmedDataURL: ictStaffTrimmedDataURL, setTrimmedDataURL: setIctStaffTrimmedDataURL, user_id: loggedInUserDetails?.staff_no });
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/**/}
      </div>
      <Modal
        isOpen={openModal.isShown}
        ariaHideApp={false}
        onRequestClose={() => {
          setOpenModal({ isShown: false });
        }}
        style={{
          overlay: { backgroundColor: "rgb(0,0,0,0.2)" },
        }}
        contentLabel=""
        className="w-[80%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-auto"
      >
        <SiganturePad
          lablel={"Signature"}
          trimmedDataURL={openModal?.trimmedDataURL}
          setTrimmedDataURL={openModal?.setTrimmedDataURL}
          user_id={openModal?.user_id}
          onClose={() => {
            setOpenModal({ isShown: false });
          }}
        />
      </Modal>

      <div className="w-full flex justify-end bg-white p-3  border fixed bottom-0 left-0 gap-3 z-10 noprint">
        {deviceDetails?.status === "Assigned" ? (
          <button
            className="flex justify-center items-center bg-blue-900 text-white p-2 rounded-md"
            onClick={() => {
              handleOnPrint();
            }}
          >
            Print
          </button>
        ) : (
          <button
            className="flex justify-center items-center bg-blue-900 text-white p-2 rounded-md"
            onClick={() => {
              handleAssignDevice();
            }}
          >
            Done
          </button>
        )}
      </div>
      <div className="flex absolute bottom-0 ">
        <img alt="banner" src="/public/page_banner.png" className="w-[800px] h-[50px]" />
      </div>
    </div>
  );
}

export default StaffIssueForm;
