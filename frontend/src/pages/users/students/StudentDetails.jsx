import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStudentDetails } from "../../../services/api/students/Students.Api";
import { handleTimeStamp, handleTimeStampToText } from "../../../utils/dateConverter";
import ExportExcelButton from "../../../components/buttons/ExportExcelButton";
import { getAllUserDevices } from "../../../services/api/devices/Device.Api";
import { useDeviceContext } from "../../../hooks/useDevicesContext";
import UserDevicesTable from "../../../components/tables/UserDevicesTable";
import { MdEdit } from "react-icons/md";
import { FaRedo } from "react-icons/fa";
import Modal from "react-modal";
import { getUserDeviceHistory } from "../../../services/api/deviceLogs/deviceTransactions";
import OpenSecondScreenButton from "../../../components/buttons/OpenSecondScreenButton/OpenSecondScreenButton";
import UserCaptureSignature from "../../../components/cards/signaturePad/UserCaptureSignature";

function StudentDetails({ path }) {
  const [studentDetails, setStudentDetails] = useState();
  const params = useParams();
  const { devicesState, devicesDispatch } = useDeviceContext();
  const [devicesTransactionHistory, setDevicesTransactionHistory] = useState();
  const [openModal, setOpenModal] = useState({ isShown: false, type: null, data: null });

  const navigate = useNavigate();

  //Handle Edit
  const handleEdit = (student_no) => {
    navigate(`/users/students/edit-student/${student_no}`);
  };

  ///Sets the form with data
  const setFormDetails = (studentData) => {
    setStudentDetails(studentData);
  };

  ///Get User's device history
  const getDeviceTransactionsHistory = (student_no) => {
    if (!student_no) {
      return console.log("Selected student number not provided");
    }

    const data = {
      user_id: student_no,
    };

    getUserDeviceHistory(data, setDevicesTransactionHistory);
  };

  //Get data from the API
  const geDetails = () => {
    const { student_no } = params;

    if (!student_no) {
      console.log("Selected student's student number not provided");
    }

    getAllUserDevices(student_no, devicesDispatch);
    getStudentDetails(student_no, setFormDetails);
    getDeviceTransactionsHistory(student_no);
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
                return handleTimeStampToText(studentDetails?.registration_date);
              })()}
            </span>
          </div>

          <div className="flex flex-col justify-between p-2 ">
            <span className="text-sm">Signature</span>

            {studentDetails?.image_base64 ? (
              <div className="flex flex-col gap-5">
                <div className="w-6/12  rounded-md shadow-md p-2 flex items-center  ">
                  <img alt="signature" src={studentDetails?.image_base64} className="w-[180px] " />
                  <button
                    onClick={() => {
                      {
                        /*setOpenModal({ isShown: true, trimmedDataURL: staffTrimmedDataURL, setTrimmedDataURL: setStaffTrimmedDataURL, user_id: staffData?.staff_no });*/
                        setOpenModal({ isShown: true, type: "release", data: "hello" });
                      }
                    }}
                  ></button>
                </div>
                <div onClick={() => onCanel()}>
                  <OpenSecondScreenButton btnLable={"Update Signature"} userId={studentDetails?.student_number} deviceId={null} setShowToast={null} />
                </div>
              </div>
            ) : (
              <div onClick={() => onCanel()}>
                <OpenSecondScreenButton btnLable={"Capture signature"} userId={studentDetails?.student_number} deviceId={null} setShowToast={null} />
              </div>
            )}
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
        <UserDevicesTable deviceList={devicesState?.deviceList} deviceHistory={devicesTransactionHistory} />
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
        className={`${
          openModal.type === "release" ? "w-[80%] max-h-3/4 bg-white" : openModal.type === "assign" ? "w-[80%] max-h-3/4 bg-white" : "w-[50%] max-h-full bg-white"
        } rounded-md mx-auto mt-14 p-5 overflow-auto`}
      >
        <UserCaptureSignature lablel={"Capture User Signature"} user_id={studentDetails?.student_number} />
      </Modal>
    </div>
  );
}

export default StudentDetails;
