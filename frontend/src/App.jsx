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

function App() {
  //App UI Layout
  const Layout = () => {
    return (
      <div className="w-screen h-svh border">
        <div>
          <Navbar />
        </div>
        <div className="w-screen h-svh flex">
          <div className="w-2/12 border">
            <Menu />
          </div>
          <div className="w-screen h-svh border">
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
          path: "/users/staff/Edit-staff",
          element: <AddEditStaff path={"Edit-staff"} />,
        },
        {
          path: "/users/students",
          element: <Students path={"student-list"} />,
        },
      ],
    },
  ]);

  return (
    <SearchContextProvider>
      <StaffContextProvider>
        <RouterProvider router={router} />
      </StaffContextProvider>
    </SearchContextProvider>
  );
}

export default App;
