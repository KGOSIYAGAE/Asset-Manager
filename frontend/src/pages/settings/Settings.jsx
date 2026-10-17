import React, { useEffect, useState } from "react";
import SystemSettings from "./SystemSettings";

function Settings({ name, path, createRepair }) {
  const [openModal, setOpenModal] = useState({ isShown: false, type: null, data: null });
  const [showToast, setShowToast] = useState({ isShown: false, type: "", message: null });
  const [active, setActive] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [msGraphSettings, setMsGraphSettings] = useState("");

  const filterItems = ["General Settings", "System Settings"];

  useEffect(() => {
    setActive(name);
  }, [name]);

  return (
    <div className="h-svh flex flex-col p-3  bg-zinc-50">
      <span className="heading-text ">Settings</span>
      <span className="text-sm ">
        <b>{path}</b>
      </span>
      <div className="flex flex-col  gap-2">
        <div className="flex  justify-between sticky top-0 p-5 bg-white rounded-md"></div>

        <div className="flex flex-col">
          <div className="bg-white rounded-md shadow-md p-2">
            <div className="flex gap-3">
              <div className="filter-tab ">
                {filterItems.map((item, index) => (
                  <span
                    key={index}
                    className={`filter-tab-item ${active === item ? "active" : ""}`}
                    onClick={() => {
                      setActive(item);
                      setStatusFilter(item);
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        {statusFilter && statusFilter === "General Settings" ? "" : <SystemSettings />}
      </div>
    </div>
  );
}

export default Settings;
