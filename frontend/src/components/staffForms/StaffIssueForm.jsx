import React, { useEffect, useState } from "react";
import { getMonthName, getTodayFullDate } from "../../utils/helperMethods";
import { getLoggedInUser } from "../../utils/getLoggedInUser";
import { getStaffDetails } from "../../services/api/staff/Staff.Api";

function StaffIssueForm({ handleOnPrint, deviceDetails, staff_no }) {
  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [day, setDay] = useState();
  const [loggedInUser, setLoggedInUser] = useState();
  const [staffData, setStaffData] = useState();

  const getData = () => {
    if (staff_no) {
      getStaffDetails(staff_no, setStaffData);
    }
  };

  useEffect(() => {
    const { year, month, day } = getTodayFullDate();
    setYear(year);
    setDay(day);
    setMonth(getMonthName(month));
    setLoggedInUser(getLoggedInUser());
    getData();

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
            <div className="w-1/2 text-sm font-semibold col-span-1  black-r-border p-2">LAPTOP MAKE</div>
            <div className="w-1/2 text-sm col-span-1 p-2">{deviceDetails?.make}</div>
          </div>
          <div className="flex col-span-2 black-b-border ">
            <div className="w-1/2 text-sm font-semibold col-span-1  black-r-border p-2">LAPTOP MODEL</div>
            <div className="w-1/2 text-sm col-span-1 p-2">{deviceDetails?.model}</div>
          </div>
          <div className="flex col-span-2 black-b-border ">
            <div className="w-1/2 text-sm font-semibold col-span-1  black-r-border p-2">LAPTOP SERIAL NO</div>
            <div className="w-1/2 text-sm col-span-1 p-2">{deviceDetails?.serial_no}</div>
          </div>
          <div className="flex col-span-2 black-b-border ">
            <div className="w-1/2 text-sm font-semibold col-span-1  black-r-border p-2">ASSET TAG</div>
            <div className="w-1/2  text-sm col-span-1 p-2">{deviceDetails?.asset_tag}</div>
          </div>
          <div className="flex col-span-2  ">
            <div className="w-1/2 text-sm font-semibold col-span-1  black-r-border p-2">LAPTOP CONDITION</div>
            <div className="w-1/2  text-sm col-span-1 p-2">{deviceDetails?.device_condition}</div>
          </div>
          <div className="flex col-span-2  black-t-border ">
            <div className="w-1/2 text-sm h-[100px] font-semibold col-span-1  black-r-border p-2">STAFF SIGNATURE</div>
            <div className="w-1/2  col-span-1 p-2">{""}</div>
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
            <div className="w-1/2 font-semibold col-span-1 p-2">{""}</div>
          </div>
        </div>
        {/**/}
      </div>
    </div>
  );
}

export default StaffIssueForm;
