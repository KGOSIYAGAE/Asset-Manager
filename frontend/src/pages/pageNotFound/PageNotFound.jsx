import React from "react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-svh flex flex-col items-center justify-center gap-3 ">
      <div className=" flex flex-col items-center ">
        <img src="../public/404-error-2.jpg" alt="" className="w-3/12" />
        <span className="text-gray-800 font-semibold">uh-oh! Page not found...</span>
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

export default PageNotFound;
