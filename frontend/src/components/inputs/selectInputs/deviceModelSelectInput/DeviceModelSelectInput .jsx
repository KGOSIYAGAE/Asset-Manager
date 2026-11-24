import React, { useEffect, useState } from "react";
import { getDeviceCategoryManufacture, getDeviceManufactureModel } from "../../../../services/api/ICT Assets/ICTAssets";

function DeviceModelSelectInput({ label, deviceModel_id, isDisabled, deviceMake_id, setDeviceModel_id, setSpec }) {
  const [model_name, setModel_name] = useState();
  const [models, setModels] = useState([]);

  const handleSetModelId = (selectedModel) => {
    for (let i = 0; i < models?.length; i++) {
      if (models[i]?.model_name === selectedModel) {
        setDeviceModel_id(models[i].model_id);
        setSpec(models[i].specification);
      }
    }
  };

  const handleSetModelName = (deviceModel_id) => {
    for (let i = 0; i < models?.length; i++) {
      if (models[i].model_id === deviceModel_id) {
        setModel_name(models[i].model_name);
      }
    }
  };

  useEffect(() => {
    getDeviceManufactureModel(deviceMake_id, setModels);
  }, []);

  useEffect(() => {
    if (deviceMake_id) {
      getDeviceManufactureModel(deviceMake_id, setModels);
    }
  }, [deviceMake_id]);

  useEffect(() => {
    if (deviceModel_id) {
      handleSetModelName(deviceModel_id);
    }
  }, [deviceModel_id, models]);

  return (
    <div className="text-input col-span-2">
      <span className="w-fit text-zinc-500 -mt-5 bg-white">{label}</span>
      <select
        className="outline-none"
        value={model_name}
        isDisabled={isDisabled}
        onChange={(e) => {
          setModel_name(e.target.value);
          handleSetModelId(e.target.value);
        }}
      >
        <option></option>
        {models?.map((item) => (
          <option key={item.model_id}>{item.model_name}</option>
        ))}
      </select>
    </div>
  );
}

export default DeviceModelSelectInput;
