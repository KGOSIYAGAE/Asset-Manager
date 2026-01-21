import React, { useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import CancelButton from "../../buttons/CancelButton";
import SubmitButton from "../../buttons/SubmitButton";
import SignatureCanvas from "react-signature-canvas";
import { setUserSignature } from "../../../services/api/signature/userSignatures";
import { postMessageSiganture } from "../../../utils/VerificationPostMessage";

function UserCaptureSignature({ lablel, user_id, setShowToast }) {
  const signatureCanvasRef = useRef(null);

  //Clear signature
  const clearSignature = () => {
    signatureCanvasRef.current.clear();
  };

  //Save signature
  const saveSignature = async () => {
    const image = signatureCanvasRef.current.toDataURL();

    await setUserSignature(user_id, image, setShowToast);

    return postMessageSiganture();
  };

  return (
    <div className="w-full flex flex-col items-center gap-10 border">
      <img src="\SPU-logo-1024x1024.jpg" alt="spu logo" className="page-logo-staff" />
      <div className="flex flex-col gap-8">
        <span className=" font-bold text-2xl">{lablel}</span>
      </div>
      <div>
        <div>
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
        </div>
      </div>
      {/*<SiganturePad lablel={"Staff Signature"} user_id={staff_no} userDetails={staffData} deviceDetails={deviceDetails} setShowToast={setShowToast} />*/}
    </div>
  );
}

export default UserCaptureSignature;
