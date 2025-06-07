import React, { useEffect, useState } from "react";
import { getIntials } from "../../../utils/getIntials";
import { MdOutlineLock, MdPowerSettingsNew } from "react-icons/md";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { getLoggedInUser } from "../../../utils/getLoggedInUser";
import { IoChevronDown } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { SlWrench } from "react-icons/sl";

function ProfileCard() {
  //const [userName, setUsername] = useState("Kgosiyagae Motabogi");
  const { authState, authDispatch } = useAuthContext();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  //Show profile options
  const showProfileOptions = (isShown) => {
    if (isShown) {
      setShowMenu(false);
    } else {
      setShowMenu(true);
    }
  };
  //Logout
  const logout = () => {
    authDispatch({ type: "LOGOUT", payload: null });
    sessionStorage.clear();
    navigate("/auth/login");
  };

  //Profile
  const openProfile = () => {
    const { id } = getLoggedInUser();
    navigate("/user/" + id);
  };

  useEffect(() => {
    setLoggedInUser(getLoggedInUser());
  }, [getLoggedInUser]);

  return (
    <div className="w-full flex flex-col items-end gap-2 p-1 z-40 ">
      <div
        className="flex items-center gap-2 p-2"
        onClick={() => {
          showProfileOptions(showMenu);
        }}
      >
        <div className="w-[30px] h-[30px] flex items-center justify-center bg-zinc-100 p-3 rounded-full border border-zinc-300">
          <span className="text-sm">{getIntials(loggedInUser?.fullName)}</span>
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-sm">{`${loggedInUser?.fullName}`}</span>
        </div>
        <IoChevronDown className="menu-items" />
      </div>
      <div
        className={`w-[140px] bg-white ${showMenu ? "flex" : "hidden"} flex-col  absolute top-14 right-12 border rounded-sm shadow-md`}
        onMouseLeave={() => {
          showProfileOptions(showMenu);
        }}
      >
        <div className="flex flex-col p-2">
          <div className="flex items-center  text-sm menu-items p-2 gap-2">
            <FaRegUser className="" size={15} />
            <span className="">Profile</span>
          </div>
          <div
            className="flex items-center  text-sm menu-items p-2 gap-2"
            onClick={() => {
              openProfile();
            }}
          >
            <SlWrench className="" size={15} />
            <span className="">Settings</span>
          </div>
          <div className="flex items-center  text-sm menu-items p-2 gap-2">
            <MdOutlineLock className="" size={15} />
            <span className="">Lock screen</span>
          </div>
        </div>
        <div
          className="top-border p-2 hover:bg-red-50"
          onClick={() => {
            logout();
          }}
        >
          <div className="flex items-center  text-sm text-red-500 p-2 gap-2 ">
            <MdPowerSettingsNew className="" size={15} />
            <span className="">Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
