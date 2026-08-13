import React, { useEffect, useState } from "react";
import QrCodeCard from "../cards/qrCodeCard/QrCodeCard";
import PrintButton from "../buttons/printButton/PrintButton";
import { handleTimeStampToText } from "../../utils/dateConverter";
import { repairStatusList } from "../../utils/deviceRepairsHelper";
import { handleOnPrint } from "../../utils/handleOnPrint";
import { getStudentDetails } from "../../services/api/students/Students.Api";
import { getStaffDetails } from "../../services/api/staff/Staff.Api";

function RepairForm({ repairDetails }) {
  const [userData, setUserData] = useState("");

  //Get Staff data
  const getUserData = (userId) => {
    if (userId?.toString().length > 5) {
      getStudentDetails(userId, setUserData);
    } else {
      getStaffDetails(userId, setUserData);
    }
  };

  useEffect(() => {
    getUserData(repairDetails?.current_user_id);
  }, [repairDetails]);

  return (
    <div className="printable p-2 h-full gap-5">
      <div class="page-header ">
        <img src="/SPU-logo-1024x1024.jpg" alt="spu logo" class="page-logo" />
        <div class="page-address">
          <span class="address-heading">SOL PLAATJE UNIVERSITY</span>
          <span class="address-text">Private Bag X 5008, Kimberly, 8300</span>
          <span class="address-text">Luka Jantjie House, Chapel Street,</span>
          <span class="address-text">Kimberly</span>
          <span class="address-text">Tel: 053 491 0000</span>
          <span class="address-text">
            <a href="http://spu.ac.za">www.spu.ac.za</a>
          </span>
        </div>
      </div>
      {/** */}
      <div className="flex flex-col gap-5 p-1 ">
        <div className="w-full rounded-sm bg-red-600 text-white print:[print-color-adjust:exact]">
          <div className="flex items-center justify-center  p-2 ">
            <span className="font-bold text-xl">LAPTOP REPAIR INTAKE FORM</span>
          </div>
        </div>
        {/** */}
        <div className="w-full grid-cols-2 shadow-md rounded-md">
          <div className="w-full flex items-center p-1 bg-red-600 text-white print:[print-color-adjust:exact]">
            <span className="font-semibold">REPAIR INFORMATION - {repairDetails?.repair_code}</span>
          </div>
          <div className="w-full flex flex-col justify-between">
            <div className=" flex flex-col p-1">
              <span className="font-semibold">Date Recieved:</span>
              <span className="">
                {" "}
                {(() => {
                  return handleTimeStampToText(repairDetails?.date_created);
                })()}
              </span>
            </div>
            <div className=" flex flex-col gap-2 p-1">
              <span className="font-semibold">Current Status:</span>
              <div className="grid grid-cols-5 items-center ">
                {repairStatusList.map((status, index) => (
                  <div className="flex items-center gap-1">
                    <input type="checkbox" name="status" id="" readOnly checked={repairDetails?.status_name === status.name ? true : false} />
                    <label htmlFor="">{status.name}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/** */}
        <div className=" grid grid-cols-12 gap-5 ">
          <div className="col-span-5 shadow-md rounded-md">
            <div className="w-full flex items-center p-1 bg-red-600 text-white print:[print-color-adjust:exact]">
              <span>DEVICE INFORMATION</span>
            </div>
            <div className="w-full flex justify-between ">
              <div className=" flex flex-col p-1">
                <span className="font-semibold">Asset Tag:</span>
                <span className="font-semibold">Make:</span>
                <span className="font-semibold">Model:</span>
                <span className="font-semibold">Serial Number:</span>
                <span className="font-semibold">Device Type:</span>
                <span className="font-semibold">Warranty Expiry:</span>
              </div>

              <div className=" flex flex-col p-1">
                <span>{repairDetails?.asset_tag}</span>
                <span>{repairDetails?.make}</span>
                <span>{repairDetails?.model}</span>
                <span>{repairDetails?.serial_no}</span>
                <span>{repairDetails?.category}</span>
                <span>
                  {(() => {
                    return handleTimeStampToText(repairDetails?.warranty_end_date);
                  })()}
                </span>
              </div>
            </div>
          </div>
          {/** */}
          <div className="col-span-7 shadow-md rounded-md">
            <div className="w-full flex items-center p-1 bg-red-600 text-white print:[print-color-adjust:exact]">
              <span>USER INFORMATION</span>
            </div>
            <div className="w-full flex justify-between">
              <div className=" flex flex-col p-1">
                <span className="font-semibold">Name:</span>
                <span className="font-semibold">Staff /Student No.:</span>
                <span className="font-semibold">Department /Faculty:</span>
                <span className="font-semibold">Email Adress:</span>
                <span className="font-semibold">Telephone / Phone No.:</span>
              </div>

              <div className=" flex flex-col p-1">
                <span>{`${userData?.name} ${userData?.surname}`}</span>
                <span>{userData?.student_number || userData?.staff_no}</span>
                <span>{userData?.faculty_name || userData?.department_name}</span>
                <span>{userData?.email}</span>
                <span>{userData?.phone_number}</span>
              </div>
            </div>
          </div>
        </div>

        {/** */}
        <div className="w-full grid-cols-2 shadow-md rounded-md">
          <div className="w-full flex items-center p-1 bg-red-600 text-white print:[print-color-adjust:exact]">
            <span>TECHNICAL DIAGNOSIS</span>
          </div>
          <div className="w-full flex ">
            <div className="w-10/12 flex flex-col p-1 ">
              <span className="font-semibold">Repair Type:</span>
              <span className="">{repairDetails?.repair_type}</span>
              <span className="font-semibold">Initial Diagnosis:</span>
              <span className="">{repairDetails?.description}</span>
            </div>
            <div className="w-5/12 flex items-center">
              <QrCodeCard title={"Scan QR Code to view repair"} text={`http://192.168.8.4:5173/repairs/repair-details/${repairDetails?.id}}`} size={90} />
            </div>
          </div>
        </div>

        {/** */}

        <div className="w-full grid-cols-2 shadow-md rounded-md">
          <div className="w-full flex items-center p-1 bg-red-600 text-white print:[print-color-adjust:exact]">
            <span>REPAIR OUTCOME</span>
          </div>
          <div className="w-full flex justify-between">
            <div className=" flex flex-col p-1">
              <span className="font-semibold">Date Repaired:</span>
              <span className="">18 / 07 / 2026</span>
              <span className="font-semibold">Comments:</span>
              <span className="">{repairDetails?.notes}</span>
            </div>
          </div>
        </div>

        {/** */}
        <div className="w-full flex  gap-3">
          {/** */}

          <div className="w-6/12 shadow-md rounded-md">
            <div className="w-full flex items-center p-1 bg-red-600 text-white print:[print-color-adjust:exact]">
              <span>USER COLLECTION</span>
            </div>
            <div className=" flex flex-col justify-between">
              <div className=" flex flex-col p-1">
                <span className="">I confirm that i have recieved the above device and that it has been returned to me in satisfactory condition.</span>

                <div className="w-full flex justify-between">
                  <div className=" flex flex-col p-1 relative">
                    <span className="font-semibold">Name:</span>
                    <span className="font-semibold">Siganture:</span>
                    <span className="w-[100px]  font-semibold absolute bottom-0">Date Collected:</span>
                  </div>
                  {repairDetails?.status_name === "Completed" ? (
                    <div className=" flex flex-col p-1">
                      <span>{`${userData?.name} ${userData?.surname}`}</span>
                      <div>
                        <img alt="signature" src={userData?.image_base64} className="w-[180px] " />
                      </div>
                      <span>19 / 07 /2026</span>
                    </div>
                  ) : (
                    <div className=" flex flex-col p-1">
                      <span>____________________________</span>
                      <div>
                        <span>____________________________</span>
                      </div>
                      <span>________/________/________</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/** */}
          <div className="w-6/12  shadow-md rounded-md">
            <div className="w-full flex items-center p-1 bg-red-600 text-white print:[print-color-adjust:exact] ">
              <span>ICT USE ONLY</span>
            </div>
            <div className="w-full flex justify-between">
              <div className=" flex flex-col p-1">
                <span className="font-semibold">Assigned Technician:</span>
              </div>
              <div className=" flex flex-col p-1">
                <span>{repairDetails?.technican_name}</span>
              </div>
            </div>
            <div className="w-full flex justify-between">
              <div className=" flex flex-col p-1">
                <span className="font-semibold">Repair Closed By:</span>
                <span className="font-semibold">Date Closed:</span>
              </div>
              {repairDetails?.status_name === "Completed" ? (
                <div className=" flex flex-col p-1">
                  <span>kgosiyagae.motabogi</span>
                  <span>19 / 07 /2026</span>
                </div>
              ) : (
                <div className=" flex flex-col p-1">
                  <div>
                    <span>____________________________</span>
                  </div>
                  <span>________/________/________</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/** */}
      <div className="w-full bg-white flex justify-end  p-3  border fixed bottom-0 left-0 gap-3 z-10 noprint">
        <PrintButton
          text={"Print"}
          onClick={() => {
            handleOnPrint();
          }}
        />
      </div>
    </div>
  );
}

export default RepairForm;
