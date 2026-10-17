import React, { useState } from "react";
import { PiStudentFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { MdDevices, MdDashboard, MdMenu, MdOutlineSettings } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import LogoCard from "../cards/logoCard/LogoCard";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { FaUsersGear } from "react-icons/fa6";
import { CgInsights } from "react-icons/cg";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { hasPermission } from "../../utils/getLoggedInUser";
import { IoMdClose } from "react-icons/io";
import { GiOrganigram } from "react-icons/gi";

function Menu({ isMinimized, setIsMinimize, onCloseMenu }) {
  const [showDeviceOption, setShowDeviceOptions] = useState(false);
  const [showOrganizationOption, setShowOrganizationOptions] = useState(false);
  const [showSupportOption, setShowSupportOptions] = useState(false);
  const [showUserManagementOption, setShowUserManagementOptions] = useState(false);
  const [showReportOption, setShowReportOptions] = useState(false);

  const [showSettingstOption, setShowSettingsOptions] = useState(false);
  const [showGeneralSettingstOption, setShowGeneralSettingsOptions] = useState(false);
  const [showSystemSettingstOption, setShowSystemSettingsOptions] = useState(false);

  return (
    <div className="  h-svh flex flex-col justify-between  text-white">
      <div className={`h-svh flex flex-col bg-red-600 ${isMinimized ? "items-center lg:w-[60px] " : ""} p-3 `}>
        {isMinimized ? (
          <div className="w-full flex lg:flex-col items-center justify-end ">
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
          {/*Dashboard */}
          <Link to={"/home"}>
            <div className="menu-items ">
              <div className="menu-icon">
                <MdDashboard size={18} className="" />
              </div>
              {isMinimized ? <span className="lg:hidden">Dashboard</span> : <span className="">Dashboard</span>}
            </div>
          </Link>

          {/*Devices*/}
          <div className="flex flex-col gap-2 ">
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

            {/**/}

            <div className={`${showDeviceOption ? "flex" : "hidden"} flex-col  gap-1 ml-5 pl-6 border-l border-white border-opacity-50`}>
              <Link to={"/devices"}>
                <div
                  className="menu-items"
                  onClick={() => {
                    console.log(isMinimized);
                  }}
                >
                  <span className="text-sm p-1">All Devices</span>
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
                    <span className="text-sm p-1">Loaned Devices</span>
                  </div>
                </Link>
              )}
              {hasPermission("view-upgrades") && (
                <Link to={"/devices/device-due-upgrade"}>
                  <div className="menu-items">
                    <span className="text-sm p-1">Upgrade Due</span>
                  </div>
                </Link>
              )}
              {hasPermission("view-due-return") && (
                <Link to={"/devices/device-due-return"}>
                  <div className="menu-items">
                    <span className="text-sm p-1">Return Due By Intern/ Contractors</span>
                  </div>
                </Link>
              )}
              {hasPermission("approve") && (
                <Link to={"/devices/device-approval"}>
                  <div className="menu-items">
                    <span className="text-sm p-1">Device Approval</span>
                  </div>
                </Link>
              )}
            </div>
          </div>
          {/**/}

          {/*<Link to={"/users/staff/"}>
            <div className="menu-items">
              <div className="menu-icon">
                <FaPeopleGroup size={18} className="" />
              </div>
              {isMinimized ? <span className="lg:hidden">Staff</span> : <span className="">Staff</span>}
            </div>
          </Link>*/}

          {/*Staff Menu Option*/}
          <div className="flex flex-col gap-2 ">
            <Link to={"/users/staff/"}>
              <div className="menu-items  justify-between " onClick={() => {}}>
                <div className="flex items-center gap-3 ">
                  <div className="menu-icon">
                    <FaPeopleGroup size={18} className="" />
                  </div>
                  {isMinimized ? <span className="lg:hidden">Staff</span> : <span className="">Staff</span>}
                </div>
              </div>
            </Link>
            {/**/}
          </div>
          {/**/}

          {/*Student Menu*/}
          <Link to={"/users/students"}>
            <div className="menu-items">
              <div className="menu-icon">
                <PiStudentFill size={18} className="" />
              </div>
              {isMinimized ? <span className="lg:hidden">Students</span> : <span className="">Students</span>}
            </div>
          </Link>

          {/*Organization Menu Option*/}
          <div className="flex flex-col gap-2 ">
            <div
              className="menu-items  justify-between "
              onClick={() => {
                showOrganizationOption ? setShowOrganizationOptions(false) : setShowOrganizationOptions(true);
              }}
            >
              <div className="flex items-center gap-3 ">
                <div className="menu-icon">
                  <GiOrganigram size={18} className="" />
                </div>
                {isMinimized ? <span className="lg:hidden">Organization</span> : <span className="">Organization</span>}
              </div>
              {isMinimized ? (
                <div className=" flex lg:hidden">{showOrganizationOption ? <IoChevronUp size={15} className="" /> : <IoChevronDown size={15} className=" " />}</div>
              ) : (
                <div className=" flex ">{showOrganizationOption ? <IoChevronUp size={15} className="" /> : <IoChevronDown size={15} className=" " />}</div>
              )}
            </div>

            {/**/}

            <div className={`${showOrganizationOption ? "flex" : "hidden"} flex-col  gap-1 ml-5 pl-6 border-l border-white border-opacity-50`}>
              {hasPermission("loan") && (
                <Link to={"/organization/faculties"}>
                  <div className="menu-items" onClick={() => {}}>
                    <span className="text-sm p-1">Faculties</span>
                  </div>
                </Link>
              )}
              {hasPermission("view-upgrades") && (
                <Link to={"/organization/departments"}>
                  <div className="menu-items">
                    <span className="text-sm p-1">Departments</span>
                  </div>
                </Link>
              )}
              {hasPermission("view-due-return") && (
                <Link to={"/organization/positions"}>
                  <div className="menu-items">
                    <span className="text-sm p-1">Positions</span>
                  </div>
                </Link>
              )}
            </div>
          </div>
          {/**/}

          {/*Repairst*/}
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

          {/*Settings Menu Option*/}
          <div className="flex flex-col gap-2 ">
            <div
              className="menu-items  justify-between "
              onClick={() => {
                showSettingstOption ? setShowSettingsOptions(false) : setShowSettingsOptions(true);
              }}
            >
              <div className="flex items-center gap-3 ">
                <div className="menu-icon">
                  <MdOutlineSettings size={18} className="" />
                </div>
                {isMinimized ? <span className="lg:hidden">Settings</span> : <span className="">Settings</span>}
              </div>
              {isMinimized ? (
                <div className=" flex lg:hidden">{showSettingstOption ? <IoChevronUp size={15} className="" /> : <IoChevronDown size={15} className=" " />}</div>
              ) : (
                <div className=" flex ">{showSettingstOption ? <IoChevronUp size={15} className="" /> : <IoChevronDown size={15} className=" " />}</div>
              )}
            </div>

            {/**/}

            <div className={`${showSettingstOption ? "flex" : "hidden"} flex-col  gap-1 ml-5 pl-6 border-l border-white border-opacity-50`}>
              {/*General Settings Menu Option*/}
              <div className="flex flex-col gap-2 ">
                <div
                  className="menu-items  justify-between "
                  onClick={() => {
                    showGeneralSettingstOption ? setShowGeneralSettingsOptions(false) : setShowGeneralSettingsOptions(true);
                  }}
                >
                  <div className="flex items-center gap-3 ">{isMinimized ? <span className="lg:hidden">General Settings</span> : <span className="">General Settings</span>}</div>
                  {isMinimized ? (
                    <div className=" flex lg:hidden">{showGeneralSettingstOption ? <IoChevronUp size={15} className="" /> : <IoChevronDown size={15} className=" " />}</div>
                  ) : (
                    <div className=" flex ">{showGeneralSettingstOption ? <IoChevronUp size={15} className="" /> : <IoChevronDown size={15} className=" " />}</div>
                  )}
                </div>

                {/**/}

                <div className={`${showGeneralSettingstOption ? "flex" : "hidden"} flex-col  gap-1 ml-5 pl-6 border-l border-white border-opacity-50`}>
                  {hasPermission("loan") && (
                    <Link to={"/organization/faculties"}>
                      <div className="menu-items" onClick={() => {}}>
                        <span className="text-sm p-1">Profile</span>
                      </div>
                    </Link>
                  )}
                  {hasPermission("view-upgrades") && (
                    <Link to={"/organization/departments"}>
                      <div className="menu-items">
                        <span className="text-sm p-1">Security</span>
                      </div>
                    </Link>
                  )}
                  {hasPermission("view-due-return") && (
                    <Link to={"/organization/positions"}>
                      <div className="menu-items">
                        <span className="text-sm p-1">Notifications</span>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
              {/**/}

              {/*System Settings Menu Option*/}
              <div className="flex flex-col gap-2 ">
                <div
                  className="menu-items  justify-between "
                  onClick={() => {
                    showSystemSettingstOption ? setShowSystemSettingsOptions(false) : setShowSystemSettingsOptions(true);
                  }}
                >
                  <div className="flex items-center gap-3 ">{isMinimized ? <span className="lg:hidden">System Settings</span> : <span className="">System Settings</span>}</div>
                  {isMinimized ? (
                    <div className=" flex lg:hidden">{showSystemSettingstOption ? <IoChevronUp size={15} className="" /> : <IoChevronDown size={15} className=" " />}</div>
                  ) : (
                    <div className=" flex ">{showSystemSettingstOption ? <IoChevronUp size={15} className="" /> : <IoChevronDown size={15} className=" " />}</div>
                  )}
                </div>

                {/**/}

                <div className={`${showSystemSettingstOption ? "flex" : "hidden"} flex-col  gap-1 ml-5 pl-6 border-l border-white border-opacity-50`}>
                  {hasPermission("loan") && (
                    <Link to={"/settings/email-settings"}>
                      <div className="menu-items" onClick={() => {}}>
                        <span className="text-sm p-1">Email Settings</span>
                      </div>
                    </Link>
                  )}
                  {hasPermission("view-upgrades") && (
                    <Link to={"/organization/departments"}>
                      <div className="menu-items">
                        <span className="text-sm p-1">Email Templates</span>
                      </div>
                    </Link>
                  )}
                  {hasPermission("view-due-return") && (
                    <Link to={"/organization/positions"}>
                      <div className="menu-items">
                        <span className="text-sm p-1">Form Templates</span>
                      </div>
                    </Link>
                  )}
                  {hasPermission("view-due-return") && (
                    <Link to={"/organization/positions"}>
                      <div className="menu-items">
                        <span className="text-sm p-1">Disclaimer Templates</span>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
              {/**/}
            </div>
          </div>
          {/**/}

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
              <div className={`${showUserManagementOption ? "flex " : "hidden"} flex-col  gap-1 ml-5 pl-6 border-l border-white border-opacity-50`}>
                <Link to={"/users/roles-and-permissions"}>
                  <div className="flex items-center gap-2 menu-items p-1">
                    <span className="text-sm">Role & Permissions</span>
                  </div>
                </Link>
                <Link to={"/devices/loaned-device"}>
                  <div className="flex items-center gap-2 menu-items p-1" onClick={() => {}}>
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
