import React, { useEffect, useRef } from "react";
import { setUserSignature } from "../../../services/api/signature/userSignatures";
import { navigateTo } from "../../../utils/navigate";
import { postMessageSiganture } from "../../../utils/VerificationPostMessage";
import SignatureCanvas from "react-signature-canvas";
import SubmitButton from "../../buttons/SubmitButton";
import { useParams } from "react-router-dom";
import { socket } from "../../../utils/socket";

function RepairDesclaimerSignaturePad({ lablel, user_id }) {
  const signatureCanvasRef = useRef(null);

  const params = useParams();
  const { sessionId } = params;

  //Clear signature
  const clearSignature = () => {
    signatureCanvasRef.current.clear();
  };

  //Save signature
  const saveSignature = async () => {
    const image = signatureCanvasRef.current.toDataURL();

    socket.once("connect", () => {
      console.log("🟢 1. Frontend: Socket connected! Emitting Disclaier and consent...");

      socket.emit("accept_disclaimer_consent", { sessionId }, (ackResponse) => {
        // This blocks runs ONLY if the server successfully received the payload
        if (ackResponse && ackResponse.status === "received") {
          console.log("🟢 4. Frontend: Server confirmed receipt of disclaimer!");
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

      console.log("Socket already connected, emitting consent and disclaimer");
      socket.emit("accept_disclaimer_consent", { sessionId }, (ackResponse) => {
        // This blocks runs ONLY if the server successfully received the payload
        if (ackResponse && ackResponse.status === "received") {
          console.log("🟢 4. Frontend: Server confirmed receipt of disclaimer!");
        } else {
          console.warn("⚠️ Frontend: Server didn't acknowledge the receipt.");
        }
      });
    }

    await setUserSignature(user_id, image);

    if (sessionId) {
      return navigateTo("/Success");
    } else {
      return postMessageSiganture();
    }
  };

  return (
    <div className="flex flex-col p-2 gap-7">
      <div className="flex justify-between cursor-pointer"></div>
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
              saveSignature();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default RepairDesclaimerSignaturePad;
