import React from "react";
import { MdLocalPrintshop } from "react-icons/md";

function PrintButton({ text, onClick }) {
  return (
    <button
      className="flex justify-center items-center bg-emerald-400 text-white p-2 rounded-md  gap-2"
      onClick={() => {
        onClick();
      }}
    >
      {text}
      <MdLocalPrintshop size={25} />
    </button>
  );
}

export default PrintButton;
