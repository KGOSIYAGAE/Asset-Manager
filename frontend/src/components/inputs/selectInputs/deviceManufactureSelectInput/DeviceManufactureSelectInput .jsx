import React, { useEffect, useState } from "react";
import { getDeviceCategoryManufacture } from "../../../../services/api/ICT Assets/ICTAssets";

function DeviceManufactureSelectInput({ label, deviceMake_id, isDisabled, deviceCategory_id, setDeviceMake_id }) {
  const [manufacture_name, setManufacture_name] = useState();
  const [manufactures, setManufactures] = useState([]);

  const handleSetManufactureId = (selectedManufacture) => {
    for (let i = 0; i < manufactures?.length; i++) {
      if (manufactures[i]?.manufacturer_name === selectedManufacture) {
        setDeviceMake_id(manufactures[i].manufacturer_id);
      }
    }
  };

  const handleSetManufactureName = (manufacturer_id) => {
    for (let i = 0; i < manufactures?.length; i++) {
      if (manufactures[i].manufacturer_id === manufacturer_id) {
        setManufacture_name(manufactures[i]?.manufacturer_name);
      }
    }
  };

  useEffect(() => {
    getDeviceCategoryManufacture(deviceCategory_id, setManufactures);
  }, []);

  useEffect(() => {
    if (deviceCategory_id) {
      getDeviceCategoryManufacture(deviceCategory_id, setManufactures);
    }
  }, [deviceCategory_id]);

  useEffect(() => {
    if (deviceMake_id) {
      handleSetManufactureName(deviceMake_id);
    }
  }, [deviceMake_id, manufactures]);

  return (
    <div className="text-input col-span-2">
      <span className="w-fit text-zinc-500 -mt-5 bg-white">{label}</span>
      <select
        className="outline-none"
        value={manufacture_name}
        isDisabled={isDisabled}
        onChange={(e) => {
          setManufacture_name(e.target.value);
          handleSetManufactureId(e.target.value);
        }}
      >
        <option></option>
        {manufactures?.map((item) => (
          <option key={item.manufacturer_id}>{item.manufacturer_name}</option>
        ))}
      </select>
    </div>
  );
}

export default DeviceManufactureSelectInput;

/**
 import React, { useEffect, useState } from "react";

function CategorySelectInput({ label, value, options, setOnChange, onChoose }) {
  const [inputValue, setInputValue] = useState();

  const fnc = (option) => {
    return <option key={option.id}>{option.category || option.name}</option>;
  };

  useEffect(() => {
    setInputValue(value);

    if (onChoose) {
      onChoose(value);
    }
  }, [value]);

  return (
    <div className="text-input col-span-2">
      <span className="w-fit text-zinc-500 -mt-5 bg-white">{label}</span>
      <select
        className="outline-none"
        value={inputValue}
        onChange={(e) => {
          setOnChange(e.target.value);
          if (onChoose) {
            onChoose(e.target.value);
          }
        }}
      >
        {/*options.map((option) => (
          <option key={option.id}></option>
        ))*
        <option></option>
        {options.map((option) => fnc(option))}
      </select>
    </div>
  );
}

export default CategorySelectInput;

 */
