import React from "react";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdDevices } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import PieComponent from "../charts/pieChart/PieComponent";
import { Link } from "react-router-dom";

function Dashboard({ loggedInUser, deviceNumber, staffNumber, studentsNumber, path }) {
  return (
    <div className="h-svh flex flex-col p-3 gap-3 bg-zinc-50">
      <span className="text-sm">
        <b>Dashboard /</b> {path}
      </span>
      <div className="flex flex-col p-4 bg-white rounded-md shadow-md">
        <span className="text-xl font-semibold">
          Good Morning,
          <span className="text-blue-900 pl-1">{loggedInUser?.username}</span>
        </span>
        <span className="text-zinc-600">Have a great day at work</span>
      </div>
      <div className="grid grid-cols-4 grid-rows-3  gap-5">
        {/* */}
        <div className="flex flex-col col-span-1 rounded-md shadow-md p-4 gap-4">
          <div className="w-[40px] flex rounded-md bg-zinc-200 p-1 border">
            <FaPeopleGroup size={30} className="text-blue-900" />
          </div>
          <span className="font-semibold text-sm">Staff Accounts</span>
          <span className="font-semibold text-4xl">{staffNumber}</span>
          <Link to={"/users/staff"}>
            <span className="text-sm text-blue-900 underline cursor-pointer">View more</span>
          </Link>
        </div>
        {/* */}
        <div className="flex flex-col col-span-1 rounded-md shadow-md p-4 gap-4">
          <div className="w-[40px] flex rounded-md bg-zinc-200 p-1 border">
            <PiStudentFill size={30} className="text-blue-900" />
          </div>
          <span className="font-semibold text-sm">Students Accounts</span>
          <span className="font-semibold text-4xl">{studentsNumber}</span>
          <Link to={"/users/students"}>
            <span className="text-sm text-blue-900 underline cursor-pointer">View more</span>
          </Link>
        </div>
        {/* */}
        <div className="flex flex-col col-span-1 rounded-md shadow-md p-4 gap-4">
          <div className="w-[40px] flex rounded-md bg-zinc-200 p-1 border">
            <MdDevices size={30} className="text-blue-900" />
          </div>
          <span className="font-semibold text-sm">Devices</span>
          <span className="font-semibold text-4xl">{deviceNumber}</span>
          <Link to={"/devices"}>
            <span className="text-sm text-blue-900 underline cursor-pointer">View more</span>
          </Link>
        </div>
        {/* */}
        <div className="flex flex-col col-span-1 row-span-2 rounded-md shadow-md p-2 gap-4">
          <span className="font-semibold text-sm">Devices by status</span>
          <PieComponent />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
