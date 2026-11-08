import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoCloseCircle, IoInformationCircle } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

function ToastMessageBox({ isShown, type, message, onClose }) {
  /*useEffect(() => {
    const timeOutId = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [onClose]);*/

  return (
    <div className={`w-10/12 h-full flex justify-center top-60 absolute ${isShown ? "z-50" : "-z-10"} `}>
      <div className={`w-[500px] h-[150px] flex flex-col bg-white  rounded-md shadow-lg border border-zinc-100 relative  transition-all duration-300 ${isShown ? "opacity-100" : "opacity-100 "} `}>
        <div className="">
          <div className={`${type === "success" ? "bg-green-500" : type == "error" ? "bg-red-500" : "bg-yellow-500"} p-2 rounded-t-md flex justify-end `}>
            <div className="hover:cursor-pointer flex items-center justify-center  text-white">
              <IoMdClose
                size={22}
                onClick={() => {
                  onClose();
                }}
              />
            </div>
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
