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
import ReleaseUser from "../../components/cards/releaseUser/releaseUser";
import { handleTimeStamp } from "../../utils/dateConverter";
import { getAllDeviceLogs } from "../../services/api/deviceLogs/DeviceLogs";
import { MdLocalPrintshop } from "react-icons/md";
import StudentAOD from "../../components/student AOD/StudentAOD";

function DeviceDetails({ path }) {
  const { staffState } = useStaffContext();
  const { studentState } = useStudentsContext();

  //Force re-render

  const [isAssigned, setIsAssigned] = useState(false);
  const [userType, setUserType] = useState("");
  const [deviceDetails, setDeviceDetails] = useState();
  const [deviceLogs, setDeviceLogs] = useState();
  const params = useParams();
  const [openModal, setOpenModal] = useState({ isShown: false, type: null, data: null });
  const [showToast, setShowToast] = useState({ isShow: false, type: "", message: null });

  const [dateCreated, setDateCreated] = useState("");
  const [warrantyEndDate, setWarrantyEndDate] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");

  const navigate = useNavigate();
  let rowNumber = 0;

  //Get user type based on userID
  const getUserType = (user_id) => {
    if (user_id.length > 5) {
      return setUserType("Student");
    } else {
      return setUserType("Staff");
    }
  };

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
    getAllDeviceLogs(id, setDeviceLogs);
    getAllDeviceDetails(id, setDetails);
  };

  const handleOnPrint = () => {
    let printContents = document.getElementById("print-file").innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  };

  useEffect(() => {
    getDeviceDetails();
    //getUserType(deviceDetails?.user_id);

    if (!staffState || !studentState) {
      console.log("No data");
    }

    setDateCreated(handleTimeStamp(deviceDetails?.created_at));
    setWarrantyEndDate(handleTimeStamp(deviceDetails?.warranty_end_date));
    setPurchaseDate(handleTimeStamp(deviceDetails?.purchase_date));
  }, [deviceDetails?.created_at]);

  return (
    <div className="h-svh flex flex-col p-3 gap-3 bg-zinc-50 overflow-y-scroll">
      <span className="text-sm">
        <b>Devices /</b> {path}
      </span>
      <div className="flex flex-col bg-white p-3 gap-5 rounded-md shadow-md">
        <div className="flex justify-end">
          <div>
            {deviceDetails?.status === "Assigned" ? (
              <SubmitButton
                text={"Release User"}
                onClick={() => {
                  setOpenModal({ isShown: true, type: "release", data: "hello" });
                }}
              />
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

      <div className="grid grid-cols-5 grid-rows-2 gap-5">
        <div className="col-span-3 row-span-1 border p-1 rounded-md shadow-md">
          <span className="heading-text">Device Details</span>
          <div className="flex justify-between bg-zinc-50 p-2 item-hover">
            <span className="text-sm">Make</span>
            <span className="text-sm">{deviceDetails?.make}</span>
          </div>
          <div className="flex justify-between  p-2 item-hover">
            <span className="text-sm">Model</span>
            <span className="text-sm">{deviceDetails?.model}</span>
          </div>
          <div className="flex justify-between bg-zinc-50 p-2 item-hover">
            <span className="text-sm">Asset Tag</span>
            <span className="text-sm">{deviceDetails?.asset_tag}</span>
          </div>
          <div className="flex justify-between  p-2 item-hover">
            <span className="text-sm">Serial Number</span>
            <span className="text-sm">{deviceDetails?.serial_no}</span>
          </div>
          <div className="flex justify-between bg-zinc-50 p-2 item-hover">
            <span className="text-sm">Device Condition</span>
            <span className="text-sm">{deviceDetails?.device_condition}</span>
          </div>
          <div className="flex justify-between  p-2 item-hover">
            <span className="text-sm">Status</span>
            <span className="text-sm">{deviceDetails?.status}</span>
          </div>
          <div className="flex justify-between bg-zinc-50 p-2 item-hover">
            <span className="text-sm">Warranty End date</span>
            <span className="text-sm">{warrantyEndDate}</span>
          </div>
          <div className="flex justify-between p-2 item-hover">
            <span className="text-sm">Category</span>
            <span className="text-sm">{deviceDetails?.category}</span>
          </div>
          <div className="flex flex-col justify-between bg-zinc-50 p-2 gap-3 item-hover">
            <span className="text-sm">Specification</span>
            <span className=" text-sm ">{deviceDetails?.specification}</span>
          </div>
          <div className="flex justify-between p-2 item-hover">
            <span className="text-sm">Location</span>
            <span className="text-sm">{deviceDetails?.location}</span>
          </div>
          <div className="flex justify-between bg-zinc-50 p-2 item-hover">
            <span className="text-sm">Supplier</span>
            <span className="text-sm">{deviceDetails?.supplier_name}</span>
          </div>
          <div className="flex justify-between p-2 item-hover">
            <span className="text-sm">Invoice</span>
            <span className="text-sm">{deviceDetails?.invoice_number}</span>
          </div>
          <div className="flex justify-between bg-zinc-50 p-2 item-hover">
            <span className="text-sm">Purchase Value</span>
            <span className="text-sm">
              {/*new Intl.NumberFormat("en-ZA", {
                style: "currency",
                currency: "ZAR",
              }).format(deviceDetails?.purchase_price)*/}
            </span>
            {`R ${deviceDetails?.purchase_price}`}
          </div>
          <div className="flex justify-between bg-zinc-50 p-2 item-hover">
            <span className="text-sm">Current Value</span>
            <span className="text-sm">
              {/*new Intl.NumberFormat("en-ZA", {
                style: "currency",
                currency: "ZAR",
              }).format(parseInt(deviceDetails?.value_price))*/}
            </span>
            {`R ${deviceDetails?.value_price}`}
          </div>
          <div className="flex justify-between  p-2 item-hover">
            <span className="text-sm">Purchase Date</span>
            <span className="text-sm">{purchaseDate}</span>
          </div>
          <div className="flex justify-between bg-zinc-50 p-2 item-hover">
            <span className="text-sm">Date Enrolled</span>
            <span className="text-sm">{dateCreated}</span>
          </div>
        </div>

        <div className="flex flex-col col-span-3 gap-5">
          <div className="flex flex-col items-center justify-center w-2/5 h-2/5 border p-2 gap-4 rounded-md shadow-md">
            <img src={`/public/${deviceDetails?.model.toLowerCase()}.png`} alt="" className="w-[200px] h-[150px]" />
          </div>
          {deviceDetails?.status === "Assigned" ? (
            <div className="flex flex-col h-1/4 justify-between border p-2 rounded-md shadow-md">
              <span className="heading-text">Assigned User</span>
              <div>
                <div className="flex justify-between bg-zinc-50 p-2">
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

        <div className="col-span-6 h-[250px] bg-white rounded-md shadow-md p-2 overflow-x-auto">
          <span className="heading-text ">Device Activity Log</span>
          <div className="w-full text-sm  rounded-sm">
            <table className="w-full bg-white ">
              <thead className=" bg-slate-100">
                <th>#</th>
                <th>Device Id</th>
                <th>Action</th>
                <th>Description</th>
                <th>Created By</th>
                <th>Created At</th>
              </thead>
              <tbody className="">
                {deviceLogs
                  ? deviceLogs.map((log) => (
                      <tr className="hover:bg-slate-50">
                        <td>{}</td>
                        <td>{log.item_id}</td>
                        <td>{log.action}</td>
                        <td>{log.description}</td>
                        <td>{log.created_by}</td>
                        <td>{log.created_at}</td>
                      </tr>
                    ))
                  : ""}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-span-6 bg-white border border-green-500 p-5" id="print-file">
          <StudentAOD />
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
        ) : openModal.type === "release" ? (
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
        ) : (
          ""
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
      <div className="w-full flex justify-end bg-white p-3 absolute border bottom-0 left-0 gap-3">
        <button
          className="flex justify-center items-center bg-emerald-400 text-white p-2 rounded-md"
          onClick={() => {
            //setOpenModal({ isShown: true, type: "print", data: "hello" });
            handleOnPrint();
          }}
        >
          <MdLocalPrintshop size={25} />
        </button>
        <button className="flex justify-center items-center bg-cyan-500 text-white p-2 rounded-md">Save PDF</button>
      </div>
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
