import React, { useEffect, useState } from "react";
import AddButton from "../../components/buttons/AddButton";
import ExportExcelButton from "../../components/buttons/ExportExcelButton";
import Modal from "react-modal";

import { hasPermission } from "../../utils/getLoggedInUser";

import DeleteConfirmation from "../../components/cards/deleteConfirmation/DeleteConfirmation";

import SearchInput from "../../components/inputs/searchInput/SearchInput";
import { useToast } from "../../context/ToastContext";
import { deleteModel, getDeviceModels } from "../../services/api/ICT Assets/ICTAssets";
import DeviceModelsTable from "../../components/tables/DeviceModelsTable";
import CreateDeviceModel from "../../components/cards/createDeviceModel/CreateDeviceModel";

function DeviceModels({ path }) {
  const [openModal, setOpenModal] = useState({ isShown: false, type: null, data: null });

  const { showToast } = useToast();

  const [models, setModels] = useState();
  const [searchResults, setSearchResults] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  useEffect(() => {
    getDeviceModels({ page: currentPage, limit: limit }, setModels, setTotalPages);
  }, [currentPage]);

  //Handles search clear -> Sent to Search component
  const handleCancelSearch = () => {
    setSearchResults(null);
    getDeviceModels({ page: currentPage, limit: limit }, setModels, setTotalPages);
  };

  return (
    <div className="h-svh flex flex-col p-3 gap-3 bg-zinc-50  ">
      <span className="text-sm ">
        Device-Catalog/ <b> {path}</b>
      </span>
      {/* */}
      <div className="col-span-6 h-auto  bg-white rounded-md shadow-md ">
        <div className="flex items-center justify-between rounded-md p-2  bg-white">
          <span className="heading-text ">{"Models"}</span>
          <div className="flex gap-2 ">
            <SearchInput tableName={"models"} setSearchResults={setSearchResults} setTotalPages={setTotalPages} onCanelSearch={handleCancelSearch} />
            {hasPermission("loan") && (
              <AddButton
                name={"Add Model"}
                handleAdd={() => {
                  setOpenModal({ isShown: true, type: "add-model", data: "hello" });
                }}
              />
            )}
            {hasPermission("export") && <ExportExcelButton />}
          </div>
        </div>{" "}
        <div className="flex p-2">
          <DeviceModelsTable
            models={searchResults ? searchResults : models}
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
        {openModal.type === "update-model" || openModal.type === "add-model" ? (
          <CreateDeviceModel
            onCanel={() => {
              setOpenModal({ isShown: false });
              getDeviceModels({ page: currentPage, limit: limit }, setModels, setTotalPages);
            }}
            onSubmit={() => {
              setOpenModal({ isShown: false });
              getDeviceModels({ page: currentPage, limit: limit }, setModels, setTotalPages);
            }}
            modalType={openModal?.type}
            modalData={openModal?.data || null}
          />
        ) : (
          <DeleteConfirmation
            onCanel={() => {
              setOpenModal({ isShown: false });
              getDeviceModels({ page: currentPage, limit: limit }, setModels, setTotalPages);
            }}
            onSubmit={() => {
              setOpenModal({ isShown: false });
              getDeviceModels({ page: currentPage, limit: limit }, setModels, setTotalPages);
            }}
            onDelete={() => {
              deleteModel(openModal?.data?.model_id, showToast);
            }}
            email={openModal?.data?.model_name}
          />
        )}
      </Modal>
    </div>
  );
}

export default DeviceModels;
