import React, { useEffect, useState } from "react";
import ExportExcelButton from "../buttons/ExportExcelButton";
import { handleTimeStamp, handleTimeStampToText } from "../../utils/dateConverter";
import { hasPermission } from "../../utils/getLoggedInUser";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import DeviceTransactionMoreDetailsCard from "../cards/deviceTransactionMoreDetails/DeviceTransactionMoreDetailsCard";
import { BsEyeFill, BsGearFill } from "react-icons/bs";
import SubmitButton from "../buttons/SubmitButton";

function UserDevicesTable({ deviceList, deviceHistory, onAssignDevice }) {
  const [openModal, setOpenModal] = useState({ isShown: false, type: null, data: null });

  const navigate = useNavigate();

  //Handle view more
  const handleViewDevice = (id) => {
    navigate(`/devices/device-details/${id}`);
  };

  useEffect(() => {
    console.log(deviceHistory);
  }, []);
  return (
    <div className="col-span-6 h-[480px] bg-white rounded-md shadow-md overflow-auto ">
      <div className="flex items-center justify-between  rounded-t-md p-2 sticky top-0 bg-white">
        <span className="heading-text sticky top-0 ">User devices</span>
        {hasPermission("export") && (
          <div className="flex gap-5">
            <SubmitButton text={"Assign Device"} onClick={onAssignDevice} />
            <ExportExcelButton />
          </div>
        )}
      </div>
      <div className="w-full text-sm  rounded-sm">
        <table className="w-full bg-white ">
          <thead className=" bg-slate-100 sticky top-11 h-[40px]">
            <th>#</th>
            <th>Asset Tag</th>
            <th>Serial Number</th>
            <th>Make</th>
            <th>Model</th>
            <th>Category</th>
            <th>Action Type</th>
            <th>Status</th>
            <th>Date Issued</th>
            <th>Return date</th>
            <th>More Details</th>
            <th>Manage</th>
          </thead>
          <tbody className="">
            {deviceHistory
              ? deviceHistory.map((device, count) => (
                  <tr key={device.id} className="hover:bg-slate-50">
                    <td>
                      {(() => {
                        return count + 1;
                      })()}
                    </td>
                    <td>{device.asset_tag}</td>
                    <td>{device.serial_no}</td>
                    <td>{device.make}</td>
                    <td>{device.model}</td>
                    <td>{device.category}</td>
                    <td>{device.action_type}</td>

                    <td>
                      <div className="flex justify-between  p-2 item-hover">
                        {device?.status === "Available" || device?.status === "Returned" ? (
                          <span className="text-sm bg-green-600 border shadow-sm p-1 rounded-md text-white">{device?.status}</span>
                        ) : device?.status === "Issue Approval required" ? (
                          <span className="text-sm bg-orange-600 border shadow-sm p-1 rounded-md text-white">{device?.status}</span>
                        ) : device?.status === "Loan Approval required" ? (
                          <span className="text-sm bg-orange-600 border shadow-sm p-1 rounded-md text-white">{device?.status}</span>
                        ) : (
                          <span className="text-sm bg-red-600 border shadow-sm p-1 rounded-md text-white">{device?.status}</span>
                        )}
                      </div>
                    </td>

                    <td>
                      {(() => {
                        return handleTimeStampToText(device.issue_date);
                      })()}
                    </td>
                    <td>
                      {(() => {
                        return handleTimeStampToText(device.return_date);
                      })()}
                    </td>
                    <td>
                      <div
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-600 cursor-pointer"
                        onClick={() => {
                          //handleViewDevice(device.id);
                          setOpenModal({ isShown: true, type: "view-more-details", data: device });
                        }}
                      >
                        <BsEyeFill size={20} />

                        <span>View more</span>
                      </div>
                    </td>
                    <td>
                      <div
                        className="flex items-center gap-2 text-blue-500 hover:text-blue-600 cursor-pointer"
                        onClick={() => {
                          handleViewDevice(device.id);
                          //setOpenModal({ isShown: true, type: "view-more-details", data: device });
                        }}
                      >
                        <BsGearFill size={20} className="hover:rotate-45 duration-300" />

                        <span>Manage</span>
                      </div>
                    </td>
                  </tr>
                ))
              : ""}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={openModal.isShown}
        ariaHideApp={false}
        data={openModal.data}
        onRequestClose={() => {
          setOpenModal({ isShown: false });
        }}
        style={{
          overlay: { backgroundColor: "rgb(0,0,0,0.2)" },
        }}
        contentLabel=""
        className={"w-[80%] h-fit bg-white rounded-md mx-auto mt-14 p-5 overflow-auto"}
      >
        <DeviceTransactionMoreDetailsCard deviceDetails={openModal.data} />
      </Modal>
    </div>
  );
}

export default UserDevicesTable;
