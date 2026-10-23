import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { courseList } from "../../../utils/course";
import { getCourseStatsByFaculty } from "../../../utils/analyticsMethods";

function CourseStatBarChart({ students }) {
  const values = [0, 0, 0];
  const [courseStat, setCourseStat] = useState([]);

  const [xLabels, setXLables] = useState([]);

  const [selectedFaculty, setSelectedFaculty] = useState();

  const onSelectOption = (value) => {
    let facultyNumber = 0;
    let courseCodes = [];

    if (value === "NAS") {
      facultyNumber = 0;
    }

    if (value === "EDU") {
      facultyNumber = 1;
    }

    if (value === "EMS") {
      facultyNumber = 2;
    }

    if (value === "HUM") {
      facultyNumber = 3;
    }

    for (let i = 0; i < courseList[facultyNumber].courses.length; i++) {
      courseCodes.push(courseList[facultyNumber].courses[i].course_code);
    }

    setXLables([...courseCodes]);
    setCourseStat([...getCourseStatsByFaculty(students, facultyNumber)]);
    return;
  };

  useEffect(() => {
    onSelectOption("NAS");
    setSelectedFaculty("NAS");
  }, [students]);

  const otherSetting = {
    xAxis: [{ label: "Students" }],
    grid: { horizontal: true, vertical: true },
  };

  return (
    <div>
      <div className="flex items-center justify-between border-b-2 rounded-t-md p-2">
        <span className="font-semibold text-sm">Students by Courses</span>
        <select
          className="text-sm outline-none border py-1 px-3 rounded-sm"
          value={selectedFaculty}
          onChange={(e) => {
            setSelectedFaculty(e.target.value);
            onSelectOption(e.target.value);
          }}
        >
          <option value="NAS">NAS</option>
          <option value="EDU">EDU</option>
          <option value="EMS">EMS</option>
          <option value="HUM">HUM</option>
        </select>
      </div>

      <BarChart
        margin={{
          left: 100,
          right: 30,
          top: 40,
          bottom: 50,
        }}
        slotProps={{
          // Custom message for empty chart
          noDataOverlay: { message: "Select some data to display." },
        }}
        width={600}
        height={300}
        series={[{ data: courseStat, color: "#f97316" }]}
        yAxis={[{ data: xLabels, scaleType: "band" }]}
        layout="horizontal"
        {...otherSetting}
      />
    </div>
  );
}

export default CourseStatBarChart;
