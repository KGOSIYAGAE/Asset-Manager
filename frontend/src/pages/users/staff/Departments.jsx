import React, { useEffect, useState } from "react";
import AddButton from "../../../components/buttons/AddButton";
import ExportExcelButton from "../../../components/buttons/ExportExcelButton";
import Modal from "react-modal";
import ToastMessage from "../../../components/toastMessage/ToastMessage";
import { hasPermission } from "../../../utils/getLoggedInUser";
import { deleteDepartment, deleteFaculty, getDepartments } from "../../../services/api/jobDetails/jobDetails";
import DepartmentsTable from "../../../components/tables/DepratmentsTable";
import DeleteConfirmation from "../../../components/cards/deleteConfirmation/DeleteConfirmation";
import CreateDepartment from "../../../components/cards/createDepartment/CreateDepartment";

function Departments({ path }) {
  const [openModal, setOpenModal] = useState({ isShown: false, type: null, data: null });
  const [showToast, setShowToast] = useState({ isShow: false, type: "", message: null });

  const [departments, setDepartments] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  useEffect(() => {
    getDepartments({ page: currentPage, limit: limit }, setDepartments, setTotalPages);
  }, [currentPage]);

  return (
    <div className="h-svh flex flex-col p-3 gap-3 bg-zinc-50  ">
      <span className="text-sm ">
        Staff/ <b> {path}</b>
      </span>
      {/* */}
      <div className="col-span-6 h-auto  bg-white rounded-md shadow-md ">
        <div className="flex items-center justify-between rounded-md p-2  bg-white">
          <span className="heading-text ">{"Departments"}</span>
          <div className="flex gap-2 ">
            {hasPermission("loan") && (
              <AddButton
                name={"Add Department"}
                handleAdd={() => {
                  setOpenModal({ isShown: true, type: "add-department", data: "hello" });
                }}
              />
            )}
            {hasPermission("export") && <ExportExcelButton />}
          </div>
        </div>{" "}
        <div className="flex p-2">
          <DepartmentsTable departments={departments} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} limit={limit} setOpenModal={setOpenModal} />
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
          openModal.type === "release" ? "w-[80%] max-h-3/4 " : openModal.type === "assign" ? "w-[80%] max-h-3/4" : "w-[80%] lg:w-[50%] max-h-full"
        }  bg-white rounded-md mx-auto mt-14 p-5 overflow-auto`}
      >
        {openModal.type === "update-department" || openModal.type === "add-department" ? (
          <CreateDepartment
            onCanel={() => {
              setOpenModal({ isShown: false });
              getDepartments({ page: currentPage, limit: limit }, setDepartments, setTotalPages);
            }}
            onSubmit={() => {
              setOpenModal({ isShown: false });
              getDepartments({ page: currentPage, limit: limit }, setDepartments, setTotalPages);
            }}
            setShowToast={setShowToast}
            modalType={openModal?.type}
            modalData={openModal?.data || null}
          />
        ) : (
          <DeleteConfirmation
            onCanel={() => {
              setOpenModal({ isShown: false });
              getDepartments({ page: currentPage, limit: limit }, setDepartments, setTotalPages);
              console.log("Update on cancel");
            }}
            onSubmit={() => {
              setOpenModal({ isShown: false });
              getDepartments({ page: currentPage, limit: limit }, setDepartments, setTotalPages);
              console.log("Update on submit");
            }}
            onDelete={() => {
              deleteDepartment(openModal?.data?.department_id, setShowToast);
            }}
            email={openModal?.data?.department_name}
          />
        )}
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

export default Departments;
