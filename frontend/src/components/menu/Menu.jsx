import React from "react";
import { IoMdPeople } from "react-icons/io";
import { PiStudentFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { MdDevices } from "react-icons/md";

function Menu() {
  return (
    <div className="flex flex-col p-3">
      <span className="text-zinc-800 font-bold">Main</span>
      <div className="flex flex-col gap-3 p-3">
        <Link to={"/"}>
          <div className="menu-items">
            <div className="bg-zinc-100 rounded-md p-2">
              <MdDevices size={20} className="" />
            </div>
            <span className="">Devices</span>
          </div>
        </Link>
        {/**/}
        <Link to={"/users/staff/"}>
          <div className="menu-items">
            <div className="bg-zinc-100 rounded-md p-2">
              <IoMdPeople size={20} className="" />
            </div>
            <span className="">Staff</span>
          </div>
        </Link>
        {/**/}
        <Link to={"users/students"}>
          <div className="menu-items">
            <div className="bg-zinc-100 rounded-md p-2">
              <PiStudentFill size={20} className="" />
            </div>
            <span className="">Students</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Menu;
