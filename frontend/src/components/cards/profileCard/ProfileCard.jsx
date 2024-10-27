import React, { useState } from "react";
import { getIntials } from "../../../utils/getIntials";

function ProfileCard() {
  const [userName, setUsername] = useState("Kgosiyagae Motabogi");

  return (
    <div className="flex gap-3">
      <div className="bg-zinc-100 p-3 rounded-full border border-zinc-300">
        <span>{getIntials(userName)}</span>
      </div>
      <div className="flex flex-col justify-center">
        <span>{userName}</span>
        <span className="link-text underline">LOGOUT</span>
      </div>
    </div>
  );
}

export default ProfileCard;
