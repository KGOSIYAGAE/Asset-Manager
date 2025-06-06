import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentDetails } from "../../../services/api/students/Students.Api";
import { handleTimeStamp } from "../../../utils/dateConverter";
import ExportExcelButton from "../../../components/buttons/ExportExcelButton";
import { getAllUserDevices } from "../../../services/api/devices/Device.Api";
import { useDeviceContext } from "../../../hooks/useDevicesContext";
import UserDevicesTable from "../../../components/tables/UserDevicesTable";

function StaffDetails({ path }) {
  const [staffDetails, setStaffDetails] = useState();
  const params = useParams();
  const { devicesState, devicesDispatch } = useDeviceContext();

  ///Sets the form with data
  const setFormDetails = (stafftData) => {
    setStaffDetails(stafftData);
  };

  //Get data from the API
  const geDetails = () => {
    const { staff_no } = params;

    if (!staff_no) {
      console.log("Selected student's student number not provided");
    }

    getAllUserDevices(student_no, devicesDispatch);
    getStudentDetails(student_no, setFormDetails);
  };

  useEffect(() => {
    geDetails();
  }, []);

  return (
    <div className="h-svh flex flex-col p-3 gap-3 bg-zinc-50 overflow-y-scroll">
      <span className="text-sm">
        <b>Students /</b> {path}
      </span>
      <div className="grid grid-cols-6 grid-rows-2 gap-5">
        {/*<div className="col-span-3 row-span-1 border p-1 rounded-md shadow-md">
          <span className="heading-text">Student Details</span>
          <div className="flex justify-between bg-zinc-50 p-2 item-hover">
            <span className="text-sm">Name</span>
            <span className="text-sm">{studentDetails?.name}</span>
          </div>
          <div className="flex justify-between  p-2 item-hover">
            <span className="text-sm">Surname</span>
            <span className="text-sm">{studentDetails?.surname}</span>
          </div>
          <div className="flex justify-between bg-zinc-50 p-2 item-hover">
            <span className="text-sm">Student Number</span>
            <span className="text-sm">{studentDetails?.student_number}</span>
          </div>
          <div className="flex justify-between  p-2 item-hover">
            <span className="text-sm">ID Number</span>
            <span className="text-sm">{studentDetails?.id_number}</span>
          </div>
          <div className="flex justify-between bg-zinc-50 p-2 item-hover">
            <span className="text-sm">Email</span>
            <span className="text-sm">{studentDetails?.email}</span>
          </div>
          <div className="flex justify-between  p-2 item-hover">
            <span className="text-sm">Phone Number</span>
            <span className="text-sm">{studentDetails?.phone_number}</span>
          </div>
          <div className="flex justify-between bg-zinc-50 p-2 item-hover">
            <span className="text-sm">Account Status</span>
            {studentDetails?.acc_status === "Active" ? (
              <span className="text-sm bg-green-500 border shadow-sm p-1 rounded-md text-white">{studentDetails?.acc_status}</span>
            ) : (
              <span className="text-sm bg-red-500 border shadow-sm p-1 rounded-md text-white">{studentDetails?.acc_status}</span>
            )}
          </div>
          <div className="flex justify-between p-2 item-hover">
            <span className="text-sm">Faculty</span>
            <span className="text-sm">{`${studentDetails?.faculty_name} - ${studentDetails?.faculty_abbreviation}`}</span>
          </div>
          <div className="flex flex-col justify-between bg-zinc-50 p-2 gap-3 item-hover">
            <span className="text-sm">Course Name</span>
            <span className=" text-sm ">{studentDetails?.course_name}</span>
          </div>
          <div className="flex justify-between p-2 item-hover">
            <span className="text-sm">Course Code</span>
            <span className="text-sm">{studentDetails?.course_code}</span>
          </div>
          <div className="flex justify-between bg-zinc-50 p-2 item-hover">
            <span className="text-sm">Course Duration</span>
            <span className="text-sm">{studentDetails?.course_duration}</span>
          </div>
          <div className="flex justify-between p-2 item-hover">
            <span className="text-sm">Registration Date</span>
            <span className="text-sm">
              {(() => {
                return handleTimeStamp(studentDetails?.registration_date);
              })()}
            </span>
          </div>
        </div>*/}
        {/* 
        <UserDevicesTable deviceList={devicesState?.deviceList} />*/}
      </div>
    </div>
  );
}

export default StaffDetails;
