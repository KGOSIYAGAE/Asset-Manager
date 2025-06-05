import React from "react";

function UserDashCard({ loggedInUser, path }) {
  return (
    <div className="bg-zinc-50 flex flex-col p-4 gap-4 ">
      <span className="text-sm">
        <b>Dashboard /</b> {path}
      </span>
      <div className="flex flex-col p-4 bg-white rounded-md shadow-lg">
        <span className="text-xl font-semibold">
          Good Morning,
          <span className="text-blue-900 pl-1">{loggedInUser?.fullName}</span>
        </span>
        <span className="text-zinc-600">Have a great day at work</span>
      </div>
    </div>
  );
}

export default UserDashCard;
