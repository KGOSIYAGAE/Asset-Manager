import React from "react";
import { MdCheck } from "react-icons/md";

function SuccessPage() {
  return (
    <div className="w-svw h-svh flex flex-col gap-10 items-center justify-center ">
      <div className="bg-green-100 rounded-full p-20 animate-pulse ">
        <div className="bg-green-600 rounded-full">
          <MdCheck size={300} className="text-white animate-none" />
        </div>
      </div>
      <div>{/*<span className="text-xl font-bold">A copy has been sent to your email.</span>*/}</div>
    </div>
  );
}

export default SuccessPage;
