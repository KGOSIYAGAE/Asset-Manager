import React, { useEffect, useState } from "react";

import SearchInput from "../../../components/inputs/searchInput/SearchInput";
import AddButton from "../../../components/buttons/AddButton";
import RefreshButton from "../../../components/buttons/RefreshButton";
import DataTable from "../../../components/dataGrid/DataTable";
import { staffTableHeaders } from "../../../utils/TableHeaders";
import { useStaffContext } from "../../../hooks/useStaffContext";
import { useSearchContext } from "../../../hooks/useSearchContext";
import { useNavigate } from "react-router-dom";
import ToastMessage from "../../../components/toastMessage/ToastMessage";
import { getStaffData, deleteStaff } from "../../../services/api/staff/Staff.Api";
import Modal from "react-modal";
import DeleteConfirmation from "../../../components/cards/deleteConfirmation/DeleteConfirmation";

function Staff({ path }) {
  //Context
  const { staffState, staffDispatch } = useStaffContext();
  const { searchState, searchDispatch } = useSearchContext();
  const [showToast, setShowToast] = useState({ isShown: false, type: null, message: null });
  const [openModal, setOpenModal] = useState({ isShown: false, type: "delete", data: null });

  const navigate = useNavigate();

  // Toast Close
  const handleToastClose = () => {
    setShowToast({ isShown: false, type: "", message: null });
  };

  //Handle delete
  const handleDelete = (cellValues) => {
    //API CALL
    setOpenModal({ isShown: true, type: "delete", selectedUser: cellValues.row.staff_no, email: cellValues.row.email });
    //deleteStaff(cellValues.row.staff_no, toastDispatch);
  };

  //Handle Edit
  const handleEdit = (cellValues) => {
    navigate(`/users/staff/edit-staff/${cellValues.row.id}`);
  };

  //Handle Add
  const handleAdd = () => {
    navigate("/users/staff/add-staff");
  };

  useEffect(() => {
    //API CALL ON RENDER
    searchDispatch({ type: "SET_SEARCH_NULL" });
    getStaffData(staffDispatch);
  }, []);

  return (
    <div className="h-svh flex flex-col p-3 gap-3 bg-zinc-50">
      <span className="text-sm">
        <b>Users / Staff /</b> {path}
      </span>
      <div className="flex flex-col bg-white p-3 gap-5 rounded-md shadow-md ">
        <div className="flex justify-between">
          <span className="heading-text">Staff List</span>
          <div className="flex gap-2">
            <SearchInput searchData={staffState.staffList} />
            <AddButton name={"Add New Staff"} handleAdd={handleAdd} />
            <RefreshButton />
          </div>
        </div>
        <DataTable rows={searchState.searchResults ? searchState.searchResults : staffState.staffList} colHeaders={staffTableHeaders} handleEdit={handleEdit} handleDelete={handleDelete} />
      </div>
      <Modal
        isOpen={openModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: { backgroundColor: "rgb(0,0,0,0.2" },
        }}
        contentLabel=""
        className="w-[80%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5"
      >
        <DeleteConfirmation
          onCanel={() => {
            setOpenModal({ isShown: false });
          }}
          onDelete={() => {
            deleteStaff(openModal.selectedUser, setShowToast);
            setOpenModal({ isShown: false });
          }}
          email={openModal.email}
        />
      </Modal>
      <ToastMessage isShown={showToast.isShown} type={showToast.type} message={showToast.message} onClose={handleToastClose} />
    </div>
  );
}

export default Staff;
