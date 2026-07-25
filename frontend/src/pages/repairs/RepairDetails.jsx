import React, { useEffect, useState } from "react";
import { getAllDeviceDetails } from "../../services/api/devices/Device.Api";
import { useParams } from "react-router-dom";
import { getRepair, getRepairProgress } from "../../services/api/repairs/Repairs.Api";
import { handleTimeStampToText } from "../../utils/dateConverter";
import { IoCheckmark } from "react-icons/io5";
import { MdRadioButtonChecked } from "react-icons/md";
import { hasPermission } from "../../utils/getLoggedInUser";
import AddButton from "../../components/buttons/AddButton";
import EditButton from "../../components/buttons/EditButton";
import SelectInput from "../../components/inputs/selectInputs/selectInput/SelectInput";
import { handleUpdateRepairStatus, repairStatusList } from "../../utils/deviceRepairsHelper";
import SubmitButton from "../../components/buttons/SubmitButton";
import { BsExclamationCircleFill } from "react-icons/bs";
import ToastMessage from "../../components/toastMessage/ToastMessage";
import Modal from "react-modal";
import CreateNewRepair from "../../components/cards/createNewRepair/CreateNewRepair";

function RepairDetails({ path }) {
  const [openModal, setOpenModal] = useState({ isShown: false, type: null, data: null });
  const [showToast, setShowToast] = useState({ isShown: false, type: null, message: null });

  const [repairDetails, setRepairDetails] = useState();
  const params = useParams();
  const [repairStatus, setRepairStatus] = useState("");
  const [repairProgress, setRepairProgress] = useState();

  const getRepairDetails = async () => {
    const { id } = params;

    if (!id) {
      return console.log("Selected device id not provided");
    }

    await getRepairProgress(id, setRepairProgress);

    return await getRepair(id, setRepairDetails);
  };

  const OnSubmit = () => {
    getRepairDetails();
  };

  useEffect(() => {
    getRepairDetails();
  }, []);

  useEffect(() => {
    if (repairDetails?.status_name) {
      setRepairStatus(repairDetails.status_name);
    }
  }, [repairDetails]);

  return (
    <div className=" flex flex-col p-3 gap-3 ">
      <span className="text-sm">
        <b>Repairs /</b> {path}
      </span>

      <div className="flex items-center justify-between bg-white p-3 gap-5 rounded-md shadow-md">
        <div>
          <p className="text-sm font-bold">
            {repairDetails?.repair_code} - {`${repairDetails?.make} ${repairDetails?.category}`}
          </p>
        </div>
        <div className="flex gap-5">
          {repairDetails?.status_name !== "Completed" ? (
            <div className="col-span-2">
              <SelectInput label={"Repair Status"} value={repairStatus} options={repairStatusList} optionName={"name"} isDisabled={false} setOnChange={setRepairStatus} onChoose={() => {}} />
            </div>
          ) : (
            ""
          )}
          <div className="flex gap-5">
            {repairDetails?.status_name && repairDetails?.status_name !== repairStatus ? (
              <SubmitButton
                text={"Update Status"}
                onClick={() => {
                  handleUpdateRepairStatus(repairDetails?.id, repairStatus, OnSubmit, setShowToast);
                }}
              />
            ) : (
              <EditButton
                name={"Edit"}
                handleAdd={() => {
                  setOpenModal({ isShown: true, type: "Edit", data: repairDetails });
                }}
              />
            )}
          </div>
        </div>
      </div>

      <div className=" grid grid-cols-12 grid-rows-1 gap-5 ">
        {/************************/}
        <div className="h-[450px] flex flex-col gap-2 col-span-4 row-span-1 border p-3 rounded-md shadow-md bg-white">
          <span className="heading-text">Repair Details</span>
          <div className="flex justify-between p-2 item-hover">
            <span className="text-sm">Repair ID</span>
            <span className="text-sm">{repairDetails?.repair_code}</span>
          </div>
          <div className="flex justify-between p-2 item-hover">
            <span className="text-sm">Status Name</span>
            <span className="text-sm">{repairDetails?.status_name}</span>
          </div>

          <div className="flex justify-between p-2 item-hover">
            <span className="text-sm">Device</span>
            <span className="text-sm">{`${repairDetails?.make} ${repairDetails?.category}`}</span>
          </div>
          <div className="flex justify-between p-2 item-hover">
            <span className="text-sm">Repair Type</span>
            <span className="text-sm">{repairDetails?.repair_type}</span>
          </div>
          <div className="flex justify-between p-2 item-hover">
            <span className="text-sm">Date Scheduled / Created</span>
            <span className="text-sm">
              {" "}
              {(() => {
                return handleTimeStampToText(repairDetails?.date_created);
              })()}
            </span>
          </div>
          <div className="flex justify-between p-2 item-hover">
            <span className="text-sm">Technician</span>
            <span className="text-sm">{repairDetails?.technican_name}</span>
          </div>
          <div className="flex flex-col gap-2 justify-between p-2 item-hover">
            <span className="text-sm">Description</span>
            <span className="text-sm">{repairDetails?.description}</span>
          </div>
          <div className="flex flex-col gap-2 justify-between p-2 item-hover">
            <span className="text-sm">Notes</span>
            <span className="text-sm">{repairDetails?.notes}</span>
          </div>
        </div>
        {/************************/}
        <div className="h-[450px] flex flex-col gap-2 col-span-4 row-span-1 border p-3 rounded-md shadow-md bg-white ">
          <span className="heading-text">Repair Progress</span>
          <div className="h-[450px] flex gap-5  reletive overflow-y-auto">
            <div className="flex flex-col items-center">
              {repairProgress &&
                repairProgress.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    {index === repairProgress?.length - 1 ? (
                      <div>
                        {item.status_name === "Completed" ? (
                          <div className="w-[18px] h-[18px] flex items-center justify-center bg-green-500  rounded-full text-white">
                            <IoCheckmark size={10} />
                          </div>
                        ) : item.status_name === "Beyond Repair" ? (
                          <div className="w-[18px] h-[18px] flex items-center justify-center bg-red-500  rounded-full text-white">
                            <BsExclamationCircleFill size={10} />
                          </div>
                        ) : (
                          <div key={index} className={`w-[18px] h-[18px] flex items-center justify-center bg-orange-500  rounded-full text-white`}>
                            <MdRadioButtonChecked size={10} />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div key={index} className={`w-[18px] h-[18px] flex items-center justify-center bg-green-500  rounded-full text-white`}>
                        <IoCheckmark size={10} />
                      </div>
                    )}

                    {index !== repairProgress?.length - 1 && <div className={`h-[38px] border  bg-gray-200`}></div>}
                  </div>
                ))}
            </div>
            <div className="w-full flex flex-col gap-5 text-sm ">
              {repairProgress &&
                repairProgress.map((item, index) => (
                  <div key={index} className="flex flex-col">
                    <span className="font-semibold">{item.status_name}</span>
                    <span className="text-[11px]">{new Date(item.changed_at).toLocaleString()}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/************************/}
        <div className="h-[450px] flex flex-col gap-2 col-span-4 row-span-1 border p-3 rounded-md shadow-md bg-white">
          <span className="heading-text">Device Details</span>
          <div className="flex justify-between p-2 item-hover">
            <span className="text-sm">Device Category</span>
            <span className="text-sm">{repairDetails?.category}</span>
          </div>
          <div className="flex justify-between  p-2 item-hover">
            <span className="text-sm">Make</span>
            <span className="text-sm">{repairDetails?.make}</span>
          </div>
          <div className="flex justify-between  p-2 item-hover">
            <span className="text-sm">Model</span>
            <span className="text-sm">{repairDetails?.model}</span>
          </div>
          <div className="flex justify-between  p-2 item-hover">
            <span className="text-sm">Asset Tag</span>
            <span className="text-sm">{repairDetails?.asset_tag}</span>
          </div>
          <div className="flex justify-between  p-2 item-hover">
            <span className="text-sm">Serial Number</span>
            <span className="text-sm">{repairDetails?.serial_no}</span>
          </div>
          <div className="flex justify-between  p-2 item-hover">
            <span className="text-sm">Device Condition</span>
            <span className="text-sm">{repairDetails?.device_condition}</span>
          </div>

          <div className="flex justify-between  p-2 item-hover">
            <span className="text-sm">Device Status</span>
            <span className="text-sm">{repairDetails?.status}</span>
          </div>

          <div className="flex justify-between  p-2 item-hover">
            <span className="text-sm">Device Operational State</span>
            <span className="text-sm">{repairDetails?.operational_state}</span>
          </div>
          <div className="flex justify-between  p-2 item-hover">
            <span className="text-sm">Warranty End Date</span>
            <span className="text-sm">
              {(() => {
                return handleTimeStampToText(repairDetails?.warranty_end_date);
              })()}
            </span>
          </div>
        </div>
        {/************************/}
      </div>
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
        <CreateNewRepair
          onCanel={() => {
            getRepairDetails();
            setOpenModal({ isShown: false });
          }}
          type={"Edit"}
          data={openModal.data}
          onSubmit={() => {
            getRepairDetails();
            setOpenModal({ isShown: false });
          }}
          setShowToast={setShowToast}
        />
      </Modal>
      <ToastMessage isShown={showToast.isShown} type={showToast.type} message={showToast.message} onClose={() => setShowToast({ isShown: false })} />
    </div>
  );
}

export default RepairDetails;
