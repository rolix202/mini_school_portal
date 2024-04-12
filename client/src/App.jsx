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
import { action as dashboardAction } from "./pages/dashboard/DashboardLayout.jsx";
import DashboardLayout from "./pages/dashboard/DashboardLayout.jsx";
import DashHome from "./pages/dashboard/DashHome.jsx";
import Students from "./pages/dashboard/Students.jsx";
import AddStudent from "./pages/dashboard/AddStudent.jsx";

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
    action: dashboardAction,
    children: [
      {
        index: true,
        element: <DashHome />
      },
      {
        path: "students",
        element: <Students />
      },
      {
        path: "add-student",
        element: <AddStudent />
      }

    ]
  }
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

