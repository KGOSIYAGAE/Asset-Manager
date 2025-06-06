import React, { useEffect, useState } from "react";
import ProfileCard from "../cards/profileCard/ProfileCard";
import { MdMenu } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import NotificationCard from "../cards/notificationCard/NotificationCard";

function Navbar({ onCloseMenu, notifications }) {
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
        <NotificationCard />
        <ProfileCard />
        <div className="menu-items">
          <MdOutlineSettings size={25} className="" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
