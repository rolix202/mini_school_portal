import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Layout from "./pages/Layout.jsx";
import Gallery from "./pages/Gallery.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Register from "./pages/Register.jsx";
import Error from "./pages/Error.jsx";
import { action as registerAction } from "./pages/Register.jsx";
import { action as loginAction } from "./pages/Login.jsx";
// import { loader as dashboardLoader } from "./pages/dashboard/DashboardLayout.jsx";
import { loader as studentsLoader } from "./pages/dashboard/Students.jsx";
import { loader as homeLoader } from "./pages/dashboard/DashHome.jsx";
// import { loader as staffLoader } from "./pages/dashboard/Staffs.jsx";
import DashboardLayout from "./pages/dashboard/DashboardLayout.jsx";
import DashHome from "./pages/dashboard/DashHome.jsx";
import Students from "./pages/dashboard/Students.jsx";
import AddStudent from "./pages/dashboard/AddStudent.jsx";
import LogOut from "./pages/dashboard/LogOut.jsx";
import Staffs from "./pages/dashboard/Staffs.jsx";
import UpdateStaff from "./pages/dashboard/UpdateStaff.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "gallery",
        element: <Gallery />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
    ]
  },

  {
    path: "dashboard",
    element: <DashboardLayout />,
    // loader: dashboardLoader,
    children: [
      {
        index: true,
        element: <DashHome />,
        loader: homeLoader,
      },
      {
        path: "staffs",
        element: <Staffs />,
        // loader: staffLoader,
      },
      {
        path: "staff/:id",
        element: <UpdateStaff />
      },
      {
        path: "students",
        element: <Students />,
        loader: studentsLoader
      },
      {
        path: "add-student",
        element: <AddStudent />
      }

    ]
  },

  {
    path: "logout",
    element: <LogOut />
  },

])

export default function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Layout />}>
    //       <Route index element={<Home />} />
    //       <Route path="login" element = {<Login />} />
    //       <Route path="gallery" element = {<Gallery />} />
    //       <Route path="about" element = {<About />} />
    //       <Route path="contact" element = {<Contact />} />
    //       <Route path="register" element = {<Register />} />
    //     </Route>
    //   </Routes>
    // </BrowserRouter>

    <RouterProvider router={router} />

  )
}

