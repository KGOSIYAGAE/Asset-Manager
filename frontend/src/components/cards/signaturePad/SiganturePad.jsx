import React, { useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import CancelButton from "../../buttons/CancelButton";
import SubmitButton from "../../buttons/SubmitButton";
import SignatureCanvas from "react-signature-canvas";
import { setUserSignature } from "../../../services/api/signature/userSignatures";
import { handleAssignDeviceToStaff, handleAssignDeviceToStudent } from "../../../utils/HandleAssignDevice";
import { getUserType } from "../../../utils/helperMethods";
import { handleLoanDevice } from "../../../utils/HandleLoanDevice";
import { socket } from "../../../utils/socket";
import { useParams } from "react-router-dom";

function SiganturePad({ lablel, user_id, userDetails, deviceDetails, returnDate, setShowToast, formType }) {
  const signatureCanvasRef = useRef(null);
  const [userType, setUserType] = useState(null);

  const params = useParams();
  const { issuedBy, sessionId } = params;

  //Clear signature
  const clearSignature = () => {
    signatureCanvasRef.current.clear();
  };

  //Save signature
  const saveSignature = async () => {
    const image = signatureCanvasRef.current.toDataURL();

    socket.once("connect", () => {
      console.log("🟢 1. Frontend: Socket connected! Emitting signature...");

      socket.emit("submit_signature", { sessionId, image }, (ackResponse) => {
        // This blocks runs ONLY if the server successfully received the payload
        if (ackResponse && ackResponse.status === "received") {
          console.log("🟢 4. Frontend: Server confirmed receipt of signature!");
        } else {
          console.warn("⚠️ Frontend: Server didn't acknowledge the receipt.");
        }
      });
    });

    if (!socket.connected) {
      console.log("not connected");
      socket.connect();
    } else {
      socket.off("connect");

      console.log("Socket already connected, emitting signature");
      socket.emit("submit_signature", { sessionId, image }, (ackResponse) => {
        // This blocks runs ONLY if the server successfully received the payload
        if (ackResponse && ackResponse.status === "received") {
          console.log("🟢 4. Frontend: Server confirmed receipt of signature!");
        } else {
          console.warn("⚠️ Frontend: Server didn't acknowledge the receipt.");
        }
      });
    }

    await setUserSignature(user_id, image);

    return true;
  };

  //Handle Assign suer

  const handleAssign = async () => {
    if (formType === "loan-issue") {
      handleLoanDevice(userDetails, ...deviceDetails, issuedBy, returnDate, setShowToast);
    } else if (formType === "student-issue") {
      handleAssignDeviceToStudent(userDetails, deviceDetails, issuedBy, setShowToast);
    } else {
      handleAssignDeviceToStaff(userDetails, ...deviceDetails, issuedBy, setShowToast);
    }

    return saveSignature();
  };

  useEffect(() => {
    getUserType(user_id, setUserType);
  }, [user_id]);

  return (
    <div>
      <div className="flex flex-col p-2 gap-7 ">
        <div className="flex justify-between cursor-pointer">
          <span className="text-xl font-semibold">{lablel}</span>
        </div>
        <div className="h-[250px] border-2 border-slate-400 rounded-md relative">
          <div className="w-full h-full flex flex-col items-center justify-center ">
            {<span className="text-gray-300 text-xl font-bold absolute">SIGN HERE</span>}
            <SignatureCanvas ref={signatureCanvasRef} penColor="black" canvasProps={{ width: 720, height: 250, className: "signature-canva" }} />
          </div>
        </div>

        {/**/}

        <div className="flex justify-end">
          <div className="flex gap-3">
            <button className="bg-gray-200 rounded-md px-5" onClick={() => clearSignature()}>
              Clear
            </button>
            <SubmitButton
              text={"Save"}
              onClick={() => {
                //handleAssignDeviceToStaff(userDetails, ...deviceDetails, setShowToast);

                handleAssign();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SiganturePad;
