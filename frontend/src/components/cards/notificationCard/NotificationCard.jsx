import React, { useEffect, useState } from "react";
import { BsBell } from "react-icons/bs";

function NotificationCard({ notifications }) {
  const [systNotifications, setSystNotifications] = useState(0);
  const [showNotificationTab, setShowNotificationTab] = useState(false);

  //Show profile options
  const showNotifactonTab = (isShown) => {
    if (isShown) {
      setShowNotificationTab(false);
    } else {
      setShowNotificationTab(true);
    }
  };

  useEffect(() => {
    setSystNotifications(2);
  }, [notifications]);
  return (
    <div>
      <div
        className="w-[40px] h-[40px] flex items-center"
        onClick={() => {
          showNotifactonTab(showNotificationTab);
        }}
      >
        <BsBell className="menu-items" size={20} />
        {systNotifications ? (
          <div className="w-[20px] h-[40px] ">
            <div className="w-[18px] h-[18px] flex items-center justify-center bg-red-400 rounded-full p-2">
              <span className="text-white text-sm">{systNotifications}</span>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div
        className={`h-[250px] w-[350px] bg-white ${showNotificationTab ? "flex" : "hidden"} flex-col  absolute top-14 right-72 border shadow-md overflow-y-scroll`}
        onMouseLeave={() => {
          showNotifactonTab(showNotificationTab);
        }}
      >
        <div className="flex flex-col p-2 gap-2">
          <div className="flex flex-col items-start text-sm menu-items p-2 gap-1 border">
            <span className=" text-xs font-bold ">Laptop over due</span>
            <span>You have {systNotifications} due for Upgrade or needs to be returned</span>
          </div>
          <div className="flex flex-col items-start text-sm menu-items p-2 gap-1 border">
            <span className=" text-xs font-bold ">Laptop over due</span>
            <span>You have {systNotifications} due for Upgrade or needs to be returned</span>
          </div>
          <div className="flex flex-col items-start text-sm menu-items p-2 gap-1 border">
            <span className=" text-xs font-bold ">Laptop over due</span>
            <span>You have {systNotifications} due for Upgrade or needs to be returned</span>
          </div>
          <div className="flex flex-col items-start text-sm menu-items p-2 gap-1 border">
            <span className=" text-xs font-bold ">Laptop over due</span>
            <span>You have {systNotifications} due for Upgrade or needs to be returned</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationCard;
