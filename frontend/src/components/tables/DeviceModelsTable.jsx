import React, { useEffect, useState } from "react";
import ExportExcelButton from "../buttons/ExportExcelButton";
import { handleTimeStamp, handleTimeStampToText } from "../../utils/dateConverter";
import { getAllDeviceLoanDue } from "../../services/api/devices/Device.Api";
import { useDeviceContext } from "../../hooks/useDevicesContext";
import { useNavigate } from "react-router-dom";
import { getDueUpgradeDevicesHelper } from "../../utils/devicesHelperMethods";
import TablePagation from "../cards/tablePagation/TablePagation";
import { CiViewList } from "react-icons/ci";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { hasPermission } from "../../utils/getLoggedInUser";

function DeviceModelsTable({ models, currentPage, setCurrentPage, totalPages, limit, setOpenModal }) {
  const navigate = useNavigate();

  const [columnCount, setColumnCount] = useState(8);
  const [upgradeDevices, setUpgradeDevices] = useState(null);

  //Handle view more
  const handleViewDevice = (id) => {
    navigate(`/devices/device-details/${id}`);
  };

  useEffect(() => {
    //setUpgradeDevices(getDueUpgradeDevicesHelper(devices));
  }, [models]);

  return (
    <div className="table-view">
      <table className="">
        <thead className=" bg-slate-100 sticky top-0 h-[40px] rounded-md">
          <th>Model ID</th>
          <th>Model Name</th>
          <th>Specification</th>
          <th>Manufacture Name</th>
          <th>Number of Devices</th>
          <th>Status</th>
          <th>Action</th>
        </thead>
        {models?.length <= 0 ? (
          <tbody>
            <tr className="border border-slate-200">
              <td colSpan={columnCount} style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                <strong>No data available</strong>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody className="">
            {models
              ? models.map((model, count) => (
                  <tr className="hover:bg-slate-50" key={model.model_id}>
                    <td>{model.model_id}</td>
                    <td>{model.model_name}</td>
                    <td>{model.specification}</td>
                    <td>{model.manufacturer_name}</td>
                    <td>{model.model_count}</td>
                    <td>{model.is_deleted ? <span className="rounded-md bg-red-500 p-1 text-white">In Active</span> : <span className="rounded-md bg-green-500 p-1 text-white">Active</span>}</td>
                    <td>
                      <div className="flex  gap-2 z-0">
                        {hasPermission("edit") && (
                          <div
                            className="w-[30px] flex items-center justify-center text-blue-500 bg-blue-100 p-1 rounded-md border border-blue-500 cursor-pointer"
                            onClick={() => setOpenModal({ isShown: true, type: "update-model", data: model })}
                          >
                            <MdEdit size={20}></MdEdit>
                          </div>
                        )}

                        {model.is_deleted
                          ? ""
                          : hasPermission("delete") && (
                              <div
                                className="w-[30px] flex items-center justify-center text-red-600 bg-red-100 p-1 rounded-md border border-red-600 cursor-pointer"
                                onClick={() => {
                                  setOpenModal({ isShown: true, type: "delete-model", data: model });
                                }}
                              >
                                <MdDeleteForever size={20}></MdDeleteForever>
                              </div>
                            )}
                      </div>
                    </td>
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

export default DeviceModelsTable;
