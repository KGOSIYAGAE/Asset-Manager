import { RouterProvider, Outlet, createBrowserRouter, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Staff from "./pages/users/staff/Staff";
import Students from "./pages/users/students/students";
import Navbar from "./components/navbar/Navbar";
import Menu from "./components/menu/Menu";
import AddEditStaff from "./components/forms/AddEditStaff";
import { jwtDecode } from "jwt-decode";

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
import { getLoggedInUser } from "./utils/getLoggedInUser";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import { InvoiceContextProvider } from "./context/InvoicesContext";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMinimize, setIsMinimize] = useState(false);

  /*useEffect(() => {
    const user = localStorage.getItem("user");
    console.log(user);
    if (user) {
    setIsAuthenticated(true);
    console.log(isAuthenticated)
    }
  }, [isAuthenticated, setIsAuthenticated]);*/

  //Menu Minimize
  const handleMinimizeMenu = () => {
    if (isMinimize) {
      setIsMinimize(false);
    } else {
      setIsMinimize(true);
    }
  };

  //App UI Layout
  const Layout = () => {
    return (
      <div className="w-screen flex ">
        <div className={`${isMinimize ? "w-[60px] " : "w-2/12"} border`}>
          <Menu isMinimized={isMinimize} />
        </div>
        <div className={`${isMinimize ? "w-full" : "w-10/12"} `}>
          <div className="bottom-border">
            <Navbar onCloseMenu={handleMinimizeMenu} />
          </div>
          <Outlet />
        </div>
      </div>
    );
  };

  //Check if token has expired
  const isTokenExpired = (token) => {
    if (!token) {
      return true;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;
    }
  };

  const PrivateRoutes = ({ element: Element }) => {
    const navigate = useNavigate();

    useEffect(() => {
      const user = getLoggedInUser();

      //Check if user is authorized to access private protected routes
      if (!user.token) {
        return navigate("/auth/login", { replace: true });
      }

      //Check if user token is still valid if not redirect to login
      if (isTokenExpired(user.token)) {
        sessionStorage.clear();
        return navigate("/auth/login");
      }

      setIsAuthenticated(true);
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
          errorElement: <Home />,
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
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);

  return (
    <SearchContextProvider>
      <InvoiceContextProvider>
        <DevicesContextProvider>
          <StudentsContextProvider>
            <StaffContextProvider>
              <RouterProvider router={router} />
            </StaffContextProvider>
          </StudentsContextProvider>
        </DevicesContextProvider>
      </InvoiceContextProvider>
    </SearchContextProvider>
  );
}

export default App;
