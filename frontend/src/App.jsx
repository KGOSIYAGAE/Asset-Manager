import { RouterProvider, Outlet, createBrowserRouter, useNavigate } from "react-router-dom";
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
import DeviceDetails from "./pages/devices/DeviceDetails";
import Login from "./pages/login/Login";
import { useEffect, useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /*useEffect(() => {
    const user = localStorage.getItem("user");
    console.log(user);
    if (user) {
    setIsAuthenticated(true);
    console.log(isAuthenticated)
    }
  }, [isAuthenticated, setIsAuthenticated]);*/

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

  const PrivateRoutes = ({ element: Element }) => {
    const navigate = useNavigate();

    useEffect(() => {
      const user = localStorage.getItem("user");

      if (!user) {
        return navigate("/auth/login", { replace: true });
      }
      console.log(user);
      setIsAuthenticated(true);
      /*if (!isAuthenticated) {
        console.log(user);
        navigate("/auth/login", { replace: true });
      }*/
    }, [isAuthenticated, navigate, setIsAuthenticated]);

    return isAuthenticated ? Element : <h1>Authenticated</h1>;
  };

  /*const router = createBrowserRouter([
    {
      path: "/auth/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/dashboard",
          element: <Home />,
        },
        //Devices
        {
          path: "/devices",
          element: <Devices path={"Devices/"} />,
        },
        {
          path: "/devices/device-details/:id",
          element: <DeviceDetails path={"device-details/"} />,
        },
        {
          path: "/devices/add-device",
          element: <AddEditDevice path={"add-device"} />,
        },
        {
          path: "/devices/edit-device/:id",
          element: <AddEditDevice path={"edit-device"} />,
        },
        //Staff
        {
          path: "/users/staff",
          element: <Staff path={"staff-list"} />,
        },
        {
          path: "/users/staff/edit-staff/:id",
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
  ]);*/

  const router = createBrowserRouter([
    {
      path: "/auth/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <PrivateRoutes isAuthenticated={isAuthenticated} element={<Layout />} />,
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
          path: "/devices/device-details/:id",
          element: <DeviceDetails path={"device-details/"} />,
        },
        {
          path: "/devices/add-device",
          element: <AddEditDevice path={"add-device"} />,
        },
        {
          path: "/devices/edit-device/:id",
          element: <AddEditDevice path={"edit-device"} />,
        },
        //Staff
        {
          path: "/users/staff",
          element: <Staff path={"staff-list"} />,
        },
        {
          path: "/users/staff/edit-staff/:id",
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
