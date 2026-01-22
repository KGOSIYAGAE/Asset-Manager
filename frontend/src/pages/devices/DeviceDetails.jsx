import React, { useCallback, useEffect, useState } from "react";
import AddButton from "../../components/buttons/AddButton";
import { useParams } from "react-router-dom";
import { getAllDeviceDetails, getDevice } from "../../services/api/devices/Device.Api";
import SubmitButton from "../../components/buttons/SubmitButton";
import { useNavigate } from "react-router-dom";

import Modal from "react-modal";
import IssueDevice from "../../components/cards/issueDevice/IssueDevice";
import { useStaffContext } from "../../hooks/useStaffContext";
import { useStudentsContext } from "../../hooks/useStudentsContext";
import ToastMessage from "../../components/toastMessage/ToastMessage";
import ReleaseUser from "../../components/cards/releaseUser/ReleaseUser";
import { handleTimeStamp, handleTimeStampToText } from "../../utils/dateConverter";
import { getAllDeviceLogs } from "../../services/api/deviceLogs/DeviceLogs";
import { MdLocalPrintshop } from "react-icons/md";
import StudentAOD from "../../components/student AOD/StudentAOD";
import StaffIssueForm from "../../components/staffForms/StaffIssueForm";
import DeviceLogTable from "../../components/tables/DeviceLogTable";
import { hasPermission } from "../../utils/getLoggedInUser";
import { getUserType, handleCurrency } from "../../utils/helperMethods";
import RejectIssueCard from "../../components/cards/rejectIssue/RejectIssueCard";
import ApproveIssue from "../../components/cards/approveIssue/ApproveIssue";

function DeviceDetails({ path }) {
  const { staffState } = useStaffContext();
  const { studentState } = useStudentsContext();

  //Force re-render

  const [isAssigned, setIsAssigned] = useState(false);
  const [userType, setUserType] = useState(null);
  const [deviceDetails, setDeviceDetails] = useState();
  const [deviceLogs, setDeviceLogs] = useState();
  const params = useParams();
  const [openModal, setOpenModal] = useState({ isShown: false, type: null, data: null });
  const [showToast, setShowToast] = useState({ isShow: false, type: null, message: null });
  const [dateCreated, setDateCreated] = useState("");
  const [warrantyEndDate, setWarrantyEndDate] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [print, setPrint] = useState(false);

  const navigate = useNavigate();
  let rowNumber = 0;

  //On View more information on user
  const onViewMore = (user_id) => {
    if (user_id.length > 5) {
      return navigate(`/users/students/edit-student/${user_id}`);
    } else {
      return navigate(`/users/staff/edit-staff/${user_id}`);
    }
  };

  const setDetails = (deviceData) => {
    setDeviceDetails(...deviceData);
  };

  const getDeviceDetails = () => {
    const { id } = params;

    if (!id) {
      return console.log("Selected device id not provided");
    }

    getAllDeviceDetails(id, setDetails);
  };

  const getDeviceLogs = () => {
    const { id } = params;

    if (!id) {
      return console.log("Selected device id not provided");
    }
    getAllDeviceLogs(id, setDeviceLogs);
  };

  const handleOnPrint = () => {
    let printContents = document.getElementById("print-file").innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  useEffect(() => {
    getDeviceLogs();
  }, []);

  useEffect(() => {
    getDeviceDetails();

    //Get user type based on userID
    getUserType(deviceDetails?.user_id, setUserType);

    if (!staffState || !studentState) {
      console.log("No data");
    }
  }, [deviceDetails]);

  //handle post Message Response
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === "form_submitted") {
        setShowToast({ isShow: true, type: "success", message: event.data.payload });
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="h-svh flex flex-col p-3 gap-3 bg-zinc-50 overflow-y-scroll">
      <span className="text-sm">
        <b>Devices /</b> {path}
      </span>
      {hasPermission("assign") && (
        <div className="flex flex-col bg-white p-3 gap-5 rounded-md shadow-md">
          <div className="flex justify-end">
            <div>
              {deviceDetails?.status === "Assigned" || deviceDetails?.status === "Loaned" ? (
                <SubmitButton
                  text={"Release User"}
                  onClick={() => {
                    setOpenModal({ isShown: true, type: "release", data: "hello" });
                  }}
                />
              ) : deviceDetails?.status === "Approval required" ? (
                hasPermission("approve") && (
                  <div className="flex gap-5">
                    <SubmitButton
                      text={"Reject"}
                      onClick={() => {
                        setOpenModal({ isShown: true, type: "reject", data: "hello" });
                      }}
                    />
                    <SubmitButton
                      text={"Approve"}
                      onClick={() => {
                        setOpenModal({ isShown: true, type: "approve", data: "hello" });
                      }}
                    />
                  </div>
                )
              ) : (
                <div className="flex gap-3">
                  <SubmitButton
                    text={"Assign User"}
                    onClick={() => {
                      setOpenModal({ isShown: true, type: "assign", data: "hello" });
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-5 grid-rows-2 gap-5">
        <div className="col-span-3 row-span-1 border p-1 rounded-md shadow-md bg-white">
          <span className="heading-text">Device Details</span>
          <div className="flex justify-between  p-2 item-hover">
            <span className="text-sm">Make</span>
            <span className="text-sm">{deviceDetails?.make}</span>
          </div>
          <div className="flex justify-between  p-2 item-hover">
            <span className="text-sm">Model</span>
            <span className="text-sm">{deviceDetails?.model}</span>
          </div>
          <div className="flex justify-between  p-2 item-hover">
            <span className="text-sm">Asset Tag</span>
            <span className="text-sm">{deviceDetails?.asset_tag}</span>
          </div>
          <div className="flex justify-between  p-2 item-hover">
            <span className="text-sm">Serial Number</span>
            <span className="text-sm">{deviceDetails?.serial_no}</span>
          </div>
          <div className="flex justify-between p-2 item-hover">
            <span className="text-sm">Device Condition</span>
            <span className="text-sm">{deviceDetails?.device_condition}</span>
          </div>

          <div className="flex justify-between  p-2 item-hover">
            <span className="text-sm">Status</span>
            {deviceDetails?.status === "Available" ? (
              <span className="text-sm bg-green-500 border shadow-sm p-1 rounded-md text-white">{deviceDetails?.status}</span>
            ) : deviceDetails?.status === "Approval required" ? (
              <span className="text-sm bg-yellow-500 border shadow-sm p-1 rounded-md text-white">{deviceDetails?.status}</span>
            ) : (
              <span className="text-sm bg-red-500 border shadow-sm p-1 rounded-md text-white">{deviceDetails?.status}</span>
            )}
          </div>

          <div className="flex justify-between p-2 item-hover">
            <span className="text-sm">Warranty End date</span>
            <span className="text-sm">
              {(() => {
                return handleTimeStampToText(deviceDetails?.warranty_end_date);
              })()}
            </span>
          </div>
          <div className="flex justify-between p-2 item-hover">
            <span className="text-sm">Category</span>
            <span className="text-sm">{deviceDetails?.category}</span>
          </div>
          <div className="flex justify-between p-2 gap-3 item-hover">
            <span className="w-6/12 text-sm">Specification</span>
            <span className="w-6/12 text-sm text-right ">{deviceDetails?.specification}</span>
          </div>

          <div className="flex justify-between p-2 item-hover">
            <span className="text-sm">Supplier</span>
            <span className="text-sm">{deviceDetails?.supplier_name}</span>
          </div>
          <div className="flex justify-between p-2 item-hover">
            <span className="text-sm">Invoice</span>
            <span className="text-sm">{deviceDetails?.invoice_number}</span>
          </div>
          <div className="flex justify-between p-2 item-hover">
            <span className="text-sm">Purchase Value</span>
            <span className="text-sm">
              {(() => {
                return handleCurrency(deviceDetails?.purchase_price);
              })()}
            </span>
            {/*`R ${deviceDetails?.purchase_price}`*/}
          </div>
          <div className="flex justify-between p-2 item-hover">
            <span className="text-sm">Current Value</span>
            <span className="text-sm">
              {(() => {
                return handleCurrency(deviceDetails?.value_price);
              })()}
            </span>
            {/*`R ${deviceDetails?.value_price}`*/}
          </div>

          <div className="flex justify-between p-2 item-hover">
            <span className="text-sm">Date Created</span>
            <span className="text-sm">
              {(() => {
                return handleTimeStampToText(deviceDetails?.created_at);
              })()}
            </span>
          </div>
          <div className="flex justify-between p-2 item-hover">
            <span className="text-sm">Date Issued</span>
            <span className="text-sm">
              {(() => {
                return handleTimeStampToText(deviceDetails?.date_issued);
              })() || "None"}
            </span>
          </div>
          <div className="flex justify-between p-2 item-hover">
            <span className="text-sm">Return Date</span>
            <span className="text-sm">
              {(function () {
                return handleTimeStampToText(deviceDetails?.return_date);
              })() || "None"}
            </span>
          </div>
          <div className="flex justify-between  p-2 item-hover">
            <span className="text-sm">Upgrade Date</span>
            <span className="text-sm">
              {(function () {
                return handleTimeStampToText(deviceDetails?.next_upgrade_date);
              })() || "None"}
            </span>
          </div>
        </div>

        <div className="flex flex-col col-span-2 gap-5">
          <div className="flex flex-col items-center justify-center lg:w-5/5 h-2/5 bg-white border  rounded-md shadow-md">
            <img src={`/${deviceDetails?.model}.png`} alt="" className="h-[250px]" />
          </div>
          {deviceDetails?.status === "Assigned" || deviceDetails?.status === "Loaned" || deviceDetails?.status === "Approval required" ? (
            <div className="flex flex-col h-1/4 justify-between border p-2 rounded-md shadow-md bg-white">
              {deviceDetails?.status === "Loaned" ? <span className="heading-text">Loaned User</span> : <span className="heading-text">Assigned User</span>}

              <div className="">
                <div className="flex justify-between  p-2">
                  <span className="text-sm">Full name</span>
                  <span className="text-sm">{`${deviceDetails?.full_name}`}</span>
                </div>
                <div className="flex justify-between  p-1">
                  <span className="text-sm">User Id</span>
                  <span className="text-sm">{deviceDetails?.user_id}</span>
                </div>
                {/*<div className="flex justify-between bg-zinc-50 p-2">
                  <span className="text-sm">User Type</span>
                  <span className="text-sm">{userType}</span>
                </div>*/}
              </div>
              <span
                className="text-blue-400 underline cursor-pointer"
                onClick={() => {
                  onViewMore(deviceDetails?.user_id);
                }}
              >
                View More
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
        {hasPermission("view-logs") && <DeviceLogTable deviceLogs={deviceLogs} label={"Devices Logs"} />}
      </div>

      <Modal
        isOpen={openModal.isShown}
        ariaHideApp={false}
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
        {openModal.type === "assign" ? (
          <IssueDevice
            onCanel={() => {
              setOpenModal({ isShown: false });
            }}
            onSubmit={() => {
              getDeviceDetails();
              setOpenModal({ isShown: false });
            }}
            deviceId={deviceDetails?.id}
            setShowToast={setShowToast}
          />
        ) : openModal.type === "release" ? (
          <ReleaseUser
            onCanel={() => {
              setOpenModal({ isShown: false });
            }}
            onSubmit={() => {
              getDeviceDetails();
              setOpenModal({ isShown: false });
            }}
            setShowToast={setShowToast}
          />
        ) : openModal.type === "Student" ? (
          <div className=" h-[1100px]  col-span-6 bg-white " id="print-file">
            <StudentAOD handleOnPrint={handleOnPrint} deviceId={deviceDetails?.id} student_no={deviceDetails?.user_id} />
          </div>
        ) : openModal.type === "Staff" ? (
          <div className="h-[1100px] col-span-6 bg-white " id="print-file">
            <StaffIssueForm handleOnPrint={handleOnPrint} deviceId={deviceDetails?.id} staff_no={deviceDetails?.user_id} />
          </div>
        ) : openModal.type === "reject" ? (
          <div>
            <RejectIssueCard
              onCanel={() => {
                setOpenModal({ isShown: false });
              }}
              onSubmit={() => {
                getDeviceDetails();
                setOpenModal({ isShown: false });
              }}
              setShowToast={setShowToast}
              full_name={deviceDetails?.full_name}
              laptopSerialNo={deviceDetails?.serial_no}
            />
          </div>
        ) : (
          <div>
            <ApproveIssue
              onCanel={() => {
                setOpenModal({ isShown: false });
              }}
              onSubmit={() => {
                getDeviceDetails();
                setOpenModal({ isShown: false });
              }}
              setShowToast={setShowToast}
              deviceUserDetails={deviceDetails}
            />
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
      {hasPermission("print") &&
        (deviceDetails?.status === "Assigned" ? (
          <div className="w-full flex justify-end bg-white p-3  border fixed bottom-0 left-0 gap-3">
            <button
              className="flex justify-center items-center bg-emerald-400 text-white p-2 rounded-md"
              onClick={() => {
                setOpenModal({ isShown: true, type: userType, data: "hello" });
              }}
            >
              <MdLocalPrintshop size={25} />
            </button>
            <button className="flex justify-center items-center bg-cyan-500 text-white p-2 rounded-md">Save PDF</button>
          </div>
        ) : (
          ""
        ))}
    </div>
  );
}

export default DeviceDetails;

/*

 <div className="h-svh flex flex-col p-3 gap-3 bg-zinc-50">
      <span className="text-sm">
        <b>Devices /</b> {path}
      </span>
      <div className="flex flex-col bg-white p-3 gap-5 rounded-md shadow-md">
        <div className="flex justify-end">
          <div>
            {deviceDetails?.status !== "Assigned" ? (
              <SubmitButton
                text={"Assign User"}
                onClick={() => {
                  setOpenModal({ isShown: true, type: "assign", data: "hello" });
                }}
              />
            ) : (
              <div className="flex gap-3">
                <SubmitButton
                  text={"Release User"}
                  onClick={() => {
                    setOpenModal({ isShown: true, type: "release", data: "hello" });
                  }}
                />
                <SubmitButton
                  text={"Assign User"}
                  onClick={() => {
                    setOpenModal({ isShown: true, type: "assign", data: "hello" });
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col w-6/12 border p-1 rounded-md shadow-md">
            <span className="heading-text">Device Details</span>
            <div className="flex justify-between bg-zinc-50 p-2">
              <span className="text-sm">Make</span>
              <span className="text-sm">{deviceDetails?.make}</span>
            </div>
            <div className="flex justify-between  p-2">
              <span className="text-sm">Model</span>
              <span className="text-sm">{deviceDetails?.model}</span>
            </div>
            <div className="flex justify-between bg-zinc-50 p-2">
              <span className="text-sm">Asset Tag</span>
              <span className="text-sm">{deviceDetails?.assetTag}</span>
            </div>
            <div className="flex justify-between  p-2">
              <span className="text-sm">Serial Number</span>
              <span className="text-sm">{deviceDetails?.serial_no}</span>
            </div>
            <div className="flex justify-between bg-zinc-50 p-2">
              <span className="text-sm">Device Condition</span>
              <span className="text-sm">{deviceDetails?.device_condition}</span>
            </div>
            <div className="flex justify-between  p-2">
              <span className="text-sm">Status</span>
              <span className="text-sm">{deviceDetails?.status}</span>
            </div>
            <div className="flex justify-between bg-zinc-50 p-2">
              <span className="text-sm">Warranty End date</span>
              <span className="text-sm">{deviceDetails?.warrantyExpiration}</span>
            </div>
            <div className="flex justify-between p-2">
              <span className="text-sm">Category</span>
              <span className="text-sm">{deviceDetails?.category}</span>
            </div>
            <div className="flex justify-between bg-zinc-50 p-2">
              <span className="text-sm">Specification</span>
              <span className="text-sm">{deviceDetails?.specification}</span>
            </div>
            <div className="flex justify-between p-2">
              <span className="text-sm">Location</span>
              <span className="text-sm">{deviceDetails?.location}</span>
            </div>
            <div className="flex justify-between bg-zinc-50 p-2">
              <span className="text-sm">Supplier</span>
              <span className="text-sm">{deviceDetails?.supplier}</span>
            </div>
            <div className="flex justify-between p-2">
              <span className="text-sm">Invoice</span>
              <span className="text-sm">{deviceDetails?.invoice_no}</span>
            </div>
            <div className="flex justify-between bg-zinc-50 p-2">
              <span className="text-sm">Purchase Value</span>
              <span className="text-sm">{`R ${deviceDetails?.purchaseValue}`}</span>
            </div>
            <div className="flex justify-between  p-2">
              <span className="text-sm">Purchase Date</span>
              <span className="text-sm">{deviceDetails?.purchaseDate}</span>
            </div>
            <div className="flex justify-between bg-zinc-50 p-2">
              <span className="text-sm">Date Enrolled</span>
              <span className="text-sm">{dateCreated}</span>
            </div>
          </div>
          <div className="flex flex-col w-6/12 gap-5">
            <div className="flex flex-col items-center justify-center w-2/5 h-2/5 border p-2 gap-4 rounded-md shadow-md">
              <img src={`/public/${deviceDetails?.model.toLowerCase()}.png`} alt="" className="w-[200px] h-[150px]" />
            </div>
            {deviceDetails?.status === "Assigned" ? (
              <div className="flex flex-col h-2/5 justify-between border p-2 rounded-md shadow-md">
                <span className="heading-text">Assigned User</span>
                <div>
                  <div className="flex justify-between bg-zinc-50 p-2">
                    <span className="text-sm">Full name</span>
                    <span className="text-sm">{deviceDetails?.assignedTo}</span>
                  </div>
                  <div className="flex justify-between  p-2">
                    <span className="text-sm">User Id</span>
                    <span className="text-sm">{deviceDetails?.userId}</span>
                  </div>
                  <div className="flex justify-between bg-zinc-50 p-2">
                    <span className="text-sm">User Type</span>
                    <span className="text-sm">{deviceDetails?.userType}</span>
                  </div>
                </div>
                <span className="text-blue-400 underline cursor-pointer">View More</span>
              </div>
            ) : (
              ""
            )}
          </div>
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
        className="w-[80%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5"
      >
        {openModal.type === "assign" ? (
          <IssueDevice
            onCanel={() => {
              setOpenModal({ isShown: false });
            }}
            onSubmit={() => {
              getDeviceDetails();
              setOpenModal({ isShown: false });
            }}
            userData={[...staffState?.staffList, ...studentState?.studentsList]}
            setShowToast={setShowToast}
          />
        ) : (
          <ReleaseUser
            onCanel={() => {
              setOpenModal({ isShown: false });
            }}
            onSubmit={() => {
              getDeviceDetails();
              setOpenModal({ isShown: false });
            }}
            data={[...staffState?.staffList, ...studentState?.studentsList]}
            setShowToast={setShowToast}
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
*/
