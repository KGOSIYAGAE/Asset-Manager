import React, { useEffect, useState } from "react";
import { MdDelete, MdEditDocument, MdKeyboardDoubleArrowRight, MdOutlineSettings } from "react-icons/md";
import AddButton from "../../components/buttons/AddButton";
import CancelButton from "../../components/buttons/CancelButton";
import SubmitButton from "../../components/buttons/SubmitButton";
import Modal from "react-modal";
import ToastMessage from "../../components/toastMessage/ToastMessage";
import { getEmailAzureGraphSettings } from "../../services/api/email/emailSettings";
import AddEditEmailSettings from "../../components/cards/emailSettings.jsx/AddEditEmailSettings";
import { getDocumentTemplates } from "../../services/api/documentTemplates/documentTemplates";
import { BsMicrosoft } from "react-icons/bs";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import AddEditDocumentTemplate from "../../components/cards/addEditDocumentTemplate/addEditDocumentTemplate";

function SystemSettings() {
  const [openModal, setOpenModal] = useState({ isShown: false, type: null, data: null });
  const [showToast, setShowToast] = useState({ isShown: false, type: "", message: null });

  const [selectedItem, setSelectedItem] = useState();

  const filterItems = ["General Settings", "System Settings"];
  const systemSettingsItems = ["Email Settings", "Email Templates", "Form Templates", "Disclaimer Templates"];
  const dummyEmailTemplates = ["Issue Approval Email", "Issue Approved Email", "Loan Approval Email", "Loan Approved Email", "Issue Form Email", "Loan Form Email"];
  const dummyDisclaimerTemplates = ["Staff Issue Disclaimer", "Student AOD Disclaimer", "Device Repair Disclaimer"];

  const [documentsTemplate, setDocumentTemplates] = useState();
  const [msGraphSettings, setMsGraphSettings] = useState("");

  useEffect(() => {
    getEmailAzureGraphSettings(setMsGraphSettings);
    getDocumentTemplates(setDocumentTemplates);
  }, []);

  useEffect(() => {
    setSelectedItem("Email Settings");
  }, []);

  return (
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
                  setOpenModal({ isShown: true, type: "email-connection", data: { mailerName: "Microsoft Graph Mail", msGraphSettings } });
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
            <AddButton
              name={"Add Template"}
              handleAdd={() => {
                setOpenModal({ isShown: true, type: "document-template", data: null });
              }}
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {documentsTemplate &&
              documentsTemplate.map((template, index) => (
                <div key={index} className="flex items-center justify-between border border-gray-200 rounded-md p-3 gap-3">
                  <span className="font-bold text-black">{template.name}</span>
                  <div className="flex gap-2">
                    <div
                      className="hover:bg-red-600 hover:text-white p-1 rounded-md"
                      onClick={() => {
                        setOpenModal({ isShown: true, type: "document-template", data: template });
                      }}
                    >
                      <MdEditDocument size={15} />
                    </div>
                    <div className="hover:bg-red-600 hover:text-white p-1 rounded-md">
                      <MdDelete size={15} />
                    </div>
                  </div>
                </div>
              ))}
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
      <Modal
        isOpen={openModal.isShown}
        onRequestClose={() => {
          if (openModal.type !== "document-template") {
            setOpenModal({ isShown: false });
          }
        }}
        style={{
          overlay: { backgroundColor: "rgb(0,0,0,0.2)" },
        }}
        contentLabel=""
        className={` ${openModal.type === "document-template" ? "w-[60%]" : "w-[50%]  bg-white mt-14 overflow-auto"}  rounded-md mx-auto  p-5  focus:outline-none`}
      >
        {openModal.type === "email-connection" ? (
          <AddEditEmailSettings
            onCancel={() => {
              setOpenModal({ isShown: false });
              getEmailAzureGraphSettings(setMsGraphSettings);
            }}
            onSubmit={() => {
              setOpenModal({ isShown: false });
              getEmailAzureGraphSettings(setMsGraphSettings);
            }}
            mailerName={openModal?.data?.mailerName}
            msGraphSettings={openModal?.data?.msGraphSettings}
            setShowToast={setShowToast}
          />
        ) : openModal.type === "document-template" ? (
          <AddEditDocumentTemplate
            onCancel={() => {
              setOpenModal({ isShown: false });
              getDocumentTemplates(setDocumentTemplates);
            }}
            onSubmit={() => {
              setOpenModal({ isShown: false });
              getDocumentTemplates(setDocumentTemplates);
            }}
            selectedDocument={openModal?.data}
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

export default SystemSettings;
