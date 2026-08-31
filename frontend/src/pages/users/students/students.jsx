import React, { useEffect, useState } from "react";
import SearchInput from "../../../components/inputs/searchInput/SearchInput";
import AddButton from "../../../components/buttons/AddButton";
import { useNavigate } from "react-router-dom";
import DataTable from "../../../components/dataGrid/DataTable";
import { studentsTableHeaders } from "../../../utils/TableHeaders";
import { useSearchContext } from "../../../hooks/useSearchContext";
import { useStudentsContext } from "../../../hooks/useStudentsContext";
import { deleteStudent, getAllStudents } from "../../../services/api/students/Students.Api";
import ToastMessage from "../../../components/toastMessage/ToastMessage";
import Modal from "react-modal";
import DeleteConfirmation from "../../../components/cards/deleteConfirmation/DeleteConfirmation";
import BulkAddButton from "../../../components/buttons/BulkAddButton";
import ExportExcelButton from "../../../components/buttons/ExportExcelButton";
import ImportFile from "../../../components/cards/importFile/ImportFile";
import { hasPermission } from "../../../utils/getLoggedInUser";
import { handleDeleteStudent } from "../../../utils/handleDeleteItem";

function students({ path }) {
  const [showToast, setShowToast] = useState({ isShown: false, type: null, message: null });
  const [openModal, setOpenModal] = useState({ isShown: false, type: "delete", selcetedUser: null, userEmail: null });
  const [openImportModal, setOpenImportModal] = useState({ isShown: false, type: null, data: null });

  const navigate = useNavigate();

  //Set pagated data to the table
  const [allStudents, setAllStudents] = useState(null);

  const [pagationModel, setPagationModel] = useState({
    page: 0,
    pageSize: 8,
  });

  const [totalPages, setTotalPages] = useState(1);
  const [searchResults, setSearchResults] = useState(null);
  /////////////////////Handle Search Results////////////

  //Close Toast
  const onToastClose = () => {
    setShowToast({ isShown: false });
  };
  //Hanlde Edit
  const handleEdit = (cellValues) => {
    navigate(`/users/students/edit-student/${cellValues.row.student_number}`);
  };

  //Hanlde view details
  const handleViewDetails = (cellValues) => {
    navigate(`/users/students/student-details/${cellValues.row.student_number}`);
  };

  //Hanlde delete
  const handleDelete = (cellValues) => {
    setOpenModal({ isShown: true, type: "delete", selcetedUser: cellValues.row.student_number, userEmail: cellValues.row.email });
  };

  //Handle Add
  const handleAdd = () => {
    navigate("/users/students/add-student");
  };

  //Import modal
  const ImportModal = () => {
    setOpenImportModal({ isShown: true, type: "issue", data: null });
  };

  //Handles search clear -> Sent to Search component
  const handleCancelSearch = () => {
    setSearchResults(null);
    getAllStudents({ page: pagationModel.page, limit: pagationModel.pageSize }, setAllStudents, setTotalPages);
  };

  //Execute Gett All devices on load or status change
  useEffect(() => {
    getAllStudents({ page: pagationModel.page, limit: pagationModel.pageSize }, setAllStudents, setTotalPages);
  }, [pagationModel.page, pagationModel.pageSize]);

  return (
    <div className="h-svh flex flex-col p-3 gap-3 bg-zinc-50">
      <span className="text-sm">
        <b>Users / Students /</b> {path}
      </span>
      <div className="flex flex-col bg-white p-3 gap-5 rounded-md shadow-md">
        <div className="flex flex-col lg:flex-row justify-between">
          <span className="heading-text">Students List</span>
          <div className="flex gap-6 lg:gap-2">
            <SearchInput tableName={"students"} setSearchResults={setSearchResults} setTotalPages={setTotalPages} onCanelSearch={handleCancelSearch} />
            {hasPermission("create") && <AddButton name={"Add New Student"} handleAdd={handleAdd} />}

            {hasPermission("import") && <BulkAddButton onClick={ImportModal} />}
            {hasPermission("export") && <ExportExcelButton />}
          </div>
        </div>
        <DataTable
          rows={searchResults ? searchResults : allStudents}
          colHeaders={studentsTableHeaders}
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
        ariaHideApp={false}
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
              getAllStudents({ page: pagationModel.page, limit: pagationModel.pageSize }, setAllStudents, setTotalPages);
            }}
            onSubmit={() => {
              setOpenModal({ isShown: false });
              getAllStudents({ page: pagationModel.page, limit: pagationModel.pageSize }, setAllStudents, setTotalPages);
            }}
            onDelete={() => {
              handleDeleteStudent(openModal.selcetedUser, setShowToast);
              setOpenModal({ isShown: false });
            }}
            email={openModal.userEmail}
          />
        ) : openImportModal.isShown ? (
          <ImportFile
            type={"students"}
            setShowToast={setShowToast}
            onClose={() => {
              setOpenImportModal({ isShown: false });
            }}
          />
        ) : (
          ""
        )}
      </Modal>
      <ToastMessage isShown={showToast.isShown} type={showToast.type} message={showToast.message} onClose={onToastClose} />
    </div>
  );
}

export default students;
