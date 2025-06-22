import React from "react";
import { MdClose } from "react-icons/md";
import CancelButton from "../../buttons/CancelButton";
import SubmitButton from "../../buttons/SubmitButton";

function SiganturePad({ lable, onClose }) {
  return (
    <div>
      <div className="flex flex-col p-2 gap-7">
        <div className="flex justify-between cursor-pointer">
          <span className="text-xl font-semibold">{lable}</span>
          <MdClose
            size={25}
            className="text-slate-500 hover:text-red-500"
            onClick={() => {
              onClose();
            }}
          />
        </div>
        <div className="h-[150px] border-2 border-slate-300 rounded-md relative">
          <div className="w-full h-full flex flex-col items-center justify-center ">{""}</div>
        </div>

        {/**/}

        <div className="flex justify-between">
          <div className="flex gap-3">
            <CancelButton onClick={onClose} />
            <SubmitButton text={"Save"} onClick={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SiganturePad;
