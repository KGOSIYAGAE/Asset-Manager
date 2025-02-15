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

function Home() {
  const { devicesState, devicesDispatch } = useDeviceContext();
  const { staffState, staffDispatch } = useStaffContext();
  const { studentState, studentDispatch } = useStudentsContext();

  useEffect(() => {
    getAllDevices(devicesDispatch);
    getStaffData(staffDispatch);
    getAllStudents(studentDispatch);
  }, [devicesDispatch, staffDispatch, studentDispatch]);
  return (
    <div>
      <Dashboard devices={devicesState?.deviceList} deviceNumber={devicesState?.deviceList?.length} staffNumber={staffState?.staffList?.length} studentsNumber={studentState?.studentsList?.length} />
    </div>
  );
}

export default Home;
