import React, { useEffect, useState } from "react";
import ExportExcelButton from "../buttons/ExportExcelButton";
import { handleTimeStamp, handleTimeStampToText } from "../../utils/dateConverter";
import { hasPermission } from "../../utils/getLoggedInUser";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import DeviceTransactionMoreDetailsCard from "../cards/deviceTransactionMoreDetails/DeviceTransactionMoreDetailsCard";
import { BsEyeFill, BsGearFill } from "react-icons/bs";

function UserDevicesTable({ deviceList, deviceHistory }) {
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
    <div className="col-span-6 h-[345px] bg-white rounded-md shadow-md overflow-x-scroll">
      <div className="flex items-center justify-between border-b-2 rounded-t-md p-2 sticky top-0 bg-white">
        <span className="heading-text ">User devices</span>
        {hasPermission("export") && <ExportExcelButton />}
      </div>
      <div className="w-full text-sm  rounded-sm">
        <table className="w-full bg-white ">
          <thead className=" bg-slate-100 sticky top-0 h-[40px]">
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
                          <span className="text-sm bg-green-500 border shadow-sm p-1 rounded-md text-white">{device?.status}</span>
                        ) : device?.status === "Issue Approval required" ? (
                          <span className="text-sm bg-yellow-500 border shadow-sm p-1 rounded-md text-white">{device?.status}</span>
                        ) : device?.status === "Loan Approval required" ? (
                          <span className="text-sm bg-yellow-500 border shadow-sm p-1 rounded-md text-white">{device?.status}</span>
                        ) : (
                          <span className="text-sm bg-red-500 border shadow-sm p-1 rounded-md text-white">{device?.status}</span>
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
                      <div className="flex items-center gap-2 text-blue-500 hover:text-blue-600 cursor-pointer">
                        <BsEyeFill size={20} />

                        <span
                          onClick={() => {
                            //handleViewDevice(device.id);
                            setOpenModal({ isShown: true, type: "view-more-details", data: device });
                          }}
                        >
                          View more
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2 text-blue-500 hover:text-blue-600 cursor-pointer">
                        <BsGearFill size={20} />

                        <span
                          onClick={() => {
                            handleViewDevice(device.id);
                            //setOpenModal({ isShown: true, type: "view-more-details", data: device });
                          }}
                        >
                          Manage
                        </span>
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
