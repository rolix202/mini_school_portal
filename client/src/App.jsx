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
// import { loader as studentsLoader } from "./pages/dashboard/Students.jsx";
import { loader as homeLoader } from "./pages/dashboard/DashHome.jsx";
// import { loader as staffLoader } from "./pages/dashboard/Staffs.jsx";
import DashboardLayout from "./pages/dashboard/DashboardLayout.jsx";
import DashHome from "./pages/dashboard/DashHome.jsx";
import Students from "./pages/dashboard/Students.jsx";
import AddStudent from "./pages/dashboard/AddStudent.jsx";
import LogOut from "./pages/dashboard/LogOut.jsx";
import Staffs from "./pages/dashboard/Staffs.jsx";
import Sss2galaxy from "./pages/dashboard/sss/Ss2Galaxy.jsx";
import Ss2Platinum from "./pages/dashboard/sss/Ss2Platinum.jsx";
import Ss1Galaxy from "./pages/dashboard/sss/Ss1Galaxy.jsx";
import Ss1Platinum from "./pages/dashboard/sss/Ss1Platinum.jsx";
import Ss3Galaxy from "./pages/dashboard/sss/Ss3Galaxy.jsx";
import Ss3Platinum from "./pages/dashboard/sss/Ss3Platinum.jsx";
import Js1Galaxy from "./pages/dashboard/jss/Js1Galaxy.jsx";
import Js1Platinum from "./pages/dashboard/jss/Js1Platinum.jsx";
import Js1Rose from "./pages/dashboard/jss/Js1Rose.jsx";
import Js2Galaxy from "./pages/dashboard/jss/Js2Galaxy.jsx";
import Js2Platinum from "./pages/dashboard/jss/Js2Platinum.jsx";
import Js2Rose from "./pages/dashboard/jss/Js2Rose.jsx";
import Js3Galaxy from "./pages/dashboard/jss/Js3Galaxy.jsx";
import Js3Rose from "./pages/dashboard/jss/Js3Rose.jsx";
// import UpdateStaff from "./pages/dashboard/UpdateStaff.jsx";

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
      // {
      //   path: "staff/:id",
      //   element: <UpdateStaff />
      // },
      {
        path: "students",
        element: <Students />,
        // loader: studentsLoader
      },
      // {
      //   path: "jss",
      //   children: [
      //     {
      //       path: "jss1-galaxy",
      //       element: <Js1Galaxy />
      //     },
      //     {
      //       path: "jss1-platinum",
      //       element: <Js1Platinum />
      //     },
      //     {
      //       path: "jss1-rose",
      //       element: <Js1Rose />
      //     },
      //     {
      //       path: "jss2-galaxy",
      //       element: <Js2Galaxy />
      //     },
      //     {
      //       path: "jss2-platinum",
      //       element: <Js2Platinum />
      //     },
      //     {
      //       path: "jss2-rose",
      //       element: <Js2Rose />
      //     },
      //     {
      //       path: "jss3-galaxy",
      //       element: <Js3Galaxy />
      //     },
      //     {
      //       path: "jss3-rose",
      //       element: <Js3Rose />
      //     }
      //   ]
      // },
      {
        path: "students",
        children: [
          {
            path: "jss/jss1-galaxy",
            element: <Js1Galaxy />
          },
          {
            path: "jss/jss1-platinum",
            element: <Js1Platinum />
          },
          {
            path: "jss/jss1-rose",
            element: <Js1Rose />
          },
          {
            path: "jss/jss2-galaxy",
            element: <Js2Galaxy />
          },
          {
            path: "jss/jss2-platinum",
            element: <Js2Platinum />
          },
          {
            path: "jss/jss2-rose",
            element: <Js2Rose />
          },
          {
            path: "jss/jss3-galaxy",
            element: <Js3Galaxy />
          },
          {
            path: "jss/jss3-rose",
            element: <Js3Rose />
          },
          {
            path: "sss/ss1-galaxy",
            element: <Ss1Galaxy />
          },
          {
            path: "sss/ss1-platinum",
            element: <Ss1Platinum />
          },
          {
            path: "sss/ss2-galaxy",
            element: <Sss2galaxy />
          },
          {
            path: "sss/ss2-platinum",
            element: <Ss2Platinum />
          },
          {
            path: "sss/ss3-galaxy",
            element: <Ss3Galaxy />
          },
          {
            path: "sss/ss3-platinum",
            element: <Ss3Platinum />
          }
        ]
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
    <RouterProvider router={router} />
  )
}

