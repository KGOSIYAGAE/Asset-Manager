import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { socket } from "../../utils/socket";
import SubmitButton from "../../components/buttons/SubmitButton";
import SignatureCanvas from "react-signature-canvas";
import StaffIssueVirificationCard from "../../components/cards/verificationComponents/StaffIssueVirificationCard";
import StudentIssueVerification from "../../components/cards/verificationComponents/StudentIssueVerification";
import LoanIssueVirificationCard from "../../components/cards/verificationComponents/LoanIssueVirificationCard";
import UserCaptureSignature from "../../components/cards/signaturePad/UserCaptureSignature";
import { setNavigate } from "../../utils/navigate";
import RepairVerification from "../../components/cards/verificationComponents/RepairVerification";

function TabletView() {
  const [isConnected, setIsConnected] = useState(false);
  const [isRoomJoined, setIsRoomJoined] = useState(false);
  const [connectionError, setConnectionError] = useState(null);

  const [userType, setUserType] = useState();
  const params = useParams();
  const { source, userId, deviceId, issuedBy, returnDate, sessionId, tempToken } = params;

  const [me, setMe] = useState("I am Default");

  const navigate = useNavigate();

  useEffect(() => {
    //Store user details to session storage
    sessionStorage.setItem("temp-sign-token", JSON.stringify({ token: tempToken }));
  }, [tempToken]);

  useEffect(() => {
    setNavigate(navigate);

    socket.connect();

    socket.on("connect", () => {
      setIsConnected(true);
      setConnectionError(null);

      socket.emit("join_session", sessionId, (response) => {
        if (response && response.status === "success") {
          setIsRoomJoined(true);
        }
      });
    });

    socket.on("connect_error", (error) => {
      setConnectionError("Failed to connect ro real-rime server");
      setIsConnected(false);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      setIsRoomJoined(flase);
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("disconnect");
      socket.disconnect();
    };
  }, [sessionId]);

  /*Clear signature
  const clearSignature = () => {
    signatureCanvasRef.current.clear();
  };

  const [submitted, setSubmitted] = useState(false);


  //Save signature
  const saveSignature = () => {
    const image = signatureCanvasRef.current.toDataURL("image/png");

    socket.emit("submit_signature", { sessionId, image });

    setSubmitted(true);
    //setUserSignature(user_id, image);
  };*/

  /*if (submitted) {
    return <div>Signature Sent! you can close this tab.</div>;
  }*/

  //Get user type based on userID
  const getUserType = (staff_student_no) => {
    let userId = staff_student_no?.toString();

    if (userId?.length > 5) {
      return setUserType("Student");
    } else {
      return setUserType("Staff");
    }
  };

  useEffect(() => {
    getUserType(userId);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div style={{ display: "flex", gap: "15px", justifyContent: "center", marginBottom: "20px" }}>
        <div>Server Status: {isConnected ? "🟢 Connected" : "🔴 Disconnected"}</div>
        <div>Session Sync: {isRoomJoined ? "🟢 Synced" : "🟡 Waiting..."}</div>
        <div>Session Id: {isRoomJoined ? sessionId : "Waiting..."}</div>
      </div>

      <div className="w-screen flex p-5 bg-white overflow-auto" id="print-file">
        {userType && userType === "Staff" && source === "issue-verification" ? (
          <StaffIssueVirificationCard deviceId={deviceId} staff_no={userId} />
        ) : userType === "Student" && source === "issue-verification" ? (
          <StudentIssueVerification deviceId={deviceId} student_no={userId} />
        ) : source === "loan-verification" ? (
          <LoanIssueVirificationCard deviceId={deviceId} userId={userId} returnDate={returnDate} />
        ) : source === "laptop-repair" ? (
          <RepairVerification />
        ) : (
          <UserCaptureSignature lablel={"Capture User Signature"} user_id={userId} />
        )}
      </div>
    </div>
  );
}

export default TabletView;

{
  /*<div className="flex flex-col p-2 gap-7">
        {connectionError && <div style={{ color: "red", margin: "10px 0", fontWeight: "bold" }}>⚠️ {connectionError} (Check if backend server is running)</div>}
        <div className="flex justify-between cursor-pointer">
          <span className="text-xl font-semibold">{"Get Signature"}</span>
          <span>{me}</span>
        </div>
        <div className="h-[250px] border-2 border-slate-400 rounded-md relative">
          <div className="w-full h-full flex flex-col items-center justify-center ">
            {<span className="text-gray-300 text-xl font-bold absolute">SIGN HERE</span>}
            <SignatureCanvas ref={signatureCanvasRef} penColor="black" canvasProps={{ width: 720, height: 250, className: "signature-canva" }} />
          </div>
        </div>

        {/**

        <div className="flex justify-end">
          <div className="flex gap-3">
            <button className="bg-gray-200 rounded-md px-5" onClick={() => clearSignature()}>
              Clear
            </button>
            <SubmitButton
              text={"Save"}
              onClick={() => {
                //handleAssignDeviceToStaff(userDetails, ...deviceDetails, setShowToast);
                //handleAssign();
                saveSignature();
              }}
            />
          </div>
        </div>
      </div>*/
}
