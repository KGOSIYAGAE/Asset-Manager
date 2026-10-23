import React from "react";
import { MdLocalPrintshop, MdOutlineAttachEmail } from "react-icons/md";

function SendViaEmail({ text, onClick }) {
  return (
    <button
      className="flex justify-center items-center bg-blue-400 text-white p-2 rounded-md  gap-2"
      onClick={() => {
        onClick();
      }}
    >
      {text}
      <MdOutlineAttachEmail size={25} />
    </button>
  );
}

export default SendViaEmail;
