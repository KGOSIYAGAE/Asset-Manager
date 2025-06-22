import React, { useEffect, useState } from "react";
import { getMonthName, getTodayFullDate } from "../../utils/helperMethods";
import { getLoggedInUser } from "../../utils/getLoggedInUser";
import { getStaffDetails } from "../../services/api/staff/Staff.Api";
import { useNavigate } from "react-router-dom";
import SecondScreen from "../../pages/secondScreen/SecondScreen";
import { getAllDeviceDetails } from "../../services/api/devices/Device.Api";
import Modal from "react-modal";
import SiganturePad from "../cards/signaturePad/SiganturePad";
import SubmitButton from "../buttons/SubmitButton";

function StaffIssueForm({ handleOnPrint, deviceId, staff_no }) {
  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [day, setDay] = useState();
  const [loggedInUser, setLoggedInUser] = useState();
  const [staffData, setStaffData] = useState();
  const [deviceDetails, setDeviceDetails] = useState();
  const [openModal, setOpenModal] = useState({ isShown: false, type: null, data: null });

  const navigate = useNavigate();

  //Get Staff data
  const getStaffData = () => {
    if (staff_no) {
      getStaffDetails(staff_no, setStaffData);
    }
  };

  //Get device data based on device id
  const setDetails = (deviceData) => {
    setDeviceDetails(...deviceData);
  };

  const getDeviceDetails = () => {
    if (!deviceId) {
      return console.log("Selected device id not provided");
    }
    getAllDeviceDetails(deviceId, setDetails);
  };

  useEffect(() => {
    const { year, month, day } = getTodayFullDate();
    setYear(year);
    setDay(day);
    setMonth(getMonthName(month));
    setLoggedInUser(getLoggedInUser());
    getStaffData();
    getDeviceDetails();

    //handleOnPrint();
  }, []);

  return (
    <div className="printable ">
      <div className="w-full flex justify-center">
        <img src="\public\SPU-logo-1024x1024.jpg" alt="spu logo" className="page-logo" />
      </div>
      <div className="w-full flex flex-col gap-5 p-2">
        {/**/}
        <div className="w-full bg-slate-100 flex flex-col justify-center items-center border border-black">
          <span className="text-base font-bold">STAFF LAPTOP ISSUE FORM</span>
          <span className="font-bold">SOL PLAATJE UNIVERSITY</span>
        </div>
        {/**/}
        <div className="w-full grid grid-cols-2 grid-rows-6 border border-black">
          <div className=" flex col-span-2 black-b-border ">
            <div className="w-1/2 text-sm font-semibold col-span-1  black-r-border p-2">TICKET NO</div>
            <div className="w-1/2 text-sm col-span-1 p-2">{}</div>
          </div>
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
        </div>
        {/**/}
        {/**/}
        <div className="bg-slate-100 flex flex-col justify-center items-center border border-black">
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
          <div className="flex col-span-2  black-t-border ">
            <div className="w-1/2 text-sm h-[100px] font-semibold col-span-1  black-r-border p-2">STAFF SIGNATURE</div>
            <div className="w-1/2  col-span-1 flex  items-center justify-center p-2">
              <SubmitButton
                text={"Add signature"}
                onClick={() => {
                  setOpenModal({ isShown: true, type: null, data: "hello" });
                }}
              />
            </div>
          </div>
        </div>
        {/**/}
        {/**/}
        <div className="bg-slate-100 flex flex-col justify-center items-center border border-black">
          <span className="text-base font-bold">FOR OFFICE USE</span>
        </div>
        {/**/}
        <div className="grid grid-cols-2 grid-rows-4 border border-black">
          <div className="flex col-span-2 black-b-border ">
            <div className="w-1/2 text-sm font-semibold col-span-1  black-r-border p-2">ICT STAFF NAME & SURNAME</div>
            <div className="w-1/2  text-sm col-span-1 p-2">{loggedInUser?.fullName}</div>
          </div>
          <div className="flex col-span-2">
            <div className="w-1/2 text-sm font-semibold col-span-1  p-2">STAFF SIGNATURE</div>
            <div className="w-1/2  col-span-1 flex  items-center justify-center p-2">{""}</div>
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
          lable={"User Signature"}
          onClose={() => {
            setOpenModal({ isShown: false });
          }}
        />
      </Modal>
    </div>
  );
}

export default StaffIssueForm;
