import React, { useEffect, useState } from "react";
import { handleTimeStamp, handleTimeStampToText } from "../../utils/dateConverter";
import { getAllDeviceTransactions, getAllLatestDevicesLogs } from "../../services/api/deviceLogs/DeviceLogs";
import ExportExcelButton from "../buttons/ExportExcelButton";
import { BsEyeFill } from "react-icons/bs";
import { handleOpenForm } from "../../utils/handleOpenForm";
import { MdFileOpen } from "react-icons/md";
import { hasPermission } from "../../utils/getLoggedInUser";

function DeviceLogTable({ deviceDetails, label, deviceTransactions, setOpenModal, setShowToast }) {
  const [columnCount, setColumnCount] = useState(6);

  useEffect(() => {
    //getDeviceTransactions(deviceSerialNo);
  }, []);

  return (
    <div className="col-span-6 flex flex-col h-[450px] bg-white rounded-md shadow-md overflow-auto">
      <div className="flex items-center justify-between  rounded-t-md p-2 sticky top-0 bg-white">
        <span className="heading-text sticky top-0">{label}</span>
        {hasPermission("export") && <ExportExcelButton />}
      </div>
      <div className="w-full text-sm  rounded-sm">
        <table className="w-full bg-white ">
          <thead className=" bg-slate-100 sticky top-11 h-[40px]">
            <tr>
              <th>Transaction Id</th>
              <th>Action</th>
              <th>Transaction Status</th>
              <th>User Full Name</th>
              <th>Date Issued</th>
              <th>Date Approved</th>
              <th>Expected Return Date</th>

              <th>Date Returned</th>
              {hasPermission("print") && <th>View Form</th>}
            </tr>
          </thead>
          {deviceTransactions <= 0 ? (
            <tbody>
              <tr>
                <td colSpan={columnCount} style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                  <strong>No data available</strong>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="">
              {deviceTransactions &&
                deviceTransactions.map((transaction, count) => (
                  <tr key={transaction.id} className="hover:bg-slate-50">
                    <td>{transaction.id}</td>
                    <td>{transaction.action_type}</td>
                    <td>
                      <div className="flex justify-between  p-2 item-hover">
                        {transaction?.status === "Available" || transaction?.status === "Returned" ? (
                          <span className="text-sm bg-green-600 border shadow-sm p-1 rounded-md text-white">{transaction?.status}</span>
                        ) : transaction?.status === "Issue Approval required" ? (
                          <span className="text-sm bg-orange-600 border shadow-sm p-1 rounded-md text-white">{transaction?.status}</span>
                        ) : transaction?.status === "Loan Approval required" ? (
                          <span className="text-sm bg-orange-600 border shadow-sm p-1 rounded-md text-white">{transaction?.status}</span>
                        ) : (
                          <span className="text-sm bg-red-600 border shadow-sm p-1 rounded-md text-white">{transaction?.status}</span>
                        )}
                      </div>
                    </td>
                    <td>{transaction.user_full_name}</td>
                    <td>
                      {(() => {
                        return handleTimeStampToText(transaction.issue_date);
                      })()}
                    </td>

                    <td>
                      {(() => {
                        return handleTimeStampToText(transaction.approve_date);
                      })()}
                    </td>
                    <td>
                      {transaction.expected_return_date
                        ? (() => {
                            return handleTimeStampToText(transaction.expected_return_date);
                          })()
                        : "N/A"}
                    </td>

                    <td>
                      {(() => {
                        return handleTimeStampToText(transaction.return_date);
                      })()}
                    </td>

                    {hasPermission("print") && (
                      <td>
                        {transaction?.status !== "Rejected" && (
                          <div
                            className="flex items-center gap-2 text-slate-500 hover:text-slate-600 cursor-pointer"
                            onClick={() => {
                              handleOpenForm(transaction, setOpenModal, setShowToast);
                              //setOpenModal({ isShown: true, type: "view-more-details", data: device });
                            }}
                          >
                            <MdFileOpen size={20} />

                            <span>Open</span>
                          </div>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default DeviceLogTable;
