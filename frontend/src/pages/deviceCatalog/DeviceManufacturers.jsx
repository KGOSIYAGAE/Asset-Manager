import React, { useEffect, useState } from "react";
import AddButton from "../../components/buttons/AddButton";
import ExportExcelButton from "../../components/buttons/ExportExcelButton";
import Modal from "react-modal";
import { hasPermission } from "../../utils/getLoggedInUser";
import DeleteConfirmation from "../../components/cards/deleteConfirmation/DeleteConfirmation";
import SearchInput from "../../components/inputs/searchInput/SearchInput";
import { useToast } from "../../context/ToastContext";
import { deleteManufacturer, getDeviceManufactures } from "../../services/api/ICT Assets/ICTAssets";
import DeviceManufacturersTable from "../../components/tables/DeviceManufacturersTable";
import CreateDeviceManufacturer from "../../components/cards/createDeviceManufacturer/CreateDeviceManufacturer";

function DeviceManufacturers({ path }) {
  const [openModal, setOpenModal] = useState({ isShown: false, type: null, data: null });

  const { showToast } = useToast();

  const [manufacturers, setManufacturers] = useState();
  const [searchResults, setSearchResults] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  useEffect(() => {
    getDeviceManufactures({ page: currentPage, limit: limit }, setManufacturers, setTotalPages);
  }, [currentPage]);

  //Handles search clear -> Sent to Search component
  const handleCancelSearch = () => {
    setSearchResults(null);
    getDeviceManufactures({ page: currentPage, limit: limit }, setManufacturers, setTotalPages);
  };

  return (
    <div className="h-svh flex flex-col p-3 gap-3 bg-zinc-50  ">
      <span className="text-sm ">
        Device-Catalog/ <b> {path}</b>
      </span>
      {/* */}
      <div className="col-span-6 h-auto  bg-white rounded-md shadow-md ">
        <div className="flex items-center justify-between rounded-md p-2  bg-white">
          <span className="heading-text ">{"Manufacturers"}</span>
          <div className="flex gap-2 ">
            <SearchInput tableName={"manufacturers"} setSearchResults={setSearchResults} setTotalPages={setTotalPages} onCanelSearch={handleCancelSearch} />

            {hasPermission("loan") && (
              <AddButton
                name={"Add Manufacturer"}
                handleAdd={() => {
                  setOpenModal({ isShown: true, type: "add-manufacturer", data: "hello" });
                }}
              />
            )}
            {hasPermission("export") && <ExportExcelButton />}
          </div>
        </div>{" "}
        <div className="flex p-2">
          <DeviceManufacturersTable
            manufacturers={searchResults ? searchResults : manufacturers}
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
        {openModal.type === "update-manufacturer" || openModal.type === "add-manufacturer" ? (
          <CreateDeviceManufacturer
            onCanel={() => {
              setOpenModal({ isShown: false });
              getDeviceManufactures({ page: currentPage, limit: limit }, setManufacturers, setTotalPages);
            }}
            onSubmit={() => {
              setOpenModal({ isShown: false });
              getDeviceManufactures({ page: currentPage, limit: limit }, setManufacturers, setTotalPages);
            }}
            modalType={openModal?.type}
            modalData={openModal?.data || null}
          />
        ) : (
          <DeleteConfirmation
            onCanel={() => {
              setOpenModal({ isShown: false });
              getDeviceManufactures({ page: currentPage, limit: limit }, setManufacturers, setTotalPages);
            }}
            onSubmit={() => {
              setOpenModal({ isShown: false });
              getDeviceManufactures({ page: currentPage, limit: limit }, setManufacturers, setTotalPages);
            }}
            onDelete={() => {
              deleteManufacturer(openModal?.data?.manufacturer_id, showToast);
            }}
            email={openModal?.data?.manufacturer_name}
          />
        )}
      </Modal>
    </div>
  );
}

export default DeviceManufacturers;
