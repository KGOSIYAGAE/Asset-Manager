import React, { useEffect, useState } from "react";
import { getTodayFullDateTime } from "../../../utils/helperMethods";

function UserDashCard({ loggedInUser, path }) {
  const [hours, setHours] = useState(null);
  useEffect(() => {
    const { year, month, day, hours, minutes } = getTodayFullDateTime();

    setHours(hours);
  }, []);
  return (
    <div className="bg-zinc-50 flex flex-col p-4 gap-4 ">
      <span className="text-sm">
        <b>Dashboard /</b> {path}
      </span>
      <div className="flex flex-col p-4 bg-white rounded-md shadow-lg">
        <span className="text-xl font-semibold">
          {hours && hours < 12 ? "Good Morning," : hours >= 18 && hours <= 23 ? "Good Evening," : "Good Afternoon,"}

          <span className="text-blue-900 pl-1">{loggedInUser?.fullName}</span>
        </span>
        <span className="text-zinc-600">Have a great day at work</span>
      </div>
    </div>
  );
}

export default UserDashCard;
