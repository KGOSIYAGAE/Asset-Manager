import { RouterProvider, Outlet, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Staff from "./pages/users/staff/Staff";
import Students from "./pages/users/students/students";
import Navbar from "./components/navbar/Navbar";
import Menu from "./components/menu/Menu";
import AddEditStaff from "./components/forms/AddEditStaff";

import { StaffContextProvider } from "./context/StaffContext";
import { SearchContextProvider } from "./context/SearchContext";
import { StudentsContextProvider } from "./context/StudentsContext";
import AddEditStudent from "./components/forms/AddEditStudent";
import Devices from "./pages/devices/Devices";
import { DevicesContextProvider } from "./context/DevicesContext";
import AddEditDevice from "./components/forms/AddEditDevice";

function App() {
  //App UI Layout
  const Layout = () => {
    return (
      <div className="w-screen ">
        {/*<div>
          <Navbar />
        </div>*/}
        <div className="w-screen flex">
          <div className="w-2/12 border ">
            <Menu />
          </div>
          <div className="w-10/12 ">
            <Outlet />
          </div>
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        //Devices
        {
          path: "/devices",
          element: <Devices path={"Devices/"} />,
        },
        {
          path: "/devices/add-device",
          element: <AddEditDevice path={"add-device"} />,
        },
        {
          path: "/devices/edit-device/:serial_no",
          element: <AddEditDevice path={"edit-device"} />,
        },
        //Staff
        {
          path: "/users/staff",
          element: <Staff path={"staff-list"} />,
        },
        {
          path: "/users/staff/edit-staff/:staff_no",
          element: <AddEditStaff path={"edit-staff"} />,
        },
        {
          path: "/users/staff/add-staff/",
          element: <AddEditStaff path={"edit-staff"} />,
        },
        //Students
        {
          path: "/users/students",
          element: <Students path={"student-list"} />,
        },
        {
          path: "/users/students/edit-student/:student_no",
          element: <AddEditStudent path={"edit-student"} />,
        },
        {
          path: "/users/students/add-student",
          element: <AddEditStudent path={"edit-student"} />,
        },
      ],
    },
  ]);

  return (
    <SearchContextProvider>
      <DevicesContextProvider>
        <StudentsContextProvider>
          <StaffContextProvider>
            <RouterProvider router={router} />
          </StaffContextProvider>
        </StudentsContextProvider>
      </DevicesContextProvider>
    </SearchContextProvider>
  );
}

export default App;
