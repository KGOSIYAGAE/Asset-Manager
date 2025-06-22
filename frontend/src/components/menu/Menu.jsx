import React, { useState } from "react";
import { PiStudentFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { MdDevices, MdDashboard } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import LogoCard from "../cards/logoCard/LogoCard";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

function Menu({ isMinimized }) {
  const [showDeviceOption, setShowDeviceOptions] = useState(false);

  return (
    <div className="h-svh flex flex-col justify-between">
      <div className={`h-svh flex flex-col ${isMinimized ? "items-center" : ""} p-3`}>
        {isMinimized ? <span className="font-bold">SPU</span> : <LogoCard />}
        {isMinimized ? "" : <span className="text-zinc-800 font-bold">Menu</span>}
        <div className={`flex flex-col gap-5 ${isMinimized ? " py-10" : "p-3"}`}>
          <Link to={"/home"}>
            <div className="menu-items">
              <div className="bg-zinc-100 rounded-md p-2">
                <MdDashboard size={18} className="" />
              </div>
              {isMinimized ? "" : <span className="">Dashboard</span>}
            </div>
          </Link>
          {/**/}

          <div className="flex flex-col gap-2">
            <div
              className="menu-items  justify-between "
              onClick={() => {
                showDeviceOption ? setShowDeviceOptions(false) : setShowDeviceOptions(true);
              }}
            >
              <div className="flex items-center ">
                <div className="bg-zinc-100 rounded-md p-2">
                  <MdDevices size={18} className="" />
                </div>
                {isMinimized ? "" : <span className="">Devices</span>}
              </div>
              <div className=" flex ">{showDeviceOption ? <IoChevronUp size={15} className="" /> : <IoChevronDown size={15} className=" " />}</div>
            </div>
            {/**/}

            <div className={`${showDeviceOption ? "flex" : "hidden"} flex-col text-zinc-500 gap-3 pl-10`}>
              <Link to={"/devices"}>
                <div className="flex items-center gap-2 menu-items">
                  <div className="flex bg-zinc-100 rounded-md p-2 gap-2"></div>
                  <span className="text-sm">View All</span>
                </div>
              </Link>
              <Link to={"/devices/loaned-device"}>
                <div className="flex items-center gap-2 menu-items" onClick={() => {}}>
                  <div className="flex bg-zinc-100 rounded-md p-2 gap-2"></div>
                  <span className="text-sm">Loans</span>
                </div>
              </Link>
              <Link to={"/devices/device-due-upgrade"}>
                <div className="flex items-center gap-2 menu-items">
                  <div className="flex bg-zinc-100 rounded-md p-2 gap-2"></div>
                  <span className="text-sm">Due upgrade</span>
                </div>
              </Link>
            </div>
          </div>
          {/**/}
          <Link to={"/users/staff/"}>
            <div className="menu-items">
              <div className="bg-zinc-100 rounded-md p-2">
                <FaPeopleGroup size={18} className="" />
              </div>
              {isMinimized ? "" : <span className="">Staff</span>}
            </div>
          </Link>
          {/**/}
          <Link to={"/users/students"}>
            <div className="menu-items">
              <div className="bg-zinc-100 rounded-md p-2">
                <PiStudentFill size={18} className="" />
              </div>
              {isMinimized ? "" : <span className="">Students</span>}
            </div>
          </Link>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Menu;
