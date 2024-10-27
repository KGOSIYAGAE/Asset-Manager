import React from "react";
import ProfileCard from "../cards/profileCard/ProfileCard";

function Navbar() {
  return (
    <div className="p-3 flex justify-between items-center shadow-md">
      <div>
        <span>LOGO</span>
      </div>
      <ProfileCard />
    </div>
  );
}

export default Navbar;
