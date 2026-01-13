import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStudentDetails } from "../../../services/api/students/Students.Api";
import { handleTimeStamp } from "../../../utils/dateConverter";
import ExportExcelButton from "../../../components/buttons/ExportExcelButton";
import { getAllUserDevices } from "../../../services/api/devices/Device.Api";
import { useDeviceContext } from "../../../hooks/useDevicesContext";
import UserDevicesTable from "../../../components/tables/UserDevicesTable";
import { MdEdit } from "react-icons/md";

function StudentDetails({ path }) {
  const [studentDetails, setStudentDetails] = useState();
  const params = useParams();
  const { devicesState, devicesDispatch } = useDeviceContext();

  const navigate = useNavigate();

  //Handle Edit
  const handleEdit = (student_no) => {
    navigate(`/users/students/edit-student/${student_no}`);
  };

  ///Sets the form with data
  const setFormDetails = (studentData) => {
    setStudentDetails(studentData);
  };

  //Get data from the API
  const geDetails = () => {
    const { student_no } = params;

    if (!student_no) {
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
        <div className="col-span-3 row-span-1 border p-1 rounded-md shadow-md">
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
            <span className="text-sm">{`${studentDetails?.faculty_name}`}</span>
          </div>
          <div className="flex justify-between bg-zinc-50 p-2 gap-3 item-hover">
            <span className="text-sm">Course Name</span>
            <span className=" text-sm ">{studentDetails?.course_name}</span>
          </div>
          <div className="flex justify-between p-2 item-hover">
            <span className="text-sm">Course Code</span>
            <span className="text-sm">{studentDetails?.course_code}</span>
          </div>
          {/*<div className="flex justify-between bg-zinc-50 p-2 item-hover">
            <span className="text-sm">Course Duration</span>
            <span className="text-sm">{studentDetails?.course_duration}</span>
          </div>*/}
          <div className="flex justify-between p-2 item-hover">
            <span className="text-sm">Registration Date</span>
            <span className="text-sm">
              {(() => {
                return handleTimeStamp(studentDetails?.registration_date);
              })()}
            </span>
          </div>
          <div className="w-full flex justify-end p-2 ">
            <div
              className="w-[30px] flex items-center justify-center text-green-400 hover:text-green-500 bg-green-100 p-1 rounded-md border border-green-400 hover:border-green-500 cursor-pointer"
              onClick={() => handleEdit(studentDetails?.student_number)}
            >
              <MdEdit size={20}></MdEdit>
            </div>
          </div>
        </div>
        {/* */}
        <UserDevicesTable deviceList={devicesState?.deviceList} />
      </div>
    </div>
  );
}

export default StudentDetails;
