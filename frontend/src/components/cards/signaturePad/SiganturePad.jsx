import React, { useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import CancelButton from "../../buttons/CancelButton";
import SubmitButton from "../../buttons/SubmitButton";
import SignatureCanvas from "react-signature-canvas";
import { setUserSignature } from "../../../services/api/signature/userSignatures";

function SiganturePad({ lablel, trimmedDataURL, setTrimmedDataURL, user_id, onClose }) {
  const signatureCanvasRef = useRef(null);

  //Clear signature
  const clearSignature = () => {
    signatureCanvasRef.current.clear();
  };

  //Save signature
  const saveSignature = () => {
    setTrimmedDataURL(signatureCanvasRef.current.toDataURL());
    const image = signatureCanvasRef.current.toDataURL();

    setUserSignature(user_id, image);

    return onClose();
  };

  useEffect(() => {
    if (trimmedDataURL) {
      console.log("Update");
    }
  }, [trimmedDataURL]);

  return (
    <div>
      <div className="flex flex-col p-2 gap-7">
        <div className="flex justify-between cursor-pointer">
          <span className="text-xl font-semibold">{lablel}</span>
          <MdClose
            size={25}
            className="text-slate-500 hover:text-red-500"
            onClick={() => {
              onClose();
            }}
          />
        </div>
        <div className="h-[150px] border-2 border-slate-400 rounded-md relative">
          <div className="w-full h-full flex flex-col items-center justify-center ">
            {<span className="text-gray-300 text-xl font-bold absolute">SIGN HERE</span>}
            <SignatureCanvas ref={signatureCanvasRef} penColor="black" canvasProps={{ width: 456, height: 146, className: "signature-canva" }} />
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
  );
}

export default SiganturePad;
