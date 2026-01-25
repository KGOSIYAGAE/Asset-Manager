import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handleFilter } from "../../../../utils/helperMethods";
import { useDeviceContext } from "../../../../hooks/useDevicesContext";
import { getAvailableDevicesHelper } from "../../../../utils/devicesHelperMethods";

function DeviceSelectInput({ userId, selectedDevice, setSelectedDevice }) {
  const [showDevices, setShowDevices] = useState({ isShow: false });
  const [availableDevices, setAvailableDevices] = useState(null);

  const [searchValue, setSearchValue] = useState(null);
  const [searchResultsData, setSearchResultsData] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  const { devicesState } = useDeviceContext();

  //Toggle view devices
  const toggleDevices = () => {
    if (showDevices.isShow) {
      setShowDevices({ isShow: false });
      setSearchResultsData(null);
    } else {
      setSearchResultsData(availableDevices);
      setShowDevices({ isShow: true });
    }
  };

  useEffect(() => {
    setAvailableDevices(devicesState?.deviceList);
  }, [userId]);

  return (
    <div className="flex flex-col border-b-2 py-5 ">
      <div
        className="text-input col-span-2"
        onClick={() => {
          toggleDevices();
        }}
      >
        <span className="w-fit text-zinc-500 -mt-5 bg-white">Device</span>
        <span>{selectedDevice?.id ? `${selectedDevice.make} ${selectedDevice.model}  - ${selectedDevice.serial_no} / ${selectedDevice.asset_tag}` : "- Select Device -"}</span>
      </div>
      <div className={`${showDevices.isShow ? "flex" : "hidden"} flex-col relative  bg-white border border-zinc-300 rounded-md p-2 text-sm`}>
        <input
          type="text"
          name=""
          className="border outline-none p-1"
          placeholder="Search here ...."
          value={searchValue}
          onChange={(e) => {
            setSearchResultsData(handleFilter(e.target.value, availableDevices));
            setSearchValue(e.target.value);
          }}
        />
        <div className="flex flex-col h-[300px] border overflow-auto">
          {searchResultsData?.map((item) => (
            <span
              key={item.id}
              className="hover:bg-zinc-50 p-1"
              onClick={() => {
                setSelectedDevice({ id: item.id, make: item.make, model: item.model, serial_no: item.serial_no, asset_tag: item.asset_tag });

                toggleDevices();
              }}
            >{`${item.make} ${item.model} - ${item?.serial_no} / ${item?.asset_tag}`}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DeviceSelectInput;
