import React, { useEffect, useState } from "react";
import ExportExcelButton from "../buttons/ExportExcelButton";
import { handleTimeStamp, handleTimeStampToText } from "../../utils/dateConverter";
import { getAllDeviceLoanDue } from "../../services/api/devices/Device.Api";
import { useDeviceContext } from "../../hooks/useDevicesContext";
import { useNavigate } from "react-router-dom";
import { getDueUpgradeDevicesHelper } from "../../utils/devicesHelperMethods";

function DueUpgradeLaptopsTable({ devices }) {
  const navigate = useNavigate();

  const [columnCount, setColumnCount] = useState(8);
  const [upgradeDevices, setUpgradeDevices] = useState(null);

  //Handle view more
  const handleViewDevice = (id) => {
    navigate(`/devices/device-details/${id}`);
  };

  useEffect(() => {
    setUpgradeDevices(getDueUpgradeDevicesHelper(devices));
  }, [devices]);

  return (
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
          <th>Upgrade Date</th>
          <th>Action</th>
        </thead>
        {upgradeDevices <= 0 ? (
          <tbody>
            <tr className="border border-slate-200">
              <td colSpan={columnCount} style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                <strong>No data available</strong>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody className="">
            {upgradeDevices
              ? upgradeDevices.map((device, count) => (
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
                        return handleTimeStampToText(device.next_upgrade_date);
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
  );
}

export default DueUpgradeLaptopsTable;
