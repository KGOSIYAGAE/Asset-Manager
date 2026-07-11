import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleTimeStamp, handleTimeStampToText } from "../../utils/dateConverter";
import { getRequiresApprovalDevices } from "../../utils/devicesHelperMethods";
import SearchInput from "../inputs/searchInput/SearchInput";
import { useSearchContext } from "../../hooks/useSearchContext";
import { MdGavel } from "react-icons/md";
import TablePagation from "../cards/tablePagation/TablePagation";

function DeviceMaintenanceRepairs({ repairs, currentPage, setCurrentPage, totalPages, limit }) {
  const navigate = useNavigate();

  const [columnCount, setColumnCount] = useState(8);

  //Handle view more
  const handleViewDevice = (id) => {
    navigate(`/devices/device-details/${id}`);
  };

  return (
    <div className="table-view  h-[400px]">
      <table className="">
        <thead className=" bg-slate-100 sticky top-16 h-[40px] rounded-md">
          <th>
            <span>Maintenance ID</span>
          </th>
          <th>
            <span>Device</span>
          </th>
          <th>
            <span>Serial Number</span>
          </th>
          <th>
            <span>Type</span>
          </th>
          <th>
            <span>Date Logged</span>
          </th>
          <th>
            <span>Status</span>
          </th>
          <th>
            <span>Technician</span>
          </th>

          <th>
            <span>Action</span>
          </th>
        </thead>

        {repairs <= 0 ? (
          <tbody>
            <tr className="">
              <td colSpan={columnCount} style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                <strong>No data available</strong>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody className="">
            {repairs
              ? repairs.map((repairs, count) => (
                  <tr className="hover:bg-slate-50 border h-1 " key={repairs.id}>
                    <td>{repairs.repair_code}</td>
                    <td>{`${repairs.make} ${repairs.model}`}</td>
                    <td>{repairs.serial_no}</td>
                    <td>{repairs.category}</td>
                    <td>
                      {(() => {
                        return handleTimeStampToText(repairs.date_created);
                      })()}
                    </td>
                    <td>
                      <div className="flex justify-between  p-2 item-hover">
                        {repairs?.repair_status === "Available" || repairs?.repair_status === "Returned" ? (
                          <span className="text-sm bg-green-600 border shadow-sm p-1 rounded-md text-white">{repairs?.repair_status}</span>
                        ) : repairs?.repair_status === "Issue Approval required" ? (
                          <span className="text-sm bg-orange-600 border shadow-sm p-1 rounded-md text-white">{repairs?.repair_status}</span>
                        ) : repairs?.repair_status === "Loan Approval required" ? (
                          <span className="text-sm bg-orange-600 border shadow-sm p-1 rounded-md text-white">{repairs?.repair_status}</span>
                        ) : (
                          <span className="text-sm bg-red-600 border shadow-sm p-1 rounded-md text-white">{repairs?.repair_status}</span>
                        )}
                      </div>
                    </td>
                    <td>{repairs.technican_name}</td>

                    {/*
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
                    */}
                  </tr>
                ))
              : ""}
          </tbody>
        )}
      </table>
      <TablePagation currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} limit={limit} />
    </div>
  );
}

export default DeviceMaintenanceRepairs;
