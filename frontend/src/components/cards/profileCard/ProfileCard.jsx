import React, { useState } from "react";
import { getIntials } from "../../../utils/getIntials";
import { MdLogout } from "react-icons/md";

function ProfileCard() {
  const [userName, setUsername] = useState("Kgosiyagae Motabogi");

  return (
    <div className=" flex items-center p-3 gap-3 border">
      <div className="w-[50px] flex justify-center bg-zinc-100 p-3 rounded-full border border-zinc-300">
        <span>{getIntials(userName)}</span>
      </div>
      <div className="flex flex-col justify-center">
        <span>{`${userName}`}</span>
      </div>

      <div className="menu-items bg-zinc-100 rounded-md p-2">
        <MdLogout size={20} className="text-zinc-500" />
      </div>
    </div>
  );
}

export default ProfileCard;
