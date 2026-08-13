import React, { useEffect, useState } from "react";
import { getStaffData } from "../../../services/api/staff/Staff.Api";
import { getAllStudents } from "../../../services/api/students/Students.Api";
import { getAllDevices } from "../../../services/api/devices/Device.Api";
import UserSelectInput from "../../inputs/selectInputs/userSelectInput/UserSelectInput";
import DeviceSelectInput from "../../inputs/selectInputs/deviceSelectInput/DeviceSelectInput";
import DateTimePicker from "../../inputs/dateTimePicker/DateTimePicker";
import { getCurrentDate } from "../../../utils/helperMethods";
import OpenSecondScreenButton from "../../buttons/OpenSecondScreenButton/OpenSecondScreenButton";
import TextInput from "../../inputs/textInput/TextInput";
import TextArea from "../../inputs/textArea/TextArea";
import { handleCreateRepair, handleUpdateRepair, maintenaceTypesList, repairStatusList } from "../../../utils/deviceRepairsHelper";
import SelectInput from "../../inputs/selectInputs/selectInput/SelectInput";
import { getLoggedInUser, hasPermission } from "../../../utils/getLoggedInUser";
import { getAdmins } from "../../../services/api/admin/Admin.Api";
import TechnicianSelectInput from "../../inputs/selectInputs/technicianSelectInput/TechnicianSelectInput";
import SubmitButton from "../../buttons/SubmitButton";
import { useParams } from "react-router-dom";
import { getRepair } from "../../../services/api/repairs/Repairs.Api";
import { MdDevices } from "react-icons/md";
import SendToTablet from "../../buttons/SendToTablet/SendToTablet";
import QrCodeCard from "../qrCodeCard/QrCodeCard";
import CancelButton from "../../buttons/CancelButton";
import { socket } from "../../../utils/socket";
import { FaRegCheckCircle } from "react-icons/fa";

function CreateNewRepair({ onCanel, data, type, onSubmit, setShowToast }) {
  const [selectedUser, setSelectedUser] = useState({ id: null, fullName: null, userId: null, userType: null, location: null });
  const [selectedDevice, setSelectedDevice] = useState({ id: null, make: null, model: null, serial_no: null, asset_tag: null, device_category: null, device_status: null });
  const [startDate, setStartDate] = useState(null);

  const [allDevices, setAllDevices] = useState(null);
  const [allStaff, setAllStaff] = useState(null);
  const [allStudents, setAllStudents] = useState(null);
  const [technicians, setTechnician] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const deviceLimit = 50;
  const userLimit = 50;

  const [technicianName, setTechnicianName] = useState();
  const [technicianId, setTechnicianId] = useState();
  const [repairType, setRepairType] = useState(null);

  const [repairDescription, setRepairDescription] = useState();
  const [repairNotes, setRepairNotes] = useState();
  const [repairStatus, setRepairStatus] = useState("New");

  const [deviceSerialNo, setDeviceSerialNo] = useState();

  const params = useParams();
  const [repairDetails, setRepairDetails] = useState();

  const [showQrCode, setShowQrCode] = useState(false);
  const [qrCodeURL, setQrCodeURL] = useState(null);
  const [dislaimerAccepted, setDisclaimerAccepted] = useState(false);

  //Handles search clear -> Sent to Search component
  const handleCancelSearch = () => {
    setSearchResults(null);
    //getAllDevices({ page: pagationModel.page, limit: pagationModel.pageSize }, setAllDevices, setTotalPages);
  };

  //Handle Get data
  const handleGetDevices = () => {
    getStaffData({ page: currentPage, limit: userLimit }, setAllStaff, setTotalPages);
    getAllStudents({ page: currentPage, limit: userLimit }, setAllStudents, setTotalPages);

    const user = getLoggedInUser();
    getAllDevices({ page: currentPage, limit: deviceLimit, userrole: user?.role }, setAllDevices, setTotalPages);
  };

  //Set form on update
  const setRepairFormOnUpdate = async () => {
    setDeviceSerialNo(data?.serial_no);
    setRepairType(data?.repair_type);
    setRepairDescription(data?.description);
    //setTechnicianName(data?.)
    setTechnicianId(data?.assigned_to);
    setRepairNotes(data?.notes);
  };

  //Set form on create
  const setRepairFormOnCreate = () => {
    handleGetDevices();

    getAdmins(setTechnician);

    const user = getLoggedInUser();

    setTechnicianName(user.fullName);
    setTechnicianId(user.id);
  };

  //Execute Gett All devices on load or status change
  useEffect(() => {
    if (type === "Add") {
      setRepairFormOnCreate();
    } else {
      setRepairFormOnCreate();
      setRepairFormOnUpdate();
    }
  }, [currentPage]);

  useEffect(() => {
    if (!socket.connected) {
      console.log("not connected");
      socket.connect();
    }

    // Debug check: Verify the laptop is physically hearing events
    console.log("Listening for Disclaimer accepted.");

    socket.on("disclaimer_consent_accepted", (sessionId) => {
      //setSignature(image.image);
      //setIsSigned(true);
      //onSubmit();

      console.log("Disclaimer accepted.");
      setShowQrCode(false);

      setDisclaimerAccepted(true);

      socket.disconnect();
    });

    return () => {
      socket.off("disclaimer_consent_accepted");
    };
  }, []);

  return (
    <div className=" bg-white">
      {showQrCode && showQrCode ? (
        <div className="flex flex-col items-center bg-white shadow-md rounded-md border ">
          <div className="flex flex-col items-center p-2">
            <QrCodeCard title={"Scan the QR Code with a tablet to capture user signature"} text={qrCodeURL} size={250} />
            <div>
              <CancelButton onClick={onCanel} />
            </div>
          </div>
        </div>
      ) : (
        <div>
          {type && type === "Add" ? <span className="heading-text">Create New Repair</span> : <span className="heading-text">Update Repair - {data?.repair_code}</span>}

          <div className="flex flex-col gap-3 -z-50">
            {/*<UserSelectInput studentData={allStudents} staffData={allStaff} selectedUser={selectedUser} setSelectedUser={setSelectedUser} /> */}
            {/** */}

            {type && type === "Add" ? (
              <div>
                <span className="font-semibold">1. Device Details</span>
                <DeviceSelectInput allDevices={allDevices} selectedDevice={selectedDevice} setSelectedDevice={setSelectedDevice} repair={true} viewDevice={deviceSerialNo} />
              </div>
            ) : (
              <div className="">
                <span className="font-semibold">1. Device Details</span>
                <div className={`flex gap-2 bg-white border border-zinc-300 rounded-md p-2`}>
                  <div className="bg-slate-100 p-2 rounded-md bg-opacity-30">
                    <MdDevices size={25} />
                  </div>
                  {/**/}
                  <div className="w-5/6 flex flex-col">
                    <div className=" flex flex-col  ">
                      <span className="text-sm">{`${data?.make} ${data?.model}`}</span>
                      <div className="flex  justify-between">
                        <div className="flex gap-5">
                          <span className="text-sm">{`Asset Tag: ${data?.asset_tag}`}</span>
                          <span className="text-sm">{`Serial: ${data?.serial_no}`}</span>
                          <span className="text-sm">{`Category: ${data?.category}`}</span>
                        </div>
                        <div className="flex gap-5 items-center justify-center">
                          {data?.status === "Available" ? (
                            <span className="text-sm bg-green-600 border shadow-sm p-1 rounded-md text-white">{data?.status}</span>
                          ) : data?.status === "Issue Approval required" ? (
                            <span className="text-sm bg-orange-600 border shadow-sm p-1 rounded-md text-white">{data?.status}</span>
                          ) : data?.status === "Loan Approval required" ? (
                            <span className="text-sm bg-orange-600 border shadow-sm p-1 rounded-md text-white">{data?.status}</span>
                          ) : (
                            <span className="text-sm bg-red-600 border shadow-sm p-1 rounded-md text-white">{data?.status}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    {/**/}
                    <div className="w-[100%] flex"></div>
                  </div>
                </div>
              </div>
            )}

            {/** */}
            <div>
              <span className="col-span-4 font-semibold">2. Maintenance Details</span>
              <div className="grid grid-cols-4  gap-5 mt-5">
                {/** */}

                <div className="col-span-2">
                  <SelectInput label={"Maintenance Type"} value={repairType} options={maintenaceTypesList} optionName={"name"} isDisabled={false} setOnChange={setRepairType} onChoose={() => {}} />
                </div>

                <div className="col-span-4 row-span-1">
                  <TextArea label={"Description"} value={repairDescription} isDisabled={false} maxLength={500} setOnChange={setRepairDescription} />
                </div>

                {hasPermission("assign-repair") && (
                  <div className="col-span-2">
                    <TechnicianSelectInput
                      label={"Assigned To"}
                      value={""}
                      options={technicians}
                      optionName={"name"}
                      isDisabled={false}
                      setTechnicianName={setTechnicianName}
                      setTechnicianId={setTechnicianId}
                    />
                  </div>
                )}

                <div className="col-span-2">
                  <TextInput label={"Technician"} value={technicianName} isDisabled={true} maxLength={20} setOnChange={setTechnicianName} type={"text"} />
                </div>

                <div className="col-span-4 row-span-1">
                  <TextArea label={"Notes"} value={repairNotes} isDisabled={false} maxLength={500} setOnChange={setRepairNotes} />
                </div>
                {dislaimerAccepted && (
                  <div className="col-span-4 row-span-1">
                    <div className="flex gap-2 items-center">
                      <span>Disclaimer Accepted: </span>
                      <FaRegCheckCircle size={20} className="text-green-500" />
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/** */}
            <div className="flex justify-end p-3 gap-8">
              <button className="flex  rounded-sm p-3" onClick={onCanel}>
                Cancel
              </button>
              {dislaimerAccepted && (
                <SubmitButton
                  text={"Submit"}
                  onClick={() => {
                    if (type === "Add") {
                      handleCreateRepair(selectedDevice?.id, repairType, repairDescription, technicianId, repairNotes, dislaimerAccepted, onSubmit, setShowToast);
                    } else {
                      handleUpdateRepair(data?.id, repairType, repairDescription, technicianId, repairNotes, onSubmit, setShowToast);
                    }
                  }}
                />
              )}

              {dislaimerAccepted !== true && (
                <div>
                  {(selectedDevice?.id && selectedDevice?.device_status === "Assigned") || selectedDevice?.device_status === "Loaned" ? (
                    <div className="flex gap-5">
                      <SendToTablet
                        btnLable={"Send to Tablet (Wireless)"}
                        userId={null}
                        deviceId={selectedDevice?.id}
                        formType={"laptop-repair"}
                        setShowQrCode={setShowQrCode}
                        setQrCodeURL={setQrCodeURL}
                        onSubmit={onSubmit}
                      />
                      <OpenSecondScreenButton btnLable={"Send to USB Tablet "} userId={null} deviceId={selectedDevice?.id} formType={"laptop-repair"} returnDate={null} setShowToast={setShowToast} />
                    </div>
                  ) : (
                    <SubmitButton
                      text={"Submit"}
                      onClick={() => {
                        if (type === "Add") {
                          handleCreateRepair(selectedDevice?.id, repairType, repairDescription, technicianId, repairNotes, onSubmit, setShowToast);
                        } else {
                          handleUpdateRepair(data?.id, repairType, repairDescription, technicianId, repairNotes, onSubmit, setShowToast);
                        }
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateNewRepair;
