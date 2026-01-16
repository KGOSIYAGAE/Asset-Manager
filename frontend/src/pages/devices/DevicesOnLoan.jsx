import React, { useEffect, useState } from "react";
import { useLoanDueContext } from "../../hooks/useLoanDueContext";
import { getAllDeviceLoanDue, getAllDevices } from "../../services/api/devices/Device.Api";
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

function DevicesOnLoan({ path }) {
  const [openModal, setOpenModal] = useState({ isShown: false, type: null, data: null });
  const [showToast, setShowToast] = useState({ isShow: false, type: "", message: null });

  const { staffState } = useStaffContext();
  const { studentState } = useStudentsContext();
  const { devicesState, devicesDispatch } = useDeviceContext();

  useEffect(() => {
    getAllDevices(devicesDispatch);
  }, []);

  return (
    <div className="h-svh flex flex-col p-3 gap-3 bg-zinc-50  ">
      <span className="text-sm ">
        Devices/ <b> {path}</b>
      </span>
      {/* */}
      <div className="col-span-6  bg-white rounded-md shadow-md overflow-x-scroll">
        <div className="flex items-center justify-between border-b-2 rounded-t-md p-2 sticky top-0 bg-white">
          <span className="heading-text ">{""}</span>
          <div className="flex gap-2 ">
            {hasPermission("create") && (
              <AddButton
                name={"Create New Loan"}
                handleAdd={() => {
                  setOpenModal({ isShown: true, type: "new-loan", data: "hello" });
                }}
              />
            )}
            <ExportExcelButton />
          </div>
        </div>{" "}
        <OverdueLoanTable devices={devicesState?.deviceList} label={"Devices Loaned"} />
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
            getAllDevices(devicesDispatch);
            setOpenModal({ isShown: false });
          }}
          userData={[...staffState?.staffList, ...studentState?.studentsList]}
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
