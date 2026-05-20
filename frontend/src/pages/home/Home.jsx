import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";
import Dashboard from "../../components/dashboard/Dashboard";
import { useDeviceContext } from "../../hooks/useDevicesContext";
import { getAllDeviceLoanDue, getAllDevices } from "../../services/api/devices/Device.Api";
import { useStaffContext } from "../../hooks/useStaffContext";
import { getStaffData } from "../../services/api/staff/Staff.Api";
import { useStudentsContext } from "../../hooks/useStudentsContext";
import { getAllStudents } from "../../services/api/students/Students.Api";
import { useAuthContext } from "../../hooks/useAuthContext";
import { getLoggedInUser, hasPermission } from "../../utils/getLoggedInUser";
import { getFacultyStats } from "../../utils/analyticsMethods";
import { getAllLatestDevicesLogs } from "../../services/api/deviceLogs/DeviceLogs";
import { useLogsContext } from "../../hooks/useLogsContext";
import { useLoanDueContext } from "../../hooks/useLoanDueContext";
import AdminDashboard from "../../components/dashboard/AdminDashboard";
import UserDashCard from "../../components/cards/userDashCard/UserDashCard";
import { useLoadingContext } from "../../hooks/useLoadingContext";

function Home() {
  const { devicesState, devicesDispatch } = useDeviceContext();
  const { staffState, staffDispatch } = useStaffContext();
  const { studentState, studentDispatch } = useStudentsContext();
  const { logState, logDispatch } = useLogsContext();
  const { loanDueState, loanDueDispatch } = useLoanDueContext();

  const [currentUser, setCurrentUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const { showSpinner, hideSpinner } = useLoadingContext();

  useEffect(() => {
    getAllDevices(devicesDispatch);
    getAllStudents(studentDispatch);
    getStaffData(staffDispatch);
    getAllLatestDevicesLogs(logDispatch);
    getAllDeviceLoanDue(loanDueDispatch);

    setCurrentUser(getLoggedInUser());
  }, [devicesDispatch, staffDispatch, studentDispatch, logDispatch, loanDueDispatch]);
  return (
    <div>
      <UserDashCard loggedInUser={currentUser} />
      {hasPermission("support-dash") && (
        <AdminDashboard
          devices={devicesState?.deviceList}
          students={studentState?.studentsList}
          deviceNumber={devicesState?.deviceList?.length || 0}
          staffNumber={staffState?.staffList?.length || 0}
          studentsNumber={studentState?.studentsList?.length || 0}
          devicesLogs={logState?.logList}
          loanDueState={loanDueState?.loanDueList}
        />
      )}
    </div>
  );
}

export default Home;
