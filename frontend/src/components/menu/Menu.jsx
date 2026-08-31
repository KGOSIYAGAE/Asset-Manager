import React, { useState } from "react";
import { PiStudentFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { MdDevices, MdDashboard, MdMenu } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import LogoCard from "../cards/logoCard/LogoCard";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { FaUsersGear } from "react-icons/fa6";
import { CgInsights } from "react-icons/cg";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { hasPermission } from "../../utils/getLoggedInUser";
import { IoMdClose } from "react-icons/io";

function Menu({ isMinimized, onCloseMenu }) {
  const [showDeviceOption, setShowDeviceOptions] = useState(false);
  const [showSupportOption, setShowSupportOptions] = useState(false);
  const [showUserManagementOption, setShowUserManagementOptions] = useState(false);
  const [showReportOption, setShowReportOptions] = useState(false);

  return (
    <div className="h-svh flex flex-col justify-between bg-red-600 text-white">
      <div className={`h-svh flex flex-col ${isMinimized ? "items-center" : ""} p-3`}>
        {isMinimized ? (
          <div className="w-full flex lg:flex-col items-center justify-end">
            <div
              onClick={() => {
                onCloseMenu();
              }}
              className="flex text-white"
            >
              <IoMdClose className="lg:hidden size-7" />
            </div>
          </div>
        ) : (
          <div className="flex justify-between">
            <LogoCard />
          </div>
        )}
        {isMinimized ? "" : <span className=" font-bold">Menu</span>}
        <div className={`flex flex-col gap-5 ${isMinimized ? " py-10" : ""}`}>
          <Link to={"/home"}>
            <div className="menu-items ">
              <div className="menu-icon">
                <MdDashboard size={18} className="" />
              </div>
              {isMinimized ? <span className="lg:hidden">Dashboard</span> : <span className="">Dashboard</span>}
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
                  <div className="menu-icon">
                    <MdDevices size={18} className="" />
                  </div>
                  {isMinimized ? <span className="lg:hidden">Devices</span> : <span className="">Devices</span>}
                </div>
                {isMinimized ? (
                  <div className=" flex lg:hidden">{showDeviceOption ? <IoChevronUp size={15} className="" /> : <IoChevronDown size={15} className=" " />}</div>
                ) : (
                  <div className=" flex ">{showDeviceOption ? <IoChevronUp size={15} className="" /> : <IoChevronDown size={15} className=" " />}</div>
                )}
              </div>
            </Link>
            {/**/}

            <div className={`${showDeviceOption ? "flex" : "hidden"} flex-col gap-3 pl-10`}>
              <Link to={"/devices"}>
                <div className="menu-items">
                  <div className="menu-icon"></div>
                  <span className="text-sm">All Devices</span>
                </div>
              </Link>
              {/*<Link to={"/devices/loaned-device"}>
                <div className="flex items-center gap-2 menu-items" onClick={() => {}}>
                  <div className="flex bg-zinc-100 rounded-md p-2 gap-2"></div>
                  <span className="text-sm">Assign Device</span>
                </div>
              </Link>*/}
              {hasPermission("loan") && (
                <Link to={"/devices/loaned-device"}>
                  <div className="menu-items" onClick={() => {}}>
                    <div className="menu-icon"></div>
                    <span className="text-sm">Loaned Devices</span>
                  </div>
                </Link>
              )}
              {hasPermission("view-upgrades") && (
                <Link to={"/devices/device-due-upgrade"}>
                  <div className="menu-items">
                    <div className="menu-icon"></div>
                    <span className="text-sm">Upgrade Due</span>
                  </div>
                </Link>
              )}
              {hasPermission("view-due-return") && (
                <Link to={"/devices/device-due-return"}>
                  <div className="menu-items">
                    <div className="menu-icon"></div>
                    <span className="text-sm">Return Due By Intern/ Contractors</span>
                  </div>
                </Link>
              )}
              {hasPermission("approve") && (
                <Link to={"/devices/device-approval"}>
                  <div className="menu-items">
                    <div className="menu-icon"></div>
                    <span className="text-sm">Device Approval</span>
                  </div>
                </Link>
              )}
            </div>
          </div>
          {/**/}

          <Link to={"/users/staff/"}>
            <div className="menu-items">
              <div className="menu-icon">
                <FaPeopleGroup size={18} className="" />
              </div>
              {isMinimized ? <span className="lg:hidden">Staff</span> : <span className="">Staff</span>}
            </div>
          </Link>
          {/**/}
          <Link to={"/users/students"}>
            <div className="menu-items">
              <div className="menu-icon">
                <PiStudentFill size={18} className="" />
              </div>
              {isMinimized ? <span className="lg:hidden">Students</span> : <span className="">Students</span>}
            </div>
          </Link>

          {/*Asset & Support Management*/}
          {hasPermission("view-repairs") && (
            <div className="flex flex-col gap-2">
              <Link to={"/repairs"}>
                <div className="menu-items  justify-between ">
                  <div className="flex items-center gap-3">
                    <div className="menu-icon">
                      <HiOutlineWrenchScrewdriver size={18} className="" />
                    </div>
                    {isMinimized ? <span className="lg:hidden">Repairs</span> : <span className="">Repairs</span>}
                  </div>
                </div>
              </Link>
              {/**/}
            </div>
          )}

          {/*Asset & Support Management*
          <div className="flex flex-col gap-2">
            <Link to={"/email-templates"}>
              <div className="menu-items  justify-between ">
                <div className="flex items-center gap-3">
                  <div className="menu-icon">
                    <HiOutlineWrenchScrewdriver size={18} className="" />
                  </div>
                  {isMinimized ? "" : <span className="">Email Template</span>}
                </div>
              </div>
            </Link>
            {/**
          </div>*/}

          {/*User Management*/}
          {hasPermission("manage-roles") && (
            <div className="flex flex-col gap-2">
              <div
                className="menu-items  justify-between "
                onClick={() => {
                  showUserManagementOption ? setShowUserManagementOptions(false) : setShowUserManagementOptions(true);
                }}
              >
                <div className="flex items-center gap-3 ">
                  <div className="menu-icon">
                    <FaUsersGear size={18} className="" />
                  </div>
                  {isMinimized ? <span className="lg:hidden">User Management</span> : <span className="">User Management</span>}
                </div>
                {isMinimized ? (
                  <div className=" flex lg:hidden">{showDeviceOption ? <IoChevronUp size={15} className="" /> : <IoChevronDown size={15} className=" " />}</div>
                ) : (
                  <div className=" flex ">{showDeviceOption ? <IoChevronUp size={15} className="" /> : <IoChevronDown size={15} className=" " />}</div>
                )}
              </div>
              {/**/}
              <div className={`${showUserManagementOption ? "flex" : "hidden"} flex-col  gap-3 pl-10`}>
                <Link to={"/users/roles-and-permissions"}>
                  <div className="flex items-center gap-2 menu-items">
                    <div className="menu-icon"></div>
                    <span className="text-sm">Role & Permissions</span>
                  </div>
                </Link>
                <Link to={"/devices/loaned-device"}>
                  <div className="flex items-center gap-2 menu-items" onClick={() => {}}>
                    <div className="menu-icon"></div>
                    <span className="text-sm">User Logs</span>
                  </div>
                </Link>
              </div>
            </div>
          )}
          {/**/}

          {/*Reports and Insight*/}
          {/*
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
          </div>*/}
          {/**/}
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Menu;
