import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoCloseCircle, IoInformationCircle } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

function ToastMessageBox({ isShown, type, message, onClose }) {
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [onClose]);

  return (
    <div className="w-9/12 h-full flex items-center justify-center absolute  z-50">
      <div
        className={`w-[500px] h-[150px] flex flex-col bg-white  rounded-md shadow-lg border border-zinc-100 relative  transition-all duration-300 ${isShown ? "opacity-100" : "opacity-0 -right-96"} `}
      >
        <div className="">
          <div className={`${type === "success" ? "bg-green-500" : type == "error" ? "bg-red-500" : "bg-yellow-500"} p-2 rounded-t-md`}></div>
          <div className="flex justify-end p-2">
            <IoMdClose
              size={20}
              onClick={() => {
                onClose();
              }}
            />
          </div>
        </div>
        <div className={`h-full flex flex-col items-center justify-center gap-5`}>
          <div className="flex items-center">
            {type === "success" ? (
              <FaCheckCircle className="text-green-500" size={30} />
            ) : type === "error" ? (
              <IoCloseCircle className="text-red-500" size={35} />
            ) : (
              <IoInformationCircle className="text-yellow-500" size={35} />
            )}
            <span className="font-bold">{type === "success" ? "Success" : type === "error" ? "Error" : "Info"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-zinc-600">{message}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToastMessageBox;
