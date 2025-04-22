import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";
import Dashboard from "../../components/dashboard/Dashboard";
import { useDeviceContext } from "../../hooks/useDevicesContext";
import { getAllDevices } from "../../services/api/devices/Device.Api";
import { useStaffContext } from "../../hooks/useStaffContext";
import { getStaffData } from "../../services/api/staff/Staff.Api";
import { useStudentsContext } from "../../hooks/useStudentsContext";
import { getAllStudents } from "../../services/api/students/Students.Api";
import { useAuthContext } from "../../hooks/useAuthContext";
import { getLoggedInUser } from "../../utils/getLoggedInUser";
import { getFacultyStats } from "../../utils/analyticsMethods";

function Home() {
  const { devicesState, devicesDispatch } = useDeviceContext();
  const { staffState, staffDispatch } = useStaffContext();
  const { studentState, studentDispatch } = useStudentsContext();

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    getAllDevices(devicesDispatch);
    getAllStudents(studentDispatch);
    /*getStaffData(staffDispatch);
     */

    setCurrentUser(getLoggedInUser());
  }, [devicesDispatch, staffDispatch, studentDispatch]);
  return (
    <div>
      <Dashboard
        loggedInUser={currentUser}
        devices={devicesState?.deviceList}
        students={studentState?.studentsList}
        deviceNumber={devicesState?.deviceList?.length || 0}
        staffNumber={staffState?.staffList?.length || 0}
        studentsNumber={studentState?.studentsList?.length || 0}
      />
    </div>
  );
}

export default Home;
