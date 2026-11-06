import React, { useEffect, useState } from "react";
import AddButton from "../../components/buttons/AddButton";
import ExportExcelButton from "../../components/buttons/ExportExcelButton";
import Modal from "react-modal";
import ToastMessage from "../../components/toastMessage/ToastMessage";
import { hasPermission } from "../../utils/getLoggedInUser";
import { deleteDepartment, deleteFaculty, getDepartments } from "../../services/api/organization/Organization";
import DepartmentsTable from "../../components/tables/DepratmentsTable";
import DeleteConfirmation from "../../components/cards/deleteConfirmation/DeleteConfirmation";
import SearchInput from "../../components/inputs/searchInput/SearchInput";
import CoursesTable from "../../components/tables/CoursesTable";
import { getCourses } from "../../services/api/academics/Academics";
import CreateCourse from "../../components/cards/createDepartment copy/CreateCourse";
import { useToast } from "../../context/ToastContext";

function Courses({ path }) {
  const [openModal, setOpenModal] = useState({ isShown: false, type: null, data: null });

  const { showToast } = useToast();

  const [courses, setCourses] = useState();
  const [searchResults, setSearchResults] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  useEffect(() => {
    getCourses({ page: currentPage, limit: limit }, setCourses, setTotalPages);
  }, [currentPage]);

  //Handles search clear -> Sent to Search component
  const handleCancelSearch = () => {
    setSearchResults(null);
    getCourses({ page: currentPage, limit: limit }, setCourses, setTotalPages);
  };

  return (
    <div className="h-svh flex flex-col p-3 gap-3 bg-zinc-50  ">
      <span className="text-sm ">
        Academic/ <b> {path}</b>
      </span>
      {/* */}
      <div className="col-span-6 h-auto  bg-white rounded-md shadow-md ">
        <div className="flex items-center justify-between rounded-md p-2  bg-white">
          <span className="heading-text ">{"Courses"}</span>
          <div className="flex gap-2 ">
            {/*<SearchInput tableName={"departments"} setSearchResults={setSearchResults} setTotalPages={setTotalPages} onCanelSearch={handleCancelSearch} />*/}

            {hasPermission("loan") && (
              <AddButton
                name={"Add Course"}
                handleAdd={() => {
                  setOpenModal({ isShown: true, type: "add-course", data: "hello" });
                }}
              />
            )}
            {hasPermission("export") && <ExportExcelButton />}
          </div>
        </div>{" "}
        <div className="flex p-2">
          <CoursesTable courses={searchResults ? searchResults : courses} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} limit={limit} setOpenModal={setOpenModal} />
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
        {openModal.type === "update-course" || openModal.type === "add-course" ? (
          <CreateCourse
            onCanel={() => {
              setOpenModal({ isShown: false });
              getCourses({ page: currentPage, limit: limit }, setCourses, setTotalPages);
            }}
            onSubmit={() => {
              setOpenModal({ isShown: false });
              getCourses({ page: currentPage, limit: limit }, setCourses, setTotalPages);
            }}
            modalType={openModal?.type}
            modalData={openModal?.data || null}
          />
        ) : (
          <DeleteConfirmation
            onCanel={() => {
              setOpenModal({ isShown: false });
              getCourses({ page: currentPage, limit: limit }, setCourses, setTotalPages);
            }}
            onSubmit={() => {
              setOpenModal({ isShown: false });
              getCourses({ page: currentPage, limit: limit }, setCourses, setTotalPages);
            }}
            onDelete={() => {
              deleteDepartment(openModal?.data?.department_id, showToast);
            }}
            email={openModal?.data?.department_name}
          />
        )}
      </Modal>
    </div>
  );
}

export default Courses;
