import React, { useEffect, useState } from "react";
import ExportExcelButton from "../buttons/ExportExcelButton";
import { handleTimeStamp, handleTimeStampToText } from "../../utils/dateConverter";
import { useDeviceContext } from "../../hooks/useDevicesContext";
import { useNavigate } from "react-router-dom";
import { getDueReturnDevicesHelper } from "../../utils/devicesHelperMethods";

function DueReturnLaptopsTable({ label }) {
  const navigate = useNavigate();
  const [returnDevices, setReturnDevices] = useState(null);
  const [columnCount, setColumnCount] = useState(9);

  const { devicesState } = useDeviceContext();

  //Handle view more
  const handleViewDevice = (id) => {
    navigate(`/devices/device-details/${id}`);
  };

  useEffect(() => {
    //run filter method
    setReturnDevices(getDueReturnDevicesHelper(devicesState?.deviceList));
  }, [devicesState]);
  return (
    <div className="col-span-6  bg-white rounded-md shadow-md overflow-x-scroll">
      <div className="flex items-center justify-between border-b-2 rounded-t-md p-2 sticky top-0 bg-white">
        <span className="heading-text ">{label}</span>
        <ExportExcelButton />
      </div>
      <div className="w-full text-sm  rounded-sm">
        <table className="w-full bg-white ">
          <thead className=" bg-slate-100 sticky top-0 h-[40px]">
            <th>#</th>
            <th>Asset Tag</th>
            <th>Serial Number</th>
            <th>Make</th>
            <th>Model</th>
            <th>User</th>
            <th>Date Issued</th>
            <th>End Date</th>
            <th>Action</th>
          </thead>

          {returnDevices <= 0 ? (
            <tbody>
              <tr>
                <td colSpan={columnCount} style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                  <strong>No data available</strong>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="">
              {returnDevices
                ? returnDevices.map((device, count) => (
                    <tr className="hover:bg-slate-50" key={device.id}>
                      <td>
                        {(() => {
                          return count + 1;
                        })()}
                      </td>
                      <td>{device.asset_tag}</td>
                      <td>{device.serial_no}</td>
                      <td>{device.make}</td>
                      <td>{device.model}</td>
                      <td>{device.user_id}</td>
                      <td>
                        {(() => {
                          return handleTimeStampToText(device.date_issued);
                        })()}
                      </td>
                      <td>
                        {(() => {
                          return handleTimeStampToText(device.return_date);
                        })()}
                      </td>
                      <td>
                        <span
                          className="text-blue-500 hover:text-blue-600 underline cursor-pointer"
                          onClick={() => {
                            handleViewDevice(device.id);
                          }}
                        >
                          View more
                        </span>
                      </td>
                    </tr>
                  ))
                : ""}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default DueReturnLaptopsTable;
