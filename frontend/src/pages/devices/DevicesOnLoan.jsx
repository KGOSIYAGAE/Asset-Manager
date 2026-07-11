import React, { useEffect, useState } from "react";
import { useLoanDueContext } from "../../hooks/useLoanDueContext";
import { getAllDeviceLoanDue, getAllDevices, getAllLoanedDevices } from "../../services/api/devices/Device.Api";
import OverdueLoanTable from "../../components/tables/OverdueLoanTable";
import Modal from "react-modal";
import CreateNewLoan from "../../components/cards/createNewLoan/CreateNewLoan";
import ToastMessage from "../../components/toastMessage/ToastMessage";
import { useStaffContext } from "../../hooks/useStaffContext";
import { useStudentsContext } from "../../hooks/useStudentsContext";
import { useDeviceContext } from "../../hooks/useDevicesContext";
import { hasPermission } from "../../utils/getLoggedInUser";
import AddButton from "../../components/buttons/AddButton";
import ExportExcelButton from "../../components/buttons/ExportExcelButton";
import { getAllStudents } from "../../services/api/students/Students.Api";
import { getStaffData } from "../../services/api/staff/Staff.Api";
import ToastMessageBox from "../../components/ToastMessageBox/ToastMessageBox";

function DevicesOnLoan({ path }) {
  const [openModal, setOpenModal] = useState({ isShown: false, type: null, data: null });
  const [showToast, setShowToast] = useState({ isShow: false, type: "", message: null });

  const [loanedDevices, setLoanedDevices] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 8;

  useEffect(() => {
    //setApprovalDevices(getRequiresApprovalDevices(devicesState?.deviceList));

    getAllLoanedDevices({ page: currentPage, limit: limit }, setLoanedDevices, setTotalPages);
  }, [currentPage]);

  /*useEffect(() => {
    getAllStudents(studentDispatch);
    getStaffData(staffDispatch);
    getAllDevices(devicesDispatch);
  }, []);*/

  //handle post Message Response
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === "device_loaned") {
        setShowToast({ isShow: true, type: "success", message: event.data.payload });
        getAllLoanedDevices({ page: currentPage, limit: limit }, setLoanedDevices, setTotalPages);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="h-svh flex flex-col p-3 gap-3 bg-zinc-50  ">
      <span className="text-sm ">
        Devices/ <b> {path}</b>
      </span>
      {/* */}
      <div className="col-span-6  bg-white rounded-md shadow-md ">
        <div className="flex items-center justify-between rounded-md p-2  bg-white">
          <span className="heading-text ">{"Devices On Loan"}</span>
          <div className="flex gap-2 ">
            {hasPermission("loan") && (
              <AddButton
                name={"Create New Loan"}
                handleAdd={() => {
                  setOpenModal({ isShown: true, type: "new-loan", data: "hello" });
                }}
              />
            )}
            {hasPermission("export") && <ExportExcelButton />}
          </div>
        </div>{" "}
        <div className="flex p-2">
          <OverdueLoanTable devices={loanedDevices} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} limit={limit} />
        </div>
      </div>
      {/* */}
      <Modal
        isOpen={openModal.isShown}
        onRequestClose={() => {
          setOpenModal({ isShown: false });
        }}
        style={{
          overlay: { backgroundColor: "rgb(0,0,0,0.2)" },
        }}
        contentLabel=""
        className={`${
          openModal.type === "release" ? "w-[80%] max-h-3/4 bg-white" : openModal.type === "assign" ? "w-[80%] max-h-3/4 bg-white" : "w-[50%] max-h-full bg-white"
        } rounded-md mx-auto mt-14 p-5 overflow-auto`}
      >
        <CreateNewLoan
          onCanel={() => {
            setOpenModal({ isShown: false });
          }}
          onSubmit={() => {
            setOpenModal({ isShown: false });
          }}
          setShowToast={setShowToast}
        />
      </Modal>
      <ToastMessage
        isShown={showToast.isShow}
        type={showToast.type}
        message={showToast.message}
        onClose={() => {
          setShowToast({ isShow: false });
        }}
      />
    </div>
  );
}

export default DevicesOnLoan;
