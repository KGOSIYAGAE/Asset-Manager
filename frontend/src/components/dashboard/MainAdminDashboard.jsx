import React, { useEffect } from "react";
import { BsClipboard2Pulse } from "react-icons/bs";
import { FaArrowRight, FaUser, FaUserGraduate } from "react-icons/fa";
import { FaHandHoldingDroplet, FaHandshakeSimple } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdDevices, MdDevicesOther, MdLaptopWindows, MdOutlineAssignmentTurnedIn, MdOutlineDesktopWindows, MdOutlineMonitor, MdOutlineTabletMac } from "react-icons/md";
import { getPercentage } from "../../utils/getValueInPercentage";
import { AiOutlinePrinter } from "react-icons/ai";
import DynamicIcon from "../dynamicIcon/DynamicIcon";
import PieDevicesStatuses from "../charts/pieChart/PieDevicesStatuses";
import PieDevicesCategory from "../charts/pieChart/PieDevicesCategory";
import DevicesStackedBarGraph from "../charts/stackedBargraph/DevicesStackedBarGraph";
import DevicesWarrantySummaryTable from "../tables/DevicesWarrantySummaryTable";
import PieDevicesIssuedLoanedUsers from "../charts/pieChart/PieDevicesIssuedLoanedUsers";

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
                <span className="font-bold text-xl">{deviceStats?.devicesOverallSummary[0].total_devices}</span>
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
                <span className="font-bold text-xl">
                  {(() => {
                    const found = deviceStats?.devicesByStatus.find((e) => e.status === "Available");
                    return found?.total ?? 0;
                  })()}
                </span>
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
                <span className="font-bold text-xl">
                  {(() => {
                    const found = deviceStats?.devicesByStatus.find((e) => e.status === "Assigned");
                    return found?.total ?? 0;
                  })()}
                </span>
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
                <span className="font-bold text-xl">
                  {(() => {
                    const found = deviceStats?.devicesByStatus.find((e) => e.status === "Loaned");
                    return found?.total ?? 0;
                  })()}
                </span>
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
                <span className="font-bold text-xl">
                  {(() => {
                    const found = deviceStats?.devicesByStatus.find((e) => e.status === "Maintenance");
                    return found?.total ?? 0;
                  })()}
                </span>
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

            <PieDevicesStatuses devicesByStatus={deviceStats?.devicesByStatus} />
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
              <PieDevicesIssuedLoanedUsers deviceAssignedLoanedByUser={deviceStats?.deviceAssignedLoanedByUser[0]} />
            </div>
          </div>

          {/*Category breakdown*/}
          <div className="flex flex-col h-[250px] col-span-4 bg-white gap-3 border shadow-md rounded-md p-5 overflow-x-auto">
            <div className="w-full flex justify-between">
              <span className="font-bold text-black">Category breakdown</span>
              <span className="text-sm flex items-center text-red-600 gap-1 hover:text-red-600 cursor-pointer">
                View all <FaArrowRight />
              </span>
            </div>
            <div className="flex flex-col gap-5 text-sm">
              {/* */}
              {deviceStats?.devicesByCategory &&
                deviceStats?.devicesByCategory?.map((deviceCategory, id) => (
                  <div className="flex gap-2" key={id}>
                    <div className="bg-slate-100 p-2 rounded-md bg-opacity-30 ">
                      <DynamicIcon name={`Md${deviceCategory.category}`} size={25} iconColor="text-black" />
                    </div>
                    {/**/}
                    <div className="w-5/6 flex flex-col">
                      <div className=" flex justify-between items-center ">
                        <span className="text-sm">{deviceCategory.category}</span>
                        <div className="flex gap-5">
                          <span>{deviceCategory?.total}</span>
                          <span>
                            {(() => {
                              return `${getPercentage(deviceCategory?.total, deviceStats?.devicesOverallSummary[0].total_devices)} %`;
                            })()}
                          </span>
                        </div>
                      </div>
                      {/**/}
                      <div className="w-[100%] flex">
                        <div
                          style={{
                            width: `${getPercentage(deviceCategory?.total, deviceStats?.devicesOverallSummary[0].total_devices)}%`,
                            backgroundColor: `#ea580c`,
                          }}
                          className="  p-1 rounded-md"
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}

              {/* */}
            </div>
          </div>

          {/*Device Model breakdown*/}
          <div className="flex flex-col h-[370px]  col-span-12 bg-white gap-3 border shadow-md rounded-md p-5 overflow-x-auto">
            <div className="w-full flex justify-between">
              <span className="font-bold text-black">Devices Model Breakdown</span>
              <span className="text-sm flex items-center text-red-600 gap-1 hover:text-red-600 cursor-pointer">
                View all <FaArrowRight />
              </span>
            </div>
            <div className="flex flex-col gap-5 text-sm">
              <DevicesStackedBarGraph devicesMakeModelStatusCount={deviceStats?.devicesMakeModelStatusCount} />
            </div>
          </div>

          {/*Device With Eding warranty*/}
          <div className="flex flex-col h-[370px]  col-span-8 bg-white gap-3 border shadow-md rounded-md p-5 ">
            <div className="w-full flex justify-between">
              <span className="font-bold text-black">Devices With Ending Warranty</span>
              <span className="text-sm flex items-center text-red-600 gap-1 hover:text-red-600 cursor-pointer">
                View all <FaArrowRight />
              </span>
            </div>
            <div className="flex flex-col gap-5 text-sm">
              <DevicesWarrantySummaryTable devicesWarrantyStats={deviceStats?.devicesWarrantyStats} />
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
