import React, { useEffect } from "react";
import { handleTimeStampToText } from "../../../utils/dateConverter";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AddButton from "../../buttons/AddButton";
import SubmitButton from "../../buttons/SubmitButton";
import PrintButton from "../../buttons/printButton/PrintButton";
import { hasPermission } from "../../../utils/getLoggedInUser";

function DeviceTransactionMoreDetailsCard({ deviceDetails }) {
  useEffect(() => {
    console.log(deviceDetails);
  }, []);

  return (
    <div className="bg-white">
      <div className="grid grid-cols-5 grid-rows-1 gap-5">
        <div className="col-span-3 row-span-1 border p-1 rounded-md shadow-md bg-white">
          <span className="heading-text">Device Transaction History</span>
          <div className="flex justify-between  p-2 item-hover">
            <span className="text-sm">Make</span>
            <span className="text-sm">{deviceDetails?.make}</span>
          </div>
          <div className="flex justify-between  p-2 item-hover">
            <span className="text-sm">Model</span>
            <span className="text-sm">{deviceDetails?.model}</span>
          </div>
          <div className="flex justify-between  p-2 item-hover">
            <span className="text-sm">Asset Tag</span>
            <span className="text-sm">{deviceDetails?.asset_tag}</span>
          </div>
          <div className="flex justify-between  p-2 item-hover">
            <span className="text-sm">Serial Number</span>
            <span className="text-sm">{deviceDetails?.serial_no}</span>
          </div>
          <div className="flex justify-between p-2 item-hover">
            <span className="text-sm">Device Condition</span>
            <span className="text-sm">{deviceDetails?.device_condition}</span>
          </div>
          <div className="flex justify-between p-2 item-hover">
            <span className="text-sm">Category</span>
            <span className="text-sm">{deviceDetails?.category}</span>
          </div>
          <div className="flex justify-between p-2 item-hover">
            <span className="text-sm">Action Type</span>
            <span className="text-sm">{deviceDetails?.action_type}</span>
          </div>

          <div className="flex justify-between  p-2 item-hover">
            <span className="text-sm">Status Of Transaction</span>
            {deviceDetails?.status === "Available" || deviceDetails?.status === "Returned" ? (
              <span className="text-sm bg-green-500 border shadow-sm p-1 rounded-md text-white">{deviceDetails?.status}</span>
            ) : deviceDetails?.status === "Issue Approval required" ? (
              <span className="text-sm bg-yellow-500 border shadow-sm p-1 rounded-md text-white">{deviceDetails?.status}</span>
            ) : deviceDetails?.status === "Loan Approval required" ? (
              <span className="text-sm bg-yellow-500 border shadow-sm p-1 rounded-md text-white">{deviceDetails?.status}</span>
            ) : (
              <span className="text-sm bg-red-500 border shadow-sm p-1 rounded-md text-white">{deviceDetails?.status}</span>
            )}
          </div>

          <div className="flex justify-between p-2 item-hover">
            <span className="text-sm">Device Was Issued By</span>
            <span className="text-sm">{deviceDetails?.issued_by}</span>
          </div>
          <div className="flex justify-between p-2 item-hover">
            <span className="text-sm">Date Issued</span>
            <span className="text-sm">
              {(() => {
                return handleTimeStampToText(deviceDetails?.issue_date);
              })() || "None"}
            </span>
          </div>
          <div className="flex justify-between p-2 item-hover">
            <span className="text-sm">Device Was Approved By</span>
            <span className="text-sm">{deviceDetails?.approved_by}</span>
          </div>
          <div className="flex justify-between p-2 item-hover">
            <span className="text-sm">Date Approved</span>
            <span className="text-sm">
              {(() => {
                return handleTimeStampToText(deviceDetails?.approve_date);
              })() || "None"}
            </span>
          </div>
          <div className="flex justify-between p-2 item-hover">
            <span className="text-sm">Device Return Was Captured By</span>
            <span className="text-sm">{deviceDetails?.returned_by}</span>
          </div>
          <div className="flex justify-between p-2 item-hover">
            <span className="text-sm">Date Returned</span>
            <span className="text-sm">
              {(() => {
                return handleTimeStampToText(deviceDetails?.return_date);
              })() || "None"}
            </span>
          </div>
        </div>

        <div className="flex flex-col col-span-2 gap-5">
          <div className="flex flex-col items-center justify-center lg:w-5/5 h-4/5 bg-white border  rounded-md shadow-md">
            <img src={`/${deviceDetails?.model}.png`} alt="" className="h-[250px]" />
          </div>
        </div>
      </div>
      {hasPermission("print") && (
        <div className="flex items-center justify-end gap-2">
          <PrintButton text={"Print Form"} onClick={() => {}} />
        </div>
      )}
    </div>
  );
}

export default DeviceTransactionMoreDetailsCard;
