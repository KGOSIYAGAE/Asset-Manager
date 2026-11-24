import React, { useEffect, useState } from "react";
import AddButton from "../../components/buttons/AddButton";
import ExportExcelButton from "../../components/buttons/ExportExcelButton";
import Modal from "react-modal";
import { hasPermission } from "../../utils/getLoggedInUser";
import DeleteConfirmation from "../../components/cards/deleteConfirmation/DeleteConfirmation";
import SearchInput from "../../components/inputs/searchInput/SearchInput";
import { useToast } from "../../context/ToastContext";
import { deleteCategory, getDeviceCategory } from "../../services/api/ICT Assets/ICTAssets";
import DeviceCategoriesTable from "../../components/tables/DeviceCategoriesTable";
import CreateDeviceCategory from "../../components/cards/createDeviceCategory/CreateDeviceCategory";

function DeviceCategories({ path }) {
  const [openModal, setOpenModal] = useState({ isShown: false, type: null, data: null });
  //const [showToast, setShowToast] = useState({ isShow: false, type: "", message: null });

  const { showToast } = useToast();

  const [categories, setCategories] = useState();
  const [searchResults, setSearchResults] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  useEffect(() => {
    getDeviceCategory({ page: currentPage, limit: limit }, setCategories, setTotalPages);
  }, [currentPage]);

  //Handles search clear -> Sent to Search component
  const handleCancelSearch = () => {
    setSearchResults(null);
    getDeviceCategory({ page: currentPage, limit: limit }, setCategories, setTotalPages);
  };

  return (
    <div className="h-svh flex flex-col p-3 gap-3 bg-zinc-50  ">
      <span className="text-sm ">
        Device-Catalog/ <b> {path}</b>
      </span>
      {/* */}
      <div className="col-span-6 h-auto  bg-white rounded-md shadow-md ">
        <div className="flex items-center justify-between rounded-md p-2  bg-white">
          <span className="heading-text ">{"Categories"}</span>
          <div className="flex gap-2 ">
            <SearchInput tableName={"categories"} setSearchResults={setSearchResults} setTotalPages={setTotalPages} onCanelSearch={handleCancelSearch} />

            {hasPermission("loan") && (
              <AddButton
                name={"Add Category"}
                handleAdd={() => {
                  setOpenModal({ isShown: true, type: "add-category", data: "hello" });
                }}
              />
            )}
            {hasPermission("export") && <ExportExcelButton />}
          </div>
        </div>{" "}
        <div className="flex p-2">
          <DeviceCategoriesTable
            categories={searchResults ? searchResults : categories}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            limit={limit}
            setOpenModal={setOpenModal}
          />
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
        {openModal.type === "update-category" || openModal.type === "add-category" ? (
          <CreateDeviceCategory
            onCanel={() => {
              setOpenModal({ isShown: false });
              getDeviceCategory({ page: currentPage, limit: limit }, setCategories, setTotalPages);
            }}
            onSubmit={() => {
              setOpenModal({ isShown: false });
              getDeviceCategory({ page: currentPage, limit: limit }, setCategories, setTotalPages);
            }}
            modalType={openModal?.type}
            modalData={openModal?.data || null}
          />
        ) : (
          <DeleteConfirmation
            onCanel={() => {
              setOpenModal({ isShown: false });
              getDeviceCategory({ page: currentPage, limit: limit }, setCategories, setTotalPages);
            }}
            onSubmit={() => {
              setOpenModal({ isShown: false });
              getDeviceCategory({ page: currentPage, limit: limit }, setCategories, setTotalPages);
            }}
            onDelete={() => {
              deleteCategory(openModal?.data?.category_id, showToast);
            }}
            email={openModal?.data?.category_name}
          />
        )}
      </Modal>
    </div>
  );
}

export default DeviceCategories;
