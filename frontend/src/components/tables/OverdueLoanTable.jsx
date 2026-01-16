import React, { useEffect, useState } from "react";
import { handleTimeStamp } from "../../utils/dateConverter";
import { useNavigate } from "react-router-dom";
import { getLoanedDevicesHelper } from "../../utils/devicesHelperMethods";

function OverdueLoanTable({ devices, label }) {
  const navigate = useNavigate();
  const [loanedDevices, setLoanedDevices] = useState(null);
  const [columnCount, setColumnCount] = useState(8);
  //Handle view more
  const handleViewDevice = (id) => {
    navigate(`/devices/device-details/${id}`);
  };

  useEffect(() => {
    setLoanedDevices(getLoanedDevicesHelper(devices));
  }, [devices]);

  return (
    <div className="w-fulltext-sm  rounded-sm">
      <table className="w-full bg-white ">
        <thead className=" bg-slate-100 sticky top-0 h-[40px]">
          <th>#</th>
          <th>Asset Tag</th>
          <th>Serial Number</th>
          <th>Make</th>
          <th>Model</th>
          <th>User</th>
          <th>Date Issued</th>
          <th>Expected Return Date</th>
          <th>Action</th>
        </thead>
        {loanedDevices <= 0 ? (
          <tbody>
            <tr>
              <td colSpan={columnCount} style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                <strong>No data available</strong>
                <p>Create a new loan.</p>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody className="">
            {loanedDevices
              ? loanedDevices.map((device, count) => (
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
                        return handleTimeStamp(device.date_issued);
                      })()}
                    </td>
                    <td>
                      {(() => {
                        return handleTimeStamp(device.return_date);
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

export default OverdueLoanTable;
