import React, { useEffect, useState } from "react";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdDevices } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import PieComponent from "../charts/pieChart/PieComponent";
import PieComponentMake from "../charts/pieChart/PieComponentMake";
import StatusBarChart from "../charts/barCharts/StatusBarChart";
import { Link } from "react-router-dom";
import ModelStatBarChart from "../charts/barCharts/ModelStatBarChart";
import ExportExcelButton from "../buttons/ExportExcelButton";
import StudentByFaculty from "../cards/studentByFaculty/StudentByFaculty";
import CourseStatBarChart from "../charts/barCharts/CourseStatBarChart";
import DeviceLogTable from "../tables/DeviceLogTable";
import { getAllLatestDevicesLogs } from "../../services/api/deviceLogs/DeviceLogs";
import OverdueLoan from "../tables/OverdueLoanTable";
import DueUpgradeLaptopsTable from "../tables/DueUpgradeLaptopsTable";

import { devicesTableHeaders } from "../../utils/TableHeaders";
import PieCategory from "../charts/pieChart/PieCategory";
import { hasPermission } from "../../utils/getLoggedInUser";
import DueReturnLaptopsTable from "../tables/DueReturnLaptopsTable";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";

function AdminDashboard({ devices, students, deviceNumber, staffNumber, studentsNumber, devicesLogs, loanDueState, path }) {
  return (
    <div className="h-svh flex flex-col p-3 gap-3 bg-zinc-50 overflow-y-scroll">
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-4 grid-rows-1 gap-5">
          {/* */}
          <div className="flex items-center bg-white gap-3 border shadow-md rounded-md p-2">
            <div className="w-[48px] h-[48px] flex items-center justify-center bg-slate-200 rounded-full">
              <FaPeopleGroup size={25} className="text-blue-900" />
            </div>
            <div className="flex flex-col g">
              <span className="text-sm text-zinc-500 ">Total Staff</span>
              <span className="font-bold text-xl">{staffNumber}</span>
            </div>
          </div>

          <div className="flex items-center bg-white gap-3 border shadow-md rounded-md p-2">
            <div className="w-[48px] h-[48px] flex items-center justify-center bg-slate-200 rounded-full">
              <PiStudentFill size={25} className="text-blue-900" />
            </div>
            <div className="flex flex-col g">
              <span className="text-sm text-zinc-500">Total Students</span>
              <span className="font-bold text-xl">{studentsNumber}</span>
            </div>
          </div>

          <div className="flex items-center bg-white gap-3 border shadow-md rounded-md p-2">
            <div className="w-[48px] h-[48px] flex items-center justify-center bg-slate-200 rounded-full">
              <MdDevices size={25} className="text-blue-900" />
            </div>
            <div className="flex flex-col g">
              <span className="text-sm text-zinc-500">Total Devices</span>
              <span className="font-bold text-xl">{deviceNumber}</span>
            </div>
          </div>

          <div className="flex items-center bg-white gap-3 border shadow-md rounded-md p-2">
            <div className="w-[48px] h-[48px] flex items-center justify-center bg-slate-200 rounded-full">
              <HiOutlineWrenchScrewdriver size={25} className="text-blue-900" />
            </div>
            <div className="flex flex-col g">
              <span className="text-sm text-zinc-500">Total Repairs</span>
              <span className="font-bold text-xl">0</span>
            </div>
          </div>
          {/* */}

          <div className=""></div>
        </div>
        {/*////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
        <div className="grid grid-cols-4 grid-rows-6 gap-5">
          {/* */}
          <div className="bg-white flex flex-col col-span-1  rounded-md shadow-lg gap-4 border">
            <div className="border-b-2 rounded-t-md p-2">
              <span className="font-semibold text-sm">Devices by Condition</span>
            </div>

            <div className="p-2">
              <PieComponentMake devices={devices} />
            </div>
          </div>
          {/* */}
          <div className=" bg-white flex flex-col col-span-2 row-span-1 rounded-md shadow-lg border">
            <div className="border-b-2 rounded-t-md p-2">
              <span className="font-semibold text-sm">Devices by Status</span>
            </div>
            <div className="bg-white p-2">
              <StatusBarChart devices={devices} />
            </div>
          </div>
          {/* */}
          <div className="bg-white flex flex-col col-span-1 row-span-1 rounded-md shadow-lg border">
            <div className="border-b-2 rounded-t-md p-2">
              <span className="font-semibold text-sm">Devices by Make</span>
            </div>

            <div className="bg-white p-2">
              <PieComponent devices={devices} />
            </div>
          </div>
          {/* */}
          <div className=" bg-white flex flex-col col-span-3 row-span-1 rounded-md shadow-lg border">
            <div className="flex items-center justify-between border-b-2 rounded-t-md p-2">
              <span className="font-semibold text-sm">Device by Model</span>
            </div>
            <div className="bg-white p-2 row-span-2">
              <ModelStatBarChart devices={devices} />
            </div>
          </div>
          {/* */}
          <div className="bg-white flex flex-col col-span-1  rounded-md shadow-lg gap-4 border">
            <div className="border-b-2 rounded-t-md p-2">
              <span className="font-semibold text-sm">Devices by Category</span>
            </div>
            <div className="bg-white p-2">
              <PieCategory devices={devices} />
            </div>
          </div>
          {/* *
          <div className=" bg-white flex flex-col col-span-4 row-span-1 rounded-md shadow-lg border">
            <DeviceLogTable deviceLogs={devicesLogs} label={"Latest Devices Logs"} />
          </div>
          {/* *
          <div className=" bg-white flex flex-col col-span-4 row-span-1 rounded-md shadow-lg border">
            <DueReturnLaptopsTable label={"User Devices Due Return"} />
          </div>
          {/* *
          <div className=" bg-white flex flex-col col-span-4 row-span-1 rounded-md shadow-lg border">
            <DueUpgradeLaptopsTable loanDueState={loanDueState} label={"User Devices Due Upgrade"} />
          </div>
          {/* */}
          <div className="bg-white flex flex-col col-span-2 row-span-1 rounded-md shadow-lg border p-2">
            <StudentByFaculty students={students} />
          </div>
          {/* */}
          <div className="bg-white flex flex-col col-span-2 row-span-1 rounded-md shadow-lg border">
            <CourseStatBarChart students={students} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

{
  /*
          <div className="h-[150px] bg-white flex flex-col col-span-1 rounded-md shadow-lg p-4 gap-4 border">
            <span className="font-semibold text-sm">Total Staff</span>
            <div className="flex flex-row justify-between items-end">
              <div className="w-[40px] h-[40px] flex rounded-md bg-zinc-200 p-1 border">
                <FaPeopleGroup size={30} className="text-blue-900" />
              </div>
              <span className="font-semibold text-4xl">{staffNumber}</span>
            </div>
            <div className="flex justify-between">
              <Link to={"/users/staff"}>
                <span className="text-sm text-blue-900 underline cursor-pointer">View more</span>
              </Link>
            </div>
          </div>
          {/* */
}

{
  /* 
          <div className="h-[150px] bg-white flex flex-col col-span-1 rounded-md shadow-lg p-4 gap-4 border">
            <span className="font-semibold text-sm">Students Accounts</span>
            <div className="flex flex-row justify-between items-end">
              <div className="w-[40px] h-[40px] flex rounded-md bg-zinc-200 p-1 border">
                <PiStudentFill size={30} className="text-blue-900" />
              </div>
              <span className="font-semibold text-4xl">{studentsNumber}</span>
            </div>
            <div className="flex justify-between">
              <Link to={"/users/students"}>
                <span className="text-sm text-blue-900 underline cursor-pointer">View more</span>
              </Link>
            </div>
          </div>
          {/* */
}

{
  /* 
          <div className="h-[150px] bg-white flex flex-col col-span-1  rounded-md shadow-lg p-4 gap-4 border">
            <span className="font-semibold text-sm">Number of Devices</span>
            <div className="flex flex-row justify-between items-end">
              <div className="w-[40px] h-[40px] flex rounded-md bg-zinc-200 p-1 border">
                <MdDevices size={30} className="text-blue-900" />
              </div>
              <span className="font-semibold text-4xl">{deviceNumber}</span>
            </div>
            <div className="flex justify-between ">
              <Link to={"/devices"}>
                <span className="text-sm text-blue-900 underline cursor-pointer">View more</span>
              </Link>
            </div>
          </div>

          {/* */
}
