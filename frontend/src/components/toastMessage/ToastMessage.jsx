import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoCloseCircle, IoInformationCircle } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

function ToastMessage({ isShown, type, message, onClose }) {
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [onClose]);

  return (
    <div
      className={` flex justify-between bg-white  rounded-md shadow-lg border border-zinc-100 absolute top-5  transition-all duration-300 ${
        isShown ? "opacity-100 right-6" : "opacity-0 -right-96"
      } z-50`}
    >
      <div className={`${type === "success" ? "bg-green-500" : type == "error" ? "bg-red-500" : "bg-yellow-500"} p-2 rounded-tl-md rounded-bl-md`}></div>

      <div className={`flex items-center p-2 gap-4`}>
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
      <div className="">
        <IoMdClose
          size={20}
          onClick={() => {
            onClose();
          }}
        />
      </div>
    </div>
  );
}

export default ToastMessage;
