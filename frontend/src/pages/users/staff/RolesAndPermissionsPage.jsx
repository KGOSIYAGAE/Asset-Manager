import React, { useEffect, useState } from "react";
import ToastMessage from "../../../components/toastMessage/ToastMessage";
import Modal from "react-modal";
import ExportExcelButton from "../../../components/buttons/ExportExcelButton";
import AddButton from "../../../components/buttons/AddButton";
import { getStaffData } from "../../../services/api/staff/Staff.Api";
import { useStaffContext } from "../../../hooks/useStaffContext";
import { hasPermission } from "../../../utils/getLoggedInUser";
import RolesAndPermissionTable from "../../../components/tables/RolesAndPermissionTable";
import ManageRoles from "../../../components/cards/manageRoles/ManageRoles";
import UpdateRoles from "../../../components/cards/manageRoles/UpdateRoles";
import { getAdmins } from "../../../services/api/admin/Admin.Api";

function RolesAndPermissionsPage({ path }) {
  const [openModal, setOpenModal] = useState({ isShown: false, type: null, data: null });
  const [showToast, setShowToast] = useState({ isShow: false, type: "", message: null });
  const [viewedUser, setViewedUser] = useState(null);

  //Set pagated data to the table

  const [userAndAdmins, setUsersAndAdmins] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 8;

  const handleUpdateRole = (systemUser) => {
    setOpenModal({ isShown: true, type: "update-role", data: "hello" });

    setViewedUser(systemUser);
  };

  useEffect(() => {
    getAdmins(setUsersAndAdmins);
  }, []);

  return (
    <div className="h-svh flex flex-col p-3 gap-3 bg-zinc-50  ">
      <span className="text-sm ">
        Users/ <b> {path}</b>
      </span>
      {/* */}
      <div className="col-span-6  bg-white rounded-md shadow-md overflow-x-scroll">
        <div className="flex items-center justify-between rounded-t-md p-2 sticky top-0 bg-white">
          <span className="heading-text ">{"Roles & Permissions"}</span>
          <div className="flex gap-2 ">
            {hasPermission("create") && (
              <AddButton
                name={"Assign Role"}
                handleAdd={() => {
                  setOpenModal({ isShown: true, type: "assign-role", data: "hello" });
                }}
              />
            )}
            <ExportExcelButton />
          </div>
        </div>
        <div className="flex p-2">
          <RolesAndPermissionTable userAndAdmins={userAndAdmins} handleUpdateRole={handleUpdateRole} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} limit={limit} />
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
        {openModal.type && openModal.type === "assign-role" ? (
          <ManageRoles
            onCanel={() => {
              setOpenModal({ isShown: false });
            }}
            onSubmit={(message) => {
              getAdmins(setUsersAndAdmins);
              setOpenModal({ isShown: false });
              setShowToast({ isShow: true, type: "success", message: message });
            }}
            userData={userAndAdmins}
            setShowToast={setShowToast}
          />
        ) : (
          <UpdateRoles
            onCanel={() => {
              setOpenModal({ isShown: false });
            }}
            onSubmit={(message) => {
              getAdmins(setUsersAndAdmins);
              setOpenModal({ isShown: false });
              setShowToast({ isShow: true, type: "success", message: message });
            }}
            userData={viewedUser}
            setShowToast={setShowToast}
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

export default RolesAndPermissionsPage;
