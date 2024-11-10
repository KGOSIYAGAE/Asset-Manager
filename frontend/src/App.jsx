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
import { ToastContextProvider } from "./context/ToastContext";

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
        {
          path: "/users/students",
          element: <Students path={"student-list"} />,
        },
        {
          path: "/users/students/edit-student/:id",
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
      <ToastContextProvider>
        <StudentsContextProvider>
          <StaffContextProvider>
            <RouterProvider router={router} />
          </StaffContextProvider>
        </StudentsContextProvider>
      </ToastContextProvider>
    </SearchContextProvider>
  );
}

export default App;
