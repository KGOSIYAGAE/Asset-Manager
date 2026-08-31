import React, { useEffect, useState } from "react";

import SearchInput from "../../../components/inputs/searchInput/SearchInput";
import AddButton from "../../../components/buttons/AddButton";
import RefreshButton from "../../../components/buttons/BulkAddButton";
import DataTable from "../../../components/dataGrid/DataTable";
import { staffTableHeaders } from "../../../utils/TableHeaders";
import { useStaffContext } from "../../../hooks/useStaffContext";
import { useSearchContext } from "../../../hooks/useSearchContext";
import { useNavigate } from "react-router-dom";
import ToastMessage from "../../../components/toastMessage/ToastMessage";
import { getStaffData, deleteStaff } from "../../../services/api/staff/Staff.Api";
import Modal from "react-modal";
import DeleteConfirmation from "../../../components/cards/deleteConfirmation/DeleteConfirmation";
import ImportFile from "../../../components/cards/importFile/ImportFile";
import BulkAddButton from "../../../components/buttons/BulkAddButton";
import { hasPermission } from "../../../utils/getLoggedInUser";
import ExportExcelButton from "../../../components/buttons/ExportExcelButton";
import { handleDeleteStaff } from "../../../utils/handleDeleteItem";

function Staff({ path }) {
  //Context
  const { staffState, staffDispatch } = useStaffContext();
  const { searchState, searchDispatch } = useSearchContext();
  const [showToast, setShowToast] = useState({ isShown: false, type: null, message: null });
  const [openModal, setOpenModal] = useState({ isShown: false, type: "delete", data: null });
  const [openImportModal, setOpenImportModal] = useState({ isShown: false, type: null, data: null });

  const navigate = useNavigate();

  //Set pagated data to the table
  const [allStaff, setAllStaff] = useState(null);

  const [pagationModel, setPagationModel] = useState({
    page: 0,
    pageSize: 8,
  });

  const [totalPages, setTotalPages] = useState(1);
  const [searchResults, setSearchResults] = useState(null);
  /////////////////////Handle Search Results////////////

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

  //Hanlde view details
  const handleViewDetails = (cellValues) => {
    navigate(`/users/staff/staff-details/${cellValues.row.staff_no}`);
  };

  //Handle Add
  const handleAdd = () => {
    navigate("/users/staff/add-staff");
  };

  //Import modal
  const ImportModal = () => {
    setOpenImportModal({ isShown: true, type: "issue", data: null });
  };

  //Handles search clear -> Sent to Search component
  const handleCancelSearch = () => {
    setSearchResults(null);
    getStaffData({ page: pagationModel.page, limit: pagationModel.pageSize }, setAllStaff, setTotalPages);
  };

  //Execute Gett All devices on load or status change
  useEffect(() => {
    getStaffData({ page: pagationModel.page, limit: pagationModel.pageSize }, setAllStaff, setTotalPages);
  }, [pagationModel.page, pagationModel.pageSize]);

  return (
    <div className="h-svh flex flex-col p-3 gap-3 bg-zinc-50">
      <span className="text-sm">
        <b>Users / Staff /</b> {path}
      </span>
      <div className="flex flex-col bg-white p-3 gap-5 rounded-md shadow-md ">
        <div className="flex flex-col lg:flex-row justify-between">
          <span className="heading-text">Staff List</span>
          <div className="flex lg:flex-row gap-6 lg:gap-2">
            <SearchInput tableName={"staff"} setSearchResults={setSearchResults} setTotalPages={setTotalPages} onCanelSearch={handleCancelSearch} />
            {hasPermission("create") && <AddButton name={"Add New Staff"} handleAdd={handleAdd} />}
            {hasPermission("import") && <BulkAddButton onClick={ImportModal} />}
            {hasPermission("export") && <ExportExcelButton />}
          </div>
        </div>
        <DataTable
          rows={searchResults ? searchResults : allStaff}
          colHeaders={staffTableHeaders}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleViewDetails={handleViewDetails}
          pagationModel={pagationModel}
          setPagationModel={setPagationModel}
          rowCount={totalPages}
        />
      </div>
      <Modal
        isOpen={openModal.isShown || openImportModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: { backgroundColor: "rgb(0,0,0,0.2" },
        }}
        contentLabel=""
        className="w-[60%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5"
      >
        {openModal.isShown ? (
          <DeleteConfirmation
            onCanel={() => {
              setOpenModal({ isShown: false });
              getStaffData({ page: pagationModel.page, limit: pagationModel.pageSize }, setAllStaff, setTotalPages);
            }}
            onSubmit={() => {
              setOpenModal({ isShown: false });
              getStaffData({ page: pagationModel.page, limit: pagationModel.pageSize }, setAllStaff, setTotalPages);
            }}
            onDelete={() => {
              handleDeleteStaff(openModal.selectedUser, setShowToast);
              setOpenModal({ isShown: false });
            }}
            email={openModal.email}
          />
        ) : openImportModal.isShown ? (
          <ImportFile
            type={"staff"}
            setShowToast={setShowToast}
            onClose={() => {
              setOpenImportModal({ isShown: false });
            }}
          />
        ) : (
          ""
        )}
      </Modal>

      <ToastMessage isShown={showToast.isShown} type={showToast.type} message={showToast.message} onClose={handleToastClose} />
    </div>
  );
}

export default Staff;
