import React, { useEffect, useState } from "react";
import { getIntials } from "../../../utils/getIntials";
import { MdLogout } from "react-icons/md";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { getLoggedInUser } from "../../../utils/getLoggedInUser";

function ProfileCard() {
  //const [userName, setUsername] = useState("Kgosiyagae Motabogi");
  const { authState, authDispatch } = useAuthContext();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    authDispatch({ type: "LOGOUT", payload: null });
    sessionStorage.clear();
    navigate("/auth/login");
  };

  useEffect(() => {
    setLoggedInUser(getLoggedInUser());
  }, [getLoggedInUser]);

  return (
    <div className=" flex items-center p-3 gap-3 border">
      <div className="w-[50px] flex justify-center bg-zinc-100 p-3 rounded-full border border-zinc-300">
        <span>{getIntials(loggedInUser?.username)}</span>
      </div>
      <div className="flex flex-col justify-center">
        <span>{`${loggedInUser?.username}`}</span>
      </div>

      <div className="menu-items bg-zinc-100 rounded-md p-2">
        <MdLogout
          size={20}
          className="text-zinc-500"
          onClick={() => {
            logout();
          }}
        />
      </div>
    </div>
  );
}

export default ProfileCard;
