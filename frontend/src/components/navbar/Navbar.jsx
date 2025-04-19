import React, { useEffect, useState } from "react";
import ProfileCard from "../cards/profileCard/ProfileCard";
import { MdMenu } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { BsBell } from "react-icons/bs";

function Navbar({ onCloseMenu, notifications }) {
  const [systNotifications, setSystNotifications] = useState(0);

  useEffect(() => {
    setSystNotifications(2);
  }, [notifications]);

  return (
    <div className="flex justify-between items-center shadow-md px-3 cursor-pointer">
      <div
        onClick={() => {
          onCloseMenu();
        }}
      >
        <MdMenu size={25} className="menu-items" />
      </div>
      <div className="flex justify-center items-center gap-3">
        <div className="w-[40px] h-[40px] flex items-center">
          <BsBell className="menu-items" size={20} />
          {systNotifications ? (
            <div className="w-[20px] h-[40px] ">
              <div className="w-[18px] h-[18px] flex items-center justify-center bg-red-400 rounded-full p-2">
                <span className="text-white text-sm">{systNotifications}</span>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <ProfileCard />
        <div className="menu-items">
          <MdOutlineSettings size={25} className="" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
