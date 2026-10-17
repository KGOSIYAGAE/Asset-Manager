import React, { useEffect, useState } from "react";
import { getAllDeviceForApproval, getAllDevices } from "../../services/api/devices/Device.Api";
import ToastMessage from "../../components/toastMessage/ToastMessage";
import { useDeviceContext } from "../../hooks/useDevicesContext";
import DevicesRequiresApprovalTable from "../../components/tables/DevicesRequireApprovalTable";
import SearchInput from "../../components/inputs/searchInput/SearchInput";
import { useSearchContext } from "../../hooks/useSearchContext";
import { getRequiresApprovalDevices } from "../../utils/devicesHelperMethods";
import { getLoggedInUser, hasPermission } from "../../utils/getLoggedInUser";
import AddButton from "../../components/buttons/AddButton";
import { MdDelete, MdDevices, MdEditDocument, MdKeyboardDoubleArrowRight, MdNewReleases, MdOutlineFlightTakeoff, MdOutlineSettings } from "react-icons/md";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { TbProgressAlert, TbProgressCheck, TbProgressDown, TbProgressX } from "react-icons/tb";
import { FaRegCheckCircle } from "react-icons/fa";
import Modal from "react-modal";
import DeviceMaintenanceRepairs from "../../components/tables/DeviceMaintenanceRepairs";
import CreateNewLoan from "../../components/cards/createNewLoan/CreateNewLoan";
import CreateNewRepair from "../../components/cards/createNewRepair/CreateNewRepair";
import { getAllRepairs, getAllRepairsForTech, getAllRepairsStats, getAllRepairsStatsForTech } from "../../services/api/repairs/Repairs.Api";
import LoanIssueForm from "../../components/LoanForms/LoanIssueForm";
import RepairForm from "../../components/repairForm/RepairForm";
import { BsMicrosoft } from "react-icons/bs";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import CancelButton from "../../components/buttons/CancelButton";
import SubmitButton from "../../components/buttons/SubmitButton";
import TextInput from "../../components/inputs/textInput/TextInput";
import { getEmailAzureGraphSettings } from "../../services/api/email/emailSettings";
import AddEditEmailSettings from "../../components/cards/addEditEmailSettings/AddEditEmailSettings";

function Settings({ name, path, createRepair }) {
  const [openModal, setOpenModal] = useState({ isShown: false, type: null, data: null });
  const [showToast, setShowToast] = useState({ isShown: false, type: "", message: null });
  const [active, setActive] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleSwitcFilterTab = () => {};
  const [selectedItem, setSelectedItem] = useState();

  const [msGraphSettings, setMsGraphSettings] = useState("");

  const filterItems = ["General Settings", "System Settings"];
  const systemSettingsItems = ["Email Settings", "Email Templates", "Form Templates", "Disclaimer Templates"];
  const dummyEmailTemplates = ["Issue Approval Email", "Issue Approved Email", "Loan Approval Email", "Loan Approved Email", "Issue Form Email", "Loan Form Email"];
  const dummyFormTemplates = ["Staff Issue Form", "Student AOD Form", "Device Return Form", "Device Repair Form"];
  const dummyDisclaimerTemplates = ["Staff Issue Disclaimer", "Student AOD Disclaimer", "Device Repair Disclaimer"];

  useEffect(() => {
    setActive(name);
    setSelectedItem("Email Settings");
  }, [name]);

  useEffect(() => {
    getEmailAzureGraphSettings(setMsGraphSettings);
  }, []);

  return (
    <div className="h-svh flex flex-col p-3  bg-zinc-50">
      <span className="heading-text ">Settings</span>
      <span className="text-sm ">
        <b>{path}</b>
      </span>
      <div className="flex flex-col  gap-2">
        <div className="flex  justify-between sticky top-0 p-5 bg-white rounded-md"></div>

        <div className="flex flex-col">
          <div className="bg-white rounded-md shadow-md p-2">
            <div className="flex gap-3">
              <div className="filter-tab ">
                {filterItems.map((item, index) => (
                  <span
                    key={index}
                    className={`filter-tab-item ${active === item ? "active" : ""}`}
                    onClick={() => {
                      setActive(item);
                      setStatusFilter(item);
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 lg:grid-rows-1 gap-3">
          <div className="flex flex-col col-span-12 lg:col-span-4 bg-white rounded-md shadow-md text-sm text-slate-500 p-5 gap-2">
            {systemSettingsItems.map((item, index) => (
              <div
                key={index}
                className={`${selectedItem === item ? "bg-red-600 text-white" : ""} flex items-center p-1 gap-1 rounded-md hover:bg-red-600 hover:text-white`}
                onClick={() => {
                  setSelectedItem(item);
                }}
              >
                <MdKeyboardDoubleArrowRight className={`${selectedItem === item ? "flex " : "hidden"}`} />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {selectedItem && selectedItem === "Email Settings" ? (
            /**Email Setting*/
            <div className="flex flex-col col-span-12 lg:col-span-8 bg-white rounded-md shadow-md p-2 text-sm text-slate-500 gap-3">
              <div className="border-b border-gray-200  p-1 ">
                <span className="heading-text ">{selectedItem}</span>
              </div>
              <div className="flex flex-col border border-gray-200 rounded-md p-5 gap-3">
                <div className="flex items-center gap-2">
                  <div className="bg-gray-50 p-2 rounded-md">
                    <BsMicrosoft size={30} className="text-sky-500" />
                  </div>
                  <span className="font-semibold text-black">Microsoft Graph Mail</span>
                </div>
                <div className="border-b border-gray-200  pb-3">
                  <span className="text-sm">A RESTful interface that lets applications read, send, organize, and manage email in Microsoft 365 and Outlook.com mailboxes</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className={`w-[100px] flex items-center ${msGraphSettings && msGraphSettings ? "bg-green-600" : "bg-red-600"} text-white p-1 gap-1 rounded-md`}>
                    <IoCheckmarkDoneOutline />
                    <span>Connected</span>
                  </div>
                  <div
                    className="hover:cursor-pointer"
                    onClick={() => {
                      setOpenModal({ isShown: true, type: "update-email-connection", data: { mailerName: "Microsoft Graph Mail", msGraphSettings } });
                    }}
                  >
                    <MdOutlineSettings size={20} />
                  </div>
                </div>
              </div>
            </div>
          ) : selectedItem === "Email Templates" ? (
            /**Email Template*/
            <div className="flex flex-col col-span-12 lg:col-span-8 bg-white rounded-md shadow-md p-2 text-sm text-slate-500 gap-3">
              <div className="flex  justify-between border-b border-gray-200  p-1 ">
                <span className="heading-text ">{selectedItem}</span>
                <AddButton name={"Add Template"} />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {dummyEmailTemplates &&
                  dummyEmailTemplates.map((template, index) => (
                    <div key={index} className="flex items-center justify-between border border-gray-200 rounded-md p-3 gap-3">
                      <span className="font-semibold text-black ">{template}</span>
                      <div className="flex gap-2">
                        <div className="hover:bg-red-600 hover:text-white p-1 rounded-md">
                          <MdEditDocument size={15} />
                        </div>
                        <div className="hover:bg-red-600 hover:text-white p-1 rounded-md">
                          <MdDelete size={15} />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="flex justify-end border-t border-gray-200  pt-3 gap-3">
                <CancelButton onClick={() => {}} /> <SubmitButton text={"Save"} onClick={() => {}} />
              </div>
            </div>
          ) : selectedItem === "Form Templates" ? (
            /**Form Template*/
            <div className="flex flex-col col-span-12 lg:col-span-8 bg-white rounded-md shadow-md p-2 text-sm text-slate-500 gap-3">
              <div className="flex  justify-between border-b border-gray-200  p-1 ">
                <span className="heading-text ">{selectedItem}</span>
                <AddButton name={"Add Template"} />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {dummyFormTemplates &&
                  dummyFormTemplates.map((template, index) => (
                    <div key={index} className="flex items-center justify-between border border-gray-200 rounded-md p-3 gap-3">
                      <span className="font-bold text-black">{template}</span>
                      <div className="flex gap-2">
                        <div className="hover:bg-red-600 hover:text-white p-1 rounded-md">
                          <MdEditDocument size={15} />
                        </div>
                        <div className="hover:bg-red-600 hover:text-white p-1 rounded-md">
                          <MdDelete size={15} />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="flex justify-end border-t border-gray-200  pt-3 gap-3">
                <CancelButton onClick={() => {}} /> <SubmitButton text={"Save"} onClick={() => {}} />
              </div>
            </div>
          ) : selectedItem === "Disclaimer Templates" ? (
            /**Disclaimer Template*/
            <div className="flex flex-col col-span-12 lg:col-span-8 bg-white rounded-md shadow-md p-2 text-sm text-slate-500 gap-3">
              <div className="flex  justify-between border-b border-gray-200  p-1 ">
                <span className="heading-text ">{selectedItem}</span>
                <AddButton name={"Add Template"} />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {dummyDisclaimerTemplates &&
                  dummyDisclaimerTemplates.map((template, index) => (
                    <div key={index} className="flex items-center justify-between border border-gray-200 rounded-md p-3 gap-3">
                      <span className="font-bold text-black">{template}</span>
                      <div className="flex gap-2">
                        <div className="hover:bg-red-600 hover:text-white p-1 rounded-md">
                          <MdEditDocument size={15} />
                        </div>
                        <div className="hover:bg-red-600 hover:text-white p-1 rounded-md">
                          <MdDelete size={15} />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="flex justify-end border-t border-gray-200  pt-3 gap-3">
                <CancelButton onClick={() => {}} /> <SubmitButton text={"Save"} onClick={() => {}} />
              </div>
            </div>
          ) : (
            ""
          )}

          {/**/}
        </div>
      </div>

      <Modal
        isOpen={openModal.isShown}
        onRequestClose={() => {
          setOpenModal({ isShown: false });
        }}
        style={{
          overlay: { backgroundColor: "rgb(0,0,0,0.2)" },
        }}
        contentLabel=""
        className={`w-[50%] bg-white rounded-md mx-auto mt-14 p-5 overflow-auto focus:outline-none`}
      >
        {openModal.type === "update-email-connection" ? (
          <AddEditEmailSettings
            onCancel={() => {
              getEmailAzureGraphSettings(setMsGraphSettings);
              setOpenModal({ isShown: false });
            }}
            onSubmit={() => {
              getEmailAzureGraphSettings(setMsGraphSettings);
              setOpenModal({ isShown: false });
            }}
            mailerName={openModal?.data?.mailerName}
            msGraphSettings={msGraphSettings}
            setShowToast={setShowToast}
          />
        ) : (
          ""
        )}
      </Modal>

      <ToastMessage
        isShown={showToast.isShown}
        type={showToast.type}
        message={showToast.message}
        onClose={() => {
          setShowToast({ isShown: false });
        }}
      />
    </div>
  );
}

export default Settings;
