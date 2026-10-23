import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handleFilter } from "../../../../utils/helperMethods";
import { useDeviceContext } from "../../../../hooks/useDevicesContext";
import { getAvailableDevicesHelper } from "../../../../utils/devicesHelperMethods";
import { getSearchResults } from "../../../../services/api/admin/Search.Api";
import { MdDevices, MdOutlineMonitor } from "react-icons/md";

function DeviceSelectInput({ userId, allDevices, selectedDevice, setSelectedDevice, repair, viewDevice }) {
  const [showDevices, setShowDevices] = useState({ isShow: false });
  const [showDevicesSearch, setShowDevicesSearch] = useState({ isShow: true });

  const [devicesData, setDevicesData] = useState(null);

  const [searchQuery, setSearchQuery] = useState();
  const [searchInput, setSearchInput] = useState();
  const tableName = "devices-select";
  const [totalPages, setTotalPages] = useState(1);

  const params = useParams();
  const navigate = useNavigate();

  const handleSearch = (searchQuery, tableName, setSearchResults, setTotalPages) => {
    const data = {
      tableName,
      searchQuery,
    };
    getSearchResults(data, setSearchResults, setTotalPages);
  };

  //Clears Search Box and fetch all data
  const handleClearSearch = () => {
    setSearchInput();
    setDevicesData(allDevices);
  };

  //Search Debounce UseEffect
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      if (searchInput) {
        setSearchQuery(searchInput);
      }
    }, 500);

    return () => clearTimeout(delayTimer);
  }, [searchInput]);

  useEffect(() => {
    setSearchInput(viewDevice);
    console.log(viewDevice);
  }, [viewDevice]);

  //Search API axecution UseEffect
  useEffect(() => {
    handleSearch(searchQuery, tableName, setDevicesData, setTotalPages);
  }, [searchQuery]);

  //Toggle view devices
  const toggleDevices = () => {
    if (showDevices.isShow) {
      setShowDevices({ isShow: false });
      setDevicesData(null);
      setShowDevicesSearch({ isShow: false });
    } else {
      setDevicesData(allDevices);
      setShowDevices({ isShow: true });
      setShowDevicesSearch({ isShow: true });
    }
  };

  return (
    <div className="flex flex-col border-b-2 py-5 gap-2 ">
      <div
        className="text-input col-span-2"
        onClick={() => {
          toggleDevices();
        }}
      >
        <span className="w-fit text-zinc-500 -mt-5 bg-white">Device</span>

        <span>{selectedDevice?.id ? "- Change Device -" : "- Select Device -"}</span>
      </div>
      <div className={`${showDevices.isShow ? "flex" : "hidden"} flex-col relative  bg-white border border-zinc-300 rounded-md p-2 text-sm`}>
        <input
          type="text"
          name=""
          className="border outline-none p-1"
          placeholder="Search here ...."
          value={searchInput}
          onChange={(e) => {
            if (e.target.value.trim().length === 0) {
              handleClearSearch();
            } else {
              setSearchInput(e.target.value);
            }
          }}
        />
        <div className="flex flex-col h-[300px] border overflow-auto">
          {devicesData?.map((item) => (
            <span
              key={item.id}
              className="hover:bg-zinc-50 p-1"
              onClick={() => {
                setSelectedDevice({
                  id: item.id,
                  make: item.make,
                  model: item.model,
                  serial_no: item.serial_no,
                  asset_tag: item.asset_tag,
                  device_category: item.category,
                  device_status: item.status,
                });

                toggleDevices();
              }}
            >{`${item.make} ${item.model} - ${item?.serial_no} / ${item?.asset_tag}`}</span>
          ))}
        </div>
      </div>
      {selectedDevice.make ? (
        <div className={`flex gap-2 bg-white border border-zinc-300 rounded-md p-2`}>
          <div className="bg-slate-100 p-2 rounded-md bg-opacity-30">
            <MdDevices size={25} />
          </div>
          {/**/}
          <div className="w-5/6 flex flex-col">
            <div className=" flex flex-col  ">
              <span className="text-sm">{`${selectedDevice.make} ${selectedDevice.model}`}</span>
              <div className="flex  justify-between">
                <div className="flex gap-5">
                  <span className="text-sm">{`Asset Tag: ${selectedDevice.asset_tag}`}</span>
                  <span className="text-sm">{`Serial: ${selectedDevice.serial_no}`}</span>
                  <span className="text-sm">{`Category: ${selectedDevice.device_category}`}</span>
                </div>
                <div className="flex gap-5 items-center justify-center">
                  {selectedDevice.device_status === "Available" ? (
                    <span className="text-sm bg-green-600 border shadow-sm p-1 rounded-md text-white">{selectedDevice.device_status}</span>
                  ) : selectedDevice.device_status === "Issue Approval required" ? (
                    <span className="text-sm bg-orange-600 border shadow-sm p-1 rounded-md text-white">{selectedDevice.device_status}</span>
                  ) : selectedDevice.device_status === "Loan Approval required" ? (
                    <span className="text-sm bg-orange-600 border shadow-sm p-1 rounded-md text-white">{selectedDevice.device_status}</span>
                  ) : (
                    <span className="text-sm bg-red-600 border shadow-sm p-1 rounded-md text-white">{selectedDevice.device_status}</span>
                  )}
                  <span
                    className="text-sm text-red-600 hover:text-red-700 hover:cursor-pointer"
                    onClick={() => {
                      toggleDevices();
                    }}
                  >
                    Change Device
                  </span>
                </div>
              </div>
            </div>
            {/**/}
            <div className="w-[100%] flex"></div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default DeviceSelectInput;
