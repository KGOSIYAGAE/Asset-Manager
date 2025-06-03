import React, { useEffect, useState } from "react";
import { getPercentage } from "../../../utils/getValueInPercentage";
import { getCourseStatsByFaculty, getFacultyStats } from "../../../utils/analyticsMethods";

function StudentByFaculty({ students }) {
  const [edu, setEdu] = useState({
    color: "",
    value: 0,
    percentage: 0,
  });
  const [nas, setNas] = useState({
    color: "",
    value: 0,
    percentage: 0,
  });

  const [ems, setEms] = useState({
    color: "",
    value: 0,
    percentage: 0,
  });
  const [hum, setHum] = useState({
    color: "",
    value: 0,
    percentage: 0,
  });

  const getFacutlyDetails = () => {
    //console.log(students);

    const { edu_stats, ems_stats, nas_stats, hum_stats } = getFacultyStats(students);

    getCourseStatsByFaculty(students);

    setEdu({
      color: "#eab308",
      value: edu_stats?.length,
      percentage: getPercentage(edu_stats?.length, students?.length),
    });
    setHum({
      color: "#f97316",
      value: hum_stats?.length,
      percentage: getPercentage(hum_stats?.length, students?.length),
    });
    setNas({
      color: "#15803d ",
      value: nas_stats?.length,
      percentage: getPercentage(nas_stats?.length, students?.length),
    });
    setEms({
      color: " #2563eb ",
      value: ems_stats?.length,
      percentage: getPercentage(ems_stats?.length, students?.length),
    });
  };

  useEffect(() => {
    getFacutlyDetails();
  }, [students]);

  return (
    <div>
      <div className="flex items-center justify-between border-b-2 rounded-t-md p-2">
        <span className="font-semibold text-sm">Student by Faculties</span>
      </div>
      <div className="grid grid-cols-4 p-2">
        <div className="flex flex-col col-span-4 p-2 gap-5">
          <div className="flex justify-between">
            <span className="text-sm">Total Students</span>
            <span className="text-2x1 font-semibold">{students?.length}</span>
          </div>
          <div className="w-[100%] h-[20px] flex rounded-sm">
            <div style={{ width: `${edu.percentage}%`, backgroundColor: `${edu.color}` }} className="rounded-tl-sm rounded-bl-sm"></div>
            <div style={{ width: `${nas.percentage}%`, backgroundColor: `${nas.color}` }}></div>
            <div style={{ width: `${ems.percentage}%`, backgroundColor: `${ems.color}` }}></div>
            <div style={{ width: `${hum.percentage}%`, backgroundColor: `${hum.color}` }} className="rounded-tr-sm rounded-br-sm"></div>
          </div>
        </div>
        {/***/}
        <div className="flex flex-col col-span-2 p-2 gap-5 border">
          <div className="flex items-center  gap-1">
            <div className="w-[10px] h-[10px] bg-yellow-500"></div>
            <span className="text-sm text-slate-600">EDU</span>
            <span>({Math.round(edu.percentage)}%)</span>
          </div>
          <span className="text-2xl font-bold">{edu.value}</span>
        </div>
        {/***/}
        <div className="flex flex-col items-end col-span-2 p-2 gap-5 border-t border-r border-b">
          <div className="flex items-center gap-1">
            <div className="w-[10px] h-[10px] bg-green-700"></div>
            <span className="text-sm text-slate-600">NAS</span>
            <span>({Math.round(nas.percentage)}%)</span>
          </div>
          <span className="text-2xl font-semibold">{nas.value}</span>
        </div>
        {/***/}
        <div className="flex flex-col col-span-2 p-2 gap-5 border-l border-r border-b">
          <div className="flex items-center gap-1">
            <div className="w-[10px] h-[10px] bg-blue-600"></div>
            <span className="text-sm text-slate-600">EMS</span>
            <span>({Math.round(ems.percentage)}%)</span>
          </div>
          <span className="text-2xl font-bold">{ems.value}</span>
        </div>
        {/***/}
        <div className="flex flex-col items-end col-span-2 p-2 gap-5 border-r border-b">
          <div className="flex items-center gap-1">
            <div className="w-[10px] h-[10px] bg-orange-500"></div>
            <span className="text-sm text-slate-600">HUM</span>
            <span>({Math.round(hum.percentage)}%)</span>
          </div>
          <span className="text-2xl font-bold">{hum.value}</span>
        </div>
      </div>
    </div>
  );
}

export default StudentByFaculty;
