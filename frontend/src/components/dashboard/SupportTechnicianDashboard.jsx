import React from "react";
import { FaRegCheckCircle, FaUser } from "react-icons/fa";
import { FaHandshakeSimple } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";
import { LuSearch } from "react-icons/lu";
import { MdNewReleases, MdOutlineAssignmentTurnedIn } from "react-icons/md";
import { TbProgressAlert, TbProgressDown, TbProgressX } from "react-icons/tb";
import { Link } from "react-router-dom";

function SupportTechnicianDashboard({ allRepairsStats }) {
  return (
    <div className="h-svh flex flex-col p-3 gap-3 bg-zinc-50 overflow-y-scroll">
      <div className="flex flex-col">
        <span className="text-xl font-bold">Dashboard</span>
        <span className="text-sm text-slate-600">Welcome back1 Here's what's happening with your ICT assets.</span>
      </div>
      <div className="flex flex-col gap-5">
        {/* Device Summary*/}
        <div className="grid grid-cols-5 grid-rows-2 gap-5">
          {/* */}
          <div className="flex items-center bg-white gap-3 border shadow-md rounded-md p-5">
            <div className="w-[52px] h-[52px] flex items-center justify-center bg-purple-50 border border-purple-500 rounded-full">
              <MdNewReleases size={25} className="text-purple-600" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-black">My Open Repairs</span>
              <div className="flex flex-col">
                <span className="font-bold text-xl">{allRepairsStats?.total_open_repairs}</span>
                <span className="text-sm text-slate-500">Assigned To You</span>
              </div>
            </div>
          </div>

          {/* */}
          <div className="flex items-center bg-white gap-3 border shadow-md rounded-md p-5">
            <div className="w-[52px] h-[52px] flex items-center justify-center bg-red-50 border border-red-500 rounded-full">
              <TbProgressX size={25} className="text-red-600" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-black">Awaiting Parts</span>
              <div className="flex flex-col">
                <span className="font-bold text-xl">{allRepairsStats?.awaiting_parts}</span>
                <span className="text-sm text-slate-500">Assigned To You</span>
              </div>
            </div>
          </div>

          {/* */}
          <div className="flex items-center bg-white gap-3 border shadow-md rounded-md p-5">
            <div className="w-[52px] h-[52px] flex items-center justify-center bg-orange-50 border border-orange-500 rounded-full">
              <TbProgressDown size={25} className="text-orange-600" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-black">In Progress</span>
              <div className="flex flex-col">
                <span className="font-bold text-xl">{allRepairsStats?.in_progress}</span>
                <span className="text-sm text-slate-500">Currently working</span>
              </div>
            </div>
          </div>

          {/* */}
          <div className="flex items-center bg-white gap-3 border shadow-md rounded-md p-5">
            <div className="w-[52px] h-[52px] flex items-center justify-center bg-green-50 border border-green-500 rounded-full">
              <FaRegCheckCircle size={25} className="text-green-600" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-black">Resolved</span>
              <div className="flex flex-col">
                <span className="font-bold text-xl">{allRepairsStats?.completed}</span>
                <span className="text-sm text-slate-500">This Month</span>
              </div>
            </div>
          </div>

          {/* */}
          <div className="flex items-center bg-white gap-3 border shadow-md rounded-md p-5">
            <div className="w-[52px] h-[52px] flex items-center justify-center bg-red-50 border border-red-500 rounded-full">
              <TbProgressAlert size={25} className="text-red-600" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-black">Overdue</span>
              <div className="flex flex-col">
                <span className="font-bold text-xl">{allRepairsStats?.overdue_repairs}</span>
                <span className="text-sm text-slate-500">Require Attension</span>
              </div>
            </div>
          </div>

          {/* */}
          <div className="flex items-center justify-between col-span-2 bg-white gap-3 border shadow-md rounded-md p-5">
            <div className=" flex gap-3">
              <div className="w-[52px] h-[52px] flex items-center justify-center bg-orange-50 border border-orange-500 rounded-full">
                <MdOutlineAssignmentTurnedIn size={25} className="text-orange-600" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-black">Devices Issued</span>
                <div className="flex flex-col">
                  <span className="font-bold text-xl">{0}</span>
                  <span className="text-sm text-slate-500">This Month</span>
                </div>
              </div>
            </div>
            <div className=" flex gap-3">
              <div className="w-[52px] h-[52px] flex items-center justify-center bg-blue-50 border border-blue-500 rounded-full">
                <FaHandshakeSimple size={25} className="text-blue-600" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-black">Devices Loaned</span>
                <div className="flex flex-col">
                  <span className="font-bold text-xl">{0}</span>
                  <span className="text-sm text-slate-500">This Month</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*******************************************/}

      <div className="grid lg:grid-cols-12 grid-rows- gap-5">
        {/* Device Status Overview*/}
        <div className="flex flex-col  col-span-8 row-span-2 bg-white gap-3 border shadow-md rounded-md p-5">
          <div className="flex justify-between">
            <span className=" font-semibold text-black">My Repairs</span>
          </div>
        </div>

        {/**/}
        <div className="flex flex-col  col-span-12 bg-white gap-3 border shadow-md rounded-md p-5">
          <div className="flex justify-between">
            <span className=" font-semibold text-black">Quick Actions</span>
          </div>

          {/** */}
          <div className="flex gap-3">
            <Link to={"/repairs/create-repair"}>
              <div className="flex flex-col items-center justify-center gap-2 border rounded-md p-3 shadow-md">
                <div className="w-[52px] h-[52px] flex items-center justify-center bg-purple-50 border border-purple-500 rounded-full">
                  <IoIosAddCircle size={25} className="text-purple-600" />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-black">Create New Repairs</span>
                </div>
              </div>
            </Link>
            {/** */}
            <Link to={"/repairs/create-repair"}>
              <div className="flex flex-col items-center justify-center gap-2 border rounded-md p-3 shadow-md">
                <div className="w-[52px] h-[52px] flex items-center justify-center bg-purple-50 border border-purple-500 rounded-full">
                  <IoIosAddCircle size={25} className="text-purple-600" />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-black">Create New Repairs</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportTechnicianDashboard;
