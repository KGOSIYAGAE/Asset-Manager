import React, { useEffect, useState } from "react";
import { getAllDeviceForApproval, getAllDevices } from "../../services/api/devices/Device.Api";
import ToastMessage from "../../components/toastMessage/ToastMessage";
import { useDeviceContext } from "../../hooks/useDevicesContext";
import DevicesRequiresApprovalTable from "../../components/tables/DevicesRequireApprovalTable";
import SearchInput from "../../components/inputs/searchInput/SearchInput";
import { useSearchContext } from "../../hooks/useSearchContext";
import { getRequiresApprovalDevices } from "../../utils/devicesHelperMethods";
import { getLoggedInUser, hasPermission } from "../../utils/getLoggedInUser";
import AddButton from "../../components/buttons/AddButton";
import { MdDevices, MdNewReleases, MdOutlineFlightTakeoff } from "react-icons/md";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { TbProgressAlert, TbProgressCheck, TbProgressDown } from "react-icons/tb";
import { FaRegCheckCircle } from "react-icons/fa";
import Modal from "react-modal";
import DeviceMaintenanceRepairs from "../../components/tables/DeviceMaintenanceRepairs";
import CreateNewLoan from "../../components/cards/createNewLoan/CreateNewLoan";
import CreateNewRepair from "../../components/cards/createNewRepair/CreateNewRepair";
import { getAllRepairs, getAllRepairsForTech, getAllRepairsStats, getAllRepairsStatsForTech } from "../../services/api/repairs/Repairs.Api";
import { filterItems } from "../../utils/deviceRepairsHelper";
import LoanIssueForm from "../../components/LoanForms/LoanIssueForm";
import RepairForm from "../../components/repairForm/RepairForm";

function Repairs({ path }) {
  const [openModal, setOpenModal] = useState({ isShown: false, type: null, data: null });
  const [showToast, setShowToast] = useState({ isShown: false, type: "", message: null });
  const [maintenanceDevices, setMaintenanceDevices] = useState(null);

  //Set avtive effect of the filter bar

  const [active, setActive] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  const [allRepairsStats, setAllRepairsStats] = useState(null);

  const [statusFilter, setStatusFilter] = useState("All");

  const [searchResults, setSearchResults] = useState(null);
  const [tableName, setTableName] = useState("repairs");
  /////////////////////Handle Search Results////////////

  const handleGetPage = () => {
    getAllRepairs({ page: currentPage, limit: limit, userId: user?.id, status: statusFilter }, setMaintenanceDevices, setTotalPages);
  };

  //Handles search clear -> Sent to Search component
  const handleCancelSearch = () => {
    setSearchResults(null);

    setActive("All");

    const user = getLoggedInUser();

    if (user?.role === "support_admin") {
      setTableName("repairs");
      getAllRepairs({ page: currentPage, limit: limit, status: statusFilter }, setMaintenanceDevices, setTotalPages);
      getAllRepairsStats(setAllRepairsStats);
    } else {
      setTableName("tech-repairs");
      getAllRepairsForTech({ page: currentPage, limit: limit, userId: user?.id, status: statusFilter }, setMaintenanceDevices, setTotalPages);
      getAllRepairsStatsForTech({ userId: user?.id }, setAllRepairsStats);
    }
  };

  const handleSwitcFilterTab = () => {
    const user = getLoggedInUser();

    if (user?.role === "support_admin") {
      setTableName("repairs");
      getAllRepairs({ page: currentPage, limit: limit, status: statusFilter }, setMaintenanceDevices, setTotalPages);
      getAllRepairsStats(setAllRepairsStats);
    } else {
      setTableName("tech-repairs");
      getAllRepairsForTech({ page: currentPage, limit: limit, userId: user?.id, status: statusFilter }, setMaintenanceDevices, setTotalPages);
      getAllRepairsStatsForTech({ userId: user?.id }, setAllRepairsStats);
    }
  };

  //Handle on form print
  const handleOnPrint = () => {
    let printContents = document.getElementById("print-file").innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  //Handle view form
  const handleViewRepairForm = () => {
    setOpenModal({ isShown: true, type: "repair-form", data: "hello" });
  };

  //Execute Gett All devices on load or status change
  useEffect(() => {
    const user = getLoggedInUser();

    if (user?.role === "support_admin") {
      getAllRepairs({ page: currentPage, limit: limit, status: statusFilter }, setMaintenanceDevices, setTotalPages);
      getAllRepairsStats(setAllRepairsStats);
    } else {
      getAllRepairsForTech({ page: currentPage, limit: limit, userId: user?.id, status: statusFilter }, setMaintenanceDevices, setTotalPages);
      getAllRepairsStatsForTech({ userId: user?.id }, setAllRepairsStats);
    }
  }, [currentPage]);

  useEffect(() => {
    handleSwitcFilterTab();
  }, [statusFilter]);

  useEffect(() => {
    setActive("All");
  }, [searchResults]);

  return (
    <div className="h-svh flex flex-col p-3  bg-zinc-50">
      <span className="text-sm ">
        <b> {path}</b>
      </span>
      <div className="flex flex-col  gap-2">
        <div className="flex  justify-between sticky top-0 p-5 bg-white rounded-md">
          <span className="heading-text ">Device Maintenance & Repairs</span>
          <div className="flex gap-5">
            {hasPermission("create-repair") && (
              <AddButton
                name={"Create New Repair"}
                handleAdd={() => {
                  setOpenModal({ isShown: true, type: "Add", data: "hello" });
                }}
              />
            )}
          </div>
        </div>

        {/* */}
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-6 grid-rows-1 gap-3">
            {/* */}
            <div className="h-[80px] flex items-center bg-white gap-3 border shadow-md rounded-md p-5">
              <div className="w-[40px] h-[40px] flex items-center justify-center bg-purple-50 border border-purple-600 rounded-full">
                <HiOutlineWrenchScrewdriver size={25} className="text-purple-600" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-black ">All Repairs</span>
                <span className="font-bold text-xl">{allRepairsStats?.total_repairs}</span>
              </div>
            </div>
            {/* */}
            <div className="h-[80px] flex items-center bg-white gap-3 border shadow-md rounded-md p-5">
              <div className="w-[40px] h-[40px] flex items-center justify-center bg-red-50 border border-red-600 rounded-full">
                <MdNewReleases size={25} className="text-red-600" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-black">New</span>
                <span className="font-bold text-xl">{allRepairsStats?.new_repairs}</span>
              </div>
            </div>
            {/* */}
            {/* */}
            <div className="h-[80px] flex items-center bg-white gap-3 border shadow-md rounded-md p-5">
              <div className="w-[40px] h-[40px] flex items-center justify-center bg-red-50 border border-red-600 rounded-full">
                <TbProgressDown size={25} className="text-red-600" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-black">Awaiting Parts</span>
                <span className="font-bold text-xl">{allRepairsStats?.overdue_repairs}</span>
              </div>
            </div>
            {/* */}
            {/* */}
            <div className="h-[80px] flex items-center bg-white gap-3 border shadow-md rounded-md p-5">
              <div className="w-[40px] h-[40px] flex items-center justify-center bg-orange-50 border border-orange-600 rounded-full">
                <TbProgressCheck size={25} className="text-orange-600" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-black">In progress</span>
                <span className="font-bold text-xl">{allRepairsStats?.in_progress}</span>
              </div>
            </div>
            {/* */}
            {/* */}
            <div className="h-[80px] flex items-center bg-white gap-3 border shadow-md rounded-md p-3">
              <div className="w-[40px] h-[40px] flex items-center justify-center bg-blue-50 border border-blue-600 rounded-full">
                <MdOutlineFlightTakeoff size={20} className="text-blue-600" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-black ">Ready For Collection</span>
                <span className="font-bold text-xl">{allRepairsStats?.ready_for_collection}</span>
              </div>
            </div>
            {/* */}

            <div className="h-[80px] flex items-center bg-white gap-3 border shadow-md rounded-md p-5">
              <div className="w-[40px] h-[40px] flex items-center justify-center bg-green-50 border border-green-600 rounded-full">
                <FaRegCheckCircle size={25} className="text-green-600" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-black">Completed</span>
                <span className="font-bold text-xl">{allRepairsStats?.completed}</span>
              </div>
            </div>
          </div>
        </div>
        {/* */}

        <div className="flex flex-col">
          <div className="bg-white rounded-md shadow-md p-2">
            <div className="flex justify-between gap-3">
              <div className="repair-filer">
                {filterItems.map((item, index) => (
                  <span
                    key={index}
                    className={`repair-filer-item ${active === item ? "active" : ""}`}
                    onClick={() => {
                      setActive(item);
                      setStatusFilter(item);
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="w-fit flex p-2">
                <SearchInput tableName={tableName} setSearchResults={setSearchResults} setTotalPages={setTotalPages} onCanelSearch={handleCancelSearch} />
              </div>
            </div>
            {/**searchResults ? searchResults : */}
            <DeviceMaintenanceRepairs
              repairs={searchResults ? searchResults : maintenanceDevices}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              limit={limit}
              viewForm={handleViewRepairForm}
            />
          </div>
        </div>
      </div>

      <Modal
        isOpen={openModal.isShown}
        onRequestClose={() => {
          setOpenModal({ isShown: false });
          handleCancelSearch();
        }}
        style={{
          overlay: { backgroundColor: "rgb(0,0,0,0.2)" },
        }}
        contentLabel=""
        className={`${
          openModal.type === "release" ? "w-[80%] max-h-3/4 bg-white" : openModal.type === "assign" ? "w-[80%] max-h-3/4 bg-white" : "w-[50%] max-h-full bg-white"
        } rounded-md mx-auto mt-14 p-5 overflow-auto`}
      >
        {openModal.type === "Add" ? (
          <CreateNewRepair
            onCanel={() => {
              setOpenModal({ isShown: false });
              handleCancelSearch();
            }}
            type={openModal.type}
            onSubmit={() => {
              setOpenModal({ isShown: false });
              handleCancelSearch();
            }}
            setShowToast={setShowToast}
          />
        ) : (
          <div className="h-[1100px] col-span-6 bg-white " id="print-file">
            {/*<LoanIssueForm handleOnPrint={handleOnPrint} deviceId={deviceDetails?.id} user_id={deviceDetails?.current_user_id} deviceDetails_={deviceDetails} />*/}
            <RepairForm />
          </div>
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

export default Repairs;
