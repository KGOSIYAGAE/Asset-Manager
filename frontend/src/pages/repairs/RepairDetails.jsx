import React, { useEffect, useState } from "react";
import { getAllDeviceDetails } from "../../services/api/devices/Device.Api";
import { useParams } from "react-router-dom";
import { getRepair, getRepairProgress } from "../../services/api/repairs/Repairs.Api";
import { handleTimeStampToText } from "../../utils/dateConverter";
import { IoCheckmark } from "react-icons/io5";
import { MdFileOpen, MdRadioButtonChecked } from "react-icons/md";
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
import RepairForm from "../../components/repairForm/RepairForm";
import PrintButton from "../../components/buttons/printButton/PrintButton";
import QrCodeCard from "../../components/cards/qrCodeCard/QrCodeCard";
import CancelButton from "../../components/buttons/CancelButton";
import { getSession } from "../../services/api/testApi/Test.Api";
import { socket } from "../../utils/socket";
import BlankCard from "../../components/cards/blackCard/BlankCard";

function RepairDetails({ path }) {
  const [openModal, setOpenModal] = useState({ isShown: false, type: null, data: null });
  const [showToast, setShowToast] = useState({ isShown: false, type: null, message: null });

  const [repairDetails, setRepairDetails] = useState();
  const params = useParams();
  const [repairStatus, setRepairStatus] = useState("");
  const [repairProgress, setRepairProgress] = useState();
  const [qrCodeURL, setQrCodeURL] = useState(null);
  const [session, setSession] = useState(null);

  //Set up URL to collect signature on laptop collection
  const getURL = async () => {
    const data = await getSession();
    setSession(data);

    return setQrCodeURL(` http://192.168.8.4:5173/sign-form/${repairDetails?.current_user_id}/${data?.sessionId}/${data?.tempToken}`);
  };

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

  //Handle view form
  const handleViewRepairForm = () => {
    setOpenModal({ isShown: true, type: "repair-details", data: "hello" });
  };

  //Listen for signature capture
  // Move this helper block into your component scope:
  const bindSignatureListener = () => {
    // 1. Double check the core socket pipe line state
    if (!socket.connected) {
      console.log("🛠️ RepairDetails: Socket offline, establishing connection...");
      socket.connect();
    }

    console.log("🟢 Laptop actively listening for signature_saved event...");

    // 2. Kill any stale, lingering copies of this listener to prevent duplicates
    socket.off("signature_saved");

    // 3. Listen for the response
    socket.on("signature_saved", (image) => {
      console.log("🎉 SUCCESS! Signature capture confirmed!");

      // 4. Update your database record status to "Collected" through your API
      handleUpdateRepairStatus(
        repairDetails?.id,
        "Collected",
        () => {
          getRepairDetails(); // Refresh local repair progress layouts on screen
          setOpenModal({ isShown: false, type: null, data: null });
        },
        setShowToast,
      );

      // 5. Unsubscribe cleanly since the action is completed
      socket.off("signature_saved");
      socket.disconnect();
    });
  };

  // Clean up globally when navigating away from the page entirely
  useEffect(() => {
    return () => {
      socket.off("signature_saved");
    };
  }, []);

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
          {repairDetails?.status_name !== "Closed" ? (
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
                onClick={async () => {
                  if (repairStatus === "Collected") {
                    setOpenModal({ isShown: true, type: "capture-signature", data: repairDetails });
                  } else {
                    handleUpdateRepairStatus(repairDetails?.id, repairStatus, OnSubmit, setShowToast);
                  }
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

      <div className=" grid lg:grid-cols-12 lg:grid-rows-1 gap-5 ">
        {/************************/}
        <div className=" flex flex-col gap-2 col-span-4 row-span-1 border p-3 rounded-md shadow-md bg-white">
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
        <div className=" flex flex-col gap-2 col-span-4 row-span-1 border p-3 rounded-md shadow-md bg-white ">
          <span className="heading-text">Repair Progress</span>
          <div className="max-h-[400px] lg:h-[450px] flex gap-5  reletive overflow-y-auto">
            <div className="flex flex-col items-center">
              {repairProgress &&
                repairProgress.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    {index === repairProgress?.length - 1 ? (
                      <div>
                        {item.status_name === "Closed" ? (
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
        <div className=" flex flex-col gap-2 col-span-4 row-span-1 border p-3 rounded-md shadow-md bg-white">
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
      <div className="w-full flex justify-end ">
        <div
          className="flex items-center gap-3 text-gray-600 bg-gray-100 p-1 rounded-md border border-gray-600 cursor-pointer"
          onClick={() => {
            handleViewRepairForm();
          }}
        >
          <span>Open Form</span>
          <MdFileOpen text={"Open Form"} />
        </div>
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
          openModal.type === "release" ? "lg:w-[80%] lg:max-h-3/4" : openModal.type === "assign" ? "lg:w-[80%] lg:max-h-3/4 " : "w-[90%] lg:w-[50%] lg:max-h-full "
        } bg-white rounded-md mx-auto mt-14 p-5 overflow-auto`}
      >
        {openModal.type === "Edit" ? (
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
        ) : openModal.type === "capture-signature" ? (
          <BlankCard
            title={"Capture User Signature"}
            onCanel={() => {
              getRepairDetails();
              setOpenModal({ isShown: false });
            }}
            onSubmit={() => {
              handleUpdateRepairStatus(repairDetails?.id, repairStatus, OnSubmit, setShowToast);
              getRepairDetails();
              setOpenModal({ isShown: false });
            }}
            userId={repairDetails?.current_user_id}
          />
        ) : (
          <div className="h-[1150px] col-span-6 bg-white " id="print-file">
            <RepairForm repairDetails={repairDetails} />
          </div>
        )}
      </Modal>
      <ToastMessage isShown={showToast.isShown} type={showToast.type} message={showToast.message} onClose={() => setShowToast({ isShown: false })} />
    </div>
  );
}

export default RepairDetails;
