import React from "react";
import { FaCheck } from "react-icons/fa";
import { MdCheck } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function NoAccess() {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-svh flex flex-col items-center justify-center gap-3 ">
      <div className=" flex flex-col items-center ">
        <img src="/403-error-2.png" alt="" className="w-6/12" />

        <span className="text-gray-800 font-semibold">uh-oh! Sorry you do not have access to the system contact the system administrator...</span>
      </div>
      <button
        className="bg-blue-500 text-white font-semibold rounded-3xl px-4 py-1 hover:bg-blue-600"
        onClick={() => {
          navigate("/");
        }}
      >
        GO BACK HOME
      </button>
    </div>
  );
}

export default NoAccess;
