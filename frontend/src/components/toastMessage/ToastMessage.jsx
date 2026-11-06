import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoCloseCircle, IoInformationCircle } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

function ToastMessage({ isShown, type, message, onClose }) {
  return (
    <div
      role="alert"
      className={` h-[60px] flex justify-between bg-white rounded-md shadow-lg border border-zinc-100 fixed top-5 transition-all duration-300 z-50 ${
        isShown ? "opacity-100 right-6" : "opacity-0 -right-96 pointer-events-none"
      }`}
    >
      <div className={`${type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-yellow-500"} p-1 rounded-tl-md rounded-bl-md`} />

      <div className="flex items-center p-2 gap-4">
        <div>
          {type === "success" ? (
            <FaCheckCircle className="text-green-500" size={30} />
          ) : type === "error" ? (
            <IoCloseCircle className="text-red-500" size={35} />
          ) : (
            <IoInformationCircle className="text-yellow-500" size={35} />
          )}
        </div>
        <div className="flex flex-col">
          <span className="font-bold">{type === "success" ? "Success" : type === "error" ? "Error" : "Info"}</span>
          <span className="text-sm text-zinc-600">{message}</span>
        </div>
      </div>

      <button type="button" onClick={onClose} className="p-1 self-start" aria-label="Close">
        <IoMdClose size={20} />
      </button>
    </div>
  );
}

export default ToastMessage;
