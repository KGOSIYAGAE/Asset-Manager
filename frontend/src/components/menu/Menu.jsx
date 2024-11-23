import React, { useState } from "react";
import { IoMdPeople } from "react-icons/io";
import { PiStudentFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { MdDevices, MdDashboard } from "react-icons/md";
import ProfileCard from "../cards/profileCard/ProfileCard";
import LogoCard from "../cards/logoCard/LogoCard";
import { BsBoxArrowDown, BsBoxArrowUp, BsSendArrowDown, BsSendArrowUp } from "react-icons/bs";
import { CgViewList } from "react-icons/cg";

function Menu() {
  const [showDeviceOption, setShowDeviceOptions] = useState(false);

  return (
    <div className="h-svh flex flex-col justify-between">
      <div className="flex flex-col p-3">
        <LogoCard />
        <span className="text-zinc-800 font-bold">Menu</span>
        <div className="flex flex-col gap-5 p-3">
          <Link to={"/"}>
            <div className="menu-items">
              <div className="bg-zinc-100 rounded-md p-2">
                <MdDashboard size={18} className="" />
              </div>
              <span className="">Dashboard</span>
            </div>
          </Link>
          {/**/}
          <Link to={"/devices"}>
            <div className="flex flex-col gap-2">
              <div
                className="menu-items"
                onClick={() => {
                  if (showDeviceOption) {
                    setShowDeviceOptions(false);
                  } else {
                    setShowDeviceOptions(true);
                  }
                }}
              >
                <div className="bg-zinc-100 rounded-md p-2">
                  <MdDevices size={18} className="" />
                </div>
                <span className="">Devices</span>
              </div>
              {/**/}
              <div className={`${showDeviceOption ? "flex" : "hidden"} flex-col text-zinc-500 gap-3 pl-10`}>
                <Link to={"/devices"}>
                  <div className="flex items-center gap-2">
                    <div className="flex bg-zinc-100 rounded-md p-2 gap-2">
                      <CgViewList size={18} className="" />
                    </div>
                    <span className="text-sm">View All Device</span>
                  </div>
                </Link>
                <Link to={"/devices/check-out-device"}>
                  <div className="flex items-center gap-2" onClick={() => {}}>
                    <div className="flex bg-zinc-100 rounded-md p-2 gap-2">
                      <BsBoxArrowUp size={18} className="" />
                    </div>
                    <span className="text-sm">Check Out Device</span>
                  </div>
                </Link>
                <div className="flex items-center gap-2">
                  <div className="flex bg-zinc-100 rounded-md p-2 gap-2">
                    <BsBoxArrowDown size={18} className="" />
                  </div>
                  <span className="text-sm">Check In Device</span>
                </div>
              </div>
            </div>
          </Link>
          {/**/}
          <Link to={"/users/staff/"}>
            <div className="menu-items">
              <div className="bg-zinc-100 rounded-md p-2">
                <IoMdPeople size={18} className="" />
              </div>
              <span className="">Staff</span>
            </div>
          </Link>
          {/**/}
          <Link to={"users/students"}>
            <div className="menu-items">
              <div className="bg-zinc-100 rounded-md p-2">
                <PiStudentFill size={18} className="" />
              </div>
              <span className="">Students</span>
            </div>
          </Link>
        </div>
      </div>
      <div>
        <ProfileCard />
      </div>
    </div>
  );
}

export default Menu;
