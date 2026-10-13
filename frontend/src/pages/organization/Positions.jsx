import React, { useEffect, useState } from "react";
import AddButton from "../../components/buttons/AddButton";
import ExportExcelButton from "../../components/buttons/ExportExcelButton";
import Modal from "react-modal";
import ToastMessage from "../../components/toastMessage/ToastMessage";
import { hasPermission } from "../../utils/getLoggedInUser";
import { deletePostion, getPositions } from "../../services/api/organization/Organization";
import DeleteConfirmation from "../../components/cards/deleteConfirmation/DeleteConfirmation";
import PositionsTable from "../../components/tables/PositionsTable";
import CreatePosition from "../../components/cards/createPosition/CreatePosition";

function Positions({ path }) {
  const [openModal, setOpenModal] = useState({ isShown: false, type: null, data: null });
  const [showToast, setShowToast] = useState({ isShow: false, type: "", message: null });

  const [positions, setPositions] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  useEffect(() => {
    getPositions({ page: currentPage, limit: limit }, setPositions, setTotalPages);
  }, [currentPage]);

  return (
    <div className="h-svh flex flex-col p-3 gap-3 bg-zinc-50  ">
      <span className="text-sm ">
        Organization/ <b> {path}</b>
      </span>
      {/* */}
      <div className="col-span-6 h-auto  bg-white rounded-md shadow-md ">
        <div className="flex items-center justify-between rounded-md p-2  bg-white">
          <span className="heading-text ">{"Positions"}</span>
          <div className="flex gap-2 ">
            {hasPermission("loan") && (
              <AddButton
                name={"Add Position"}
                handleAdd={() => {
                  setOpenModal({ isShown: true, type: "add-position", data: "hello" });
                }}
              />
            )}
            {hasPermission("export") && <ExportExcelButton />}
          </div>
        </div>{" "}
        <div className="flex p-2">
          <PositionsTable positions={positions} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} limit={limit} setOpenModal={setOpenModal} />
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
        {openModal.type === "update-position" || openModal.type === "add-position" ? (
          <CreatePosition
            onCanel={() => {
              setOpenModal({ isShown: false });
              getPositions({ page: currentPage, limit: limit }, setPositions, setTotalPages);
            }}
            onSubmit={() => {
              setOpenModal({ isShown: false });
              getPositions({ page: currentPage, limit: limit }, setPositions, setTotalPages);
            }}
            setShowToast={setShowToast}
            modalType={openModal?.type}
            modalData={openModal?.data || null}
          />
        ) : (
          <DeleteConfirmation
            onCanel={() => {
              setOpenModal({ isShown: false });
              getPositions({ page: currentPage, limit: limit }, setPositions, setTotalPages);
            }}
            onSubmit={() => {
              setOpenModal({ isShown: false });
              getPositions({ page: currentPage, limit: limit }, setPositions, setTotalPages);
            }}
            onDelete={() => {
              deletePostion(openModal?.data?.position_id, setShowToast);
            }}
            email={openModal?.data?.post_name}
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

export default Positions;
