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
import { handleCreateRepair, maintenaceTypesList, repairStatusList } from "../../../utils/deviceRepairsHelper";
import SelectInput from "../../inputs/selectInputs/selectInput/SelectInput";
import { getLoggedInUser, hasPermission } from "../../../utils/getLoggedInUser";
import { getAdmins } from "../../../services/api/admin/Admin.Api";
import TechnicianSelectInput from "../../inputs/selectInputs/technicianSelectInput/technicianSelectInput";
import SubmitButton from "../../buttons/SubmitButton";

function CreateNewRepair({ onCanel, onSubmit, setShowToast }) {
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

  //Handles search clear -> Sent to Search component
  const handleCancelSearch = () => {
    setSearchResults(null);
    //getAllDevices({ page: pagationModel.page, limit: pagationModel.pageSize }, setAllDevices, setTotalPages);
  };

  //Handle Get data
  const handleGetDevices = () => {
    getStaffData({ page: currentPage, limit: userLimit }, setAllStaff, setTotalPages);
    getAllStudents({ page: currentPage, limit: userLimit }, setAllStudents, setTotalPages);
    getAllDevices({ page: currentPage, limit: deviceLimit }, setAllDevices, setTotalPages);
  };

  //Execute Gett All devices on load or status change
  useEffect(() => {
    handleGetDevices();

    getAdmins(setTechnician);

    const user = getLoggedInUser();

    setTechnicianName(user.fullName);
    setTechnicianId(user.id);
  }, [currentPage]);

  return (
    <div className="bg-white">
      <span className="heading-text">Create New Repair</span>

      <div className="flex flex-col  -z-50">
        {/*<UserSelectInput studentData={allStudents} staffData={allStaff} selectedUser={selectedUser} setSelectedUser={setSelectedUser} /> */}
        {/** */}
        <div>
          <span className="font-semibold">1. Device Details</span>
          <DeviceSelectInput allDevices={allDevices} selectedDevice={selectedDevice} setSelectedDevice={setSelectedDevice} repair={true} />
        </div>
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

            <div className="col-span-2">
              <SelectInput label={"Repair Status"} value={repairStatus} options={repairStatusList} optionName={"name"} isDisabled={false} setOnChange={setRepairStatus} onChoose={() => {}} />
            </div>
          </div>
        </div>
        {/** */}
        <div className="flex justify-end p-3 gap-8">
          <button className="flex  rounded-sm p-3" onClick={onCanel}>
            Cancel
          </button>
          <SubmitButton
            text={"Submit"}
            onClick={() => {
              handleCreateRepair(selectedDevice?.id, repairType, repairDescription, technicianId, repairNotes, repairStatus, setShowToast, onSubmit);
            }}
          />
          {selectedDevice?.id && repairStatus ? (
            <div onClick={() => {}}>
              {/*<OpenSecondScreenButton
                btnLable={"Continue to Verifaction"}
                userId={selectedUser?.userId}
                deviceId={selectedDevice?.id}
                formType={"loan-verification"}
                returnDate={null}
                setShowToast={setShowToast}
              />*/}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateNewRepair;
