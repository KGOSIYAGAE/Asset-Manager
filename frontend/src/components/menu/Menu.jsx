import React, { useState } from "react";
import { PiStudentFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { MdDevices, MdDashboard } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import LogoCard from "../cards/logoCard/LogoCard";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { FaUsersGear } from "react-icons/fa6";
import { CgInsights } from "react-icons/cg";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";

function Menu({ isMinimized }) {
  const [showDeviceOption, setShowDeviceOptions] = useState(false);
  const [showSupportOption, setShowSupportOptions] = useState(false);
  const [showUserManagementOption, setShowUserManagementOptions] = useState(false);
  const [showReportOption, setShowReportOptions] = useState(false);

  return (
    <div className="h-svh flex flex-col justify-between ">
      <div className={`h-svh flex flex-col ${isMinimized ? "items-center" : ""} p-3`}>
        {isMinimized ? <span className="font-bold">SPU</span> : <LogoCard />}
        {isMinimized ? "" : <span className="text-zinc-800 font-bold">Menu</span>}
        <div className={`flex flex-col gap-5 ${isMinimized ? " py-10" : ""}`}>
          <Link to={"/home"}>
            <div className="menu-items ">
              <div className="bg-zinc-100 rounded-md p-2">
                <MdDashboard size={18} className="" />
              </div>
              {isMinimized ? "" : <span className="">Dashboard</span>}
            </div>
          </Link>

          {/**/}
          <div className="flex flex-col gap-2 ">
            <Link to={"/devices"}>
              <div
                className="menu-items  justify-between "
                onClick={() => {
                  showDeviceOption ? setShowDeviceOptions(false) : setShowDeviceOptions(true);
                }}
              >
                <div className="flex items-center gap-3 ">
                  <div className="bg-zinc-100 rounded-md p-2">
                    <MdDevices size={18} className="" />
                  </div>
                  {isMinimized ? "" : <span className="">Devices</span>}
                </div>
                {isMinimized ? "" : <div className=" flex ">{showDeviceOption ? <IoChevronUp size={15} className="" /> : <IoChevronDown size={15} className=" " />}</div>}
              </div>
            </Link>
            {/**/}

            <div className={`${showDeviceOption ? "flex" : "hidden"} flex-col text-zinc-500 gap-3 pl-10`}>
              <Link to={"/devices"}>
                <div className="flex items-center gap-2 menu-items">
                  <div className="flex bg-zinc-100 rounded-md p-2 gap-2"></div>
                  <span className="text-sm">All Devices</span>
                </div>
              </Link>
              {/*<Link to={"/devices/loaned-device"}>
                <div className="flex items-center gap-2 menu-items" onClick={() => {}}>
                  <div className="flex bg-zinc-100 rounded-md p-2 gap-2"></div>
                  <span className="text-sm">Assign Device</span>
                </div>
              </Link>*/}
              <Link to={"/devices/loaned-device"}>
                <div className="flex items-center gap-2 menu-items" onClick={() => {}}>
                  <div className="flex bg-zinc-100 rounded-md p-2 gap-2"></div>
                  <span className="text-sm">Loaned Devices</span>
                </div>
              </Link>
              <Link to={"/devices/device-due-upgrade"}>
                <div className="flex items-center gap-2 menu-items">
                  <div className="flex bg-zinc-100 rounded-md p-2 gap-2"></div>
                  <span className="text-sm">Upgrade Due</span>
                </div>
              </Link>
              <Link to={"/devices/device-due-return"}>
                <div className="flex items-center gap-2 menu-items">
                  <div className="flex bg-zinc-100 rounded-md p-2 gap-2"></div>
                  <span className="text-sm">Return Due</span>
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

          {/*Asset & Support Management*/}
          <div className="flex flex-col gap-2">
            <div
              className="menu-items  justify-between "
              onClick={() => {
                showSupportOption ? setShowSupportOptions(false) : setShowSupportOptions(true);
              }}
            >
              <div className="flex items-center gap-3">
                <div className="bg-zinc-100 rounded-md p-2">
                  <HiOutlineWrenchScrewdriver size={18} className="" />
                </div>
                {isMinimized ? "" : <span className="">Support Management</span>}
              </div>
              {isMinimized ? "" : <div className=" flex ">{showDeviceOption ? <IoChevronUp size={15} className="" /> : <IoChevronDown size={15} className=" " />}</div>}
            </div>
            {/**/}
            <div className={`${showSupportOption ? "flex" : "hidden"} flex-col text-zinc-500 gap-3 pl-10`}>
              <Link to={"/devices"}>
                <div className="flex items-center gap-2 menu-items">
                  <div className="flex bg-zinc-100 rounded-md p-2 gap-2"></div>
                  <span className="text-sm">Repairs</span>
                </div>
              </Link>
              <Link to={"/devices/loaned-device"}>
                <div className="flex items-center gap-2 menu-items" onClick={() => {}}>
                  <div className="flex bg-zinc-100 rounded-md p-2 gap-2"></div>
                  <span className="text-sm">Damaged Devices</span>
                </div>
              </Link>
              <Link to={"/devices/loaned-device"}>
                <div className="flex items-center gap-2 menu-items" onClick={() => {}}>
                  <div className="flex bg-zinc-100 rounded-md p-2 gap-2"></div>
                  <span className="text-sm">Device History</span>
                </div>
              </Link>
            </div>
          </div>
          {/**/}

          {/*User Management*/}
          <div className="flex flex-col gap-2">
            <div
              className="menu-items  justify-between "
              onClick={() => {
                showUserManagementOption ? setShowUserManagementOptions(false) : setShowUserManagementOptions(true);
              }}
            >
              <div className="flex items-center gap-3 ">
                <div className="bg-zinc-100 rounded-md p-2">
                  <FaUsersGear size={18} className="" />
                </div>
                {isMinimized ? "" : <span className="">User Management</span>}
              </div>
              {isMinimized ? "" : <div className=" flex ">{showDeviceOption ? <IoChevronUp size={15} className="" /> : <IoChevronDown size={15} className=" " />}</div>}
            </div>
            {/**/}
            <div className={`${showUserManagementOption ? "flex" : "hidden"} flex-col text-zinc-500 gap-3 pl-10`}>
              <Link to={"/devices"}>
                <div className="flex items-center gap-2 menu-items">
                  <div className="flex bg-zinc-100 rounded-md p-2 gap-2"></div>
                  <span className="text-sm">Role & Permissions</span>
                </div>
              </Link>
              <Link to={"/devices/loaned-device"}>
                <div className="flex items-center gap-2 menu-items" onClick={() => {}}>
                  <div className="flex bg-zinc-100 rounded-md p-2 gap-2"></div>
                  <span className="text-sm">User Logs</span>
                </div>
              </Link>
            </div>
          </div>
          {/**/}

          {/*Reports and Insight*/}
          <div className="flex flex-col gap-2">
            <div
              className="menu-items  justify-between "
              onClick={() => {
                showReportOption ? setShowReportOptions(false) : setShowReportOptions(true);
              }}
            >
              <div className="flex items-center gap-3">
                <div className="bg-zinc-100 rounded-md p-2">
                  <CgInsights size={18} className="" />
                </div>
                {isMinimized ? "" : <span className="">Reports & Insight</span>}
              </div>
              {isMinimized ? "" : <div className=" flex ">{showDeviceOption ? <IoChevronUp size={15} className="" /> : <IoChevronDown size={15} className=" " />}</div>}
            </div>
            {/**/}
            <div className={`${showReportOption ? "flex" : "hidden"} flex-col text-zinc-500 gap-3 pl-10`}>
              <Link to={"/devices"}>
                <div className="flex items-center gap-2 menu-items">
                  <div className="flex bg-zinc-100 rounded-md p-2 gap-2"></div>
                  <span className="text-sm">Device Reports</span>
                </div>
              </Link>
              <Link to={"/devices/loaned-device"}>
                <div className="flex items-center gap-2 menu-items" onClick={() => {}}>
                  <div className="flex bg-zinc-100 rounded-md p-2 gap-2"></div>
                  <span className="text-sm">Loan Analytics</span>
                </div>
              </Link>
              <Link to={"/devices/loaned-device"}>
                <div className="flex items-center gap-2 menu-items" onClick={() => {}}>
                  <div className="flex bg-zinc-100 rounded-md p-2 gap-2"></div>
                  <span className="text-sm">Complience Reports</span>
                </div>
              </Link>
            </div>
          </div>
          {/**/}
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Menu;
