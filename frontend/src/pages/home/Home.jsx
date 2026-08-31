import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";
import Dashboard from "../../components/dashboard/Dashboard";
import { useDeviceContext } from "../../hooks/useDevicesContext";
import { getAllDeviceLoanDue, getAllDevices, getDevicesStats } from "../../services/api/devices/Device.Api";
import { useStaffContext } from "../../hooks/useStaffContext";
import { getStaffData, getStaffStats } from "../../services/api/staff/Staff.Api";
import { useStudentsContext } from "../../hooks/useStudentsContext";
import { getAllStudents, getStudentsStats } from "../../services/api/students/Students.Api";
import { useAuthContext } from "../../hooks/useAuthContext";
import { getLoggedInUser, hasPermission } from "../../utils/getLoggedInUser";
import { getFacultyStats } from "../../utils/analyticsMethods";
import { getAllLatestDevicesLogs } from "../../services/api/deviceLogs/DeviceLogs";
import { useLogsContext } from "../../hooks/useLogsContext";
import { useLoanDueContext } from "../../hooks/useLoanDueContext";
import AdminDashboard from "../../components/dashboard/AdminDashboard";
import UserDashCard from "../../components/cards/userDashCard/UserDashCard";
import { useLoadingContext } from "../../hooks/useLoadingContext";
import MainAdminDashboard from "../../components/dashboard/MainAdminDashboard";
import { getAllRepairsStats, getAllRepairsStatsForTech } from "../../services/api/repairs/Repairs.Api";
import SupportInternDashboard from "../../components/dashboard/SupportInternDashboard";
import SupportTechnicianDashboard from "../../components/dashboard/SupportTechnicianDashboard";

function Home() {
  const { devicesState, devicesDispatch } = useDeviceContext();
  const { staffState, staffDispatch } = useStaffContext();
  const { studentState, studentDispatch } = useStudentsContext();
  const { logState, logDispatch } = useLogsContext();
  const { loanDueState, loanDueDispatch } = useLoanDueContext();

  const [currentUser, setCurrentUser] = useState(null);
  const [deviceStats, setDeviceStats] = useState(null);

  const [studentsStats, setStudentsStats] = useState(null);
  const [staffStats, setStaffStats] = useState(null);

  const [allRepairsStats, setAllRepairsStats] = useState(null);

  useEffect(() => {
    setCurrentUser(getLoggedInUser());
    getDevicesStats(setDeviceStats);
    getStudentsStats(setStudentsStats);
    getStaffStats(setStaffStats);

    const user = getLoggedInUser();

    if (user?.role === "support_admin") {
      getAllRepairsStats(setAllRepairsStats);
    } else {
      getAllRepairsStatsForTech({ userId: user?.id }, setAllRepairsStats);
    }
  }, []);

  return (
    <div>
      {/*<UserDashCard loggedInUser={currentUser} />*/}
      {hasPermission("support-admin-dash") && <MainAdminDashboard loggedInUser={currentUser} deviceStats={deviceStats} studentsStats={studentsStats} staffStats={staffStats} />}
      {hasPermission("support-tech-dash") && <SupportTechnicianDashboard allRepairsStats={allRepairsStats} />}
      {hasPermission("support-intern-dash") && <SupportInternDashboard allRepairsStats={allRepairsStats} />}
    </div>
  );
}

export default Home;
