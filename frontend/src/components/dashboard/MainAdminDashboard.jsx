import React, { useEffect } from "react";
import { BsClipboard2Pulse } from "react-icons/bs";
import { FaArrowRight, FaUser, FaUserGraduate } from "react-icons/fa";
import { FaHandHoldingDroplet, FaHandshakeSimple } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdDevices, MdDevicesOther, MdLaptopWindows, MdOutlineAssignmentTurnedIn, MdOutlineDesktopWindows, MdOutlineMonitor, MdOutlineTabletMac } from "react-icons/md";
import { getPercentage } from "../../utils/getValueInPercentage";
import { AiOutlinePrinter } from "react-icons/ai";

function MainAdminDashboard({ loggedInUser, deviceStats, studentsStats, staffStats, path }) {
  const availableEnd = (deviceStats?.available_devices / deviceStats?.total_devices) * 100;
  const assignedEnd = availableEnd + (deviceStats?.assigned_devices / deviceStats?.total_devices) * 100;
  const loanedEnd = assignedEnd + (deviceStats?.loaned_devices / deviceStats?.total_devices) * 100;
  const maintenanceEnd = loanedEnd + (deviceStats?.maintenance_devices / deviceStats?.total_devices) * 100;
  const avEnd = 100;

  const issuedStaff = (deviceStats?.issued_to_staff / deviceStats?.assigned_devices) * 100;
  const issuedStudents = issuedStaff + (deviceStats?.loaned_to_students / deviceStats?.assigned_devices) * 100;

  useEffect(() => {
    console.log(deviceStats);
  }, []);

  return (
    <div className="h-svh flex flex-col p-3 gap-3 bg-zinc-50 overflow-y-scroll">
      <div className="flex flex-col">
        <span className="text-xl font-bold">Dashboard</span>
        <span className="text-sm text-slate-600">Welcome back1 Here's what's happening with your ICT assets.</span>
      </div>
      <div className="flex flex-col gap-5">
        {/* Device Summary*/}
        <div className="grid grid-cols-2 lg:grid-cols-5 grid-rows-1 gap-5">
          {/* */}
          <div className="flex items-center bg-white gap-3 border shadow-md rounded-md p-5">
            <div className="w-[52px] h-[52px] flex items-center justify-center bg-red-50 border border-red-500 rounded-full">
              <MdDevices size={25} className="text-red-600" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-black">Total Devices</span>
              <div className="flex flex-col">
                <span className="font-bold text-xl">{deviceStats?.total_devices}</span>
                <span className="text-sm text-slate-500">All registered devices</span>
              </div>
            </div>
          </div>

          {/* */}
          <div className="flex items-center bg-white gap-3 border shadow-md rounded-md p-5">
            <div className="w-[52px] h-[52px] flex items-center justify-center bg-green-50 border border-green-500 rounded-full">
              <IoIosCheckmarkCircleOutline size={25} className="text-green-600" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-black">Total Available</span>

              <div className="flex flex-col">
                <span className="font-bold text-xl">{deviceStats?.available_devices}</span>
                <span className="text-sm text-slate-500">Ready to be assigned</span>
              </div>
            </div>
          </div>

          {/* */}
          <div className="flex items-center bg-white gap-3 border shadow-md rounded-md p-5">
            <div className="w-[52px] h-[52px] flex items-center justify-center bg-orange-50 border border-orange-500 rounded-full">
              <MdOutlineAssignmentTurnedIn size={25} className="text-orange-600" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-black">Total Assigned</span>
              <div className="flex flex-col">
                <span className="font-bold text-xl">{deviceStats?.assigned_devices}</span>
                <span className="text-sm text-slate-500">Currently assigned</span>
              </div>
            </div>
          </div>

          {/* */}
          <div className="flex items-center bg-white gap-3 border shadow-md rounded-md p-5">
            <div className="w-[52px] h-[52px] flex items-center justify-center bg-blue-50 border border-blue-500 rounded-full">
              <FaHandshakeSimple size={25} className="text-blue-600" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-black">Total Loaned</span>
              <div className="flex flex-col">
                <span className="font-bold text-xl">{deviceStats?.loaned_devices}</span>
                <span className="text-sm text-slate-500">On loan</span>
              </div>
            </div>
          </div>

          {/* */}
          <div className="flex items-center bg-white gap-3 border shadow-md rounded-md p-5">
            <div className="w-[52px] h-[52px] flex items-center justify-center bg-purple-50 border border-purple-500 rounded-full">
              <BsClipboard2Pulse size={25} className="text-purple-600" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-black">Total Open Repairs</span>

              <div className="flex flex-col">
                <span className="font-bold text-xl">{deviceStats?.maintenance_devices}</span>
                <span className="text-sm text-slate-500">In repair</span>
              </div>
            </div>
          </div>
        </div>

        {/*******************************************/}

        <div className="grid lg:grid-cols-12 grid-rows-1 gap-5">
          {/* Device Status Overview*/}
          <div className="flex flex-col  col-span-4 bg-white gap-3 border shadow-md rounded-md p-5">
            <div className="flex justify-between">
              <span className=" font-semibold text-black">Device Status Overview</span>

              <span className="text-sm flex items-center text-red-600 gap-1 hover:text-red-600 cursor-pointer">
                View all <FaArrowRight />
              </span>
            </div>

            <div className="w-[100%] h-[100%] flex items-center justify-between">
              <div
                className="w-48 h-48 rounded-full flex items-center justify-center"
                style={{
                  background: `conic-gradient( 
                #16a34a  0% ${availableEnd}%,
                #ea580c  ${availableEnd}% ${assignedEnd}%,
                #2563eb   ${assignedEnd}% ${loanedEnd}%,
                #9333ea    ${maintenanceEnd}% 100%)`,
                }}

                /*#ea580c  0% ${issuedStaff}%,
                #9333ea  ${issuedStaff}% ${100}%)`, */
              >
                <div className="w-32 h-32  flex-col bg-white rounded-full flex items-center justify-center ">
                  <span className=" font-bold">{deviceStats?.total_devices}</span>
                  <span className="text-sm">Total</span>
                </div>
              </div>
              <div className="flex flex-col gap-5 justify-evenly text-sm">
                <div className="flex items-center justify-between">
                  <div className=" bg-green-600 p-2 rounded-full"></div>
                  <span className="text-sm">Available</span>
                  <span>{deviceStats?.available_devices}</span>
                  <span className="text-slate-500">
                    {(() => {
                      return `${getPercentage(deviceStats?.available_devices, deviceStats?.total_devices)} %`;
                    })()}
                  </span>
                </div>
                {/* */}
                <div className="flex items-center justify-between">
                  <div className=" bg-orange-600 p-2 rounded-full"></div>
                  <span className="text-sm">Assigned</span>
                  <span>{deviceStats?.assigned_devices}</span>
                  <span className="text-slate-500">
                    {(() => {
                      return `${getPercentage(deviceStats?.assigned_devices, deviceStats?.total_devices)} %`;
                    })()}
                  </span>
                </div>
                {/* */}
                <div className="w-[100%] flex items-center justify-between">
                  <div className=" bg-blue-600 p-2 rounded-full"></div>
                  <span className="text-sm">Loaned</span>
                  <span>{deviceStats?.loaned_devices}</span>
                  <span className="text-slate-500">
                    {(() => {
                      return `${getPercentage(deviceStats?.loaned_devices, deviceStats?.total_devices)} %`;
                    })()}
                  </span>
                </div>
                {/* */}
                <div className="flex items-center gap-5">
                  <div className=" bg-purple-600 p-2 rounded-full"></div>
                  <span className="text-sm">Maintenance</span>
                  <span>{deviceStats?.maintenance_devices}</span>
                  <span className="text-slate-500">
                    {(() => {
                      return `${getPercentage(deviceStats?.maintenance_devices, deviceStats?.total_devices)} %`;
                    })()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/*Issued to Staff vs Students */}
          <div className="flex flex-col  col-span-4 bg-white gap-3 border shadow-md rounded-md p-5">
            <div className="flex justify-between">
              <span className=" font-semibold text-black">Issued to Staff vs Students</span>

              <span className="text-sm flex items-center text-red-600 gap-1 hover:text-red-600 cursor-pointer">
                View all <FaArrowRight />
              </span>
            </div>

            <div className="w-[100%] h-[100%] flex items-center justify-between">
              <div
                className="w-48 h-48 rounded-full flex items-center justify-center"
                style={{
                  background: `conic-gradient( 
                #ea580c  0% ${issuedStaff}%,
                #9333ea  ${issuedStaff}% ${100}%)`,
                }}
              >
                <div className="w-32 h-32 bg-white rounded-full flex flex-col items-center justify-center ">
                  <span className="font-bold">{deviceStats?.assigned_devices}</span>
                  <span className="text-sm">Total</span>
                </div>
              </div>
              <div className="flex flex-col gap-5 justify-evenly text-sm">
                {/* */}
                <div className="flex items-center justify-between">
                  <div className=" bg-orange-600 p-2 rounded-full"></div>
                  <span className="text-sm">Staff</span>
                  <span>{deviceStats?.issued_to_staff}</span>
                  <span className="text-slate-500">
                    {(() => {
                      return `${getPercentage(deviceStats?.issued_to_staff, deviceStats?.assigned_devices)}%`;
                    })()}
                  </span>
                </div>

                {/* */}
                <div className="flex items-center gap-5">
                  <div className=" bg-purple-600 p-2 rounded-full"></div>
                  <span className="text-sm">Students</span>
                  <span>{deviceStats?.issued_to_students}</span>
                  <span className="text-slate-500">
                    {(() => {
                      return `${getPercentage(deviceStats?.issued_to_students, deviceStats?.assigned_devices)} %`;
                    })()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/*Category breakdown*/}
          <div className="flex flex-col  col-span-4 bg-white gap-3 border shadow-md rounded-md p-5">
            <div className="w-full flex justify-between">
              <span className="font-bold text-black">Category breakdown</span>
              <span className="text-sm flex items-center text-red-600 gap-1 hover:text-red-600 cursor-pointer">
                View all <FaArrowRight />
              </span>
            </div>
            <div className="flex flex-col gap-5 text-sm">
              <div className="flex gap-2">
                <div className="bg-slate-100 p-2 rounded-md bg-opacity-30">
                  <MdLaptopWindows size={25} />
                </div>
                {/**/}
                <div className="w-5/6 flex flex-col">
                  <div className=" flex justify-between items-center ">
                    <span className="text-sm">Laptops</span>
                    <div className="flex gap-5">
                      <span>{deviceStats?.laptops}</span>
                      <span>
                        {(() => {
                          return `${getPercentage(deviceStats?.laptops, deviceStats?.total_devices)} %`;
                        })()}
                      </span>
                    </div>
                  </div>
                  {/**/}
                  <div className="w-[100%] flex">
                    <div
                      style={{
                        width: `${getPercentage(deviceStats?.laptops, deviceStats?.total_devices)}%`,
                        backgroundColor: `#ea580c`,
                      }}
                      className="  p-1 rounded-md"
                    ></div>
                  </div>
                </div>
              </div>

              {/* */}
              <div className="flex gap-2">
                <div className="bg-slate-100 p-2 rounded-md bg-opacity-30">
                  <MdOutlineMonitor size={25} />
                </div>
                {/**/}
                <div className="w-5/6 flex flex-col">
                  <div className=" flex justify-between items-center ">
                    <span className="text-sm">Monitors</span>
                    <div className="flex gap-5">
                      <span>{deviceStats?.monitors}</span>
                      <span>
                        {(() => {
                          return `${getPercentage(deviceStats?.monitors, deviceStats?.total_devices)} %`;
                        })()}
                      </span>
                    </div>
                  </div>
                  {/**/}
                  <div className="w-[100%] flex">
                    <div
                      style={{
                        width: `${getPercentage(deviceStats?.monitors, deviceStats?.total_devices)}%`,
                        backgroundColor: `#ea580c`,
                      }}
                      className="  p-1 rounded-md"
                    ></div>
                  </div>
                </div>
              </div>

              {/* */}
              <div className="flex gap-2">
                <div className="bg-slate-100 p-2 rounded-md bg-opacity-30">
                  <MdOutlineDesktopWindows size={25} />
                </div>
                {/**/}
                <div className="w-5/6 flex flex-col">
                  <div className=" flex justify-between items-center ">
                    <span className="text-sm">Desktop</span>
                    <div className="flex gap-5">
                      <span>{deviceStats?.desktops}</span>
                      <span>
                        {(() => {
                          return `${getPercentage(deviceStats?.desktops, deviceStats?.total_devices)} %`;
                        })()}
                      </span>
                    </div>
                  </div>
                  {/**/}
                  <div className="w-[100%] flex">
                    <div
                      style={{
                        width: `${getPercentage(deviceStats?.desktops, deviceStats?.total_devices)}%`,
                        backgroundColor: `#ea580c`,
                      }}
                      className="  p-1 rounded-md"
                    ></div>
                  </div>
                </div>
              </div>

              {/* */}
              <div className="flex gap-2">
                <div className="bg-slate-100 p-2 rounded-md bg-opacity-30">
                  <MdOutlineTabletMac size={25} />
                </div>
                {/**/}
                <div className="w-5/6 flex flex-col">
                  <div className=" flex justify-between items-center ">
                    <span className="text-sm">Tablets</span>
                    <div className="flex gap-5">
                      <span>{deviceStats?.tablets}</span>
                      <span>
                        {(() => {
                          return `${getPercentage(deviceStats?.tablets, deviceStats?.total_devices)} %`;
                        })()}
                      </span>
                    </div>
                  </div>
                  {/**/}
                  <div className="w-[100%] flex">
                    <div
                      style={{
                        width: `${getPercentage(deviceStats?.tablets, deviceStats?.total_devices)}%`,
                        backgroundColor: `#ea580c`,
                      }}
                      className="  p-1 rounded-md"
                    ></div>
                  </div>
                </div>
              </div>

              {/* */}
              <div className="flex gap-2">
                <div className="bg-slate-100 p-2 rounded-md bg-opacity-30">
                  <AiOutlinePrinter size={25} />
                </div>
                {/**/}
                <div className="w-5/6 flex flex-col">
                  <div className=" flex justify-between items-center ">
                    <span className="text-sm">Printers</span>
                    <div className="flex gap-5">
                      <span>{deviceStats?.printers}</span>
                      <span>
                        {(() => {
                          return `${getPercentage(deviceStats?.printers, deviceStats?.total_devices)} %`;
                        })()}
                      </span>
                    </div>
                  </div>
                  {/**/}
                  <div className="w-[100%] flex">
                    <div
                      style={{
                        width: `${getPercentage(deviceStats?.printers, deviceStats?.total_devices)}%`,
                        backgroundColor: `#ea580c`,
                      }}
                      className="  p-1 rounded-md"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*Staff Students Section*/}
        </div>
        <div className="grid lg:grid-cols-6 grid-rows-1 gap-5">
          {/* */}
          <div className="flex items-center col-span-3 bg-white gap-3 border shadow-md rounded-md p-5">
            <div className="w-[52px] h-[52px] flex items-center justify-center bg-blue-50 border border-blue-500 rounded-full">
              <FaUser size={25} className="text-blue-600" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-black">Total Staff</span>
              <div className="flex flex-col">
                <span className="font-bold text-xl">{staffStats?.total_staff}</span>
                <span className="text-sm text-slate-500">All registered devices</span>
              </div>
            </div>
          </div>

          {/* */}
          <div className="w-full flex items-center justify-between col-span-3 bg-white gap-3 border shadow-md rounded-md p-5">
            {/* */}
            <div className="w-3/6 flex gap-3 ">
              <div className="w-[52px] h-[52px] flex items-center justify-center bg-purple-50 border border-purple-500 rounded-full">
                <FaUserGraduate size={25} className="text-purple-600" />
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-sm text-black">Total Students</span>

                <div className="flex flex-col">
                  <span className="font-bold text-xl">{studentsStats?.total_students}</span>
                  <span className="text-sm text-slate-500">Students Stats</span>
                </div>
              </div>
            </div>
            {/* */}
            <div className="w-3/6 flex fle gap-5 text-sm ">
              <div className="flex gap-3">
                <div className="w-[10px] h-[10px] rounded-full p-2 bg-yellow-500"></div>

                <div className="flex flex-col">
                  <span>EDU</span>
                  <span className="font-semibold">{studentsStats?.edu_students}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-[10px] h-[10px] rounded-full p-2 bg-orange-500"></div>

                <div className="flex flex-col">
                  <span>HUM</span>
                  <span className="font-semibold">{studentsStats?.hum_students}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-[10px] h-[10px] rounded-full p-2 bg-green-500"></div>

                <div className="flex flex-col">
                  <span>NAS</span>
                  <span className="font-semibold">{studentsStats?.nas_students}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-[10px] h-[10px] rounded-full p-2 bg-blue-600"></div>

                <div className="flex flex-col">
                  <span>EMS</span>
                  <span className="font-semibold">{studentsStats?.ems_students}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainAdminDashboard;
