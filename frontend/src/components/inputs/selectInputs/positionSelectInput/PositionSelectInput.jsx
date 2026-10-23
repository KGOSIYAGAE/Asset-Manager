import React, { useEffect, useState } from "react";
import { getPositions, getPositionsOfDepartment } from "../../../../services/api/organization/Organization";

function PositionSelectInput({ label, position_id, department_id, isDisabled, setPosition_id }) {
  const [position_name, setPosition_name] = useState();
  const [positions, setPositions] = useState([]);

  const handleSetPositionId = (selectedPositiion) => {
    for (let i = 0; i < positions?.length; i++) {
      if (positions[i]?.post_name === selectedPositiion) {
        setPosition_id(positions[i].position_id);
      }
    }
  };

  const handleSetPositionName = (position_id) => {
    for (let i = 0; i < positions?.length; i++) {
      if (positions[i].position_id === position_id) {
        setPosition_name(positions[i]?.post_name);
      }
    }
  };

  useEffect(() => {
    getPositions(setPositions);
  }, []);

  useEffect(() => {
    if (department_id) {
      getPositionsOfDepartment(department_id, setPositions);
    }
  }, [department_id]);

  useEffect(() => {
    if (positions?.length > 0) {
      handleSetPositionName(position_id);
    }
  }, [position_id, positions]);

  return (
    <div className="text-input col-span-2">
      <span className="w-fit text-zinc-500 -mt-5 bg-white">{label}</span>
      <select
        className="outline-none"
        disabled={isDisabled}
        value={position_name}
        onChange={(e) => {
          setPosition_name(e.target.value);
          handleSetPositionId(e.target.value);
        }}
      >
        <option></option>
        {positions?.map((position) => (
          <option key={position.position_id}>{position.post_name}</option>
        ))}
      </select>
    </div>
  );
}

export default PositionSelectInput;
