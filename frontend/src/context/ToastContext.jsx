import { duration } from "@mui/material";
import { createContext, useContext, useState, useCallback } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { IoCloseCircle, IoInformationCircle } from "react-icons/io5";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((isShown = false, message, type = "success", duration = 3000) => {
    setToast({ isShown, message, type });
    setTimeout(() => setToast(null), duration);
  }, []);

  return (
    <div
      className={` flex justify-between bg-white  rounded-md shadow-lg border border-zinc-100 absolute top-5  transition-all duration-300 ${
        toast?.isShown ? "opacity-100 right-6" : "opacity-0 -right-96"
      } z-50`}
    >
      <div className={`${toast?.type === "success" ? "bg-green-500" : toast?.type == "error" ? "bg-red-500" : "bg-yellow-500"} p-2 rounded-tl-md rounded-bl-md`}></div>

      <div className={`flex items-center p-2 gap-4`}>
        <div>
          {toast?.type === "success" ? (
            <FaCheckCircle className="text-green-500" size={30} />
          ) : toast?.type === "error" ? (
            <IoCloseCircle className="text-red-500" size={35} />
          ) : (
            <IoInformationCircle className="text-yellow-500" size={35} />
          )}
        </div>
        <div className="flex flex-col">
          <span className="font-bold">{toast?.type === "success" ? "Success" : toast?.type === "error" ? "Error" : "Info"}</span>
          <span className="text-sm text-zinc-600">{toast?.message}</span>
        </div>
      </div>
      <div className="">
        <IoMdClose size={20} onClick={() => {}} />
      </div>
    </div>
  );
};

export const useToats = () => {
  return useContext(ToastContext);
};
